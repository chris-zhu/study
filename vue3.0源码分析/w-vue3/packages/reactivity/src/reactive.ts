import {
  mutableHandlers,
  readonlyHandlers,
  shallowReactiveHandlers,
  shallowReadonlyHandlers
} from './baseHandlers'
import { isObject } from '@vue/shared'

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.RAW]?: any
}

export const reactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()

export function reactive(target: object) {
  return createReactiveObject(target, false, mutableHandlers)
}
export function shallowReactive(target: object) {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}
export function readonly(target: object) {
  return createReactiveObject(target, true, readonlyHandlers)
}
export function shallowReadonly(target: object) {
  return createReactiveObject(target, true, shallowReadonlyHandlers)
}



function createReactiveObject(target, isReadonly, baseHandlers) {
  if (!isObject(target)) return target

  const proxyMap = isReadonly ? readonlyMap : reactiveMap
  const exisitProxy = proxyMap.get(target)
  // 如果target被代理过了， 返回该代理
  if (exisitProxy) return exisitProxy

  const proxy = new Proxy(target, baseHandlers)
  // 放入Map映射中
  proxyMap.set(target, proxy)
  return proxy

}

// export function isReactive(value) {
//   if()
// }
export function isReadonly(value) {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])  
}


// export function isReactive(value: unknown): boolean {
//   if (isReadonly(value)) {
//     return isReactive((value as Target)[ReactiveFlags.RAW])
//   }
//   return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
// }

// export function isReadonly(value: unknown): boolean {
//   return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
// }

// export function isProxy(value: unknown): boolean {
//   return isReactive(value) || isReadonly(value)
// }