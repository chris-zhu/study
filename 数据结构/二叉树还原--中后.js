/*
        a
    b       c
 d    e  f    g

前： abdecfg
中： dbeafcg
后： debfgca

*/

function Node(value) {
  this.value = value
  this.left = null
  this.right = null
}

var zhong = ['d', 'b', 'e', 'a', 'f', 'c', 'g']
var hou = ['d', 'e', 'b', 'f', 'g', 'c', 'a']

function format(zhong, hou) {
  if (hou == null || zhong == null || hou.length == 0 || zhong.length == 0 || hou.length != zhong.length) return null
  var root = new Node(hou[hou.length - 1])
  var index = zhong.indexOf(root.value) // 找到根节点在中序的位置
  var houLeft = hou.slice(0, index) // 后序遍历左子树
  var houRight = hou.slice(index, hou.length - 1) // 后序遍历右子树
  var zhongLeft = zhong.slice(0, index)
  var zhongRight = zhong.slice(index + 1, zhong.length)
  root.left = format(zhongLeft, houLeft)
  root.right = format(zhongRight, houRight)
  return root
}

var root = format(zhong, hou)
console.log(root);