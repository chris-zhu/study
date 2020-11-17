const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: {
    list: './src/list/index.js',
    details: './src/details/index.js'
  },
  output: {
    filename: 'scripts/[name].[chunkhash:5].js'
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({
      template: "./public/list.html",
      filename: 'list.html',
      chunks:['list']
    }),
    new HtmlWebpackPlugin({
      template: "./public/details.html",
      filename: 'details.html',
      chunks: ['details']
    })
  ],
  stats: {
    modules: false,
    colors: true
  },
}