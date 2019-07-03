// components/new-List/new-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newList:{
      type:Array
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
    detail:function(e){
      let id=e.currentTarget.dataset.id
      // console.log(id)
      wx.navigateTo({
        url: '/pages/newDetail/newDetail?id='+id,
        
      })
    }
  }
})
