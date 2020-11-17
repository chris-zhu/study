function SquareFactory() {


}
SquareFactory.create = function (type, x, y, color) {
  if (typeof SquareFactory.prototype[type] == 'undefined') {
    throw 'no this type'
  }

  if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
    SquareFactory.prototype[type].prototype = new SquareFactory()
  }

  var newSquare = new SquareFactory.prototype[type](x, y, color)
  return newSquare
}

SquareFactory.prototype.init = function (square, color, msg) {
  square.viewContent.style.position = 'absolute'
  square.viewContent.style.width = square.width + 'px'
  square.viewContent.style.height = square.height + 'px'
  square.viewContent.style.left = square.x * SQUARE_WIDTH + 'px'
  square.viewContent.style.top = square.y * SQUARE_WIDTH + 'px'
  square.viewContent.style.backgroundColor = color
  square.touch = function () {
    return msg
  }
}

SquareFactory.prototype.Floor = function (x, y, color) {
  var oFloor = new Floor(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
  this.init(oFloor, color, MESSAGEENUM.MOVE)
  return oFloor
}
SquareFactory.prototype.Stone = function (x, y, color) {
  var oStone = new Stone(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
  this.init(oStone, color, MESSAGEENUM.DIE)
  return oStone
}
SquareFactory.prototype.Food = function (x, y, color) {
  var oFood = new Floor(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
  this.init(oFood, color, MESSAGEENUM.EAT)
  oFood.update(x, y)
  return oFood
}
SquareFactory.prototype.SnakeHead = function (x, y, color) {
  var oSnakeHead = new Stone(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
  this.init(oSnakeHead, color, MESSAGEENUM.DIE)
  oSnakeHead.update(x, y)
  return oSnakeHead
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
  var oSnakeBody = new Floor(x, y, SQUARE_WIDTH, SQUARE_WIDTH)
  this.init(oSnakeBody, color, MESSAGEENUM.DIE)
  return oSnakeBody
}