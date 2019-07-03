<template>
  <div class="app">
    <div class="inps">
      <div class="inp">
        <div class="label">充值金额:</div>
        <input type="text" v-model="money" placeholder="输入充值金额">
      </div>
      <div class="inp">
        <div class="label">微信充值:</div>
        <i class="wx"></i>
      </div>
    </div>
    <wButton @click.native="fin">完 成</wButton>
  </div>
</template>

<script>
  import wButton from './comps/wButton'
  export default {
    name: "recharge",
    components: {wButton},
    data() {
      return {
        money: this.$route.query.money || '',
        kjID: '',
        kjImg: '',
        kjImgShow: false,
        kjCount: 0,
        timer: null
      }
    },
    computed: {
      code (){
        return this.$route.query.code
      },
      isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
          return true;
        }else{
          return false;
        }
      }
    },
    watch: {
      kjID (){
        this.dia()
      }
    },
    methods: {
      fin (){
        if(this.isWeiXin){
          if(!this.code){
            this.getCode()
          }
        }else{
          this.awakenWX()
        }
      },
      awakenWX (){
        this.$http.post('/member/account/wallet/wap/recharge', {mount: this.money}).then(res => {
          if(res.code === 200){
            window.location.href = res.url
            this.kjID = res.data
            sessionStorage.setItem('rechPay',res.data)
          }
        })
      },
      getCode (){
        this.$http.get('/member/payment/mp/vip_buy_auth', {params: {redirect_uri: encodeURIComponent(window.location.href), money: this.money}}).then(res => {
          if(res.code === 200){
            window.location.href = res.url
          }
        })
      },
      getPayArg (){
        this.$http.post('/member/account/wallet/mp/recharge',{mount: this.money, code: this.code}).then(res => {
          if(res.code === 200){
            const data = res.data
            this.kjID = data.id
            return data.wechat
          }
        }).then(r => {
          console.log(r)
          WeixinJSBridge.invoke('getBrandWCPayRequest',r,res => {
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              this.$router.push({name: 'wallet'})
            }else{
              this.$router.replace({path: '/recharge'})
            }
          })
        })
      },
      getKjInfo (){
        this.kjCount++
        if(this.kjCount === 60){
          this.kjCount = 0
          clearInterval(this.timer)
          this.$message.error('请求超时，请重新购买！')
          this.kjImgShow = false
          return
        }
        this.$http.get(`/member/payment/vip_buy_status/${this.kjID}`).then(res => {
          if(res.data.msg === 'success'){
            this.kjImgShow = false
            this.$message({
              message: '充值成功！',
              type: 'success'
            })
            clearInterval(this.timer)
            this.$router.push({name: 'rechSuccess'})
          }
        })
      },
      closeKj (){
        clearInterval(this.timer)
        this.kjImgShow = false
        this.kjCount = 0
      },
      dia (){
        this.$dialog.confirm({
          title: '支付',
          message: '支付是否成功？',
          confirmButtonText: '已成功支付',
          cancelButtonText: '订单异常'
        }).then(() => {
          this.$http.get(`/member/payment/vip_buy_status/${sessionStorage.getItem('rechPay') || this.kjID}`).then(res => {
            if(res.msg === 'success'){
              this.$toast.success("充值成功！")
              sessionStorage.removeItem('rechPay')
            }else{
              this.$toast.success("获取失败，请刷新页面后重试")
            }
          })
        }).catch(() => {
          sessionStorage.removeItem('rechPay')
        })
      }
    },
    created (){
      if(this.code){
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', this.getPayArg, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', this.getPayArg);
            document.attachEvent('onWeixinJSBridgeReady', this.getPayArg);
          }
        }else{
          this.getPayArg();
        }
      }else{
        if(sessionStorage.getItem('rechPay')){
          this.dia()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.2rem;
    .inps{
      width: 6.9rem;
      height: 1.99rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.06rem 0.2rem 0rem rgba(44, 133, 255, 0.15);
      border-radius: 0.2rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin-bottom: 4.92rem;
      .inp{
        display: flex;
        align-items: center;
        height: 0.99rem;
        &:first-child{
          border-bottom: solid 0.01rem #e5e5e5;
        }
        .label{
          font-family: MicrosoftYaHei;
          font-size: 0.3rem;
          letter-spacing: 0.03rem;
          color: #555555;
          margin-right: 0.2rem;
        }
        input{
          font-family: MicrosoftYaHei;
          font-size: 0.22rem;
          letter-spacing: 0.01rem;
        }
        .wx{
          width: 0.33rem;
          height: 0.27rem;
          background: url("../../assets/wallet_wx.png") no-repeat center / 100%;
        }
      }
    }
  }
</style>