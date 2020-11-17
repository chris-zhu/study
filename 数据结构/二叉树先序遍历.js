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

function f1(root) {
  if (root == null) return
  console.log(root.value)
  f1(root.left)
  f1(root.right)
}

f1(a)