import {
  getValue
} from "../utils/objUtil.js"

// 通过模板，找到哪些节点用了该模板
let template2Vnode = new Map()

// 通过节点， 找到这个节点下有哪些模板
let vnode2Template = new Map()


export function prepareRender(vm, vnode) {
  if (vnode == null) {
    return
  }
  if (vnode.nodeType == 3) { //是个文本节点
    analysisTemplateString(vnode)
  }
  if (vnode.nodeType == 0) {
    setTempalte2Vnode(vnode.data, vnode)
    setVnode2Template(vnode.data, vnode)
  }
  analysisAttr(vm, vnode)
  for (let i = 0; i < vnode.children.length; i++) {
    prepareRender(vm, vnode.children[i])
  }
}

function analysisTemplateString(vnode) {
  let tmpList = vnode.text.match(/{{[a-zA-Z0-9_.]+}}/g)
  for (let i = 0; tmpList && i < tmpList.length; i++) {
    setTempalte2Vnode(tmpList[i], vnode)
    setVnode2Template(tmpList[i], vnode)
  }
}

function setTempalte2Vnode(template, vnode) {
  let templateName = getTemplateName(template)
  let vnodeSet = template2Vnode.get(templateName)
  if (vnodeSet) {
    vnodeSet.push(vnode)
  } else {
    template2Vnode.set(templateName, [vnode])
  }
}

function setVnode2Template(template, vnode) {
  let temp = getTemplateName(template)
  let templateSet = vnode2Template.get(vnode)
  if (templateSet) {
    templateSet.push(temp)
  } else {
    vnode2Template.set(vnode, [temp])
  }
}

function getTemplateName(template) {
  if (template.substring(0, 2) == '{{' && template.substring(template.length - 2, template.length) == '}}') {
    return template.substring(2, template.length - 2)
  } else {
    return template
  }
}

export function renderMixin(Due) {
  Due.prototype._render = function () {
    renderVnode(this, this._vnode)
  }
}

export function renderData(vm, data) {
  let vnodes = template2Vnode.get(data)
  if (vnodes != null) {
    for (let i = 0; i < vnodes.length; i++) {
      renderVnode(vm, vnodes[i])
    }
  }
}
export function renderVnode(vm, vnode) {
  if (vnode.nodeType == 3) {
    let templates = vnode2Template.get(vnode)
    if (templates) {
      let result = vnode.text
      for (let i = 0; i < templates.length; i++) {
        let templateValue = getTemplateValue([vm._data, vnode.env], templates[i])
        if (templateValue) {
          result = result.replace(`{{${templates[i]}}}`, templateValue)
        }
      }
      vnode.ele.nodeValue = result
    }
  } else if (vnode.nodeType == 1 && vnode.tag == 'INPUT') {
    let templates = vnode2Template.get(vnode)
    if (templates) {
      for (let i = 0; i < templates.length; i++) {
        let templateValue = getTemplateValue([vm._data, vnode.env], templates[i])
        if (templateValue) {
          vnode.ele.value = templateValue
        }
      }
    }
  } else {
    for (let i = 0; i < vnode.children.length; i++) {
      renderVnode(vm, vnode.children[i])
    }
  }
}


function getTemplateValue(objs, templateName) {
  for (let i = 0; i < objs.length; i++) {
    let temp = getValue(objs[i], templateName)
    if (temp != null) {
      return temp
    }
  }
  return null
}

function analysisAttr(vm, vnode) {
  if (vnode.nodeType != 1) {
    return
  }
  let attrNames = vnode.ele.getAttributeNames()
  if (attrNames.indexOf('v-model') > -1) {
    setTempalte2Vnode(vnode.ele.getAttribute('v-model'), vnode)
    setVnode2Template(vnode.ele.getAttribute('v-model'), vnode)
  }
}

export function getVNodeByTemplate(template) {
  return template2Vnode.get(template)
}

export function clearMap() {
  vnode2Template.clear()
  template2Vnode.clear()
}