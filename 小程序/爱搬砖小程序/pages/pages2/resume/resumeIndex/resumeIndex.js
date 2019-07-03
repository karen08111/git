// pages/pages2/resume/resumeIndex/resumeIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail:null,
    projectList:[],
    http:null,
    rid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    wx.hideShareMenu()
    
  },
  setDetail(){
    wx.navigateTo({
      url: '/pages/pages2/resume/basic/basic',
    })
  },
  setJob() {
    wx.navigateTo({
      url: '/pages/pages2/resume/job/job?typeId=1&rid='+this.data.rid,
    })
  },
  setBook() {
    wx.navigateTo({
      url: '/pages/pages2/resume/book/book',
    })
  },
  setIntr() {
		var content=''
		if(this.data.userDetail.detail.content){
			content = this.data.userDetail.detail.content
		}
		// console.log(this.data.userDetail.detail)
    wx.navigateTo({
      url: '/pages/pages2/resume/introduce/introduce?local=resume&content='+content,
    })
  },
  zhanghu() {
    wx.navigateTo({
      url: '/pages/pages2/account/menu/menu',
    })
  },
  prew(e) {
    var index = e.currentTarget.dataset.index
    var arr = this.data.userDetail.detail.senioritys
    var news = []
    for(let i in arr){
      news.push(this.data.http+arr[i].img_path)
    }
    wx.previewImage({
      current: news[index], // 当前显示图片的http链接
      urls: news // 需要预览的图片http链接列表
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
   
    // request.getReq("/member/jobcase",res=>{
    //   // console.log(res.data)
    //   if(res.code == 200){
    //     that.setData({
    //       projectList:res.data.data
    //     })
    //   }
    // })
		var request = getApp().globalData.sendRequest;
		var that = this
		const http = getApp().globalData.local;
		that.setData({
		  http:http
		})
		var loginStore = wx.getStorageSync('userObj')
		// console.log(loginStore)
		if (loginStore.auth_status > 0) {
		  request.getReq("/member/resume/moveEdit", res => {
		    console.log(res)
		    that.setData({
		      userDetail: res.data,
		      projectList: res.data.jobCase,
		      rid: res.data.detail.id
		    })
		  })
		}else {
		  wx.showModal({
		    title: '请先去身份认证',
		    cancelText: '暂不认证',
		    confirmText: '去认证',
		    success(res){
		      if (res.confirm) {
		        wx.redirectTo({
		          url: '/pages/pages2/userSelect/userSelectIndex/userSelectIndex',
		        })
		      } else if (res.cancel) {
		        wx.reLaunch({
		          url: '/pages/pages2/personal/personal',
		        })
		      }
		    }
		  })
		}
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