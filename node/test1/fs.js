const fs = require('fs')
const path = require('path');
const {
  Buffer
} = require('buffer');

const filename = path.resolve(__dirname, './assets/1.txt')

// fs.readFile(filename, (err, res) => {
//   console.log(res)
//   const originTxt = res
//   fs.writeFile(filename, res + 'aaaaa', {

//   }, (err) => {

//   })
// })

async function readFile(filename) {
  const res = await fs.promises.readFile(filename, 'utf-8')
  console.log(res);
  await writeFile(filename, '12312312312', {
    encoding: 'utf-8',
    flag: 'a'
  })
}

// readFile(filename)

async function writeFile(filename, data, option) {
  const res = await fs.promises.writeFile(filename, data, option)
  console.log('写入成功');
}

async function writeBufferFile() {

  const data = Buffer.from('啊撒旦艰苦', 'utf-8')
  const filename = path.resolve(__dirname, './assets/2.txt')

  await fs.promises.writeFile(filename, data)
  console.log('写入成功');
}

// writeBufferFile()


/** copyImage 写文件的方式copy一张image */

async function copyImage() {
  const originImgPath = path.resolve(__dirname, './assets/scenery-12.png')
  const imgDate = await fs.promises.readFile(originImgPath)
  await fs.promises.writeFile(path.resolve(__dirname, './assets/scenery-12-copy.png'), imgDate)
}
// copyImage()

/** stat 文件状态 */

async function stat() {
  const stat = await fs.promises.stat(path.resolve(__dirname, './assets'))
  console.log(stat);
  console.log('是否是文件夹：', stat.isDirectory());
  console.log('是否是文件：', stat.isFile());
}

// stat()


/** readdir 读文件夹 */

async function readdir() {
  const readdir = await fs.promises.readdir(path.resolve(__dirname, './assets'))
  console.log(readdir);
}

// readdir()

/** mkdir 创建文件夹 */

async function mkdir(path) {
  await fs.promises.mkdir(path)
  console.log('mkdir success');
}

// mkdir(path.resolve(__dirname,'./assets/newDir'))


/** exit  判断文件是否存在 */

async function myExists(filename) {
  try {
    await fs.promises.stat(filename)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false //文件不存在
    }
    throw err
  }
}

async function test() {
  const filename = path.resolve(__dirname, './assets/1')
  const result = await myExists(filename)
  if (result) {
    console.log('文件已存在');
  } else {
    await fs.promises.mkdir(filename)
    console.log('文件夹写入成功');
  }
}

// test()