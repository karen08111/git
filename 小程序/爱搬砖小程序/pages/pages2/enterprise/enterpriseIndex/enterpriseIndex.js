// pages/pages2/enterprise/enterpriseIndex/enterpriseIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enter:null,
    http:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
  },
  setJiben(){
    wx.navigateTo({
      url: '/pages/pages2/enterprise/enterBasic/enterBasic',
    })
  },
  prews(e) {
    var index = e.currentTarget.dataset.index
    var imgs = this.data.enter.company.detail.imgs
    var arr = []
    for(let i in imgs){
      arr.push(this.data.http + imgs[i].path)
    }
    wx.previewImage({
      current:arr[index],
      urls: arr,
    })
  },
  identPrew(e) {
    var index = e.currentTarget.dataset.index
    var imgs = this.data.enter.company.detail.senioritys
    var arr = []
    for (let i in imgs) {
      arr.push(this.data.http + imgs[i].img_path)
    }
    wx.previewImage({
      current: arr[index],
      urls: arr,
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
    var request = getApp().globalData.sendRequest;
    const http = getApp().globalData.local
    var that = this
    this.setData({
      http: http
    })
    request.getReq("/member/companypage", res => {
      // console.log(res.data)
      if (res.code == 200) {
        that.setData({
          enter: res.data
        })
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