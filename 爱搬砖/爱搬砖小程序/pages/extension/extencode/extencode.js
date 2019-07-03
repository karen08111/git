// components/code/code.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs:{
      type:String
    },
    abzId:{
      type:String
    },
    store:{
      type:Boolean
    },
    mobile:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hint: '拼图验证',//默认提示语
    sysW: wx.getSystemInfoSync().windowWidth,//获取屏幕宽度
    xAxial: 0,//X轴的初始值
    x: 0,//触摸时X轴的值
    w: 236-59,//滑块可移动的X轴范围
    cssAnimation: 'translate3d(0, 0, 0)',//CSS动画的初始值
    succeedMsg: '',//验证成功提示信息的默认值
    pullStatus: true,//是否允许验证成功后继续滑动
    left:0,
    show:true,
		zhe:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load(){
      wx.showLoading({
        title: '刷新验证码',
      })
      const http = getApp().globalData.loginUrl
      this.setData({
        http: http
      })
      var that = this;
      wx.request({
        url: http + '/beInvited/captcha/verimg',
				header:{'Abz-Request-Id':wx.getStorageSync('enterRequesId')},
        success(res) {
          that.setData({
            imgs: res.data,
            // abzId: res.header["Abz-Request-Id"]
          })
          wx.hideLoading()
        }
      })
    },
    hide(){
      this.setData({
        store:false
      })
      this.triggerEvent('hide', false);
    },
    //滑块移动中执行的事件
    moveFun: function (e) {
      //如果验证成功后仍允许滑动，则执行下面代码块（初始值默认为允许）
      if (this.data.pullStatus) {
        //设置X轴的始点
        this.data.x = e.changedTouches[0].clientX - ((this.data.sysW * 0.1) + 25);
        // console.log(this.data.x)
        if(this.data.x>0){
          if (this.data.x >= 189) {
            this.setData({
              x: 189
            })
          }
          this.setData({
            left: this.data.x + 'px',
						zhe:parseInt(this.data.x)+15+'px'
          })
        }
        
        
        //如果触摸时X轴的坐标大于可移动距离则设置元素X轴的坐标等于可移动距离的最大值，否则元素X轴的坐标等于等于当前触摸X轴的坐标
        this.data.x >= this.data.w ? this.data.xAxial = this.data.w : this.data.xAxial = this.data.x;
        //如果触摸时X轴的坐标小于设定的始点，则将元素X轴的坐标设置为0
        if (this.data.x < 25) this.data.xAxial = 0;
        //根据获取到的X轴坐标进行动画演示
        this.data.cssAnimation = 'translate3d(' + this.data.xAxial + 'px, 0, 0)';

        this.setData({
          cssAnimation: this.data.cssAnimation
        })
      }
    },
    //松开滑块执行的事件
    endFun: function () {
      //自定义组件触发事件时提供的detail对象
      wx.showLoading({
        title: '等待验证',
      })
      var detail = {};
      //如果触摸的X轴坐标大于等于限定的可移动范围，则验证成功
   
      let int = parseInt(this.data.x)
      // console.log(int)
      const http = getApp().globalData.loginUrl
      var that = this;
    //  console.log(int)
     wx.request({
       method:'post',
       url: http +'/beInvited/captcha/vermob',
       data:{mobile:that.data.mobile,code:int},
       header: { 'Abz-Request-Id':wx.getStorageSync('enterRequesId') ,'X-Requested-With': 'XMLHttpRequest'},
       success(res){
				 console.log(res.data)
         wx.hideLoading()
          if(res.data.code==200){
            //元素X轴坐标等于可移动范围的最大值
            // console.log(that.data.w)
            that.setData({
              show:false,
            })
            setTimeout(function(){
              that.setData({
                store:false
              })
              that.triggerEvent('myevent', { head: res.header["Abz-Request-Id"],store:true});
              // taht.triggerEvent('head', res.header["Abz-Request-Id"])
            },1000)

          }else {
            wx.showToast({
              icon: 'none',
              title: '滑动位置错误',
            })
            that.setData({
              left:0,
							zhe:0
            })
            that.triggerEvent('myevent', false);
          }
       }
     })
      // wx.request({
      //   url: http +'/member/moveImagesCheck?tn_r='+int,
      //   header: {'Abz-Request-Id': that.data.abzId},
      //   success(res){
      //     // console.log(res.header["Abz-Request-Id"])
      //     wx.hideLoading()
      //     if(res.data.code==200){
      //       //元素X轴坐标等于可移动范围的最大值
      //       // console.log(that.data.w)
      //       that.setData({
      //         show:false,
      //       })
      //       setTimeout(function(){
      //         that.setData({
      //           store:false
      //         })
      //         that.triggerEvent('myevent', { head: res.header["Abz-Request-Id"],store:true});
      //         // taht.triggerEvent('head', res.header["Abz-Request-Id"])
      //       },1000)
            
      //     }else {
      //       wx.showToast({
      //         icon: 'none',
      //         title: res.data.msg,
      //       })
      //       that.setData({
      //         left:0,
      //       })
      //       that.triggerEvent('myevent', false);
      //     }
      //   }
      // })
      if (this.data.x >= this.data.w) {
        //元素X轴坐标等于可移动范围的最大值
        // this.data.xAxial = this.data.w;
        // //设置验证成功提示语
        // this.data.succeedMsg = '验证成功';
        // //设置detail对象的返回值
        // detail.msg = true;
        // //验证成功后，禁止滑块滑动
        // this.data.pullStatus = false;
        this.data.xAxial = 0;
        //清空验证成功提示语
        this.data.succeedMsg = '';
        //设置detail对象的返回值
        detail.msg = false;
      } else {
        //元素X轴坐标归0
        this.data.xAxial = 0;
        //清空验证成功提示语
        this.data.succeedMsg = '';
        //设置detail对象的返回值
        detail.msg = false;
      }

      //使用triggerEvent事件，将绑定在此组件的myevent事件，将返回值传递过去
      // this.triggerEvent('myevent', this.data.show);
      //根据获取到的X轴坐标进行动画演示
      this.data.cssAnimation = 'translate3d(' + this.data.xAxial + 'px, 0, 0)';

      this.setData({
        succeedMsg: this.data.succeedMsg,
        cssAnimation: this.data.cssAnimation
      })
    }
  }
})
