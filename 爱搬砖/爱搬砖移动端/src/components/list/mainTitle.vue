<template>
	<div class="moudel">
		<p class="title">推荐信息</p>
		<div class="xian">
			<span></span>
		</div>
		<p class="subTitle">book</p>
	</div>
</template>

<script>
//	export default{
//		
//	}
</script>

<style scoped lang="postcss">
.moudel{
	width: 1.8rem;
	margin: auto;
	text-align: center;
}
.title{
	color: #333;
	font-size: 0.34rem;
	font-weight: bold;
	letter-spacing: 0.03rem;
	line-height: 0.8rem;
}
.xian{
	width: 100%;
	border-bottom: 0.01rem #bdbdbd;
	position: relative;
}
.xian span{
	position: absolute;
	left: 0.65rem;
	width: 0.4rem;
	height: 0.05rem;
	background: #3388ff;
}
.subTitle{
	text-align: center;
	font-size: 0.24rem;
	color: #BDBDBD;
	line-height: 0.6rem;
	text-transform:Capitalize 
}
</style>