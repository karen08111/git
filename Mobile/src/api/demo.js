import axios from '@/libs/api.request'
import baseURL from '_conf/url'

export const $http = (params, url, method) => {
  return axios.request({
    url,
    baseURL,
    params,
    method,
  })
}
