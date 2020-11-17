var {CleanWebpackPlugin} = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry : './src/main.js',
  output:{
    filename: '[name].[chunkhash:5].js'
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]

}