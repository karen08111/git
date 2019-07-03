<template>
	<div class="main">
		<img src="http://resource.aibanzhuan.cn/ingenuity/rz_bg.jpg"/>
		<div class="form">
			<p class="list">
				<input type="text"  v-model="name" placeholder="请填写您的姓名" />
			</p>
			<p class="list">
				<input type="number" v-model="phone" placeholder="请填写手机号码" />
			</p>
			<p class="list">
				<input type="text" v-model="lei" placeholder="请填写服务类型" />
			</p>
      <button class="tijiao" @click="submits">提交信息</button>
		</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	export default {
		data() {
			return {
				name:'',
				phone:'',
				lei:''
			}
		},
		mounted() {
			this.fenxiang();
			localStorage.setItem("liuPage",1);
    		localStorage.setItem("liuScroll",0);
		},
		
		methods: {
			isPhone(phone) {
				let valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;// 手机号码校验规则
				if ( ! valid_rule.test(phone)) {
				            this.$toast.fail('手机号格式不正确')
				            return false;
				 }else {
				 	return true;
				 }
			},
			submits() {
				var that = this;
//				console.log(this.isPhone(this.phone))
				if(this.name && this.phone){
					if(this.isPhone(this.phone)){
						let formData = new FormData();
						formData.append("mobile",this.phone);
						formData.append("enter_name",this.name);
						formData.append("enter_type",this.lei)
						this.$http.post('/member/appEnter',formData).then(res=>{
							if(res.code ==200){
								that.$toast.success(res.msg)
								setTimeout(function(){
//									that.$router.push('/')
									window.location.href="http://town.aibanzhuan.cn/";
								},1500)
							}
						})
					}
					
				}else {
					this.$toast.fail('请填写姓名和手机号')
				}
			},
			fenxiang (){
		      	var formData = new FormData();
			    	formData.append('url',window.location.href)
						var that =this;
		//				console.log('测试')
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
		//	        console.log()
			
			
			         //处理验证失败的信息
			//      wx.error(function (res) {
			//        logUtil.printLog('验证失败返回的信息:',res);
			//      });
			        //处理验证成功的信息
			        wx.ready(function () {
			        	let urls = baseURL + '/material/logo.jpg';
			        	//发送给朋友
		//	          wx.updateAppMessageShareData({ 
		//						        title: that.title, // 分享标题
		//						        desc: that.content, // 分享描述
		//						        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		//						        imgUrl: that.avatar, // 分享图标
		//						});
								wx.onMenuShareAppMessage({
									title: '匠心小镇，一个专门针对工程领域的服务众包平台！', // 分享标题
									desc: '商家火热招募中……', // 分享描述
									link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: 'https://developer.api.qqdoubao.net/material/logo.jpg', // 分享图标
									type: '', // 分享类型,music、video或link，不填默认为link
									dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
									success: function () {
									// 用户点击了分享后执行的回调函数
									}
								});
								wx.onMenuShareTimeline({
									title:'匠心小镇，一个专门针对工程领域的服务众包平台！', // 分享标题
								    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								    imgUrl:'https://developer.api.qqdoubao.net/material/logo.jpg', // 分享图标
								    success: function () {}
								})
								//QQ
								wx.onMenuShareQQ({
									title: '匠心小镇，一个专门针对工程领域的服务众包平台！', // 分享标题
									desc: '商家火热招募中……', // 分享描述
									link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl:'https://developer.api.qqdoubao.net/material/logo.jpg', // 分享图标
									success: function () {
									// 用户确认分享后执行的回调函数
									},
									cancel: function () {
									// 用户取消分享后执行的回调函数
									}
								});
								//QQ空间
								wx.onMenuShareQZone({
									title: '匠心小镇，一个专门针对工程领域的服务众包平台！', // 分享标题
									desc: '商家火热招募中……', // 分享描述
									link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl:'https://developer.api.qqdoubao.net/material/logo.jpg', // 分享图标
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

<style scoped lang="less">
	.main{
		width: 100%;
		position: relative;
		/*padding-bottom: 19rem;*/
		box-sizing: border-box;
		height: 100%;
	}
	.main img{
		width: 100%;
	}
	.form{
		position: absolute;
    bottom: 3.2rem;
		left: 0;
    right: 0;
    margin: auto;
		background:url("http://resource.aibanzhuan.cn/ingenuity/rz_form_bg.png") no-repeat ;
		background-size: 100%;
		background-position: center center;
		width: 90%;
		height: 8.46rem;
		padding-top: 1.95rem;
		box-sizing: border-box;
	}
	.list{
    text-align: center;
	}
	.list input{
    width: 5.41rem;
    height: 0.75rem;
    border-radius: 0.1rem;
    margin: auto;
    margin-bottom:0.59rem ;
    font-family: AdobeHeitiStd-Regular;
    font-size: 0.24rem;
    letter-spacing: 0.01rem;
    padding: 0 0.33rem;
    box-sizing: border-box;

	}
	input::-webkit-input-placeholder{
    color: #818181;
	}
	.tijiao{
    display: block;
    width: 4.89rem;
    height: 0.76rem;
    background: url("http://resource.aibanzhuan.cn/ingenuity/rz_btn.png") no-repeat center / 100% 100%;
    margin: 0.76rem auto 0;
    font-family: AdobeHeitiStd-Regular;
    font-size: 0.34rem;
    letter-spacing: 0.02rem;
    color: #ffffff;
	}
</style>