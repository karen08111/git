<template>
	<div>
		<div class="shai">
			<div class="sous">
				<select name="" class="selects" @change="getSelectId">
					<option v-for="(p,index) in options" :value="p.id" >{{p.title}}</option>
				</select>
				<span class="ico ttp"><van-icon name="arrow-down" /></span>
				<input type="text" v-model="souVal" /><span class="sou-title" @click="sousuo">搜索</span>
			</div>
			<div class="ul">
				<div class="li">
					<span @click="showRe">{{reVal}}
						<span class="ico"><van-icon name="arrow-down" /></span>
					</span>
					
					<div class="hide" v-if="re">
						<p v-for="(p,index) in reList" @click="pickRe(index,p.id)">{{p.title}}</p>
					</div>
				</div>
				<div class="li border">
					<span @click="showJob">工种分类
						<span class="ico"><van-icon name="arrow-down" /></span>
					</span>
				</div>
				<div class="li">
					<span @click="showCity">工作地点
						<span class="ico"><van-icon name="arrow-down" /></span>
					</span>
				</div>
			</div>
			<div class="yincang" v-if="isJob">
				<div class="scroll">
					<div class="scroll-left">
						<p v-for="(p,index) in jobList" @click="pickOne(index,p.id)">
							<span :class="p.store?'a':''">{{p.work_name}}</span>
						</p>
					</div>
					<div class="scroll-right">
						<p v-for="(p,index) in chi" @click="pickTwo(index,p.id)">
							<span :class="p.store?'a':''">{{p.work_name}}</span>
						</p>
					</div>
				</div>
				<div class="btns">
					<span class="qu" @click="reset">取消</span>
					<span class="yes" @click="sub">确定</span>
				</div>
			</div>
			<!--城市-->
			<div class="yincang" v-if="isCity">
				<div class="scroll">
					<div class="scroll-left">
						<p v-for="(p,index) in cityList" @click="pickCity1(index,p.id)">
							<span :class="p.store?'a':''">{{p.title}}</span>
						</p>
					</div>
					<div class="scroll-right">
						<p v-for="(p,index) in cityList2" @click="pickCity2(index,p.id)">
							<span :class="p.store?'a':''">{{p.title}}</span>
						</p>
					</div>
				</div>
				<div class="btns">
					<span class="qu" @click="cityReset">取消</span>
					<span class="yes" @click="citySub">确定</span>
				</div>
			</div>
		</div>
		<div class="zhao" v-if="zhezhao" @click="allHide"></div>
	</div>
</template>

