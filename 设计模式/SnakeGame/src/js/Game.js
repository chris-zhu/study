/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-01-13 22:54:27
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-13 23:42:27
 */
var oGame = new Game()
oGame.timer = null
oGame.score = 0
oGame.init = function () {
  oGround.init()
  oSnake.init(oGround)
  // caeateFood(oGround)
  // 绑定事件
  document.onkeydown = function (e) {
    if (e.which == 37 && oSnake.disrect != DISRECTIONENUM.right) {
      oSnake.disrect = DISRECTIONENUM.left
    } else if (e.which == 38 && oSnake.disrect != DISRECTIONENUM.bottom) {
      oSnake.disrect = DISRECTIONENUM.top
    } else if (e.which == 39 && oSnake.disrect != DISRECTIONENUM.left) {
      oSnake.disrect = DISRECTIONENUM.right
    } else if (e.which == 40 && oSnake.disrect != DISRECTIONENUM.top) {
      oSnake.disrect = DISRECTIONENUM.bottom
    }
  }

}
oGame.start = function () {
  this.timer = setInterval(function () {
    oSnake.move(oGround)
  }, INTERVAL);
}
oGame.over = function () {
  clearInterval(this.timer)
  alert(this.score)
}
oGame.init()

function caeateFood(ground) {
  var x = null
  var y = null
  var flag = true
  while (flag) {
    x = 1 + Math.floor(Math.random() * (XLEN - 2))
    y = 1 + Math.floor(Math.random() * (YLEN - 2))
    var ok = true
    for (var node = oSnake.head; node; node = node.next) {
      if (x == node.x && y == node.y) {
        ok = false
        break
      }
    }
    if (ok) {
      falg = false
    }
  }
  var oFood = SquareFactory.create('Food', x, y, 'blue')
  ground.remove(oFood.x, oFood.y)
  ground.append(oFood)
}