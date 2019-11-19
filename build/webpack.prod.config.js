const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[name].[chunkhash:5].js'
  },

  plugins: [
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new CleanWebpackPlugin(['dist'], {
       root: path.resolve(__dirname, '../'),
    }),

    new webpack.NoEmitOnErrorsPlugin(),
  ]
})