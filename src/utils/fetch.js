import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
import {getToken, getCookie} from '@/utils/auth' // 验权
import global from '@/utils/global'
var params = {}
function xxxToJson(str) {
  var t
  var n
  var r
  var i = str
  var json = {}
  t = i.split('&')
  r = null
  n = null
  for (var o in t) {
    var u = t[o].indexOf('=')
    // eslint-disable-next-line no-unused-expressions
    u !== -1 && (r = t[o].substr(0, u),
      n = t[o].substr(u + 1),
      // @ts-ignore
      json[r] = n)
  }
  return json
}
// 创建axios实例
const service = axios.create({
  baseURL: global.BASE_API, // api的base_url
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    apptype: 101,
    clienttype: 100
  },
  timeout: 15000, // 请求超时时间
  transformRequest: [function(data) {
    // Do whatever you want to transform the data
    let ret = ''
    // for (const it in data) {
    //   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    // }
    params = data
    for (const key in params) {
      const newKey = encodeURIComponent(key)
      // 检查value值 如果值为数组或对象 先转成Json字符串 再传值
      let newValue = ''
      if (typeof data[key] === 'object' && data[key] !== null && data[key] !== undefined) {
        // console.log('监测到对象元素' + key)
        newValue = encodeURIComponent(JSON.stringify(data[key]))
      } else {
        newValue = encodeURIComponent(data[key])
      }
      ret += newKey + '=' + newValue + '&'
    }

    ret = ret.substring(0, ret.length - 1)
    return ret
  }]
})

// request拦截器
service.interceptors.request.use(config => {
  let accesstoken
  if (store.getters.accesstoken) {
    accesstoken = store.getters.accesstoken
  } else {
    // 暂时性解决app端打开问题
    accesstoken = getToken()
  }
  config.headers['Authorization'] = 'Bearer ' + accesstoken // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers['community'] = getCookie('communityId') // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const { config } = response
    const res = response.data
    if (res.status !== 'succ') {
      if (res.code !== 50013 && res.code !== 40002 && res.code !== 40001) {
        // 50013：添加订单学员年龄不符合条件的编码
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 40001) {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else if(res.code === 40002) {
        // token失效，刷新token
        const url = config.url
        const requestData = xxxToJson(decodeURIComponent(config.data))
        store.dispatch('SetToken', {
          accesstoken: res.message
        })
        return service({
          url: url,
          method: 'post',
          data: requestData
        })
      }
      return Promise.reject(response.data)
      // return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
