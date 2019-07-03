import VueCookies from 'vue-cookies'

const upToken = {
  'Abz-Request-Id': VueCookies.get('abzID') ? VueCookies.get('abzID') : ''
}

if (VueCookies.get('abztoken')) {
  upToken['Abz-Auth-Token'] = VueCookies.get('abztoken')
}

export default upToken
