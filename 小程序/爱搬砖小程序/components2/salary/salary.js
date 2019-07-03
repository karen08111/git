// components2/salary/salary.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    values:{
      type:String
    },
    ids:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    array:[],
    index:0,
    value:''
  },
  ready(){
    var quest = getApp().globalData.sendRequest;
    var that=this
    quest.sendRequest("/common/quantityUnit").then(res=>{
      that.setData({
        array:res.data.data
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e) {
      let id = parseInt(e.detail.value) + 1
      let index = parseInt(e.detail.value)
      this.setData({
        index:index,
        ids:index+1
      })
      this.triggerEvent("getId",id)
    },
    getValue(e){
      this.setData({
        value:e.detail
      })
      this.triggerEvent("getValue", e.detail)
    }
  }
})
