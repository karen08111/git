<template>
  <div class="app">
    <div class="card">
      <h3>
        我的余额
        <router-link to="/bill">查看账单</router-link>
      </h3>
      <p><span>¥</span>{{balance}}</p>
    </div>
    <div class="bot">
      <router-link to="/recharge" class="btn">充 值</router-link>
      <router-link to="/wa_getCode">修改支付密码</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data (){
      return {
        balance: 0
      }
    },
    created() {
      this.$http.get('/member/payment/wallet').then(res => {
        if(res.code === 200){
          this.balance = res.data.balance
          if(!res.data.paypasswd){
            this.$router.push({path: '/wa_getCode'})
          }
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .app{
    height: calc(100vh - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.21rem;
    padding-bottom: 0.79rem;
    box-sizing: border-box;
    .card{
      width: 6.9rem;
      height: 2.78rem;
      box-shadow: 0rem 0.06rem 0.15rem 0rem rgba(44, 133, 255, 0.15);
      border-radius: 0.2rem;
      background: #c8ddfb url("../../assets/wallet_card.png") no-repeat center / 100%;
      padding: 0.3rem 0.2rem;
      box-sizing: border-box;
      h3{
        width: 100%;
        height: 0.34rem;
        font-family: MicrosoftYaHei;
        font-size: 0.34rem;
        letter-spacing: 0.02rem;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.44rem;
        a{
          font-size: 0.24rem;
          color: #ffffff;
        }
      }
      p{
        font-family: MicrosoftYaHei;
        font-size: 0.52rem;
        letter-spacing: 0.03rem;
        color: #ff0037;
        span{
          font-size: 0.36rem;
          letter-spacing: 0.02rem;
          color: #ff0037;
        }
      }
    }
    .bot{
      display: flex;
      flex-direction: column;
      align-items: center;
      .btn{
        display: block;
        width: 5.8rem;
        height: 1rem;
        background-color: #3388ff;
        border-radius: 0.5rem;
        opacity: 0.9;
        font-family: AdobeHeitiStd-Regular;
        font-size: 0.34rem;
        line-height: 1rem;
        letter-spacing: 0.03rem;
        color: #ffffff;
        text-align: center;
        margin-bottom: 0.27rem;
      }
      a{
        font-family: MicrosoftYaHei;
        font-size: 0.24rem;
        letter-spacing: 0.01rem;
        color: #cccccc;
      }
    }
  }
</style>