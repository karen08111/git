<template>
	<div class="main">
		<!--<div class="progress">
			<div class="tab">
				<span :class="active==1?'active':''">初级认证</span>
			</div>
			<div class="tab border">
				<span :class="active==2?'active':''">中级认证</span>
			</div>
			<div class="tab">
				<span :class="active==3?'active':''">高级认证</span>
			</div>
		</div>-->
		<!--<hr />-->
		<router-view/>
		<!--<div class="next">
			跳过
		</div>-->
	</div>
</template>

<script>
	export default{
		data() {
			return {
				active:1,
				userType:''
			}
		},
		created() {
//			console.log(this.$route.params.id);
			this.userType = this.$route.params.id;
//			console.log(this.userType)
		},
		methods: {
		},
		watch: {
			$route(to,from){
//				console.log(to,from);
				let route = to.path
				if(route == '/two'){
					this.active = 2
				}else if(route == '/three'){
					this.active = 3
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.main{
		/*padding: 0 0.25rem 0.25rem 0.25rem;*/
	}
	.progress{
		display: flex;
		justify-content: space-between;
		height: 0.3rem;
		margin: auto;
		margin-top: 0.5rem;
	}
	.tab{
		width: 33%;
		font-size: 0.32rem;
		letter-spacing: 0.03rem;
		color: #bababa;
		text-align: center;
	}
	.border{
		border-right: 0.01rem solid #BABABA;
		border-left: 0.01rem solid #BABABA;
	}
	.tab span{
		border-bottom: 0.03rem solid #fff;
		padding-bottom: 0.1rem;
	}
	.active{
		border-bottom: 0.03rem solid #3388FF!important;
	}
	hr{
		margin-top: 0.5rem;
	}
	.form{
		padding: 0.25rem;
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
</style>