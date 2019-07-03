import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    request_id: VueCookies.get('abzappid') || '',
    inter_name: sessionStorage.getItem('inter_name') || '',
    inter_code: sessionStorage.getItem('inter_code') || '',
    viper: localStorage.getItem('appViper') || false
  },
  mutations: {
    setReqId (state, newVal){
      state.request_id = newVal
    },
    setInrerName (state, newVal){
      state.inter_name = newVal
      sessionStorage.setItem('inter_name', newVal)
    },
    setInterCode (state, newVal){
      state.inter_code = newVal
      sessionStorage.setItem('inter_code', newVal)
    },
    setViper (state, val){
      state.viper = val
      localStorage.setItem('appViper', val)
    },
    removeViper (state, val){
      state.viper = false
      localStorage.removeItem('appViper')
    }
  },
  actions: {

  }
})
