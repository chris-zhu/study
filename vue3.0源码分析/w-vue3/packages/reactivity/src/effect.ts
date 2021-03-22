import { isArray, isIntegerKey, isMap } from "@vue/shared/src"
import { TriggerOpTypes } from "./operations"


export const ITERATE_KEY = Symbol('iterate')
export const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate')

export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

let uid = 0
const effectStack = []
let activeEffect // 当前的effect

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
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++
  effect.allowRecurse = !!options.allowRecurse
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect.options = options

  return effect
}

const targetMap = new WeakMap()
/**
 * targetMap:  {
 *   key: ['target'] :  Map: [key: 'key' : Set() ]
 * }
 */
export function track(target, type, key) {
  if (activeEffect === undefined) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger(target, type, key?, newValue?, oldvalue?) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const effects = new Set() // 将所有的 effect 存入一个集合中

  /** 将set里面的收集effect添加到effects中 */
  const add = (effectsToAdd: Set<any>) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect !== activeEffect || effect.allowRecurse) {
          effects.add(effect)
        }
      })
    }
  }

  // 修改的是数组的长度
  if (key === 'length' && isArray(target)) {
    // 如果对应的长度有依赖， 则需要收集依赖
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newValue) {
        // 如果更改的长度小于收集的索引，那么这个索引也需要触发effect重新执行
        add(dep)
      }
    })
  } else {
    // 可能是对象
    if (key !== undefined) { // 这里肯定是修改   
      add(depsMap.get(key)) // 不可能是添加  添加 depsMap.get(key) 返回是个undefined  因为还没有收集依赖
    }

    switch (type) {
      case TriggerOpTypes.ADD:
        if (!isArray(target)) {
          add(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            add(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        } else if (isIntegerKey(key)) {
          // 添加了一个索引  触发长度更新
          // new index added to array -> length changes
          add(depsMap.get('length'))
        }
        break
      case TriggerOpTypes.DELETE:
        if (!isArray(target)) {
          add(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            add(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        break
      case TriggerOpTypes.SET:
        if (isMap(target)) {
          add(depsMap.get(ITERATE_KEY))
        }
        break
    }

  }

  effects.forEach((effect: any) => effect())

}