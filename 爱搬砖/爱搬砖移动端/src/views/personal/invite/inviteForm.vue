<template>
	<div class="addBasic">
		<div class="form">
			<div class="import">
				<span class="import-title">招聘标题</span>
				<input type="text" placeholder="请输入标题" v-model="title" />
			</div>
			<div class="import">
				<span class="import-title">联系电话</span>
				<input type="number" placeholder="请输入联系电话" v-model="mobile" />
			</div>
			<div class="import">
				<span class="import-title">招聘职位</span>
				<JobSelect @giveId="giveId" :cityString="jobTwo"></JobSelect>
			</div>
			<div class="import">
				<span class="import-title">招聘人数</span>
				<input type="number" placeholder="请输入招聘人数" v-model="nums" />
			</div>
			<div class="import">
				<span class="import-title">薪资</span>
				<pickPay @giveLay="giveLay"  :lays = "min_pay" :cityString="unit" :id="quantity_unit"></pickPay>
			</div>
			<div class="import">
				<span class="import-title">工作地点</span>
				<CitySelect @give="give" :cityString="regionName?regionName:'请选择工作地点'"></CitySelect>
			</div>
			<div class="import">
				<span class="import-title">工龄要求</span>
				<input type="number" placeholder="请输入工龄要求" v-model="work_time" />
			</div>
			<div class="import">
				<span class="import-title">工期</span>
				<input type="number" placeholder="请输入工期/天" v-model="construction_period" />
				<span class="tian">天</span>
			</div>
			<div class="import">
				<span class="import-title">开工时间</span>
				<pickDate :cityString="start_time?start_time:'请选择项目开始时间'" @giveDate="giveDate"></pickDate>
			</div>
			<div class="content">
				<p class="title">职位介绍</p>
				<textarea placeholder="请输入职位介绍" v-model="content"></textarea>
			</div>
		</div>
		<div class="save" @click="save" v-if="!id">保存</div>
		<!--修改保存-->
		<div class="save" @click="setSave" v-if="id">保存</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				Toast:Toast,
				regionName:'',
				flag:false,
				unit:'选择单位',
				lay:'',
				nature:'',
				title:'',
				mobile:'',
				recruit_type:'',
				work_type:'',
				nums:'',
				min_pay:'',
				quantity_unit:1,
				region:'',
				publisher:1,
				work_time:'',
				content:'',
				construction_period:'',
				start_time:'',
				id:null,
				tid:null,
				isSave:true,
				works:[],
				jobTwo:'请选择职位',
			}
			
		},
		created() {
			this.nature = this.$route.params.id;
			this.publisher = this.$route.query.publisher;
			if(this.$route.query.tid){this.tid=this.$route.query.tid};
			if(this.$route.query.id){
				this.id = this.$route.query.id
				//渲染
			} 
		},
		mounted() {
			if(this.id){
				this.$http.get(`/member/recruit/${this.id}/edit`).then(res=>{
					if(res.code == 200) {
//						this.works = res.data.works
//						console.log(this.works)
						var info = res.data.detail
						this.construction_period=info.construction_period;
						this.content=info.content;
						this.id = info.id
						this.min_pay=info.min_pay;
						this.mobile = info.mobile;
						this.nature = info.nature;
						this.nums = info.nums;
						this.publisher=info.publisher;
						this.quantity_unit = info.quantity_unit;
						this.recruit_type = info.recruit_type;
						this.regionName = info.region.map(value=>value.title).join('-');
						this.region = info.region[1].id || info.region[2].id;
						this.start_time = info.start_time;
						this.title = info.title;
						this.work_time = info.work_time;
						this.work_type = info.work_type.id;
						this.jobTwo  = info.work_type.title
					}
				})
			}
			//
//			this.$http.get("/common/getworks").then(res=>{
//				if(res.code == 200) {
//					this.works = res.data
////					console.log(this.works)
//				}
//			})
		},
		computed: {
//			workName() {
//				if(this.works && this.work_type){
//					var one = this.works.find(value=>{
//					if(value.id == this.work_type) {
//						return value.work_name
//						}
//					
//					})
//					console.log(this.work_type)
////					return one.work_name+'-'+this.jobTwo
//				}else {
//					return '请选择职位'
//				}
//				
//			}
		},
		methods: {
			//查询职位
			save() {
//				var data = {
//					title:this.title,
//					nature:this.nature,
//					mobile:this.mobile,
//					recruit_type:this.recruit_type,
//					work_type:this.work_type,
//					nums:this.nums,
//					min_pay:this.min_pay,
//					quantity_unit:this.quantity_unit,
//					region:this.region,
//					publisher:this.publisher,
//					work_time:this.work_time,
//					content:this.content,
//					construction_period:this.construction_period,
//					start_time:this.start_time,
//				}
				
				if(this.isSave){
					this.isSave = false;
					if(this.publisher ==1){ //企业
						var data = {
							title:this.title,
							nature:this.nature,
							mobile:this.mobile,
							recruit_type:this.recruit_type,
							work_type:this.work_type,
							nums:this.nums,
							min_pay:this.min_pay,
							quantity_unit:this.quantity_unit,
							region:this.region,
							publisher:this.publisher,
							work_time:this.work_time,
							content:this.content,
							construction_period:this.construction_period,
							start_time:this.start_time,
						}
					}else if(this.publisher == 2){
						var data = {
							tid:this.tid,
							title:this.title,
							nature:this.nature,
							mobile:this.mobile,
							recruit_type:this.recruit_type,
							work_type:this.work_type,
							nums:this.nums,
							min_pay:this.min_pay,
							quantity_unit:this.quantity_unit,
							region:this.region,
							publisher:this.publisher,
							work_time:this.work_time,
							content:this.content,
							construction_period:this.construction_period,
							start_time:this.start_time,
						}
					}
					var that = this
					this.$http.post("/member/recruit",data).then(res=>{
						if(res.code == 200) {
							this.Toast.success(res.msg);
							setTimeout(()=>{
								this.isSave=true
								that.$router.go(-1)
//								if(that.tid){
//									that.$router.push('/inviteList/2')
//								}else {
//									that.$router.push('/inviteList/1')
//								}
								
							},2000)
						}else {
							this.isSave=true
						}
					})
				}
			},
			setSave() {
				if(this.isSave){
					this.isSave = false;
					if(this.publisher ==1){ //企业
						var data = {
							id:this.id,
							title:this.title,
							nature:this.nature,
							mobile:this.mobile,
							recruit_type:this.recruit_type,
							work_type:this.work_type,
							nums:this.nums,
							min_pay:this.min_pay,
							quantity_unit:this.quantity_unit,
							region:this.region,
							publisher:this.publisher,
							work_time:this.work_time,
							content:this.content,
							construction_period:this.construction_period,
							start_time:this.start_time,
						}
					}else if(this.publisher == 2){
						var data = {
							tid:this.tid,
							id:this.id,
							title:this.title,
							nature:this.nature,
							mobile:this.mobile,
							recruit_type:this.recruit_type,
							work_type:this.work_type,
							nums:this.nums,
							min_pay:this.min_pay,
							quantity_unit:this.quantity_unit,
							region:this.region,
							publisher:this.publisher,
							work_time:this.work_time,
							content:this.content,
							construction_period:this.construction_period,
							start_time:this.start_time,
						}
					}
					
					var that = this
					that.$http.post("/member/recruit/update",data).then(res=>{
						if(res.code == 200) {
							this.Toast.success(res.msg);
							setTimeout(()=>{
	//							that.$router.push('/inviteList')
//								if(that.tid){
//									that.$router.push('/inviteList/2')
//								}else {
//									that.$router.push('/inviteList/1')
//								}
								this.isSave = true;
								that.$router.go(-1)
							},2000)
						}else {
							this.isSave = true;
						}
					})
				}
			},
			giveId(arr) {
				this.recruit_type = arr[0]
				this.work_type = arr[1]
			},
			giveLay(lay){
//				console.log(lay)
				if(lay.lay){
					this.min_pay = lay.lay;
				}
				if(lay.id) {
					this.quantity_unit=lay.id
				}
				
			},
			give(id) {
				this.region = id
			},
			giveDate(data){
				this.start_time = data
			},
		}
	}
