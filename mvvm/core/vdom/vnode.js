/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-01-30 14:55:40
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-30 15:03:49
 */
export default class VNode {
  constructor(tag, //标签类型
    ele, //真实dom节点
    children, //当前文本下面的子节点
    text, //当前虚拟节点的文本
    data, //VNodeData 
    parent, //父级节点
    nodeType //节点类型
  ) {
    this.tag = tag
    this.ele = ele
    this.children = children
    this.text = text
    this.data = data
    this.parent = parent
    this.nodeType = nodeType
    this.env = {} // 当前节点的环境变量
    this.instructions = null //存放指令
    this.tempalte = [] //当前节点涉及到的模板
  }
}