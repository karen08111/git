<template>
	<div class="main">
		<p class="title">80分</p>
		<p class="level">安全级别</p>
		<div class="cond">
			<div class="cond-active width"></div>
		</div>
		<p class="subTitle">为了更好的保护您的交易安全，建议您通过以下方式提高安全级别</p>
		
		<div class="moudel">
			<div class="list border">
				<img src="../../assets/images/s1.png"/>
				<div class="names">
					<p class="name">手机绑定</p>
					<p class="subName">手机接收消息</p>
				</div>
				<span class="wei">未绑定</span>
				<div class="jiantou"></div>
			</div>
			<div class="list border">
				<img src="../../assets/images/s1.png"/>
				<div class="names">
					<p class="name">身份认证</p>
					<p class="subName">认证后方可进行交易，开通店铺等操作</p>
				</div>
				<span class="wei">未绑定</span>
				<div class="jiantou"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped lang="postcss">
	.main{
		padding: 0.2rem;
		
	}
	.title{
		text-align: center;
		font-size: 0.8rem;
		font-weight: 500;
		color: #f54646;
		letter-spacing: 0.08rem;
		line-height: 1.2rem;
	}
	.level{
		font-size: 0.36rem;
		letter-spacing: 0.04rem;
		color: #333333;
		font-weight: 400;
		text-align: center;
	}
	.cond{
		position: relative;
		height: 0.3rem;
		border-radius: 0.3rem;
		margin-top: 0.3rem;
		background-color: #d4d9de;
		box-shadow: 0 0.01rem 0 0 
		rgba(255, 255, 255, 0.65), 
		inset 0 0.01rem 0.02rem 0 
		rgba(0, 0, 0, 0.15);
	}
	.cond-active{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		height: 0.3rem;
		box-shadow: 0 0.01rem 0.01rem 0 
		rgba(0, 0, 0, 0.2), 
		inset 0 0.02rem 0 0 
		rgba(255, 255, 255, 0.33);
		background: #3388ff;
		border-radius: 0.3rem;
	}
	.width{
		width: 80%;
	}
	.subTitle{
		font-size: 0.2rem;
		line-height: 0.7rem;
		color: #999999;
	}
	.moudel{
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
		rgba(44, 133, 255, 0.2);
		border-radius: 0.2rem;
		padding-bottom: 0.2rem;
		margin-top: 0.4rem;
		padding: 0.2rem;
		box-sizing: border-box;
	}
	.list{
		position: relative;
		display: flex;
		height: 1.5rem;
	}
	.border{
		border-bottom: 0.01rem dashed #E5E5E5;
	}
	.jiantou{
		width: 0.24rem;  
		height: 0.24rem;  
		top: 0.75rem;
		position: absolute; 
		right: 0.1rem; 
		border-left: 0.01rem solid #999;  
		border-bottom: 0.01rem solid #999;  
		-webkit-transform: translate(0,-50%) rotate(-135deg);  
		transform: translate(0,-50%) rotate(-135deg); 
	}
	.list img{
		width: 0.7rem;
		height: 0.7rem;
		margin: 0.4rem 0.4rem 0 0rem;
	}
	.names{
		margin-top: 0.4rem;
	}
	.name{
		font-size: 0.34rem;
		color: #333;
		font-weight: 500;
	}
	.subName{
		font-size: 0.2rem;
		line-height: 0.6rem;
		color: #B3B3B3;
	}
	.wei{
		color: #B3B3B3;
		font-size: 0.2rem;
		position: absolute;
		right: 0.5rem;
		top:0.65rem ;
	}
</style>