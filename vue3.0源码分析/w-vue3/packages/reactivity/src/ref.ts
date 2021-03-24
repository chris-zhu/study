import { hasChanged, isArray, isObject } from "@vue/shared/src"
import { reactive } from "./reactive"
import { track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations"



export function ref(value) {
  return createRef(value)
}


class RefImpl {
  private _value: any
  public readonly __v_isRef = true
  constructor(private _rawValue, public readonly _shallow = false) {
    this._value = _shallow ? _rawValue : convert(_rawValue)
  }

  get value() {
    track(this, TrackOpTypes.GET, 'value')
    return this._value
  }

  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = this._shallow ? newValue : convert(newValue)
      trigger(this, TriggerOpTypes.SET, 'value', newValue)
    }
  }
}
class ObjectRefImpl {
  public readonly __v_isRef = true
  constructor(private readonly _object, private readonly _key) { }
  get value() {
    return this._object[this._key]
  }
  set value(newVal) {
    this._object[this._key] = newVal
  }
}

function createRef(rawValue, shallow = false) {
  if (isRef(rawValue)) return rawValue
  return new RefImpl(rawValue, shallow)
}

function isRef(r) {
  return Boolean(r && r.__v_isRef === true)
}

const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val as any) : val


export function toRef(object, key) {
  return isRef(object[key])
    ? object[key]
    : (new ObjectRefImpl(object, key) as any)
}

export function toRefs(object) {
  const ret = isArray(object) ? new Array(object.length) : {}
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}