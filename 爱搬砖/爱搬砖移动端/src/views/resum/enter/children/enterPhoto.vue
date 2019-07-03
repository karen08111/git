<template>
	<div class="photo-list">
		<div class="imgs" v-for="(item,index) in imgList">
			<img :src="baseURL+item.path" @click="isMenu?pick(index):yuLan(index)"/>
			<div class="pick-wai" v-if="isMenu"><span :class="item.store?'nei-active':'pick-nei'"></span></div>
		</div>
		<!--multiple-->
		<van-uploader :after-read="onRead" v-if="isMenu" accept="image, image/jpeg" >
			<div class="adds">
				<span class="su"></span>
				<span class="heng"></span>
			</div>
		</van-uploader>
		<div class="save" @click="save" v-if="!isMenus">保存</div>
		<div class="quxiao" @click="quxiao" v-if="!isMenus">取消</div>
		<!--管理-->
		<div class="menus" @click="guanli" v-if="!isMenu">管理</div>
		<!--底部菜单-->
		<div class="menu" :style="isMenus?'height:1rem;padding:0.25rem;':'height:0rem;'">
			<van-button type="warning" size="mini" @click="AllPick" v-if="!isAll">全选</van-button>
			<van-button type="default" size="mini" @click="quPick" v-if="isAll">取消全选</van-button>
			<div class="rights">
				<!--<van-button type="default" size="mini" @click="hide">隐藏</van-button>-->
				<van-button type="danger" size="mini" @click="dels">删除</van-button>
				
			</div>
		</div>
		<div class="zhezhao" v-if="zhe"></div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { Toast } from 'vant';
	import { ImagePreview } from 'vant'
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				ImagePreview:ImagePreview,
				baseURL:baseURL,
				Toast:Toast,
				imgList:[],
				isMenu:true,
				ids:'',
				isMenus:false,
				isAll:false,
				zhe:false,
				instance:null,
				Dialog:Dialog,
			}
		},
		watch: {
			imgList() {
				for(let i in this.imgList){
					if(this.imgList[i].store){
						this.isMenus = true
						break;
					}else {
						this.isMenus = false
					}
				}
			}
		},
		methods: {
			getUser() {
				this.$http.get("/member/companypage").then(res=>{
//					console.log(res.data.company.detail.imgs)
					if(res.code == 200) {
						this.imgList = res.data.company.detail.imgs
					}
				})
			},
			onRead(file) {
				var that = this;
				var ids = '';
//				console.log(file.file)
				//单张
				if(file.file){
					var formData = new FormData()
					formData.append("file",file.file)
					this.$http.post("/member/upload/photos",formData).then(res=>{
//						console.log(res)
						if(res.code == 200) {
//							that.ids = that.ids+","+res.data.id
							that.imgList.push(res.data)
						}
					})
				}else {//多张
					
				}
				
			},
			guanli() {
				this.isMenu = true
				var arr = []
				for(let i in this.imgList){
					arr.push(this.imgList[i].id) 
				}
				this.ids = arr.join(',')
			},
			yuLan(index) {
				this.zhe=true
				var imgs =[]
				for(let i in this.imgList){
					imgs[i] =this.baseURL+ this.imgList[i].path
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
			pick(index) {
//				console.log(index)
				var arr = this.imgList
				arr[index].store = !arr[index].store
				this.$set(this.imgList,index,arr[index])
			},
			save() {
				var that = this
				var arr = []
				for (let i in this.imgList){
					arr.push(this.imgList[i].id)
				}
				var data={
					imgs:arr.join(',')
				}
				this.$http.post("/member/companypage/images",data).then(res=>{
					if(res.code == 200) {
						that.Toast(res.msg);
						setTimeout(function() {
//							that.getUser();
//							that.isMenu=false;
//							that.ids=""
							that.$router.push("/enter");
						},1500)
					}
				})
			},
			dels() {
				var that = this;
				this.zhe = true;
				var arr = []
				this.$dialog.alert({
			      message: '是否删除本条信息',
			      showCancelButton:true,
			      overlay:true,
			    }).then(()=>{
					for(let i in this.imgList){
						if(!this.imgList[i].store){
							arr.push(this.imgList[i])
						}
					}
	//				console.log(arr)
					that.imgList = arr
//					this.$set(this.imgList,arr)
					that.zhe = false
			    }).catch(()=>{
			    	that.zhe = false
			    })

			},
			AllPick() {
				var arr = this.imgList
				for (let i in arr) {
					arr[i].store = true
				}
				this.$set(this.imgList,'',arr)
				this.isAll=true
			},
			quPick() {
				var arr = this.imgList
				for (let i in arr) {
					arr[i].store = false
				}
				this.$set(this.imgList,'',arr)
				this.isAll=false
				this.getUser()
			},
			quxiao() {
				var that = this
//				that.getUser();
//				that.isMenu=false;
//				that.ids=""
				this.$router.push("/enter");
			}
		},
		mounted() {
			this.getUser();
			var that = this;
			window.addEventListener("popstate", function(e) {
				if(that.instance){
					that.instance.close();
				}
			}, false);
		},
	}
</script>

<style scoped lang="less">
	.photo-list{
		
		padding: 0.25rem;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		.imgs{
			margin-right: 0.05rem;
			margin-bottom: 0.1rem;
			width: 2.24rem;
			height: 1.7rem;
			position: relative;
			img{
				width: 100%;
				height: 1.7rem;
				object-fit:cover;
			}
		}
	}
	.wai{
		width: 0.3rem;
		height: 0.3rem;
		background: ;
		border-radius: 50%;
	}
	.pick-wai{
			border-radius: 50%;
			position: absolute;
			top:0.1rem;
			right: 0.1rem;
			z-index: 1;
			background: #FFFFFF;
			width: 0.3rem;
			height: 0.3rem;
		}
		.nei-active{
			display: block;
			border-radius: 50%;
			width: 0.18rem;
			height: 0.18rem;
			position: relative;
			top: 0.058rem;
			left: 0.058rem;
			z-index: 1;
			background: #3388FF;
		}
		.pick-nei{
			display: block;
			border-radius: 50%;
			background: #999999;
			width: 0.18rem;
			height: 0.18rem;
			position: relative;
			top: 0.058rem;
			left: 0.058rem;
			z-index: 1;
		}
	.menus{
		width: 5.8rem;
		height: 1rem;
		background-color: #ffffff;
		border-radius: 0.5rem;
		border: solid 0.01rem #cccccc;
		text-align: center;
		line-height: 1rem;
		font-size: 0.34rem;
		letter-spacing: 0.03rem;
		color: #bbbbbb;
		margin: auto;
		margin-top:1rem;
	}
	.adds{
		width: 2.24rem;
		height: 1.7rem;
		position: relative;
		/*top: -0.25rem;*/
		/*position: absolute;*/
		padding-top: 0.25rem;
		box-sizing: border-box;
		background: #ebebeb;
		.su{
			display: block;
			width: 0.1rem;
			height: 1.2rem;
			margin: auto;
			/*margin-top: 0.5rem;*/
			background: #FFFFFF;
			border-radius: 0.05rem;
		}
		.heng{
			display: block;
			position: absolute;
			width: 1.2rem;
			height: 0.1rem;
			border-radius: 0.05rem;
			background: #FFFFFF;
			margin: auto;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
	}
	.del ,.save{
		margin-top: 0.3rem;
		width: 5.8rem;
		margin: auto;
		height: 1rem;
		background: #FFFFFF;
		border-radius: 0.5rem;
		opacity: 0.9;
		margin-top: 0.3rem;
		text-align: center;
		line-height: 1rem;
		font-size: 0.34rem;
		letter-spacing: 0.03rem;
	}
	.save{
		background-color: #3388ff;
		color: #FFFFFF;
	}
	.quxiao{
		margin-top: 0.3rem;
		width: 5.8rem;
		margin: auto;
		height: 1rem;
		background: #FFFFFF;
		border-radius: 0.5rem;
		opacity: 0.9;
		margin-top: 0.3rem;
		text-align: center;
		line-height: 1rem;
		font-size: 0.34rem;
		letter-spacing: 0.03rem;
		border: 0.01rem solid #E5E5E5;
	}
	.menu{
		box-sizing: border-box;
		border-top: 0.01rem solid #E5E5E5;
		width: 100%;
		height:0rem;
		/*background: chartreuse;*/
		position: fixed;
		bottom: 1rem;
		left: 0;
		z-index: 1;
		transition: all .3s linear;
		display: flex;
		overflow: hidden;
		.dels{
			
		}
		.rights{
			position: absolute;
			right: 0.25rem;
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
		opacity: 0.5;
	}
</style>