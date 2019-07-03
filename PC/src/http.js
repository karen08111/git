import axios from 'axios'
import store from './store'
axios.defaults.timeout = 10000
// 创建axios实例
// console.log(process.env.VUE_APP_baseURL)
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
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          alert('未登录')
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          alert('登录过期，请重新登录')
          // 清除token
          localStorage.removeItem('token');
          setTimeout(() => {
            // router.replace({
            //   path: '/login',
            //   query: {
            //     redirect: router.currentRoute.fullPath
            //   }
            // });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          alert('网络请求不存在')
          break;
        // 其他错误，直接抛出错误提示
        default:
          alert(error.response.data.message)
      }
      return Promise.reject(error.response)
    }
  }
)

export default service
