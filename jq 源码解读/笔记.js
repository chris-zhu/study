/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-04 10:29:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-04 10:45:05
 */
//96-283         给jQ对象添加方法和属性
//285-347        extend:jQ的继承方法(实例方法)
//349-817        jQuery.extend():扩展一些工具方法(静态方法)
//877-2856       Sizzle:复杂选择器的实现
//2880-3042      Callbacks:回调对象:函数的统一管理
//3043-3183      Deferred:延迟对象:对异步的统一管理
//3184-3295      support:功能检测
//3308-3652      data():数据缓存
//3653-3797      queue():队列管理
//3803-4299      attr() prop() val() addClass()...对元素属性的操作
//4300-5218      on() trigger():事件操作相关方法
//5140-6057      DOM操作:添加  删除  获取  包装  DOM筛选
//6058-6620      css():样式的操作
//6621-7854      提交的数据和ajax():ajax()   load()   getJson()
//7855-8584      animate():运动的方法
//8585-8792      offset():位置与尺寸的方法
//8804-8821      jQuery支持模块化的模式
//8826           提供接口


//jQuery.merge:Function  :
let jQuery = {
  merge: function (first, second) {
    //如果second.length是一个字符串，那么+second.length就是数字了，通过typeof +"123"将返回number
    //如果是+ "xx"那么就会返回0，typeof还是会返回number
    var len = +second.length,
      j = 0,
      i = first.length;
    //通过i不断的往里面添加，数组长度自动增加
    //通过该循环，j就是第二个数组的长度
    while (j < len) {
      first[i++] = second[j++];
    }
    // Support: IE<9
    // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
    //在IE<9中，会把NodeList等类数组对象的length转为NaN
    if (len !== len) {
      while (second[j] !== undefined) {
        first[i++] = second[j++];
      }
    }
    //重新设置数组长度，数组的长度一般是number类型
    first.length = i;
    return first;
  }
};