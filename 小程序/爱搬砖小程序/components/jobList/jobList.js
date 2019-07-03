// components/jobList/jobList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    multiArray:{
      type:Array
    },
    // dataList:{
    //   type:Array
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiIndex:[0,0],
    newArr:[]
    // multiArray: [[1, 2], [1,2,3,4,5]]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 多项级联
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({
        multiIndex: e.detail.value
      })
    },
    bindMultiPickerColumnChange: function (e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      const http = getApp().globalData.local
      this.setData({
        http: http
      })
      var request = getApp().globalData.sendRequest;
      var that = this
      request.sendRequest('/common/getworks','get').then(res=>{
        let newArr=[]
        for(let i=0;i<res.data.data.length;i++){
          let zhi=[]
          for(let j=0;j<res.data.data[i].children.length;j++){
            zhi.push(res.data.data[i].children[j].work_name)
          }
          newArr.push(zhi)
        }
        that.setData({
          newArr:newArr
        })
      })
      // console(e.detail.column)
      if (e.detail.column==0){//
        if (data.multiIndex[0]==0){
          data.multiArray[1] = that.data.newArr[0];
        } else if (data.multiIndex[0]==1){
          data.multiArray[1] = that.data.newArr[0];
        }
        data.multiIndex[1] = 0;
      } else if (e.detail.column==1){
        data.multiIndex[2] = 0;
      }
      this.setData(data);
    },
  }
})
