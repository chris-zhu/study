function Node(value) {
  this.value = value;
  this.next = null;
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
a.next = b;
b.next = c;
c.next = d;

/**
 * 打印链表
 * @param {*} root
 */
function printf(root) {
  if (!root) return;
  console.log(root.value);
  printf(root.next);
}

/**
 * 获取链表的长度
 * @param {*} root
 */
function getLength(root) {
  if (!root) return 0;
  return 1 + getLength(root.next);
}

// console.log(getLength(c));

/**
 * 通过下标获取链表节点
 * @param {*} root
 * @param {*} index
 */
function getValue(root, index) {
  /** 判断某个节点是否是我要查找的节点 */
  function _getValue(node, i) {
    if (!node) return null;
    if (i == index) return node;
    return _getValue(node.next, i + 1);
  }
  return _getValue(root, 0);
}
// console.log(getValue(a, 4));

/**
 * 通过下标设置值
 * @param {*} root
 * @param {*} index
 * @param {*} value
 */
function setValue(root, index, value) {
  function _setValue(node, i) {
    if (!node) return;
    if (i == index) return (node.value = value);
    _setValue(node.next, i + 1);
  }

  _setValue(root, 0, value);
}

// setValue(a, 0, '哈哈')
// printf(a)

/**
 * 在链表的某一个位置添加一个节点
 * @param {*} root
 * @param {*} index
 * @param {*} node
 */
function addNode(root, index, newNode) {
  function _addNode(node, i) {
    if (!node) return;
    if (i == index) {
      newNode.next = node.next;
      node.next = newNode;
      return;
    }
    _addNode(node.next, i + 1);
  }
  _addNode(root, 0);
}

// var newNode = new Node("newNode");
// addNode(a, 3, newNode);
// printf(a)

/**
 * 链表末尾添加一个节点
 * @param {*} root
 * @param {*} newNode
 */
function pushNode(root, newNode) {
  if (!root.next) {
    root.next = newNode;
    return;
  }
  pushNode(root.next, newNode);
}

// var newNode = new Node("newNode");
// pushNode(c, newNode);
// printf(c)

/**
 * 根据链表和 某个节点的值，删除该节点  // todo
 * @param {*} root
 * @param {*} value
 */
function deleteNode(root, value) {
  if (!root || !root.value) return;
  if ((root.value = value)) return root;
  if (root.next.value == value) {
    root.next = root.next.next;
  } else {
    deleteNode(root.next, value);
  }
  return root;
}

deleteNode(a, "c");
printf(a);
