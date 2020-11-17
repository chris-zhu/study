const Base = require('./webpack.base')
const Dev = require('./webpack.dev')
const Prod = require('./webpack.prod')

module.exports = env => {
  if (env && env.prod) {
    return {
      ...Base,
      ...Prod
    }
  } else {
    return {
      ...Base,
      ...Dev
    }
  }
}