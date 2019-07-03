// pages/pages2/myTeam/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:'',
    start:'',
    end:'',
    zhi:'',
    tar:'',
    userList:[],
    mis: '.3s',
    height: 0,
    top: 0,
    page:1,
    tid:null,
		left:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取高度
    wx.hideShareMenu()
    var that = this
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       height: res.windowHeight
    //     })
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  sets(e){
    wx.navigateTo({
      url: '/pages/pages2/myTeam/compile/compile?tid='+this.data.tid,
    })
  },
  recordStart(e){
		var index = e.currentTarget.dataset.index
		var arr = this.data.userList
		for(let i in arr) {
			if(i == index) {
				arr[i].store = true
			}else {
				arr[i].store = false
			}
		}
    let tar=e.currentTarget.dataset.index
    
    this.setData({
      start: e.touches[0].clientX,
      tar:tar,
      zhi:0,
			userList:arr
    })
  },
  recordMove(e){
    var par = parseInt(this.data.start - e.touches[0].clientX)
    if(par>=100) {
      this.setData({
        x: 220,
        zhi: this.data.start - e.touches[0].clientX
      })
    }
    
  },
  recordEnd(e){
    // console.log(this.data.start-e.changedTouches[0].clientX,'结束')
    if(this.data.zhi>=100){
      this.setData({
        x: 220
      })
    }else {
      this.setData({
        x:0
      })
    }
    
  },
  bindDownLoad() {
    this.getUser()
  },
  scroll(e) {
    this.setData({
      top: e.detail.scrollTop
    })
  },
  topLoad() {

  },
  dels(e){
    var id =e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest;
    var that = this
    this.setData({
      x: 220
    })
    wx.showModal({
      title: '是否删除这个成员吗?',
      content: '',
      success(res){
        if (res.confirm) {
          var data = {
            id:id,
            tid:that.data.tid
          }
          request.postReq("/member/teamMamber/delete",data,re=>{
            if (re.code == 200) {
              that.setData({
                mis: 0,
                x: 0
              })
              that.onShow()

            }
          })
        } else if (res.cancel) {
          that.setData({
            x: 0
          })
        }
      }
    })
  },
  getUser() {
    var request = getApp().globalData.sendRequest;
    var that = this
    request.getReq("/member/teamMamber/odd?page="+this.data.page, res => {
			// console.log(res.data.data)
      if (res.code == 200) {
        if(res.data.data.length>0){
          var list = that.data.userList
          that.setData({
            page: parseInt(res.data.current_page) + 1,
            mis: '.3s',
            userList: list.concat(res.data.data),
          })
          
        }
        that.setData({
					tid:res.data.tid
				})
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 
    var that = this
    this.setData({
      userList:[],
      page:1,
      top: 0,
    })
    this.getUser()
    // 获取高度
    wx.getSystemInfo({
      success: function (res) {
				// console.log(res)
        that.setData({
          height: res.windowHeight
        })
      },
    })
// 		var query = wx.createSelectorQuery();
//     //选择id
//     var that = this;
//     query.select('.main').boundingClientRect(function (rect) {
// 			console.log(rect.height)
//       that.setData({
//         height: rect.height
//       })
//     }).exec();
  },
	
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
	picks(e) {
		// 监听xuanze的宽度
		var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    query.select('.xuanze').boundingClientRect(function (rect) {
      // console.log(rect.width)
			that.setData({
				left:rect.width
			})
      
    }).exec();
		var index = e.currentTarget.dataset.index
		var arr = this.data.userList
		// console.log(e)
		for(let i in arr){
			if(i == index) {
				// arr[i].left=this.data.left
			}else {
				arr[i].left = 0
			}
		}
		arr[index].left = this.data.left
		this.setData({
			userList:arr
		})
		// console.log(arr)
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
		// console.log(1)
		this.getUser()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})