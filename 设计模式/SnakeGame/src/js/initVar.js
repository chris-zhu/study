// 游戏的配置

var XLEN = 30
var YLEN = 30

var SQUARE_WIDTH = 20

var BASE_X_POINT = 200
var BASE_Y_POINT = 200

var INTERVAL = 300

function Square(x, y, width, height, dom) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.viewContent = dom || document.createElement('div')
}

Square.prototype.touch = function () {
  console.log('touch')
}

Square.prototype.update = function (x, y) {
  this.x = x
  this.y = y
  this.viewContent.style.left = x * SQUARE_WIDTH + 'px'
  this.viewContent.style.top = y * SQUARE_WIDTH + 'px'
}

var Floor = tool.extends(Square)
var Snake = tool.single()
var SnakeBody = tool.extends(Square)
var SnakeHead = tool.single(Square)
var Stone = tool.extends(Square)
var Food = tool.single(Square)
var Ground = tool.single(Square)
var Game = tool.single()

var MESSAGEENUM = {
  MOVE: 'move',
  EAT: 'eat',
  DIE: 'die'
}