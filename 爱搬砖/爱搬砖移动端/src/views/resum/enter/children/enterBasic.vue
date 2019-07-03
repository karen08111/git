<template>
	<div class="addBasic">
		<div class="form">
			<div class="import">
				<span class="import-title">头像</span>
				<span class="avatar">
					<!--<img src="../../../../assets/images/6.png"/>-->
					<van-uploader :after-read="onRead" accept=" image/jpeg" multiple>
						<img v-if="avatar" :src="baseURL+avatar"/>
						<img v-else src="../../../../assets/none.png"/>
					</van-uploader>
				</span>
				<!--<input type="text" placeholder="请输入"/>-->
				<!--<span class="jiantous"></span>-->
			</div>
			<div class="import">
				<span class="import-title">办公号码</span>
				<input type="number" placeholder="请输入办公号码"  v-model="office_mobile"/>
			</div>
			<div class="import">
				<span class="import-title">传真号码</span>
				<input type="number"   v-model="fax_number" placeholder="请输入传真号码"/>
			</div>
			<div class="import">
				<span class="import-title">企业邮箱</span>
				<input type="email"   v-model="enterprise_email" placeholder="请输入企业邮箱"/>
			</div>
			<div class="import">
				<span class="import-title">企业网址</span>
				<input type="text"  v-model="official_website" placeholder="请输入企业网址"/>
			</div>
			<!--<div class="import">
				<span class="import-title">企业地址</span>
				<input type="text"   v-model="company_address" placeholder="请输入企业地址"/>
			</div>-->
			<div class="import">
				<span class="import-title">企业地址</span>
				<input type="text"  v-model="company_address" placeholder="请输入地址选择"/>
				<!--<CitySelect @give="give" :cityString="regionName?regionName:'请选择工作地点'" :nums="2"></CitySelect>-->
			</div>
			<div class="import">
				<input type="text"  v-model="alls" placeholder="请输入详细地址(例如:楼层/房号)"/>
				<!--<CitySelect @give="give" :cityString="regionName?regionName:'请选择工作地点'" :nums="2"></CitySelect>-->
			</div>
			<baidu-map :center="center" :zoom="12">
				<bm-view class="map"></bm-view>
    			<bm-local-search :keyword="company_address" :auto-viewport="false" @infohtmlset="infohtmlsets" :location="location"></bm-local-search>
				<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragend="dragend">
					
				</bm-marker>
				<!--<bm-view class="map"></bm-view>
			    <bm-local-search :keyword="company_address" :bounds="bounds" :auto-viewport="true" :panel="false"></bm-local-search>
			    <bm-polygon :path="polygonPath"></bm-polygon>-->
			</baidu-map>
			
		</div>
		<div class="save" @click="save">保存</div>
	</div>
</template>

<script>
	import { baseURL } from '@/axios'
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				regionName:null,
				avatar:null,
				baseURL:baseURL,
				Toast:Toast,
				office_mobile:'',
				fax_number:'',
				enterprise_email:'',
				official_website:'',
				company_address:'',
				map_pos:'',
				alls:null,
				center:{lng: 116.404, lat: 39.915},
      			location: '北京',
			}
		},
		mounted() {
			this.getInfo();
		},
		methods: {
			infohtmlsets(e) {
//				console.log(JSON.parse()(e.toString()))
				this.company_address = e.address
				this.map_pos = e.point.lng+","+e.point.lat
			},
			save() {
				var that = this;
				var loca = '';
				if(this.alls){
					loca = this.company_address+this.alls
				}else {
					loca = this.company_address
				}
				var data = {
					office_mobile:this.office_mobile,
					fax_number:this.fax_number,
					enterprise_email:this.enterprise_email,
					official_website:this.official_website,
					company_address:loca,
					map_pos:this.map_pos,
				}
				this.$http.post("/member/companypage/save",data).then(res=>{
					if(res.code == 200) {
						that.Toast(res.msg)
						setTimeout(function() {
							that.$router.push("/enter")
						},1500)
					}
				})
			},
			onRead(file) {
				var data={file:file.content}
			    this.$http.post("/member/companypage/avatar",data).then(res=>{
			    	if(res.code == 200) {
			    		this.avatar = res.data.path
			    	}
			    }).catch(res=>{
			    	this.Toast('上传图片过大,请截取')
			    })
			},
			give(id) {
				
			},
			getInfo() {
				this.$http.get("/member/companypage").then(res=>{
					if(res.code == 200) {
//						console.log(res.data.company.detail)
						var detail = res.data.company.detail;
						this.avatar = detail.avatar;
						this.office_mobile = detail.office_mobile;
						this.fax_number = detail.fax_number;
						this.enterprise_email = detail.enterprise_email;
						this.official_website = detail.official_website;
						this.company_address = detail.company_address;
						this.map_pos = detail.map_pos;
						this.center = {
							lng:res.data.company.detail.map_pos.split(",")[0],
							lat:res.data.company.detail.map_pos.split(",")[1]
						}
					}
				})
			},
			dragend(e) {
				this.map_pos = e.point.lng+","+e.point.lat
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
	.map{
		width: 100%;
		height: 5rem;
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
	.imports{
		line-height: 1.1rem;
		font-size: 0.3rem;
		color: #555555;
		position: relative;
		padding-bottom: 0.1rem;
		padding-top: 0.1rem;
		box-sizing: border-box;
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