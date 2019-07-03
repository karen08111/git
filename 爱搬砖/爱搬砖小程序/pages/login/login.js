// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user:null,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindGetUserInfo:function(e){
    const http = getApp().globalData.local;
    if (e.detail.userInfo){
      // 用户点击了允许按钮
      // 存入微信授权信息
			// console.log(e.detail)
      wx.setStorageSync('wxUser', e.detail)
      console.log(e.detail)
      var that = this
      that.queryUsreInfo();
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    const http = getApp().globalData.local;
    var that = this
    wx.login({
      success(res) {
        console.log(res)
        if (res.code) {
          wx.request({
            method: 'post',
            url: http + '/wechat/member/get_session',
            data: { code: res.code },
            success: data => {
              console.log(data)
              if (data.data.code == 200) {
                // 保存session_key

                wx.setStorageSync('keys', data.data.data.session_key)
                // 然后拿session去登录
                
                wx.request({
                  method: 'post',
                  url: http + '/wechat/member/login',
                  data: { sessk: data.data.data.session_key, endata: wx.getStorageSync('wxUser').encryptedData, iv: wx.getStorageSync('wxUser').iv },
                  header: { 'content-type': 'application/json'},
                  success: suc => {
                    // console.log(suc.data)
                    if (suc.data.code == 200) {
                      // 有手机号登录成功
                      // 储存登录后的信息
                      // console.log(suc.data.data)
                      wx.setStorageSync('userObj', suc.data.data)
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    } else if(suc.data.code == 1404) {
                      // 不存在
                      // 没手机号 跳转到绑定手机号
                      wx.redirectTo({
                        url: '/pages/binPhone/bindPhone',
                      })
                      // wx.switchTab({
                      //   url: '/pages/index/index'
                      // })
                    }else {
                      // that.queryUsreInfo();
                      // wx.switchTab({
                      //   url: '/pages/index/index'
                      // })
                      // that.setData({
                      //   show:true
                      // })
                      
                    }
                  }
                })
              }
            }
          })
        }
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
    var that = this;
    wx.showLoading({
      title: '',
      success: () => {
        setTimeout(function () {
          wx.hideLoading()
          // 查看是否授权
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function (res) {
                    // console.log(res);
                    //从数据库获取用户信息
                    // 存入微信授权信息
                    wx.setStorageSync('wxUser', res)
                    that.queryUsreInfo();
                  }
                });
              } else {
                that.setData({
                  show: true
                })
              }
            }
          })
        }, 1500)
      }
    })
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        // console.log('未过期')
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        // console.log('已过期')
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