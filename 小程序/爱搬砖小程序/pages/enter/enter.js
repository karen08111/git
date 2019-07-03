// pages/enter/enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSave:true,
		name:null,
		mobile:null,
		job:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let loginStore = wx.getStorageSync('userObj')
    let show = getApp().globalData.fun.showT
    const http = getApp().globalData.local
    this.setData({
      http:http
    })
    var request = getApp().globalData.sendRequest;
    var that=this
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
	save() {
		var request = getApp().globalData.sendRequest;
		var that=this
		var data = {
			mobile:this.data.mobile,
			enter_name:this.data.name,
			enter_type:this.data.job
		}
		request.postReq("/member/appEnter",data,res=>{
			if(res.code == 200) {
				wx.showToast({
					title:'提交成功!',
				})
			}else {
				wx.showToast({
					icon:'none',
					title:res.msg
				})
			}
		})
	},
	getName(e) {
		var name = e.detail.value
		this.setData({
			name:name
		})
	},
	getMobile(e) {
		this.setData({
			mobile:e.detail.value
		})
	},
	getJob(e) {
		this.setData({
			job:e.detail.value
		})
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