<template>
  <div class="login" v-wechat-title="$route.meta.title='登录'">
    <!--<header>
      <van-icon name="arrow-left" @click="back" />
      登 录
    </header>-->
    <div class="header-top">
    	<img src="../../assets/images/loginTop.png"/>
    </div>
    <div class="main">
    	<div class="main-title">
    		<img src="../../assets/images/Hi.png"/>
    	</div>
      <div class="row"><input type="tel" placeholder="请输入手机号码" v-model="mobile"></div>
      <div class="row">
      	<input type="tel" placeholder="请输入验证码" v-model="code">
      	<button id="tn" @click="getCode" :class="!isNaN(codeMsg)? 'colo':''" :disabled="!isNaN(codeMsg)">{{codeMsg}}</button>
      	<!--<button id="tn" @click="getCode">获取验证码</button>-->
      </div>
      <button class="submit" :class="{can: code.length == 4}" :disabled="code.length != 4" @click="login">立即登录</button>
      <p><router-link to="/protocol"><span class="ces">注册即代表您同意</span>《爱搬砖协议》</router-link></p>
      <!--<p>《爱搬砖协议》</p>-->
       <!--微信登录-->
   		<div class="wxLogin" style="padding-left: 0.35rem; padding-right: 0.35rem;box-sizing: border-box;">
	    	<span class="wxLeft"></span>
	    	<span class="wxTitle">第三方登录</span>
	    	<span class="wxRight"></span>
	    </div>
	    <div class="wxImg">
	    	<img src="../../assets/images/loginWx.png" @click="wxLogin"/>
	    </div>
	    
    </div>
    <!--<puzzle v-show="puzzleShow" @pass="pass" @close="puzzleShow = false" :mobiles="mobile"></puzzle>-->
    <verify :mobile="mobile" v-if="puzzleShow" @success="success" @close="puzzleShow = false"></verify>
  </div>
</template>

<script>
  import { setToken } from '@/utils/auth'
  import puzzle from './components/puzzle'
	import verify from './components/verify'
	import {baseURL} from '@/axios'
  export default {
    name: "login",
    data() {
      return {
      	baseURL:baseURL,
        puzzleShow: false,
        mobile: null,
        code: '',
//      huis:"http://172.16.1.227:7777/#/",
        codeMsg: '获取验证码',
        img: require('../../assets/none.png'),
        // urls:'http://third.api.qqdoubao.net',//测试
//      urls:'http://third.api.aibanzhuan.cn',//正式
        urls:process.env.VUE_APP_third,
				// huis:"http://mobile.qqdoubao.net/#/",//测试
//				huis:"http://mobile.aibanzhuan.cn/#/",//正式
        huis: process.env.VUE_APP_Callback
      }
    },
    components: {puzzle,verify},
    methods:{
    	//微信登录
    	wxLogin() {
//  		this.$http.get(this.urls+"/wxapi/auth?redirect_uri="+this.baseURL+"/index&not_exist="+this.baseURL+"//personal").then(res=>{
//  			console.log(res)
//  		})
				var index = encodeURIComponent(this.huis+'kong') ;
				var binds = encodeURIComponent(this.huis+'bindPhone')
				window.location.href = this.urls+"/wxapi/auth?redirect_uri="+index+"&not_exist="+binds
    	},
      back (){
        this.$router.go(-1)
      },
      pass (){
        this.puzzleShow = !this.puzzleShow
				this.codeMsg = 59
        const timer = setInterval(() => {
          this.codeMsg--
          if(this.codeMsg == 0){
            clearInterval(timer)
            this.codeMsg = '获取验证码'
          }
        },1000)
      },
      success(code) {
//    	console.log(code)
      	this.pass();
      },
      getCode (){
        if(this.mobile){
          if(this.mobile.length === 11){
            this.puzzleShow = true
          }else {
            this.$toast('请输入正确的手机号！')
          }
        }else {
          this.$toast('手机号不能为空！')
        }
      },
      login (){
      	var data = {
      		mobile:this.mobile,
      		code:this.code
      	}
//    	data=JSON.stringify(data)
      	this.$http.post("/member/login/mobile",data,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
      		if(res.code==200){
      			var r = /^(https?|\/\/)/i;
//    			if(r.test(res.data.avatar)){this.$cookies.set('avatar',res.data.avatar)};
						this.$cookies.set("avatar",res.data.avatar)
      			this.$cookies.set('name',res.data.nick)
      			this.$cookies.set('status',res.data.auth_status)//认证状态0.未认证、1.待审核、2.审核中、3.认证失败、4.认证通过
      			this.$cookies.set('statusTwxt',res.data.auth_status_text)//认证文本
						this.$store.commit('setViper', res.data.viper)
      			setToken(res.data.token)
      			this.$router.push({name: 'personal'})
      		}
      	})
//      let formData = new FormData()
//      formData.append('mobile',this.mobile)
//      formData.append('code',this.code)

//      this.$http.post('/member/login/mobile',formData,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res => {
//      	console.log(res)
//        if(res.code == 200){
//          this.$cookies.set('mobile',res.data.mobile)
//          this.$cookies.set('status',res.data.status)
//          this.$cookies.set('dq_type',res.data.dq_type)
//          this.$cookies.set('name',res.data.name)
//          setToken(res.data.token)
//          this.$router.push({name: 'personal'})
//        }
//      })
      }
    },
    created() {
    },
    beforeCreate (){
//  	console.log(this.$cookies.get('loginref'))
//    if(this.$cookies.get('loginref') == 1){
//      this.$cookies.set('loginref',0)
//      location.reload()
//    }
    },
    mounted() {
    	
    }
  }
