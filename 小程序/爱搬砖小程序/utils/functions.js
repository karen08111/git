// 图片预览
var httpUrl = 'https://developer.api.qqdoubao.net';
// var httpUrl ='https://official.api.aibanzhuan.cn'
var imgs = function (imgUrl,imgList){
  wx.previewImage({
    current: imgUrl,
    urls: imgList
  })
}
// 提示
var showT = function (icon,title,url){
  wx.showToast({
    icon:icon,
    title: title,
    success:res=>{
      if (url) {
        setTimeout(function(){
            wx.navigateTo({
              url: url,
            })
        },1500)
      }
    }
  })
}

// 手机格式验证
var isPhone = function(phone){
  let valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;// 手机号码校验规则
  if (!valid_rule.test(phone)) {
    return false;
  }else{
    return true;
  }
}
// 邮箱格式验证
var isEmail = function(email){
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
  if(reg.test(email)){
    return true;
  }else{
    return false;
  }
}

// 获取城市
var getCity = function(){
  
  var pro = new Promise(function(){
    wx.request({
      url: httpUrl +'/common/getarea',
      success:res=>{
        return res.data.data
      }
    })
  })
  return pro
}
module.exports = {
  imgs:imgs,
  showT:showT,
  isPhone:isPhone,
  isEmail:isEmail
}