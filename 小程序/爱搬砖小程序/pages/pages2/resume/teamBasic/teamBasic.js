// pages/pages2/resume/teamBasic/teamBasic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:null,
    jobList:null,
    locationString:'请选择团队所在地区',
    team_name:null,//团队名称
    industry_type:null,//擅长行业
    wechat_number:null,//微信号
    mobile:null,//联系方式
    team_create_time:null,//团队创建时间
    region:null,//所在地区
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 渲染
		wx.hideShareMenu()
    var request = getApp().globalData.sendRequest
    var that = this
    const http = getApp().globalData.local
		var loginStore = wx.getStorageSync('userObj')
    that.setData({
      http: http
    })
//     request.getReq("/member/team/edit", res => {
//       that.setData({
//         avatar: res.data.data.avatar,
//       })
//     })
    // 上传头像
    if (options.avatar) {
			 // 上传头像
						wx.showLoading({
							title:'上传中...'
						})
						var data={
							file:options.avatar
						}
						// console.log(data)
						wx.uploadFile({
							url:http+'/member/upload/images',
							filePath: options.avatar,
							name: 'file',
							header:{'Abz-Auth-Token': loginStore.token},
							formData: {
								user: 'test'
							},
							success(rs) {
								const data = rs.data
								// do something
								var r = JSON.parse(rs.data)
								wx.request({
									url: http+r.data.path,
									responseType: 'arraybuffer',
									success(res){
										let base64 = wx.arrayBufferToBase64(res.data)
										base64 = 'data:image/jpeg;base64,' + base64
										var data = {
											file:base64
										}
										request.postReq("/member/team/avatar",data,res=>{
											if(res.code==200){
												wx.hideLoading()
												wx.showToast({
													title: "上传成功",
												})
												that.setData({
													avatar:http+res.data.path
												})
											}
										})
									}
								})
							}
						})
    } 
    
    request.getReq("/member/team/edit",res=>{
      var user = res.data.data
			// console.log(user)
      if(res.code == 200 && user.length!=0){
        that.setData({
					avatar:user.avatar?http+user.avatar:'',
          team_name: user.team_name,
          industry_type: user.industry_type.id,
          wechat_number: user.wechat_number,
          mobile: user.mobile,
          team_create_time: user.team_create_time[1],
          region: user.region[1].id,
          locationString:user.region[0].title+'-'+user.region[1].title,
        })
      }
    })
  },
  upload() {
    var typeId = 1
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `/pages/avatarUpload/upload/upload?src=${src}&typeId=${typeId}&lei=2`
        })
      }
    })
  },
  formSubmit(){
    var request = getApp().globalData.sendRequest
    var that = this
    var data = {
      team_name: that.data.team_name,
      industry_type: that.data.industry_type,
      wechat_number: that.data.wechat_number,
      mobile: that.data.mobile,
      team_create_time: that.data.team_create_time,
      region: that.data.region
    }
    request.postReq("/member/team",data,res=>{
      // console.log(res)
      if(res.code == 200){
        wx.showToast({
          title: res.msg,
          success(){
            setTimeout(function(){
//               wx.redirectTo({
//                 url: '/pages/pages2/myTeam/teamResum/teamResumIndex',
//               })
								wx.navigateBack({
									delta: 1
								})
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
  },
  getteam_name(e){
    this.setData({
      team_name:e.detail.value
    })
  },
  getBing(e){
    this.setData({
      industry_type:e.detail
    })
  },
  getwechat_number(e){
    this.setData({
      wechat_number:e.detail.value
    })
  },
  getmobile(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  getteam_create_time(e){
    this.setData({
      team_create_time:e.detail
    })
  },
  getCityId(e){
    this.setData({
      region:e.detail
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
    var request = getApp().globalData.sendRequest
    var that = this
    request.getReq("/common/project", res => {
      // console.log(res)
      that.setData({
        jobList: res.data
      })
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