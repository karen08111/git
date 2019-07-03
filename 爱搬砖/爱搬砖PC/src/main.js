// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import {Message, MessageBox} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import store from './store/store'
import VueCookies from 'vue-cookies'

import Header from '@/components/pub/Header'
import Footer from '@/components/pub/Footer'
import Slide from '@/components/pub/Slide'
import Advert from '@/components/pub/Advert'
import Head_upload from '@/components/pub/Head_upload'
import City_linkage from '@/components/pub/City_linkage'
import Imgs_introduce from '@/components/pub/Imgs_introduce'
import Qualifications from '@/components/pub/Qualifications'
import Map_temp from '@/components/pub/Map_temp'
import Headline from '@/components/pub/Headline'
import images from '@/components/pub/images'
import BaiduMap from 'vue-baidu-map'

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'NuA7zrWR7UfspLpSDazkpqvxzwnOprP3'
})

const Axios = axios.create({
  baseURL: store.state.site, // 通常配置基础的接口入口地址
  // timeout:5000, // 请求超时时间
  headers: {// 这里可设置所有的请求头
    'Content-Type': 'application/json' // 该项建议设置 如果未 POST请求时 数据未做处理时会出现错误，最理想的解决方法就是 直接设置该项
  },
  withCredentials: true // 是否允许发送Cookie 如果为true 则服务器的 Access-control-Allow-Credentials 必须为 true 来源为 XMLHttpRequest的withCredentials配置项
})

Axios.interceptors.request.use(
  config => {
    let abzID = VueCookies.get('abzID') ? VueCookies.get('abzID') : ''
    let token = VueCookies.get('abztoken')
    config.headers['Abz-Request-Id'] = abzID
    if (token) config.headers['Abz-Auth-Token'] = token
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 1403 || res.code === 1404 || res.code === 1405) {
        VueCookies.remove('authState')
        VueCookies.remove('state')
        VueCookies.remove('username')
        VueCookies.remove('usertel')
        VueCookies.remove('abzID')
        VueCookies.remove('abztoken')
      }

      if (res.msg) {
        Message({
          message: res.msg,
          type: 'error'
        })
      }

      if (res.code === 404) {
        router.go(-1)
      }

      return response
    } else {
      return response
    }
  },
  error => {
    // console.log('err' + error) // for debug

    return Promise.reject(error)
  }
)
Axios.all = axios.all

const errorHandler = (error, vm, info) => {
  throw error

  let {
    message, // 异常信息
    name, // 异常名称
    script, // 异常脚本url
    line, // 异常行号
    column, // 异常列号
    stack // 异常堆栈信息
  } = error

  Axios.post('/error/pc', { message: message, name: name, script: script, line: line, column: column, stack: stack }).then(res => {

  })
}

Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)

Vue.use(ElementUI)
// axios.defaults.withCredentials = true
Vue.prototype.$http = Axios
Vue.use(VueCookies)
Vue.config.productionTip = false

Vue.component('Header', Header)
Vue.component('Footer', Footer)
Vue.component('Slide', Slide)
Vue.component('Advert', Advert)
Vue.component('Head_upload', Head_upload)
Vue.component('City_linkage', City_linkage)
Vue.component('Imgs_introduce', Imgs_introduce)
Vue.component('Qualifications', Qualifications)
Vue.component('Map_temp', Map_temp)
Vue.component('headline', Headline)
Vue.component('images', images)

Vue.component('adminHeader', () => import('@/components/admin/components/adminHeader'))
Vue.component('countDown', () => import('@/components/pub/countDown'))

Vue.directive('full', {
  inserted (el) {
    let h
    if (window.innerWidth) h = window.innerHeight
    else {
      if (document.compatMode === "BackCompat") h = document.body.clientHeight
      else h = document.documrntElement.clientHeight
    }
    console.log(h)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  mounted () {
    store.commit('getCoo')
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.part == 'admin' && !VueCookies.get('abztoken')) {
    next({ path: '/Login' })
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.nav) {
    store.commit('changeNav', to.meta.nav)
  }
})
