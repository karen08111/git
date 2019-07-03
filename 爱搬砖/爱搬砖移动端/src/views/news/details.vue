<template>
  <div class="news_details" v-wechat-title="$route.meta.title='爱搬砖-新闻资讯'">
    <h1>{{title}}</h1>
    <div class="context" v-html="content"></div>
  </div>
</template>

<script>
	import { baseURL } from '@/axios'
  export default {
    name: "news_details",
    data() {
      return {
        title: '',
        content: '',
        img_path:'',
        abstract:'',
      }
    },
    watch: {
      title (val){
        document.title = val
      }
    },
    mounted() {
    	this.fenxiang();
    },
    created (){
      this.$http.get(`/detailsNews/${this.$route.params.id}`).then(res => {
//    	console.log(res)
      	this.abstract = res.data.abstract;
      	this.img_path = baseURL+res.data.img_path;
        const data = res.data
        this.title = data.title
        this.content = data.content
      })
    },
    methods: {
    	fenxiang (){
      	var formData = new FormData();
	    	formData.append('url',window.location.href)
				var that =this;
				this.$http.post('/common/third_auth/share_sign',formData).then(res=>{
					
					var obj =res.data;
					 wx.config({
	          debug: false,
	          appId: obj.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
	          timestamp:obj.timestamp, // 必填，生成签名的时间戳
	          nonceStr: obj.nonceStr, // 必填，生成签名的随机串
	          signature: obj.signature,// 必填，签名，见附录1
	          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
	          jsApiList: [
	            'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'
	          ]
	        });
	
	
	         //处理验证失败的信息
	//      wx.error(function (res) {
	//        logUtil.printLog('验证失败返回的信息:',res);
	//      });
	        //处理验证成功的信息
	        wx.ready(function () {
	        	//发送给朋友
//	          wx.updateAppMessageShareData({ 
//						        title: that.title, // 分享标题
//						        desc: that.content, // 分享描述
//						        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//						        imgUrl: that.img_path, // 分享图标
//						});
//						//分享朋友圈和QQ空间
//						wx.updateTimelineShareData({ 
//						        title: that.title, // 分享标题
//						        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//						        imgUrl: that.img_path, // 分享图标
//						});
						//
						wx.onMenuShareAppMessage({
							title: that.title, // 分享标题
							desc: that.abstract, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.img_path, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
							// 用户点击了分享后执行的回调函数
							}
						});
						wx.onMenuShareTimeline({
							title: that.title, // 分享标题
					    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: that.img_path, // 分享图标
					    success: function () {}
						})
						//QQ
						wx.onMenuShareQQ({
							title: that.title, // 分享标题
							desc: that.abstract, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.img_path, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
						});
						//QQ空间
						wx.onMenuShareQZone({
							title: that.title, // 分享标题
							desc: that.abstract, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.img_path, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
						});
	        });
					
				})
      }
    }
  }
</script>

<style lang="less">
  .news_details{
    padding: 0 0.3rem;
    h1{
      line-height: 1.5;
      font-family: MicrosoftYaHei;
      /*font-size: 0.18rem;*/
      color: #4d4d4d;
      text-align: center;
      margin: 0.4rem 0;
      font-weight: bold;
    }
    .context{
      *{
        font-family: MicrosoftYaHei;
        font-size: 0.26rem;
        color: #333333;
      }
      h1,h2,h3,h4,h5,h6{
        line-height: 1.5;
        font-family: MicrosoftYaHei;
        font-size: 0.3rem;
        color: #4d4d4d;
        margin: 0.4rem 0;
      }
      p{
        word-break: break-all;
        font-family: MicrosoftYaHei;
        font-size: 0.26rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.40rem;
        letter-spacing: 0.01rem;
        color: #333333;
        margin-bottom: 0.2rem;
      }
      img{
        display: block;
        max-width: 100%;
        margin: 0 auto 0.2rem;
      }
    }
  }
</style>