<script>
	export default {
	  props: ['sort'],
		data() {
			return {
				val:1,
				souVal:'',
				re:false,
				isJob:false,
				isCity:false,
				// reVal:'热度',
				reList:[
					{
						id:1,
						title:'热度'
					},
					{
						id:2,
						title:'发布时间倒序'
					},
					{
						id:3,
						title:'发布时间正序'
					}
				],
				options:[
					{
						id:1,
						title:'找工人',
					},
					{
						id:2,
						title:'找团队',
					},
					{
						id:3,
						title:'工人找活',
					},
					{
						id:4,
						title:'团队找活',
					}
				],
				jobList:[],
				oneId:null,
				twoId:null,
				chi:[],
				cityList:[],
				cityList2:[],
				cityId1:null,
				cityId2:null,
				zhezhao:false,
			}
		},
    computed: {
      reVal (){
        return this.reList.find(value => value.id == this.sort).title
      }
    },
		mounted() {
			this.getJob()
			this.$http.get("/common/getarea").then(res=>{
				if(res.code==200){
					this.cityList=res.data
				}
			})
		},
		watch: {
			zhezhao() {
				if(this.zhezhao) {
					this.$emit("stops",true)
				}else {
					this.$emit("stops",false)
				}
			}
		},
		methods: {
			//sousuo()
			sousuo() {
				if(this.souVal){
					if(this.val == 1){//搜个人
						this.$router.push({ path: '/souList',query: { id: '1' ,urls: '/resumeList' ,title:this.souVal }})
					}else if(this.val ==2){
						this.$router.push({ path: '/souList',query: { id: '2' ,urls: '/teamList' ,title:this.souVal }})
					}else if(this.val ==3 ){
						this.$router.push({ path: '/souList',query: { id: '3' ,urls: '/recruitList' ,title:this.souVal ,nature:1}})
					}else if(this.val ==4){
						this.$router.push({ path: '/souList',query: { id: '4' ,urls: '/recruitList' ,title:this.souVal ,nature:2}})
					}
				}else {
					alert('搜索内容不能为空')
				}
			},
			//获取搜索的
			getSelectId(e) {
				this.val = e.target.value;
			},
			showRe() {
				this.re=!this.re
				this.zhezhao=this.re
				this.isJob = false;
				this.isCity = false;
			},
			pickRe(index,id) {
				// this.reVal = this.reList[index].title
				this.re = false
				this.$emit("giveRe",id)
				this.zhezhao=false;
			},
			pickOne(index,id) {
				this.twoId=null;
				this.oneId = id
				this.jobList[index].store = true;
				for (let i=0;i<this.jobList.length;i++){
					if(i!=index){
						this.jobList[i].store = false
					}
				}
				this.$set(this.jobList,index,this.jobList[index]);
//				console.log(this.jobList)
				this.chi = this.jobList[index].children
				for(let j in this.chi){
					this.chi[j].store = false
				}
			},
			pickTwo(index,id) {
				this.twoId = id;
				this.chi[index].store = true;
				for (let i=0;i<this.chi.length;i++){
					if(i!=index){
						this.chi[i].store = false
					}
				}
				this.$set(this.chi,index,this.chi[index]);
			},
			reset() {
				this.isJob = false
				this.jobList = []
				this.chi = []
				this.oneId=null
					this.twoId = null
					this.zhezhao=false;
			},
			sub() {
				if(this.twoId && this.oneId){
					this.$emit("jobId",this.twoId,2)
					this.isJob = false
				}else if(this.oneId) {
					this.$emit("jobId",this.oneId,1)
					this.isJob = false
				}else {
					this.isJob = false
				}
				this.zhezhao=false;
			},
			showJob() {
				this.isJob = !this.isJob
				this.zhezhao=this.isJob
				this.re=false
				this.isCity = false;
				if(this.isJob){
					this.getJob()
				}else {
					this.jobList = []
					this.chi = []
					this.oneId=null
					this.twoId = null
				}
			},
			showCity() {
				this.isCity = !this.isCity
				this.zhezhao=this.isCity
				this.re=false;
				this.isJob = false;
				if(this.isCity){
					this.$http.get("/common/getarea").then(res=>{
						if(res.code==200){
							this.cityList=res.data
						}
					})
				}else {
					this.cityList2=[]
					this.cityList1=[]
					this.cityId1 = null
					this.cityId2 = null
				}
			},
			pickCity1(index,id){
//				console.log(id)
				this.cityId1 = id
				this.cityId2 = id
				this.cityList2=[]
				this.getErCity(id);
				this.cityList[index].store = true
				for(let i in this.cityList){
					if(i!=index){
						this.cityList[i].store = false
					}
				}
				this.$set(this.cityList,index,this.cityList[index]);
			},
			pickCity2(index,id){
				this.cityId2 = id
				this.cityList2[index].store = true
				for(let i in this.cityList2){
					if(i!=index){
						this.cityList2[i].store = false
					}
				}
				this.$set(this.cityList2,index,this.cityList2[index]);
			},
			getErCity(id){
				this.$http.get("/common/getarea?id="+id).then(res=>{
					if(res.code==200){
						this.cityList2=res.data
					}
				})
			},
			cityReset() {
				this.isCity=false
				this.cityList2=[]
				this.cityList1=[]
				this.cityId1 = null
				this.cityId2 = null
				this.zhezhao=false;
			},
			citySub() {
				if(this.cityId1 && this.cityId2){
					this.$emit("gitCityId",this.cityId2)
					this.isCity=false
					
				}else if(this.cityId1){
					this.$emit("gitCityId",this.cityId1)
					this.isCity=false
				}else {
					this.isCity=false
				}
				this.zhezhao=false;
				this.cityList2=[]
				this.cityList1=[]
				this.cityId1 = null
				this.cityId2 = null
			},
			//获取地区
			getCity() {
				this.$http.get("/common/getarea").then(res=>{
					if(res.code==200){
						this.cityList=res.data
					}
				})
			},
			//获取职位
			getJob() {
				this.$http.get("/common/getworks").then(res=>{
					if(res.code==200){
						this.jobList=res.data
					}
				})
			},
			allHide() {
				this.zhezhao=false;
				this.re=false;
				this.isJob = false;
				this.isCity = false;
				this.cityList2=[]
				this.cityList1=[]
				this.cityId1 = null
				this.cityId2 = null
				this.jobList = []
				this.chi = []
				this.oneId=null
				this.twoId = null
			}
		}
	}
