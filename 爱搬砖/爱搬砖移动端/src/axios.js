import axios from 'axios'
import { Toast } from 'vant'
import VueCookies from 'vue-cookies'
import {getToken} from '@/utils/auth'

export const baseURL = process.env.VUE_APP_baseURL
export const urls = 'https://official.api.aibanzhuan.cn/'
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000, // 请求超时时间
  headers:{// 这里可设置所有的请求头
  	'Content-type': 'application/json',
    'Content-Type':'application/x-www-form-urlencoded', //该项建议设置 如果未 POST请求时 数据未做处理时会出现错误，最理想的解决方法就是 直接设置该项
//  'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials:true
})

// request拦截器
service.interceptors.request.use(
  config => {
       let abzID = VueCookies.get('abzappid') ? VueCookies.get('abzappid') : ''
    let token = getToken()
    if(abzID) config.headers['Abz-Request-Id'] = abzID
    if(token) config.headers['Abz-Auth-Token'] = token
//  if(token) config.headers['X-Requested-With'] = 'XMLHttpRequest'
//	console.log(config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const appID = response.headers['abz-request-id']
    if(appID){
      VueCookies.set('abzappid',appID)
    }
    

    const res = response.data
    if (res.code !== 200 && res.code!=1403) {
      if(res.msg){
        Toast.fail(res.msg)
      }
      return res
    }else if(res.code ==1403){
    	return res
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      Toast.fail('网络超时，请稍后重试！');
      return Promise.reject(error);          // reject这个错误信息
    }
    return Promise.reject(error);
  }
)

export default service
