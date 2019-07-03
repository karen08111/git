<template>
	<div class="main">
		<Title title="资质认证"></Title>
		<div v-if="store">
			<!--添加上的展示-->
			<div class="upAdd margin-bottom" v-if="bookList" v-for="item of bookList">
				<div class="list">
					<span class="list-name">证书名称:</span>
					<input type="text" placeholder="请填写证书名称" disabled :value="item.name"/>
				</div>
				<div class="addImg">
					<span class="list-name">证书图片:</span>
					<!--<van-uploader :after-read="onRead">-->
						<!--<div class="jia" v-if="!imgUrl">
							<p class="jianame">+</p>
							<p>添加资质证书</p>
						</div>-->
						<div class="jia" v-if="item.img">
							<img :src="item.img"/>
						</div>
					<!--</van-uploader>-->
				</div>
			</div>
			
			
			<Title title="继续添加" v-if="bookList.length>0"></Title>
			
			<div class="add">
				<div class="jia" @click="addBook">
					<p class="jianame">+</p>
					<p>添加资质证书</p>
				</div>
			</div>
			<!--<div class="next" @click="upAll">提交审核</div>-->
		</div>
		<div v-if="!store">
			<div class="upAdd">
				<div class="list">
					<span class="list-name">证书名称:</span>
					<input type="text" placeholder="请填写证书名称" v-model="bookName"/>
				</div>
				<div class="addImg">
					<span class="list-name">证书图片:</span>
					<van-uploader :after-read="onRead">
						<div class="jia" v-if="!imgUrl">
							<p class="jianame">+</p>
							<p>添加资质证书</p>
						</div>
						<div class="jia" v-if="imgUrl">
							<img :src="imgUrl"/>
						</div>
					</van-uploader>
				</div>
			</div>
			<div class="btnList">
				<span class="yes" @click="push">确定</span>
				<span class="no" @click="reset">取消</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				store:true,
				imgUrl:'',
				bookName:'',
				bookList:[],
				loadImg:'1',
				userType:null
			}
		},
		created() {
			this.userType = this.$route.query.id
//			console.log(this.userType)
		},
		methods: {
			addBook() {
				this.store=false
				//初始输入内容
				this.bookName='';
				this.imgUrl='';
			},
			onRead(file) {
//				console.log(file.file)
				this.imgUrl=file.content
//				//拿到图片路径上传上去 换取id
				let formData = new FormData();
				formData.append("file",file.file);
				this.$http.post('/member/upload/seniority',formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
					if(res.code==200){
						//拿到上传成功路径   然后确定提交认证   this.loadImg
						this.loadImg = res.data.path
					}
				}).catch(res=>{
			    	this.Toast('上传图片过大,请截取')
			    })
			},
			reset() {
				this.store=true
			},
			//添加证书push
			push() {
				if(this.bookName && this.loadImg){
					//往展示数组里push
//					let obj={
//						id:'',//图片id
//						name:this.bookName,
//						img:this.imgUrl,
//					}
//					this.bookList.push(obj);
//					this.store=true
//					请求
					let formData = new FormData();
					formData.append("mold",this.userType);
					formData.append("img_path",this.loadImg);
					formData.append("seniority_name",this.bookName);
					this.$http.post('/member/list',formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
						if(res.code==200){
							this.$toast.success({
								message:res.msg
							})
							setTimeout(function(){
								this.$router.push("/personal")
							},1500)
							
						} else {
							this.$toast.fail(res.msg)
						}
						
					})
				}else{
					this.$toast.fail('填写完整')
				}
			},
			//提交审核
			upAll() {
//				console.log(this.bookList)
			}
		}
	}
</script>

<style scoped lang="postcss">
	.main{
		padding: 0.25rem;
		padding-bottom: 1.5rem;
		box-sizing: border-box;
	}
	.add{
		height: 2.3rem;
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(44, 133, 255, 0.3);
		border-radius: 0.2rem;
		position: relative;
		margin-top: 0.5rem;
	}
	.upAdd{
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(44, 133, 255, 0.3);
		border-radius: 0.2rem;
		position: relative;
		margin-top: 0.5rem;
		padding: 0.2rem;
		box-sizing: border-box;
	}
	.jia{
		position: absolute;
		width: 1.5rem;
		height: 1.5rem;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border: 0.01rem dashed #E5E5E5;
		font-size: 0.16rem;
		text-align: center;
		/*margin-left: 0.1rem;*/
	}
	.jia img{
		width: 100%;
		height: 100%;
	}
	.jianame{
		font-size:1.1rem;
		font-weight: normal;
	}
	.next{
		width:5.8rem;
		height: 1rem;
		background-color: #3388ff;
		border-radius: 0.5rem;
		opacity: 0.9;
		font-size: 0.34rem;
		line-height: 1rem;
		text-align: center;
		letter-spacing: 0.03rem;
		color: #FFFFFF;
		margin: auto;
		margin-top: 1rem;
	}
	.list{
		height: 1.05rem;
		border-bottom: 0.01rem dashed #E5E5E5;
		line-height: 1.05rem;
		display: flex;
		position: relative;
	}
	.list input{
		padding-left: 0.1rem;
		box-sizing: border-box;
		width: 65%;
	}
	.list-name{
		font-size: 0.28rem;
		color: #333333;
		display: inline-block;
		width: 1.3rem;
	}
	.letter{
		letter-spacing: 0.06rem;
	}
	input:disabled{
		background: none;
		color: grey;
	}
	.addImg{
		height: 2rem;
		display: flex;
		position: relative;
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
		box-sizing: border-box;
	}
	.btnList{
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
	}
	.btnList span{
		display: block;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		letter-spacing: 0.03rem;
		border-radius: 0.2rem;
		font-size: 0.34rem;
	}
	.yes{
		width: 3.9rem;
		background: #3388FF;
		color: #FFFFFF;
	}
	.no{
		width: 2.8rem;
		background: #FFFFFF;
		color: #c9c9c9;
		border: 0.01rem solid #4794ff;
	}
	.margin-bottom{
		margin-bottom: 0.5rem;
	}
</style>