import Reflux from 'Reflux'
import action from './action'
import { __ } from '@/static/utils/i18n';

const mainStore = Reflux.createStore({ 
  // 监听action   
  listenables: [action],

  // 登录用户
  loginUser: null,

  // 国际化语言
  languages: [
    {
      label: __('简体中文'),
      key: 'zh-CN',
    },
    {
      label: __('繁体中文'),
      key: 'zh-HK',
    },
    {
      label: __('英文'),
      key: 'en-US',
    },
  ],

  // 当前url
  pathname: '',
  // cities
  cities: null,
  // locations
  locations: null,
  
  onLoginUser(user) {
    this.loginUser = user;
    localStorage.setItem('loginUser', JSON.stringify(user));
    // 更新数据状态
    this.trigger(this.loginUser);
  },

  onPathName(url) {
    this.pathname = url;
    this.trigger(this.pathname);
  },

  onGetCities(data) {
    this.cities = data;
    this.trigger(this.cities);
  },

  onGetLocations(data) {
    this.locations = data;
    this.trigger(this.locations);
  },

});

module.exports = mainStore;
