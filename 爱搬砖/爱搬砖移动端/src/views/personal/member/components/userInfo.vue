<template>
	<van-swipe-cell :right-width="liWidth">
		<div class="userList">
			<span class="span">{{list.user_name}}</span>
			<span class="span">{{list.mobile}}</span>
			<span class="span">{{list.is_leader==0?'否':'是'}}</span>
			<!--滑动菜单-->
		  	<div class="menu">
				<span class="set" @click="bianji">编辑</span>
				<span class="del" @click="dels">删除</span>
			</div>
		</div>
	</van-swipe-cell>
</template>

<script>
	import { Toast } from 'vant';
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				liWidth:Number,
				Toast:Toast,
				Dialog:Dialog,
			}
		},
		props:['list','tid'],
		mounted() {
			this.liWidth = parseInt(document.getElementsByClassName('menu')[0].offsetWidth)
		},
		methods: {
			bianji() {
				this.$router.push({path:'/memberForm',query:{tid:this.tid,id:this.list.id}})
			},
			dels() {
				var that = this
	    		this.$emit('isTost',true)
				this.$dialog.alert({
			      message: '是否删除该成员?',
			      showCancelButton:true,
			      overlay:true,
			    }).then(()=>{
					var data = {
						id:that.list.id,
						tid:that.tid
					}
					that.$http.post("/member/teamMamber/delete",data).then(res=>{
						if(res.code == 200){
			    			that.Toast(res.msg)
			    			setTimeout(function(){
			    				location.reload() ;
			    			},1000)
			    		}
					})
			    	that.$emit("isTost",false)
			    }).catch(() => {
				  // on cancel
				  that.$emit("isTost",false)
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.userList{
		display: flex;
		height: 1.27rem;
		background: #FFFFFF;
		line-height: 1.27rem;
		font-size: 0.24rem;
		color: #343434;
		letter-spacing: 0.01rem;
		margin-bottom: 0.1rem;
		position: relative;
		.span{
			display: inline-block;
			width: 33%;
			text-align: center;
		}
	}
	.menu{
		height: 100%;
		width: 2.2rem;
		position: absolute;
		top: 0;
		left: 100%;
		display: flex;
		span{
			display: block;
			width: 1.1rem;
			color: #FFFFFF;
			height: 100%;
			letter-spacing: 0.03rem;
			align-items:center;
			display: -webkit-flex;
			justify-content:center; 
		}
		.isShow{
			background-color: #f09938;
		}
		.set{
			background: #ed752e;
		}
		.del {
			background: #ea4e3d;
		}
	}
</style>