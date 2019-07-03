<template>
  <div class="app">
    <h1>手机验证</h1>
    <h2>请输入手机{{mobile}}收到的验证码</h2>
    <div class="inp">
      <input v-model="code" type="text" placeholder="请输入验证码">
      <codeCount @click.native="getCode"></codeCount>
    </div>
    <wButton @click.native="next">下一步</wButton>
  </div>
</template>

<script>
  import codeCount from '../../components/codeCount'
  import wButton from './comps/wButton'
  export default {
    name: "wa_getCode",
    components: {codeCount, wButton},
    data() {
      return {
        mobile: '',
        code: ''
      }
    },
    methods: {
      getCode() {
        this.$http.get('/member/account/paypasswd_code').then(res => {})
      },
      next (){
        if(this.code){
          this.$router.push({name: 'wa_setPass'})
          let walletPass = JSON.stringify({
            code: this.code
          })
          sessionStorage.setItem('walletPass', walletPass)
        }else{
          this.$toast.fail('请输入验证码！')
        }
      }
    },
    created (){
      this.$http.get('/member/account/mobile').then(res => {
        if(res.code === 200){
          this.mobile = res.data
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .app{
    h1{
      font-family: AdobeHeitiStd-Regular;
      font-size: 0.24rem;
      letter-spacing: 0.02rem;
      color: #cccccc;
      text-align: center;
      margin: 0.6rem 0 0.28rem;
    }
    h2{
      font-family: MicrosoftYaHei;
      font-size: 0.24rem;
      line-height: 0.4rem;
      color: #343434;
      margin-bottom: 0.64rem;
      text-align: center;
    }
    .inp{
      width: 6.51rem;
      height: 1.1rem;
      background-color: #ffffff;
      position: relative;
      margin: 0 auto 4rem;
      input{
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        border: solid 1PX #e5e5e5;
        text-indent: 0.22rem;
        font-size: 0.24rem;
        &::-webkit-input-placeholder{
          color: #cccccc;
        }
      }
      .codeCount{
        position: absolute;
        top: 0.28rem;
        right: 0.31rem;
      }
    }
  }
</style>