// components2/common/common.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    array:{
      type:Array
    },
    ids:{
      type:Number
    },
    title:{
      type:String
    },
    pla:{
      type:String
    },
		enter:{
			type:Boolean
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:'',
		isColor:true,
  },
  ready(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e){
      this.setData({
        ids:parseInt(e.detail.value)+1,
				isColor:false
      })
      this.triggerEvent('getBing', parseInt(e.detail.value) + 1)
    }
  }
})
