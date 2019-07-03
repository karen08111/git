<template>
	<div class="title">
		<span class="mod"></span>
		<span class="name">{{title}}</span>
	</div>
</template>

<script>
	export default{
		props: {
			title: {
				type:String
			}
		}
	}
</script>

<style scoped lang="postcss">
.title{
	display: flex;
}
	.mod{
		width: 0.06rem;
		height: 0.36rem;
		background: #3388FF;
	}
	.name{
		font-size: 0.34rem;
		color: #333333;
		letter-spacing: 0.02rem;
		line-height: 0.36rem;
		margin-left: 0.14rem;
	}
</style>