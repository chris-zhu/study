import VNode from "../vdom/vnode.js"
import {
  prepareRender,
  getVNodeByTemplate,
  clearMap
} from "./render.js"
import {
  vmodel
} from "./grammer/vmodel.js"
import {
  vforInit
} from "./grammer/vfor.js"
import {
  mergeAttr
} from "../utils/objUtil.js"
import {
  checkVbind
} from "./grammer/vbind.js"
import { checkVon } from "./grammer/von.js"

export function mount(vm, ele) {
  // 进行挂载
  vm._vnode = constructVNode(vm, ele, null)
  // 进行预备渲染 （建立渲染索引 ，通过模板找vnode 通过vnode找模板）
  prepareRender(vm, vm._vnode)
}
export function initMount(Due) {
  Due.prototype.$mount = function (el) {
    let vm = this
    let rootDom = document.getElementById(el)
    mount(vm, rootDom)
  }
}

function constructVNode(vm, ele, parent) { //深度优先搜索
  let vnode = analysisAttr(vm, ele, parent)
  if (vnode == null) {
    let children = []
    let text = getNodeText(ele)
    let data = null
    let nodeType = ele.nodeType
    let tag = ele.nodeName
    vnode = new VNode(tag, ele, children, text, data, parent, nodeType)
    if (ele.nodeType == 1 && ele.getAttribute('env')) {
      vnode.env = mergeAttr(vnode.env, JSON.parse(ele.getAttribute('env')))
    } else {
      vnode.env = mergeAttr(vnode.env, parent ? parent.env : {})
    }
  }
  checkVbind(vm, vnode)
  checkVon(vm, vnode)
  let childs = vnode.nodeType == 0 ? vnode.parent.ele.childNodes : vnode.ele.childNodes
  for (let i = 0; i < childs.length; i++) {
    let childVnodes = constructVNode(vm, childs[i], vnode)
    if (childVnodes instanceof VNode) { //返回单一节点
      vnode.children.push(childVnodes)
    } else { //返回 节点数组
      vnode.children = vnode.children.concat(childVnodes)
    }
  }
  return vnode
}

function getNodeText(ele) {
  if (ele.nodeType === 3) {
    return ele.nodeValue
  } else {
    return ''
  }
}

function analysisAttr(vm, ele, parent) {
  if (ele.nodeType == 1) {
    let attrNames = ele.getAttributeNames()
    if (attrNames.indexOf('v-model') != -1) {
      vmodel(vm, ele, ele.getAttribute('v-model'))
    }
    if (attrNames.indexOf('v-for') != -1) {
      return vforInit(vm, ele, parent, ele.getAttribute('v-for'))
    }
    if (attrNames.indexOf('v-bind') > -1) {

    }
  }
}

export function rebuild(vm, template) {
  let virtualVNodes = getVNodeByTemplate(template)
  for (let i = 0; i < virtualVNodes.length; i++) {
    virtualVNodes[i].parent.ele.innerHTML = ''
    virtualVNodes[i].parent.ele.appendChild(virtualVNodes[i].ele)
    let result = constructVNode(vm, virtualVNodes[i].ele, virtualVNodes[i].parent)
    virtualVNodes[i].parent.children = [result]
    clearMap()
    prepareRender(vm, vm._vnode)
  }
}