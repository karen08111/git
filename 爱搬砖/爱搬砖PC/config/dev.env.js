'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"https://developer.api.qqdoubao.net"',
  THIRD_URL: '"http://third.api.qqdoubao.net"'
})
