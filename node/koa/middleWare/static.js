const fs = require('fs')
const path = require('path')
const mime = require('mime')

const {
  get
} = require('http')

async function getFilename(urlPath, root) {
  const subpath = urlPath.substring(1)
  const filename = path.resolve(root, subpath)
  try {
    const stat = await fs.promises.stat(filename)
    if (stat.isDirectory()) {
      const newUrlpath = path.join(urlPath, 'index.html')
      return await getFilename(newUrlpath, root)
    } else {
      return filename
    }
  } catch (err) {
    return null
  }
}

module.exports = function (root) {
  return async function (ctx, next) {
    const filename = await getFilename(ctx.path, root)
    if(!filename){
      await next()
      return
    }
    ctx.body = fs.createReadStream(filename)
    ctx.type = mime.getType(filename)
  }
}