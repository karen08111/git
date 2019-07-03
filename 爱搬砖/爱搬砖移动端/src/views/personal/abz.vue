<template>
	<div class="abz">
		<div class="abz-img">
			<img src="../../assets/images/gong.jpg"/>
		</div>
    <div>
      <p>点击拨打客服电话</p>
      <a href="tel:16657159171 ">166-5715-9171 </a>
    </div>
		<!--<p class="tishis">长按识别二维码</p>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="less">
	.abz{
		text-align: center;
		p{
			margin-top: 0.5rem;
      margin-bottom: 0.2rem;
		}
    a{
      font-size: 0.32rem;
      color: #000000;
      letter-spacing: 0.02rem;

    }
	}
	.abz-img{
		img{
			margin-top: 1rem;
			width: 50%;
			height: 50%;
		}
	}
	.tishis{
		letter-spacing: 0.02rem;
	}
</style>