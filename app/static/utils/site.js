import moment from 'moment';

/**
 * @module lib/site
 */

const { language, i18nData, languageTyoe } = window;
const isLanguageWithUrl = languageTyoe === 'path';

// 获取语言
export function getLanguage() {
  return language;
}

// 获取翻译数据
export function getI18nData() {
  return i18nData;
}

// 根地址
export function getBaseUrl() {
  return `${window.location.protocol}//${window.location.host}/`;
}

// 带语言的根地址
export function getBaseUrlWithLanguage() {
  let url = getBaseUrl();
  return isLanguageWithUrl ? `${url}${language}/` : url;
}

// 获取url中的参数
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) return unescape(r[2]);
  return null;
}

// 格式化时间戳
export function formatTime(time) {
  return moment(time).format('YYYY-MM-DD hh:mm:ss');
}
