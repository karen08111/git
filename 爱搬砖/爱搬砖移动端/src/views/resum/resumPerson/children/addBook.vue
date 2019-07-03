<template>
	<div class="book">
		<div class="addBasic" v-if="isAdd">
			<div class="form">
				<div class="import">
					<span class="import-title">证书名称</span>
					<input type="text" placeholder="请输入证书名称" v-model="ach_name" />
				</div>
				<div class="import">
					<span class="import-title">证书等级</span>
					<common cityString="请选择证书等级" @giveYouId="giveYouId" :list = "columns"></common>
				</div>
				<div class="bookImg">
					<span class="import-title line-height">证书图片</span>
					<div>
						<van-uploader :after-read="onRead">
							<div class="imgs">
								<span v-if="!imgPath" class="heng"></span>
								<span v-if="!imgPath" class="su"></span>
								<img v-if="imgPath" :src="baseURL+imgPath"/>
							</div>
						</van-uploader>
					</div>
					
					
				</div>
			</div>
			<div class="save" @click="save">保存</div>
			<div class="quxiao" @click="quxiao">取消</div>
		</div>
		<!--证书展示-->
		<!--<div class="book-list" v-if="!isAdd">
			<div class="book-li" v-for="(p,index) in seniority" @click="p.status!=0?selects(index):''">
				<img :src="baseURL+p.img_path" alt="" />
				<p class="book-name">{{p.seniority_name}}</p>
				<p class="book-leavle">{{p.credential_level_type.title}}</p>
				<div class="zhe" v-if="p.status == 0">审核中</div>
				<div class="pick-wai" v-if="p.status ==1">
					<span :class="p.store?'nei-active':'pick-nei'"></span>
				</div>
			</div>
			<div class="save" @click="addBook">添加资质证书</div>
		</div>-->
		<div class="book-list" v-if="!isAdd">
			<div class="book-li" v-for="(p,index) in seniority" @click="selects(index)">
				<img :src="baseURL+p.img_path" alt="" />
				<p class="book-name">{{p.seniority_name}}</p>
				<p class="book-leavle">{{p.credential_level_type.title}}</p>
				<div class="zhe" v-if="p.status == 0">审核中</div>
				<div class="pick-wai" >
					<span :class="p.isuse?'nei-active':'pick-nei'"></span>
				</div>
			</div>
			<div class="save" @click="addBook">添加资质证书</div>
		</div>
		<!--底部菜单-->
		<!--<div class="menu" :style="isMenu?'height:1rem;padding:0.25rem;':'height:0rem;'">-->
		<div class="menu"  v-if="!isAdd" style="height:1rem;padding:0.25rem">
			<van-button type="danger" size="mini" @click="dels">删除</van-button>
			<div class="rights">
				<!--<van-button type="default" size="mini" @click="hide">隐藏</van-button>-->
				<van-button type="warning" size="mini" @click="show">保存</van-button>
			</div>
		</div>
		<div class="zhezhao" v-if="zhe"></div>
	</div>
	
</template>

