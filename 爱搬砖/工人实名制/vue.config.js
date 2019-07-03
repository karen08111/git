const path = require('path')
let output

if (process.env.VUE_APP_ENV === 'electron') {
  output = 'distElectron'
} else if (process.env.VUE_APP_ENV === 'production') {
  output = path.resolve(__dirname, '../AbzSmz-master/online')
} else if (process.env.VUE_APP_ENV === 'test') {
  output = path.resolve(__dirname, '../AbzSmz-dev/online')
}
// target: 'http://c.m.com',
// http://172.16.1.237:8023
// http://www.crm.com
module.exports = {
  publicPath: './',
  outputDir: output,
  assetsDir: 'assets',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8989',
    proxy: {
      '/api': {
        target: 'http://172.16.1.237:8023',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  css: {
    extract: false
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT'
    }
  }
}
