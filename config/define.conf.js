/**
 * 常量配置
 * 用于配置 webpack.DefinePlugin
 */

const APP_ENV = process.env.APP_ENV || 'dev';
const NODE_ENV = process.env.NODE_ENV || 'development';
const prjConf = require('./project.conf');
const publicConf = require('./public.conf');
/* === config start === */
// common
const COMMON_CONF = {
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  PUBLIC_PATH: JSON.stringify(publicConf.publicPath),

  // for: string-replace-loader
  REPLACE_PUBLIC_PATH: publicConf.publicPath,
  REPLACE_I18N_CONFIG: JSON.stringify(prjConf.i18n),

  SERVER_API_SECRET: JSON.stringify('12345aa67890'),
  SERVER_API_APPID: JSON.stringify('weworkChina'),
  REPLACE_BUILD_TIME: `${Date.now()}`,
};

// envs
const ENV_CONF = {
  // dev
  dev: {
    SERVER_API_BASEURL: JSON.stringify('https://zuul-ut.nakedhub.com/'),
    NEW_SERVER_API_BASEURL: JSON.stringify('https://api-odm-uat.nakedhub.com'),
  },
  // ut
  ut: {
    SERVER_API_BASEURL: JSON.stringify('https://zuul-ut.nakedhub.com'),
    NEW_SERVER_API_BASEURL: JSON.stringify('https://api-odm-uat.nakedhub.com'),
  },
  // it
  it: {
    SERVER_API_BASEURL: JSON.stringify('http://zuul-it.nakedhub.com'),
    NEW_SERVER_API_BASEURL: JSON.stringify('https://api-odm-uat.nakedhub.com'),
  },
  // staging
  staging: {
    SERVER_API_BASEURL: JSON.stringify('https://api-staging.wework.cn/chinaos'),
    NEW_SERVER_API_BASEURL: JSON.stringify('https://api-odm-uat.nakedhub.com'),
  },
  // prod
  prod: {
    SERVER_API_BASEURL: JSON.stringify('https://api.wework.cn/chinaos'),
    NEW_SERVER_API_BASEURL: JSON.stringify('https://api-odm-rel.nakedhub.com'),
  },
};
/* === config end === */

// module.exports
module.exports = Object.assign({}, COMMON_CONF, ENV_CONF[APP_ENV]);
