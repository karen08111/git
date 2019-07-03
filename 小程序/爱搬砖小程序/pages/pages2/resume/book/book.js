// pages/pages2/resume/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:null,
    http:null,
    isShow:true,
    checkList:[],
    ident:null,//身份类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    var that = this
    that.setData({
      http: getApp().globalData.local,
    })
    if(options.ident){
      this.setData({
        ident: options.ident
      })
    }
    var request = getApp().globalData.sendRequest
    if(this.data.ident == 3){
      request.getReq("/member/companypage", res => {
        // console.log(res.data.company.seniority)
        if (res.code == 200) {
          that.setData({
            bookList: res.data.company.seniority
          })
        }
      })
    }else {
      request.getReq('/member/resume/moveEdit', res => {
        // console.log(res)
        if (res.code == 200) {
          that.setData({
            bookList: res.data.seniority
          })
        }
      })
    }
    
  },
  select(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    var bookList = this.data.bookList
    bookList[index].isuse = !bookList[index].isuse
    this.setData({
      isShow:true,
      bookList: bookList,
    })
  },
  // xianshi 
  show(){
    var that = this
    var request = getApp().globalData.sendRequest
    var bookList = this.data.bookList
    var str=[]
    for (let i in bookList){
      if (bookList[i].isuse){
        str.push(bookList[i].id)
      }
    }
    var data={
      senioritys:str.join(",")
    }
    // console.log(data)
    if(this.data.ident == 3) {//企业设置
      request.postReq("/member/companypage/seniority",data,res=>{
        // console.log(res)
        if (res.code == 200) {
         
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/pages2/enterprise/enterpriseIndex/enterpriseIndex',
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
    }else {
      request.postReq("/member/resume/seniority", data, res => {
        // console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            success() {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/pages2/resume/resumeIndex/resumeIndex',
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
    }
   
  },
  dels() {
    var that = this
    var request = getApp().globalData.sendRequest
    var bookList = this.data.bookList
    var str = []
    for (let i in bookList) {
      if (bookList[i].isuse) {
        str.push(bookList[i].id)
      }
    }
    if(str.length>0){
      wx.showModal({
        title: '是否删除所选证书?',
        confirmText:'是',
        cancelText:'否',
        success(res) {
          if (res.confirm) {
            for (let j in str) {
              request.getReq("/member/seniority/" + str[j] + "/cutOut", res => {

              })
            }
            wx.showToast({
              icon: 'none',
              title: '删除成功',
              success() {
                setTimeout(function () {
                  if (that.data.ident == 3) {
                    wx.redirectTo({
                      url: '/pages/pages2/enterprise/enterpriseIndex/enterpriseIndex',
                    })
                  } else {
                    wx.redirectTo({
                      url: '/pages/pages2/resume/resumeIndex/resumeIndex',
                    })
                  }
                  
                }, 1500)
              }
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
      
    }else {
      wx.showToast({
        icon:'none',
        title: '请选择要删除的证书',
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
    
    // 
    // request.getReq("/member/seniority",res=>{
    //   if(res.code == 200) {
    //     var arr = that.data.bookList
    //     console.log(arr)
    //     for(let i in res.data){
    //       for(let j in arr){
    //         if(res.data[i].id == arr[j].id){
    //           arr[j].status = res.data[i].status
    //         }
    //       }
    //     }
        
    //   }
    // })
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