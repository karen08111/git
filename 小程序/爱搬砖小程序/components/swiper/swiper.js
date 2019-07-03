// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls:{
      type:Array
    },
    http:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor:'#3f7be9',
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
		jump() {
			var that = this
// 			wx.navigateTo({
// 				url:'/pages/extension/extensionIndex/extensionIndex'
// 			})
		// 查看用户是否授权
			wx.getSetting({
				success(res){
					if(res.authSetting['scope.userInfo']) {
						// 检查登录
						var timestamp = Date.parse(new Date()); 
						timestamp = timestamp / 1000; 
						var that = this
						if(wx.getStorageSync('userObj').overdue_time) {//登录存在
										// 检查登录凭证是否过期
										if(wx.getStorageSync('userObj').overdue_time > timestamp){//未过期
														wx.navigateTo({
															url:'/pages/extension/extensionIndex/extensionIndex'
														})
										}else {//过期
											// 检测session是否过期
											wx.checkSession({
												success() {
													// session_key 未过期，并且在本生命周期一直有效
													console.log('seeion_未过期,需要刷新凭证')
													// that.getMenu()
													// that.getUsers()
												},
												fail() {
													console.log('登录凭证已过期，且seession 过期')
													// session_key 已经失效，需要重新执行登录流程
													that.login()
						// 							that.setData({
						// 								isLogin:1
						// 							})
												}
											})
										}
								}else {//登录凭证不存在
									wx.reLaunch({
										url:'/pages/pages2/personal/personal'
									})
								}
					}else {
						wx.reLaunch({
							url:'/pages/pages2/personal/personal'
						})
					}
				}
			})
		},
		login() {
			const http = getApp().globalData.loginUrl;
			var that = this
			// var request = getApp().globalData.sendRequest
			wx.login({
				success(res){
					if(res.code) {
						// 保存code
						wx.setStorageSync('codes',res.code)
						that.getUsers()
					}
					
				}
			})
		},
		getUsers() {
			// 获取用户信息
			const http = getApp().globalData.loginUrl;
			var that = this
			var data = {
				encryptedData:wx.getStorageSync('wxUser').encryptedData,
				code:wx.getStorageSync('codes'),
				iv:wx.getStorageSync('wxUser').iv
			}
			wx.request({
				url: http+'/wechatapp/getUserData',
				method:'post',
				data:data,
				header: {
						'Accept': 'application/json',
						'content-type': 'application/json' // 默认值
				},
				success(r){
					// console.log(r,'凭证')
					if(r.data.code == 200) {
						wx.setStorageSync('userObj',r.data.data)
						wx.setStorageSync('overTime',r.data.data.overdue_time)
						// UpdateManager.applyUpdate()
					}else if(r.data.code == 1404) {
							wx.setStorageSync('request_id',r.data.msg.request_id)
							wx.redirectTo({
								url:'/pages/binPhone/bindPhone'
							})
					}
				}
			})
		},
  }
})
