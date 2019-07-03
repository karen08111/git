<template>
	<div class="addBasic">
		<div class="form">
			<div class="import">
				<span class="import-title">工作单位</span>
				<input type="text" placeholder="请输入工作单位" v-model="ach_name" />
			</div>
			<div class="import">
				<span class="import-title">工作类型</span>
				<common :cityString="work_type?work_type:'请选择擅长行业'" :list="jobList" @giveYouId="giveYouId"></common>
				<!--<JobSelect @giveId="giveId" :cityString="userInfo?userInfo.job_type.Sub.title:'请选择工种'"></JobSelect>-->
			</div>
			<div class="import">
				<span class="import-title">开始时间</span>
				<pickDate :cityString="userInfo?userInfo.start_time:'请选择开始日期'" @giveDate="startTime"></pickDate>
			</div>
			<div class="import">
				<span class="import-title">结束时间</span>
				<pickDate :cityString="userInfo?userInfo.end_time:'不选则表示至今'" @giveDate="endTime"></pickDate>
			</div>
			<div class="import">
				<span class="import-title">工作地点</span>
				<CitySelect @give="give" :nums="2" :cityString="userInfo?userInfo.region[0].title+'-'+userInfo.region[1].title:'请选择工作地点'"></CitySelect>
			</div>
			<div class="im-intr">
				<span class="import-title line-height">经历说明</span>
				<div class="textarea">
					<textarea v-model="content" style="resize:none" placeholder="请输入经历说明"></textarea>
				</div>
			</div>
		</div>
		<div class="del" @click="del" v-if="type!='add'">删除</div>
		<div class="save" @click="save">保存</div>
	</div>
</template>

<script>
	import { Toast, Dialog } from 'vant';
	export default {
		data() {
			return {
				Toast:Toast,
				type:'',
				ach_name:'',//
				start_time:'',
				end_time:'',
				job_type:'',
				region:'',
				content:'',
				naturn:'',
				userInfo:null,
				id:'',//简历id
				work_type:null,
				jobList:[],
			}
		},
		created() {
			this.type = this.$route.params.id
			if(this.$route.query) this.id = this.$route.query.id
			if(this.type != 'add'){
				this.getUserInfo();
			}
			this.getJobs();
		},
		methods: {
			del() {
				Dialog.confirm({
					title: ' ',
					message: '是否确认删除'
				}).then(() => {
					this.$http.get("/member/jobcase/"+this.type+"/delete").then(res=>{
						if(res.code ==200) {
							this.Toast.success(res.msg);
							setTimeout(()=>{
								this.$router.push('/team')
							},2000)
						}
					})
				})
			},
			//获取信息渲染
			getUserInfo() {
				this.$http.get("/member/jobcase/"+this.type+"/edit").then(res=>{
					if(res.code==200){
//						console.log(res.data)
						this.id = res.data.id
						this.ach_name = res.data.ach_name
						this.start_time =res.data.start_time
						this.end_time = res.data.end_time
						this.job_type = res.data.job_type.id
						this.naturn = res.data.naturn
						this.region = res.data.region[1].id
						this.content = res.data.content
						this.work_type = res.data.job_type.title
						this.userInfo = res.data
					}
				})
			},
			giveId(id) {
				this.job_type = id[1]
			},
			give(city) {
				this.region = city
			},
			getJobs() {
				this.$http.get("/common/classify").then(res=>{
//					console.log(res)
					if(res.code == 200) {
						this.jobList = res.data
					}
				})
			},
			giveYouId(id){
				this.job_type = id
			},
			save() {
				if(this.type == 'add'){
					//新增
					var data={
						tid:this.id,
						ach_name:this.ach_name,
						job_type:this.job_type,
						start_time:this.start_time,
						end_time:this.end_time || 0,
						region:this.region,
						content:this.content,
						nature:2
					}
					this.$http.post("/member/jobcase/save",data).then(res=>{
						if(res.code ==200) {
							this.Toast.success(res.msg);
							setTimeout(()=>{
								this.$router.push('/team')
							},2000)
						}
					})
				}else {
					//修改
					var data={
						tid:this.id,
						id:this.type,
						ach_name:this.ach_name,
						job_type:this.job_type,
						start_time:this.start_time,
						end_time:this.end_time,
						region:this.region,
						content:this.content,
						nature:2
					}
//					console.log(data)
					this.$http.post("/member/jobcase/update",data).then(res=>{
						if(res.code ==200) {
							this.Toast.success(res.msg);
							setTimeout(()=>{
								this.$router.push('/team')
							},2000)
						}
					})
				}
			},
			startTime(time) {
				this.start_time = time
			},
			endTime(time) {
				this.end_time = time
			},
		}
	}
</script>

<style scoped lang="less">
	.im-intr{
		
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
	.line-height{
		line-height: 1.1rem;
	}
	.textarea textarea{
		width: 100%;
		height: 5rem;
		overflow-y: auto;
		border: 0.01rem solid #e5e5e5;
		padding: 0.25rem;
		box-sizing: border-box;
		border-radius: 0.25rem;
	}
	.addBasic{
		padding: 0.25rem;
		width: 100%;
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