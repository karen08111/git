// pages/pages2/wallet/bill/bill.js
var request = getApp().globalData.sendRequest
const http = getApp().globalData.local
var loginStore = wx.getStorageSync('userObj')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		current:1,
		page:1,
		list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.getList()
  },
  qiehuan(e){
    this.setData({
      current:e.currentTarget.dataset.current,
	  page:1,
	  list:[]
    })
	this.getList()
  },
	jumps(e) {
		var id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:'/pages/pages2/wallet/billDetail/billDetail?id='+id
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
	getList() {
		var that = this
		var data = {
			page:that.data.page,
			genre:that.data.current
		}
		wx.request({
			url:http+'/wechat/wallet/steam',
			method:'get',
			data:data,
			header:{'content-type': 'application/json','Abz-Auth-Token': loginStore.token},
			success(res) {
				if(res.data.code == 200) {
					var arr = that.data.list
					that.setData({
						list:arr.concat(res.data.data.data),
						page:parseInt(res.data.data.current_page)+1
					})
					console.log(that.data.list)
				}
			}
		})
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