// components/uploadImg/uploadImg.js
const http = getApp().globalData.local 
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
    imgUrl:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add:function(){
      var that = this
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let imgUrl = that.data.imgUrl;
          const tempFilePaths = res.tempFilePaths
          let imgs = imgUrl.concat(tempFilePaths);
          if(imgs.length>10){
            imgs = imgs.slice(0,9)
          }
          // console.log(imgs.slice(0, 10))
          that.setData({
            imgUrl:imgs
          })
          // console.log(that.data.imgUrl)
        }
      })
    },
    yuLan:function(e){
      let index = e.currentTarget.dataset.index
      wx.previewImage({
        current:this.data.imgUrl[index],
        urls:this.data.imgUrl
      })
    },
    sav:function(){
      var that = this
      var loginStore = wx.getStorageSync('userObj')
      
      // for(let i in that.data.imgUrl){
      //   wx.uploadFile({
      //     url: http +'/member/upload/images',
      //     filePath: that.data.imgUrl[i],
      //     name:'file',
      //     header: { 'Abz-Auth-Token': loginStore.token },
      //     success(res) {
      //       // const savedFilePath = res.savedFilePath
      //       console.log(JSON.parse(res.data))
      //     }
      //   })
      // }
      
    }
  }
})
