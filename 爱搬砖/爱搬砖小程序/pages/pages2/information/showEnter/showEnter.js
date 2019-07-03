// pages/pages2/information/showEnter/showEnter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http:null,
    user:null,
    reset:0,
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id= options.id
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    request.getReq("/company/"+id,res=>{
      console.log(res.data.info)
      if(res.code==200){
        that.setData({
          user:res.data,
          http: http,
          id:res.data.info.uid
        })
      }
    })
    // 检查是否关注
    var loginStore = wx.getStorageSync('overTime')
    if (loginStore) {
			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
      request.getReq("/member/seeFollow/" + options.id, res => {
        // console.log(res)
        if (res.code == 200) {
          that.setData({
            reset: res.msg
          })
        }
      })
    }
  },
  prev(e){
    var arr = []
    for (let i in this.data.user.info.senioritys){
      arr.push(this.data.http+this.data.user.info.senioritys[i].img_path)
    }
    var index = e.currentTarget.dataset.index
    var url = e.currentTarget.dataset.index
    wx.previewImage({
      current: arr[index], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  photoPrev(e) {
    var arr = []
    for (let i in this.data.user.info.imgs){
      arr.push(this.data.http + this.data.user.info.imgs[i].path)
    }
    var index = e.currentTarget.dataset.index
    wx.previewImage({
      current: arr[index], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  guanzhu(){
    var request = getApp().globalData.sendRequest
    var that = this
// 		if(wx.getStorageSync('userObj')){
// 			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
// 		}
    request.getReq("/member/inFollow/" + that.data.id, res => {
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
// 		if(wx.getStorageSync('userObj')){
// 			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
// 		}
    request.getReq("/member/offFollow/" + that.data.id , res => {
      if (res.code == 200) {
        that.setData({
          reset: 0
        })
      }
      // console.log()
    })
  },
  lianxi(e) {
    // let id = e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest
    var that = this
// 		if(wx.getStorageSync('userObj')){
// 			request.header['Abz-Auth-Token']=wx.getStorageSync('userObj').token
// 		}
    request.getReq("/member/getInfoMobile/" + this.data.id + "/5", res => {
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