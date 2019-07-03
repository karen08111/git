<template>
	<div class="body" @touchmove="tuo" @touchstart="starts" v-wechat-title="$route.meta.title='爱搬砖-'+title">
		<div class="main">
			<van-search
			  v-model="value"
			  placeholder="请输入搜索关键词"
			  show-action
			  @search="onSearch" >
			  <div slot="action" @click="onSearch">搜索</div>
			</van-search>
			<!---->
			<div class="progress">
				<div class="tab" @click="swich(2)">
					<span :class="id==2?'active':''">我要找活</span>
				</div>
				<div class="tab border" @click="swich(1)">
					<span :class="id==1?'active':''">我要找人</span>
				</div>
				<div class="tab" @click="swich(3)">
					<span :class="id==3?'active':''">项目信息</span>
				</div>
			</div>
		</div>
		<!--找人信息-->
		<div class="view"  id="scroll" v-if="id==2">
			<div class="view-model">
				<ul class="view-tab">
					<li :class="active==1?'act': '' " @click="actSwich(1)">发布时间
						<img src="../../assets/images/no-ac.png" class="bgImg" :class="shunxu==3?'xuanzhuan':'xuanzhuan2'" />
					</li>
					<li :class="active==2?'act': '' " @click="actSwich(2)">薪酬
						<img src="../../assets/images/no-ac.png" class="bgImg" :class="shunxu2==3?'xuanzhuan':'xuanzhuan2'"/>
					</li>
					<li :class="active==3?'act': '' " @click="actSwich(3)">筛选
						<img src="../../assets/images/text.png" class="bgImg big"/>
					</li>
				</ul>
				<!--发布时间-->
				<div class="projectList" v-if="active==1">
					<infoList :list="project2" type="read"></infoList>
				</div>
				<!--薪酬-->
				<div class="projectList" v-if="active==2">
					<infoList :list="project2" type="read"></infoList>
				</div>
				<!--筛选-->
				<div class="projectList" v-if="active==3">
					<infoList :list="soList2" type="read"></infoList>
					<p class="tishi" v-if="soList.length==0">暂无~</p>
				</div>
			</div>
		</div>
		
		<!--找活-->
		
		<div class="view" v-if="id==1">
			<div class="view-model">
				<ul class="view-tab">
					<li :class="active==1?'act': '' " @click="actSwich(1)">发布时间
						<img src="../../assets/images/no-ac.png" class="bgImg" :class="shunxu==3?'xuanzhuan':'xuanzhuan2'"/>
					</li>
					<li :class="active==2?'act': '' " @click="actSwich(2)">薪酬
						<img src="../../assets/images/no-ac.png" class="bgImg" :class="shunxu2==3?'xuanzhuan':'xuanzhuan2'"/>
					</li>
					<li :class="active==3?'act': '' " @click="actSwich(3)">筛选
						<img src="../../assets/images/text.png" class="bgImg big"/>
					</li>
				</ul>
				<!--发布时间-->
				<div class="projectList" v-if="active==1">
					<infoList :list="project" type="detail"></infoList>
				</div>
				<!--薪酬-->
				<div class="projectList" v-if="active==2">
					<infoList :list="project" type="detail"></infoList>
				</div>
				<!--筛选-->
				<div class="projectList" v-if="active==3">
					<infoList :list="soList" type="detail"></infoList>
					<p class="tishi" v-if="soList.length==0">暂无~</p>
				</div>
			</div>
		</div>
		
		<!--项目信息-->
		
		<div class="view" v-if="id==3">
			<div class="view-model">
				<ul class="view-tab">
					<li :class="active==1?'act': '' " @click="actSwich(1)">发布时间
						<img src="../../assets/images/no-ac.png" class="bgImg" :class="shunxu==3?'xuanzhuan':'xuanzhuan2'"/>
					</li>
					<!--<li :class="active==2?'act': '' " @click="actSwich(2)">薪酬</li>-->
					<li :class="active==3?'act': '' " @click="actSwich(3)">筛选
						<img src="../../assets/images/text.png" class="bgImg"/>
					</li>
				</ul>
				<!--发布时间-->
				<div class="projectList" v-if="active==1">
					<proList :list="project3" type="project/detail"></proList>
				</div>
				<!--薪酬-->
				<div class="projectList" v-if="active==2">
					<!--<infoList></infoList>-->
					<proList :list="project3" type="project/detail"></proList>
				</div>
				<!--筛选-->
				<div class="projectList" v-if="active==3">
					<proList :list="soList" type="project/detail"></proList>
					<p class="tishi" v-if="soList.length==0">暂无~</p>
				</div>
			</div>
		</div>
		<!--遮罩-->
		<div class="filter" @click="end()" v-if="start">
			
		</div>
		<div class="filter-model"  :class="start?'left':''">
			<p class="filter-title">筛选</p>
			<p class="lei">分类</p>
			<div class="btns">
				<span :class="item.store?'rule':''" @click="selects(index)" v-for="(item,index) in jiAll" :key="index">{{item.work_name}}</span>
			</div>
			<p class="lei" v-if="ziList.length>0">分类2</p>
			<div class="btns">
				<span :class="item.store?'rule':''" v-for="(item,index) in ziList" @click="select2(item.id,index)" :key="index">{{item.work_name}}</span>
			</div>
			<p class="lei">省份</p>
			<div class="city">
				<!--<span class="chengshi">{{sheng}}</span>-->
				<CitySelect @give="give"></CitySelect>
			</div>
			<!--<p class="lei">期望薪资</p>
			<div class="city">
				<input type="number" v-model="money" /><span class="moneyName">K/月</span>
			</div>-->
			<div class="btnList">
				<span class="no" @click="resets">重置</span>
				<span class="yes" @click="submits">确定</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				value:'',
				active:1,
				project:[],
				project2:[],
				project3:[],
				start:false,
				jiAll:[],
				ziList:[],
				sheng:'选择省份',
				shi:'选择市',
				xian:'选择区/县',
				cityId:'',//城市id
				big_type:null,//技术1
				works:null,//分类2
				money:null,
				soList:[],
				startValue:'',
				shunxu:3,
				shunxu2:3,
				title:'',
				page:1,
				pageStore:true,
				tishi:'',
			}
		},
		created() {
			this.id = this.$route.query.id;//获取选项类型
//			console.log(this.$route.query.id)
			switch(parseInt(this.$route.query.id)){
				case 1:
				this.title = '找活信息';
				break;
				case 2:
				this.title = '找人信息';
				break;
				case 3:
				this.title = '项目信息';
			}
		},
		mounted() {
			this.request();	
			//请求列表
			this.$http.get('/common/getworks').then(res=>{
//				console.log(res.data)
				let arr =res.data;
				for(let i=0;i<res.data.length;i++){
					arr[i].store = false
//					console.log(arr)
				}
				this.jiAll=arr;
			})
			var that = this;
//			console.log(that.getScrollHeight(),that.getDocumentTop())
			//监听滚动条
			if(this.pageStore){
				window.addEventListener("scroll",function(){
				 	if(that.getScrollHeight() < that.getDocumentTop() + that.getWindowHeight()+1){
				 		that.page+=1;
				 		that.pageStore=false
				 		that.request();	
				 	}
				 })
			}
			 
		},
		methods: {
			starts(e) {
//				console.log(e.changedTouches[0].clientX)
				this.startValue = e.changedTouches[0].clientX
			},
			tuo(e) { 
//				console.log(e.changedTouches[0].clientX)
				let val = e.changedTouches[0].clientX;
				if(this.startValue-val>=150){
//					alert('左滑')
					this.start = true
				}else if(val-this.startValue>=150){
					this.start = false
				}
			},
			//确定
			submits() {
				let formData = new FormData();
				formData.append('mold',this.id);
				formData.append('big_type',this.big_type);
				formData.append('works',this.works);
				formData.append('pay',this.money);
				formData.append('province',this.cityId);
				formData.append('keywords','');
				formData.append('sort',this.active);
				this.$http.post('/need/list',formData).then(res=>{
					if(res.code==200){
						this.soList=res.data
						this.start=false
					}
				})
			},
			//重置
			resets() {
				this.money = '';
				this.ziList=[] ;
				console.log(this.jiAll)
				for(let i=0;i<this.jiAll.length;i++){
					this.jiAll[i].store = false;
				}
			},
			//获取城市
			give(e){
				this.cityId = parseInt(e)
			},
			selects(e) {
				this.big_type = parseInt(e)+1;
				this.jiAll[e].store = !this.jiAll[e].store
				for(let i=0;i<this.jiAll.length;i++){
					if(i!=e){
						this.jiAll[i].store = false
					}
				}
				let newArr = this.jiAll[e].children;
				for(let i= 0; i<this.jiAll[e].children.length;i++){
					newArr[i].store = false
//					console.log(newArr[i])
				}
				this.ziList = newArr;
//				console.log(this.ziList)
			},
			select2(id,index){
//				console.log(id,index)
				this.works = parseInt(id)
				this.ziList[index].store = !this.ziList[index].store;
				this.$set(this.ziList,index,this.ziList[index]);
				for (let i=0;i<this.ziList.length;i++){
					if(i!=index){
						this.ziList[i].store = false
					}
				}
			},
			//隐藏
			end() {
				this.start = false
			},
			
			//请求
			request() {
				if(this.active == 1){
					if(this.shunxu==3){
						this.shunxu=2
					}else if(this.shunxu==2){
						this.shunxu = 3
					}
					
					if(this.id==1){
						let formData = new FormData();
						formData.append('mold',this.id);
						formData.append('big_type','');
						formData.append('works','');
						formData.append('pay','');
						formData.append("province",'');
						formData.append('keywords','');
						formData.append('page',this.page);
						formData.append('sort',this.shunxu)
						this.$http.post('/need/list',formData).then(res=>{
								var target = this.project
								this.project = target.concat(res.data.data);
								this.pageStore=true
						})
					}else if(this.id==2){
						let formData = new FormData();
						formData.append('mold',this.id);
						formData.append('big_type','');
						formData.append('works','');
						formData.append('pay','');
						formData.append("province",'');
						formData.append('keywords','');
						formData.append('page',this.page);
						formData.append('sort',this.shunxu)
						this.$http.post('/need/list',formData).then(res=>{
								var target = this.project2
								this.project2 = target.concat(res.data.data);
								this.pageStore=true
						})
					}else{
						this.$http.get("/project/list?sort="+this.shunxu).then(res=>{
							this.project3 = res.data.data;
						})
					}
				}else if(this.active ==2){
					if(this.shunxu2 ==3){
						this.shunxu2 =2;
					}else if (this.shunxu == 2){
						this.shunxu2 =3;
					}
					if(this.id==1){
						let formData = new FormData();
						formData.append('mold',this.id);
						formData.append('big_type','');
						formData.append('works','');
						formData.append('pay','');
						formData.append("province",'');
						formData.append('keywords','');
						formData.append('page',this.page);
						formData.append('sort',this.shunxu2)
						this.$http.post('/need/list',formData).then(res=>{
							var target = this.project
							this.project = target.concat(res.data.data);
//							console.log(this.project)
							this.pageStore=true
						})
					}else if(this.id==2){
						let formData = new FormData();
						formData.append('mold',this.id);
						formData.append('big_type','');
						formData.append('works','');
						formData.append('pay','');
						formData.append("province",'');
						formData.append('keywords','');
						formData.append('page',this.page);
						formData.append('sort',this.shunxu2)
						this.$http.post('/need/list',formData).then(res=>{
							var target = this.project2
							this.project2 = target.concat(res.data.data);
//							console.log(this.project)
							this.pageStore=true
						})
					}
					else{
						this.$http.get("/project/list?sort="+this.shunxu2).then(res=>{
	//						console.log(res.data.data)
							this.project3 = res.data.data;
						})
					}
				}
				
//								console.log(this.shunxu)
//				if(this.id==1 || this.id==2){
//					let formData = new FormData();
//					formData.append('mold',this.id);
//					formData.append('big_type','');
//					formData.append('works','');
//					formData.append('pay','');
//					formData.append("province",'');
//					formData.append('keywords','');
//					formData.append('sort',this.shunxu)
//					this.$http.post('/need/list',formData).then(res=>{
////						console.log(res.data)
//						this.project = res.data;
//					})
//				}else{
//					this.project=[]
//					this.$http.get("/project/list?sort="+this.shunxu).then(res=>{
////						console.log(res.data.data)
//						this.project = res.data.data;
//					})
//				}
			},
			onSearch() {
				//搜索
				if(this.id==1){
					let formData = new FormData();
					formData.append('mold',this.id);
					formData.append('big_type','');
					formData.append('works','');
					formData.append('pay','');
					formData.append("province",'');
					formData.append('keywords',this.value);
					formData.append('sort',this.active)
					this.$http.post('/need/list',formData).then(res=>{
//						console.log(res.data)
						this.project = res.data;
					})
				}else if(this.id ==2){
					let formData = new FormData();
					formData.append('mold',this.id);
					formData.append('big_type','');
					formData.append('works','');
					formData.append('pay','');
					formData.append("province",'');
					formData.append('keywords',this.value);
					formData.append('sort',this.active)
					this.$http.post('/need/list',formData).then(res=>{
//						console.log(res.data)
						this.project2 = res.data;
					})
				}
			},
			//切换
			swich(e) {
				this.page = 1;
				this.id=e;
				this.request();
				switch(e){
					case 1:
					this.title = '找活信息';
					break;
					case 2:
					this.title = '找人信息';
					break;
					case 3:
					this.title = '项目信息';
				}
			},
			//二级切换
			actSwich(e) {
				this.page = 1;
				this.active = e
				this.request();
				//筛选层弹出
				if(e==3){
					this.start = true
				}
				
			},
			
 
			//文档高度
			getDocumentTop() {
			    var scrollTop =  0, bodyScrollTop = 0, documentScrollTop = 0;
			    if (document.body) {
			        bodyScrollTop = document.body.scrollTop;
			    }
			    if (document.documentElement) {
			        documentScrollTop = document.documentElement.scrollTop;
			    }
			    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
//			    console.log("scrollTop:"+scrollTop);
			    return scrollTop;
			},
			//可视窗口高度
			getWindowHeight() {
			    var windowHeight = 0;
			    if (document.compatMode == "CSS1Compat") {
			        windowHeight = document.documentElement.clientHeight;
			    } else {
			        windowHeight = document.body.clientHeight;
			    }
//			    console.log("windowHeight:"+windowHeight);
			    return windowHeight;
			},
			
 
			//滚动条滚动高度
			getScrollHeight() {
			    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			    if (document.body) {
			        bodyScrollHeight = document.body.scrollHeight;
			    }
			    if (document.documentElement) {
			        documentScrollHeight = document.documentElement.scrollHeight;
			    }
			    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
//			    console.log("scrollHeight:"+scrollHeight);
			    return scrollHeight;
			}


		}
	}
