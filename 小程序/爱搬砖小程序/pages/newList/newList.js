// pages/newList/newList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	http:null,
	newList:[],
	page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getList() {
	  var that = this
	  var request = getApp().globalData.sendRequest
	  var http = getApp().globalData.local
	  this.setData({
		  http:http
	  })
	  var r = getApp().globalData.sendRequest;
	  r.sendRequest('/newsList?page='+that.data.page,'get').then(res=>{
	    if(res.data.code==200){
				var arr = that.data.newList
	      that.setData({
	        newList:arr.concat(res.data.data.data),
					page:parseInt(res.data.data.current_page)+1
	      })
		  // console.log(that.data.newList)
	    }
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
	this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})