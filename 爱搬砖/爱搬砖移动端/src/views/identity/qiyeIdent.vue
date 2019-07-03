<template>
	<div class="main">
		<Title title="企业认证"></Title>
		
		<div class="model">
			<div class="check">
				<span class="list-name">身份选择:</span>
				<span class="check-box" v-for="(p,index) in check" @click="pickCheck(index,p.id)"><span :class="p.store?'check-active':''"></span>{{p.title}}</span>
			</div>
			<div class="yuan">
				<div class="list">
					<span class="list-name letter">姓名:</span>
					<input type="text" placeholder="请填写真实姓名" v-model="userName"/>
				</div>
				<div class="list">
					<span class="list-name">证件类型:</span>
					<!--<input type="text" placeholder="请选择证件类型" @click="shows" :value="ident" />-->
					<span class="picks" @click="shows">{{ident}}</span>
					<van-popup v-model="show" position="bottom" :overlay="true">
						<van-area :area-list="areaList" columns-num="1"  @confirm="getCity" @cancel="hide"  @change="setCity"/>
					</van-popup>
				</div>
				<div class="list">
					<span class="list-name">证件号码:</span>
					<input type="text" placeholder="请填写证件号码" v-model="userIdent"/>
				</div>
				<div class="list">
					<span class="list-name">公司全称:</span>
					<input type="text" placeholder="请填写公司全称" v-model="company_name"/>
				</div>
				<div class="list">
					<span class="list-name">企业信用代码:</span>
					<input type="text" placeholder="请填写证件号码" v-model="credit_code"/>
				</div>
				<div class="list border" v-if="radios==1">
					<span class="list-name">公司职位:</span>
					<input type="text" placeholder="请填写您在公司的职位" v-model="job_name"/>
				</div>
				<div class="pickIdent">
					<span class="pick-name">身份证正面照片:</span>
					<van-uploader :after-read="onRead">
						<div class="zheng">
							<img v-if="zhengUrl" :src="baseURL+zhengUrl"/>
							<img v-else src="../../assets/none.png"/>
						</div>
					</van-uploader>
				</div>
				<div class="pickIdent">
					<span class="pick-name">身份证反面照片:</span>
					<van-uploader :after-read="onRead2">
						<div class="zheng">
							<img v-if="fanUrl" :src="baseURL+fanUrl"/>
							<img v-else src="../../assets/none.png"/>
						</div>
					</van-uploader>
				</div>
				<div class="pickIdent" v-if="radios==1">
					<span class="pick-name">企业授权书:</span>
					<van-uploader :after-read="onRead3">
						<div class="zheng">
							<img v-if="shuUrl" :src="baseURL+shuUrl"/>
							<img v-else src="../../assets/none.png"/>
						</div>
					</van-uploader>
				</div>
				<div class="pickIdent">
					<span class="pick-name">营业执照照片:</span>
					<van-uploader :after-read="onRead4">
						<div class="zheng">
							<img v-if="zhiUrl" :src="baseURL+zhiUrl"/>
							<img v-else src="../../assets/none.png"/>
						</div>
					</van-uploader>
				</div>
			</div>
			
		</div>
		<div class="next" @click="nexts">提交认证</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	export default {
		data() {
			return {
				check:[
					{
						id:1,
						title:'企业员工',
						store:true
					},
					{
						id:2,
						title:'企业法人',
						store:false
					}
				],
				baseURL:baseURL,
				userName:'',
				userIdent:'',
				show: false,
				areaList:{
					province_list:{}
				},
				ident:'请选择身份类型',
				code:'',
				zhengUrl:'',
				fanUrl:'',
				company_name:'',//公司全称
				shuUrl:'',//企业授权书
				credit_code:'',//营业执照号
				zhiUrl:'',//营业执照
				radios:1,
				job_name:'',//公司职位
			}
		},
		mounted() {
			this.$http.get("/common/cardType").then(res=>{
				if(res.code==200){
					var arr ={}
					for(let i in res.data){
						arr[parseInt(res.data[i].id)] = res.data[i].title
					}
					this.areaList.province_list=arr
				}
			})
		},
		methods: {
			pickCheck(index,id){
				this.radios = id
				this.check[index].store = true
				for(let i in this.check){
					if(i!=index){
						this.check[i].store = false
					}
				}
			},
			onRead(file){
				const formData = new FormData()
        		formData.append('file',file.file)
				this.$http.post("/member/auth/upload",formData).then(res=>{
					if(res.code==200) {
//						this.showZheng = 
						this.zhengUrl = res.data.path
					}
				})
			},
			onRead2(file) {
				const formData = new FormData()
        		formData.append('file',file.file)
				this.$http.post("/member/auth/upload",formData).then(res=>{
					if(res.code==200) {
						this.fanUrl = res.data.path
					}
				})
			},
			//企业授权书
			onRead3(file) {
				const formData = new FormData()
        		formData.append('file',file.file)
				this.$http.post("/member/auth/upload",formData).then(res=>{
					if(res.code==200) {
						this.shuUrl = res.data.path
					}
				})
			},
			//营业执照
			onRead4(file){
				const formData = new FormData()
        		formData.append('file',file.file)
				this.$http.post("/member/auth/upload",formData).then(res=>{
					if(res.code==200) {
						this.zhiUrl = res.data.path
					}
				})
			},
			nexts() {
				var that = this
				var data= {
					full_name:this.userName,
					card_type:this.code,
					id_card:this.userIdent,
					img_head:this.zhengUrl,
					img_tail:this.fanUrl,
					job_name:this.job_name,
					company_name:this.company_name,
					img_path:this.zhiUrl,
					auth_certify:this.shuUrl,
					credit_code:this.credit_code
					
				}
				this.$http.post("/member/auth/company",data).then(res=>{
					if(res.code==200){
						setTimeout(()=>{
							that.$router.push('/')
						},2000)
					}else {
						setTimeout(()=>{
							that.$router.push('/')
						},2000)
					}
				})
			},
			shows() {
				this.show=true
			},
			getCity(e){
				this.ident = e[0].name
				this.code = e[0].code
				this.show=false
			},
			hide(){
				this.show=false
			},
			setCity() {
				
			}
		}
	}
