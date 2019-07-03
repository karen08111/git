// pages/pages2/myTeam/faProject/faProject.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    locationString:'请选择工作地区',
    guimo:null,//建设规模
    jibie:null,//立顶级别
    projectStore:null,//项目状态
    yongtu:[],//工程用途
    xiangmuList: [],//项目分类列表

    title:null,//标题
    project_type:null,//项目分类
    region:null,//工作地区
    prj_name:null,//工程名称
    address:null,//项目地址
    mapIndex:null,//坐标
    prj_status:null,//项目状态
    builder_licenseNum:null,//施工许可证编号
    contractor_corp_name:null,//总承包单位
    contractor_corp_code: null,//总承包单位统一社会信用代码
    building_area:null,//面积
    function_num:null,//工程用途
    prj_size:null,//建设规模
    approval_level_num:null,//立顶级别
    approval_num:null,//立顶文号
    invest:null,//总投资
    content:null,//项目介绍
    building_length:null,//总长度
		isSave:true,//保存状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    var request = getApp().globalData.sendRequest
    var that = this
    // console.log(options)
    if(options.id){
      that.setData({
        id: options.id
      })
      request.getReq("/member/project/" + options.id+"/edit",res=>{
        // console.log(res.data.detail)
        var user = res.data.detail
        //修改渲染
        that.setData({
          title: user.title,
          project_type: user.project_type.id,
          prj_name:user.prj_name,
          address: user.address,
          mapIndex: user.lng + ',' + user.lat,
          prj_status:user.prj_status.id,
          builder_licenseNum: user.builder_licenseNum,
          function_num: user.function_num.id,
          prj_size: user.prj_size.id,
          approval_level_num: user.approval_level_num.id,
          approval_num: user.approval_num,
          invest: user.invest,
          region:user.region[1].id,
          content:user.content,
          building_area: user.building_area,
          building_length: user.building_length,
          contractor_corp_name: user.contractor_corp_name,
          contractor_corp_code: user.contractor_corp_code,
          locationString:user.region[0].title+'-'+user.region[1].title
        })
      })
    }
  },
  // 修改
  addSet(){
		this.setData({
			isSave:false
		})
    var request = getApp().globalData.sendRequest
    var that = this
    var data = {
      id:that.data.id,
      title: that.data.title,
      project_type: that.data.project_type,
      region: that.data.region,
      prj_name: that.data.prj_name,
      address: that.data.address,
      mapIndex: that.data.mapIndex,
      prj_status: that.data.prj_status,
      builder_licenseNum: that.data.builder_licenseNum,
      contractor_corp_name: that.data.contractor_corp_name,
      contractor_corp_code: that.data.contractor_corp_code,
      building_area: that.data.building_area,
      function_num: that.data.function_num,
      prj_size: that.data.prj_size,
      approval_level_num: that.data.approval_level_num,
      approval_num: that.data.approval_num,
      invest: that.data.invest,
      content: that.data.content,
      building_length: that.data.building_length
    }
    // console.log(data);
		
      request.postReq("/member/project/update", data, res => {
        if (res.code == 200) {
          wx.hideLoading();
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
								that.setData({
									isSave:true
								})
//                 wx.redirectTo({
//                   url: '/pages/pages2/myTeam/recruitment2/recruitment2',
//                 })
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
            title: res.code
          })
        }
      })
  },
  // 保存
  addSave(){
    var request = getApp().globalData.sendRequest
    var that = this
		that.setData({
			isSave:false
		})
    var data = {
      title:that.data.title,
      project_type: that.data.project_type,
      region: that.data.region,
      prj_name: that.data.prj_name,
      address: that.data.address,
      mapIndex: that.data.mapIndex,
      prj_status: that.data.prj_status,
      builder_licenseNum: that.data.builder_licenseNum,
      contractor_corp_name: that.data.contractor_corp_name,
      contractor_corp_code: that.data.contractor_corp_code,
      building_area: that.data.building_area,
      function_num: that.data.function_num,
      prj_size: that.data.prj_size,
      approval_level_num: that.data.approval_level_num,
      approval_num: that.data.approval_num,
      invest: that.data.invest,
      content: that.data.content,
      building_length: that.data.building_length
    }
		// console.log(data)
      request.postReq("/member/project",data,res=>{
				// console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
								that.setData({
									isSave:true
								})
//                 wx.redirectTo({
//                   url: '/pages/pages2/myTeam/recruitment2/recruitment2',
//                 })
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
            title: res.msg
          })
        }
      })

  },
  onChangeAddress() {
    var that = this
		wx.chooseLocation({
        success: function (res) {   
					 that.setData({
						 address: res.address,
						 mapIndex: res.latitude + ',' + res.longitude
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
																													 address: res.address,
																													 mapIndex: res.latitude + ',' + res.longitude
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
  getInvest(e){
    this.setData({
      invest:e.detail.value
    })
  },
  getContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  getbuilding_length(e){
    this.setData({
      building_length:e.detail.value
    })
  },
  getapproval_level_num(e){
    this.setData({
      approval_level_num:e.detail
    })
  },
  getApproval_num(e){
    this.setData({
      approval_num:e.detail.value
    })
  },
  getPrj_size(e){
    this.setData({
      prj_size:e.detail
    })
  },
  getbuilding_area(e){
    this.setData({
      building_area:e.detail.value
    })
  },
  getFunction_num(e){
    this.setData({
      function_num:e.detail
    })
  },
  getName(e){
    this.setData({
      title:e.detail.value
    })
  },
  getContractor_corp_name(e){
    this.setData({
      contractor_corp_name:e.detail.value
    })
  },
  getBuilder_licenseNum(e){
    this.setData({
      builder_licenseNum:e.detail.value
    })
  },
  getContractor_corp_code(e){
    this.setData({
      contractor_corp_code:e.detail.value
    })
  },
  getPrj_status(e){
    this.setData({
      prj_status:e.detail
    })
  },
  getCityId(e){
    this.setData({
      region:e.detail
    })
  },
  getPrj_name(e){
    this.setData({
      prj_name:e.detail.value
    })
  },
  getBing(e){
    this.setData({
      project_type:e.detail
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
		
    // 获取项目分类
    var request = getApp().globalData.sendRequest
    var that = this
    request.getReq("/common/project",res=>{
      // console.log(res)
      if(res.code==200){
        that.setData({
          xiangmuList:res.data
        })
      }
    })
    // 获取工程用途
    request.getReq("/common/projUse", res => {
      // console.log(res)
      if (res.code == 200) {
        that.setData({
          yongtu: res.data
        })
      }
    })
    // 获取项目状态
    request.getReq("/common/projStatus", res => {
      // console.log(res)
      if (res.code == 200) {
        that.setData({
          projectStore: res.data
        })
      }
    })
    // 立顶级别
    request.getReq("/common/createProjl", res => {
      // console.log(res)
      if (res.code == 200) {
        that.setData({
          jibie: res.data
        })
      }
    })
    // 建设规模
    request.getReq("/common/scaleOfConstruction", res => {
      // console.log(res)
      if (res.code == 200) {
        that.setData({
          guimo: res.data
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