/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-01-15 10:52:46
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-15 19:00:02
 */
var Utils = {
  /** 单例模式 */
  single: function (fn) {
    var result
    return function () {
      if (!result) {
        result = fn.apply(this, arguments)
      }
      return result
    }
  },
  
}