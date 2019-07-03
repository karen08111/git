// pages/pages2/myTeam/compile/compile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lader:[
      {
        id:0,
        title:'否'
      },
      {
        id:1,
        title:'是'
      }
    ],
    userArray:[],
    userName:null,//姓名
    identType: null,//证件类型
    identCode: null,//证件号码
    phone: null,//手机号码
    old: null,//年龄
    jobOld: null,//工龄
    bossName: 0,//团队负责人
    email: null,//邮箱
    id:null,
    tid:null,
		isSave:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
		console.log(options)
    var request = getApp().globalData.sendRequest;
    var that = this
    if(options.tid){
      this.setData({
        tid:options.tid
      })
    }
    if(options.id){
      that.setData({
        id: options.id
      })
      // 渲染
      // userName: null,//姓名
      //   identType: null,//证件类型
      //     identCode: null,//证件号码
      //       phone: null,//手机号码
      //         old: null,//年龄
      //           jobOld: null,//工龄
      //             bossName: null,//团队负责人
      //               email: null,//邮箱
      //                 id: null,
      request.getReq("/member/teamMamber/" + options.id+"/edit",res=>{
        // console.log(res.data)
        if(res.code ==200){
          var user = res.data
          that.setData({
            userName: user.user_name,
            identType: user.card_type.id,
            identCode: user.card_num,
            phone:user.mobile,
            old:user.age,
            jobOld:user.work_time,
            bossName:user.is_leader,
            email:user.email
          })
        }
        
      })
    }
  },
  // 修改
  sets(){
    var request = getApp().globalData.sendRequest;
    var that = this
    var data = {
      tid:this.data.tid,
      id:that.data.id,
      user_name: that.data.userName,
      card_type: that.data.identType,
      card_num: that.data.identCode,
      mobile: that.data.phone,
      age: that.data.old,
      work_time: that.data.jobOld,
      email: that.data.email,
      is_leader: that.data.bossName
    }
		
    // console.log(data)
//     var store = false
//     for (let i in data) {
//       // console.log(data[i])
//       if(i!="email"){
//         if (data[i] != "null" && data[i] != "undefined") {
//           store = true
//         } else {
//           store = false
//           break;
//         }
//       }
//       
//     }
		if(this.data.isSave){
			this.setData({
				isSave:false
			})
			request.postReq("/member/teamMamber/update", data, res => {
			  // console.log(res)
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
  getLader(e){
    // console.log(e.detail)
    this.setData({
      bossName:parseInt(e.detail-1)
    })
  },
  formSubmit(e){
    var request = getApp().globalData.sendRequest;
    var that = this
    var data = {
      tid:this.data.tid,
      user_name: that.data.userName,
      card_type: that.data.identType,
      card_num: that.data.identCode,
      mobile:that.data.phone,
      age:that.data.old,
      work_time: that.data.jobOld,
      email:that.data.email,
      is_leader:that.data.bossName
    }
    if(this.data.isSave){
    	this.setData({
    		isSave:false
    	})
      request.postReq("/member/teamMamber",data,res=>{
        if(res.code==200){
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function(){
                // wx.redirectTo({
                //   url: '/pages/pages2/myTeam/member/member',
                // })
								that.setData({
									isSave:true
								})
                wx.navigateBack({
                  delta:1
                })
              },1500)
            }
          })
        }else{
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
  getBing(e){
    // console.log(e.detail)
    this.setData({
      identType:e.detail
    })
  },
  getName(e){
    this.setData({
      userName:e.detail.value
    })
  },
  getIdent(e){
    this.setData({
      identCode:e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getOld(e){
    this.setData({
      old:e.detail.value
    })
  },
  getJob(e){
    this.setData({
      jobOld:e.detail.value
    })
  },
  getBoss(e){
    this.setData({
      bossName:e.detail.value
    })
  },
  getEmail(e){
    this.setData({
      email:e.detail.value
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
    // 获取证件类型列表
    var quest = getApp().globalData.sendRequest;
    var that = this
    quest.sendRequest("/common/cardType","get").then(res=>{
      // console.log(res)
      that.setData({
        userArray:res.data.data
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