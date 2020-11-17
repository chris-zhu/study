function Node(value) {
  this.value = value
  this.left = null
  this.right = null
}

var a = new Node('a')
var b = new Node('b')
var c = new Node('c')
var d = new Node('d')
var e = new Node('e')
var f = new Node('f')
var g = new Node('g')

a.left = b
a.right = c
b.left = d
b.right = e
c.left = f
c.right = g


function breadthSearch(rootList, target) {
  if (rootList == null || rootList.length == 0) return false
  var childList = [] // 当前层的所有子节点
  for (var i = 0; i < rootList.length; i++) {
    if (rootList[i] != null && rootList[i].value == target) return true
    else {
      childList.push(rootList[i].left)
      childList.push(rootList[i].right)
    }
  }
  return breadthSearch(childList, target)
}

console.log(breadthSearch([a], 'h'));