<script>
	import { baseURL } from '@/axios'
	import { Toast } from 'vant';
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				Dialog:Dialog,
				seniority:null,
				isAdd:false,
				baseURL:baseURL,
				Toast:Toast,
				ach_name:'',
				columns:[],
				bookId:'',
				imgPath:null,
				isMenu:false,
				isSave:true,
				zhe:false,
			}
		},
		mounted() {
			this.getInfo()
		},
		watch: {
			seniority() {
				for(let i in this.seniority){
					if(this.seniority[i].store){
						this.isMenu = true
						break;
					}else {
						this.isMenu = false
					}
				}
			}
		},
		methods: {
			//显示
			show() {
				var that = this
				//查找出需要显示的id
				var ids = []
				for(let i in this.seniority){
					if(this.seniority[i].isuse){
						ids.push(this.seniority[i].id)
					}
				}
				ids= ids.join(',')
//				console.log(ids)
				var data = {
					senioritys:ids
				}
				this.$http.post("/member/resume/seniority",data).then(res=>{
					if(res.code ==200){
						this.Toast.success('设置成功');
						setTimeout(()=>{
							that.$router.push("/resumPerson");
						},2000)
					}
				})
//				for(let j in ids){
//					this.$http.get("/member/seniority/"+ids[j]+"/setShow").then(res=>{
//						
//					})
//				}
//				this.Toast.success('设置成功');
//				setTimeout(()=>{
//					this.getInfo()
//				},2000)
			},
			//隐藏 
			hide() {
				var ids = []
				for(let i in this.seniority){
					if(this.seniority[i].store){
						ids.push(this.seniority[i].id)
					}
				}
				var title = ""
				for(let j in ids){
					this.$http.get("/member/seniority/"+ids[j]+"/setHide").then(res=>{
						
					})
				}
				this.Toast.success('设置成功');
				setTimeout(()=>{
					this.getInfo()
				},2000)
				
			},
			//删除
			dels() {
				var that = this;
				var ids = []
				for(let i in this.seniority){
					if(this.seniority[i].isuse){
						ids.push(this.seniority[i].id)
					}
				}
				var title = ""
				
				if(ids.length>0){
					this.zhe = true;
					this.$dialog.alert({
				      message: '是否删除本条信息',
				      showCancelButton:true,
				      overlay:true,
				    }).then(()=>{
				    	for(let j in ids){
							this.$http.get("/member/seniority/"+ids[j]+"/cutOut").then(res=>{
								
							})
						}
						this.Toast.success('删除成功');
						setTimeout(()=>{
							this.getInfo()
						},2000)
				    	that.zhe=false
				    }).catch(() => {
					  // on cancel
					  that.zhe=false
					});
				}

			},
			//选择
			selects(index){
				var arr = this.seniority
				arr[index].isuse = !arr[index].isuse
				this.$set(this.seniority,index,arr[index])
			},
			addBook() {
				this.ach_name='';
				this.imgPath="";
				this.imgPath="";
				this.isAdd = true
				this.isMenu = false
			},
			quxiao() {
				this.isAdd = false
				this.getInfo()
			},
			getInfo() {
//				this.$http.get("/member/resume/edit").then(res=>{
//					if(res.code == 200){
//						this.seniority = res.data.seniority
//					}
//				})
				this.$http.get("/common/hierarchy").then(res=>{
					if(res.code == 200) {
						this.columns = res.data
					}
				})
				//证书列表
//				this.$http.get("/member/seniority").then(res=>{
////					console.log(res.data)
//					if(res.code == 200) {
//						this.seniority = res.data
//						console.log(res.data)
//					}
//				})
				this.$http.get("/member/resume/edit").then(res=>{
					if(res.code == 200 ){
						this.seniority = res.data.seniority
//						console.log(this.seniority)
					}
				})
			},
			onRead(file) {
				var formData = new FormData()
				formData.append("file",file.file)
				this.$http.post("/member/upload/seniority",formData).then(res=>{
					if(res.code == 200) {
						this.imgPath = res.data.path
					}
				})
			},
			save() {
				if(this.isSave){
					this.isSave = false
					var data = {
						seniority_name:this.ach_name,
						img_path:this.imgPath,
						seniority_type:1,
						credential_level_type:this.bookId
					}
					this.$http.post("/member/seniority",data).then(res=>{
						if(res.code == 200) {
							this.Toast.success('提交成功');
							setTimeout(()=>{
								this.isSave = true
								this.isAdd = false
								this.getInfo()
							},2000)
						}else {
							this.isSave = true
						}
					})
				}
				
			},
			giveYouId(id){
//				console.log(id)
				this.bookId = id
			}
		}
	}
</script>

