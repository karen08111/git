<template>
	<div class="addBasic">
		<div class="form">
			<div class="import">
				<span class="import-title">姓名</span>
				<input type="text" placeholder="请输入姓名" v-model="user_name" />
			</div>
			<div class="import">
				<span class="import-title">证件类型</span>
				<common :list="identList" @giveYouId="giveYouId" :cityString="pla?pla:'请选择证件类型'"></common>
			</div>
			<div class="import">
				<span class="import-title">证件号码</span>
				<input type="text" placeholder="请输入证件号码" v-model="card_num" />
			</div>
			<div class="import">
				<span class="import-title">手机号码</span>
				<input type="number" placeholder="请输入联系方式" v-model="mobile" />
			</div>
			<div class="import">
				<span class="import-title">年龄</span>
				<input type="number" placeholder="请输入年龄" v-model="age" />
			</div>
			<div class="import">
				<span class="import-title">工龄</span>
				<input type="number" placeholder="请输入工龄" v-model="work_time" />
			</div>
			<div class="import">
				<span class="import-title">邮箱</span>
				<input type="email" placeholder="请输入邮箱(选填)" v-model="email" />
			</div>
			<div class="import">
				<span class="import-title">团队负责人</span>
				<common :list="isList" :cityString="is_leader==0?'否':'是'" @giveYouId="giveBoss"></common>
			</div>
		</div>
		<div class="save" @click="save" v-if="!id">保存</div>
		<div class="save" @click="set" v-if="id">保存</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				pla:null,
				Toast:Toast,
				user_name:'',
				card_type:null,
				card_num:null,
				mobile:null,
				age:null,
				work_time:null,
				email:null,
				is_leader:0,
				tid:'',
				identList:[],
				isList:[{
					id:0,
					title:'否'
				},{
					id:1,
					title:'是'
				}],
				id:'',
				isSave:true,
			}
		},
		created() {
			this.tid = this.$route.query.tid
			if(this.$route.query.id){
				this.id = this.$route.query.id
				//查找用户信息
				var data={
					id:this.id
				}
				this.$http.get("/member/teamMamber/"+this.id+"/edit").then(res=>{
//					console.log(res)
					if(res.code == 200) {
						this.user_name = res.data.user_name;
						this.card_type = res.data.card_type.id;
						this.card_num = res.data.card_num;
						this.mobile = res.data.mobile;
						this.age = res.data.age;
						this.work_time = res.data.work_time;
						this.email = res.data.email;
						this.is_leader = res.data.is_leader;
						this.pla = res.data.card_type.title;
					}
				})
			}
		},
		mounted() {
			this.getIdent()
		},
		methods: {
			save() {
				if(this.isSave){
					this.isSave = false
					var data = {
						user_name:this.user_name,
						card_type:this.card_type,
						card_num:this.card_num,
						mobile:this.mobile,
						age:this.age,
						work_time:this.work_time,
						email:this.email,
						is_leader:this.is_leader,
						tid:this.tid
					}
					var that = this;
					this.$http.post("/member/teamMamber",data).then(res=>{
						if(res.code == 200) {
							that.Toast(res.msg)
							setTimeout(function(){
								that.isSave = true
//								that.$router.push("/memberList")
								that.$router.go(-1)
							},1500)
						}else {
							that.isSave = true
						}
					})
				}
				
			},
			set() {
				var that = this;
				if(that.isSave){
					that.isSave = false
					var data = {
						user_name:this.user_name,
						card_type:this.card_type,
						card_num:this.card_num,
						mobile:this.mobile,
						age:this.age,
						work_time:this.work_time,
						email:this.email,
						is_leader:this.is_leader,
						tid:this.tid,
						id:this.id,
					}
					this.$http.post("/member/teamMamber/update",data).then(res=>{
						if(res.code == 200) {
							that.Toast(res.msg)
							setTimeout(function(){
								that.isSave = true
//								that.$router.push("/memberList")
								that.$router.go(-1)
							},1500)
						}else {
							that.isSave = true;
						}
					})
				}
			},
			giveBoss(id) {
				this.is_leader = id;
			},
			giveYouId(id) {
				this.card_type = id;
			},
			//获取身份类型
			getIdent() {
				this.$http.get("/common/cardType").then(res=>{
					if(res.code == 200) {
						this.identList = res.data
					}
				})
			}
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
	.save{
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
		background-color: #3388ff;
		color: #FFFFFF;
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
			width: 2.5rem;
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