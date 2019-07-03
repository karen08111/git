import env from './env'

// 本地的ajax请求地址和线上的地址
const DEV_URL = 'http://api.lazy.com'
const PRO_URL = 'www/baidu.com'

export default env === "development" ? DEV_URL : PRO_URL
