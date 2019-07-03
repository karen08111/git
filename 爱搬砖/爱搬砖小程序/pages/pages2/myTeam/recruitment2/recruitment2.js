// pages/pages2/myTeam/recruitment/recruitment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: '',
    start: '',
    end: '',
    zhi: '',
    tar: '',
    left:330,
    store: true,
    list: [],//招聘列表
    types: 'set',
    mis: '.2s',
		page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
  },
  sets(e) {
    wx.navigateTo({
      url: '/pages/pages2/myTeam/faProject/faProject?type=' + this.data.types + '&id=' + e.currentTarget.dataset.id,
    })
  },
  recordStart(e) {
    // console.log(e.touches[0].clientX)
    let tar = e.currentTarget.dataset.index
		var arr = this.data.list
		for(let i in arr) {
			if(i == tar) {
				arr[i].store = true
			}else {
				arr[i].store = false
			}
		}
    this.setData({
      start: e.touches[0].clientX,
      tar: tar,
      zhi: 0,
			list:arr
    })
  },
	lone(e) {
		console.log(e)
	},
	jumpDetail(e) {
		var id= e.currentTarget.dataset.ids
		// console.log(id)
		wx.navigateTo({
			url:"/pages/pages2/information/projectDetail/projectDetail?id="+id
		})
	},
  recordMove(e) {
    // console.log(e.touches[0].clientX)
    // console.log(this.data.start - e.touches[0].clientX)
    var par = parseInt(this.data.start - e.touches[0].clientX)
    if (par>=100) {
      this.setData({
        x: this.data.left,
        zhi: this.data.start - e.touches[0].clientX
      })
      // console.log(this.data.x)
    }

  },
  recordEnd(e) {
    // console.log(this.data.start-e.changedTouches[0].clientX,'结束')
    if (this.data.zhi >= 100) {
      this.setData({
        x: this.data.left
      })
    } else {
      this.setData({
        x: 0
      })
    }

  },
  hide(e) {
    let id = e.currentTarget.dataset.id;
    var request = getApp().globalData.sendRequest
		var index  =  e.currentTarget.dataset.index
    var that = this
    request.getReq("/member/project/"+id+"/setHide", res => {
      // console.log(res)
      if (res.code == 200) {
        // that.onShow()
				var arr = that.data.list
				// console.log(arr[index])
				arr[index]['is_show'] = 0
				that.setData({
					list:arr
				})
      }
    })
  },
  show(e) {
    let id = e.currentTarget.dataset.id;
    var request = getApp().globalData.sendRequest
		var index  =  e.currentTarget.dataset.index
    var that = this
    request.getReq("/member/project/" + id + "/setShow", res => {
      // console.log(res)
      if (res.code == 200) {
        // that.onShow()
				var arr = that.data.list
				// console.log(arr[index])
				arr[index]['is_show'] = 1
				that.setData({
					list:arr
				})
      }
    })
  },
  del(e) {
    let id = e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest
    var that = this
    this.setData({
      x: this.data.left
    })
    wx.showModal({
      title: '是否删除本条信息?',
      content: '',
      success(res) {
        if (res.confirm) {
          request.getReq("/member/project/" + id + "/delete", res => {
            // console.log(res)
            if (res.code == 200) {
              that.setData({
                mis: 0,
                x: 0
              })
              that.onShow()
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
	getList() {
		var request = getApp().globalData.sendRequest
		var that = this
		// 获取招聘信息
		request.getReq("/member/project?page="+that.data.page+"&publisher=1", res => {
		  // console.log(res.data)
		  if (res.code == 200) {
				var arr = that.data.list
		    that.setData({
		      mis: '.5s',
		      list: arr.concat(res.data.data),
					page:parseInt(res.data.current_page)+1
		    })
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
    
    this.setData({
			list:[],
			page:1
		})
    this.getList()
    
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
		this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})