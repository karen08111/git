<template>
	<!--个人/团队认证-->
	<div class="form" v-if="userType==1 || userType==2">
		<Title title="身份认证"></Title>
		<div class="model">
			<div class="list">
				<span class="list-name letter">姓名:</span>
				<input type="text" placeholder="请填写真实姓名" v-model="userName"/>
			</div>
			<div class="list border">
				<span class="list-name">身份证号:</span>
				<input type="text" placeholder="请填写身份证号" v-model="userIdent"/>
			</div>
		</div>
		<div class="next" @click="nexts">完成</div>
	</div>
	<!--企业认证-->
	<div class="form" v-else>
		<Title title="企业认证"></Title>
		<div class="model margin-bottom">
			<div class="list">
				<span class="list-name">公司全称:</span>
				<input type="text" placeholder="请填写公司全称" v-model="qiName"/>
			</div>
			<div class="list ">
				<span class="list-name">信用代码:</span>
				<input type="text" placeholder="请填写信用代码" v-model="qiMa"/>
			</div>
			<div class="list ">
				<span class="list-name">法人姓名:</span>
				<input type="text" placeholder="请填写法人姓名" v-model="faName"/>
			</div>
			<div class="list border">
				<span class="list-name">身份证号:</span>
				<input type="text" placeholder="请填写法人身份证号" v-model="faIdent"/>
			</div>
		</div>
		<Title title="营业执照"></Title>
		<div class="model height">
			<van-uploader :after-read="onRead">
				<div class="jia" v-if="!imgUrl">
					<p class="jianame">+</p>
					<p>添加资质证书</p>
				</div>
				<div class="jia" v-if="imgUrl">
					<img :src="imgUrl"/>
				</div>
			</van-uploader>
			
			<div class="zhaoText">
				<p>1.请提供有效年检内的《企业法人营业执照》副本</p>
				<p>2.请确保营业执照公司名称与公司全称一致</p>
				<p>3.请保证所有信息清晰完整</p>
				<p>4.不接受电子版执照</p>
			</div>
		</div>
		<div class="next" @click="qiNext">完成</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				userName:'',
				userIdent:'',
				userType:'',
				//企业
				qiName:'',
				qiMa:'',
				faName:'',
				faIdent:'',
				imgUrl:'',
				loadImg:'',//营业执照
			}
		},
		created (){
			this.userType=this.$route.params.id
		},
		methods: {
			nexts() {
//				console.log( localStorage.getItem('store'))
//console.log(this.$cookies.get('dq_type'))
				let store = localStorage.getItem('store')
				
				var that = this;
				if(this.userName && this.userIdent){
					if(this.$cookies.get('dq_type')!=0){
						//个人/团队
						let formData = new FormData();
						formData.append("mold",this.userType);
						formData.append("full_name",this.userName);
						formData.append("id_card",this.userIdent);
						formData.append("company_name","");
						formData.append("img_path","");
						this.$http.post("/member/element",formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
	//						console.log(res)
							if(res.code==200){
	//							this.$router.push({
	//								path: '/two',
	//								query: {
	//									name:this.userName,
	//									ident:this.userIdent,
	//									id:this.userType
	//								}
	//							})
								this.$cookies.set('dq_type',this.userType);
								this.$toast.success('提交成功!请等待审核');
								setTimeout(function(){
									that.$router.push({
										path: '/'
									})
								},1500)
							}else{
								this.$toast.fail(res.msg);
							}
						})
						
					
					}else{
						this.$toast.fail('请不要重复提交!');
						setTimeout(function(){
							that.$router.push('/')
						},1500)
					}
					
//
				}else{
					this.$toast.fail('填写完整')
				}
				
			},
			qiNext() {
				let store = localStorage.getItem('store2')
				var that = this ;
				if(this.qiMa && this.qiName && this.loadImg){
					if(this.$cookies.get('dq_type')!=0){
						let formData = new FormData();
						formData.append("mold",this.userType);
						formData.append("full_name","");
						formData.append("id_card",this.qiMa);
						formData.append("company_name",this.qiName);
						formData.append("img_path",this.loadImg);
						this.$http.post('/member/element',formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
							if(res.code==200){
	//							this.$router.push({
	//								path:'/two',
	//								query: {
	//									name:this.qiName,
	//									ident:this.faIdent,//占位
	//									id:this.userType
	//								}
	//							})
								//储存状态
								this.$cookies.set('dq_type',this.userType);
								this.$toast.success('提交成功!请等待审核');
								setTimeout(function(){
									that.$router.push('/')
								},1500)
							}else {
								this.$toast.fail(res.msg);
							}
						})
					}else {
						this.$toast.fail('请不要重复提交');
						setTimeout(function(){
							that.$router.push('/')
						},1500)
					}
					
				}else {
					this.$toast.fail('填写完整')
				}
				
			},
			onRead(file) {
				this.imgUrl=file.content
				//营业执照上传
				let formData = new FormData();
				formData.append("file",file.file);
				this.$http.post('/member/upload/images',formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
					//this.loadImg
//					console.log(res)
					this.loadImg = res.data.path
					
				}).catch(res=>{
			    	this.Toast('上传图片过大,请截取')
			    })
			}
		}
	}
</script>

<style scoped lang="less">
	.form{
		padding: 0.25rem;
		padding-bottom: 1rem;
		box-sizing: border-box;
	}
	.model{
		/*height: 2.14rem;*/
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(44, 133, 255, 0.3);
		border-radius: 0.2rem;	
		margin-top: 0.3rem;	
		padding: 0.2rem;
		box-sizing: border-box;
		position: relative;
	}
	.list{
		height: 1.05rem;
		border-bottom: 0.01rem dashed #E5E5E5;
		line-height: 1.05rem;
		display: flex;
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
	.border{
		border-bottom: 0.01rem dashed #FFFFFF;
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
	.margin-bottom{
		margin-bottom: 0.4rem;
	}
	.jia{
		width: 1.5rem!important;
		height: 1.5rem;
		border: 0.01rem dashed #E5E5E5;
		font-size: 0.16rem;
		text-align: center;
		display: block;
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
	.height{
		height:2.3rem;
		display: flex;
		padding-top: 0.25rem;
		padding-left: 0.25rem;
		box-sizing: border-box;
	}
	.zhaoText{
		font-size: 0.16rem;
		letter-spacing: 0.02rem;
		color: #c9c9c9;
		width: 70%;
		/*line-height: 0.4rem;*/
		padding-left: 0.2rem;
		box-sizing: border-box;
	}
</style>