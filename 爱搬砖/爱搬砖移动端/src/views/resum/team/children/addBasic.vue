<template>
	<div class="addBasic">
		<div class="form">
			<div class="import">
				<span class="import-title">头像</span>
				<span class="avatar">
					<!--<img src="../../../../assets/images/6.png"/>-->
					<van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
						<img v-if="avatar" :src="baseURL+avatar"/>
						<img v-else src="../../../../assets/none.png"/>
					</van-uploader>
				</span>
				<!--<input type="text" placeholder="请输入"/>-->
				<!--<span class="jiantous"></span>-->
			</div>
			<div class="import">
				<span class="import-title">团队名称</span>
				<input type="text"  v-model="name" placeholder="请输入团队名称"/>
			</div>
			<div class="import">
				<span class="import-title">联系电话</span>
				<input type="number" placeholder="请输入联系电话" v-model="mobile" />
			</div>
			<div class="import">
				<span class="import-title">微信号</span>
				<input type="text" placeholder="请输入微信号" v-model="wechat_number" />
			</div>
			<!--<div class="import">
				<span class="import-title">年龄</span>
				<input type="text" placeholder="请输入"/>
			</div>-->
			<div class="import">
				<span class="import-title">所在地区</span>
				<CitySelect @give="give" :cityString="regionName?regionName:'请选择工作地点'" :nums="2"></CitySelect>
			</div>
			<div class="import">
				<span class="import-title">擅长行业</span>
				<common :cityString="work_type?work_type:'请选择擅长行业'" :list="jobList" @giveYouId="giveYouId"></common>
			</div>
			<!--<div class="import">
				<span class="import-title">工作状态</span>
				<common :cityString="current_stateName" @giveYouId="giveYouId" :list = "columns"></common>
			</div>-->
			<!--<div class="import">
				<span class="import-title">重大病史</span>
				<common :cityString="isBing" @giveYouId="giveBing" :list = "bing"></common>
			</div>-->
			<div class="import">
				<span class="import-title letter-none">团队创建时间</span>
				<pickDate :cityString="work_time?work_time:'请选择日期'" @giveDate="giveDate"></pickDate>
			</div>
			<!--<div class="import">
				<span class="import-title">薪资</span>
				<pickPay @giveLay="giveLay" :cityString="unit"  :lays = "lay"></pickPay>
			</div>-->
			<!--<div class="import">
				<span class="import-title">结账方式</span>
				<common :cityString="isGong" @giveYouId="giveFang" :list = "checkoutList"></common>
			</div>-->
		</div>
		<div class="save" @click="save">保存</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { Toast } from 'vant';
//	import SimpleCropper from '@/components/froms/SimpleCropper'
	export default {
		data() {
			return {
				unit:'',
				lay:'',
				jobTwo:'',
				works:null,
				regionName:'',
				baseURL:baseURL,
				Toast:Toast,
				avatar:null,
				userInfo:null,
				checkoutList:[],
				columns:[
					{
						id:0,
						title:'空闲中'
					},
					{
						id:1,
						title:'工作中'
					}
				],
				bing:[
					{
						id:0,
						title:'否'
					},
					{
						id:1,
						title:'是'
					}
				],
				jobList:[],
				name:'',
				work_time:'',//参加工作时间
				resume_type:'',//1.技术工种2.司机/驾驶员
				work_type:'',//工种
				has_bad_medical_history:0,////是否有重大病史  0:否 ，1:是
				min_pay:'',//薪资
				quantity_unit:'',//薪资单位
				mobile:'',//联系电话
				current_state:'',//目前状态 0：空闲中、1：工作中
				wechat_number:'',//微信号
				region:'',//地址
				checkout:'',//结账方式   1：日结、2：周结、3：月结、4：结束总结
				
			}
		},
		computed: {
			current_stateName() {
				if(this.current_state == 0){
					return '空闲中'
				}else if(this.current_state ==1) {
					return '工作中'
				}else {
					return '请选择工作状态'
				}
			},
			workName() {
				if(this.works && this.resume_type){
					var one = this.works.find(value=>{
					if(value.id == this.resume_type) {
						return value.work_name
						}
					
					})
					return one.work_name+'-'+this.jobTwo
				}else {
					return '请选择职位'
				}
				
			},
			isBing() {
				if(this.has_bad_medical_history==0){
					return '否'
				}else if(this.has_bad_medical_history == 1){
					return '是'
				}else {
					return '请选择是否有重大疾病'
				}
			},
			isGong() {
				if(this.checkoutList) {
					var name = this.checkoutList.find(value=>{
						if(value.id == this.checkout){return value.title}
					})
					if(name){
						return name.title
					}
//					return name.title
				}else {
					return '请选择结账方式'
				}
			}
		},
		methods: {
			onRead(file) {
			    var data={file:file.content}
			    this.$http.post("/member/team/avatar",data).then(res=>{
			    	if(res.code == 200) {
			    		this.avatar = res.data.path
			    	}
			    }).catch(res=>{
			    	this.Toast('上传图片过大,请截取')
			    })
			},
			giveLay(lay){
				this.min_pay = lay.lay;
				this.quantity_unit=lay.id
			},
			give(id) {
				this.region = id
			},
			giveDate(data){
				this.work_time = data
			},
			giveId(arr) {
				this.resume_type = arr[0]
				this.work_type = arr[1]
			},
			giveYouId(id) {
				this.industry_type = id
			},
			giveBing(id) {
				this.has_bad_medical_history = id
			},
			giveFang(id) {
				this.checkout = id
			},
			save() {
				var data = {
					team_name:this.name,
					mobile:this.mobile,
					team_create_time:this.work_time,
					wechat_number:this.wechat_number,
					industry_type:this.industry_type,
					region:this.region
				}
				var that = this
				this.$http.post("/member/team",data).then(res=>{
					if(res.code == 200) {
						that.Toast.success(res.msg);
						setTimeout(()=>{
							that.$router.push('/team')
						},2000)
					}
				})
			},
			getJobs() {
				this.$http.get("/common/classify").then(res=>{
//					console.log(res)
					if(res.code == 200) {
						this.jobList = res.data
					}
				})
			}
		},
		mounted() {
			this.getJobs();
			this.$http.get("/member/team/edit").then(res=>{
//				console.log(res.data.data)
				if(res.code == 200) {
//					this.columns = res.data
//					this.name = detail.name
					this.name = res.data.data.team_name
//					console.log(res.data.detail.name)
					this.works = res.data.works;
					var detail = res.data.data;
					this.userInfo = res.data.data;
					this.avatar =res.data.data.avatar;
					this.mobile= detail.mobile;
					this.industry_type = detail.industry_type.id
					this.wechat_number = detail.wechat_number;
//					this.current_state = detail.current_state;
//					if(detail.region.length>0) this.region = detail.region[1].id;
					this.region=detail.region.map(value=>value.id)[1] ;
//					this.quantity_unit = detail.quantity_unit.id
					this.resume_type = detail.resume_type
					this.work_type = detail.industry_type.title
					if(detail.team_create_time) this.work_time = detail.team_create_time[1]
					if(detail.region.length>0) this.regionName = detail.region.map(value=>value.title).join('-')
					
				}
				
			})
			//获取结账
			this.$http.get("/common/checkout").then(res=>{
				if(res.code == 200){
					this.checkoutList= res.data
				}
			})
		}
	}
</script>

<style scoped lang="less">
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