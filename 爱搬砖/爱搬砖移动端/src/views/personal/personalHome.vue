<template>
	<div class="main">
		<div class="head">
			<div class="headImg">
				<img src="../../assets/images/1.png"/>
			</div>
			<p class="name">姓名</p>
		</div>
		<Title title="详细信息"></Title>
		<div class="user-main">
			<div class="radios">
				<div class="names">类型:</div>
				<van-radio-group v-model="radios" @change="val">
				  <div class="flex">
				  	<van-radio v-for="(item,index) of leiList" :key="index" :name="item.id">{{item.work_name}}</van-radio>
				  </div>
				</van-radio-group>
			</div>
			<div class="pick border">
				<div class="names">选择类型:</div>
				<input type="text" placeholder="选择类型" :value="erName" @click="xuanze"/>
				<span class="jiantou" @click="xuanze"></span>
				<van-popup v-model="show" wx:if="radio==1"  click-overlay="shows" position="bottom" >
					<van-area :area-list="areaList1" columns-num="1" @confirm="getEr"  @cancel="hide"/>
				</van-popup>
				<van-popup v-model="show" wx:if="radio==2" click-overlay="shows" position="bottom" >
					<van-area :area-list="areaList2" columns-num="1" @confirm="getEr"  @cancel="hide"/>
				</van-popup>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				radios:1,
				show:false,
				areaList1:{},
				areaList2:{},
				leiList:[],
				workList:[],
				
				
				
				//渲染
				erName:''
			}
		},
		mounted(){
			//请求职位类型
			this.$http.get('/common/getworks').then(res=>{
				this.workList=res.data
				//拿到一级
				for(let i=0;i<res.data.length;i++){
					let obj={}
					obj={
						id:res.data[i].id,
						work_name:res.data[i].work_name
					}
					this.leiList.push(obj)
				}
				//初始二级选择
				let arr = this.workList[0].children
				let objs={}
				for(let i in arr){
					objs[arr[i].id]=arr[i].work_name
				}
//				console.log(obj)
				this.areaList1.province_list=objs
				
				let arr2 = this.workList[1].children
				let obj2 = {}
				for(let j in arr2){
					obj2[arr2[j].id]=arr2[j].work_name
				}
				this.areaList2.province_list=obj2
			})
		},
		methods: {
			xuanze(){
				this.show=true
			},
			val(e){
//				console.log(e,'一级分类ID')//选择类型的id
				this.radios=e
				console.log(this.radios)
			},
			//获得二级
			getEr(e,pick,val){
//				console.log(e[0].code,'二级分类的id')//选择的id
				this.erName=e[0].name
				this.show=false
			},
			hide(){
				this.show=false
			},
			shows(){
				this.shows=false
			}
			
		}
	}
	
</script>

<style scoped lang="postcss">
	.radios{
		display: flex;
		border-bottom: 0.01rem dashed #E5E5E5;
		width: 100%;
		height: 1rem;
	}
	.names{
		font-size: 0.28rem;
		color: #333333;
		line-height: 1rem;
		width: 20%;
	}
	.flex{
		display: flex;
		height: 100%;
		width: 4rem;
		padding-top: 0.3rem;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.main{
		padding: 0 0.25rem 0.25rem 0.25rem;
		box-sizing: border-box;
	}
	.head{
		text-align: center;
		margin-bottom: 0.3rem;
	}
	.headImg{
		width: 1.6rem;
		height:1.6rem;
		border-radius: 50%;
		overflow: hidden;
		margin: auto;
		margin-top: 0.3rem;
	}
	.headImg img{
		width: 100%;
		height: 100%;
	}
	.name{
		font-size: 0.26rem;
		letter-spacing: 0.03rem;
		color: #B3B3B3;
		line-height: 0.4rem;
	}
	.user-main{
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(44, 133, 255, 0.3);
		border-radius: 0.2rem;
		margin-top: 0.4rem;
		padding: 0.2rem;
		box-sizing: border-box;
	}
	.pick{
		display: flex;
		height: 1.05rem;
		line-height: 1.05rem;
		position: relative;
	}
	.border{
		border-bottom: 0.01rem dashed #E5E5E5;
	}
	.pick input{
		width: 3rem;
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
</style>