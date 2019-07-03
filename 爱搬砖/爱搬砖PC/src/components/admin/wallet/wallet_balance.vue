<template>
  <div class="app">
    <adminHeader>
      我的钱包
      <router-link slot="lab" to="/setPassword" class="amend">修改支付密码</router-link>
    </adminHeader>
    <div class="main">
      <div class="money"><span>￥</span>{{money}}</div>
      <div class="recharge"><router-link to="/recharge">充 值</router-link></div>
      <router-link to="/bill" class="bill">查看账单</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "wallet_balance",
    data() {
      return {
        money: 0
      }
    },
    methods: {
      getBalance (){
        this.$http.get('/member/payment/wallet').then(res => {
          if(res.data.code === 200){
            this.money = res.data.data.balance
            if(!res.data.data.paypasswd){
              sessionStorage.setItem('adNavIdx', '/setPassword')
              this.$router.push({path: '/setPassword/1'})
              setTimeout(() => {
                window.location.reload()
              },200)
            }
          }
        })
      }
    },
    created (){
      this.getBalance()
    }
  }
</script>

<style scoped lang="less">
  .app{
    .amend{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      line-height: 50px;
      letter-spacing: 1px;
      color: #999999;
    }
    .main{
      width: 960px;
      height: 606px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .money{
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #333333;
        display: flex;
        align-items: center;
        margin-bottom: 98px;
        span{
          font-size: 28px;
          font-weight: normal;
          letter-spacing: 0;
        }
      }
      .recharge{
        width: 121px;
        height: 33px;
        line-height: 33px;
        background-color: #21a6f5;
        border-radius: 4px;
        text-align: center;
        font-size: 18px;
        letter-spacing: 2px;
        color: #ffffff;
        margin-bottom: 10px;
        cursor: pointer;
        a{
          display: block;
          width: 100%;
          height: 100%;
          font-size: 18px;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
      .bill{
        font-size: 12px;
        letter-spacing: 1px;
        color: #4891ff;
      }
    }
  }
</style>
