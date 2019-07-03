// pages/pages2/wallet/topUp/topUp.js
var request = getApp().globalData.sendRequest
const http = getApp().globalData.local
Page({

  /**
   * 页面的初始数据
   */
  data: {
	store:1,
	mount:'',
	isClick:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  save() {
// 	this.setData({
// 		store:2
// 	})
	if(this.data.mount) {
		var that = this
		var data = { mount: that.data.mount}
		request.postReq("/wechat/wallet/recharge",data,res =>{
			if(res.code == 200) {
				var wechat = res.data.wechat
				wx.requestPayment({
				  timeStamp: wechat.timeStamp,
				  nonceStr: wechat.nonceStr,
				  package: wechat.package,
				  signType: wechat.signType,
				  paySign: wechat.paySign,
				  success(res) { 
					  // console.log(res)
					  that.setData({
						  isClick:false,
						  store:2
					  })
// 					  wx.redirectTo({
// 					  	
// 					  })
// 					  wx.showToast({
// 						title:'支付成功',
// 						success() {
// 							setTimeout(function() {
// 								wx.navigateBack({
// 								  delta: 1
// 								})
// 							},1500)
// 						}
// 					  })
				  },
				  fail(res) { }
				})
			}
		})
	}else {
		wx.showToast({
			icon:'none',
			title:'请输入充值金额'
		})
	}

  },
  returns() {
	wx.navigateBack({
	  delta: 1
	})  
  },
  getMoney(e) {
	this.setData({
		mount:e.detail.value
	})  
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