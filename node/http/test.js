const axios = require('axios').default
const fs = require('fs')
const path = require('path')
const http = require('http')

// const imgSrc = 'https://img10.static.yhbimg.com/goodsimg/2020/05/28/11/01f5d009fb769bb2f0117e26da738d3f24.jpg'
const imgSrc = 'http://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png'

async function getImgInfo() {
  const info = await axios.get(imgSrc)
  const buffer = Buffer.from(info.data)
  await fs.promises.writeFile(path.resolve(__dirname, './public/img/newImg3.jpg'), buffer)
}
getImgInfo()