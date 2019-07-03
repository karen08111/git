// components/projectTwo/projectTwo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    project:{
      type:Object
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
    jump:function(e){
      let id=e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/faireDetail/faireDetail?id='+id+'&sto='+3,
      })
    }
  }
})
