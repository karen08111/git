<template>
	<div class="select">
		<span class="showCity" @click="shows">{{city?city:cityString}}</span>
		<span class="jiantous"></span>
		<van-popup v-model="show" click-overlay="shows" position="bottom" >
			<van-picker :columns="newArr" @confirm="confirm" @cancel="cancel" show-toolbar/>
		</van-popup>
		<div class="shade" v-if="isShade" @click="hideShade">
		
		</div>
	</div>
</template>

<script>
	export default {
		props:['cityString','list'],
		data() {
			return {
				show:false,
				isShade:false,
				city:'',
				columns: []
			}
		},
		mounted() {
		},
		methods: {
			shows() {
				this.show = true
				this.isShade = true
			},
			hideShade() {
				this.show = false;
				this.isShade = false;
			},
			confirm(e) {
				this.city = e.text;
				this.show = false;
				this.isShade = false;
				this.$emit("giveYouId",e.code)
			},
			cancel() {
				this.show = false;
				this.isShade = false;
			}
		},
		computed: {
			newArr(){
				var arr = []
				for(let i in this.list){
					if(this.list[i].code){
						var obj = {
							code:this.list[i].code,
							text:this.list[i].title
						}
					}else {
						var obj = {
							code:this.list[i].id,
							text:this.list[i].title
						}
					}
					
					arr.push(obj)
				}
				return arr
			}
		}
	}
</script>

<style scoped lang="less">
	.select{
		width: 100%;
		line-height: 0.6rem;
		font-size: 0.28rem;
		color: #333333;
		overflow: hidden;
		border-radius: 0.4rem;
		background: #ffffff;
		position: relative;
	}
	.select input{
		height: 100%;
		background: none;
		/*padding-left: 0.2rem;*/
		box-sizing: border-box;
	}
	.showCity{
		display: block;
		height: 100%;
		background: none;
		border-style: none;
		line-height: 1.1rem;
		width: 90%;
		/*padding-left: 0.2rem;*/
		box-sizing: border-box;
	}
	.jiantou{
		width: 0.24rem;  
		height: 0.24rem;  
		position: absolute;
		right: 0.3rem;
		top: 0.5rem;  
		border-left: 0.01rem solid #999;  
		border-bottom: 0.01rem solid #999;  
		-webkit-transform: translate(0,-50%) rotate(-135deg);  
		transform: translate(0,-50%) rotate(-135deg);  
	}
	.jiantous{
			display: block;
			width: 0.24rem;  
			height: 0.24rem;  
			position: absolute; 
			right: 0.25rem;
			top: 0.55rem; 
			border-left: 0.01rem solid #555555;  
			border-bottom: 0.01rem solid #555555;  
			-webkit-transform: translate(0,-50%) rotate(-135deg);  
			transform: translate(0,-50%) rotate(-135deg);  
		}
	.title{
		display: inline-block;
		width: 20%;
	}
	.select input{
		border-style: none;
		width: 90%;
	}
</style>