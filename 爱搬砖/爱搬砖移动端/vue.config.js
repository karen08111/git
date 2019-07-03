const path = require('path')

let outPut

if (process.env.VUE_APP_NodeEnv === 'production') {
  outPut = path.resolve(__dirname, '../build_master/mobile')
}
if (process.env.VUE_APP_NodeEnv === 'test') {
  outPut = path.resolve(__dirname, '../build_develop/mobile')
}

module.exports = {
  baseUrl: './',
  outputDir: outPut,
  assetsDir: 'assets',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '7777',
    proxy: {
      '/api': {
        target: process.env.VUE_APP_baseURL,
        changeOrigin: true,
        ws: true
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`，并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/main.js'
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios'
    }
  },
  css: {
  	modules: false,
  	extract: false,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 1, // 换算的基数
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  }

}
