const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  cache: true,
  output: {
    filename: 'js/[name].[hash:5].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
})
