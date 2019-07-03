// pages/pages2/myTeam/teamSelect/teamSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	var request = getApp().globalData.sendRequest;
	var that = this
	request.getReq("/member/team/edit", res => {
		// console.log(res.data.data.length)
	  if(res.code == 200) {
			if(res.data.data.length == 0){
				wx.showModal({
					title:'是否前去创建团队简历?',
					confirmText:'是',
					cancelText:'否',
					success(r){
						if (r.confirm) {
						  wx.redirectTo({
						  	url:'/pages/pages2/resume/teamBasic/teamBasic',
						  })
						} else if (r.cancel) {
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