<template>
	<div class="main">
		<van-swipe-cell :right-width="100" :on-close="onClose">
		  <van-cell-group>
		    <van-cell title="单元格" value="内容" />
		  </van-cell-group>
		  <span slot="right" class="del">删除</span>
		  <span class="abs bian" @click="setlist">编辑</span>
		</van-swipe-cell>
		
	</div>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		methods: {
			onClose(clickPosition, instance) {
		      switch (clickPosition) {
		        case 'left':
		        case 'cell':
		        case 'outside':
		          instance.close();
		          break;
		        case 'right':
		          this.$dialog.confirm({
		            message: '确定删除吗？'
		          }).then(() => {
		            instance.close();
		          });
		          break;
		      }
		    },
		    setlist(){
		    	console.log('编辑')
		    }
		}
	}
</script>

<style scoped lang="postcss">
	.main{
		padding: 0.25rem;
		padding-top: 0;
		box-sizing: border-box;
	}
	.del{
		display: block;
		height: 100%;
		background:#f54646 ;
		color: #FFFFFF;
		line-height: 0.9rem;
		text-align: center;
		width: 1rem;
	}
	.bian{
		display: block;
		height: 100%;
		background:#3388ff ;
		color: #FFFFFF;
		line-height: 0.9rem;
		text-align: center;
		width: 1rem;
	}
	.abs{
		position: absolute;
		right: -2rem;
		top: 0;
	}
</style>