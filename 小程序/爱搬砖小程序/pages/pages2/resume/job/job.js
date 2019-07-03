// pages/pages2/resume/job/job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList:null,//团队单位
    names:'',//工作单位名称
    job:'请选择职位',//职位
    startTime:'',//开始时间
    endTime:0,//结束时间
    cityId:'',//工作地点
    content:'',//工作详情
    typeId:1,//1是个人  2 是团队
    id:null,
    cityPla:'',
    jobIds:'',
    rid:null,//简历id
    tid:null,
		isSave:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
		// console.log(options)
    this.setData({
      typeId:options.typeId,
  
    })
    if(options.tid){
      this.setData({
        rid:options.tid
      })
    }
    // console.log(options)
    if(options.rid){
      this.setData({
        rid: options.rid
      })
    }
    // 渲染-修改
    var request = getApp().globalData.sendRequest;
    var that = this
    
    if(options.id && options.typeId==1){//工作经历
      let id = options.id
      that.setData({
        id:id,
        isSet:'set'
      })
      request.getReq("/member/jobcase/"+id+"/edit",res=>{
        // console.log(res.data)
        if(res.code==200){
          let user = res.data
          // if(that)
          that.setData({
        
            names: user.ach_name,
            content:user.content,
            startTime: user.start_time,
            endTime: user.end_time,
            cityId:user.region[1].id,
            job: user.job_type.parent.title + '-' + user.job_type.Sub.title,
            jobIds:user.job_type.Sub.id,
            cityPla:user.region[0].title+'-'+user.region[1].title,
          })
        }
      })
    } else if (options.id && options.typeId == 2){//工程业绩
      let id = options.id
      that.setData({
        id: id,
        isSet: 'set'
      })
      request.getReq("/member/jobcase/" + id + "/edit", res => {
        // console.log(res.data)
        if (res.code == 200) {
          let user = res.data
          // if(that)
          that.setData({
            names: user.ach_name,
            content: user.content,
            startTime: user.start_time,
            endTime: user.end_time,
            cityId: user.region[1].id,
            jobIds: user.job_type.id,
            cityPla: user.region[0].title + '-' + user.region[1].title
          })
        }
      })
    } 
    
  },
  delet(){
    var that = this
    var id = that.data.id
    var request = getApp().globalData.sendRequest;
    
    wx.showModal({
      title: '是否删除本条吗?',
      content: '',
      cancelText:'否',
      confirmText:'是',
      success(r){
        if (r.confirm) {
          // console.log('用户点击确定')
          request.getReq("/member/jobcase/" + id + "/delete", res => {
            if (res.code == 200) {
              if (that.data.typeId == 1) {
                wx.navigateBack({
                  url: '/pages/pages2/resume/resumeIndex/resumeIndex',
                })
              } else if (that.data.typeId == 2) {
                wx.navigateBack({
                  url: '/pages/pages2/myTeam/teamResum/teamResumIndex',
                })
              }
            }
          })
        } else if (r.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
    
   
  },
  formSubmitSet(){
    var request = getApp().globalData.sendRequest;
    var that = this
    var data = {
      tid:this.data.rid,
      id:that.data.id,
      ach_name: that.data.names,
      // job_type: that.data.job,
      job_type: that.data.jobIds,
      start_time: that.data.startTime,
      end_time: that.data.endTime,
      region: that.data.cityId,
      nature: that.data.typeId,
      content: that.data.content
    }
		if(this.data.isSave) {
			that.setData({
				isSave:false
			})
			request.postReq("/member/jobcase/update", data, res => {
			  // console.log(res)
			  if (res.code == 200) {
			    wx.showToast({
			      title: res.msg,
			      success() {
			        setTimeout(function () {
								that.setData({
									isSave:true
								})
			          if(that.data.typeId==1){
			            wx.navigateBack({
			              url: '/pages/pages2/resume/resumeIndex/resumeIndex',
			            })
			          }else if(that.data.typeId==2){
			            wx.navigateBack({
			              url: '/pages/pages2/myTeam/teamResum/teamResumIndex',
			            })
			          }
			          
			        }, 1500)
			      }
			    })
			  } else {
					that.setData({
						isSave:true
					})
			    wx.showToast({
			      icon: 'none',
			      title: res.msg,
			    })
			  }
			})
		}
    
   
  },
  formSubmit(){
    var request = getApp().globalData.sendRequest;
    var that = this
    var data = {
      tid:that.data.rid,
      ach_name: that.data.names,
      // job_type:that.data.job,
      job_type: that.data.jobIds,
      start_time: that.data.startTime,
      end_time: that.data.endTime,
      region: that.data.cityId,
      nature: that.data.typeId,
      content: that.data.content
    }
		if(this.data.isSave) {
			that.setData({
				isSave:false
			})
			request.postReq("/member/jobcase/save",data,res=>{
				// console.log(res)
				if(res.code==200){
					wx.showToast({
						title: res.msg,
						success(){
							setTimeout(function(){
								that.setData({
									isSave:true
								})
								if (that.data.typeId == 1) {
									wx.navigateBack({
										url: '/pages/pages2/resume/resumeIndex/resumeIndex',
									})
								} else if (that.data.typeId == 2) {
									wx.navigateBack({
										url: '/pages/pages2/myTeam/teamResum/teamResumIndex',
									})
								}
							},1500)
						}
					})
				}else {
					that.setData({
						isSave:true
					})
					wx.showToast({
						icon:'none',
						title: res.msg,
					})
				}
			})
		}
    // request.getReq('/common/quantityUnit',res=>{
    //   console.log(res)
    // })
  },
  getBing(e){
    this.setData({
      jobIds:e.detail
    })
  },
  getNames(e){
    this.setData({
      names:e.detail.value
    })
  },
  getContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  getJob(e){
    // console.log(e)
    this.setData({
      job:e.detail.value
    })
  },
  getDates1(e){
    this.setData({
      startTime:e.detail
    })
  },
  getDates2(e){
    this.setData({
      endTime:e.detail
    })
  },
  getCityId(e){
    this.setData({
      cityId:e.detail
    })
  },
  jobId(e){
    this.setData({
      jobIds:e.detail
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