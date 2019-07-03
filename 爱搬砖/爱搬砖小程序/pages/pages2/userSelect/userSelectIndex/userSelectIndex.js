// pages/pages2/userSelect/userSelectIndex/userSelectIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	wx.hideShareMenu()
  },
  select(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      current:id
    })
  },
  next(){
    // console.log(this.data.current)
    if(this.data.current){
      wx.navigateTo({
        url: '/pages/pages2/userSelect/gerenForm/gerenForm?type=' + this.data.current,
      })
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
		// console.log(wx.getStorageSync('userObj'))
		if(wx.getStorageSync('userObj').auth_status == 2 ){
			wx.showModal({
				title:'提示',
				content:'身份信息审核中...',
				success(res) {
					if (res.confirm) {
						wx.navigateBack({
							delta: 1
						})
					} else if (res.cancel) {
						wx.navigateBack({
							delta: 1
						})
					}
				}
			})
		}else if(wx.getStorageSync('userObj').auth_status == 4){
			wx.showModal({
				title:'提示',
				content:'身份已认证,无需重复认证',
				success(res) {
					if (res.confirm) {
						wx.navigateBack({
							delta: 1
						})
					} else if (res.cancel) {
						wx.navigateBack({
							delta: 1
						})
					}
				}
			})
		}else if(wx.getStorageSync('userObj').auth_status == 4){
			wx.showModal({
				title:'提示',
				content:'身份待审核...',
				success(res) {
					if (res.confirm) {
						wx.navigateBack({
							delta: 1
						})
					} else if (res.cancel) {
						wx.navigateBack({
							delta: 1
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