</script>

<style scoped lang="less">
	.colo{
		color: #3388ff!important;
	}
	@media screen and (max-width: 320px) {
    .header-top{
    	display: none;
    }
}
	.header-top{
		width: 2.2rem;
		height: 1.8rem;
		margin: auto;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.ces{
		color: #dddddd;
	}
	.main-title{
		width: 3rem;
		height: 0.32rem;
		margin: auto;
		margin-bottom: 0.7rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.wxLogin {
		position: relative;
		display: flex;
		width: 100%;
		margin-top: 0.6rem;
		/*height: 0.2rem;*/
		.wxLeft {
			position: absolute;
			display: block;
			height: 0.02rem;
			width: 2.56rem;
			border-top:0.01rem solid #CCCCCC;
		}
		.wxRight{
			position: absolute;
			display: block;
			height: 0.02rem;
			right: 0.35rem;
			/*width: 30%;*/
			width: 2.56rem;
			border-top:0.01rem solid #CCCCCC;
		}
		.wxTitle {
			font-size: 0.22rem;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0.02rem;
			color: #cccccc;
			margin: auto;
			display: block;
			position: relative;
			top: -0.1rem;
		}
	}
	.wxImg{
		width: 0.9rem;
		height: 0.9rem;
		margin: auto;
		margin-top: 0.25rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
  .login{
    /*background-color: #3388ff;*/
   	/*padding-bottom: 2rem;*/
   	box-sizing: border-box;
    /*position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;*/
    /*z-index: 9;*/
    header{
      width: 100%;
      height: 0.97rem;
      line-height: 0.97rem;
      text-align: center;
      font-family: AdobeHeitiStd-Regular,MicrosoftYaHei;
      font-size: 0.38px;
      letter-spacing: 0.02px;
      color: #ffffff;
      position: relative;
      .van-icon{
        position: absolute;
        top: 0.32rem;
        left: 0.3rem;
      }
    }
    .main{
      /*width: 6.49rem;*/
      /*height:8.5rem;*/
      /*background: url("../../assets/login_bg.png") no-repeat;*/
     padding-top: 0.5rem;
     /*padding-bottom: 2rem;*/
      height: 100%;
      background-size: 100% 100%;
      margin: 0.5rem auto 0;
      /*padding-top: 2rem;*/
     box-shadow: 0 -0.12rem 0.15rem 0
			rgba(62, 67, 73, 0.02);
			border-bottom: #FFFFFF;
			border-radius: 0.2rem 0.2rem 0 0;
      box-sizing: border-box;
      .row{
        width:5.61rem;
        position: relative;
        text-align: center;
        margin: 0 auto 0.5rem;
        margin-top:0.25rem; 
        &:last-of-type{
          margin-bottom: 1.52rem;
        }
        input{
          width: 5.61rem;
          height: 0.86rem;
          border: none;
          border-bottom: 0.01rem solid #dddddd;
          padding: 0 0.2rem;
          box-sizing: border-box;
          font-family: MicrosoftYaHei;
          font-size: 0.26px;
          letter-spacing: 0.03px;
          -webkit-appearance: none;
          border-radius: 0;
        }
        button{
          width: 2rem;
          height: 0.60rem;
          background-color: #FFFFFF;
          border-radius: 0.30rem;
          font-family: MicrosoftYaHei;
          font-size: 0.26rem;
          letter-spacing: 1PX;
          color: #000000;
          position: absolute;
          top: 0.13rem;
          right: 0;
        }
      }
      .submit{
        display: block;
        width: 5.31rem;
        height: 1rem;
        background-color: #3388ff;
        border-radius: 0.50rem;
        opacity: 0.3;
        margin: 0 auto 0.18rem;
        font-size: 0.28rem;
        letter-spacing: 0.03rem;
        color: #ffffff;
        &.can{
          opacity: 1;
        }
      }
      p{
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 0.24rem;
        color: #dddddd;
        a{
          color: #3388ff;
        }
      }
    }
  }
</style>