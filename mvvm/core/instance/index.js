/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-01-29 23:21:23
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-29 23:36:01
 */

import {
  initMixin
} from './init.js'

import {
  renderMixin
} from "./render.js";

function Due(options) {
  this._init(options)
  if (this.created != null) {
    this.created.call(this)
  }
  this._render()
}
initMixin(Due)
renderMixin(Due)


export default Due