import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import data from './views/data'
import echarts from 'echarts'
import Print from 'vue-print-nb'
Vue.prototype.$echarts = echarts
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}
Vue.use(Print)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$getData = data
Vue.use(ElementUI)
/* 自定义组件 */
Vue.component('navMenu', _ => import('./components/navMenu/navMenu')) // 导航栏
Vue.component('easyTable', _ => import('./components/easyTable/index')) // 表格
Vue.component('detailDialog', _ => import('./components/detailDialog/index')) // 弹出详情
Vue.component('Header', _ => import('./components/header/Header')) // 头部
Vue.component('Footer', _ => import('./components/footer/Footer')) // 底部

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
