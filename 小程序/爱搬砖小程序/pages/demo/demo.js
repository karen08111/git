// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [[], [],[]],
    multiIndex: [0, 0, 0],
    allCity:[],
    cityEr:[],
    erji:[],
    erjiTitle:[],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr=this.data.multiArray
    var that= this
    wx.request({
      type:'get',
      url: 'https://developer.api.qqdoubao.net/common/getarea',
      success:res=>{
        // console.log(res.data.data)
        arr[0]=res.data.data
        let sheng=[]
        for(let i= 0;i<arr[0].length;i++){
          sheng.push(arr[0][i].title)
        }
        arr[0]=sheng
        that.setData({
          multiArray:arr,
          allCity:res.data.data
        })
      }
    })
  },
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var that=this
    this.setData({
      multiIndex: e.detail.value
    })

  },
  bindMultiPickerColumnChange:function(e){
    var that=this
    let val= e.detail.value
    var data={
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    }
    data.multiIndex[e.detail.column]=val
    console.log(e.detail.column)//改变的列项
    if (e.detail.column==0){//选动第一列
      // 选择当前城市的ID
      let id = that.data.allCity[val].id
      let title = that.data.allCity[val].title
      wx.request({
        type: 'get',
        url: 'https://developer.api.qqdoubao.net/common/getarea/' + id,
        success: res => {
          // console.log(res.data.data)
          that.setData({
            erji: res.data.data
          })
          let erjiTitle = []
          for (let e = 0; e < that.data.erji.length; e++) {
            erjiTitle.push(that.data.erji[e].title)
          }
          that.setData({
            erjiTitle: erjiTitle
          })
          // console.log(that.data.erjiTitle)

        }
      })
      // console.log(data.multiArray[1])
      data.multiArray[1] = that.data.erjiTitle
    }
     
      
        // console.log(that.data.allCity[val])
      // 请求二级市
        // that.citys(id).then(res=>{
        //   that.setData({
        //     erji:res
        //   })
        // })
        
        // console.log(1)
        
        // // let erjiTitle=[]
        // // for(let e=0;e<that.data.erji.length;e++){
        // //   erjiTitle.push(that.data.erji[e].title)
        // // }
        // // data.multiArray[1] = erjiTitle
        // console.log(that.data.erji)
        

    this.setData(data);
  },
  // 请求城市方法视图
  citys:function(id){
    let req = getApp().globalData.sendRequest
    let newEr = []
    let http =getApp().globalData.local
    return req.sendRequest('/common/getarea/'+id,'get').then(res=>{
        for (let c = 0; c < res.data.data.length; c++) {
          newEr.push(res.data.data[c].title)
        }
        return newEr
    })
    // wx.request({
    //   type:'get',
    //   url: 'https://developer.api.qqdoubao.net/common/getarea/'+id,
    //   success: res => {
        
    //     for (let c = 0; c < res.data.data.length; c++) {
    //       newEr.push(res.data.data[c].title)
    //     }
    //     return newEr
    //   }
    // })
   
  },
  
  // 请求城市方法拿ID
  cityId: function (id) {
    wx.request({
      type: 'get',
      url: 'https://developer.api.qqdoubao.net/common/getarea/' + id,
      success: res => {
        return res.data.data
      }
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