// pages/authen/authen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = options.title
    this.setData({
      title:title
    })
    // console.log(title)
    wx.showModal({
      title: '提示',
      content: title,
      success(res){
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/personal/personal',
          })
        } else if (res.cancel) {
          wx.switchTab({
            url: '/pages/personal/personal',
          })
        }
      }
    })
  },
  click:function(e){
    let id =e.currentTarget.dataset.id;
    let userId = e.currentTarget.dataset.userid;
    // console.log(e.currentTarget.dataset,222)
    // 1个人,2工程.3企业
    this.setData({
      current:id
    })
    // if(userId==1){

    // }
    wx.navigateTo({
      url: '/pages/identification/identification?typeId='+userId,
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