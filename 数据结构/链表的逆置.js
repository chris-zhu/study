function Node(value) {
  this.value = value
  this.next = null
}

var node1 = new Node(1)
var node2 = new Node(2)
var node3 = new Node(3)
var node4 = new Node(4)
var node5 = new Node(5)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

/** 逆置链表 */

function reverseLink(root) {
  if (root.next.next == null) { // 最后一个节点
    root.next.next = root // 让最后一个节点指向自己
    return root.next
  } else {
    var result = reverseLink(root.next) //逆置链表根节点
    root.next.next = root // 让下一个指向自己
    root.next = null
    return result
  }
}

var newRoot = reverseLink(node1)

/** 遍历链表 */

function bianLink(root) {
  if (root == null) return
  console.log(root.value)
  bianLink(root.next)
}

bianLink(newRoot)