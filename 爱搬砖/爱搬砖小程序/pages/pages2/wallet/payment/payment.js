// pages/pages2/wallet/payment/payment.js
var request = getApp().globalData.sendRequest
const http = getApp().globalData.local;
var loginStore = wx.getStorageSync('userObj')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		store:1,
		Length:6,
		isFocus:true,  //聚焦 
		Value:"",    //输入的内容 
		ispassword:true, //是否密文显示 true为密文， false为明文。
		
		Length2:6,
		isFocus2:true,  //聚焦 
		Value2:"",    //输入的内容 
		ispassword2:true, //是否密文显示 true为密文， false为明文。
		code:'获取验证码',
		
		
		mobileCode:'',
		mobile:'',
		
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  if(options.she) {
		  wx.setNavigationBarTitle({
			title: '设置支付密码' 
		  })
	  }
	this.getPhone()
  },
  // 获取手机号
  getPhone() {
	  // /wechat/account/mobile
	  var that = this
	  request.getReq("/wechat/account/mobile",res=>{
		  if(res.code == 200) {
			  that.setData({
				  mobile:res.data
			  })
		  }
	  })
  },
  next() {
	this.setData({
		store:2
	})
	
  },
  next2() {
  	// console.log(this.data.Value2)

	var that = this
	var data = {
		code:that.data.mobileCode,
		passwd:that.data.Value,
		repasswd:that.data.Value2
	}
	console.log(wx.getStorageSync('payId'))
	wx.request({
		url:http+'/wechat/account/set_paypasswd',
		method:'post',
		data:data,
		header:{ "Abz-Request-Id":wx.getStorageSync('payId'),'content-type': 'application/json','Abz-Auth-Token': loginStore.token },
		success(res) {
			// console.log(res)
			if(res.data.code == 200) {
				wx.showToast({
					title:'设置完成',
					success() {
						setTimeout(function() {
							wx.navigateBack({
							  delta: 1
							})
						},1500)
					}
				})
			}else {
				wx.showToast({
					icon:'none',
					title:res.data.msg,
					success() {
						that.setData({
							code:'获取验证码'
						})
						setTimeout(function() {
							that.setData({
								store:1
							})
						},1500)
					}
				})
			}
		}
	})
  },
	Focus(e){ 
		var that = this; 
		// 初次输入的密码
		// console.log(e.detail.value,'第一次输入密码'); 
		var inputValue = e.detail.value; 
		that.setData({ 
		  Value:inputValue,
		}) 
		if(inputValue.length >= 6) {
			// 调出再次输入密码
			that.setData({
				store : 3
			})
		}
	 }, 
	Tap(){ 
		var that = this; 
		that.setData({ 
		  isFocus:true, 
		}) 
	 },
	 // 二次输入密码
	 Focus2(e){ 
			var that = this; 
			// 初次输入的密码
			// console.log(e.detail.value,'二次输入密码'); 
			var inputValue2 = e.detail.value; 
			that.setData({ 
				Value2:inputValue2,
			}) 
			if(inputValue2.length >= 6) {
				// 调出再次输入密码
				if(that.data.Value === that.data.Value2) {
					that.setData({
						isFocus2:false
					})
					
				} else {
					wx.showToast({
						icon:'none',
						title:'两次输入密码不一致,请重新输入',
						success () {
							setTimeout(function() {
								that.setData({
									store:2,
									Value:"",
									Value2:"",
								})
							},1500)
						}
					})
// 					that.setData({
// 						
// 					})
				}	
			}
	  }, 
	 Tap2(){ 
	 		var that = this; 
	 		that.setData({ 
	 		  isFocus2:true, 
	 		}) 
	  },
		getMobile(e) {
			this.setData({
				mobileCode:e.detail.value
			})
		},
		// 获取验证
		getCode() {
			var that = this
			request.getReq("/wechat/account/paypasswd_code", res=>{
				console.log(res)
				// 保存id
				if(res.code == 200) {
					wx.setStorageSync('payId',res.data)
					that.timer()
				}
			})
			
		},
		timer() {
			var that = this
			this.setData({
				code:60
			})
			var time = setInterval(function () {
				if(that.data.code > 0){
					that.setData({
						code:that.data.code-1
					})
				}else {
					clearInterval(time)
					that.setData({
						code:'获取验证码'
					})
				}
			},1000)
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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