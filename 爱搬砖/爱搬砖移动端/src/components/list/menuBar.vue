<template>
	<div class="main" id="footer_bar">
		<!--底部导航栏-->
		<van-tabbar v-model="active" :z-index="9999">
		  <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
		  <van-tabbar-item icon="records" to="/publicity">入驻</van-tabbar-item>
		  <!--<van-tabbar-item icon="add-0"></van-tabbar-item>-->
		  <!--<van-tabbar-item icon="chat" info="5">消息</van-tabbar-item>-->
		  <van-tabbar-item icon="contact" to="/personal">我的</van-tabbar-item>
		  
		</van-tabbar>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				active:0,
			}
		},
		created() {
			
		},
		watch: {
			$route(to,from) {
				var ac = this.$route.meta.active
				this.active = ac
			}
		}
	}
</script>

<style scoped lang="less">
	.main{
		z-index: 9999;
		padding-bottom: 1rem;
		box-sizing: border-box;
	    .fill{
	      height: 1rem;
	    }
	}
</style>