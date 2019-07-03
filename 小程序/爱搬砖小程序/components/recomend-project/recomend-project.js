// components/recomend-project/recomend-project.js
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
    },
    sto:{//1个人2团队3企业
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    local: 'https://developer.api.qqdoubao.net',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumps:function(e){
      // let typeId=1;
      let typeId=this.data.sto;
      let uid =  e.currentTarget.dataset.uid
      wx.navigateTo({
        url: '/pages/workePage/workePage?sto=' + typeId + '&uid=' + uid + '&typeId=' + typeId,
      })
    }
  }
})
