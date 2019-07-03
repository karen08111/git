<template>
  <div class="app">
    <inHeader></inHeader>
    <div class="join">
      <div class="line"></div>
      <div class="context">
        <i></i>
        <p>加入<span>{{inviterName}}</span>的工友团</p>
        <i></i>
      </div>
      <div class="line"></div>
    </div>
    <div class="login">
      <div class="form">
        <h6>成为爱搬砖的用户</h6>
        <loginForm :mobile.sync="form.mobile" :code.sync="form.code" :request_id="request_id" :x_qe_with="x_qe_with" :imgUrl="`${url}/beInvited/captcha/verimg`" :mobUrl="`${url}/beInvited/captcha/vermob`"></loginForm>
        <div class="handleLogin" @click="handleLogin">下一步</div>
      </div>
      <img src="../../assets/invite/footer.png" alt="" class="footerImg">
    </div>
  </div>
</template>

<script>
  import loginForm from './components/loginForm'
  import { setToken } from '@/utils/auth'

  export default {
    name: "inviteeLogin",
    components: {loginForm},
    data() {
      return {
        form: {
          mobile: '',
          code: ''
        },
        url: process.env.VUE_APP_third,
        x_qe_with: {'X-Requested-With': 'XMLHttpRequest'}
      }
    },
    computed: {
      request_id: {
        get (){
          return this.$store.state.request_id
        },
        set (val){
          this.$store.commit('setReqId', val)
        }
      },
      inviterName (){
        return this.$store.state.inter_name
      }
    },
    methods: {
      handleLogin (){
        this.$http.post(this.url + '/beInvited/mobile',this.form,{headers: {'Abz-Request-Id': this.request_id, 'X-Requested-With': 'XMLHttpRequest'}}).then(res => {
          if(res.code==200){
            var r = /^(https?|\/\/)/i;
//    			if(r.test(res.data.avatar)){this.$cookies.set('avatar',res.data.avatar)};
            this.$cookies.set("avatar",res.data.avatar)
            this.$cookies.set('name',res.data.nick)
            this.$cookies.set('status',res.data.auth_status)//认证状态0.未认证、1.待审核、2.审核中、3.认证失败、4.认证通过
            this.$cookies.set('statusTwxt',res.data.auth_status_text)//认证文本
            setToken(res.data.token)
            if(res.data.skip == 1)
              this.$router.push({name: 'joinForm'})
            else{
              this.$router.push({name: 'assistance'})
              setTimeout(_ => {location.reload()},100)
            }
          }
        })
      },
      getReqId (){
        let code = this.$route.query.code
        if(!code){
          this.$router.push({name: 'index'})
          setTimeout(_ => {location.reload()},100)
        }
        this.$http.get(process.env.VUE_APP_third + '/beInvited/invitationRegister',{params: {invitation_code: code}}).then(res => {
          if(res.code == 200){
            this.request_id = res.data.request_id
            this.$cookies.set('abzappid', res.data.request_id)
            this.$store.commit('setInrerName',res.data.name)
            sessionStorage.setItem('inter_name', res.data.name)
            this.$store.commit('setInterCode',code)
            sessionStorage.setItem('inter_code', code)
          }
        })
      }
    },
    created (){
      this.getReqId()
    }
  }
</script>

<style scoped lang="less">
  .app{
    .join{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.31rem 0;
      .context{
        /*width: 3.54rem;*/
        max-width: 80%;
        height: 0.78rem;
        background-image: linear-gradient(92deg,
        #fae08a 0%,
        #ffc45a 100%),
        linear-gradient(
            #ffffff,
            #ffffff);
        box-shadow: 0rem 0.02rem 0.11rem 0rem
        rgba(187, 72, 2, 0.75);
        border-radius: 0.12rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.09rem;
        i{
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          background: url("../../assets/invite/push.png") no-repeat center / 100%;
          margin: 0 0.12rem;
        }
        span{
          color:  #a13d01;
          font-size: 0.32rem;
        }
        p{
          text-align: center;
        }
      }
      .line{
        height: 0.01rem;
        border: solid 0.01rem #ffffff;
        flex: 1 1 auto;
      }
    }
    .login{
      height: 8.2rem;
      padding-top: 0.17rem;
      box-sizing: border-box;
      background: url("../../assets/invite/login_bg2.png") no-repeat center top / 100%;
      position: relative;
      .form{
        width: 6.51rem;
        height: 4.99rem;
        background-color: #ffffff;
        border-radius: 0.21rem;
        margin: 0 auto;
        text-align: center;
        h6{
          line-height: 0.75rem;
          font-family: PingFang-SC-Bold;
          font-size: 0.25rem;
          letter-spacing: 0.01rem;
          color: #e12836;
        }
        .handleLogin{
          width: 5.87rem;
          height: 0.88rem;
          line-height: 0.88rem;
          background-color: #f34250;
          border-radius: 0.1rem;
          text-align: center;
          font-size: 0.35rem;
          letter-spacing: 0.01rem;
          color: #fefefe;
          margin: 0.75rem auto 0;
        }
      }
      .footerImg{
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>