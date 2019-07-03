<template>
	<div class="main">
		<!--企业基本信息-->
		<div class="enter">
			<div class="enter-list">
				<p class="job-list-title" style="margin-top: 0.25rem;width: 100%;position: relative;margin-bottom: 0.25rem;">{{name}}
					<router-link class="you  abset" to="/enterBasic">
						<img src="../../../../assets/images/set3.png"/>
					</router-link>
				</p>
				<p class="enter-name" v-if="enterDetail">
					<van-icon name="phone-o" size="20px" />
					<span>{{enterDetail.office_mobile}}</span>
				</p>
				<p class="enter-name" v-if="enterDetail">
					<van-icon name="send-gift-o"  size="20px"/>
					<span>{{enterDetail.fax_number}}</span>
				</p>
				<p class="enter-name" v-if="enterDetail">
					<van-icon name="envelop-o"  size="20px"/>
					<span>{{enterDetail.enterprise_email}}</span>
				</p>
				<p class="enter-name" v-if="enterDetail">
					<van-icon name="hotel-o" size="20px" />
					<span>{{enterDetail.official_website}}</span>
				</p>
			</div>
			<div class="enter-avatar" v-if="enterDetail">
				<img :src="enterDetail.avatar?baseURL+enterDetail.avatar:'../../../../assets/none.png'"/>
			</div>
		</div>
		<!--地图-->
			<div class="loca" v-if="enterDetail">
				<van-icon name="location-o" size="20px" />
				<span>{{enterDetail.company_address}}</span>
			</div>
			<baidu-map class="map" :center="center" v-if="center.lng" :zoom="15">
				<bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
			      <bm-label v-if="enterDetail" :content="enterDetail.company_address" :labelStyle="{color: 'red', fontSize : '0.2rem'}" :offset="{width: -20, height: 30}"/>
			    </bm-marker>
			</baidu-map>
		<p class="job-list-title" style="margin-top: 0.25rem;"><span></span>资质证书
			<router-link class="you  abset" to="/enterBook">
				<img src="../../../../assets/images/set3.png"/>
			</router-link>
		</p>
		<!--资质证书-->
		<div class="book" v-if="seniority" >
			<div class="book-list" v-for="(p,index) in seniority" v-if="p.is_show==1 && p.isuse == 1">
				<div class="book-li">
					<img :src="baseURL+p.img_path" @click="senImgs(index)"/>
					<p class="book-title">{{p.seniority_name}}</p>
					<p class="book-leve">{{p.credential_level_type.title}}</p>
				</div>
			</div>
		</div>
		<p class="job-list-title" style="margin-top: 0.25rem;"><span></span>公司图集
			<router-link class="you  abset" to="/enterPhoto">
				<img src="../../../../assets/images/set3.png"/>
			</router-link>
		</p>
		<!--公司图集-->
		<div class="book">
			<div class="photo-list">
				<img :src="baseURL+p.path" v-for="(p,index) in imgs" @click="lans(index)"/>
			</div>
		</div>
		<div class="content">
			<p class="job-list-title"><span></span>企业介绍
				<router-link class="you  abset" to="/enterContent">
					<img src="../../../../assets/images/set3.png"/>
				</router-link>
			</p>
			<p class="job-content" v-if="enterDetail">{{enterDetail.content}}</p>
		</div>
		<div class="zhezhao" v-if="zhe"></div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
//	import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
	import { ImagePreview } from 'vant'
	export default {
		data() {
			return {
				ImagePreview:ImagePreview,
				baseURL:baseURL,
				seniority:[],
				enter:null,
				enterDetail:null,
				name:null,
				imgs:[],
				center: {lng: null, lat: null},
				zoom:15,
				show:false,
				zhe:false,
				instance:null,
			}
		},
		mounted() {
			var that = this;
			window.addEventListener("popstate", function(e) {
				if(that.instance){
					that.instance.close();
				}
			}, false);
		},
		created() {
			this.getUser();
		},
		methods:{
			getUser() {
				this.$http.get("/member/companypage").then(res=>{
					if(res.code == 200 ){
//						var detail = res.data.company.detail;
						this.center = {
							lng:res.data.company.detail.map_pos.split(",")[0],
							lat:res.data.company.detail.map_pos.split(",")[1]
						}
						this.name = res.data.company.company_name;
						this.enter = res.data.company;
						this.imgs = res.data.company.detail.imgs
						this.enterDetail = res.data.company.detail;
						this.seniority = res.data.company.seniority;
						
					}
				})
			},
			lans(index) {
				this.zhe=true
				var imgs =[]
				for(let i in this.imgs){
					imgs[i] =this.baseURL+ this.imgs[i].path
				}
				var that = this
				that.instance  = this.ImagePreview({
				  images: imgs,
				  startPosition: index,
				  asyncClose:true,
				  showIndex:true,
				  onClose() {
				    // do something
				    that.zhe = false
				  }
				});
			},
			senImgs(index) {
				this.zhe=true
				var imgs =[]
				for(let i in this.seniority){
					if(this.seniority[i].is_show==1 && this.seniority[i].isuse == 1){
						imgs[i] =this.baseURL+ this.seniority[i].img_path
					}
					
				}
				var that = this
				that.instance  = this.ImagePreview({
				  images: imgs,
				  startPosition: index,
				  asyncClose:true,
				  showIndex:true,
				  onClose() {
				    // do something
				    that.zhe = false
				  }
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.main{
		position: relative;
		padding-bottom: 1.5rem;
		box-sizing: border-box;
		background: #ffffff;
	}
	.map{
		width: 100%;
		height: 3.2rem;
	}
	.loca{
		width: 100%;
		height: 0.56rem;
		font-size: 0.24rem;
		padding-top: 0.1rem;
		box-sizing: border-box;
		letter-spacing: 0.02rem;
		color: #666666;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		box-sizing: border-box;
		box-shadow: 0 -0.02rem 0.04rem 0 
		rgba(68, 68, 68, 0.1);
		span{
			position: relative;
			top: -0.1rem;
			line-height: 0.56rem;
			margin-left: 0.2rem;
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
	.enter{
		display: flex;
	}
	.enter-list{
		width: 70%;
		padding: 0.25rem;
		box-sizing: border-box;
		.enter-name{
			color: #666666;
			font-size: 0.28rem;
			line-height: 0.7rem;
			span{
				position: relative;
				top: -0.1rem;
				margin-left: 0.1rem;
			}
		}
	}
	.enter-avatar{
		margin-top: 0.5rem;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
			object-fit:cover;
		}
	}
	/*.enter-avatar img{
		width: 100%;
		height: 100%;
		object-fit:cover;
	}*/
	.abset{
		position: absolute;
		right: 0.25rem;
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
	.you img{
		width: 0.3rem!important;
		height: 0.3rem!important;
		margin-bottom: 0.1rem;
		border-radius: 0!important;
		object-fit: cover;
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