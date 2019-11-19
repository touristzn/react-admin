/**
 * 项目配置
 */

module.exports = {
  // dev server 配置: 不能删
  // build/dev-server.js
  devServer: {
    // 端口
    port: 3000,
    // 跨域
    // https://github.com/koajs/cors
    proxyCors: {
      allowHeaders: ['HEADER_TOKEN', 'Locale', 'content-type'],
      exposeHeaders: ['HEADER_TOKEN', 'Access-Control-Allow-Origin'],
    },
  },

  // 国际化配置
  i18n: {
    // 开启国际化
    on: true,
    // 语言列表
    languages: ['zh-CN', 'zh-HK', 'en-US'],
    // 映射语言
    map: {
      cn: 'zh-CN',
      hk: 'zh-HK',
      en: 'en-US',
    },
    // 检查语言的顺序
    detects: [
      // /zh-CN/xxx
      'path',
      // /xxx?lang=zh-CN
      'query',
      // localStorage.getItem('lang')
      'store',
      // navigator.language: zh-CN
      'browser',
    ],
    // 默认语言
    default: 'zh-CN',
    // i18n-service 配置
    // https://github.com/ccqgithub/i18n-service
    service: {
      server: 'http://i18n.nakedhub.com/',
      site: 'china-app-admin',
      locales: ['zh-CN', 'zh-HK', 'en-US'],
    },
  },
};
