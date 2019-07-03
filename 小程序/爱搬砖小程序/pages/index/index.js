//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newTab:1,
    project:[
      {
        title:'1111'
      },
      {
        title: '1111'
      },
      {
        title: '1111'
      },
      {
        title: '1111'
      }
    ],
    ids:2,
    index: 0,
    showCount:1,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    http:null,
    recomendList:[],
    newList:[],
    recruitPerson:[],
    recruitTeam:[],
		show:'',
  },

  


  onShow:function(e){
		
  },
  qiehuan(e){
    this.setData({
      newTab:e.currentTarget.dataset.current
    })
  },
	yaoqing() {
				// 查看用户是否授权
		wx.getSetting({
			success(res){
				if(res.authSetting['scope.userInfo']) {
					// 检查登录
					wx.navigateTo({
						url:'/pages/extension/extensionIndex/extensionIndex',
					})
				}else {
					wx.reLaunch({
						url:'/pages/pages2/personal/personal'
					})
				}
			}
		})
	},
	ceshi() {
// 		wx.chooseAddress({
// 			success(res) {
// 				console.log(res.userName)
// 				console.log(res.postalCode)
// 				console.log(res.provinceName)
// 				console.log(res.cityName)
// 				console.log(res.countyName)
// 				console.log(res.detailInfo)
// 				console.log(res.nationalCode)
// 				console.log(res.telNumber)
// 			}
// 		})
		wx.requestPayment({
			timeStamp: '',
			nonceStr: '',
			package: '',
			signType: 'MD5',
			paySign: '',
			success(res) { },
			fail(res) { }
		})
	},
	getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
	viewClick01() {
		wx.vibrateLong()
    
	},
	tingl() {
		wx.addPhoneContact({
			success(res) {
				
			}
		})
	},
  onLoad: function () {
    const http = getApp().globalData.local
    this.setData({
      http:http
    })
    var r = getApp().globalData.sendRequest;
    var that = this
    let loginStore = wx.getStorageSync('userObj')
    // 获取轮播
    r.sendRequest('/common/sowing?sn=30000','get').then(res=>{
			console.log(res)
			var arr = res.data.data
			var news = []
// 			for(let i in arr) {
// 				if(arr[i].link.substr(0,6).toLowerCase() == "/pages"){
// 					news.push(arr[i])
// 				}
// 			}
			// console.log(arr)
      if(res.data.code==200){
        that.setData({
          imgUrls:arr
        })
      }
    })
    
    // r.sendRequest('/newsList','get').then(res=>{
    //   // console.log(res.data)
    //   that.setData({
    //     newList:res.data.data.data
    //   })
    // })
    
		

    // 推荐列表
    r.sendRequest('/main','get','').then(res=>{
      // console.log(res.data.data)
      if(res.data.code==200){
        that.setData({
          recomendList:res.data.data,
          recruitPerson: res.data.data.recruitPerson,
          recruitTeam: res.data.data.recruitTeam
        })
        // console.log(that.data.recomendList)  
        // console.log(res.data.data.recruitTeam)      
      }
    })
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 选项卡
  tabClick:function(e){
    let current=e.currentTarget.dataset.current;
    // console.log(current);
    this.setData({
      current:current
    })
  },
  tabClickTab:function(e){
    let current= e.currentTarget.dataset.current;
    this.setData({
      currentTab:current
    })
  },
  sou:function(){
    wx.navigateTo({
    	url: '/pages/pages2/search/search',
    })
  },
  enterJump(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/pages2/information/showEnter/showEnter?id='+id,
    })
  },
  
  
})
