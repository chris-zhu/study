// audio .m4a to .mp3

const fs = require('fs')
const path = require('path')

async function readDir(path) {
  return fs.promises.readdir(path)
}


async function run() {
  const startPath = path.resolve(__dirname, '../sources/m4a')
  const aimPath = path.resolve(__dirname, '../sources/mp3')
  const audioFiles = await readDir(startPath)
  for (let i = 0; i < audioFiles.length; i++) {
    const filePath = path.join(startPath, audioFiles[i]) // 每一个文件路径
    let filename = audioFiles[i].replace(/.m4a/, '.mp3')
    filename = path.join(aimPath, filename)
    await readAndWrite(filename, filePath)
  }
}

/**
 * 
 * @param {String} filename 新的文件名
 * @param {String} filePath 读的文件路径
 */
async function readAndWrite(filename, filePath) {
  const res = await fs.promises.readFile(filePath)
  await fs.promises.writeFile(filename, res)
}

run()