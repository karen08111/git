// components2/jumpIndex/jumpIndex.js
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
    loadingHidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
	jump() {
		
		wx.switchTab({
			url:'/pages/index/index'
		})
	},
	
	
  }
})
