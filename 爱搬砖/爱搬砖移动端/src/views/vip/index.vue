<template>
  <div class="app">
    <img src="../../assets/vip/bg.png" alt="" class="bg">
    <div class="main">
      <div class="item yellow">
        <h3>小砖会员<span>一个月免费查看信息</span></h3>
        <div class="content">1.一个月内，不限地区，全国信息免费查看。
          2.服务时间从成功订阅后开始计算。
          3.信息可在PC端、移动端、APP端三方查看。
          4.站内信息版权归摩云爱搬砖所有，禁止赠与、借用、转让、售卖，否则平台有权在未经通知的情况下取消会员服务资格，由此带来的损失由会员自行承担，并追究法律责任。
          5.订阅成功后不支持退款。</div>
        <div class="btn" @click="open(1)">开   通</div>
      </div>
      <div class="item blue">
        <h3>大砖会员<span>一年免费查看信息</span></h3>
        <div class="content">1.一年内，不限地区，全国信息免费查看。
          2.服务时间从成功订阅后开始计算。
          3.信息可在PC端、移动端、APP端三方查看。
          4.站内信息版权归摩云爱搬砖所有，禁止赠与、借用、转让、售卖，否则平台有权在未经通知的情况下取消会员服务资格，由此带来的损失由会员自行承担，并追究法律责任。
          5.订阅成功后不支持退款。</div>
        <div class="btn" @click="open(12)">开   通</div>
      </div>
    </div>
    <v-pop ref="vPop" v-if="show" :serve.sync="serve" :balance="balance" :kid.sync="kid" @close="show = false"></v-pop>
  </div>
</template>

<script>
  import vPop from './comps/vPop'
  export default {
    name: "index",
    components: {vPop},
    data() {
      return {
        show: false,
        serve: +this.$route.query.serve || 12,
        balance: 0,
        timer: null,
        kjCount: 0,
        kid: ''
      }
    },
    computed: {
      code (){
        return this.$route.query.code
      }
    },
    watch: {
      kid (){
        this.dia()
      }
    },
    methods: {
      getBalance (){
        this.$http.get('/member/payment/wallet').then(res => {
          if(res.code === 200){
            this.balance = +res.data.balance
          }
        })
      },
      open (num){
        if(this.$cookies.get('abz_app_token')){
          this.serve = num
          this.show = true
        }else{
          this.$toast.fail('请先登录！')
          this.$router.push({path: '/Login'})
        }
      },
      dia (){
        this.$dialog.confirm({
          title: '支付',
          message: '支付是否成功？',
          confirmButtonText: '已成功支付',
          cancelButtonText: '订单异常'
        }).then(() => {
          this.$http.get(`/member/payment/vip_buy_status/${sessionStorage.getItem('odd') || this.kid}`).then(res => {
            if(res.msg === 'success'){
              this.$toast.success("恭喜成为会员！")
              sessionStorage.removeItem('odd')
              this.show = false
            }else{
              this.$toast.success("获取订单超时，请重试！")
              this.dia()
            }
          })
        }).catch(() => {
          sessionStorage.removeItem('odd')
          this.show = false
        })
      }
    },
    created (){
      this.getBalance()
      if(this.code){
        this.show = true
      }else{
        if(sessionStorage.getItem('odd')){
          this.dia()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    position: relative;
    height: 15.15rem;
    overflow: hidden;
    .bg{
      width: 7.5rem;
      height: 16.43rem;
      background: url("../../assets/vip/bg.png") no-repeat center 1.28rem / 100%;
      position: absolute;
      left: 50%;
      top: -1.28rem;
      transform: translateX(-50%);
    }
    .main{
      width: 6.9rem;
      height: 10.99rem;
      background: url("../../assets/vip/main.png") no-repeat left top / 100%;
      position: relative;
      z-index: 9;
      margin: 3.97rem auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.62rem;
      .item{
        width: 5.64rem;
        height: 4.92rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        padding: 0.2rem 0.3rem;
        box-sizing: border-box;
        position: relative;
        &.yellow{
          background: url("../../assets/vip/item1.png") no-repeat center / 100%;
          margin-bottom: 0.27rem;
        }
        &.blue{
          background: url("../../assets/vip/item2.png") no-repeat center / 100%;
        }
        h3{
          font-family: AdobeHeitiStd-Regular;
          font-size: 0.24rem;
          color: #666666;
          margin-bottom: 0.4rem;
          span{
            font-family: AdobeHeitiStd-Regular;
            font-size: 0.18rem;
            color: #666666;
            margin-left: 0.3rem;
          }
        }
        .content{
          font-family: HYQiHei-EES;
          font-size: 0.18rem;
          line-height: 0.36rem;
          color: #999999;
          white-space: pre-line;
        }
        .btn{
          width: 3.6rem;
          height: 0.8rem;
          line-height: 0.8rem;
          background: url("../../assets/vip/btn.png") no-repeat center / 100%;
          font-family: AdobeHeitiStd-Regular;
          font-size: 0.43rem;
          color: #ffffff;
          text-align: center;
          text-shadow: 0rem 0.02rem 0rem 0rem #2c0573;
          position: absolute;
          bottom: 0.35rem;
          left: 1.02rem;
        }
      }
    }
  }
</style>