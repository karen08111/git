module.exports = {
  baseUrl: process.env.NODE_ENV==='production'?"":'./',  //  用用程序默认部署位置，‘/’根目录，存放子目录
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack配置
  chainWebpack: () => { },
  configureWebpack: () => { },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8888',
    // proxy: {
    //   '/api': {
    //     target: 'http://12121',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': '/api'
    //     }
    //   }
    // }
  },
  // 第三方插件配置
  pluginOptions: {}
}
