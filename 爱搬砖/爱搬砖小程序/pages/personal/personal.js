// pages/personal/personal.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    isShou:false,
    avatar:null,
    http:null,
    headImg:null,
    typeId:null,//认证角色
    status:null,//认证状态 
    numCount:null,
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    
  },
  
  jump:function(e){
    let typeId=e.currentTarget.dataset.id
    // 1是个人  2是团队  3  企业
    wx.navigateTo({
      url: '/pages/personalHomePage/personalHomePage?typeId='+typeId,
    })
  },
  mezhang:function(){
    wx.navigateTo({
      url: '/pages/setPhone/setOne/setOne',
    })
  },
  meSet:function(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  meGuanzhu:function(){
    wx.navigateTo({
      url: '/pages/follow/follow',
    })
  },
  meIdent:function(){
    let title = '';
    if(this.data.typeId!=0){
      title='您已经认证'
    }else if(this.data.status==1 || this.data.status==2) {
      title="您的认证资料审核中！请耐心等待"
    }
    wx.navigateTo({
      url: '/pages/authen/authen?title='+title,
    })
  },
  meFabu:function(){
    wx.navigateTo({
      url: '/pages/meRelease/meRelease',
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
  
  
  
  // 登录

  onShow: function () {
    const http = getApp().globalData.local;
    var that = this
    // 获取关注发布信息数量
    wx.request({
      url: http + '/member/userInfoNum',
      header: { 'Abz-Auth-Token': wx.getStorageSync('userObj').token },
      success: res => {
        // console.log(res)
        if (res.data.code == 200) {
          that.setData({
            numCount: res.data.msg
          })
        }
      }
    })
    that.setData({
      http: http,
      headImg: wx.getStorageSync('wxUser').userInfo.avatarUrl,//微信头像
    })
    // console.log(wx.getStorageSync('userObj'))
    // 获取个人信息
    wx.request({
      url: http + '/member/info',
      header: { 'Abz-Auth-Token': wx.getStorageSync('userObj').token },
      success: res => {
        if (res.data.code == 200) {
          that.setData({
            isShou: true,
            avater: res.data.data.avatar,
            typeId: wx.getStorageSync('userObj').dq_type,//认证类型
          })
        }
      }
    })
          

  },
  next: function () {
    
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