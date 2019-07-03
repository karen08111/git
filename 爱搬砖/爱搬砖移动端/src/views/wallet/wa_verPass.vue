<template>
  <div class="app">
    <h1>确认密码</h1>
    <h2>请再次输入，以确认密码</h2>
    <passInput v-model="verPass"></passInput>
    <wButton @click.native="setFinally">设置完成</wButton>
  </div>
</template>

<script>
  import passInput from './comps/passInput'
  import wButton from './comps/wButton'
  export default {
    name: "wa_verPass",
    components: {passInput, wButton},
    data() {
      return {
        verPass: ''
      }
    },
    methods: {
      setFinally (){
        let req = JSON.parse(sessionStorage.getItem('walletPass'))
        req.repasswd = this.verPass
        this.$http.post('/member/account/set_paypasswd',req).then(res => {
          if(res.code === 200){
            this.$toast.success(res.msg)
            this.$router.push({path: '/wallet'})
          }else if(res.code === 1501){
            sessionStorage.removeItem('walletPass')
            this.$router.push({path: '/wa_getCode'})
          }
        })
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