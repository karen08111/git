// pages/pages2/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'找工人',
    show:false,
    search:false,
    value:'',
    typeList:[
      {
        id:0,
        title:'找工人'
      },
      {
        id:1,
        title:'找团队'
      },
      {
        id:2,
        title:'工人找活'
      },
      {
        id:3,
        title:'团队找活'
      },
      {
        id:4,
        title:'项目信息'
      }
    ],
    typeId:0,
    project:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pick(){
    this.setData({
      show:!this.data.show
    })
  },
  getFocus(){
    // console.log(1)
    this.setData({
      search:true
    })
  },
  searchValue(e){
    this.setData({
      value:e.detail.value
    })
  },
  quFocus() {
    this.setData({
      search:false
    })
  },
  goSearch() {
    // console.log(this.data.value)
    if (this.data.typeId == 0){//搜工人
      wx.navigateTo({
        url: '/pages/pages2/information/screenList/screentList?type=/resumeList&title=' + this.data.value,
      })
    } else if (this.data.typeId == 1){//搜团队
      wx.navigateTo({
        url: '/pages/pages2/information/screenList/screentList?type=/teamList&title=' + this.data.value,
      })
    } else if (this.data.typeId == 2) {//工人找活
      wx.navigateTo({
        url: '/pages/pages2/information/screenList/screentList?type=/recruitList&nature=1&title=' + this.data.value,
      })
    } else if (this.data.typeId == 3) {//团队找活
      wx.navigateTo({
        url: '/pages/pages2/information/screenList/screentList?type=/recruitList&nature=2&title=' + this.data.value,
      })
    } else if(this.data.typeId == 4) {//项目信息
			wx.reLaunch({
				url:"/pages/pages2/information/projectList/projectList?title="+this.data.value
			})
		}
  },
  quxiao() {
    this.setData({
      search:false,
      value:''
    })
  },
  qieType(e) {
    let name = e.currentTarget.dataset.name
    let id = e.currentTarget.dataset.type
    // console.log(id)
    this.setData({
      name:name,
      show:false,
      typeId:id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})