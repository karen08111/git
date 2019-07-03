import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import { Message, MessageBox } from 'element-ui'
import router from '../router'

Vue.use(Vuex)
Vue.use(VueCookies)

const baseURL = process.env.API_ROOT
const state = {
  state: 0,
  username: null,
  usertel: null,
  auth: 0,
  authState: null,
  avatar: localStorage.getItem('avatar') || '',
  viper: +localStorage.getItem('viper') || 0,
  site: baseURL,
  navIdx: '',
  loginShow: false,
  registerShow: false,
  admin_nav_active: '',
  searchIdx: '/FindTeam',
  searchVal: '',
  isSearch: false,
  msgLen: '',
  accounForm: {
    full_name: sessionStorage.getItem('full_name'),
    card_type: sessionStorage.getItem('card_type'),
    id_card: sessionStorage.getItem('id_card'),
    img_head: sessionStorage.getItem('img_head'),
    img_tail: sessionStorage.getItem('img_tail')
  },
  defaultImg: `this.src="${require('../assets/none.png')}"`,
  receNav: sessionStorage.getItem('receNav') || '/recr'
}

const mutations = {
  changeNav (state, newNav) {
    state.navIdx = newNav
  },
  changeLogin (state) {
    state.loginShow = !state.loginShow
    state.registerShow = false
  },
  changeRegister (state) {
    state.registerShow = !state.registerShow
    state.loginShow = false
  },
  login (state) {
    state.loginShow = true
    state.registerShow = false
  },
  regis (state) {
    state.loginShow = false
    state.registerShow = true
  },
  changeState (state, status) {
    state.state = status
  },
  changeTel (state, tel) {
    state.usertel = tel
  },
  getCoo (state) {
    if (VueCookies.get('usertel')) { state.usertel = VueCookies.get('usertel') }
    if (VueCookies.get('username')) { state.username = VueCookies.get('username') }
    if (VueCookies.get('auth')) { state.auth = VueCookies.get('auth') }
    if (VueCookies.get('authState')) { state.authState = VueCookies.get('authState') }

    if (state.authState == null) {
      VueCookies.set('state', 0, '0')
    } else if (state.authState == 0 || state.authState == 1 || state.authState == 2 || state.authState == 3) {
      VueCookies.set('state', 1, '0')
    } else if (state.authState == 4) {
      VueCookies.set('state', 2, '0')
    }
    if (VueCookies.get('state')) { state.state = VueCookies.get('state') }
  },
  search (state, val) {
    state.searchVal = val
  },
  changeSearchStatus (state) {
    state.isSearch = !state.isSearch
  },
  changeSearchIdx (state, val) {
    state.searchIdx = val
  },
  changeMsgLen (state, val) {
    state.msgLen = val == 0 ? '' : val
  },
  success (state, msg) {
    Message({
      message: msg,
      type: 'success'
    })
  },
  setAccounForm (state, obj) {
    state.accounForm = obj
  },
  toLogin (state) {
    if (state.authState == null) {
      MessageBox.confirm(
        '你还未登录或登录已超时，你可以取消继续留在该页面，或者重新登录',
        '登录超时',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        router.push({ path: '/Login' })
      })
    }
  },
  toLoginPlus (state) {
    if (state.authState == null) {
      MessageBox.confirm(
        '你还未登录或登录已超时，你可以取消继续留在该页面，或者重新登录',
        '登录超时',
        {
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        router.push({ path: '/Login' })
      })
    } else if (state.authState == 0 || state.authState == 3) {
      MessageBox.confirm(
        '你还未进行实名认证或认证失败，你可以取消继续留在该页面，或者进行认证',
        '登录超时',
        {
          confirmButtonText: '认证',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        router.push({ path: '/Account_identity_new' })
      })
    }
  },
  removeAuth (state) {
    sessionStorage.removeItem('full_name')
    sessionStorage.removeItem('card_type')
    sessionStorage.removeItem('id_card')
    sessionStorage.removeItem('img_head')
    sessionStorage.removeItem('img_tail')
    sessionStorage.removeItem('comauth')
    sessionStorage.removeItem('job_name')
    sessionStorage.removeItem('company_name')
    sessionStorage.removeItem('credit_code')
    sessionStorage.removeItem('img_path')
    sessionStorage.removeItem('auth_certify')
  },
  quit () {
    VueCookies.remove('authState')
    VueCookies.remove('state')
    VueCookies.remove('username')
    VueCookies.remove('usertel')
    VueCookies.remove('abzID')
    VueCookies.remove('abztoken')

    this.commit('removeVip')
    router.push({name: 'index'})
    setTimeout(_ => window.location.reload(),500)
  },
  changeReceNav (state, val) {
    state.receNav = val
    sessionStorage.setItem('receNav', val)
  },
  setAvatar (state, val) {
    state.avatar = val
    localStorage.setItem('avatar', val)
  },
  setVip (state, val){
    state.viper = +val
    localStorage.setItem('viper', val)
  },
  removeVip (state){
    state.viper = false
    localStorage.removeItem('viper')
  }
}

export default new Vuex.Store({
  state,
  mutations
})
