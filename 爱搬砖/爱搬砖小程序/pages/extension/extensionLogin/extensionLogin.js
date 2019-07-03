// pages/extension/extensionLogin/extensionLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		store:1,
		gender:[{
			id:0,
			title:'女'
		},{
			id:1,
			title:'男'
		}],
		times:'获取',
		start:false,
		imgs:null,//滑动验证
		showCode:false,//
		phone:null,//手机号
		code:null,
		upZheng:null,//正面
		upFan:null,//反面
		https:null,
		name:'',//姓名
		birth:null,//年龄
		region:null,//地区
		work_type:null,//工种
		sex:null,//性别
		clicks:true,
		invitation_code:null,
		fatherName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var that = this
		this.setData({
			https:getApp().globalData.local,
		})
		if(options.invitation_code){
			this.setData({
				invitation_code:options.invitation_code
			})
			this.getRequestId(this.data.invitation_code)
		}
// 		this.setData({
// 			invitation_code:'erRnS0eUjuOvTn91xK5e1Q0gSnHEPYUCl7u2NdNntQ'
// 		})
// 		this.getRequestId(this.data.invitation_code)
		// erRnS0eUjuOvTn91xK5e1Q0gSnHEPYUCl7u2NdNntQ
				// 查看用户是否授权
		var timestamp = Date.parse(new Date()); 
		timestamp = timestamp / 1000; 
		wx.getSetting({
			success(res){
				wx.showLoading({
					title:'加载中...'
				})
				if(res.authSetting['scope.userInfo']) {
					// 检查登录登录凭证是否过期
					if(wx.getStorageSync('userObj').overdue_time > timestamp) {
						wx.hideLoading()
						wx.redirectTo({
							url:'/pages/extension/myExten/myExten?code='+that.data.invitation_code
						})
					}else {
						wx.hideLoading()
						// 检测session是否过期
						wx.checkSession({
							success() {
								// session_key 未过期，并且在本生命周期一直有效
								console.log('seeion_未过期,需要刷新凭证')
							},
							fail() {
								console.log('登录凭证已过期，且seession 过期')
								that.login()
							}
						})
						
					}
				}else {
					wx.hideLoading()
					that.setData({
						store:0
					})
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
  		wx.showToast({
  			icon:'none',
			title:'您拒绝了微信授权登录,不能为工友助力',
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
	var request = getApp().globalData.sendRequest
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
				// 把token存进去
				request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
				// console.log(r.data.data)
				// 已经绑定手机了
				wx.showToast({
					icon:'none',
					title:'只有新用户才能为工友助力,请邀请新用户助力领红包',
					success() {
						setTimeout(()=>{
							wx.redirectTo({
								url:'/pages/extension/extensionIndex/extensionIndex'
							})
						},1500)
					}
				})
// 				that.setData({
// 					store:1
// 				})
  			}else if(r.data.code == 1404) {
  					wx.setStorageSync('request_id',r.data.msg.request_id)
  					that.setData({
						store:1
					})
  			}
  		}
  	})
  },
	// 保存
	submit() {
		var data = {
			name:this.data.name,
			birth:this.data.birth,
			region:this.data.region,
			sex:this.data.sex,
			work_type:this.data.work_type,
			img_head:this.data.upZheng,
			code:this.data.invitation_code,
			img_tail:this.data.upFan,
		}
		var that = this
		var request = getApp().globalData.sendRequest
		request.header['Abz-Auth-Token'] = wx.getStorageSync('userObj').token
		request.postReq("/member/beInvited/save",data,res=>{
			// console.log(res)
			if(res.code == 200) {
				that.setData({
					clicks:false
				})
				wx.showToast({
					title:'加入成功',
					success() {
						setTimeout(function() {
							wx.redirectTo({
								url:`/pages/extension/myExten/myExten?name=${res.data.nick}&code=${that.data.invitation_code}&show=true`
							})
						},1500)
					}
				})
			}else {
				wx.showToast({
					icon:'none',
					title:res.msg
				})
			}
		})
	},
	// 获取request_id
	getRequestId(data) {
		const http = getApp().globalData.loginUrl
		var that = this
		wx.request({
			url:http+'/beInvited/invitationRegister?invitation_code='+data,
			success(res) {
				if(res.data.code == 200) {
					// 储存abz_id
					console.log(res.data)
					wx.setStorageSync("father",res.data.data)
					that.setData({
						fatherName:res.data.data.name
					})
					wx.setStorageSync("enterRequesId",res.data.data.request_id)
				}
			}
		})
	},
	// 获取名字
	getName(e) {
		this.setData({
			name:e.detail.value
		})
	},
	test() {
		
	},
	getOld(e) {
		this.setData({
			birth:e.detail.value
		})
	},
	// 上传身份证
	upImg() {
		var that = this
		var request = getApp().globalData.sendRequest
		var http = getApp().globalData.local
		var loginStore = wx.getStorageSync('userObj')
		wx.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success(res) {
			// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url: http +'/wechat/member/auth/upload',
					filePath: tempFilePaths[0],
					name: 'file',
					header: { 'Abz-Auth-Token': loginStore.token },
					success(re){
						var acc = JSON.parse(re.data)
						if(acc.code==200){
							that.setData({
								upZheng:acc.data.path
							})
						}
					}
				})
			}
		})
	},
	fanImg() {
		var that = this
		var request = getApp().globalData.sendRequest
		var http = getApp().globalData.local
		var loginStore = wx.getStorageSync('userObj')
		wx.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success(res) {
			// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url: http +'/wechat/member/auth/upload',
					filePath: tempFilePaths[0],
					name: 'file',
					header: { 'Abz-Auth-Token': loginStore.token },
					success(re){
						var acc = JSON.parse(re.data)
						if(acc.code==200){
							that.setData({
								upFan:acc.data.path
							})
						}
					}
				})
			}
		})
	},
  jobId(e) {
		this.setData({
			work_type:e.detail
		})
  },
  getBing(e) {
		this.setData({
			sex:parseInt(e.detail)-1
		})
  },
  getCityId(e) {
		 this.setData({
			 region:e.detail
		 })
  },
	getPhone(e) {
		this.setData({
			phone:e.detail.value
		})
	},
	inputCode(e) {
		this.setData({
			code:e.detail.value
		})
	},
	nexts() {
		// /beInvited/mobile
		const http = getApp().globalData.loginUrl;
		var that = this
		if(this.data.phone && this.data.code) {
			wx.request({
				method:'post',
				url:http+'/beInvited/mobile',
				data:{code:that.data.code,mobile:that.data.phone},
				header: { 'Abz-Request-Id': wx.getStorageSync('enterRequesId')},
				success(res) {
					if(res.data.code == 200 ) {
						// 保存信息  这一步保存token
						console.log(res.data)
						wx.setStorageSync('userStore', res.data.data)
						wx.setStorageSync('userObj',res.data.data)
						if(res.data.data.skip == 1 ){
							that.setData({
								store:2
							})
						}
					}else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
              success: qq => {
								
              }
            })
          }
				}
			})
		}
	},
	// 获取验证码
	code() {
		var that = this
		// 获取图形验证
		const http = getApp().globalData.loginUrl;
		wx.request({
		  url: http + '/beInvited/captcha/verimg',
			header:{'Abz-Request-Id': wx.getStorageSync('enterRequesId')},
		  success(res) {
				// console.log(res)
				// wx.setStorageSync('requestId',res.cookies[0].value)
		    that.setData({
		      imgs: res.data,
		      showCode:true
		    })
		  }
		})
	},
	getCode() {
		var that = this
		if(this.isPhone(this.data.phone)){
		  that.code();
		}else {
		  wx.showToast({
		    icon:'none',
		    title: '请输入正确手机号',
		  })
		}
	},
	// 手机号验证
	isPhone:function(phone){
	  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	  if (!myreg.test(phone)) {
	    return false;
	  } else {
	    return true;
	  }
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  
  },
	myEventListener(e) {
		if(e.detail.store) {
			// 开启倒计时
			this.setData({
				showCode:false,
				times:60,
				start:true
			})
			this.sets()
		}else {

		}
		
	},
	sets() {
	  var that = this
	  var time = this.data.times;
	  var t = setInterval(function () {
	    if (time > 0) {
	      time--;
	      that.setData({
	        times: time
	      })
	    } else {
	      clearInterval(t);
	      that.setData({
	        start: false,
					times:'重新获取'
	      })
	    }
	  }, 1000)
	},
	hide() {
		this.setData({
			showCode:false
		})
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		const http = getApp().globalData.local
		var request = getApp().globalData.sendRequest;
	// 	request.getReq('/member/beInvited/init',res=>{
	// 		console.log(res)
	// 	})
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