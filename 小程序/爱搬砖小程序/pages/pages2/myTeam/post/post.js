// pages/pages2/myTeam/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:[
      {
        id:1,
        title:'个人'
      },{
        id:2,
        title:'团队'
      }
    ],
    teamJobList:null,
    id:null,//
    title:'',//标题
    typeId:'',//招聘对象
    phone:'',//联系电弧
    renNumber:'',//需求人数
    job1:'',
    job:'',//招聘职位
    salary:'',//薪资
    salaryId:1,//类型
    dates:'',//时间
    gong:'',//工龄
    gongQi:'',//工期
    cityId:'',//城市
    content:'',//描述
    type:null,//set 修改  add发布
    publisher:1,//
    pla:'请选择城市',
    store:'add',
    isFa:null,
		isSave:true,
		tid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   type:options.type
    // })
		wx.hideShareMenu()
    console.log(options)
		if(options.tid){
			this.setData({
				tid:options.tid
			})
		}
    if(options.isFa){
      this.setData({
        isFa:options.isFa,
        typeId:1,
				publisher:2,
      })
    }
    if(options.type == 'set'){
      this.setData({
        store:options.type
      })
      // 渲染
      let id = options.id
      var request = getApp().globalData.sendRequest
      var that = this
      request.getReq("/member/recruit/"+id+"/edit",res=>{
        // console.log(res.data.detail)
        let user=res.data.detail
        if(res.code==200){
          that.setData({
            id:id,
            title:user.title,
            typeId:user.nature,
            phone:user.mobile,
            job1: user.recruit_type,
            job: user.work_type.id,
            renNumber:user.nums,
            salary:user.min_pay?user.min_pay:'',
            salaryId: user.quantity_unit,
            cityId:user.region[1].id,
            pla:user.region[0].title+'-'+user.region[1].title,
            publisher: user.publisher,
            gong: user.work_time,
            content:user.content,
            gongQi: user.construction_period,
            dates: user.start_time
          })
        }
      })
    }
  },
  setSave(){
    // console.log('修改保存');
    // var request = getApp().globalData.sendRequest
    // var that = this
    var request = getApp().globalData.sendRequest
    var that = this
    var data = {
      id:that.data.id,
      title: that.data.title,
      nature: that.data.typeId,
      mobile: that.data.phone,
      recruit_type: that.data.job1,
      work_type: that.data.job,
      nums: that.data.renNumber,
      min_pay: that.data.salary,
      quantity_unit: that.data.salaryId,
      region: that.data.cityId,
      publisher: that.data.publisher,
      work_time: that.data.gong,
      content: that.data.content,
      construction_period: that.data.gongQi,
      start_time: that.data.dates,
      _method: 'post'
    }
		if(this.data.isSave) {
			that.setData({
				isSave:false
			})
    // console.log(data)
      request.putReq('/member/recruit/update', data, res => {
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
								that.setData({
									isSave:true
								})
                wx.navigateBack({
                  delta: 1
                })
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
  save(){
    var request = getApp().globalData.sendRequest
    var that = this
    var data = {
      title: that.data.title,
      nature:that.data.typeId,
      mobile:that.data.phone,
      recruit_type:that.data.job1,
      work_type:that.data.job,
      nums:that.data.renNumber,
      min_pay:that.data.salary,
      quantity_unit:that.data.salaryId,
      region:that.data.cityId,
      publisher: that.data.publisher,
      work_time:that.data.gong,
      content:that.data.content,
      construction_period:that.data.gongQi,
      start_time:that.data.dates,
      _method:'put'
    }
		// this.data.publisher == 2 ? data['tid'] = wx.getStorageSync('tid'):''
		this.data.tid?data['tid']=this.data.tid:''
    if(this.data.isSave) {
    	that.setData({
    		isSave:false
    	})
      request.putReq('/member/recruit',data,res=>{
        if(res.code==200){
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function(){
								that.setData({
									isSave:true
								})
                wx.navigateBack({
                  delta: 1
                })
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
  },
  getGongQi(e){
    this.setData({
      gongQi:e.detail.value
    })
  },
  jobOne(e){
    this.setData({
      job1:e.detail
    })
  },
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getBing(e){
    // console.log(e.detail)
    this.setData({
      typeId:e.detail
    })
  },
  getContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  getName(e){
    this.setData({
      title:e.detail.value
    })
  },
  getNumber(e){
    this.setData({
      renNumber:e.detail.value
    })
  },
  jobId(e){
    this.setData({
      job:e.detail
    })
  },
  getValue(e){
    this.setData({
      salary:e.detail.value
    })
  },
  getId(e){
    this.setData({
      salaryId:e.detail
    })
  },
  getDates(e){
    this.setData({
      dates:e.detail
    })
  },
  getGong(e){
    // console.log(e.detail)
    this.setData({
      gong:e.detail.value
    })
  },
  getCityId(e){
    this.setData({
      cityId:e.detail
    })
  },
  getTeamJob(e) {
    // console.log(e.detail)
    this.setData({
      job:e.detail
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
    request.getReq("/common/project",res=>{
      // console.log(res)
      if(res.code == 200 ){
        that.setData({
          teamJobList:res.data
        })
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