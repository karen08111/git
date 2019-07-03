import axios from 'axios'
import store from './store'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_baseURL,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})
// request拦截器
service.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) {
      config.headers['Auth-Token'] = token
    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    if (response.data.code === 1403) {
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'warning',
        onClose () {
          store.commit('unLogin')
        }
      })
    } else if (response.data.code === 200) {
      return response
    } else {
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'error'
      })
    }
  },
  error => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      // console.log('网络超时，请稍后重试！')
      return Promise.reject(error) // reject这个错误信息
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
