var oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUARE_WIDTH, YLEN * SQUARE_WIDTH)
oGround.init = function () {
  this.viewContent.style.position = 'absolute'
  this.viewContent.style.left = this.x + 'px'
  this.viewContent.style.top = this.y + 'px'
  this.viewContent.style.width = this.width + 'px'
  this.viewContent.style.height = this.height + 'px'
  this.viewContent.style.backgroundColor = '#0ff'
  document.body.appendChild(this.viewContent)

  this.SquareTable = []
  for (var i = 0; i < YLEN; i++) {
    this.SquareTable[i] = new Array(XLEN)
    for (var j = 0; j < XLEN; j++) {
      if (i == 0 || j == 0 || i == YLEN - 1 || j == XLEN - 1) {
        var newSquare = SquareFactory.create('Stone', i, j, '#000')
      } else {
        var newSquare = SquareFactory.create('Floor', i, j, 'orange')
      }
      this.SquareTable[i][j] = newSquare
      this.viewContent.appendChild(newSquare.viewContent)
    }
  }
}

oGround.remove = function (x, y) {
  var curSquare = this.SquareTable[x][y]
  this.viewContent.removeChild(curSquare.viewContent)
  this.SquareTable[x][y] = null
}
oGround.append = function (square) {
  this.SquareTable[square.x][square.y] = square
  this.viewContent.appendChild(square.viewContent)
}