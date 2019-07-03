// components2/pickJob/pickJob.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ids:{
      type:Number
    },
    pla:{
      type:String
    },
		enter: {
			type:Boolean
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    array:[],
    index:[0,0],
    allArray:[],
    isColor:true,
  },
  ready(){
    const app = getApp().globalData.sendRequest
    var that = this
    // console.log(app)
    app.sendRequest("/common/getworks", "get").then(res => {
      // console.log(res.data.data)
      var arr = []
      arr[0]=res.data.data;
      arr[1]=res.data.data[0].children
      that.setData({
        array:arr,
        allArray:res.data.data
      })
      // 
      if (this.data.ids) {
        var jobList = res.data.data;
        var wai;
        var num;
        for (let i in jobList) {
          // console.log(jobList[i].children)
          var index = jobList[i].children.findIndex((value, index) => {
            num=i
            return this.data.ids == value.id
          })
          if(index>=0){
            wai=index
            break
          }
        }
        that.setData({
          pla: res.data.data[num].work_name + '-' + res.data.data[num].children[wai].work_name,
        })

      }
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e){
      // console.log(this.data.array[0])
      this.setData({
        index:e.detail.value
      })
      var yiId = this.data.array[0][e.detail.value[0]].id
      var erId = this.data.array[1][e.detail.value[1]].id
      
      let str = this.data.array[0][e.detail.value[0]].work_name + '-' + this.data.array[1][e.detail.value[1]].work_name
      // console.log(this.data.arr[0][e.detail.value[0]].work_name) 
      this.setData({
        pla:  str,
				isColor:false
      })
      this.triggerEvent("jobId",erId)
      this.triggerEvent("jobOne",yiId)

    },
    bindMultiPickerColumnChange(e){
      if(e.detail.column==0){
        var arr = this.data.array
        var allArr = this.data.allArray
        arr[1] = allArr[e.detail.value].children
        this.setData({
          array: arr
        })
      }
      
    }
  }
})
