const fs = require('fs')
const path = require('path')

class File {
  constructor(filename, name, ext, isFile, size, createTime, updateTime) {
    this.filename = filename
    this.name = name
    this.ext = ext
    this.isFile = isFile
    this.size = size
    this.createTime = createTime
    this.updateTime = updateTime
  }

  async getContent(isBuffer = false) {
    if (this.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.filename)
      } else {
        return await fs.promises.readFile(this.filename, 'utf-8')
      }
    }
    return null
  }

  async getChildren() {
    if (this.isFile) return []
    else {
      let children = await fs.promises.readdir(this.filename)
      children = children.map(el => {
        const res = path.resolve(this.filename, el)
        return File.getFile(res)
      })
      return Promise.all(children)
    }
  }

  static async getFile(filePath) {
    const stat = await fs.promises.stat(filePath)
    const name = path.basename(filePath)
    const ext = path.extname(filePath)
    const isFile = stat.isFile()
    const size = stat.size
    const createTime = new Date(stat.birthtime)
    const updateTime = new Date(stat.mtime)
    return new File(filePath, name, ext, isFile, size, createTime, updateTime)
  }
}

async function readDir(dirname) {
  const file = await File.getFile(dirname)
  return await file.getChildren()
}

async function test() {
  console.log(await readDir(path.resolve(__dirname, './assets')));
}

test()