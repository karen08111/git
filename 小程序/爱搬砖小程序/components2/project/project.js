// components2/project/project.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pad:{
      type:Boolean
    },
    project:{
      type:Object
    },
    http:{
      type:String
    },
    type:{
      type:String
    },
    nature:{
      type:Number
    },
    flow:{
      type:Boolean
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
    zhaoDetail(e){
      let id = e.currentTarget.dataset.id
      var that = this
      var request = getApp().globalData.sendRequest
      var http = getApp().globalData.local
      request.getReq("/recruit/detail/"+id,res=>{
        console.log(res)
      })
    }
  }
})
