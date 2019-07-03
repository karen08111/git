<template>
	<div class="main" v-wechat-title="">
		<div class="user-info">
			<div class="user-left">
				<div class="user-name">
					<span class="name-title">{{name}}</span>
					<img v-if="info.sex==0" src="../../../../assets/images/nans.png"/>
					<img v-if="info.sex==1" src="../../../../assets/images/nvs.png"/>
					<span class="user-job">{{work_type}}</span>
				</div>
				<div class="user-job-list">
					<span class="border-left">{{info.has_bad_medical_history==0?'无病史':'有病史'}}</span>
					<span class="border-right border-left">{{info.min_pay==0?'面议':info.min_pay+'/'+timeName}}</span>
					<!--<span class="border-right border-left">{{info.birth}}岁</span>-->
					<span class="border-right" v-if="work_time">工作年限:{{work_time[0]}}年</span>
				</div>
				<div class="user-phone">
					<span><van-icon name="phone-o"></van-icon>{{info.mobile}}</span>
					<span class="phone"><van-icon name="chat-o"></van-icon>{{info.wechat_number}}</span>
				</div>
			</div>
			<div class="user-avatar">
				<img v-if="avatar" :src="baseURL+avatar"/>
				<img v-else src="../../../../assets/none.png"/>
				<span>{{info.current_state==0?'空闲中':'工作中'}}</span>
				<router-link class="you" to="/addBasic">
					<img src="../../../../assets/images/set3.png"/>
				</router-link>
			</div>
			
		</div>
		<div class="clear"></div>
		<!--工作经历-->
		<div class="job-list" v-if="job_case">
			<p class="job-list-title"><span></span>工作经历
			</p>
			<!--xunhuan-->
			<div class="job-li" v-for="(p,index) in job_case" :key="index">
				<p class="job-title-name">
					<span class="job-job-name">{{p.ach_name}}</span>
					<span class="job-time">{{p.start_time}}-{{p.end_time}}</span>
					<router-link class="you  abset" :to="`/addJob/${p.id}`">
						<img src="../../../../assets/images/set3.png"/>
					</router-link>
				</p>
				<div class="user-job-list">
					<span class="border-left" v-if="p.job_type">{{p.job_type.Sub.title}}</span>
					<span class="border-right">{{p.region[0].title}}-{{p.region[1].title}}</span>
				</div>
				<p class="job-content">{{p.content}}</p>
			</div>
			<div class="addJob" @click="addJob">添加工作经历</div>
			<!--<div class="job-li" v-for="(p,index) in job_case" :key="index">
				<p class="job-title-name">
					<span class="job-job-name">{{p.ach_name}}</span>
					<span class="job-time">{{p.start_time}}/{{p.end_time}}</span>
				</p>
				<div class="user-job-list">
					<span class="border-left">{{p.region[0].title}}-{{p.region[1].title}}</span>
					<span class="border-right border-left">35随</span>
				</div>
				<p class="job-content">{{p.content}}</p>
			</div>-->
		</div>
		<p class="job-list-title" style="margin-top: 0.25rem;"><span></span>资质证书
			<router-link class="you  abset" to="/addBook">
				<img src="../../../../assets/images/set3.png"/>
			</router-link>
		</p>
		<!--资质证书-->
		<div class="book" v-if="seniority" >
			<div class="book-list" v-for="(p,index) in seniority" v-if="p.is_show==1 && p.isuse == 1">
				<div class="book-li">
					<img :src="baseURL+p.img_path" @click="lans(index)"/>
					<p class="book-title">{{p.seniority_name}}</p>
					<p class="book-leve">{{p.credential_level_type.title}}</p>
				</div>
			</div>
		</div>
		<!--个人介绍-->
		<div class="content">
			<p class="job-list-title"><span></span>个人介绍
				<router-link class="you  abset" to="/addContent">
					<img src="../../../../assets/images/set3.png"/>
				</router-link>
			</p>
			<p class="job-content">{{info.content}}</p>
		</div>
		<div class="zhezhao" v-if="zhe"></div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { Dialog } from 'vant';
	import { ImagePreview } from 'vant'
	export default {
		data() {
			return {
				timeName:null,
				name:'',
				work_type:'',
				work_time:null,
				avatar:null,
				Dialog:Dialog,
				baseURL:baseURL,
				info:{},
				job_case:[],
				seniority:[],
				zhe:false,
				instance:null,
				ImagePreview:ImagePreview,
			}
		},
		created() {
			
		},
		mounted() {
			this.getInfo();
			var that = this;
			window.addEventListener("popstate", function(e) {
				if(that.instance){
					that.instance.close();
				}
			}, false);
		},
		watch: {
			$route(to,from){
				
			}
		},
		computed: {
			arr() {
				
			}
		},
		methods: {
			getInfo() {
				this.$http.get("/member/resume/edit").then(res=>{
					if(res.code == 200){
//						console.log(res.data)
						this.info = res.data.detail
						this.job_case = res.data.jobCase
						this.seniority = res.data.seniority
						this.name = res.data.detail.name
						if( res.data.detail.work_type) this.work_type = res.data.detail.work_type.title
						if(res.data.detail.avatar.length>0) this.avatar = res.data.detail.avatar
						if(res.data.detail.quantity_unit.unit) this.timeName = res.data.detail.quantity_unit.unit
						this.work_time = res.data.detail.work_time
					}
				})
			},
			addJob() {
//				this.$router.push('/addJob/'+'add',query: { id: '2' ,urls:'/teamList' })
				this.$router.push({ path: '/addJob/'+'add',query: { id: this.info.id}})
			},
			lans(index) {
				this.zhe=true
				var imgs =[]
				for(let i in this.seniority){
					if(this.seniority[i].is_show==1 && this.seniority[i].isuse == 1){
						imgs.push(this.baseURL+ this.seniority[i].img_path)
					}
				}
				var that = this
				that.instance  = this.ImagePreview({
				  images: imgs,
//				  startPosition: index,
				  asyncClose:true,
				  showIndex:true,
				  onClose() {
				    // do something
				    that.zhe = false
				  }
				});
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
	.you {
		/*margin: auto;*/
	}
	.abset{
		position: absolute;
		right: 0.25rem;
	}
	.addJob{
		width:6.9rem;
	    height: 0.9rem;
	    line-height: 0.9rem;
	    background-color: #ffffff;
		border-radius: 0.1rem;
		border: solid 0.01rem #dddddd;
	    font-size: 0.28rem;
	    text-align: center;
	    letter-spacing: 0.03rem;
	    color: #333333;
	    margin-bottom: 0.3rem;
	    margin-top: 0.3rem;
	}
	.you img{
		width: 0.3rem!important;
		height: 0.3rem!important;
		margin-bottom: 0.1rem;
		border-radius: 0!important;
		object-fit: cover;
	}
	.bottom-list{
		z-index: 99;
		position: fixed;
		bottom: 1.01rem;
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
	.main{
		position: relative;
		padding-bottom: 1.5rem;
		box-sizing: border-box;
		
		background: #ffffff;
	}
	.clear{
		clear: both;
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.book-list{
		display: flex;
		justify-content: space-between;
		margin-top: 0.2rem;
		.book-li{
			width: 3.2rem;
			height: 3.58rem;
			background: #fafafa;
			margin-bottom: 0.1rem;
			border-radius: 0.1rem;
			padding: 0.1rem;
			box-sizing: border-box;
			text-align:center;
			img{
				width: 3rem;
				height: 2.2rem;
				object-fit: cover;
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
		/*margin-top: 0.7rem;*/
		border-bottom: 0.01rem solid #d9d9d9;
		padding-bottom: 0.3rem;
		box-sizing: border-box;
	}
	.job-li{
		line-height: 0.4rem;
		margin-top: 0.2rem;
	}
	.you{
		/*position: absolute;*/
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
		margin-right: 0.5rem;
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
		/*height:2.5rem;*/
		display: flex;
		margin: auto;
		line-height: 0.7rem;
		padding: 0.2rem 0 0.2rem 0;
		box-sizing: border-box;
		border-bottom: 0.01rem solid #d9d9d9;
		margin-bottom: 0.3rem;
		.user-name{
			display: flex;
			flex-wrap:wrap;
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
				object-fit: cover;
			}
		}
		
	}
	.user-left{
		/*float: left;*/
		width: 78%;
		/*display: flex;*/
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
		height: 1.8rem;
		text-align: center;
		overflow: hidden;
		position: relative;
		img{
			width: 100%;
			height: 1.3rem;
			border-radius: 50%;
			object-fit: cover;
		}
		span{
			position: absolute;
			bottom: 0.5rem;
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
		/*border-bottom: 0.01rem solid #d9d9d9;*/
		.phone{
			margin-left: 0.2rem;
		}
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
</style>