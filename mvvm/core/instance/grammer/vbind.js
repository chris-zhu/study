import {
  getValue,
  getEnvAttr
} from "../../utils/objUtil.js";
import {
  isTrue,
  generateCode
} from '../../utils/code.js'


export function checkVbind(vm, vnode) {
  if (vnode.nodeType != 1) {
    return
  }
  let attrNames = vnode.ele.getAttributeNames()
  for (let i = 0; i < attrNames.length; i++) {
    if (attrNames[i].indexOf("v-bind:") == 0 || attrNames[i].indexOf(":") == 0) {
      vBind(vm, vnode, attrNames[i], vnode.ele.getAttribute(attrNames[i]));
    }
  }
}

function vBind(vm, vnode, name, value) {
  let k = name.split(":")[1];
  if (/^{[\w\W]+}$/.test(value)) {
    let str = value.substring(1, value.length - 1).trim(); //解析出表达式的内容
    let expressionList = str.split(",");
    let result = analysisExpression(vm, vnode, expressionList);
    vnode.ele.setAttribute(k, result);
  } else {
    let v = getValue(vm._data, value);
    vnode.ele.setAttribute(k, v);
  }
}

function analysisExpression(vm, vnode, expressionList) {
  // 获取当前得环境变量
  let attr = getEnvAttr(vm, vnode)
  //判断表达式是否成立
  let code = generateCode(attr)
  // 拼组result
  let result = ''
  for (let i = 0; i < expressionList.length; i++) {
    let site = expressionList[i].indexOf(":");
    if (site > -1) {
      if (isTrue(expressionList[i].substring(site + 1, expressionList[i].length), code)) {
        result += expressionList[i].substring(0, site) + ",";
      }
    } else {
      result += expressionList[i] + ",";
    }
  }
  if (result.length > 0) {
    result = result.substring(0, result.length - 1);
  }
  return result;
}