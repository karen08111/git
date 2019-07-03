<template>
	<div class="select">
		<span class="showCity" @click="shows">{{city?city:cityString}}</span>
		<span class="jiantous"></span>
		<van-popup v-model="show" click-overlay="shows" position="bottom" >
			<van-picker :columns="columns" @change="onChange" @confirm="confirm" @cancel="cancel" show-toolbar/>
		</van-popup>
		<div class="shade" v-if="isShade" @click="hideShade">
		
		</div>
	</div>
</template>

<script>
	var jobs = {
	  
	};
	export default {
		props:['cityString','id'],
		data() {
			return {
				show:false,
				isShade:false,
				city:null,
				allJob:[],
				jobs:{},
				columns:[]
			}
		},
		mounted() {
			var that = this
			this.$http.get("/common/getworks").then(res=>{
				this.allJob =res.data
				var obj={}
				for(let i in res.data){
					let arr = []
					for(let j in res.data[i].children){
						arr.push(res.data[i].children[j].work_name)
					}
					obj[res.data[i].work_name]=arr
				}
				this.jobs = obj
				var columns=[
					{
			          values: Object.keys(obj).reverse(),
			          className: 'column1'
			        },
			        {
			          values: obj['司机驾驶员'],
			          className: 'column2',
			          defaultIndex: 0
			        }
				]
				this.columns = columns
				
				if(this.id){
					this.city = that.fan(that.id);
				}
			})
			
						
		},
		beforeUpdated() {
			this.$http.get("/common/getworks").then(res=>{
				this.allJob =res.data
				var obj={}
				for(let i in res.data){
					let arr = []
					for(let j in res.data[i].children){
						arr.push(res.data[i].children[j].work_name)
					}
					obj[res.data[i].work_name]=arr
				}
				this.jobs = obj
				var columns=[
					{
			          values: Object.keys(obj).reverse(),
			          className: 'column1'
			        },
			        {
			          values: obj['司机驾驶员'],
			          className: 'column2',
			          defaultIndex: 0
			        }
				]
				this.columns = columns
				if(this.id){
					this.city = this.fan(this.id);
					
				}
			})
		},
		methods: {
			//根据id返回name
			fan(id){
				var name2,name1;
				for(let i in this.allJob) {
					for(let j in this.allJob[i].children){
						if(id == this.allJob[i].children[j].id){
							name2=this.allJob[i].children[j].work_name
							name1 = this.allJob[i].work_name
							break;
						}
					}
				}
				return name1+'-'+name2
			},
			shows() {
				this.show = true
				this.isShade = true
			},
			onChange(picker, values) {
		      	picker.setColumnValues(1, this.jobs[values[0]]);
		   	},
		   	hideShade() {
		   		this.show = false
				this.isShade = false
		   	},
		   	confirm(e) {
//		   		console.log(e)
				let name = e[1]
		   		this.city = e.join('-')
		   		this.show = false
				this.isShade = false
				//根据name 返回id
				var id1,id2;
				for(let i in this.allJob) {
					for(let j in this.allJob[i].children){
						if(name == this.allJob[i].children[j].work_name){
							id2=this.allJob[i].children[j].id
							id1 = this.allJob[i].id
							break;
						}
					}
				}
				var arr=[id1,id2];
				this.$emit("giveId",arr)
		   		
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