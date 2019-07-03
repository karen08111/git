<template>
	<div class="main">
		<div class="zhezhao" v-if="zhe"></div>
		<div class="compay">
			<div class="compay-list">
				<p class="compay-name">{{info.name}}</p>
				<p class="compay-xia">{{info.office_mobile}}</p>
				<p class="compay-xia">{{info.official_website}}</p>
				<p class="compay-xia">{{info.enterprise_email}}</p>
				<p class="compay-xia">{{info.company_address}}</p>
			</div>
			<div class="compay-avatar">
				<img :src="info.avatar?baseURL+info.avatar:'../../assets/none.png'"/>
				<p @click="guan" v-if="isReset==0">关注</p>
				<p @click="quguan" v-else>取消关注</p>
			</div>
		</div>
		<!--资质证书-->
		
		<div class="book" v-if="isseniority">
			<p class="job-list-title"><span></span>资质证书</p>
			<div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<div class="book-list" v-for="(p,index) in seniority" :key="index">
					<div class="book-li">
						<img :src="baseURL+p.img_path" @click="lanBook(index)"/>
						<p class="book-title">{{p.seniority_name}}</p>
						<p class="book-leve" v-if="p.credential_level_type">{{p.credential_level_type.title}}</p>
					</div>
				</div>
			</div>
			
		</div>
		<!--公司图集-->
		<div class="book" v-if="isTu">
			<p class="job-list-title"><span></span>公司图集</p>
			<div class="photo-list">
				<img :src="baseURL+p.path" v-for="(p,index) in info.imgs" @click="lans(index)"/>
			</div>
		</div>
		<div class="content">
			<p class="job-list-title"><span></span>企业介绍</p>
			<p class="job-content">{{info.content}}</p>
		</div>
		<p class="job-list-title"><span></span>推荐企业</p>
		<BigProject :list="list" type="compayMain"></BigProject>
		<!--<infoList  v-for="(p,index) in list" :list="p" type="projectDetail"></infoList>-->
		<div class="zhezhaos" v-if="isshows"></div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { ImagePreview } from 'vant'
	import { Dialog } from 'vant'
	export default {
		data() {
			return {
				Dialog:Dialog,
				isshows:false,
				zhe:false,
				ImagePreview:ImagePreview,
				baseURL:baseURL,
				info:'',
				id:'',
				uid:'',
				user:null,
				list:[],
				isReset:0,
				seniority:null,
				instance:null,
				seniorityYu:null,
				isTu:false,
				isseniority:false,
			}
		},
		created() {
			var that =this
			this.id = this.$route.params.id	
			this.$http.get("/company/"+this.id).then(res=>{
				if(res.code==200){
//					console.log(res.data)
					this.seniority = res.data.info.senioritys
					this.user=res.data
					this.info= res.data.info
					this.list=res.data.push
					this.uid = res.data.info.uid
					if(this.info.imgs.length>0){
						this.isTu = true
					}
					if(this.seniority.length>0){
						this.isseniority = true
					}
					this.fenxiang();
//					console.log(this.list)
					if(this.$cookies.get("name")){
						that.$http.get("/member/seeFollow/"+res.data.info.uid).then(r=>{
							if(r.code==200) {
								that.isReset = r.msg
							}
						})
					}
					
				}
			})
			
		},
		mounted() {
			var that = this;
			window.addEventListener("popstate", function(e) {
				if(that.instance){
					that.instance.close();
				}
			}, false);
		},
		watch: {
			$route(to,from){
				var that = this
				this.id = to.params.id
				this.$http.get("/company/"+this.id).then(res=>{
					if(res.code==200){
						this.seniority = res.data.seniority
//						console.log(this.seniority)
						this.user=res.data
						this.info= res.data.info
						this.list=res.data.push
						this.uid = res.data.info.uid
						this.fenxiang();
	//					console.log(this.list)
						if(this.$cookies.get("name")){
							this.$http.get("/member/seeFollow/"+res.data.info.uid).then(r=>{
								if(r.code==200) {
									that.isReset = res.msg
								}
							})
						}
						
					}
				})
			}
		},
		methods: {
			//预览
			lans(index) {
				this.zhe=true
				var imgs =[]
				for(let i in this.info.imgs){
					imgs[i] =this.baseURL+ this.info.imgs[i].path
				}
        var that = this
				that.instance  = this.ImagePreview({
				  images: imgs,
				  startPosition: index,
				  // asyncClose:true,
				  showIndex:true,
				  onClose() {
				    // do something
				    that.zhe = false
				  }
				});
			},
			lanBook(index) {
				this.zhe = true
				var imgs = []
				for(let i in this.seniority){
					imgs[i] = this.baseURL+this.seniority[i].img_path
				}
        var that = this
				that.instance  = this.ImagePreview({
				  images: imgs,
				  startPosition: index,
				  // asyncClose:true,
				  showIndex:true,
				  onClose() {
				    // do something
				    that.zhe = false
				  }
				});
			},
			guan() {
				var that = this
				this.$http.get("/member/inFollow/"+this.uid).then(res=>{
//					console.log(res)
					if(res.code==200){
						this.isReset=1
					}else if(res.code == 1403) {
						that.isshows = true
						that.Dialog.confirm({
						  message: res.msg,
						  confirmButtonText:'去登录',
						  cancelButtonText:'继续逛逛',
						}).then(() => {
							that.$router.push("/login")
							that.isshows = false
						  // on confirm
						}).catch(() => {
						  // on cancel
						  that.isshows = false
						});
					}
				})
			},
			quguan() {
				this.$http.get("/member/offFollow/"+this.uid).then(res=>{
					if(res.code==200){
						this.isReset=0
					}
				})
			},
			//分享
			fenxiang() {
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
			        //处理验证成功的信息
			        wx.ready(function () {
			        	//发送给朋友
						wx.onMenuShareAppMessage({
							title: that.info.name, // 分享标题
							desc: that.info.content, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.baseURL+that.info.avatar, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
							// 用户点击了分享后执行的回调函数
							}
						});
						wx.onMenuShareTimeline({
							title: that.info.name, // 分享标题
						    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						    imgUrl: that.baseURL+that.info.avatar, // 分享图标
						    success: function () {}
						})
						//QQ
						wx.onMenuShareQQ({
							title: that.info.name, // 分享标题
							desc: that.info.content, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.baseURL+that.info.avatar, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
						});
						//QQ空间
						wx.onMenuShareQZone({
							title: that.info.name, // 分享标题
							desc: that.info.content, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.baseURL+that.info.avatar, // 分享图标
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
	background: #66666603;
}
	.zhezhao{
		background: #000000;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}
	.zhezhaos{
		background: #000000;
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
	.compay{
		display: flex;
		padding: 0.25rem;
		box-sizing: border-box;
	}
	.compay-list{
		width: 5.5rem;
		line-height: 0.6rem;
		.compay-name{
			font-size: 0.38rem;
			font-weight: 450;
			letter-spacing: 0.02rem;
			color: #000000;
		}
		.compay-xia{
			font-size: 0.28rem;
			color: #666666;
		}
	}
	.compay-avatar{
		width: 1.5rem;
		img{
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
      object-fit: cover;
		}
		p{
			width: 1.5rem;
			height: 0.6rem;
			border-radius: 0.1rem;
			background: #d6e7ff;
			color: #3388ff;
			border: 0.01rem solid #3388FF;
			font-size: 0.32rem;
			line-height: 0.6rem;
			text-align: center;
			margin-top: 0.1rem;
		}
	}
	.photo-list{
		display: flex;
		margin-top: 0.1rem;
		flex-wrap: wrap;
		img{
			width: 2.2rem;
			height: 1.7rem;
			border-radius: 0.04rem;
			margin-left: 0.1rem;
			margin-top: 0.2rem;
		}
	}
	.job-list-title{
		display: flex;
		width: 7rem;
		margin: auto;
		font-size: 0.38rem;
		color: #343434;
		font-weight: 450;
		span{
			display: inline-block;
			width: 0.12rem;
			height: 0.12rem;
			background: #3388ff;
			border-radius: 50%;
			position: relative;
			top: 0.1rem;
			margin-right: 0.2rem;
		}
	}
	.book{
		border-bottom: 0.01rem solid #d9d9d9;
		padding-top: 0.3rem;
		width: 7rem;
		margin: auto;
		padding-bottom: 0.3rem;
		box-sizing: border-box;
	}
	.book-list{
		justify-content: space-between;
		margin-top: 0.2rem;
		.book-li{
			width: 3.3rem;
			height: 3.58rem;
			background: #fafafa;
			margin-bottom: 0.1rem;
			border-radius: 0.1rem;
			text-align:center;
			img{
				width: 3.1rem;
				height: 2.2rem;
				margin-top: 0.1rem;
				border-radius: 0.1rem;
			}
			.book-title{
				font-size: 0.28rem;
				letter-spacing: 0.01rem;
				color: #343434;
				font-weight: 400;
				margin-top: 0.1rem;
				margin-bottom: 0.1rem;
			}
			.book-leve{
				width: 1rem;
				height: 0.3rem;
				text-align: center;
				margin: auto;
				line-height: 0.3rem!important;
				font-size: 0.22rem;
				letter-spacing: 0.01rem;
				color: #666666;
				border-radius: 0.15rem;
				border:0.01rem solid #f7b336;
				margin-top: 0.2rem;
			}
		}
	}
	.job-content{
		margin-top: 0.1rem;
		font-size: 0.22rem;
		letter-spacing: 0.02rem;
		color: #666666;
		line-height: 0.36rem;
		white-space: pre-line;
	}
	.content{
		padding: 0.3rem 0 0.3rem 0;
		box-sizing: border-box;
		width: 7rem;
		
		margin: auto;
	}
</style>