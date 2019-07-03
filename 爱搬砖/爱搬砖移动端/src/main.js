// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import VueCookies from 'vue-cookies'
import Vant from 'vant'
//import WXConfig from './assets/fenxiang' // 微信分享
import wx from 'weixin-js-sdk';
import VueWechatTitle from 'vue-wechat-title'
import BaiduMap from 'vue-baidu-map'
//import vueCropper from 'vue-cropper'

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'tMb7GfKOTmwDy0FHWRfo7RDG2WHPd9ZI'
})
Vue.use(VueWechatTitle)
//Vue.prototype.WXConfig=WXConfig
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueCookies)
Vue.use(Vant)

Vue.use(require('vue-touch'), {name: 'v-touch'})

Vue.component('CitySelect',()=>import('@/components/forms/citySelect'))//省份级联
Vue.component('JobSelect',()=>import('@/components/forms/jobSelect'))//工作选择
Vue.component('common',()=>import('@/components/forms/common'))//通用选择
Vue.component('pickDate',()=>import('@/components/forms/pickDate'))//时间选择
Vue.component('pickPay',()=>import('@/components/forms/pickPay'))//时间选择

Vue.component('BigProject',()=>import('@/components/list/bigProject'))//推荐项目
Vue.component('NewsProject',()=>import('@/components/list/newsProject'))//新闻
Vue.component('MainTitle',()=>import('@/components/list/mainTitle'))//主页标题
Vue.component('MenuBar',()=>import('@/components/list/menuBar'))//菜单
Vue.component('Title',()=>import('@/components/title/title'))//标题块
/*公用组件*/
Vue.component('photoIntro',() => import('@/components/upload/photoIntro'))//图片介绍
Vue.component('infoList',() => import('@/components/list/infoList'))//找人找活信息列表
Vue.component('proList',() => import('@/components/list/proList'))//工程信息列表
Vue.component('shai',() => import('@/views/screen/components/shai'))//筛选
Vue.component('invite',() => import('@/views/personal/invite/components/inviteProject'))
Vue.component('userInfo',() => import('@/views/personal/member/components/userInfo'))

/*邀请公用组件*/
Vue.component('inHeader', () => import('@/views/invite/components/inHeader'))
Vue.component('inFooter', () => import('@/views/invite/components/inFooter'))

//Vue.component('SimpleCropper',() => import('@/components/forms/SimpleCropper'))//裁剪
//Vue.component('cropper',() => import('@/views/vue-cropper/cropper'))


const errorHandler = (error, vm, info)=>{
  let {
    message, // 异常信息
    name, // 异常名称
    script,  // 异常脚本url
    line,  // 异常行号
    column,  // 异常列号
    stack  // 异常堆栈信息
  } = error;

  Axios.post('/error/mobile', {message:message, name:name, script:script, line:line, column:column, stack:stack}).then(res => {
    console.log(res)
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
//console.log(to)
});


