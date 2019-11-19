const path = require('path');
const colors = require('colors');
const koa = require('koa');
const cors = require('@koa/cors');
const onerror = require('koa-onerror')
const rewrite = require('koa-rewrite')
const connectHistory = require('koa-connect-history-api-fallback')
const webpack = require('webpack')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')

const publicConf = require('../../config/public.conf');
const prjConf = require('../../config/project.conf');

const webpackConfig = require('../../build/webpack.dev.config');
const compiler = webpack(webpackConfig);

const devServerConf = prjConf.devServer;
const i18nConf = prjConf.i18n;

// new app
const app = new koa();

onerror(app);

app.use(connectHistory({
  path: /^\//
}))

Object.keys(webpackConfig.entry).forEach(function (key) {
  let val = webpackConfig.entry[key];
  val.unshift('webpack-hot-middleware/client')
  val.unshift('react-hot-loader/patch')
});

app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
  noInfo: false
}))

app.use(hotMiddleware(compiler, {
  log: console.log
}));

/* == REWRITES == */
// language rewrite
if (i18nConf.on) {
  let languages = i18nConf.languages || ['zh-CN'];
  let map = i18nConf.map || {};
  let languageArr = languages.concat(Object.keys(map));
  let langRewriteStr = languageArr.join('|');
  app.use(rewrite(new RegExp(`^/(${langRewriteStr})/(.*)$`), '/$2'));
}

// 开启监听服务
const server = app.listen(devServerConf.port);
console.log(`Please visit http://127.0.0.1:${devServerConf.port}`.blue);