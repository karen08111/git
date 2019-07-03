<template>
	<div class="main">
		<Title title="个人认证"></Title>
		<div class="model">
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
			<div class="list border">
				<span class="list-name">证件号码:</span>
				<input type="text" placeholder="请填写证件号码" v-model="userIdent"/>
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
		</div>
		<div class="next" @click="nexts">提交认证</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	export default {
		data() {
			return {
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
			onRead(file){
				const formData = new FormData()
        		formData.append('file',file.file)
				this.$http.post("/member/auth/upload",formData).then(res=>{
					if(res.code==200) {
//						this.showZheng = 
						this.zhengUrl = res.data.path
					}
				}).catch(res=>{
			    	this.Toast('上传图片过大,请截取')
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
			nexts() {
				var that = this
				var data= {
					full_name:this.userName,
					card_type:this.code,
					id_card:this.userIdent,
					img_head:this.zhengUrl,
					img_tail:this.fanUrl
				}
				this.$http.post("/member/auth/person",data).then(res=>{
					if(res.code==200){
						setTimeout(()=>{
							that.$router.push('/')
						},200)
					}else {
						setTimeout(()=>{
							that.$router.push('/')
						},200)
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
	.margin-bottom{
		margin-bottom: 0.4rem;
	}
</style>