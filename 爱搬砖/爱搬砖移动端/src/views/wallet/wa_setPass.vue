<template>
  <div class="app">
    <h1>设置密码</h1>
    <h2>请设置密码，用于支付验证</h2>
    <passInput v-model="pass"></passInput>
    <wButton @click.native="next">下一步</wButton>
  </div>
</template>

<script>
  import passInput from './comps/passInput'
  import wButton from './comps/wButton'
  export default {
    name: "wa_setPass",
    components: {passInput, wButton},
    data() {
      return {
        pass: ''
      }
    },
    methods: {
      next (){
        if(this.pass){
          this.$router.push({name: 'wa_verPass'})
          let walletPass = JSON.parse(sessionStorage.getItem('walletPass'))
          walletPass.passwd = this.pass
          sessionStorage.setItem('walletPass', JSON.stringify(walletPass))
        }else{
          this.$toast.fail('请输入验证码！')
        }
      }
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
    .passInput{
      margin-bottom: 4.2rem;
    }
  }
</style>