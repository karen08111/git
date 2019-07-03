// pages/pages2/information/messageDetail/messageDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    nature:null,
    http:null,
    user:null,
    reset:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    that.setData({
      id: options.id,
      nature: options.nature,
      http:http
    })
    request.getReq("/recruit/detail/"+options.id,res=>{
      console.log(res.data)
      if(res.code==200){
        that.setData({
          user:res.data
        })
      }
    })
    var loginStore = wx.getStorageSync('overTime')
    if (loginStore) {
      // 获取关注状态
			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
      request.getReq("/member/seeReleaseFollow?follow_id=" + options.id + "&follow_type=3", res => {
        // console.log(res)
        if (res.code == 200) {
          that.setData({
            reset: res.msg
          })
        }
      })
    }
    
  },
  guanzhu(e) {
    // let id = e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest
    var that = this
		if(wx.getStorageSync('userObj')){
			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
		}
    request.getReq("/member/inReleaseFollow?follow_id=" + that.data.id + "&follow_type=3", res => {
      // console.log(res)
      if (res.code == 200) {
        that.setData({
          reset: 1
        })
      }
    })

  },
  quxiao(e) {
    // let id = e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest
    var that = this
		if(wx.getStorageSync('userObj')){
			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
		}
    request.getReq("/member/offReleaseFollow?follow_id=" + that.data.id + "&follow_type=3", res => {
      if (res.code == 200) {
        that.setData({
          reset: 0
        })
      }
      // console.log()
    })
  },
  lianxi(e) {
    let id = e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest
    var that = this
		if(wx.getStorageSync('userObj')){
			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
		}
    request.getReq("/member/getInfoMobile/" + id + "/3", res => {
      // console.log(res)
      if (res.code == 200) {
        wx.showModal({
          title: '联系方式',
          content: res.data,
          confirmText: '立即联系',
          success(r) {
            if (r.confirm) {
              wx.makePhoneCall({
                phoneNumber: res.data,
              })
            } else if (r.cancel) {
              // console.log('用户点击取消')
            }
          }
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