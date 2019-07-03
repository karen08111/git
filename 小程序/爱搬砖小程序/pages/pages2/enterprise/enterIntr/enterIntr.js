// pages/pages2/enterprise/enterIntr/enterIntr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:null,
    values:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    var request = getApp().globalData.sendRequest;
    const http = getApp().globalData.local
    var that = this
    this.setData({
      http: http
    })
    request.getReq("/member/companypage", res => {
      // console.log(res.data.company.detail.content)
      if (res.code == 200) {
        that.setData({
          values: res.data.company.detail.content
        })
      }
    })
  },
  getContent(e){
    this.setData({
      value:e.detail.value
    })
  },
  save(){
    var request = getApp().globalData.sendRequest
    var data = {
      content: this.data.value,
      _method: ''
    }
    if(this.data.value){
      request.putReq("/member/companypage/describe", data, res => {
        if(res.code==200) {
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function(){
                // wx.navigateBack({
                //   delta: 1
                // })
                wx.navigateBack({
                  url:"/pages/pages2/enterprise/enterpriseIndex/enterpriseIndex"
                })
              },1500)
            }
          })
        }
      })
    }else {
      wx.showToast({
        icon:'none',
        title: '请填写完整',
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