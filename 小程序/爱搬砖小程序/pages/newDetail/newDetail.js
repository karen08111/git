// pages/newDetail/newDetail.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:null,
    http:null,
    article:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var article;
    var id=options.id
    const http = getApp().globalData.local
    this.setData({
      http: http
    })
    var r = getApp().globalData.sendRequest;
    var that = this
    let loginStore = wx.getStorageSync('userObj')
    wx.request({
      method:'get',
      url: http +'/detailsNews/'+id,
      header: { 'Abz-Auth-Token': loginStore.token },
      success: res => {
				WxParse.wxParse('article', 'html', res.data.data.content, that, 5)
        that.setData({
          news:res.data.data,
        })
      }
    })
		// console.log(this.data.article)
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