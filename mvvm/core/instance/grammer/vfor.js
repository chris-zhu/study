import VNode from "../../vdom/vnode.js";
import {
  getValue
} from "../../utils/objUtil.js";

export function vforInit(vm, ele, parent, instrcutions) {
  let virtualNode = new VNode(ele.nodeName, ele, [], '', getVirtualNodeData(instrcutions)[2], parent, 0)
  virtualNode.instructions = instrcutions
  parent.ele.removeChild(ele)
  parent.ele.appendChild(document.createTextNode(''))
  let resultSet = analysisInstrctions(vm, instrcutions, ele, parent)
  return virtualNode
}


function getVirtualNodeData(instrcutions) {
  let inSet = instrcutions.trim().split(' ')
  if (inSet.length != 3 || inSet[1] != 'in' && inSet[1] != 'of') {
    throw new Error('error')
  }
  return inSet
}

function analysisInstrctions(vm, instrcutions, ele, parent) {
  let inSet = getVirtualNodeData(instrcutions)
  let dataSet = getValue(vm._data, inSet[2])
  if (!dataSet) {
    throw new Error('error')
  }
  let resultSet = []
  for (let i = 0; i < dataSet.length; i++) {
    let tempDom = document.createElement(ele.nodeName)
    tempDom.innerHTML = ele.innerHTML
    let env = analysisKV(inSet[0], dataSet[i], i)
    tempDom.setAttribute('env', JSON.stringify(env))
    parent.ele.appendChild(tempDom)
    resultSet.push(tempDom)
  }
  return resultSet
}

function analysisKV(instructions, value, index) {
  if (/\([a-zA-Z0-9_.]+\)/.test(instructions)) {
    instructions = instructions.trim()
    instructions = instructions.substring(1, instructions.length - 1)
  }
  let keys = instructions.split(',')
  if (keys.length == 0) {
    throw new Error('error')
  }
  let obj = {}
  if (keys.length >= 1) {
    obj[keys[0].trim()] = value
  }
  if (keys.length >= 2) {
    obj[keys[1].trim()] = index
  }
  return obj
}