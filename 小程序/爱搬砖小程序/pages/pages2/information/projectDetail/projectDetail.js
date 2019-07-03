// pages/pages2/information/projectDetail/projectDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project:null,
    http:'',
    maps:null,
    markers: [{
      iconPath: '/images/maps.png',
      id: 0,
      latitude: '',
      longitude: '',
      width: 20,
      height: 20
    }],
    reset:0,
    id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var http = getApp().globalData.local
    this.setData({
      id:options.id
    })
    var request = getApp().globalData.sendRequest;
    var that = this
    request.getReq("/project/detail/"+options.id,res=>{
      // console.log(res.data.info)
      
      if(res.code == 200) {
        var markers = this.data.markers
        markers[0]['latitude']=res.data.info.lat
        markers[0]['longitude'] = res.data.info.lng
        // console.log(markers)
        that.setData({
          project:res.data,
          http:http,
          markers: markers
        })

        
      }
    })
    var loginStore = wx.getStorageSync('overTime')
    if(loginStore){//获取关注状态
			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
      request.getReq("/member/seeReleaseFollow?follow_id=" + options.id +"&follow_type=4",res=>{
        if(res.code == 200) {
          that.setData({
            reset:res.msg
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
    request.getReq("/member/inReleaseFollow?follow_id=" + that.data.id + "&follow_type=4", res => {
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
    request.getReq("/member/offReleaseFollow?follow_id=" + that.data.id + "&follow_type=4", res => {
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
    request.getReq("/member/getInfoMobile/" + this.data.id + "/4", res => {
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