//app.js
// var time = require('/utils/util.js')
var request = require('/utils/request.js')
var fun = require('/utils/functions.js')

App({
  onLaunch: function () {
	  wx.getSystemInfo({
        success: res => {
          //导航高度
          this.globalData.navHeight = res.statusBarHeight + 46;
        }, fail(err) {
          console.log(err);
        }
      })
    // 设置tab
    // wx.showTabBarRedDot({
    //   index:3
    // })
    // wx.setTabBarBadge({
    //   index:3,
    //   text:'3'
    // })
		// 查看用户是否授权
		var http = this.globalData.local
		var thHttp = this.globalData.loginUrl
		var request = this.globalData.sendRequest
		var timestamp = Date.parse(new Date()); 
		var that = this
		// 头像检查
		timestamp = timestamp / 1000; 
		wx.getSetting({
			success(res){
				if(res.authSetting['scope.userInfo']) {
					if(wx.getStorageSync('userObj').overdue_time) {//登录存在
						// 检查登录凭证是否过期
						if(wx.getStorageSync('userObj').overdue_time > timestamp){//未过期
						
						}else {//过期
							// 检测session是否过期
							wx.checkSession({
								success() {
									// 刷新凭证
									// that.token()
									var data = {
										token:wx.getStorageSync('userObj').token,
										encryptedData:wx.getStorageSync('wxUser').encryptedData,
										iv:wx.getStorageSync('wxUser').iv
									}  
									wx.request({
										url: thHttp+'/wechatapp/resetToken',
										method:'post',
										data:data,
										header: {
												'Accept': 'application/json',
												'content-type': 'application/json' // 默认值
										},
										success(r){
											// console.log(r,'app')
											if(r.data.code == 200) {
												// 刷新成功了  保存token
												wx.setStorageSync('userObj',r.data.data)
												request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
											}
										}
									})
								},
								fail() {
									
								}
							})
						}
					}
					
				}else {
					wx.showModal({
						title:'提示',
						content:'您还尚未授权,是否前去授权',
						cancelText:'暂不授权',
						confirmText:'去授权',
						success(r) {
							if (r.confirm) {
								wx.switchTab({
									url:'/pages/pages2/personal/personal',
								})
							} else if (r.cancel) {
								
							}
						}
					})
				}
			}
		})
  },
  //获取用户地理位置权限
    getPermission:function(obj){
            
   },
  /**
    * 设置监听器
    */
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
  
  /**
    * 监听属性 并执行监听函数
    */
  observe(obj, key, watchFun) {
    
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function () {
        return val;
      }
    })
  },
  globalData: {
    userInfo: null,
    sendRequest: request,//全局引用request
    fun:fun,//方法库,
    local: 'https://developer.api.qqdoubao.net',
    // local:'https://official.api.aibanzhuan.cn',
    userId: 2,//区分个人还是团队还是企业
	loginUrl: 'https://third.api.qqdoubao.net',
	// loginUrl:'https://third.api.aibanzhuan.cn',
	token:null,
	navHeight:null
  }
})