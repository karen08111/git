<template>
	<div class="main">
		<div class="head">
			<div class="headImg">
        <img v-if="isLogin" :src="avatar" alt="">
        <!--<img v-if="isLogin" @click="jiequ" :src="avatar" alt="">-->
        <router-link to="/login" v-else><img :src="avatar"/></router-link>
			</div>
			<div class="content">
        <span v-if="isLogin" class="name">
					<i class="vip" v-if="$store.state.viper"></i>
					{{name}}
				</span>
				<router-link v-else to="/login" class="name">
					<i class="vip" v-if="$store.state.viper"></i>
					{{name}}
				</router-link>
				<span :class="s?'rens':'ren'" v-if="s">{{stoTitle}}</span>
				<!--<div class="info">
					<span class="sub margin">
						<p class="sub-p1">我的关注</p>
						<p class="sub-p2">111</p>
					</span>
					<span class="sub">
						<p class="sub-p1">我发布的消息</p>
						<p class="sub-p2">444</p>
					</span>
				</div>-->
			</div>
		</div>
		<!---->
		<div class="manage">
			<router-link class="list" to="/login" v-if="!store">
				<!--<img src="../../assets/images/1.png" alt="" />-->
				<!--<van-icon name="friends" size="0.6rem" color="#3388ff" />-->
				<div class="logins"></div>
				<p class="list-title">登录</p>
			</router-link>
			<router-link class="list" v-if="!menuList" to="/myAttention">
				<div class="attention"></div>
				<p class="list-title">我的关注</p>
			</router-link>
			<router-link class="list" v-if="!menuList" to="/abz">
				<div class="official"></div>
				<p class="list-title">爱搬砖公众号</p>
			</router-link>
			<router-link class="list" v-if="menuList" v-for="item in menuList" :to="item.route">
				<div :class="item.ico"></div>
				<p class="list-title">{{item.title}}</p>
			</router-link>
			<span class="list" @click="quit" v-if="store">
				<!--<van-icon name="clear" color="#3388ff" size="0.6rem" />-->
				<img src="../../assets/images/logout.png"/>
				<p class="list-title">退出</p>
			</span>
			<!--<router-link class="list" to="/identitySelect">
				<van-icon name="gem" size="0.6rem" color="#3388ff"/>
				<p class="list-title">{{names}}</p>
			</router-link>
			</router-link>
			<router-link class="list" to="/resumPerson" v-if="store">
				<van-icon name="description" color="#3388ff" size="0.6rem" />
				<p class="list-title">我的简历</p>
			</router-link>
			<router-link class="list" to="/team" v-if="store">
				<van-icon name="description" color="#3388ff" size="0.6rem" />
				<p class="list-title">团队简历</p>
			</router-link>
			<router-link class="list" to="/memberList" v-if="store">
				<van-icon name="description" color="#3388ff" size="0.6rem" />
				<p class="list-title">团队成员</p>
			</router-link>
			<router-link class="list" to="/inviteList/1" v-if="store">
				<img src="../../assets/images/pin.png"/>
				<p class="list-title">企业招聘</p>
			</router-link>
			<router-link class="list" to="/inviteList/2" v-if="store">
				<img src="../../assets/images/pin.png"/>
				<p class="list-title">团队招聘</p>
			</router-link>
			<router-link class="list" to="/enter" v-if="store">
				<img src="../../assets/images/pin.png"/>
				<p class="list-title">企业主页</p>
			</router-link>
			<router-link class="list" to="/abz">
				<van-icon name="wechat" color="#3388ff" size="0.6rem" />
				<p class="list-title">爱搬砖公众号</p>
			</router-link>-->
			
		</div>	
	</div>
</template>

<script>
  import { baseURL } from '@/axios'
  import {getToken,removeToken} from '@/utils/auth'
