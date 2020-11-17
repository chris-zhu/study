const koa = require('koa')
const path = require('path')
const static = require('./middleWare/static')
const app = new koa()

app.use(static(path.resolve(__dirname, 'public')))

const port = 9527

app.listen(port, () => {
  console.log('listen success on ' + port);
})