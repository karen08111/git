// components2/date/date.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String
    },
    pla:{
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
    bindPickerChange(e) {
      this.setData({
        value:e.detail.value
      })
      // console.log(e.detail.value)
      this.triggerEvent("getDates",e.detail.value)
    }
  }
})
