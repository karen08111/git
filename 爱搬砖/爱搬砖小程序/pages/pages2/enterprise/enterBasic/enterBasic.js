// pages/pages2/enterprise/enterBasic/enterBasic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseAddress:null,//地址名称
    biao:null,//经纬度
    qiyeEmail:null,//企业邮箱
    qiyeCode:null,//传真号码
    qiyePhone:null,//联系方式
    qiyeInter:null,//企业网址
    cityId:null,//地址
    avatar:null,//头像
    http:null,//
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
	wx.hideShareMenu()
    var that = this
    const http = getApp().globalData.local
    var request = getApp().globalData.sendRequest
		var loginStore = wx.getStorageSync('userObj')
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
										request.postReq("/member/companypage/avatar",data,res=>{
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
      // this.setData({
      //   avatar:options.avatar
      // })
      // 上传头像
    }
    // 渲染页面
    
    
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
          url: `/pages/avatarUpload/upload/upload?src=${src}&typeId=${typeId}&lei=3`
        })
      }
    })
  },
  save(){
    var that=this
    var request = getApp().globalData.sendRequest
    var data = {
      office_mobile:that.data.qiyePhone,
      fax_number:that.data.qiyeCode,
      enterprise_email:that.data.qiyeEmail,
      official_website:that.data.qiyeInter,
      company_address: that.data.chooseAddress,
      map_pos:that.data.biao
    }
    // let store = false;
    // for(let i in data){
    //   if(data[i]){
    //     store = true
    //   }else {
    //     store = false
    //     break
    //   }
    // }
    // if(store) {
      request.putReq("/member/companypage/save",data,res=>{
        // console.log(res)
        if(res.code == 200) {
          
          wx.hideLoading();
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function(){
//                 wx.redirectTo({
//                   url: '/pages/pages2/enterprise/enterpriseIndex/enterpriseIndex',
//                 })
								wx.navigateBack({
									delta: 1
								})
              },1500)
            }
          })
        }else {
          wx.showToast({
            icon:'none',
            title: res.msg
          })
        }
      })
    // }else{
    //   wx.showToast({
    //     icon:'none',
    //     title: '请填写完整',
    //   })
    // }
  },
  getEmail(e){
    this.setData({
      qiyeEmail:e.detail.value
    })
  },
  getCode(e){
    this.setData({
      qiyeCode:e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      qiyePhone:e.detail.value
    })
  },
  getInter(e){
    this.setData({
      qiyeInter:e.detail.value
    })
  },
  getCityId(e){
    this.setData({
      cityId:e.detail
    })
  },
  onChangeAddress(){
		var that = this
		wx.chooseLocation({
		    success: function (res) {    
					 that.setData({
						 chooseAddress: res.address,
						 biao: res.latitude + ',' + res.longitude
					 })              
		    },
		    fail:function(){
		        wx.getSetting({
		            success: function (res) {
		                var statu = res.authSetting;
		                if (!statu['scope.userLocation']) {
		                    wx.showModal({
		                        title: '是否授权当前位置',
		                        content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
		                        success: function (tip) {
		                            if (tip.confirm) {
		                                wx.openSetting({
		                                    success: function (data) {
		                                        if (data.authSetting["scope.userLocation"] === true) {
		                                            wx.showToast({
		                                                title: '授权成功',
		                                                icon: 'success',
		                                                duration: 1000
		                                            })
		                                            //授权成功之后，再调用chooseLocation选择地方
		                                            wx.chooseLocation({
		                                                success: function(res) {
		                                                    that.setData({
		                                                      chooseAddress: res.address,
		                                                      biao: res.latitude + ',' + res.longitude
		                                                    })
		                                                },
		                                            })
		                                        } else {
		                                            wx.showToast({
		                                                title: '授权失败',
		                                                icon: 'success',
		                                                duration: 1000
		                                            })
		                                        }
		                                    }
		                                })
		                            }
		                        }
		                    })
		                }
		            },
		            fail: function (res) {
		                wx.showToast({
		                    title: '调用授权窗口失败',
		                    icon: 'success',
		                    duration: 1000
		                })
		            }
		        })
		    }
		}) 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		var that = this
		var request = getApp().globalData.sendRequest
		const http = getApp().globalData.local
		this.setData({
		  http:http
		})
		request.getReq("/member/companypage",res=>{
		  // console.log(res.data.company.detail)
		  if(res.code == 200) {
			  if(res.data.company.detail){
				  that.setData({
				    chooseAddress:res.data.company.detail.company_address,
				    avatar: res.data.company.detail.avatar,
				    qiyeEmail: res.data.company.detail.enterprise_email,
				    qiyePhone: res.data.company.detail.office_mobile,
				    qiyeCode: res.data.company.detail.fax_number,
				    qiyeInter: res.data.company.detail.official_website,
				    biao: res.data.company.detail.map_pos
				  })
			  }
		    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})