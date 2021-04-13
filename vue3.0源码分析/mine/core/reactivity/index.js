let currentEffect;

class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }
  set value(val) {
    this._val = val;
    this.notice();
  }
  // 1. 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 2. 触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
}
exports.effectWatch = (effect) => {
  currentEffect = effect;
  effect();
  currentEffect = null;
};

const targetMap = new Map();

function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

exports.reactivity = (raw) => {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend(); // 收集依赖
      return Reflect.get(target, key);
    },
    set(target, key, val) {
      const result = Reflect.set(target, key, val);
      const dep = getDep(target, key);
      dep.notice();
      return result;
    },
  });
};
