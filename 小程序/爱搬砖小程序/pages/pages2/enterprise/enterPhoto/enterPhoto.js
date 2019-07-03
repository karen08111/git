// pages/pages2/enterprise/enterPhoto/enterPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http:null,
    imgs:null,
    idList:[],
    store:false,
    isAll:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requests()
		wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  ruSet() {
    this.setData({
      store:true
    })
  },
  pick(e) {
    var index = e.currentTarget.dataset.index
    // console.log(index)
    var img = this.data.imgs
    img[index].store = !img[index].store
    this.setData({
      imgs:img, 
    })
  },
  allPick() {
    var arr = this.data.imgs
    for(let i in arr){
      arr[i].store = true
    }
    this.setData({
      imgs:arr,
      isAll:true
    })
  },
  // 删除
  dels() {
    var arr = this.data.imgs
    // console.log(arr)
    var ids=[]
    for(let i in arr) {
      if(!arr[i].store){
        
        ids.push(arr[i].id)
      }
    }
    // console.log(ids)

      var that = this
      wx.showModal({
        title: '是否删除选中图片?',
        cancelText:'否',
        confirmText:'是',
        success(r) {
          if (r.confirm) {
            var data = {
              imgs: ids.join(',')
            }
           
            var request = getApp().globalData.sendRequest
            request.postReq("/member/companypage/images", data, res => {
              if (res.code == 200) {
                that.requests()
              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.msg,
                })
              }
            })
          } else if (r.cancel) {
            // console.log('用户点击取消')
          }
        }
      })

    
  },
  noPick() {
    var arr = this.data.imgs
    for (let i in arr) {
      arr[i].store = false
    }
    this.setData({
      imgs: arr,
      isAll:false
    })
  },
  requests() {
    var that = this
    that.setData({
      http: getApp().globalData.local,
      store: false,
      isAll: false
    })

    var request = getApp().globalData.sendRequest
    request.getReq("/member/companypage", res => {
      // console.log(res.data.company.detail.imgs)
      if (res.code == 200) {
        var finds = res.data.company.detail.imgs
        for (let j in finds){
          finds[j].store = false
        }
        that.setData({
          imgs:finds
        })
        // console.log(finds)
        var arr = []
        for (let i in that.data.imgs) {
          arr.push(that.data.imgs[i].id)
          
        }
        that.setData({
          idList: arr
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  add(){
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
        wx.uploadFile({
          url: http +'/member/upload/photos',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { 'Abz-Auth-Token': loginStore.token },
          success(r){
            var shows = JSON.parse(r.data)
           
            if (shows.code ==200) {
              // 上传
              var arr = that.data.idList
              arr.push(shows.data.id)
              var data = {
                imgs: arr.join(',')
              }
              // console.log(data)
              request.postReq("/member/companypage/images",data,response=>{
                // console.log(response)
                if (response.code == 200) {
                  // wx.showToast({
                  //   title: response.msg,
                  // })
                  // console.log(1)
                  that.requests()
                }else {
                  wx.showToast({
                    icon:'none',
                    title: response.msg,
                  })
                }
              })
            }
          }
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