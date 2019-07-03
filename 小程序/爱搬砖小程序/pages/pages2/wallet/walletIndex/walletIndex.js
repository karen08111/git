// pages/pages2/wallet/walletIndex/walletIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	balance:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
	const http = getApp().globalData.loginUrl;
	var request = getApp().globalData.sendRequest
	var that = this
	// request.header['Content-Type'] = 'application/x-www-form-urlencoded'
	request.getReq("/wechat/wallet/info",res=>{
		if(res.code == 200) {
			that.setData({
				balance:res.data
			})
			if(!res.data.paypasswd) {
				wx.showModal({
					title:'提示',
					content:'请设置支付密码',
					success(res) {
						if (res.confirm) {
						  wx.navigateTo({
						  	url:'/pages/pages2/wallet/payment/payment?she=1'
						  })
						} else if (res.cancel) {
						  wx.navigateBack({
							  delta: 1
						  })
						}
					}
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