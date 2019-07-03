// pages/pages2/attention/attention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    guanUser:[],//关注的会员
    guanXin:[],//关注的信息
    http:null,//
    page:1,
    userPage:1,
    height:0,
    top:0,
    isMore:false,
    userMore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    var that = this
    var http = getApp().globalData.local
    var request = getApp().globalData.sendRequest
    
    that.getXin();
    that.getUser();
    // 获取高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height:res.windowHeight,
					http:http
        })
      },
    })
    
  },
  // 滑动到底部
  bindDownLoad(){
    var that = this;
    if(!that.data.isMore){
      that.setData({
        page: that.data.page + 1
      })
      that.getXin();
    }
    
    
    // console.log(this.data.page)
  },
  scroll(e){
    this.setData({
      top:e.detail.scrollTop
    })
  },
  topLoad(e){

  },
  jumpUser(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pages2/information/showEnter/showEnter?id=' + id,
    })
  },
  // 关注会员
  getUser(){
    var that = this
    var http = getApp().globalData.local
    var request = getApp().globalData.sendRequest
    request.getReq("/member/followList?page=" + that.data.userPage,res=>{
      // console.log(res)
      if(res.code==200){
        if(res.data.data.length>0){
          let newArr = that.data.guanUser.concat(res.data.data)
          that.setData({
            guanUser:newArr
          })
          // console.log(that.data.guanUser)
        }else {
          that.setData({
            userMore:true
          })
        }
      }
    })
  },
  // 关注信息
  getXin(){
    var that = this
    var http = getApp().globalData.local
    var request = getApp().globalData.sendRequest
    request.getReq("/member/releaseFollowList?page="+that.data.page, res => {
      // console.log(res.data.data)
      if (res.code == 200) {
        if(res.data.data.length>0){
          var newArr = that.data.guanXin.concat(res.data.data)
          that.setData({
            guanXin: newArr
          })
        }else {
          that.setData({
            isMore:true
          })
        }
        // console.log(that.data.guanXin)
      }
    })
  },
  qiehuan(e){
    this.setData({
      current:e.currentTarget.dataset.current
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