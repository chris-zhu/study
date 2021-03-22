const isArray = Array.isArray;
const isString = (val) => typeof val === 'string';
const isObject = (val) => val !== null && typeof val === 'object';
const extend = Object.assign;
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
const isMap = (val) => toTypeString(val) === '[object Map]';
const toTypeString = (value) => objectToString.call(value);
const objectToString = Object.prototype.toString;

const ITERATE_KEY = Symbol('iterate');
const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate');
function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
let uid = 0;
const effectStack = [];
let activeEffect; // 当前的effect
function createReactiveEffect(fn, options) {
    const effect = function () {
        if (!effectStack.includes(effect)) {
            /**
             * effect(()=>{
             *    console.log(state.a)  -->  effect1
             *    effect(()=>{
             *      console.log(state.b) -->  effect2
             *    })
             *    console.log(state.c)  -->  这里必须保证当前effect为effect1 ，所以要出栈   effectStack.pop()
             * })
             *
             * */
            try {
                effectStack.push(effect);
                activeEffect = effect;
                return fn();
            }
            finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid++;
    effect.allowRecurse = !!options.allowRecurse;
    effect._isEffect = true;
    effect.active = true;
    effect.raw = fn;
    effect.deps = [];
    effect.options = options;
    return effect;
}
const targetMap = new WeakMap();
/**
 * targetMap:  {
 *   key: ['target'] :  Map: [key: 'key' : Set() ]
 * }
 */
function track(target, type, key) {
    if (activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }
}
function trigger(target, type, key, newValue, oldvalue) {
    const depsMap = targetMap.get(target);
    if (!depsMap)
        return;
    const effects = new Set(); // 将所有的 effect 存入一个集合中
    /** 将set里面的收集effect添加到effects中 */
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect !== activeEffect || effect.allowRecurse) {
                    effects.add(effect);
                }
            });
        }
    };
    // 修改的是数组的长度
    if (key === 'length' && isArray(target)) {
        // 如果对应的长度有依赖， 则需要收集依赖
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key >= newValue) {
                // 如果更改的长度小于收集的索引，那么这个索引也需要触发effect重新执行
                add(dep);
            }
        });
    }
    else {
        // 可能是对象
        if (key !== undefined) { // 这里肯定是修改   
            add(depsMap.get(key)); // 不可能是添加  添加 depsMap.get(key) 返回是个undefined  因为还没有收集依赖
        }
        switch (type) {
            case "add" /* ADD */:
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                else if (isIntegerKey(key)) {
                    // 添加了一个索引  触发长度更新
                    // new index added to array -> length changes
                    add(depsMap.get('length'));
                }
                break;
            case "delete" /* DELETE */:
                if (!isArray(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if (isMap(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                break;
            case "set" /* SET */:
                if (isMap(target)) {
                    add(depsMap.get(ITERATE_KEY));
                }
                break;
        }
    }
    effects.forEach((effect) => effect());
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        if (!isReadonly) { // 不是只读的，要开始收集依赖
            track(target, "get" /* GET */, key);
        }
        if (shallow) { // 如果是shallow 则返回res
            return res;
        }
        if (isObject(res)) { // 如果是对象，则递归代理，  其实是一个懒代理， 只有当取值的时候才会循环代理
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const oldValue = target[key];
        const hadKey = isArray(target) && isIntegerKey(key)
            ? Number(key) < target.length
            : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (!hadKey) { // 新增
            trigger(target, "add" /* ADD */, key, value);
        }
        else if (hasChanged(value, oldValue)) { // 修改
            trigger(target, "set" /* SET */, key, value);
        }
        return result;
    };
}
const mutableHandlers = {
    get,
    set
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        return true;
    },
};
const shallowReactiveHandlers = extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});
const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet,
});

function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers);
}
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandlers) {
    if (!isObject(target))
        return target;
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const exisitProxy = proxyMap.get(target);
    // 如果target被代理过了， 返回该代理
    if (exisitProxy)
        return exisitProxy;
    const proxy = new Proxy(target, baseHandlers);
    // 放入Map映射中
    proxyMap.set(target, proxy);
    return proxy;
}

export { effect, reactive, readonly, shallowReactive, shallowReadonly };
//# sourceMappingURL=reactivity.esm-bundler.js.map
