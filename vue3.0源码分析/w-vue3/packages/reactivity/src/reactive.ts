import {
  mutableHandlers,
  readonlyHandlers,
  shallowReactiveHandlers,
  shallowReadonlyHandlers
} from './baseHandlers'
import { isObject } from '@vue/shared'




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

export const reactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()

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