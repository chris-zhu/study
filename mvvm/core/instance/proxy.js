import {
  renderData
} from "./render.js";
import {
  rebuild
} from './mount.js'
/**
 * 创建一个代理对象  
 * 我们要知道那个属性被修改了  我们才能对页面上的内容更新
 * 所以我们必须先能够捕获修改的事件
 * 所以使用对象代理的方式来实现监听属性修改
 */

const arrayProto = Array.prototype

function defArrayFunc(obj, func, namespace, vm) {
  Object.defineProperty(obj, func, {
    enumerable: true,
    configurable: true,
    value: function (...args) {
      let original = arrayProto[func]
      const result = original.apply(this, args)
      rebuild(vm, getNamespace(namespace, ''))
      renderData(vm, getNamespace(namespace, ''))
      return result
    }
  })
}


function constructObjectProxy(vm, obj, namespace) {
  let proxyObj = {}
  for (let prop in obj) {
    Object.defineProperty(proxyObj, prop, {
      configurable: true,
      get() {
        return obj[prop]
      },
      set(value) {
        obj[prop] = value
        renderData(vm, getNamespace(namespace, prop))
      }
    })
    // 避免data下面的子属性挂载到vm上面
    if (getNamespace(namespace, '') == '') {
      Object.defineProperty(vm, prop, {
        configurable: true,
        get() {
          return obj[prop]
        },
        set(value) {
          obj[prop] = value
          renderData(vm, getNamespace(namespace, prop))
        }
      })
    }
    if (obj[prop] instanceof Object) {
      proxyObj[prop] = constructProxy(vm, obj[prop], getNamespace(namespace, prop))
    }
  }
  return proxyObj
}

function proxyArray(vm, arr, namespace) {
  let obj = {
    eleType: 'Array',
    toString: function () {
      let result = ''
      for (let i = 0; i < arr.length; i++) {
        result += arr[i] + ', '
      }
      return result.substring(0, result.length - 2)
    },
    push() {},
    pop() {},
    shift() {},
    unshift() {}
  }
  defArrayFunc.call(vm, obj, 'push', namespace, vm)
  defArrayFunc.call(vm, obj, 'pop', namespace, vm)
  defArrayFunc.call(vm, obj, 'shift', namespace, vm)
  defArrayFunc.call(vm, obj, 'unshift', namespace, vm)
  arr.__proto__ = obj
  return arr
}

function getNamespace(nowNamespace, nowProp) {
  if (nowNamespace == null || nowNamespace == '') {
    return nowProp
  } else if (nowProp == null || nowProp == '') {
    return nowNamespace
  } else {
    return nowNamespace + '.' + nowProp
  }
}

/** 
 * @param {*} vm 表示 Due对象
 * @param {*} obj  表示 需要代理的对象
 * @param {*} namespace 命名空间 
 */
export function constructProxy(vm, obj, namespace) {
  // 递归
  let proxyObj = null
  if (obj instanceof Array) {
    proxyObj = new Array(obj.length)
    for (let i = 0; i < obj.length; i++) {
      proxyObj[i] = constructProxy(vm, obj[i], namespace)
    }
    proxyObj = proxyArray(vm, obj, namespace)
  } else if (obj instanceof Object) {
    proxyObj = constructObjectProxy(vm, obj, namespace)
  } else {
    throw new Error('error')
  }
  return proxyObj
}