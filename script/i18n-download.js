const path = require('path');
const download = require('i18n-service-tool/download');
const config = require('../config/project.conf');

const i18nConf = config.i18n;
const serviceConf = i18nConf.service;

const dir = path.resolve(__dirname, '../root/i18n-data/');

download({
  server: serviceConf.server,
  locales: serviceConf.locales,
  site: serviceConf.site,
  dir,
  extension: '.js',
  transform(data) {
    let content = `window.i18nData = ${JSON.stringify(data)};`;
    return content;
  },
})
  .then(() => {
    console.log('download i18n success');
  })
  .catch((err) => {
    console.log(err);
    console.log('download i18n error');
  });
