// components/userType/userType.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userTop:{
      type:Object
    },
    typeId:{
      type:String
    },
    http:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 预览大图
    yulan:function(e){
      let imgs = getApp().globalData.fun;
      let url = e.currentTarget.dataset.url;
      let arr = [];
      arr.push(url);
      imgs.imgs(arr[0],arr);
      
    },
    guanzhu:function(){
      console.log(this.data.userTop.info.uid)
      let uid = this.data.userTop.info.uid
      const http = getApp().globalData.local
      this.setData({
        http: http
      })
      // 获取登录状态
      let loginStore = wx.getStorageSync('userObj')
      var that = this
      wx.request({
        method:'get',
        url: http + '/member/inFollow/'+uid,
        header: { 'Abz-Auth-Token': loginStore.token },
        success:res=>{
          // console.log(res.data)
          if(res.data.code==200){
            wx.showToast({
              title: '关注成功',
            })
          }else{
            wx.showToast({
              icon:'none',
              title: res.data.msg,
            })
          }
        }
      })
    },
    longTap:function(e){
      // console.log(e)
      wx.scanCode({
        scanType: ['qrCode','barCode'],
        success(res) {
          console.log(res)
        }
      })
    }
  }
})
