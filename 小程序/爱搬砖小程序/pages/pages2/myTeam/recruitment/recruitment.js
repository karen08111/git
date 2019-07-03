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
    store:true,
    list:[],//招聘列表
    types:'set',
    mis:'.3s',
    isFa:false,
		tid:null,
		height:null,
		Y:'',
		store:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
    // console.log(options)
    if(options.store){
      this.setData({
        isFa:true
      })
    }
  },
  sets(e){
    wx.navigateTo({
      url: '/pages/pages2/myTeam/post/post?type='+this.data.types+'&id='+e.currentTarget.dataset.id,
    })
  },
  recordStart(e) {
    let tar = e.currentTarget.dataset.index
		var arr = this.data.list
		this.setData({
			store:true
		})
		for(let i in arr) {
			if(i == tar) {
				arr[i].store = true
			}else {
				arr[i].store = false
			}
		}
		// console.log( e.touches[0].clientX,'开始位置')
    this.setData({
      start: e.touches[0].clientX,
      tar: tar,
      zhi:0,
			list:arr,
			Y:e.touches[0].clientY
    })
  },
  recordMove(e) {
		
		var par = parseInt(this.data.start - e.touches[0].clientX)
		if (par>=100){
			this.setData({
				x: this.data.left,
				zhi: this.data.start - e.touches[0].clientX
			})
		}
    
  },
  recordEnd(e) {
    // console.log(this.data.start-e.changedTouches[0].clientX,'结束')
    if (this.data.zhi >= 100) {
      this.setData({
        x: this.data.left
      })
    } else{
      this.setData({
        x: 0
      })
    }

  },
	
  hide(e){
    let id = e.currentTarget.dataset.id;
    var request = getApp().globalData.sendRequest
		var index  =  e.currentTarget.dataset.index
    var that = this
    request.getReq("/member/recruit/"+id+"/setHide",res=>{
      // console.log(res)
      if(res.code==200){
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
	picks(e) {
// 		var index = e.currentTarget.dataset.index
// 			var arr = this.data.list;
// 			for(let i in arr) {
// 				if(i == index) {
// 					arr[i].left = 330
// 				}else {
// 					arr[i].left = 0
// 				}
// 			}
// 			this.setData({
// 				list:arr
// 			})
	},
	bindscroll(e) {
		var index = e.currentTarget.dataset.index
			var arr = this.data.list;
			// arr[e]
// 		if(e.detail.scrollLeft>100){
// 			
// 			var index = e.currentTarget.dataset.index
// 			var arr = this.data.list
// 			for(let i in arr) {
// 				if(i != index) {
// 					arr[i].left=0
// 				}else {
// 					arr[i].left=330
// 				}
// 			}
// 			this.setData({
// 				list:arr
// 			})
// 			return;
// 		}
	},
  show(e){
    let id = e.currentTarget.dataset.id;
    var request = getApp().globalData.sendRequest
		var index  =  e.currentTarget.dataset.index
    var that = this
    request.getReq("/member/recruit/" + id + "/setShow", res => {
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
  del(e){
    let id = e.currentTarget.dataset.id
    var request = getApp().globalData.sendRequest
    var that = this
    this.setData({
      x:this.data.left
    })
    wx.showModal({
      title: '是否删除本条信息?',
      content: '',
      success(res){
        if (res.confirm) {
          request.getReq("/member/recruit/" + id + "/delete", res => {
            // console.log(res)
            if (res.code == 200) {
              that.setData({
                mis:0,
                x:0
              })
              that.onShow()
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
  },
	// 列表请求
	getList() {
		var request = getApp().globalData.sendRequest
		var that = this
		 // 获取招聘信息
		 if(this.data.isFa) {
			 request.getReq("/member/recruit?page="+that.data.page+"&publisher=2", res => {
				if (res.code == 200) {
					var arr = that.data.list
					that.setData({
						tid:res.data.tid,
						page:parseInt(res.data.current_page)+1,
						mis:'.5s',
						list: arr.concat(res.data.data)
					})
				}
			})
		 }else {
			 request.getReq("/member/recruit?page="+that.data.page+"&publisher=1", res => {
			 	if (res.code == 200) {
			 		var arr = that.data.list
			 		that.setData({
			 			page:parseInt(res.data.current_page)+1,
			 			mis:'.5s',
			 			list: arr.concat(res.data.data)
			 		})
			 	}
			 })
		 }
		
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
    var request = getApp().globalData.sendRequest
    var that = this
		that.setData({
			page:1,
			list:[],
		})
    // 获取高度
    wx.getSystemInfo({
      success: function (res) {
    		// console.log(res)
        that.setData({
          height: res.windowHeight
        })
      },
    })
   that.getList();
    // 获取项目信息
    // request.getReq("/member/project",res=>{
    //   console.log(res)
    // })
  },
	jumpDetail(e) {
		var id = e.currentTarget.dataset.ids
		var nature = e.currentTarget.dataset.nature
		// url="{{is_show?'/pages/pages2/information/messageDetail/messageDetail?id='+item.id+'&nature='+nature:''}}"
		// console.log(id,nature)
		wx.navigateTo({
			url:"/pages/pages2/information/messageDetail/messageDetail?id="+id+"&nature="+nature
		})
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
		this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})