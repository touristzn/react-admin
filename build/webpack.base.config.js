const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Es3ifyPlugin = require('es3ify-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const os = require('os')
const path = require('path')
const glob = require('glob')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const defines = require('../config/define.conf')
const publicConf = require('../config/public.conf')

const isProd = process.env.NODE_ENV === 'production'

/**
 * 获取entry文件夹下的页面路径
 */
function getEntry() {
  let entry = {};
  glob.sync('./app/entry/*.jsx').forEach(ele => {
    let name = ele.split('/').pop().replace(/\.jsx?/, '');
    entry[name] = [ele];
  })
  return entry;
}

/**
 * 获取绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// ====================================================================
// string replace loader options:
// definePlugin not useable in html,
// so use string replace instead, strtof 'REPLACE_' defines
// ====================================================================
const stringReplaceLoaderOptions = [];
Object.keys(defines).forEach((key) => {
  if (key.indexOf('REPLACE_') !== 0) return;
  stringReplaceLoaderOptions.push({
    search: `\\$\\{${key}\\}`,
    replace: defines[key],
    flags: 'g',
  });
});

module.exports = {
  entry: getEntry(),

  output: {
    path: publicConf.distPath,
    publicPath: publicConf.publicPath,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
              removeAttributeQuotes: false,
              interpolate: 'require',
            },
          },
          {
            loader: 'string-replace-loader',
            options: {
              multiple: stringReplaceLoaderOptions,
            },
          },
        ],
      },

      {
        test: /\.(js|jsx)$/,
        use: [
          'happypack/loader?id=happy-babel-js',
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../.cache-loader'),
            },
          }
        ],
        exclude: '/node_modules/',
        include: [resolve('app')]
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
        include: [resolve('app/static')],
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name]-[hash:5].[ext]',
              limit: 10000,
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {// postcss需要放在less前
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('postcss-preset-env')()
              ]
            }
          },
          'less-loader',
        ],
      },

      {
        test: /\.(eot|ttf|woff|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name]-[hash:5].[ext]',
              limit: 5000
            }
          }
        ]
      }
    ]
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 5000000,
    maxAssetSize: 3000000
  },

  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      '@': path.resolve(__dirname, '../app'),
    },
  },

  optimization: {
    namedChunks: true,
    runtimeChunk: { name: 'manifest' },
    minimizer: !isProd
    ? []
    : [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: !isProd
        }),
        new OptimizeCSSAssetsPlugin()
      ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          test: /node_modules\/(.*)\.js/
        },
        react: {
          name: 'vendor-rect',
          chunks: 'all',
          priority: 0,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|prop-types)[\\/]/,
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
  },

  plugins: [
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    
    new ProgressBarPlugin({
      format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),

    new Es3ifyPlugin(),
    new webpack.DefinePlugin(defines),

    new TransferWebpackPlugin([
      {
        from: resolve('root/i18n-data'),
        to: 'i18n-data',
        ignore: ['.*'],
      }
    ]),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash:5].css',
    }),
  ]
}

/**
 * 配置页面
 */
const entryObj = getEntry();
Object.keys(entryObj).forEach(function html(name){
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./app/template/${name}.ejs`,
      favicon: './app/static/images/logo.png',
      minify: {
        collapseWhitespace:true,
        removeAttributeQuotes:true,
      },
      hash: true,
      inject: true,
      chunks: [name, 'vendor', 'vendor-rect', 'manifest', 'styles'],
      chunksSortMode: 'none'
    })
  )
})