// pages/pages2/userSelect/gerenForm/gerenForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zheng:null,
    fan:null,
    cardList:null,
    cardId:null,//身份证类型
    upZheng:null,
    upFan:null,
    typeId:null,
    enter:{},//企业
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    this.setData({
      typeId:options.type
    })
  },
  addZheng(){
    var that = this
    var request = getApp().globalData.sendRequest
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
          zheng: tempFilePaths[0]
        })
        // 上传
        wx.uploadFile({
          url: http +'/wechat/member/auth/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { 'Abz-Auth-Token': loginStore.token },
          success(re){
            var acc = JSON.parse(re.data)
            // console.log(acc)
            if(acc.code==200){
              that.setData({
                upZheng:acc.data.path
              })
            }
          }
        })
      }
    })
  },
  addFan() {
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
          fan: tempFilePaths[0]
        })
        // 上传
        wx.uploadFile({
          url: http + '/wechat/member/auth/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { 'Abz-Auth-Token': loginStore.token },
          success(re) {
            var acc = JSON.parse(re.data)
            if (acc.code == 200) {
              that.setData({
                upFan: acc.data.path
              })
            }
          }
        })
      }
    })
  }, 
  formSubmit(e){
    var http = getApp().globalData.local
    var loginStore = wx.getStorageSync('userObj')
    var user = e.detail.value
    var that = this
    var request = getApp().globalData.sendRequest
    var data = {
      full_name: user.userName,
      card_type: that.data.cardId,
      id_card: user.idcard,
      img_head:that.data.upZheng,
      img_tail:that.data.upFan
    }
    
    if(this.data.typeId ==1){
			// request.postHeader['Abz-Auth-Token']=wx.getStorageSync('userObj').token
			// console.log(request)
      request.postReq("/wechat/member/auth/person", data, res => {
        // console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index',
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
    }else if(this.data.typeId == 2){
      var store = false
      var enter  = data
      // console.log(enter)
      for (let i in enter) {
        if (enter[i]) {
          store = true
        } else {
          store = false
          break;
        }
      }
      if (store) {
        wx.navigateTo({
          url: '/pages/pages2/account/ident/ident?user=' + JSON.stringify(enter),
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '请填写完整',
        })
      }
    }
    
    // wx.request({
    //   url: http +'/wechat/member/auth/person',
    //   data:{
    //     full_name: user.userName,
    //     card_type: that.data.cardId,
    //     id_card: user.idcard,
    //     img_head:that.data.upZheng,
    //     img_tail:that.data.upFan
    //   },
    //   header: { 'Abz-Auth-Token': loginStore.token },
    //   success(res){
    //     console.log(res)
    //   }
    // })
  },
  getBing(e){
    // console.log(e)
    this.setData({
      cardId:e.detail
    })
  },
  next() {
    var store = false
    var enter={

    }
    for(let i in enter){
      if(this.data.enter[i]){        
        store = true
      }else {
        store=false
        break;
      }
    }
    if(store){
      console.log(enter)
    }else {
      wx.showToast({
        icon:'none',
        title: '请填写完整',
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
    var that = this
    var request = getApp().globalData.sendRequest
    request.getReq("/common/cardType",res=>{
      // console.log(res)
      if(res.code==200){
        that.setData({
          cardList:res.data
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