// pages/pages2/resume/resumeIndex/resumeIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail: null,
    projectList: [],
    http: null,
    tid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
		wx.hideShareMenu()
    // console.log(options)
  },
  setDetail() {
    wx.navigateTo({
      url: '/pages/pages2/resume/teamBasic/teamBasic',
    })
  },
  setJob() {
    wx.navigateTo({
      url: '/pages/pages2/myTeam/teamPerform/teamPerform',
    })
  },
  setBook() {
    wx.navigateTo({
      url: '/pages/pages2/resume/book/book',
    })
  },
  setIntr() {
		// console.log(this.data.userDetail.content)
		var content=''
		if(this.data.userDetail.content){
			content = this.data.userDetail.content
		}
    wx.navigateTo({
      url: '/pages/pages2/resume/introduce/introduce?local=team&content='+content,
    })
  },
  zhanghu() {
    wx.navigateTo({
      url: '/pages/pages2/account/menu/menu',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var request = getApp().globalData.sendRequest

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var request = getApp().globalData.sendRequest;
    var that = this
    // request.getReq("/member/jobcase",res=>{
    //   // console.log(res.data)
    //   if(res.code == 200){
    //     that.setData({
    //       projectList:res.data.data
    //     })
    //   }
    // })
 
    const http = getApp().globalData.local;
    that.setData({
      http: http
    })
    request.getReq("/member/team/edit", res => {
			// console.log(res.data.data)
      if(res.code == 200) {
				// 保存tid
				wx.setStorageSync("tid",res.data.data.id)
				that.setData({
				  userDetail: res.data.data,
				  projectList: res.data.jobCase,
				  tid: res.data.data.id
				})
				// console.log(res)
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