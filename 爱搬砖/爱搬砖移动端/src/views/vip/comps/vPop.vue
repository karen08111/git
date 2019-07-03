<template>
  <div>
    <div class="pop-wapper" @click.self="$emit('close')">
      <div class="v-pop">
        <div class="p-top">
          <div class="item">
            <div class="label">开通服务：</div>
            <div class="content">
              <van-radio-group v-model="cServe">
                <van-radio checked-color="#3388ff" :name="12">大砖会员699元/年</van-radio>
                <van-radio checked-color="#3388ff" :name="1">小砖会员299元/月</van-radio>
              </van-radio-group>
            </div>
          </div>
          <div class="item">
            <div class="label">服务介绍：</div>
            <div class="content">一个月免费查看网站信息</div>
          </div>
          <div class="item">
            <div class="label">钱包余额：</div>
            <div class="content">{{balance}}元</div>
          </div>
          <template v-if="balance < fee">
            <div class="item">
              <div class="label">还需充值：</div>
              <div class="content inTxt">
                <input type="text" readonly v-model="fee">
                <span>元</span>
              </div>
            </div>
            <div class="item">
              <div class="label">充值方式：</div>
              <div class="content">
                微信
              </div>
            </div>
          </template>
        </div>
        <div class="p-bot">
          <div class="btn" @click="kjin" v-if="balance < fee">确定支付</div>
          <div class="btn" @click="open" v-else>确定开通</div>
        </div>
      </div>
      <div class="kjImg-wapper" v-show="kjImgShow" @click.self="closeKj">
        <p>请使用微信扫一扫功能扫描下方二维码来支付并开通会员</p>
        <img :src="kjImg" alt="">
      </div>
    </div>
    <passWapper v-if="passShow" :pass.sync="pass" @close="passShow = false"></passWapper>
  </div>
</template>

<script>
  import passWapper from '../../wallet/comps/passWapper'
  export default {
    name: "vPop",
    components: {passWapper},
    props: {
      serve: {
        type: Number,
        defalut: 12
      },
      balance: {
        type: Number,
        defalut: 0
      },
      kid: [Number, String]
    },
    data() {
      return {
        type: 1,
        price: null,
        kjID: '',
        kjImg: '',
        kjImgShow: false,
        kjCount: 0,
        timer: null,
        pass: '',
        passShow: false,
      }
    },
    computed: {
      cServe: {
        get (){
          return this.serve
        },
        set (val){
          this.$emit('update:serve', val)
        }
      },
      cKid: {
        get (){
          return this.kid
        },
        set (val){
          this.$emit('update:kid',val)
        }
      },
      fee (){
        return this.serve === 1 && 299 || 699
      },
      needPay (){
        return this.fee - this.balance
      },
      introduce (){
        if(this.serve === 12)
          return '一年'
        else
          return '一个月'
      },
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
    methods: {
      open (){
        this.$http.get('/member/payment/vip_order',{ params: {month: this.cServe}}).then(res => {
          if(res.code === 200){
            this.$router.push({name: 'vipSuccess', params: {type: this.cServe}})
          }
        })
      },
      awakenWX (){
        this.$http.post('/member/payment/wap/vip_buy', {month: this.cServe, redirect_uri: encodeURIComponent(`${window.location.host}/#/vipSuccess/${this.cServe}`)}).then(res => {
          if(res.code === 200){
            window.location.href = res.url
            this.cKid = res.data
            sessionStorage.setItem('odd',res.data)
          }
        })
      },
      kjin (){
        if(this.isWeiXin){
          if(!this.code){
            this.getCode()
          }
        }else{
          this.awakenWX()
        }
      },
      getCode (){
        this.$http.get('/member/payment/mp/vip_buy_auth', {params: {redirect_uri: encodeURIComponent(window.location.href), serve: this.cServe}}).then(res => {
          if(res.code === 200){
            window.location.href = res.url
          }
        })
      },
      getPayArg (){
        this.$http.post('/member/payment/mp/vip_buy',{month: this.serve, code: this.code}).then(res => {
          if(res.code === 200){
            const data = res.data
            this.kjID = data.id
            return data.wechat
          }
        }).then(r => {
          WeixinJSBridge.invoke('getBrandWCPayRequest',r,res => {
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              this.$router.push({name: 'vipSuccess', params: {type: this.serve}})
            }else{
              this.$router.replace({path: '/vip'})
            }
          })
        })
      },
      getKjInfo (){
        this.kjCount++
        if(this.kjCount === 60){
          this.kjCount = 0
          clearInterval(this.timer)
          sessionStorage.removeItem('odd')
          this.$message.error('请求超时，请重新购买！')
          this.kjImgShow = false
          return
        }
        this.$http.get('/member/payment/vip_buy_status', {params: {id: this.kjID || sessionStorage.getItem('odd')}}).then(res => {
          console.log(res)
          if(res.data.code === 200){
            this.kjImgShow = false
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$emit('close')
            sessionStorage.removeItem('odd')
            clearInterval(this.timer)
          }
        })
      },
      closeKj (){
        sessionStorage.removeItem('odd')
        clearInterval(this.timer)
        this.kjImgShow = false
        this.kjCount = 0
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
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
      sessionStorage.removeItem('odd')
    }
  }
</script>

<style scoped lang="less">
  .pop-wapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-pop{
    width: 6.17rem;
    background-color: #ffffff;
    box-shadow: 0rem 0rem 0.14rem 0rem
    rgba(0, 0, 0, 0.3);
    border-radius: 0.06rem;
    box-sizing: border-box;
    overflow: hidden;
    .p-top{
      padding: 0.52rem 0.32rem 0.38rem;
      border: solid 1PX #e5e5e5;
      .item{
        display: flex;
        margin-bottom: 0.4rem;
        .label{
          font-family: MicrosoftYaHei;
          font-size: 0.22rem;
          color: #333333;
          margin-right: 0.2rem;
        }
        .content{
          font-family: MicrosoftYaHei;
          font-size: 0.18rem;
          letter-spacing: 0.02rem;
          color: #333333;
        }
      }
      .pi{
        margin: 0.13rem 0 0.25rem;
      }
      .inTxt{
        width: 2.07rem;
        height: 0.34rem;
        background-color: #fcfcff;
        border-radius: 0.04rem;
        border: solid 0.01rem #cad2e1;
        position: relative;
        span{
          display: inline-block;
          height: 99%;
          line-height: 0.34rem;
          position: absolute;
          top: 0;
          right: 0.10rem;
          font-size: 0.16rem;
          color: #333333;
        }
        input[type="text"]{
          width: 2.07rem;
          height: 0.34rem;
          font-size: 0.16rem;
        }
      }
    }
    .p-bot{
      padding: 0.40rem 0 0.20rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn{
        width: 1.8rem;
        height: 0.5rem;
        background-color: #13a7ff;
        border-radius: 0.1rem;
        font-family: MicrosoftYaHei;
        font-size: 0.2rem;
        line-height: 0.5rem;
        color: #ffffff;
        text-align: center;
      }
    }
  }
  .kjImg-wapper{
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 999;
    p{
      margin-bottom: 0.20rem;
      color: #fff;
    }
  }
</style>

<style lang="less">
  .van-radio{
    display: flex;
    align-items: center;
    input{
      opacity: 0 !important;
    }
  }
</style>