</script>

<style scoped lang="less">
	.body{
		position: relative;
		height: 100%;
	}
	.filter{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 100;
		top: 0;
		left: 0;
		background: #00000052;
		transition: all .5s linear;
	}
	.left{
		left: 10%!important;
	}
	.filter-model{
		position: fixed;
		width: 90%;
		height: 100%;
		z-index: 101;
		top: 0;
		left: 100%;
		background: #fff;
		transition: all .5s linear;
		padding: 0.25rem;
		box-sizing: border-box;
		overflow-y: auto;
	}
	.filter-title{
		font-size: 0.34rem;
		color: #333333;
		letter-spacing: 0.03rem;
		padding-bottom: 0.25rem;
		box-sizing: border-box;
		border-bottom: 0.01rem solid #E5E5E5;
	}
	.lei{
		font-size: 0.28rem;
		color: #999999;
		letter-spacing: 0.03rem;
		margin-top: 0.15rem;
		margin-bottom: 0.5rem;
	}
	.btns{
		display: flex;
		flex-wrap: wrap;
	}
	.btns span{
		background-color: #f2f2f2;
		border-radius: 0.4rem;
		border: solid 0.01rem #fff;
		font-size: 0.24rem;
		color: #333333;
		letter-spacing: 0.02rem;
		height: 0.7rem;
		line-height: 0.7rem;
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		box-sizing: border-box;
		margin-right: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.rule{
		color: #FFFFFF!important;
		background: #3388FF!important;
		border: solid 0.01rem #3388ff!important;
		
	}
	.btnList{
		display: flex;
		padding-left: 30%;
		box-sizing: border-box;
		margin-top: 0.4rem;
	}
	.no{
		width: 2rem;
		height: 0.8rem;
		background-color: #fdba00;
		border-radius: 0.4rem;
		text-align: center;
		line-height:0.8rem ;
		color: #FFFFFF;
		letter-spacing: 0.03rem;
		margin-right: 0.3rem;
	}
	.yes{
		width: 2rem;
		height: 0.8rem;
		background-color: #3388FF;
		border-radius: 0.4rem;
		text-align: center;
		line-height:0.8rem ;
		color: #FFFFFF;
		letter-spacing: 0.03rem;
	}
	.city{
		display: flex;
		margin-bottom: 0.5rem;
	}
	.big{
		width: 0.27rem!important;
		height: 0.27rem!important;
	}
	.city input{
		background: #F2F2F2;
		height: 0.6rem;
		border-radius: 0.4rem;
		line-height: 0.6rem;
		width: 1rem;
		margin-right: 0.2rem;
		text-align:center;
		padding-right: 0.2rem;
		font-size: 0.32rem;
	}
	.moneyName{
		font-size: 0.32rem;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0.03rem;
		line-height: 0.6rem;
		color: #333333;
	}
	.chengshi{
		display: inline-block;
		width: 1.7rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background-color: #f2f2f2;
		border-radius: 0.3rem;
		text-align: center;
		color: #999999;
		font-size: 0.26rem;
		letter-spacing: 0.03rem;
		margin-right: 0.15rem;
	}
	.main{
		padding: 0.25rem;
		/*padding-bottom: 1rem;*/
		box-sizing: border-box;
		/*width: 100%;
		height: 100%;*/
		
	}
	.xuanzhuan{
		transition: all .3s linear;
		transform:rotate(180deg); 
	}
	.xuanzhuan2{
		transition: all .3s linear;
		transform:rotate(0deg);
	}
	.golo{
		height: 0.7rem;
		display: flex;
		margin: auto;
		text-align: center;
	}
	.progress{
		display: flex;
		justify-content: space-between;
		height: 0.3rem;
		margin: auto;
		margin-top: 0.5rem;
	}
	.tab{
		width: 33%;
		font-size: 0.32rem;
		letter-spacing: 0.03rem;
		color: #bababa;
		text-align: center;
	}
	.border{
		border-right: 0.01rem solid #BABABA;
		border-left: 0.01rem solid #BABABA;
	}
	.tab span{
		border-bottom: 0.03rem solid #fff;
		padding-bottom: 0.1rem;
	}
	.active{
		border-bottom: 0.03rem solid #3388FF!important;
		color: #3388FF!important;
	}
	.view{
		padding: 0.15rem;
		box-sizing: border-box;
		border-top: 0.01rem solid #E5E5E5;
		margin-top: 0.3rem;
		
	}
	.view-model{
		padding: 0.15rem;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(51, 136, 255, 0.2);
		border-radius: 0.2rem;
	}
	.view-tab{
		border-bottom: 0.01rem solid #E5E5E5;
		display: flex;
		padding-bottom: 0.2rem;
		box-sizing: border-box;
	}
	.view-tab li{
		/*width: 20%;*/
		margin-right: 0.8rem;
		color: #999999;
		letter-spacing: 0.02rem;
	}
	.act{
		color: #333333!important;
	}
	.projectList{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 0.2rem;
	}
	/**/
	.pop{
		
	}
	.bgImg{
		width: 0.18rem;
		height: 0.18rem;
	}
	.plate{
		width:6.5rem;
		/*height: 100%;*/
		padding-bottom: 1rem;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.palte-title{
		border-bottom: 0.01rem solid #E5E5E5;
		color: #333333;
		font-size: 0.34rem;
		padding: 0.2rem;
		box-sizing: border-box;
		letter-spacing: 0.03rem;
	}
	.show-model{
		padding: 0.2rem;
		box-sizing: border-box;
	}
	.name{
		letter-spacing: 0.03rem;
		font-size: 0.28rem;
		color: #999999;
	}
	.lei-list{
		display: flex;
		flex-wrap: wrap;
	}
	.lei-list span{
		background: #F2F2F2;
		border-radius: 0.4rem;
		padding: 0.2rem;
		font-size: 0.24rem;
		letter-spacing: 0.02rem;
		color: #333333;
		display: block;
		margin-top: 0.3rem;
		margin-right: 0.1rem;
	}
	.rubg{
		background: #3388ff!important;
		color: #FFFFFF!important;
	}
	.top{
		margin-top: 0.3rem;
	}
	.flex{
		line-height: 0.4rem;
	}
	.loca{
		display: block;
		width: 1.3rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		background: #F2F2F2;
		border-radius: 0.2rem;
		font-size: 0.26rem;
		color: #999999;
	}
	.tishi{
		color: darkgrey;
		font-size: 0.28rem;
		text-align: left;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
</style>