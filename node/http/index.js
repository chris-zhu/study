const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

// async function handle(req, res) {

//   // console.log(URL.parse(req.url));

//   res.write(await readFile())
//   res.end()
// }

// async function readFile() {
//   return await fs.promises.readFile(path.resolve(__dirname, './public/index.html'))
// }

// const server = http.createServer(handle)

// server.on('listening', () => {
//   console.log('server is listening on 4545');
// })

// server.listen(4545)

// const imgSrc = 'http://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png'
const imgSrc = 'http://img10.static.yhbimg.com/goodsimg/2020/05/28/11/01f5d009fb769bb2f0117e26da738d3f24.jpg'

function test() {
  http.get(imgSrc, function (res) {
    res.setEncoding('binary'); //二进制（binary）
    var imageData = '';
    res.on('data', function (data) { //图片加载到内存变量
      imageData += data;
    }).on('end', function () { //加载完毕保存图片
      fs.writeFile(path.resolve(__dirname, './public/img/newImg2.jpg'), imageData, 'binary', function (err) { //以二进制格式保存
        if (err) throw err;
        console.log('file saved');
      });
    });
  });
}

test()