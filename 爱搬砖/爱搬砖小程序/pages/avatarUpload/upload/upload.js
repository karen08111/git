import WeCropper from '../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight 

Page({
//   data: {
//     lei:null,
//     cropperOpt: {
//       id: 'cropper',
//       width,
//       height,
//       scale: 2.5,
//       zoom: 8,
//       cut: {
//         x: (width - 300) / 2,
//         y: (height - 300) / 2,
//         width: 300,
//         height: 300
//       }
//     },
		data:{
			lei:null,
			cropperOpt: {
				id: 'cropper', // 用于手势操作的canvas组件标识符
				targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
				pixelRatio: device.pixelRatio, // 传入设备像素比
				width,  // 画布宽度
				height, // 画布高度
				scale: 2.5, // 最大缩放倍数
				zoom: 8, // 缩放系数
				cut: {
					x: (width - 300) / 2, // 裁剪框x轴起点
					y: (height - 300) / 2, // 裁剪框y轴期起点
					width: 300, // 裁剪框宽度
					height: 300 // 裁剪框高度
				}
			},
			typeId:null
		},
  onLoad(option) {
    // console.log(option)
    const { cropperOpt } = this.data
    this.setData({
      typeId: option.typeId,
      lei: option.lei
    })
		if(option.src){
			cropperOpt.src = option.src
			this.cropper = new WeCropper(cropperOpt)
					.on('ready', (ctx) => {
							console.log(`wecropper is ready for work!`)
					})
					.on('beforeImageLoad', (ctx) => {
							wx.showToast({
									title: '上传中',
									icon: 'loading',
									duration: 20000
							})
					})
					.on('imageLoad', (ctx) => {
							wx.hideToast()
					})
					
		}
			
//     if (option.src) {
//       cropperOpt.src = option.src
//       new WeCropper(cropperOpt)
//         .on('ready', (ctx) => {
//           // console.log(`wecropper is ready for work!`)
//         })
//         .on('beforeImageLoad', (ctx) => {
//           // console.log(`before picture loaded, i can do something`)
//           // console.log(`current canvas context:`, ctx)
//           wx.showToast({
//             title: '上传中',
//             icon: 'loading',
//             duration: 20000
//           })
//         })
//         .on('imageLoad', (ctx) => {
//           // console.log(`picture loaded`)
//           // console.log(`current canvas context:`, ctx)
//           wx.hideToast()
//         })
//         .on('beforeDraw', (ctx, instance) => {
//           // console.log(`before canvas draw,i can do something`)
//           // console.log(`current canvas context:`, ctx)
//         })
//         .updateCanvas()
//     }
  },
  touchStart (e) {
    this.cropper.touchStart(e)
  },
  touchMove (e) {
    this.cropper.touchMove(e)
  },
  touchEnd (e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage () {
		var that = this
		const http = getApp().globalData.local
		var request = getApp().globalData.sendRequest;
		var loginStore = wx.getStorageSync('userObj')
    var typeId = this.data.typeId
		// console.log(this.cropper)
// 		this.cropper.getCropperBase64(par=>{
// 			if(par){//64
// 			var head =par
// 				if(this.data.lei ==1){//个人
// 				wx.redirectTo({
// 						url: `/pages/pages2/resume/basic/basic?avatar=${head}&typeId=${typeId}`
// 					})
// 				}else if(this.data.lei == 2){//团队
// 					wx.redirectTo({
// 						url: `/pages/pages2/resume/teamBasic/teamBasic?avatar=${head}&typeId=${typeId}`
// 					})
// 				}else if(this.data.lei ==3){//企业
// 					wx.redirectTo({
// 						url: `/pages/pages2/enterprise/enterBasic/enterBasic?avatar=${head}&typeId=${typeId}`
// 					})
// 				}
// 							}
// 		})
    this.cropper.getCropperImage((avatar) => {
      if (avatar) {
        //  获取到裁剪后的图片
        // console.log(avatar)
				var head = avatar
					// console.log(this.wecropper)
					
// 				if(that.CheckUrl(avatar)){
// 					var arr = avatar.split('/')
// 					arr[0] = 'http'
// 					head = arr[0]+"//"+arr[2]
// 				}
//         console.log(head)
        if(this.data.lei ==1){//个人
          wx.redirectTo({
            url: `/pages/pages2/resume/basic/basic?avatar=${head}&typeId=${typeId}`
          })
        }else if(this.data.lei == 2){//团队
          wx.redirectTo({
            url: `/pages/pages2/resume/teamBasic/teamBasic?avatar=${head}&typeId=${typeId}`
          })
        }else if(this.data.lei ==3){//企业
          wx.redirectTo({
            url: `/pages/pages2/enterprise/enterBasic/enterBasic?avatar=${head}&typeId=${typeId}`
          })
        }
        
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
// 			this.wecropper.getCropperBase64(res=>{
// 				if(res){//64
// 				var head = res
// 					if(this.data.lei ==1){//个人
// 					wx.redirectTo({
// 							url: `/pages/pages2/resume/basic/basic?avatar=${head}&typeId=${typeId}`
// 						})
// 					}else if(this.data.lei == 2){//团队
// 						wx.redirectTo({
// 							url: `/pages/pages2/resume/teamBasic/teamBasic?avatar=${head}&typeId=${typeId}`
// 						})
// 					}else if(this.data.lei ==3){//企业
// 						wx.redirectTo({
// 							url: `/pages/pages2/enterprise/enterBasic/enterBasic?avatar=${head}&typeId=${typeId}`
// 						})
// 					}
// 				}
// 			})
  },
	CheckUrl(str) { 
		var RegUrl = new RegExp(); 
		RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");//jihua.cnblogs.com 
		if (!RegUrl.test(str)) { 
			return false; 
		} 
			return true; 
	} ,
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
        console.log(src);
      }
    })
  }
  
})
