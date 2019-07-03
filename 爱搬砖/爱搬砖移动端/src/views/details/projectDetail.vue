<template>
	<div class="main">
		<div class="bai">
			<div class="shang">
				<div class="info-head">
					<div class="info-left">
						<p class="info-title">{{info.title}}</p>
						<div class="user-job-list">
							<span class="border-left">{{info.nums}}人</span>
							<span class="border-right border-left" v-if="info.region">{{info.region[0].title}}-{{info.region[1].title}}</span>
							<!--<span class="border-right border-left"></span>-->
							<span class="border-right">{{info.work_type}}</span>
						</div>
						<div class="user-phone">
							<span>地址:{{info.address}}</span>
							<!--<span class="phone">wx</span>-->
						</div>
					</div>
					<div class="info-avatar">
						<p>{{info.invest}}</p>
						<img :src="info.avatar?baseURL+info.avatar:'../../assets/none.png'"/>
					</div>
					<div class="clear"></div>
				</div>
				<div class="contents">
					<p class="content-title">{{info.update_time}}</p>
					<p class="content-main" v-if="info.work_time">{{info.name}}</p>
				</div>
			</div>
			<div class="content">
				<p class="job-list-title"><span></span>项目信息</p>
				<p class="job-content">立顶文号:{{info.approval_num}}</p>
				<p class="job-content">立顶级别:{{info.approval_level_num}}</p>
				<div class="jibieList">
					<span v-if="info.function_num">{{info.function_num}}</span>
					<span v-if="info.prj_size">{{info.prj_size}}</span>
					<span v-if="info.building_area">{{info.building_area}}</span>
					<span v-if="info.building_length">{{info.building_length}}</span>
				</div>
				<p class="job-content">{{info.content}}</p>
			</div>
			<div class="content">
				<p class="job-list-title"><span></span>项目施工许可证</p>
				<p class="job-content">项目编码:{{info.builder_licenseNum}}</p>
				<p class="job-content">施工许可证编号:{{info.prj_name}}</p>
			</div>
			<div class="content">
				<p class="job-list-title"><span></span>总承包单位信息</p>
				<p class="job-content">总承包单位:{{info.contractor_corp_name}}</p>
				<p class="job-content">统一社会信用代码:{{info.contractor_corp_code}}</p>
			</div>
			<p class="job-list-title top"><span></span>推荐项目</p>
		</div>
		<!--推荐信息-->
		<infoList v-for=" p in list" :list="p" type="projectDetail"></infoList>
		<div class="bottom-list">
			<span class="guan" @click="guanzhu" v-if="isReset==0">关注</span>
			<span class="guan" @click="quguan" v-else>取消关注</span>
			<span class="lianxi" @click="lianxi">立即联系</span>
		</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				Dialog:Dialog,
				id:'',
				nid:'',
				info:'',
				list:[],
				isReset:0,
				baseURL:baseURL,
				mobile:''
			}
		},
		created() {
//			console.log()
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
				this.$http.get("/project/detail/"+this.id).then(res=>{
					if(res.code==200){
//						console.log(res.data)
						that.info=res.data.info
						that.nid = res.data.info.nature
						that.list=res.data.push
					}
				})
				//获取是否关注
				if(this.$cookies.get("name")){
					that.$http.get("/member/seeReleaseFollow?follow_id="+that.id+"&follow_type=4").then(res=>{
						if(res.code==200){
							that.isReset=res.msg
						}
					})
				}
				this.fenxiang()
			},
			guanzhu(){
				var that = this
				that.$http.get("/member/inReleaseFollow?follow_id="+this.id+"&follow_type=4").then(res=>{
					if(res.code==200){
						this.isReset=1
					}
				})
			},
			quguan(){
				var that = this
				that.$http.get("/member/offReleaseFollow?follow_id="+this.id+"&follow_type=4").then(res=>{
					if(res.code==200){
						this.isReset=0
					}
				})
			},
			lianxi() {
				var that = this
				that.$http.get("/member/getInfoMobile/"+that.id+'/4').then(res=>{
					if(res.code==200){
						that.mobile = res.data
						that.Dialog.confirm({
						  title: '是否立即拨打电话?',
						  message: res.data
						}).then(() => {
						  // on confirm
						  window.location.href = 'tel://' + res.data;
						}).catch(() => {
						  // on cancel
						});
					}else {
						setTimeout(function(){
							that.$router.push("/login")
						},1500)
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
							title: that.info.title, // 分享标题
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
							title: that.info.title, // 分享标题
						    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						    imgUrl: that.baseURL+that.info.avatar, // 分享图标
						    success: function () {}
						})
						//QQ
						wx.onMenuShareQQ({
							title: that.info.title, // 分享标题
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
							title: that.info.title, // 分享标题
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
	.jibieList{
		display: flex;
		span{
			background-color: #ffffff;
			border-radius: 0.1rem;
			border: solid 0.01rem #cccccc;
			padding: 0.1rem;
			box-sizing: border-box;
			margin: 0.2rem 0.2rem 0 0;
		}
	}
	.main{
		background: #fafafa;
		padding-bottom: 0.8rem;
		box-sizing: border-box;
	}
	.bai{
		background: #FFFFFF;
		width: 100%;
		padding: 0.3rem;
		box-sizing: border-box;
	}
	.info-head{
		padding-bottom: 0.15rem;
		box-sizing: border-box;
		border-bottom: 0.01rem dashed #cccccc;
	}
	.shang{
		line-height: 0.44rem;
		padding: 0.2rem;
		padding-bottom: 0.1rem;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(51, 136, 255, 0.1);
		border-radius: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.info-left{
		float: left;
		width: 4.8rem;
	}
	.clear{
		clear: both;
	}
	.top{
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.info-avatar{
		width: 1.65rem;
		text-align: center;
		float: right;
		p{
			font-size: 0.32rem;
			color: #ff7856;
		}
		img{
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
		}
	}
	.contents{
		font-size: 0.22rem;
		color: #666666;
		margin-top: 0.1rem;
		line-height: 0.40rem;
	}
	.content{
		padding: 0.3rem 0 0.3rem 0;
		border-bottom: 0.01rem solid #B6B6B6;
		box-sizing: border-box;
		width: 7rem;
		margin: auto;
		margin-bottom: 0.25rem;
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
	.job-content{
		margin-top: 0.25rem;
		font-size: 0.22rem;
		letter-spacing: 0.02rem;
		color: #666666;
		line-height: 0.36rem;
		white-space: pre-line;
	}
	.content-main{
		
		white-space: pre-line;
	}
	.info-title{
		font-size: 0.32rem;
		color: #333333;
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
	.user-phone{
		font-size: 0.28rem;
		color: #666666;
		.phone{
			margin-left: 0.2rem;
		}
	}
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
</style>