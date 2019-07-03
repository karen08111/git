import Vue from 'vue'
import Vuex from 'vuex'
import router, { constantRoutes, companyRoutes } from './router'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('smToken') || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  getters: {
    role (state) {
      return state.userInfo.hasOwnProperty('role') ? state.userInfo.role : 0
    },
    navRoutes (state, getters) {
      if (getters.role === -1) {
        return constantRoutes
      }
      if (getters.role === 0) {
        return companyRoutes[0].children
      }
    }
  },
  mutations: {
    setToken (state, str) {
      // console.log(str)
      state.token = str
      localStorage.setItem('smToken', str)
    },
    setUserInfo (state, info) {
      state.userInfo = info
      localStorage.setItem('userInfo', JSON.stringify(info))
    },
    unLogin (state) {
      state.token = null
      state.userInfo = {}
      localStorage.removeItem('smToken')
      localStorage.removeItem('userInfo')
      router.push({ path: '/' })
    }
  },
  actions: {}
})
