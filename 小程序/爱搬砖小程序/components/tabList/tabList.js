// components/tabList/tabList.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumps:function(){
      // wx.navigateTo({
      //   url: '/pages/proclamer/proclamer?types='+0,
      // })
      wx.navigateTo({
        url: '/pages/recher/recher?current='+0,
      })
    },
    jumpsTwo:function(){
      // wx.navigateTo({
      //   url: '/pages/proclamer/proclamer?types=' + 1,
      // })
      wx.navigateTo({
        url: '/pages/recher/recher?current=' + 1,
      })
    },
    jumpsThree:function(){
      wx.navigateTo({
        url: '/pages/recher/recher?current='+2,
      })
    }
  }
})
