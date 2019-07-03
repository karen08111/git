var httpUrl = 'https://developer.api.qqdoubao.net';
// var httpUrl ='https://official.api.aibanzhuan.cn'

var loginUrl = 'https://third.api.qqdoubao.net';
// var loginUrl = 'https://third.api.aibanzhuan.cn';
var sendRequest = function (url,method,header){
  var promise = new Promise(function (resolve,reject){
    wx.request({
      url: httpUrl + url,
      method:method,
      header:header,
      success:resolve,
      fail:reject
    })
  })
  return promise;
}
var city = function(url){
  var promise = new Promise(function(resolve,reject){
    wx.request({
      url: httpUrl+url,
      success:resolve,
      fail:reject
    })
  })
  return promise;
}
// 职位分类
var zhe = function(url){
  return sendRequest(url, 'get').then(res => {
    return res.data.data
  })
}
var loginStore = wx.getStorageSync('userObj')
// console.log(loginStore.token)
if (loginStore) {
  var header = {
    'Abz-Auth-Token': loginStore.token,
    'Accept': 'application/json',
    'content-type': 'application/json',
    // 'Authorization': null,
  }
}else {
  var header = {
    'Accept': 'application/json',
    'content-type': 'application/json',
    // 'Authorization': null,
  }
}

var postHeader = {
  'content-type': 'application/x-www-form-urlencoded',
  'content-type': 'application/json',
}

function getReq(url, cb) {
  // wx.showLoading({
  //   title: '加载中',
  // })
  wx.request({
    url: httpUrl + url,
    method: 'get',
    header: header,
    success: function (res) {
      // wx.hideLoading();
      if(res.header['Abz-Request-Id']){
				wx.setStorageSync('abzIds',res.header['Abz-Request-Id'])
			}
      if(res.data.code != '1403'){
        return typeof cb == "function" && cb(res.data)
      } else if (res.data.code == '1403') {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          cancelText:'继续逛逛',
          confirmText:'去登录',
          success(r){
            if (r.confirm) {
              wx.switchTab({
                url: '/pages/pages2/personal/personal',
              })
            } else if (r.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      }
      
      
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {
  // console.log(loginStore)
  wx.showLoading({
    title: '加载中',
  })
    wx.request({
      url: httpUrl + url,
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}
function putReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: httpUrl + url,
    header: header,
    data: data,
    method: 'post',
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })

}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
  sendRequest: sendRequest,
  zhe:zhe,
  city:city,
  putReq: putReq
}
