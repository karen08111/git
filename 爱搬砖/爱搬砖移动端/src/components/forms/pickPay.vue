<template>
	<div class="select">
		<input type="number" id="input" :placeholder="lays?lays:'不填为面议'" v-model="lay" />/元
		<span class="showCity" @click="shows">{{city?'/'+city:cityString}}</span>
		<span class="jiantous"></span>
		
		<van-popup v-model="show" click-overlay="shows" position="bottom" >
			<van-picker :columns="columns" @confirm="confirm" @cancel="cancel" show-toolbar />
		</van-popup>
		<div class="shade" v-if="isShade" @click="hideShade">
		
		</div>
	</div>
</template>

<script>
	export default {
		props:['cityString','lays','id'],
		data() {
			return {
				show:false,
				isShade:false,
				city:null,
				columns:[],
				lay:'',
				layId:''
			}
		},
		mounted() {
			this.$http.get("/common/quantityUnit").then(res=>{
				if(res.code == 200) {
					var arr = []
					for(let i in res.data){
						arr.push({text:res.data[i].unit,id:res.data[i].id})				
					}
					this.columns = arr
					if(this.id) {
						var index = this.columns.findIndex((value,index)=>{
							return value.id == this.id
						})
						this.city=this.columns[index].text
//						console.log(this.city)
					}
				}
				
			})
		},
		beforeUpdated() {
			this.$http.get("/common/quantityUnit").then(res=>{
				if(res.code == 200) {
					var arr = []
					for(let i in res.data){
						arr.push({text:res.data[i].unit,id:res.data[i].id})				
					}
					this.columns = arr
					if(this.id) {
						var index = this.columns.findIndex((value,index)=>{
							return value.id == this.id
						})
						this.city=this.columns[index].text
					}
				}
				
			})
		},
		watch: {
			lay(){
				this.$emit("giveLay",{lay:this.lay,id:this.layId})
			},
		},
		methods: {
			shows() {
				this.show = true
				this.isShade = true
			},
			hideShade() {
				this.show = false
				this.isShade = false
			},
			confirm(e) {
//				console.log(e)
				this.city = e.text
				this.layId = e.id
				this.$emit("giveLay",{lay:this.lay,id:e.id})
				this.show = false
				this.isShade = false
			},
			cancel() {
				this.show = false
				this.isShade = false
			}
		}
	}
</script>

<style scoped lang="less">
	.select{
		width: 100%;
		line-height: 1.1rem;
		font-size: 0.28rem;
		color: #333333;
		overflow: hidden;
		border-radius: 0.4rem;
		background: #ffffff;
		position: relative;
		display: flex;
	}
	.select input{
		height: 100%;
		background: none;
		/*padding-left: 0.2rem;*/
		box-sizing: border-box;
	}
	#input{
		width: 30%;
	}
	.showCity{
		display: block;
		height: 100%;
		background: none;
		border-style: none;
		line-height: 1.1rem;
		width: 50%;
		/*padding-left: 0.2rem;*/
		box-sizing: border-box;
		text-align: center;
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
			width: 0.16rem;  
			height: 0.16rem;  
			position: absolute; 
			right: 0.55rem;
			top: 0.45rem; 
			border-left: 0.01rem solid #555555;  
			border-bottom: 0.01rem solid #555555;  
			-webkit-transform: translate(0,-50%) rotate(-45deg);  
			transform: translate(0,-50%) rotate(-45deg);  
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