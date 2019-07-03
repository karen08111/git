<template>
	<div class="main" v-wechat-title="$route.meta.title=info.name">
		<div class="user-info">
			<div class="user-left">
				<div class="user-name">
					<span class="name-title">{{info.name}}</span>
					<img v-if="info.sex=='男'" src="../../assets/images/nans.png"/>
					<img v-if="info.sex=='女'" src="../../assets/images/nvs.png"/>
					<span class="user-job" v-if="info.work_type">{{info.work_type}}</span>
				</div>
				<div class="user-job-list">
					<span class="border-left">{{info.has_bad_medical_history}}病史</span>
					<span class="border-right border-left">{{info.min_pay==0?'面议':info.min_pay+'/'+info.quantity_unit}}</span>
					<span class="border-right border-left" v-if="info.birth">{{info.birth}}岁</span>
					<span class="border-right border-left" v-if="!info.birth">未知</span>
					<span class="border-right" v-if="info.work_time">工作年限:{{info.work_time[0] || info.work_time}}年</span>
				</div>
				<!--<div class="user-phone">
					<span><i class="iconfont icon-dianhua"></i>110</span>
					<span class="phone"><i class="iconfont icon-weixin"></i>wx</span>
				</div>-->
			</div>
			<div class="user-avatar">
				<img v-if="info.avatar" :src="baseURL+info.avatar"/>
				<img v-else src="../../assets/none.png"/>
				<span>{{info.current_state}}</span>
			</div>
		</div>
		<!--工作经历-->
		<div class="job-list" v-if="job_case">
			<p class="job-list-title"><span></span>工作经历</p>
			<router-view/>
			<div class="job-li" v-for="(p,index) in job_case" :key="index">
				<p class="job-title-name">
					<span class="job-job-name">{{p.ach_name}}</span>
					<span class="job-time">{{p.start_time}}/{{p.end_time}}</span>
				</p>
				<div class="user-job-list">
					<span class="border-left">{{p.region[0].title}}-{{p.region[1].title}}</span>
					<!--<span class="border-right border-left">35随</span>-->
				</div>
				<p class="job-content">{{p.content}}</p>
			</div>
			<p class="job-content" v-if="!jobShow">暂无信息</p>
		</div>
		<!--资质证书-->
		<div class="book" v-if="seniority">
			<p class="job-list-title"><span></span>资质证书</p>
			<div class="book-list" v-for="p in seniority">
				<div class="book-li">
					<img :src="baseURL+img_path"/>
					<p class="book-title">{{p.seniority_name}}</p>
					<p class="book-leve">{{p.credential_level_type.title}}</p>
				</div>
			</div>
		</div>
		<!--个人介绍-->
		<div class="content">
			<p class="job-list-title"><span></span>个人介绍</p>
			<p class="job-content">{{info.content}}</p>
		</div>
		<!--推荐-->
		<p class="job-list-title" style="background: #FFFFFF; padding: 0.25rem;"><span></span>推荐个人</p>
		<div class="tui-list">
			<infoList v-for="(p,index) in list" :list="p" :key="index" type="geren"></infoList>
		</div>
		<div class="bottom-list">
			<span class="guan" @click="guanzhu" v-if="isReset==0">关注</span>
			<span class="guan" @click="quguan" v-else>取消关注</span>
			<span class="lianxi" @click="lianxi">立即联系</span>
		</div>
		<div class="zhezhao" v-if="isshows">
			
		</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				isshows:false,
				Dialog:Dialog,
				baseURL:baseURL,
				id:'',
				list:null,
				isReset:0,
				info:'',
				user:null,
				recomList:null,
				seniority:null,
				job_case:null,
				jobShow:false,
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getRequest()
		},
		watch: {
			$route(to,from){
				this.id = to.params.id
				this.getRequest()
			}
		},
		methods: {
			getRequest() {
				var that = this
				that.$http.get("/resume/detail/"+that.id).then(res=>{
//					console.log(res.data)
					if(res.code==200){
						that.info=res.data.info
						that.user = res.data 
						that.list = res.data.push;
						that.seniority = res.data.seniority
						that.job_case = res.data.job_case
						this.jobShow = res.data.job_case.length
					}
				}).then(_ => {
          that.fenxiang()
        })
				//获取是否关注
				if(this.$cookies.get("name")){
					that.$http.get("/member/seeReleaseFollow?follow_id="+that.id+"&follow_type=1").then(res=>{
						if(res.code==200){
							that.isReset=res.msg
						}
					})
				}
			},
			guanzhu(){
				var that = this
				that.$http.get("/member/inReleaseFollow?follow_id="+this.id+"&follow_type=1").then(res=>{
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
			quguan(){
				var that = this
				that.$http.get("/member/offReleaseFollow?follow_id="+this.id+"&follow_type=1").then(res=>{
					if(res.code==200){
						this.isReset=0
					}
				})
			},
			lianxi(){
				var that = this
				that.$http.get("/member/getInfoMobile/"+that.id+'/1').then(res=>{
					if(res.code==200){
						that.isshows = true
						that.mobile = res.data
						that.Dialog.confirm({
						  title: '是否立即拨打电话?',
						  message: res.data
						}).then(() => {
						  // on confirm
						  that.isshows = false
						  window.location.href = 'tel://' + res.data;
						}).catch(() => {
						  // on cancel
						  that.isshows = false
						});
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
	.bottom-list{
		z-index: 99;
		position: fixed;
		bottom: 0.9rem;
		left: 0.25rem;
		width: 7rem;
		height: 0.8rem;
		display: flex;
		font-size: 0.32rem;
		text-align: center;
		line-height: 0.8rem;
		justify-content: space-between;
		letter-spacing: 0.02rem;
		background: #FFFFFF;
		.guan{
			display: inline-block;
			width: 2.3rem;
			height: 100%;
			background-color: #d6e7ff;
			border-radius: 0.1rem;
			border: solid 0.01rem #3388ff;
			color: #3388ff;
		}
		.lianxi{
			display: inline-block;
			width:4.4rem;
			height: 100%;
			background-color: #3388ff;
			border-radius: 0.1rem;
			color: #ffffff;
		}
	}
	.zhezhao{
		background: #000000;
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
	.main{
		position: relative;
		padding-bottom: 1.5rem;
		box-sizing: border-box;
		
		background: #fafafa;
	}
	.content{
		padding: 0.3rem 0 0.3rem 0;
		box-sizing: border-box;
		width: 7rem;
		
		margin: auto;
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
		display: flex;
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
	.job-list{
		width: 7rem;
		margin: auto;
		margin-top: 0.3rem;
		border-bottom: 0.01rem solid #d9d9d9;
		padding-bottom: 0.3rem;
		box-sizing: border-box;
	}
	.job-li{
		line-height: 0.4rem;
		margin-top: 0.2rem;
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
	.job-job-name{
		font-size: 0.32rem;
		letter-spacing: 0.02rem;
		color: #343434;
		font-weight: 400;
		
	}
	.job-time{
		font-size: 0.24rem;
		color: #999999;
		float: right;
	}
	.job-content{
		margin-top: 0.1rem;
		font-size: 0.22rem;
		letter-spacing: 0.02rem;
		color: #666666;
		line-height: 0.36rem;
		white-space: pre-line;
	}
.clear{
	clear: both;
}
	.user-info{
		width: 7rem;
		height: 1.6rem;
		margin: auto;
		line-height: 0.7rem;
		padding: 0.2rem 0 0.2rem 0;
		box-sizing: border-box;
		border-bottom: 0.01rem solid #d9d9d9;
		.user-name{
			display: flex;
			.name-title{
				font-size: 0.5rem;
				letter-spacing: 0.03rem;
				color: #000000;
				font-weight: 500;
			}
			.user-job{
				display: inline-block;
				margin-left: 0.1rem;
				background-color: #ffffff;
				border-radius: 0.25rem;
				border: solid 0.01rem #f7b336;
				font-size: 0.28rem;
				height: 0.5rem;
				line-height: 0.5rem;
				text-align: center;
				padding-left: 0.1rem;
				padding-right: 0.1rem;
				
			}
			img{
				width: 0.26rem;
				height: 0.26rem;
			}
		}
		
	}
	.user-left{
		float: left;
	}
	.user-job-list{
		span{
			font-size: 0.22rem;
			letter-spacing: 0.02rem;
			color: #666666;
		}
		.border-left{
			padding-right: 0.1rem;
			border-right: 0.01rem solid #666666;
		}
		.border-right{
			padding-left: 0.1rem;
		}
	}
	.user-avatar{
		float: right;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 50%;
		overflow: hidden;
		position: relative;
		img{
			width: 100%;
			height: 100%;
		}
		span{
			position: absolute;
			bottom: 0;
			left: 0;
			display: inline-block;
			width: 100%;
			height: 0.44rem;
			background: #FFFFFF;
			opacity: 0.8;
			font-size: 0.22rem;
			color: #4d4d4d;
			text-align: center;
			line-height: 0.44rem;
		}
	}
	.user-phone{
		font-size: 0.28rem;
		color: #666666;
		.phone{
			margin-left: 0.2rem;
		}
	}
</style>