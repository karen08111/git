<template>
  <div class="app">
    <div class="header">
      <inHeader></inHeader>
      <img src="../../assets/invite/login_h_icon.png" alt="" class="dot">
    </div>
    <div class="main">
      <inTitle>请先登录</inTitle>
      <div class="form">
        <loginForm :mobile.sync="form.mobile" :code.sync="form.code"></loginForm>
        <div class="handleLogin" @click="handleLogin">登录</div>
      </div>
      <inFooter></inFooter>
    </div>
  </div>
</template>

<script>
  import inTitle from './components/inTitle'
  import loginForm from './components/loginForm'
  import { setToken, getToken } from '@/utils/auth'

  export default {
    name: "inviterLogin",
    components: {inTitle, loginForm},
    data() {
      return {
        form: {
          mobile: '',
          code: ''
        }
      }
    },
    methods: {
      handleLogin (){
        this.$http.post("/member/login/mobile",this.form,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res=>{
          if(res.code==200){
            var r = /^(https?|\/\/)/i;
//    			if(r.test(res.data.avatar)){this.$cookies.set('avatar',res.data.avatar)};
            this.$cookies.set("avatar",res.data.avatar)
            this.$cookies.set('name',res.data.nick)
            this.$cookies.set('status',res.data.auth_status)//认证状态0.未认证、1.待审核、2.审核中、3.认证失败、4.认证通过
            this.$cookies.set('statusTwxt',res.data.auth_status_text)//认证文本
            setToken(res.data.token)
            this.$router.push({name: 'invite'})
            setTimeout(_ => {location.reload()},200)
          }
        })
      }
    },
    created (){
      if(getToken() != null){
        this.$router.replace({name: 'invite'})
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    .header{
      position: relative;
      .dot{
        position: absolute;
        left: 0.22rem;
        bottom: -0.2rem;
      }
    }
    .main{
      margin-top: 0.21rem;
      background: url("../../assets/invite/login_bg.png") no-repeat top center / 100%;
      .form{
        width: 6.51rem;
        height: 4.78rem;
        background-color: #ffffff;
        border-radius: 0.21rem;
        margin: 0.19rem auto 0.33rem;
        padding-top: 0.54rem;
        box-sizing: border-box;
        .handleLogin{
          width: 5.87rem;
          height: 0.88rem;
          line-height: 0.88rem;
          background-color: #f34250;
          border-radius: 0.1rem;
          font-size: 0.35rem;
          letter-spacing: 0.01rem;
          color: #fefefe;
          text-align: center;
          margin: 1.01rem auto 0;
        }
      }
    }
  }
</style>