//import 'vant/lib/icon/local.css'
	export default{
		data() {
			return {
				avatar: require('../../assets/none.png'),
				store:false,
				names:"身份认证",
				stoTitle:'',
				baseURL:baseURL,
				s:false,
				info:'',
				menuList:null,
			}
		},
    computed: {
		  name (){
		    if(getToken()) return this.$cookies.get('name') || this.$cookies.get('mobile')
        else return '登录'
      },
      isLogin (){
		    if(getToken()) return true
        else return false
      }
    },
    mounted() {
    	if(!getToken()){
    		this.$router.push("/login")
    	}
    },
    methods: {
      quit (){
        this.$cookies.remove('mobile')
        this.$cookies.remove('status')
        this.$cookies.remove('dq_type')
        this.$cookies.remove('name')
        this.$cookies.remove('avatar')
				this.$store.commit('removeViper')
        removeToken()
//      location.reload()
		this.$router.push('/login')
      },
      jiequ() {
      	this.$router.push('/cropper')
      },
      goPersonal() {
      	
      },
      getMenu() {
//    	this.$http.get("/member/avatar_droplist").then(res=>{
//    		console.log(res)
//    	})
      },
    },
    created (){
//  	console.log(this.$cookies.get('name'))
		localStorage.setItem("liuPage",1);
    	localStorage.setItem("liuScroll",0);
      if(getToken()){
      	var that = this
      	this.store = true;

		this.$http.get("/member/mobilemenu").then(res=>{
//			console.log(res.data)
//			var r = /^http/i;
//	        var imgs=[]
//	        for(let i in res.data){
//	        	var obj = res.data[i]
//	        	if(r.exec(res.data[i].ico)){
//	        		obj.store = true
//	        	}else {
//	        		obj.store = false
//	        	}
//	        	imgs.push(obj)
//	        }
	        this.menuList = res.data

			/*this.menuList.push({
				title: '我的钱包',
				ico: 'wallet',
				route: 'wallet'
			})*/
		})
//		if(this.$cookies.get("avatar")) this.avatar =this.$cookies.get("avatar")
//		console.log(this.$cookies.get("avatar"))
		var r = /^http/i;
		if(this.$cookies.get("avatar")){
			if(this.$cookies.get("avatar")[0] != "h" &&  this.$cookies.get("avatar") && this.$cookies.get("avatar")[1]!="/") {
				this.avatar = this.baseURL + this.$cookies.get("avatar")
			} else if (this.$cookies.get("avatar")){
				this.avatar =this.$cookies.get("avatar")
			}
		}
		
//		console.log(this.$cookies.get("avatar"))
		
        //请求个人资料
//      console.log(this.$cookies.get("status"))//审核状态
        if(this.$cookies.get("status")==1 || this.$cookies.get("status")){
        	this.stoTitle = "审核中"
        }
//      console.log(this.$cookies.get('dq_type'),'111')//
        if(this.$cookies.get('dq_type')==1){
        	this.names = "个人认证";
        	this.stoTitle = "已认证";
        	this.s=true;
        }else if(this.$cookies.get('dq_type')==2) {
        	this.names = "团队认证"
        	this.stoTitle = "已认证"
        	this.s=true;
        }else if(this.$cookies.get('dq_type')==3) {
        	this.names = "企业认证"
        	this.stoTitle = "已认证"
        	this.s=true;
        }else{
        	this.stoTitle = "未认证"
        }
        
      }else {
//    	this.$router.push("/login")
      }

      this.$cookies.set('loginref',1)
      //请求菜单
//    this.getMenu() 
    }
}
</script>

