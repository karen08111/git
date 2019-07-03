<template>
	<div class="select">
		<!--<input type="" @click="shows" :value="city"  placeholder="请选择地址"/>-->
		<span class="showCity" @click="shows">{{city?city:cityString}}</span>
		<span class="jiantous"></span>
		<van-popup v-model="show" click-overlay="shows" position="bottom" >
			<van-area :area-list="areaList" @confirm="getCity" :columns-num="nums" @cancel="hide"  @change="setCity"/>
		</van-popup>
		<div class="shade" v-if="isShade" @click="hideShade">
		
		</div>
	</div>
	
</template>

<script>
	import { Area } from 'vant';
	import { Popup } from 'vant';
	export default{
//		name:'DateSelect',
		components:{
			Area,
			Popup
		},
		props:{
			store:{
				type:Boolean
			},
			cityString:{
				type:String
			},
			nums:{
				type:Number,
				default:2
			}
		},
		data() {
			return {
				city:null,
				show:false,
				isShade:false,
				areaList:{
				  province_list: {
				    
				  },
				  city_list: {
				    
				  },
				  county_list: {

				  }
				},
				yiji:'',
				erji:''
			}
		},
		mounted(){
			//加载城市
			this.$http.get('/common/getarea').then(res=>{
				let obj={};
				for(let i in res.data){
					obj[parseInt(res.data[i].id)] = res.data[i].title
				}
//				console.log(obj)
				this.areaList.province_list=obj
			})
			//初始化二级
			this.$http.get('/common/getarea/'+110000).then(res=>{
//				console.log(res.data)
				let obj={};
				for(let i in res.data){
					obj[parseInt(res.data[i].id)] = res.data[i].title
				}
//				console.log(obj)
				this.areaList.city_list=obj
			})
			//初始化三级
			this.$http.get('/common/getarea/'+110100).then(res=>{
				let obj={};
				for(let i in res.data){
					obj[parseInt(res.data[i].id)] = res.data[i].title
				}
//				console.log(obj)
				this.areaList.county_list=obj
			})
		},
		methods :{
			hideShade() {
				this.isShade = false
				this.show = false
			},
			shows(){
				this.show=true
				this.isShade = true
			},
			//确定
			getCity(e){
				let list=[];
				for(let i=0;i<e.length;i++){
					list.push(e[i].name)
				}
				list=list.join(',')
//				this.cityString=list

				this.city = list
				//发送过去id
//				console.log(e[2].code)
				if(this.nums == 2){
					this.$emit('give',e[1].code);
				}else {
					this.$emit('give',e[2].code);
				}
				
				this.show=false
				this.isShade = false
			},
			//取消
			hide(){
				this.show=false
				this.isShade = false
			},
			//改变
			setCity(e,value,index){
				
				this.yiji=value[0].code;
				this.erji=value[1].code;
			}
			
		},
		watch:{
			erji(){
//				console.log(this.erji)
				this.$http.get('/common/getarea/'+this.erji).then(res=>{
					let obj={};
					for(let i in res.data){
						obj[parseInt(res.data[i].id)] = res.data[i].title
					}
					this.areaList.county_list=obj
				})
			},
			yiji(){
				this.$http.get('/common/getarea/'+this.yiji).then(res=>{
					let obj={};
					for(let i in res.data){
						obj[parseInt(res.data[i].id)] = res.data[i].title
					}
	//				console.log(obj)
					this.areaList.city_list=obj
					this.erji=res.data[0].id
				})
			}
		}
	}
</script>

<style scoped lang="postcss">
	.select{
		/*height: 1rem;*/
		/*height: 0.6rem;*/
		/*border-bottom: 0.01rem dashed #e5e5e5;*/
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