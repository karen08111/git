// components/ident/ident.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    name:null,
    imgUrl:null,
    imgUrlList:[],
    imgs:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    basOrd:function(e){
      // console.log(e.detail)
      this.setData({
        name:e.detail
      })
    },
    addIdent:function(){
      const http = getApp().globalData.local
      this.setData({
        http: http,
      })
      var loginStore = wx.getStorageSync('userObj')
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          // console.log(tempFilePaths[0])
          that.setData({
            imgUrl: tempFilePaths[0],
            imgUrlList: tempFilePaths
          })
          // 上传
          wx.uploadFile({
            url: http +'/member/upload/seniority',
            filePath: tempFilePaths[0],
            name: 'file',
            header: { 'Abz-Auth-Token': loginStore.token },
            success:res=>{
              // console.log(JSON.parse(res.data).data)
              that.setData({
                imgs: JSON.parse(res.data).data.path
              })
              // console.log(that.data.imgs)
            }
          })
        }
      })
    },
    itemLan:function(e){
      let url = e.currentTarget.dataset.url;
      let img = getApp().globalData.fun;
      img.imgs(url, this.data.imgUrlList)
    },
    itemDel:function(){
      this.setData({
        imgUrl:null
      })
    },
    // 提交
    submit:function(){
      // var typeId = options.id
      const http = getApp().globalData.local
      this.setData({
        http: http,
      })
      var loginStore = wx.getStorageSync('userObj')
      var that = this
      var name = that.data.name
      var imgUrl = that.data.imgUrl
      if(name && this.data.imgs){
        // 传送到父组件
        // let objs = {}
        // objs.name = name
        // objs.imgUrl = this.data.imgs
        // that.triggerEvent("ident",objs)
        wx.request({
          method: 'post',
          url: http + '/member/seniority',
          data: { seniority_name: name, img_path: this.data.imgs, _method:'put'},
          header: { 'Abz-Auth-Token': loginStore.token, 'content-type': 'application/x-www-form-urlencoded' },
          success:res=>{
            // console.log(res.data)
            if (res.data.code == 200) {
              wx.showToast({
                title: '成功',
                success: () => {
                  setTimeout(function () {
                    // wx.reLaunch({
                    //   url: '/pages/index/index',
                    // })
                    
                    that.triggerEvent("imgId", res.data.data)
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: '失败',
              })
            }
          }
        })

      }else{
        wx.showToast({
          icon:'none',
          title: '请填写完整',
        })
      } 
    },
    reset:function(){
      this.triggerEvent("ident", '')
      
    }
  }
})
