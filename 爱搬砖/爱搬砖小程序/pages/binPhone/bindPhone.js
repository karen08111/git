// pages/binPhone/bindPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		moT:'',
		isBind:true,
    code: 60,
    imgs:'',
    abzId:'',
    store:false,
    showCode:false,
    show:false,
    phone:'',
    phoneCode:'',
		
		oldCodeTitle:'获取验证码',
		oldCode:'',
		newPhone:true,//解绑真  新手机假
		
		newCodeTitle:'获取验证码',
		newCode:'',//新手机验证
		newMobile:'',//新手机号
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const http = getApp().globalData.local;
    var that = this
    // that.getTuCode();
  },
  getTuCode:function(){
    var that = this
    // 获取图形验证
    const http = getApp().globalData.loginUrl;
    wx.request({
      url: http + '/wechatapp/captcha/verimg',
			header:{'Abz-Request-Id': wx.getStorageSync('request_id')},
      success(res) {
				// console.log(res,'111')
				// wx.setStorageSync('requestId',res.cookies[0].value)
        that.setData({
          imgs: res.data,
          // abzId: res.header["Abz-Request-Id"],
          showCode:true
        })
      }
    })
  },
  getPhoneCode(e){
    this.setData({
      phoneCode:e.detail.value
    })
  },
  // 新绑定手机
  myEventListener(e){
    const http = getApp().globalData.local;
    // console.log(e.detail)
    var that = this;
    var head = e.detail.head
    if(e.detail.store){
      this.setData({
        show: e.detail.store,
        showCode:false
      })
      this.sets();
      // 发送验证码
      // that.huoqu();
    }else{
      this.setData({
        showCode:false
      })
    }
    
  },
  // 
  huoqu(){
    const http = getApp().globalData.loginUrl;
    // console.log(e.detail)
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      method: 'post',
      url: http + '/wechatapp/captcha/verimg',
      data: { mobile: that.data.phone },
      success: res => {
        console.log(res)
				// wx.setStorageSync('requestId',res.cookies[0].value)
        if (res.data.code == 200) {
          this.sets();
          wx.hideLoading();
        }
      }
    })
  },
  // 最后一步绑定
  bindPhone(){

  },
  // 获取手机号
  getPhone(e){
    // console.log(e.detail)
    this.setData({
      phone:e.detail.value
    })
  },
  // 新获取验证码
  getCode(){
    var that = this
    if(this.isPhone(this.data.phone)){
      that.getTuCode();
    }else {
      wx.showToast({
        icon:'none',
        title: '请输入正确手机号',
      })
    }
  },
  
  next:function(){
    const http = getApp().globalData.loginUrl;
    var that = this;
    let user = wx.getStorageSync('wxUser')
    // console.log(user)
    // console.log(that.data.phoneCode)
    if(that.data.phoneCode) {
      wx.request({
        method:'post',
        url: http + '/wechatapp/mobile',
        data: { mobile: that.data.phone, code: that.data.phoneCode },
        header: { 'Abz-Request-Id':  wx.getStorageSync('request_id')},
        success:res=>{
          if (res.data.code == 200) {
            // 保存信息
            wx.setStorageSync('userStore', res.data.data)
						wx.setStorageSync('userObj',res.data.data)
            
            wx.showToast({
              title: '绑定成功',
              success: res=>{
                // 绑定成功后直接登录
                setTimeout(function(){
                  // that.queryUsreInfo();
									wx.switchTab({
										url:'/pages/pages2/personal/personal'
									})
                },1500)
                
                // setTimeout(function () {
                //   wx.hideLoading();
                //   wx.switchTab({
                //     url: '/pages/index/index',
                //   })
                // }, 2500)
              }
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
              success: qq => {
                // setTimeout(function(){
                //   wx.redirectTo({
                //     url: '/pages/setPhone/setOne/setOne',
                //   })
                // },1500)
              }
            })
          }
        }
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '验证码不能为空',
      })
    }
  },
  // 
  getYanCode:function(e){
    this.setData({
      yanCode:e.detail.value
    })
  },
  gets:function(){
    const http = getApp().globalData.local;
    var that = this
    if (that.isPhone(that.data.phone) && that.data.yanCode) {
      wx.request({
        method:'post',
        url: http +'/member/captcha/regmob',
        data:{mobile:that.data.phone,code:that.data.yanCode},
        header: { 'Abz-Request-Id': that.data.headers },
        success:res=>{
          // console.log(res)
          if(res.data.code == 200){
            this.setData({
              store: true,
              header2: res.header['Abz-Request-Id']
            })
            this.sets();
          }else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
          }
        }
      })
    }else {
      wx.showToast({
        icon:'none',
        title: '手机号格式不正确',
      })
    }
  },
  yanCode: function (e) {
    this.setData({
      phoneCode: e.detail.value
    })
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
  // 倒计时
  sets: function () {
    var that = this
    var time = 60;
    var timers = setInterval(function () {
      if (time > 0) {
        time--;
        that.setData({
          code: time
        })
      } else {
        clearInterval(timers);
        that.setData({
          store: false
        })
      }
    }, 1000)
  },
  // 登录
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		var that = this
		if(wx.getStorageSync('mobile')) {
			var str = "" + wx.getStorageSync('mobile')
			var nStr = str.replace(str.substring(3,7), "****")
			that.setData({
				moT:nStr
			})
		}
		if(wx.getStorageSync('userObj').auth_id){
			that.setData({
				isBind:false
			})
			wx.setNavigationBarTitle({
				title: '更改绑定手机号'
			})
// 			wx.showModal({
// 				title:'提示',
// 				content:'手机号已经绑定,无需重复绑定',
// 				cancelText:'取消',
// 				confirmText:'确定',
// 				success(res) {
// 					if (res.confirm) {
// 
// 					} else if (res.cancel) {
// 						wx.navigateBack({
// 							delta: 1
// 						})
// 					}
// 				}
// 			})
		}
  },
	huoqu() {
		var that = this
		const http = getApp().globalData.local;
		var request = getApp().globalData.sendRequest
		request.getReq("/member/account/unbind_mobile",res=>{
			// console.log(res)
			if(res.code == 200) {
				this.setData({
					oldCodeTitle:60
				})
				var timer = setInterval(function() {
					if(that.data.oldCodeTitle<=60 && that.data.oldCodeTitle!=0) {
						that.setData({
							oldCodeTitle:that.data.oldCodeTitle-1
						})
					}else {
						clearInterval(timer)
						that.setData({
							oldCodeTitle:'重新发送'
						})
					}
				},1000)
			}
		})
	},
	getOldPhone(e) {
		this.setData({
			oldCode:e.detail.value
		})
	},
	jumpNew() {
		var that = this
		const http = getApp().globalData.local;
		var request = getApp().globalData.sendRequest
		if(this.data.oldCode) {
			var data = {
				code:that.data.oldCode
			}
				wx.request({
					url:http+'/member/account/unbind_mobile',
					method:'post',
					data:data,
					header: { 'Abz-Request-Id': wx.getStorageSync('abzIds') ,'Abz-Auth-Token': wx.getStorageSync('userObj').token },
					success(res){
						// console.log(res.data)
						if(res.data.code ==200) {
							wx.showToast({
								icon:'none',
								title:'请输入新手机号',
								success() {
									setTimeout(function() {
										that.setData({
											newPhone:false
										})
									},1000)
								}
							})
						}else {
							wx.showToast({
								icon:'none',
								title:res.data.msg,
							})
						}
						
					}
				})
		}else {
			wx.showToast({
				icon:'none',
				title:'验证码不能为空'
			})
		}
	},
	// 新手机获取验证码
	newHuoqu() {
		var that = this
		const http = getApp().globalData.local;
		var request = getApp().globalData.sendRequest
		if(that.data.newMobile) {
			var data={
				mobile:that.data.newMobile
			}
			wx.request({
				url:http+"/member/account/send_code",
				method:'post',
				data:data,
				header: { 'Abz-Request-Id': wx.getStorageSync('abzIds') ,'Abz-Auth-Token': wx.getStorageSync('userObj').token},
				success(res) {
					console.log(res.data)
					if(res.data.code) {//开始倒计时
						that.setData({
							newCodeTitle:60
						})
						var timer = setInterval(function() {
							if(that.data.newCodeTitle<=60) {
								that.setData({
									newCodeTitle:that.data.newCodeTitle-1
								})
							}else {
								clearInterval(timer)
								that.setData({
									newCodeTitle:'重新获取'
								})
							}
						},1000)
					}else {
						wx.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}
			})
		}
	},
	getNewMobile(e) {
		this.setData({
			newMobile:e.detail.value
		})
	},
	getNewPhone(e) {
		this.setData({
			newCode:e.detail.value
		})
	},
	endyes() {
		var that = this
		const http = getApp().globalData.local;
		var request = getApp().globalData.sendRequest
		if(that.data.newCode) {
			var data = {
				mobile:that.data.newMobile,
				code:that.data.newCode
			}
			wx.request({
				url:http+"/member/account/bind_mobile",
				method:'post',
				data:data,
				header: { 'Abz-Request-Id': wx.getStorageSync('abzIds') ,'Abz-Auth-Token': wx.getStorageSync('userObj').token},
				success(res) {
					console.log(res)
					if(res.data.code ==200) {
						// 储存手机号
						wx.setStorageSync('mobile',that.data.newMobile)
						wx.showToast({
							title:'新手机绑定成功',
							success() {
								setTimeout(function () {
									wx.navigateBack({
										delta: 1
									})
								},1500)
							}
						})
					}else {
						wx.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}
			})
		}
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