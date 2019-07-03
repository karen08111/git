// pages/pages2/myTeam/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',//标题
    renNumber: '',//需求人数
    job: '',//招聘职位
    salary: '',//薪资
    salaryId: '',//类型
    dates: '',//时间
    endTime:'',//结束时间
    gong: '',//工龄
    cityId: '',//城市
    content: '',//描述
		isSave:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
  },
  getContent(e) {
    this.setData({
      content: e.detail
    })
  },
  getName(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getNumber(e) {
    this.setData({
      renNumber: e.detail.value
    })
  },
  jobId(e) {
    this.setData({
      job: e.detail
    })
  },
  getValue(e) {
    this.setData({
      salary: e.detail
    })
  },
  getId(e) {
    this.setData({
      salaryId: e.detail
    })
  },
  getDates(e) {
    this.setData({
      dates: e.detail
    })
  },
  getEndDates(e){
    this.setData({
      endTime:e.detail
    })
  },
  getGong(e) {
    this.setData({
      gong: e.detail
    })
  },
  getCityId(e) {
    this.setData({
      cityId: e.detail
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