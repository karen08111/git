<template>
	<div class="main" :id="flag?'':'opacity'" v-wechat-title="$route.meta.title='身份认证'">
		<div class="model" @click="flag && jump()">
			<img src="../../assets/images/geren.png"/>
		</div>
		<!--<div class="model width" @click="flag && jumpTwo()">
			<img src="../../assets/images/tuandui.png"/>
		</div>-->
		<div class="model width" @click="flag && jumpThree()">
			<img src="../../assets/images/qiye.png"/>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				flag:true
			}
		},
		methods: {
			jump(){
				this.$router.push('/gerenIdent')
			},
			jumpTwo() {
				this.$router.push('/identifyFlow/'+2)
			},
			jumpThree() {
				this.$router.push('/qiyeIdent')
			}
		},
		mounted() {
//			this.$cookies.get('status')
		if(this.$cookies.get('status')==4){
			this.$toast.fail('已经认证')
		    this.flag = false
		}else if(this.$cookies.get('status')==3) {
			this.$toast.fail('认证失败')
		    this.flag = false
		}else if(this.$cookies.get('status')==2){
			this.$toast.fail('您的认证信息审核中~')
		    this.flag = false
		}
//          if(this.$cookies.get('dq_type')!=0){
//          	this.$toast.fail('已经认证')
//          	this.flag = false
//          }
//          if(this.$cookies.get("status")==1 || this.$cookies.get("status")==2){
//	        	this.flag= false;
//	        }
		}
	}
</script>

<style scoped lang="less">
	.main{
		background: url(../../assets/images/bg6.jpg) no-repeat;
		background-position: center center;
		background-size: cover;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		/*padding: 0 0.25rem 0.25rem 0.25rem;*/
	}
	#opacity{
		opacity: 0.5;
	}
	.model{
		width: 2.39rem;
		height: 3.46rem;
		margin: auto;
		margin-top: 0.5rem;
	}
	.model img{
		width: 100%;
		height: 100%;
	}
	.width{
		width: 2.75rem;
	}
	
	
	
</style>