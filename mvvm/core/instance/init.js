/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-01-29 23:27:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-01-30 15:07:20
 */
import {
  constructProxy
} from "./proxy.js";
import {
  mount
} from "./mount.js";

let uid = 0
export function initMixin(Due) {
  Due.prototype._init = function (options) {
    const vm = this
    vm.uid = uid++
    vm._isDue = true
    // 初始化data
    if (options && options.data) {
      vm._data = constructProxy(vm, options.data, '')
    }
    // 初始化created
    if (options && options.created) {
      vm.created = options.created
    }
    // 初始化methods 
    if (options && options.methods) {
      vm._methods = options.methods
      for (let temp in options.methods) {
        vm[temp] = options.methods[temp]
      }

    }
    // 初始化computed
    if (options && options.computed) {
      vm._computed = options.computed
    }
    // 初始化el 并挂载
    if (options && options.el) {
      let rootDom = document.getElementById(options.el)
      mount(vm, rootDom)
    }
  }
}