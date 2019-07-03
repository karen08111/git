// pages/pages2/account/safe/safe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	title:'获取验证码',
	isCode:true,
	email:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 
  gets() {
	var that = this
	var request = getApp().globalData.sendRequest
	if(this.data.email) {
		// this.times()
		
	}else {
		wx.showToast({
			icon:'none',
			title:'请填写邮箱'
		})
	}
	
	// console.log(1)
	
  },
  times() {
	  var that = this
	  this.setData({
	  	isCode:false,
	  	title:60
	  })
	  var timer = setInterval(function() {
	  	if(that.data.title != 0){
	  		that.setData({
	  			title:that.data.title-1
	  		})
	  	}else {
	  		clearInterval(timer)
	  		that.setData({
	  			isCode:true,
	  			title:'获取验证码',
	  		})
	  	}
	  	
	  },1000)
  },
  save() {
	  var that = this
	  var request = getApp().globalData.sendRequest
	  var http = getApp().globalData.local
	  if(this.data.email) {
		  var data = {
		  	mail:this.data.email
		  }
		  request.postReq("/member/account/bind_mail",data,res=>{
		  	// console.log(res)
			if(res.code == 200) {
				wx.showToast({
					title:'验证地址已发送至邮箱,请登录邮箱进行查看',
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
					title:res.msg
				})
			}
		  })
	  }else {
		wx.showToast({
			icon:'none',
			title:'请填写邮箱'
		})
	}
	 
  },
  emails(e) {
	// console.log(e)  
	this.setData({
		email:e.detail.value
	})
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