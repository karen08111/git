// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabNames:{
      type:Array
    },
    current:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // current:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnClick: function (e) {
      let current = e.currentTarget.dataset.current
      this.setData({
        current: current
      })
      this.triggerEvent("current",current);
    },
  }
})
