

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:'',
    abzId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const http = getApp().globalData.local
    this.setData({
      http: http
    })
    var that = this;
    wx.request({
      url: http + '/member/moveImages',
      success(res) {
        that.setData({
          imgs:res.data,
          abzId: res.header["Abz-Request-Id"]
        })
      }
    })
  },
  myEventListener: function (e) {
    //获取到组件的返回值，并将其打印
    console.log('是否验证通过:' + e.detail)
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