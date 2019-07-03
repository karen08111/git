<template>
	<!--个人/团队视角-->
	<div class="main" v-if="userType==1 || userType==2">
		<Title title="银行卡认证"></Title>
		<div class="model">
			<div class="list">
				<span class="list-name letter">姓名:</span>
				<input type="text" placeholder="请填写真实姓名" disabled :value="userName"/>
			</div>
			<div class="list">
				<span class="list-name">身份证号:</span>
				<input type="text" placeholder="请填写身份证号" disabled :value="userIdent"/>
			</div>
			<div class="list">
				<span class="list-name letter">开户行:</span>
				<input type="text" placeholder="请选择开户行" @click="getShow" :value="bankName" />
				<van-popup v-model="show" position="bottom">
					<van-area :area-list="areaList" columns-num='1' @confirm="getValue" />
				</van-popup>
			</div>
			<div class="list border">
				<span class="list-name">银行卡号:</span>
				<input type="number" placeholder="请输入银行卡号" v-model="bankId"/>
			</div>
		</div>
		<div class="next" @click="nexts">下一步</div>
	</div>
	<!--企业视角-->
	<div class="main" v-else>
		<Title title="银行卡认证"></Title>
		<div class="model">
			<div class="list">
				<span class="list-name">公司全称:</span>
				<input type="text" placeholder="请输入公司全称" disabled :value="userName"/>
			</div>
			<div class="list">
				<span class="list-name letter">开户行:</span>
				<input type="text" placeholder="请选择开户行" @click="getShow" :value="bankName" />
				<van-popup v-model="show" position="bottom">
					<van-area :area-list="areaList" columns-num='1' @confirm="getValue" />
				</van-popup>
			</div>
			<div class="list">
				<span class="list-name letter">姓名:</span>
				<input type="text" placeholder="请输入银行卡持有者姓名" v-model="youName"/>
			</div>
			<div class="list border">
				<span class="list-name">银行卡号:</span>
				<input type="number" placeholder="请输入银行卡号" v-model="bankId"/>
			</div>
			<!--<div class="list border">
				<span class="list-name">打款金额:</span>
				<input type="number" placeholder="请输入对公银行打款金额" v-model="bankRmb"/>
			</div>-->
		</div>
		<div class="next" @click="qiNext">下一步</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				userName:'',
				userIdent:'',
				bankName:'',
				bankId:'',
				show:false,
				bankRmb:'',
				youName:'',
				areaList:{
					province_list: {
					    1: '中国银行',
					    2: '中国工商银行',
					    3: '中国农业银行',
					    4: '中国建设银行'
					}
				},
				//角色类型
				userType:''
			}
		},
		created() {
			this.userName = this.$route.query.name;
			this.userIdent = this.$route.query.ident;
			this.userType = this.$route.query.id;//角色认证id
		},
		methods: {
			//个人/团队提交
			nexts() {
				if(this.bankName && this.bankId){
//					this.$router.push('/three')
					let formData = new FormData() ;
					formData.append("mold",this.userType);
					formData.append("full_name",this.userName);
					formData.append("card",this.bankId);
					formData.append("card_bank",this.bankName);
					this.$http.post("/member/bank",formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
						
						if(res.code==200){
							this.$router.push({
								path: '/three',
								query: {
									id:this.userType
								}
							})
						}else{
							this.$toast.fail(res.msg);
						}
					})
				}else{
					this.$toast.fail('填写完整')
				}
				
			},
			getShow() {
				this.show=true
			},
			getValue(e) {
				console.log(e[0].name)//选择的银行
				this.bankName = e[0].name
				this.show=false
			},
			//企业提交
			qiNext() {
//				console.log(this.userName,this.bankName,this.bankId,this.bankRmb)
				if(this.youName && this.bankName && this.bankId ){
					let formData = new FormData();
					formData.append("mold",this,userType);
					formData.append("full_name",this.youName);
					formData.append("card",this.bankId);
					formData.append("card_bank",this.bankName);
					this.$http.post("/member/bank",formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
						if(res.code==200){
							this.$router.push({
								path: '/three',
								query: {
									id:this.userType
								}
							})
						}else {
							this.$toast.fail(res.msg)
						}
					})
				}else{
					this.$toast.fail('填写完整')
				}
			}
		}
	}
</script>

<style scoped lang="postcss">
	.main{
		padding: 0.25rem;
		box-sizing: border-box;
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
	}
	.list{
		height: 1.05rem;
		border-bottom: 0.01rem dashed #E5E5E5;
		line-height: 1.05rem;
		display: flex;
		position: relative;
	}
	.list input{
		padding-left: 0.1rem;
		box-sizing: border-box;
		width: 65%;
	}
	.list-name{
		font-size: 0.28rem;
		color: #333333;
		display: inline-block;
		width: 1.3rem;
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
	input:disabled{
		background: none;
		color: grey;
	}
</style>