<style scoped lang="less">
@font-face {
  font-family: 'iconfont';  /* project id 801641 */
  src: url('//at.alicdn.com/t/font_801641_8m34zgmsjme.eot');
  src: url('//at.alicdn.com/t/font_801641_8m34zgmsjme.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_801641_8m34zgmsjme.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_801641_8m34zgmsjme.woff') format('woff'),
  url('//at.alicdn.com/t/font_801641_8m34zgmsjme.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_801641_8m34zgmsjme.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:0.8rem;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.02rem;
    -moz-osx-font-smoothing: grayscale;}
	.main{
		padding: 0.2rem;
		box-sizing: border-box;
	}
	
	.personageResum{
		background: url(../../assets/images/personageResum.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}
	.teamJob{
		background: url(../../assets/images/teamJob.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}
	.teamResum  {
		background: url(../../assets/images/teamResum.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}
	.official  {
		background: url(../../assets/images/official.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}
	.attention  {
		background: url(../../assets/images/attention.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}

	.wallet {
		background: url(../../assets/images/2.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%;
	}
	.enterResum  {
		background: url(../../assets/images/enterResum.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}
	.teamMember  {
		background: url(../../assets/images/teamMember.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%;
	}
	.logins {
		background: url(../../assets/images/logins.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%;
	}
	.ident{
		background: url(../../assets/images/logins.png) no-repeat;
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%;
	}
	.ico-imgs{
		width: 0.64rem;
		height: 0.64rem;
		margin: auto;
		background-position:center center;
		background-size:88%; 
	}
	.head{
		height: 2.14rem;
		background-color: #FFFFFF;
		box-shadow: 0 0.06rem 0.15rem 0 
		rgba(44, 133, 255, 0.3);
		border-radius: 0.2rem;
		display: flex;
		padding-top: 0.3rem;
		box-sizing: border-box;
		
	}
	.headImg{
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 0.3rem 0 0.25rem;
	}
	.headImg img{
		width: 100%;
		height: 100%;
    object-fit: cover;
	}
	.content{
		
	}
	.name{
		font-size: 0.34rem;
		color: #333;
		letter-spacing: 0.02rem;
		display: flex;
		align-items: center;
	}
	.info{
		display: flex;
		margin-top: 0.4rem;
	}
	.sub{
		display: block;
		line-height: 0.4rem;
	}
	.sub-p1{
		font-size: 0.28rem;
		letter-spacing: 0.01rem;
		color: #999999;
	}
	.sub-p2{
		color: #3388ff;
		font-size: 0.38rem;
		line-height: 0.5rem;
		text-align: center;
	}
	.margin{
		margin-right: 1rem;
	}
	
	.manage{
		padding-bottom: 0.2rem;
		display: flex;
		flex-wrap: wrap;
		/*justify-content: space-between;*/
		background-color: #ffffff;
		box-shadow: 0 0.06rem 0.15rem 0
		rgba(44, 133, 255, 0.1);
		border-radius: 0.1rem;
		margin-top: 0.5rem;
	}
	.list{
		width: 33%;
		text-align: center;
		margin-bottom: 0.5rem;
		padding-top: 0.4rem;
	}
	.list img{
		width: 0.6rem;
		height: 0.6rem;
		/*margin-top: 0.4rem;*/
	}
	.list-title{
		color: #999;
		letter-spacing: 0.01rem;
		font-size: 0.28rem;
		margin-top: 0.2rem;
	}
	.ren{
		display: inline-block;
		color: #000;
		background: #E5E5E5;
		border-radius: 0.28rem;
		font-size: 0.2rem;
		margin-left: 0.1rem;
		padding-left: 0.1rem;
		height: 0.3rem;
		line-height: 0.35rem;
		padding-right: 0.1rem;
		box-sizing: border-box;
		letter-spacing: 0.02rem;
	}
	.rens{
		display: inline-block;
		color: #FFFFFF;
		background: #ff5400;
		border-radius: 0.28rem;
		font-size: 0.2rem;
		letter-spacing: 0.02rem;
		margin-left: 0.1rem;
		padding-left: 0.1rem;
		height: 0.3rem;
		line-height: 0.35rem;
		padding-right: 0.1rem;
		box-sizing: border-box;
	}
  .content{
    line-height: 1.7rem;
  }
	.vip{
		display: block;
		width: 0.28rem;
		height: 0.23rem;
		background: url("../../assets/vip/vip_ico.png") no-repeat center / 100%;
		margin-right: 0.1rem;
	}
</style>