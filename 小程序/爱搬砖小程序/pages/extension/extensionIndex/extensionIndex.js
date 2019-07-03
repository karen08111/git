// pages/extension/extensionIndex/extensionIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	http:null,
	userList:[],//用户列表
	yStore:null,//邀请的状态
	userInfo:null,//用户信息
	invitation_code:null,//邀请码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this
		const http = getApp().globalData.local
		this.setData({
			http:http
		})
		that.getIndex()
		that.yaoUser()
		// this.getUserList()
// 		this.getIndex()
// 		this.yaoUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 获取邀请的用户列表
  getUserList() {
	  var request = getApp().globalData.sendRequest;
	  var that = this
	  request.getReq('/member/invitationPeopleList',res=>{
		  console.log(res)
		  if(res.code == 200) {
			  that.setData({
				  userList:res.data
			  })
		  }
	  })
	  
  },
  // 获取用户主页
  getIndex() {
	 var request = getApp().globalData.sendRequest;
	 var that = this
	 request.getReq("/member/invitationInfo",res=>{
		 // console.log(res.data.userInfo)
		 if(res.code == 200) {
			 that.setData({
				 userList:res.data.list,
				 yStore:res.data.UserInvitationMoneyStatusList,
				 userInfo:res.data.userInfo
			 })
		 }
	 })
  },
  // 邀请用户
  yaoUser() {
	  var request = getApp().globalData.sendRequest;
	  var that = this
	  request.getReq("/member/invitationCode",res=>{
		  if(res.code == 200 ) {
			  that.setData({
				  invitation_code:res.data
			  })
		  }
	  })
	  //转发

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
  onPageScroll:function(e){
		if(e.scrollTop<0){
		 wx.pageScrollTo({
			 scrollTop: 0
		 })
		}
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
	// this.yaoUser()
	return {
	  title: '【爱搬砖】邀请工友领红包,最高600元红包等你来拿！',
	  path: '/pages/extension/extensionLogin/extensionLogin?invitation_code='+this.data.invitation_code
	}
  }
})