// pages/pages2/member/memberIntr/menberIntr.js
const http = getApp().globalData.loginUrl;
var request = getApp().globalData.sendRequest
Page({

  /**
   * 页面的初始数据
   */
  data: {
	show:false,
	money:[],
	content:'一年内免费查看网站信息',
	balance: '', //余额
	payMoney: 699,//费用
	payMonth: 12,//购买月份
	difi: '',
	isPay: true, //余额是否能购买
	isSuccess: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pick() {
	  this.setData({
		  money:[{
				id:0,
				title:'大砖会员699元/年',
				content:'一年内免费查看网站信息',
				store:true,
				money:699,
				month:12
			},{
				id:1,
				title:'小砖会员299元/月',
				content:'一月内免费查看网站信息',
				store:false,
				money:299,
				month:1
			}],
		  show:true,
		  payMoney: 699,
		  payMonth: 12
	  })
	  if (parseFloat(this.data.balance.balance) <  this.data.payMoney) {
	  		this.setData({
	  			difi: this.data.payMoney - parseFloat(this.data.balance.balance),
	  			isPay: false
	  		})
	  } else {
		  this.setData({
			  isPay: true
		  })
	  }

  },
  pickSmall() {
	 this.setData({
		money: [{
			id:0,
			title:'大砖会员699元/年',
			content:'一年内免费查看网站信息',
			store: false,
			money:699,
			month:12
		},{
			id:1,
			title:'小砖会员299元/月',
			content:'一月内免费查看网站信息',
			store: true,
			money:299,
			month:1
		}],
		show:true,
		payMoney: 299,
		payMonth: 1
	 }) 
	 if (parseFloat(this.data.balance.balance) <  this.data.payMoney) {
	 		this.setData({
	 			difi: this.data.payMoney - parseFloat(this.data.balance.balance),
	 			isPay: false
	 		})
	 } else {
	 		  this.setData({
	 			  isPay: true
	 		  })
	 }
  },
  down() {
	console.log(1)
  },
  check(e) {
	  var index = e.currentTarget.dataset.index
	  var arr = this.data.money
	  var month = e.currentTarget.dataset.month
	  var money = e.currentTarget.dataset.money
	  for(let i in arr) {
		  if(i == index) arr[i].store = true
		  else arr[i].store = false
	  }
	  this.setData({
	  		  money:arr,
	  		  content:arr[index].content,
	  		  payMoney: money,
	  		  payMonth: month
	  })
	  if (parseFloat(this.data.balance.balance) <  this.data.payMoney) {
		this.setData({
			difi: this.data.payMoney - parseFloat(this.data.balance.balance),
			isPay: false
		})
	  } else {
		  this.setData({
			  isPay: true
		  })
	  }
  },
  xuPay(e) {
	this.setData({
		difi: e.detail.value
	})  
  },
  // 余额购买
  yuPays() {
  	var that = this
  	var data = {
  		month: this.data.payMonth
  	}  
  	request.postReq("/wechat/services/vip_buy", data, res => {
		if(res.code ==200) {
			that.setData({
				isSuccess: true,
				show: false
			})
		} else {
			wx.showToast({
				icon:"none",
				title: res.msg
			})
		} 
  	})
  },
  // 充值购买
  pays() {
	  var that = this
	  var data ={
		month: this.data.payMonth
	  }
	  // console.log(data)
	  request.postReq("/wechat/services/vip_recharge",data, res=>{
		  if(res.code == 200) {
			var wechat = res.data.wechat
			wx.requestPayment({
			  timeStamp: wechat.timeStamp,
			  nonceStr: wechat.nonceStr,
			  package: wechat.package,
			  signType: wechat.signType,
			  paySign: wechat.paySign,
			  success(res) { 
				  // console.log(res)
				  that.setData({
					isSuccess: true,
					show: false
				  })
			  },
			  fail(res) { }
			})
		}
	  })
  },
  
  breaks() {
	wx.switchTab({
		url: '/pages/index/index'
	}) 
  },
  // 获取余额
  getMoney() {
	var that = this
	request.getReq("/wechat/wallet/info",res=>{
		if(res.code == 200) {
			that.setData({
				balance:res.data
			})
			if (parseFloat(that.data.balance.balance) <  that.data.payMoney) {
				that.setData({
					difi: that.data.payMoney - parseFloat(that.data.balance.balance),
					isPay: false
				})
			}
		}
	})
  },
  hide() {
	 this.setData({
		 show:false
	 }) 
  },
  //余额够 直接开通 
  kaiPays() {
	  
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
	this.getMoney()
	
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