import {
  getValue
} from "../../utils/objUtil.js"

export function checkVon(vm, vnode) {
  if (vnode.nodeType != 1) {
    return
  }
  let attrNames = vnode.ele.getAttributeNames()
  for (let i = 0; i < attrNames.length; i++) {
    if (attrNames[i].indexOf('v-on') == 0 || attrNames[i].indexOf('@') == 0) {
      von(vm, vnode, attrNames[i].split(':')[1], vnode.ele.getAttribute(attrNames[i]))
    }
  }
}

function von(vm, vnode, event, name) {
  let method = getValue(vm._methods, name)
  if (method) {
    vnode.ele.addEventListener(event, proxyEvecute(vm, method))
  }
}

function proxyEvecute(vm, method) {
  return function () {
    method.call(vm)
  }
}