// pages/pages2/wallet/billDetail/billDetail.js
var request = getApp().globalData.sendRequest
Page({

  /**
   * 页面的初始数据
   */
  data: {
	dan:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var id =options.id
	var that= this
	request.getReq("/wechat/wallet/steam/"+id,res=>{
		console.log(res.data)
		if(res.code == 200) {
			that.setData({
				dan:res.data
			})
		}
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