<style scoped lang="less">
	.zhezhao{
		background: #000000;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		z-index: 9;
		position: fixed;
		top: 0;
		left: 0;
	}	
	.addBasic{
		padding: 0.25rem;
		width: 100%;
		box-sizing: border-box;
		background: #fafafa;
		.form{
			width: 100%;
			padding: 0.25rem;
			box-sizing: border-box;
			border-radius: 0.2rem;
			background-color: #ffffff;
			box-shadow: 0 0.06rem 0.15rem 0 
				rgba(44, 133, 255, 0.15);
		}
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
	.zhe{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: #00000057;
		border-radius: 0.1rem;
		color: #FFFFFF;
		line-height: 3.58rem;
		text-align: center;
		font-size: 0.3rem;
		font-weight: 550;
	}
	.book{
		padding-bottom: 1rem;
		box-sizing: border-box;
	}
	.book-list{
		display: flex;
		justify-content: space-between;
		width: 6.9rem;
		border-radius: 0.2rem;
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
		rgba(44, 133, 255, 0.15);
		margin: auto;
		margin-top: 0.25rem;
		padding: 0.1rem;
		box-sizing: border-box;
		flex-wrap: wrap;
		.pick-wai{
			border-radius: 50%;
			position: absolute;
			top:0.15rem;
			right: 0.15rem;
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
			top: 0.06rem;
			left: 0.06rem;
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
			top: 0.06rem;
			left: 0.06rem;
			z-index: 1;
		}
		.book-li{
			position: relative;
			padding: 0.1rem;
			box-sizing: border-box;
			background: #FAFAFA;
			border-radius: 0.1rem;
			text-align: center;
			line-height: 0.6rem;
			width: 3.3rem;
			height: 3.58rem;
			margin-bottom: 0.25rem;
			
			img{
				width: 100%;
				height: 2.2rem;
				border-radius: 0.1rem;
				object-fit:cover;
			}
			.boon-name{
				font-size: 0.28rem;
				letter-spacing: 0.01rem;
				color: #343434;
			}
			.book-leavle{
				width: 1rem;
				height: 0.3rem;
				background-color: #ffffff;
				border-radius: 0.15rem;
				border: solid 0.01rem #f7b336;
				font-size: 0.22rem;
				line-height: 0.3rem;
				text-align: center;
				letter-spacing: 0.01rem;
				color: #666666;
				margin: auto;
				
			}
		}
	}
	.line-height{
		line-height: 1.1rem;
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
	}
	.imgs{
		width: 2rem;
		height: 2rem;
		border: 0.01rem dashed #e5e5e5;
		position: relative;
		.heng{
			display: block;
			width: 1rem;
			position: absolute;
			top: 1rem;
			left: 0.5rem;
			border: 0.01rem dashed #e5e5e5;
		}
		.su{
			display: block;
			height: 1rem;
			position: absolute;
			top: 0.5rem;
			left: 1rem;
			border: 0.01rem dashed #e5e5e5;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
	.save{
		background-color: #3388ff;
		color: #FFFFFF;
	}
	.letter-none{
		width: 3rem!important;
	}
	.import{
		height: 1.3rem;
		line-height: 1.1rem;
		font-size: 0.3rem;
		color: #555555;
		position: relative;
		border-bottom: 0.01rem dashed #e5e5e5;
		padding-bottom: 0.1rem;
		padding-top: 0.1rem;
		box-sizing: border-box;
		display: flex;
		.import-title{
			letter-spacing: 0.02rem;
			display: block;
			width: 2rem;
		}
		input {
			/*padding-left: 0.25rem;*/
			padding-right: 0.25rem;
			box-sizing: border-box;
			font-size: 0.28rem;
			border: none;
			height: 100%;
			width: 100%;
		}
		.jiantous{
			display: block;
			width: 0.24rem;  
			height: 0.24rem;  
			position: absolute; 
			right: 0;
			top: 0.55rem; 
			border-left: 0.01rem solid #555555;  
			border-bottom: 0.01rem solid #555555;  
			-webkit-transform: translate(0,-50%) rotate(-135deg);  
			transform: translate(0,-50%) rotate(-135deg);  
		}
		.avatar{
			display: inline-block;
			position: absolute;
			right: 0;
			img{
				width: 0.9rem;
				height: 0.9rem;
				border-radius: 50%;
			}
		}
	}
</style>