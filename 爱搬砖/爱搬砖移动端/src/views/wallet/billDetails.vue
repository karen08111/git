<template>
  <div class="app">
    <template v-if="type === 2">
      <p>消费金额：<span class="expend">{{expenditure.total_fee}}</span></p>
      <p>当前状态：{{expenditure.status_text}}</p>
      <p>商家名称：{{expenditure.merchant}}</p>
      <p>消费方式：{{expenditure.platf_source}}</p>
      <p>交易单号：{{expenditure.platf_id}}</p>
      <p>商品名称：{{expenditure.title}}</p>
      <p>消费时间：{{expenditure.create_time}}</p>
    </template>
    <template v-else>
      <p>充值金额：{{recharge.total_fee}}</p>
      <p>当前状态：{{recharge.status_text}}</p>
      <p>充值方式：{{recharge.platf_source}}</p>
      <p>交易单号：{{recharge.platf_id}}</p>
      <p>充值时间：{{recharge.create_time}}</p>
    </template>
  </div>
</template>

<script>
  export default {
    name: "billDetails",
    data() {
      return {
        expenditure: {
          total_fee: '',
          status_text: '',
          merchant: '',
          platf_source: '',
          platf_id: '',
          create_time: ''
        },
        recharge: {
          total_fee: '',
          status_text: '',
          platf_source: '',
          platf_id: '',
          create_time: ''
        }
      }
    },
    computed: {
      type (){
        return +this.$route.params.type
      },
      id (){
        return this.$route.params.id
      }
    },
    created (){
      this.$http.get(`/member/payment/stream/${this.id}`).then(res => {
        if(res.code === 200){
          const data = res.data
          if(this.type == 1){
            this.recharge = data
          }else{
            this.expenditure = data
          }
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .app{
    padding: 0.41rem 0.3rem;
    p{
      font-family: MicrosoftYaHei;
      font-size: 0.22rem;
      line-height: 0.5rem;
      letter-spacing: 0.01rem;
      color: #999999;
      .expend{
        color: #ff7b0e;
      }
      .recharge{
        color: #1bb974;
      }
    }
  }
</style>