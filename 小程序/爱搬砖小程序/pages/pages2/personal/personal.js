// pages/pages2/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
		menuList:[],
		avatar:null,
		http:null,
		isLogin:false,//1是未授权  2是已授权
		overtime:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('userObj'))
    // this.token()
  },
   // 刷新token
  token() {
	const http = getApp().globalData.loginUrl;
	var request = getApp().globalData.sendRequest
	var that = this
  	var data = {
  		token:wx.getStorageSync('userObj').token,
  		encryptedData:wx.getStorageSync('wxUser').encryptedData,
  		iv:wx.getStorageSync('wxUser').iv
  	}  
	wx.request({
		url: http+'/wechatapp/resetToken',
		method:'post',
		data:data,
		header: {
				'Accept': 'application/json',
				'content-type': 'application/json' // 默认值
		},
		success(res){
			console.log(res)
			if(res.data.code == 200) {
				// 刷新成功了  保存token
				// console.log(res.data.data)
				wx.setStorageSync('userObj',res.data.data)
				request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
				that.getMenu()
			}
		}
	})
  },
	bindGetUserInfo:function(e){
	  const http = getApp().globalData.local;
	  if (e.detail.userInfo){
	    // 用户点击了允许按钮
	    // 存入微信授权信息
			// console.log(e.detail)
	    wx.setStorageSync('wxUser', e.detail)
	    // console.log(e.detail)
	    var that = this
	    // that.queryUsreInfo();
			that.login()
	  }else {
			wx.switchTab({
				url: '/pages/index/index'
			})
		}
	},
	// 登录
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
					that.onShow()
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

  jump(){
    wx.navigateTo({
      url: '/pages/pages2/resume/resumeIndex/resumeIndex',
    })
  },
  jumpguan(){
    wx.navigateTo({
      url: '/pages/pages2/attention/attention',
    })
  },
  zhanghu() {
    wx.navigateTo({
      url: '/pages/pages2/account/menu/menu',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
	getMenu() {
		var that = this
		var http = getApp().globalData.local
		var request = getApp().globalData.sendRequest
		this.setData({
			http:http,
			isLogin:2,
		}) 
		// console.log(this.CheckUrl(wx.getStorageSync('newAvatar')))
		if(this.CheckUrl(wx.getStorageSync('newAvatar'))){//头像
			this.setData({
				avatar:wx.getStorageSync('newAvatar')
			})
		}else {
			if (this.CheckUrl(wx.getStorageSync('userObj').avatar)){
				this.setData({
					avatar:wx.getStorageSync('userObj').avatar
				})
			}else {
				this.setData({
					avatar:http + wx.getStorageSync('userObj').avatar
				})
			}
		}
		request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
		request.getReq("/wechat/member/menus",res=>{
			// console.log(res.data)
			if(res.code == 200) {
				that.setData({
					menuList:res.data
				})
			}
		})

	},
	CheckUrl(str) { 
		var RegUrl = new RegExp(); 
		RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");//jihua.cnblogs.com 
		if (!RegUrl.test(str)) { 
		return false; 
		} 
		return true; 
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		var http = getApp().globalData.local
		var thHttp = getApp().globalData.loginUrl
    if (wx.getStorageSync('userObj')){
      this.setData({
        user: wx.getStorageSync('userObj')
      })
    }
		var request = getApp().globalData.sendRequest
		var timestamp = Date.parse(new Date()); 
		var that = this
		// 头像检查
		
		timestamp = timestamp / 1000; 
		// 检查登录凭证是否存在
		wx.getSetting({
			success(res){
				if(res.authSetting['scope.userInfo']) {
					if(wx.getStorageSync('userObj').overdue_time) {//登录存在
							// 检查登录凭证是否过期
							if(wx.getStorageSync('userObj').overdue_time > timestamp){//未过期
								that.getMenu()
								// 检测session是否过期
							}else {//过期
								// 检测session是否过期
								wx.checkSession({
									success() {
										// session_key 未过期，并且在本生命周期一直有效
										// console.log('seeion_未过期,需要刷新凭证',wx.getStorageSync('userObj'))
										// that.getMenu()
										// that.getUsers()
										// 刷新凭证
										console.log('刷新token')
										that.token()
									},
									fail() {
										// console.log('登录凭证已过期，且seession 过期')
										// session_key 已经失效，需要重新执行登录流程
										console.log('session_key已过期')
										that.login()
			// 							that.setData({
			// 								isLogin:1
			// 							})
									}
								})
							}
					}else {//登录凭证不存在
						wx.checkSession({
							success() {
								// session_key 未过期，并且在本生命周期一直有效
								// that.getMenu()
								// console.log('登录凭证不存在  但未过期，需请求标识重新获取用户信息')
								// console.log(wx.getStorageSync('request_id'))
								that.setData({
									isLogin:1
								})
								// that.login()
								// console.log(wx.getStorageSync('userObj'))
							},
							fail() {
								// session_key 已经失效，需要重新执行登录流程
								// 已经失效，需要重新授权
								that.setData({
									isLogin:1
								})
							}
						})
					}
				}else {
					that.setData({
						isLogin:1
					})
				}
			}
		})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})