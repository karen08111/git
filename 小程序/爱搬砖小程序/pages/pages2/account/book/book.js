// pages/pages2/account/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:1,
    la:[],
    bookId:null,//证书等级
    imgUrl:null,
    bookImg:null,
		http:null,
		bookList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.hideShareMenu()
		if(options.store) {
			this.setData({
				store:options.store
			})
		}
  },
	select(e) {
		var id = e.currentTarget.dataset.id
		var index = e.currentTarget.dataset.index
		var list = this.data.bookList
		list[index].isuse = !list[index].isuse
		this.setData({
			bookList:list
		})
	},
	dels() {
		var that = this
		var request = getApp().globalData.sendRequest
		var arr = []
		for(let i in this.data.bookList){
			if(this.data.bookList[i].isuse){
				arr.push(this.data.bookList[i].id)
				
			}
		}
		if(arr.length>0) {
			wx.showModal({
				title:'提示',
				content:'确定要删除所选证书吗?',
				success(r) {
					if (r.confirm) {
						for(let j in arr) {
							request.getReq("/member/seniority/"+arr[j]+"/cutOut",res=>{
								
							})
						}
						that.onShow()
					} else if (r.cancel) {
						
					}
				}
			})
			
			
		}else {
			wx.showToast({
				icon:'none',
				title:'请选择要删的证书'
			})
		}
		
		
	},
  formSubmit(e){
    var that = this
    var request = getApp().globalData.sendRequest
    let bookName = e.detail.value.bookName
    // console.log(bookName,this.data.bookId,this.data.bookImg.path)
    if (bookName && this.data.bookId && this.data.bookImg.path){
      var data = {
        seniority_name: bookName,
        img_path: this.data.bookImg.path,
        credential_level_type: this.data.bookId,
        _method:''
      }
      request.putReq('/member/seniority',data,res=>{
        // console.log(res)
        if(res.code==200){
          wx.showToast({
            title: res.data,
            success(){
              setTimeout(function(){
//                 wx.navigateBack({
//                   delta: 1
//                 })
									that.setData({
										store:1
									})
									that.onShow()
              },1500)
            }
          })
        }else {
          wx.showToast({
            icon:'none',
            title: res.data,
          })
        }
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '请填写完整',
      })
    }
  },
  add(){
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    var loginStore = wx.getStorageSync('userObj')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        // console.log(res)
        var  tempFilePaths = res.tempFilePaths
        that.setData({
          imgUrl: tempFilePaths[0]
        })
        wx.uploadFile({
          url: http +'/member/upload/photos',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { 'Abz-Auth-Token': loginStore.token },
          success(url){
            let zhi = JSON.parse(url.data)
            if(zhi.code ==200){
              that.setData({
                bookImg:zhi.data
              })
            }
          }
        })
        
        
      }
    })
  },
  qiehuan() {
    this.setData({
      store:2
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getBing(e){
    this.setData({
      bookId:e.detail
    })
  },
	showBooks() {
		var that = this
		var request = getApp().globalData.sendRequest;
// 		this.setData({
// 			http:http
// 		})
		request.getReq("/member/seniority",res=>{
			if(res.code == 200) {
				that.setData({
					bookList:res.data
				})
			}
		})
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 请求证书等级
    const http = getApp().globalData.local
    // console.log(http)
    var that = this
    var request = getApp().globalData.sendRequest;
    request.sendRequest("/common/hierarchy","get").then(res=>{
      that.setData({
        la:res.data.data,
				http:http
      })
    })
// 		if(wx.getStorageSync('userObj').auth_status == 0){
// 			wx.showModal({
// 				title:'提示',
// 				content:'尚未身份认证,是否前去认证?',
// 				cancelText:'否',
// 				confirmText:'是',
// 				success(res) {
// 					if (res.confirm) {
// 						wx.redirectTo({
// 							url: '/pages/pages2/userSelect/userSelectIndex/userSelectIndex'
// 						})
// 					} else if (res.cancel) {
// 						wx.navigateBack({
// 							delta: 1
// 						})
// 					}
// 				}
// 			})
// 		}
		this.showBooks()
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