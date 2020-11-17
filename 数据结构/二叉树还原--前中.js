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

var qian = ['a', 'b', 'd', 'e', 'c', 'f', 'g']
var zhong = ['d', 'b', 'e', 'a', 'f', 'c', 'g']

function format(qian, zhong) {
  if (qian == null || zhong == null || qian.length == 0 || zhong.length == 0 || qian.length != zhong.length) return null
  var root = new Node(qian[0])
  var index = zhong.indexOf(root.value) // 找到根节点在中序的位置
  var qianLeft = qian.slice(1, index + 1) // 前序遍历左子树
  var qianRight = qian.slice(index + 1, qian.length) // 前序遍历右子树
  var zhongLeft = zhong.slice(0, index)  // 中序遍历左子树
  var zhongRight = zhong.slice(index + 1, zhong.length) // 中序遍历右子树
  root.left = format(qianLeft, zhongLeft)
  root.right = format(qianRight, zhongRight)
  return root
}

var root = format(qian, zhong)
console.log(root);