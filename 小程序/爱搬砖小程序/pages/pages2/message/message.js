// pages/pages2/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:null,
		page:1,
		messageList:[],
		 hidden:true,
		 scrollTop : 0,
		 scrollHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
       wx.getSystemInfo({
           success:function(res){
               that.setData({
                   scrollHeight:res.windowHeight
               });
           }
       });
		this.getMessage()
  },
  detail(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      current:index
    })
  },
	getMessage() {
		var request = getApp().globalData.sendRequest
		var that = this
		request.getReq("/member/notice?page="+that.data.page,res=>{
			// console.log(this.data.page)
			var arr = that.data.messageList
			if(res.code == 200) {
				that.setData({
					messageList:arr.concat(res.data.data),
					page:parseInt(res.data.current_page)+1
				})
			}
		})
	},
	//页面滑动到底部
   bindDownLoad:function(){   
       var that = this;
			this.getMessage()
       // console.log("lower");
   },
   scroll:function(event){
     //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
      this.setData({
          scrollTop : event.detail.scrollTop
      });
   },
   topLoad:function(event){
     //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
//        page = 0;
//        this.setData({
//            list : [],
//            scrollTop : 0
//        });
//        loadMore(this);
       // console.log("lower");
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		this.setData({
			page:1
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