</script>

<style scoped lang="less">
	.content{
		height:5rem;
		.title{
			line-height: 1.1rem;
			font-size: 0.3rem;
			color: #555555;
		}
		textarea{
			width: 100%;
			border: 0.01rem solid #E5E5E5;
			padding: 0.2rem;
			box-sizing: border-box;
			border-radius: 0.1rem;
			height: 3.5rem;
			font-size: 0.3rem;
			color: #555555;
		}
	}
	.tian{
		font-size: 0.3rem;
			color: #555555;
	}
.del ,.save{
		margin-top: 0.3rem;
		width: 5.8rem;
		margin: auto;
		height: 1rem;
		background: #FFFFFF;
		border-radius: 0.5rem;
		opacity: 0.9;
		margin-top: 0.3rem;
		text-align: center;
		line-height: 1rem;
		font-size: 0.34rem;
		letter-spacing: 0.03rem;
	}
	.save{
		background-color: #3388ff;
		color: #FFFFFF;
	}
	.addBasic{
		padding: 0.25rem;
		width: 100%;
		/*width:7rem;*/
		margin: auto;
		overflow: hidden;
		box-sizing: border-box;
		background: #fafafa;
		.form{
			width: 100%;
			padding: 0.25rem;
			box-sizing: border-box;
			border-radius: 0.2rem;
			background-color: #ffffff;
			box-shadow: 0 0.06rem 0.15rem 0 
				rgba(44, 133, 255, 0.15);
		}
	}
	.letter-none{
		width: 3rem!important;
	}
	.import{
		height: 1.3rem;
		line-height: 1.1rem;
		font-size: 0.3rem;
		color: #555555;
		position: relative;
		border-bottom: 0.01rem dashed #e5e5e5;
		padding-bottom: 0.1rem;
		padding-top: 0.1rem;
		box-sizing: border-box;
		display: flex;
		.import-title{
			letter-spacing: 0.02rem;
			display: block;
			width: 2rem;
		}
		input {
			/*padding-left: 0.25rem;*/
			padding-right: 0.25rem;
			box-sizing: border-box;
			font-size: 0.28rem;
			border: none;
			height: 100%;
			width: 100%;
			overflow: hidden;
		}
		input:disabled{
			background: #ffffff;
			opacity: 0.6;
		}
		.jiantous{
			display: block;
			width: 0.24rem;  
			height: 0.24rem;  
			position: absolute; 
			right: 0;
			top: 0.55rem; 
			border-left: 0.01rem solid #555555;  
			border-bottom: 0.01rem solid #555555;  
			-webkit-transform: translate(0,-50%) rotate(-135deg);  
			transform: translate(0,-50%) rotate(-135deg);  
		}
		.avatar{
			display: inline-block;
			position: absolute;
			right: 0;
			img{
				width: 0.9rem;
				height: 0.9rem;
				border-radius: 50%;
			}
		}
	}
</style>