import fetch from '@/static/utils/fetchApi';

// 列表
export function getList(data) {
  const url = '/feedService/api/v1/be/feed/list'
  return fetch.postJson(url, data)
}

// 查看日志
export function log(data) {
  const url = '/feedService/api/v1/be/feed/log';
  return fetch.get(url, data)
}

// 显示or隐藏
export function visible(data) {
  const url = '/feedService/api/v1/be/feed/delete';
  return fetch.postJson(url, data)
}

// 修改
export function update(data) {
  const url = '/feedService/api/v1/be/feed/update';
  return fetch.postJson(url, data)
}
