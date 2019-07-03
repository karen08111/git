<template>
	<div class="addBasic">
		<div class="form">
			<div class="im-intr">
				<span class="import-title line-height">企业介绍</span>
				<div class="textarea">
					<textarea v-model="content" style="resize:none" placeholder="请输入企业介绍"></textarea>
				</div>
			</div>
		</div>
		<div class="save" @click="save">保存</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				content:'',
				Toast:Toast,
			}
		},
		mounted() {
			//获取
			this.$http.get("/member/companypage").then(res=>{
				if(res.code == 200) {
					this.content = res.data.company.detail.content
				}
			})
		},
		methods: {
			save() {
				var data = {
					content:this.content
				};
				var that = this
				this.$http.post("/member/companypage/describe",data).then(res=>{
					if(res.code == 200) {
						this.Toast(res.msg);
						setTimeout(function(){
							that.$router.push("/enter")
						},1500)
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
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
	.line-height{
		line-height: 1.1rem;
	}
	.textarea textarea{
		width: 100%;
		height: 5rem;
		overflow-y: auto;
		border: 0.01rem solid #e5e5e5;
		padding: 0.25rem;
		box-sizing: border-box;
		border-radius: 0.25rem;
	}
	.addBasic{
		padding: 0.25rem;
		width: 100%;
		box-sizing: border-box;
		/*background: #fafafa;*/
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