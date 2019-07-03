// pages/pages2/account/ident/ident.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkList:[
      {
        id:1,
        title:'企业员工',
        store:true
      },
      {
        id: 2,
        title: '企业法人',
        store: false
      }
    ],
    yingye:'',
    store:1,
    genders:null,
    business:null,//营业执照
    bookImg:'',//企业授权书
    upBookImg: null,//企业授权书
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    // console.log(options)
    if(options.user){//第一次认证
      // console.log(JSON.parse(options.user))
      this.setData({
        genders: JSON.parse(options.user)
      })
    }else {//升级

    }
  },
  formSubmit(e) {
    var that = this
    var http = getApp().globalData.local
    var loginStore = wx.getStorageSync('userObj')
    var request = getApp().globalData.sendRequest
    if (this.data.genders){//第一次认证
      var enterName = e.detail.value.enterName
      var enterNum = e.detail.value.enterNum
      var enterJob = e.detail.value.enterJob
      var data = this.data.genders
      data['company_name'] = enterName
      data['credit_code'] = enterNum
      data['img_path'] = this.data.business
      this.data.store == 1 ? data['job_name'] = enterJob : data['job_name']=''
      this.data.store == 1 ? data['auth_certify'] = this.data.upBookImg : data['auth_certify']=''
      request.postReq("/wechat/member/auth/company",data,res=>{
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/pages2/personal/personal',
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg,
          })
        }
      })
    }else {//升级
      var enterName = e.detail.value.enterName
      var enterNum = e.detail.value.enterNum
      var enterJob = e.detail.value.enterJob
      if(this.data.store ==1) {//非公司法人
        var data = {
          company_name: enterName,
          credit_code: enterNum,
          img_path: this.data.business,
          job_name: enterJob,
          auth_certify: this.data.upBookImg
        }
      }else {//法人
        var data={
          company_name: enterName,
          credit_code: enterNum,
          img_path: this.data.business,
          job_name: '',
          auth_certify: ''
        }
      }
      request.postReq("/wechat/member/auth/up_company",data,res=>{
        // console.log(res)
        if(res.code == 200) {
          wx.showToast({
            title: res.msg,
            success(){
              setTimeout(function() {
                wx.reLaunch({
                  url: '/pages/pages2/personal/personal',
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
    }
    
  },
  qiehuan(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.checkList
    for(let i in arr){
      if(i==index){
        arr[i].store = true
        this.setData({
          store:arr[i].id
        })
      }else{
        arr[i].store = false
      }
    }
    this.setData({
      checkList:arr
    })
  },
  add(){
    var that = this
    var http = getApp().globalData.local
    var loginStore = wx.getStorageSync('userObj')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          yingye: tempFilePaths[0]
        })
        // 上传
        wx.uploadFile({
          url: http + '/wechat/member/auth/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { 'Abz-Auth-Token': loginStore.token },
          success(re) {
            var acc = JSON.parse(re.data)
            // console.log(acc)
            if (acc.code == 200) {
              that.setData({
                business: acc.data.path
              })
            }
          }
        })
      }
    })
  },
  addBookImg() {
    var that = this
    var http = getApp().globalData.local
    var loginStore = wx.getStorageSync('userObj')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          bookImg: tempFilePaths[0]
        })
        // console.log(that.data.bookImg)
        // 上传
        wx.uploadFile({
          url: http + '/wechat/member/auth/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { 'Abz-Auth-Token': loginStore.token },
          success(re) {
            var acc = JSON.parse(re.data)
            // console.log(acc)
            if (acc.code == 200) {
              that.setData({
                upBookImg: acc.data.path
              })
            }
          }
        })
      }
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