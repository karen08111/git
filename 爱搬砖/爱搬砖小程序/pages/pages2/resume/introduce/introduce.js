// pages/pages2/resume/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    local:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    // console.log(options)
		if(options.content) {
			this.setData({
				content:options.content
			})
		}
    if(options.local){
      this.setData({
        local:options.local
      })
    }
  },
  getContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  save(){
    var request = getApp().globalData.sendRequest
    var data={
      content:this.data.content,
      _method:''
    }
    var that = this
    if(this.data.content){
      request.putReq("/member/"+that.data.local+"/describe", data, res => {
        if(res.code==200){
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function(){
                
                if(that.data.local == "team"){
//                   wx.redirectTo({
//                     url: '/pages/pages2/myTeam/teamResum/teamResumIndex',
//                   })
									wx.navigateBack({
										delta: 1
									})
                } else if (that.data.local =="resume") {
//                   wx.redirectTo({
//                     url: '/pages/pages2/resume/resumeIndex/resumeIndex',
//                   })
									wx.navigateBack({
										delta: 1
									})
                }
              },1500)
            }
          })
        }else {
          wx.showToast({
            icon:'none',
            title: res.msg,
          })
        }
      })
    }else {
      wx.showToast({
        icon:'none',
        title:'内容不容为空',
      })
    }
    
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