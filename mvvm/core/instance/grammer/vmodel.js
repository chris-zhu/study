import {
  setValue
} from "../../utils/objUtil.js"

export function vmodel(vm, ele, data) {
  ele.onchange = function (event) {
    setValue(vm, data, ele.value)
  }
}