</script>

<style scoped lang="less">
.a{
	color: #3388ff;
}	
	.sous{
		height: 1rem;
		display: flex;
		border-bottom: 0.01rem solid #E5E5E5;
		line-height: 0.6rem;
		input{
			background: #f2f2f2;
			border-radius: 0.3rem;
			width: 4.35rem;
			height: 0.60rem;
			margin-top: 0.2rem;
			padding-left: 0.15rem;
			padding-right: 0.15rem;
			box-sizing: border-box;
		}
	}
	.selects{
		margin-left: 0.25rem;
		background: #FFFFFF;
		appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
	}
	.sou-title{
		font-size: 0.32rem;
		color: #343434;
		letter-spacing: 0.03rem;
		margin-top: 0.2rem;
		margin-left: 0.1rem;
	}
	.scroll{
		/*overflow-y: auto;*/
		width: 100%;
		height: 6.2rem;
		display: flex;
		.scroll-left{
			width: 49.8%;
			height: 100%;
			border-right: 0.01rem solid #E7E7E7;
			padding: 0.25rem;
			box-sizing: border-box;
			overflow-y: auto;
			p{
				line-height: 0.45rem;
				text-align: center;
			}
		}
		.scroll-right{
			padding: 0.25rem;
			box-sizing: border-box;
			width: 50%;
			height: 100%;
			overflow-y: auto;
			p{
				line-height: 0.45rem;
				text-align: center;
			}
		}
	}
	.yincang {
		width: 100%;
		height: 7rem;
		background: #FFFFFF;
		z-index: 999;
		position: fixed;
		border-bottom:0.01rem solid #e7e7e7;
		top: 1.01rem;
		.btns{
			display: flex;
			position: absolute;
			bottom: 0;
			width: 100%;
			left: 0;
			height: 0.8rem;
			
			border-top:0.01rem solid #e7e7e7;
			
			span{
				display: block;
				width: 50%;
				height: 100%;
				line-height: 0.8rem;
				text-align: center;
				font-size: 0.28rem;
				letter-spacing: 0.02rem;
			}
			.qu{
				color: #333333;
				background: #FFFFFF;
			}
			.yes{
				color: #FFFFFF;
				background: #3388ff;
			}
		}
	}
	.shai{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2rem;
		background: #FFFFFF;
		z-index: 9999;
		border-bottom: 0.01rem solid #e7e7e7;
		.ul{
			height: 1rem;
			width: 100%;
			display:flex;
			.li{
				font-size: 0.28rem;
				color: #343434;
				width: 33%;
				text-align: center;
				letter-spacing: 0.01rem;
				span{
					line-height: 1rem;
				}
				.hide{
					width: 33%;
					overflow: hidden;
					position: absolute;
					top: 1.01rem;
					z-index: 998;
					background: #FFFFFF;
					line-height: 1rem;
					p{
						height: 1rem;
					}
				}
			}
		}
	}
	.border{
		border-right: 0.01rem solid #e7e7e7;
		border-left: 0.01rem solid #e7e7e7 ;
	}
	.ico{
		position: relative;
		top: 0.03rem;
	}
	.zhao{
		background: #808080;
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
	}
	.ttp{
		position: relative;
		top: 0.23rem;
		margin-right: 0.1rem;
	}
</style>