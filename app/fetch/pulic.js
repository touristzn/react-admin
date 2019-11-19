import fetch from '@/static/utils/fetchApi';

// 登录
export function login(data) {
  const url = '/userService/api/v1/be/admin/login'
  return fetch.postJson(url, data)
}

// city列表
export function getCity(data) {
  const url = '/spaceService/api/v1/be/location/cities'
  return fetch.get(url, data)
}

// 社区列表
export function getLocation(data) {
  const url = '/spaceService/api/v1/be/location/locations';
  return fetch.get(url, data)
}

