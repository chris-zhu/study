var oSnake = new Snake()
oSnake.head = null
oSnake.tail = null

var DISRECTIONENUM = {
  top: {
    x: 0,
    y: -1
  },
  bottom: {
    x: 0,
    y: 1
  },
  left: {
    x: -1,
    y: 0
  },
  right: {
    x: 1,
    y: 0
  },
}

oSnake.init = function (ground) {
  var SnakeHead = SquareFactory.create('SnakeHead', 4, 1, '#f00')
  var SnakeBody1 = SquareFactory.create('SnakeBody', 3, 1, '#f0f')
  var SnakeBody2 = SquareFactory.create('SnakeBody', 2, 1, '#f0f')
  var SnakeBody3 = SquareFactory.create('SnakeBody', 1, 1, '#f0f')

  this.head = SnakeHead
  this.tail = SnakeBody3

  ground.remove(SnakeHead.x, SnakeHead.y)
  ground.append(SnakeHead)
  ground.remove(SnakeBody1.x, SnakeBody1.y)
  ground.append(SnakeBody1)
  ground.remove(SnakeBody2.x, SnakeBody2.y)
  ground.append(SnakeBody2)
  ground.remove(SnakeBody3.x, SnakeBody3.y)
  ground.append(SnakeBody3)

  // 链表
  SnakeHead.next = SnakeBody1
  SnakeHead.last = null
  SnakeBody1.next = SnakeBody2
  SnakeBody1.last = SnakeHead
  SnakeBody2.next = SnakeBody3
  SnakeBody2.last = SnakeBody1
  SnakeBody3.next = null
  SnakeBody3.last = SnakeBody2

  this.disrect = DISRECTIONENUM.right
}
// 策略模式
oSnake.strategies = {
  move: function (snake, square, ground, flag = true) {
    var newSnakeBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, '#f0f')
    var newSnakeHead = SquareFactory.create('SnakeHead', square.x, square.y, '#f00')
    newSnakeBody.next = snake.head.next
    newSnakeBody.next.last = newSnakeBody
    newSnakeBody.last = null

    ground.remove(newSnakeBody.x, newSnakeBody.y)
    ground.append(newSnakeBody)

    newSnakeHead.next = newSnakeBody
    newSnakeHead.last = null
    newSnakeBody.last = newSnakeHead

    ground.remove(newSnakeHead.x, newSnakeHead.y)
    ground.append(newSnakeHead)
    snake.head = newSnakeHead
    // 删除最后一节身体  添加地板
    if (flag) {
      var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange')
      ground.remove(newFloor.x, newFloor.y)
      ground.append(newFloor)
      snake.tail = snake.tail.last
    }
  },
  eat: function (snake, square, ground) {
    this.move(snake, square, ground, false)
    oGame.score++
  },
  die: function () {
    oGame.over()
  },
}
// 蛇头移动
oSnake.move = function (ground) {
  var x = this.head.x + this.disrect.x
  var y = this.head.y + this.disrect.y
  var newSquare = ground.SquareTable[x][y]
  if (typeof newSquare.touch == 'function') {
    this.strategies[newSquare.touch()](this, newSquare, ground)
  }
}