// pages/yanzheng/yanzheng.js

var coord = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    area_width: 95,   //可滑动区域的宽，单位是百分比，设置好后自动居中
    box_width: 120,   //滑块的宽,单位是 rpx
    maxNum: 0,
    img:'http://www.17qq.com/img_qqtouxiang/76490995.jpeg',
    imgs:''
  },
  drag(e) {
    // console.log(e)
    var that = this;
    coord = e.detail.x;
  },
  dragOver(e) {
    console.log(e)
    var that = this;
    if (coord >= that.data.maxNum) {
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 2000
      })
      //验证成功之后的代码
    } else {
      that.setData({
        x: 0,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        var n = Math.floor(res.windowWidth * that.data.area_width / 100 - that.data.box_width / 2)
        that.setData({
          maxNum: n,
        })
      }
    })



    wx.canvasGetImageData({
      canvasId: 'myCanvas',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success(res) {
        console.log(res.width) // 100
        console.log(res.height) // 100
        console.log(res.data instanceof Uint8ClampedArray) // true
        console.log(res.data.length) // 100 * 100 * 4
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
     wx.createCanvasContext({
       imageResource:that.data.imgs
     });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    wx.downloadFile({
      url: that.data.img,
      success: function (res) {
        console.log(res);
        that.data.imgs = res.tempFilePath
      }, fail: function (fres) {

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