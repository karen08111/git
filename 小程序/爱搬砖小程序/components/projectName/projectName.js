// components/projectName/projectName.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    multiArray:{
      type:Array
    },
    bei:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    projectName:null,
    textarea:null,
    project:null,
    imgList:[],
    multiIndex: [0, 1],
    multiArray: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 多项级联
    bindMultiPickerChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({
        multiIndex: e.detail.value
      })
    },
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      // console.log(that.data.multiArray)
      var that = this
      var data = {
        multiArray: that.data.multiArray,
        multiIndex: that.data.multiIndex
      };
      // console.log(that.data.multiArray)
      data.multiIndex[e.detail.column] = e.detail.value;
      // console.log(that.data.two,'22')
      console.log(data.multiIndex[0])
      switch (e.detail.column) {
        case 0:
          switch (data.multiIndex[0]) {
            case 0:
              data.multiArray[1] = that.data.bei[0];
              let a1 = that.data.multiArray
              a1[1] = that.data.bei[0]
              that.setData({
                multiArray:a1
              })
              break;
            case 1:
              data.multiArray[1] = that.data.bei[1];
              let a2 = that.data.multiArray
              a2[1] = that.data.bei[1]
              that.setData({
                multiArray: a2
              })
              break;
          }
          data.multiIndex[1] = 0;
          // data.multiIndex[2] = 0;
          break;
        case 1:
          data.multiIndex[2] = 0;
          // console.log(data.multiIndex);
          break;
      }
      this.setData(data);

    },
    upImg:function(){
      var that=this
      var imgList = this.data.imgList
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        success: function (res) {
          let tempFilePaths = res.tempFilePaths
          let newList = imgList.concat(tempFilePaths)
          if(newList.length<=9){
            that.setData({
              imgList: newList
            })
          }else{
            wx.showToast({
              icon:'none',
              title: '上传不能超过9张',
            })
          }
          
        }
      })
    
    },
    lanImg:function(e){
      let index = e.currentTarget.dataset.url
      let url = this.data.imgList[index];
      let fun = getApp().globalData.fun
      fun.imgs(this.data.imgList[index], this.data.imgList)
    },
    names:function(e){
      this.setData({
        projectName:e.detail
      })
    },
    textarea:function(e){
      // console.log(e)
      this.setData({
        textarea:e.detail.value
      })
    },
    sav:function(){
      var that = this
      let obj={}
      obj.names = that.data.projectName
      obj.textarea = that.data.textarea
      if(obj.names && obj.textarea){
        that.setData({
          project:obj
        })
        this.triggerEvent('project',that.data.project)
      }else{
        wx.showToast({
          icon:'none',
          title: '请填写完整',
        })
      }
    },
    reset:function(){
      this.triggerEvent('project',null)
    }
  }
})
