import VueCookies from 'vue-cookies'

const TokenKey = 'abz_app_token'

export function setToken(token){
  return VueCookies.set(TokenKey,token)
}

export function getToken(){
  return VueCookies.get(TokenKey)
}

export function removeToken(){
  return VueCookies.remove(TokenKey)
}