import qs from 'qs'
import { Base64 } from 'js-base64'
import MD5 from 'md5.js'
import message from '@/static/utils/message'
import mainStore from '@/reflux/store'
import mainAction from '@/reflux/action'

const apiBaseUrl = SERVER_API_BASEURL;
const apiSecret = SERVER_API_SECRET;
const apiAppId = SERVER_API_APPID;

/**
* 定义请求时header携带的参数
*/
const encryptData = (obj) => {
  let data = Object.assign({}, obj, {
    appId: apiAppId,
  });

  // 参数小写
  let eData = {};
  Object.keys(data).forEach((key) => {
    eData[key.toLowerCase()] = data[key];
  });

  let msg = JSON.stringify(eData, Object.keys(eData).sort());
  msg = Base64.encode(msg);

  let sign = new MD5().update(msg + apiSecret).digest('hex');

  return {
    appId: apiAppId,
    sign: sign.toLowerCase(),
  };
}

/**
* 设置请求超时和中止请求
*/
const myFetch = (requestPromise, cancel, timeout = 10 * 1000) => {
  let timeoutFn
  let abort

  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutFn = () => {
      reject(new Error('网络请求超时'))
    }
  })

  const abortPromise = new Promise((resolve, reject) => {
    abort = () => {
      cancel()
      resolve()
    }
  })

  const fetchPromise = Promise.race([
    requestPromise,
    timeoutPromise,
    abortPromise,
  ])

  // 计时
  setTimeout(timeoutFn, timeout)

  // 终止
  fetchPromise.abort = abort

  return fetchPromise
}

/**
* 设置返回的data类型
*/
const returnType = (response) => {
  const contentType = response.headers.get('Content-Type');
  // 根据返回的内容类型，做不同的处理
  if (contentType) {
    if (contentType.includes('json')) {
      return response.json()
    }
    if (contentType.includes('text')) {
      return response.text()
    }
    if (contentType.includes('form')) {
      return response.formData()
    }
    if (contentType.includes('video')) {
      return response.blob()
    }
  }

  return response.json()
}

/**
* 自定义fetch请求
*/
const fetchApi = (url, body, method, type) => {
  // 从store中获取token
  const token = mainStore.loginUser ? `X-CAT ${mainStore.loginUser.accessToken}` : '';
  // 拼接url，并加入签名
  const newUrl = (apiBaseUrl + url).replace('//', '/') + '?' + qs.stringify(method === 'GET' ? Object.assign({}, encryptData(), body) : encryptData());
  // headers
  const contentType = type === 'json'
                  ? Object.assign(
                      {'Content-Type': 'application/json'},
                      { 'Accept': 'application/json'}
                    )
                  : {'Content-Type': 'application/x-www-form-urlencoded'}
  // 请求参数
  const methodology = method === 'POST' || method === 'PUT' || method === 'DELETE';
  const dataForm = methodology ? qs.stringify(body) : null;
  const dataJson = type === 'json' && methodology ? JSON.stringify(body) : null;
  // 取消请求
  const abortController = new AbortController()
  const cancel = () => {
    return abortController.abort()
  }
  // 自定义请求对象
  const fetchRequest = new Promise((resolve, reject) => {
    let status = 0

    fetch(newUrl, {
      method,
      body: body && type === 'json' ? dataJson : dataForm,
      headers: Object.assign(
        contentType,
        {
          locale: window.language,
          Authorization: token,
        },
      ),
      mode: 'cors',
      signal: abortController.signal,
    })
    .then(response => {
      status = response.status
      return response
    })
    .then(returnType)
    .then(response => {
      // 如果状态码在300到900之间，将以错误返回
      if (/^[3-9]\d{2}$/.test(response.status)) {
        const url = '/userService/api/v1/refresh/token'
        const refreshToken = mainStore.loginUser.refreshToken

        switch (response.status) {
          // token过期
          case 405:
            // 获取新的accessToken
            fetchApi(url, { refreshToken }, 'POST', 'json').then(resToken => {
              console.log('resToken', resToken)
              const user = resToken.data;
              mainAction.loginUser(user);
            })
            break;

          default:
            message({
              type: 'danger',
              message: response.error
            })
        }
      }

      // code不等于0视为异常
      if (!response.status && response.code !== 0) {
        switch (response.code) {
          // code等于1690代表没有权限
          // production环境跳转到spacestation.wework.com
          // staging环境跳转到spacestation-v2-staging.wework.com
          case 1690:
              message({
                type: 'danger',
                message: '没有权限，请联系管理员'
              })
  
              setTimeout(() => {
                if (process.env.NODE_ENV === 'production') {
                  window.location.href = 'https://spacestation.wework.com';
                }
                window.location.href =
                  'https://spacestation-v2-staging.wework.com';
              }, 2000);
  
              break;
  
          default:
              message({
                type: 'danger',
                message: response.msg
              })
        }
      }

      // code为0时返回数据
      resolve(response)
    })
    .catch(error => {
      console.log(error)
    })
  })

  return myFetch(fetchRequest, cancel)
}

export default {
  get: (url, body) => fetchApi(url, body, 'GET', 'json'),
  post: (url, body) => fetchApi(url, body, 'POST', 'form'),
  postJson: (url, body) => fetchApi(url, body, 'POST', 'json'),
  put: (url, body) => fetchApi(url, body, 'PUT', 'json'),
  delete: (url, body) => fetchApi(url, body, 'DELETE', 'json'),
}