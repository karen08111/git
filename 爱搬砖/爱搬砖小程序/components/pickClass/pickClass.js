// components/pickClass/pickClass.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pla:{
      type:String
    },
    ids:{
      type:Number
    },
    objectArray:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   index:''
  },
  attached :function(){
    let index = this.data.objectArray.findIndex((value,index)=>{
      return value.id == this.data.ids
    })
    this.setData({
      index:index
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange:function(e){
      let name = e.currentTarget.dataset.name;
      this.setData({
        index:e.detail.value
      })
      this.triggerEvent("title",name.id);
    }
  }
})
