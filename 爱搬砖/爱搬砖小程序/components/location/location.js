// components/location/location.js
const app = getApp().globalData.sendRequest
// var citys = []
// app.city('/common/getarea').then(res => {
//   citys[0] = res.data.data
//   app.city('/common/getarea/' + citys[0][0].id).then(res => {
//     citys[1] = res.data.data
//   })
// })

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pla:{
      type:String
    },
		enter:{
			type:Boolean
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiIndex: [0, 0],
    objectMultiArray: null,
    value:'',
  },
  ready(){
    const app = getApp().globalData.sendRequest
    var that=this
    var citys = []
    app.city('/common/getarea').then(res=>{
      citys[0] = res.data.data
      that.setData({
        objectMultiArray: citys
      })
      app.city('/common/getarea/' + citys[0][0].id).then(res => {
        citys[1] = res.data.data
        that.setData({
          objectMultiArray: citys
        })
      })
    })
    

  },
  created (){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindMultiPickerChange: function (e) {
      // console.log(e.currentTarget.dataset.id)
      let id = e.currentTarget.dataset.id
      this.setData({
        multiIndex: e.detail.value
      })
      let str = this.data.objectMultiArray[0][this.data.multiIndex[0]].title + ',' + this.data.objectMultiArray[1][this.data.multiIndex[1]].title 
      this.setData({
        value:str,
      })
      // 发送
      this.triggerEvent('getCityId',id)
    },
    bindMultiPickerColumnChange: function (e) {
      var that = this;
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        multiArray: this.data.objectMultiArray,
        multiIndex: this.data.multiIndex
      };
      // that.data.multiIndex[e.detail.column] = e.detail.value;
      let index = that.data.multiIndex;
      index[e.detail.column] = e.detail.value;
      that.setData({
        multiIndex:index
      })
      switch (e.detail.column) {
        case 0:
          app.city('/common/getarea/' + that.data.objectMultiArray[0][e.detail.value].id).then(res=>{
            // console.log(res.data.data);
            let arr = that.data.objectMultiArray
            arr[1] = res.data.data
            that.setData({
              multiIndex:[e.detail.value,0],
              objectMultiArray: arr
            })
            // app.city('/common/getarea/' + arr[1][0].id).then(res=>{
            //   arr[2] = res.data.data
            //   that.setData({
            //     objectMultiArray:arr
            //   })
            // })
          })
          break;
        // case 1:
        //   app.city('/common/getarea/' + that.data.objectMultiArray[1][e.detail.value].id).then(res=>{
        //     let arr = that.data.objectMultiArray
        //     let i = that.data.multiIndex;
        //     i[2] = 0;
        //     arr[2] = res.data.data
        //     that.setData({
        //       objectMultiArray: arr,
        //       multiIndex:i
        //     })
        //   })
      }
    },
  }
})
