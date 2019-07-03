import WeCropper from '../../../we-cropper/we-cropper.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
		http:null,
    locationString:'请输入地址',
    timeString:'请输入时间',
    avatar:'',
    wxCode:'',//微信号
    phone:'',//手机
    laray:'',//薪资
    larayId:1,//薪资id
    cityId:'',//城市id
    dates:'',//日期
    bingId:'',//健康状况
    jobSto:'',//工作状态
    jobId:'',//工作id
    jobOneId:'',//
    jobStore:[
      {
        id:0,
        title:'否'
      },
      {
        id:1,
        title:'是'
      }
    ],
    isJob:[
      {
        id:0,
        title:'空闲中'
      },
      {
        id:1,
        title:'在职中'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    const http = getApp().globalData.local
    var request = getApp().globalData.sendRequest;
		var loginStore = wx.getStorageSync('userObj')
    var that= this
    if(options.avatar){
			wx.showLoading({
				title:'上传中...'
			})
// 			var base64 = 'data:image/jpeg;base64,'+ options.avatar
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
							request.postReq("/member/resume/avatar",data,res=>{
								if(res.code==200){
									wx.hideLoading()
									wx.showToast({
										title: "上传成功",
									})
									that.setData({
										avatar:res.data.path
									})
									wx.setStorageSync("newAvatar",http+res.data.path)
								}
							})
						}
					})
				}
			})

    }
    
   
    
  },
  upload(){
    var typeId = 1
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `/pages/avatarUpload/upload/upload?src=${src}&typeId=${typeId}&lei=1`
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getSalary(e){
    this.setData({
      laray:e.detail.value
    })
  },
  getSalaryId(e){
    this.setData({
      larayId:e.detail
    })
  },
  getCityId(e){
    this.setData({
      cityId:e.detail
    })
  },
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getDates(e){
    // console.log(e.detail)
    this.setData({
      dates:e.detail
    })
  },
  getBing(e){
    this.setData({
      bingId:parseInt(e.detail)-1
    })
  },
  getJobStroge(e){
    this.setData({
      jobSto:e.detail
    })
  },
  getWx(e){
    this.setData({
      wxCode:e.detail.value
    })
  },
  jobId(e){
    // console.log(e.detail)
    this.setData({
      jobId:e.detail
    })
  },
  jobOne(e){
    // console.log(e.detail)
    this.setData({
      jobOneId:e.detail
    })
  },
  formSubmit(e){
    // let wxBank = e.detail.value.wxBank
    // let wxPhone = e.detail.value.wxPhone
    
    const http = getApp().globalData.local
    var request = getApp().globalData.sendRequest;
    var that=this
    var data = {
      has_bad_medical_history:that.data.bingId,
      resume_type: that.data.jobOneId,
      work_type:that.data.jobId,
      mobile:that.data.phone,
      wechat_number:that.data.wxCode,
      min_pay: parseInt(that.data.laray),
      quantity_unit: that.data.larayId,
      work_time:that.data.dates,
      region:that.data.cityId,
      current_state: that.data.jobSto
    }
    // console.log(data)
    // let store = false
    // for(let i in data){
    //   if(data[i]){
    //     store = true
    //   }else {
    //     store=false
    //     break;
    //   }
    // }
   
      request.putReq("/member/resume",data,res=>{
        // console.log(res)
        if(res.code==200){
          wx.hideLoading();
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function(){
//                 wx.redirectTo({
//                   url: '/pages/pages2/resume/resumeIndex/resumeIndex',
//                 })
								wx.navigateBack({
									delta: 1
								})
              },1500)
            }
          })
        }else {
          wx.hideLoading();
          wx.showToast({
            icon:'none',
            title: res.msg,
          })
        }
      })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 渲染页面
    // wxCode: '',//微信号
    //   phone: '',//手机
    //     laray: '',//薪资
    //       larayId: 1,//薪资id
    //         cityId: '',//城市id
    //           dates: '',//日期
    //             bingId: '',//健康状况
    //               jobSto: '',//工作状态
    //                 jobId: '',//工作id
    //                   jobOneId: '',//
    var request = getApp().globalData.sendRequest
    var that = this
		const http = getApp().globalData.local
		this.setData({
			http:http
		})
    request.getReq("/member/resume/edit", res => {
      // console.log(res.data.detail)
      let user = res.data.detail
      if (res.code == 200) {
        that.setData({
					avatar:user.avatar,
          wxCode: user.wechat_number,
          laray:user.min_pay,
          larayId: user.quantity_unit.id,
          phone:user.mobile,
          bingId: user.has_bad_medical_history,
          jobSto: user.current_state,
          jobId: user.work_type?user.work_type.id:null,
          jobOneId: user.resume_type,
          cityId:user.region.length>0?user.region[1].id:null,
          locationString:user.region.length>0?user.region[0].title+'-'+user.region[1].title:null,
          dates:user.work_time?user.work_time[1]:''
        })
        // console.log(laray)
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