</script>

<style scoped lang="less">
	.check-active{
		background: #3388ff!important;
	}
	.check{
		display: flex;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		line-height: 0.5rem;
		.check-box{
			margin-left: 0.3rem;
			display: flex;
			font-size: 0.28rem;
			color: #555555;
			letter-spacing: 0.01rem;
			display: inline-block;
			
			span{
				display: inline-block;
				width: 0.3rem;
				height: 0.3rem;
				border-radius: 50%;
				background: #999999;
				position: relative;
				top: 0.06rem;
				margin-right: 0.1rem;
			}
		}
	}
	.pick-name{
		font-size: 0.28rem;
			color: #333333;
	}
	.pickIdent{
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.zheng{
		width: 100%;
		height: 3.26rem;
		border: 0.01rem solid #eaeaea;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.zheng img{
		width: 100%;
		height: 100%;
	}
	input:disabled{
	    background-color: #ffffff;
	}
	.main{
		padding: 0.25rem;
		padding-bottom: 1rem;
		box-sizing: border-box;
	}
	.picks{
		font-size: 0.28rem;
    	color: #333333;
	}
	.model{
		/*height: 2.14rem;*/
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0 
			rgba(44, 133, 255, 0.3);
		border-radius: 0.2rem;	
		margin-top: 0.3rem;	
		padding: 0.2rem;
		box-sizing: border-box;
		position: relative;
	}
	.list{
		height: 1.05rem;
		border-bottom: 0.01rem dashed #E5E5E5;
		line-height: 1.05rem;
		display: flex;
	}
	.list-name{
		font-size: 0.28rem;
		color: #333333;
		display: inline-block;
		width: 2rem;
	}
	.letter{
		letter-spacing: 0.06rem;
	}
	.next{
		width:5.8rem;
		height: 1rem;
		background-color: #3388ff;
		border-radius: 0.5rem;
		opacity: 0.9;
		font-size: 0.34rem;
		line-height: 1rem;
		text-align: center;
		letter-spacing: 0.03rem;
		color: #FFFFFF;
		margin: auto;
		margin-top: 1rem;
	}
	.border{
		border-bottom: 0.01rem dashed #FFFFFF;
	}
	.next{
		width:5.8rem;
		height: 1rem;
		background-color: #3388ff;
		border-radius: 0.5rem;
		opacity: 0.9;
		font-size: 0.34rem;
		line-height: 1rem;
		text-align: center;
		letter-spacing: 0.03rem;
		color: #FFFFFF;
		margin: auto;
		margin-top: 1rem;
	}
	.margin-bottom{
		margin-bottom: 0.4rem;
	}
</style>