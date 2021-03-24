import { isFunction } from "@vue/shared/src"
import { effect, track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations";


const NOOP = () => { }

class ComputedRefImpl {
  public readonly effect
  private _dirty = true
  public readonly __v_isRef = true;
  private _value


  constructor(getter, private readonly setter, isReadonly) {
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => { // 错误点： 这里必须用箭头函数，绑定this到当前实例
        if (!this._dirty) {
          this._dirty = true
          trigger(this, TriggerOpTypes.SET, 'value')
        }
      }
    })
    this['__v_isReadonly'] = isReadonly
  }

  public get value() {
    if (this._dirty) {
      this._value = this.effect()
      this._dirty = false
    }
    track(this, TrackOpTypes.GET, 'value')
    return this._value
  }

  public set value(newVal) {
    this.setter(newVal)
  }


}


export function computed(getterOrOptions) {
  let getter
  let setter
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set)
}