<template>
  <div class="app">
    <adminHeader>{{type === 2 ? '消费详情' : '充值详情'}}</adminHeader>
    <div class="gear"></div>
    <div class="main">
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
        <p>充值金额：<span class="recharge">{{recharge.total_fee}}</span></p>
        <p>当前状态：{{recharge.status_text}}</p>
        <p>充值方式：{{recharge.platf_source}}</p>
        <p>交易单号：{{recharge.platf_id}}</p>
        <p>充值时间：{{recharge.create_time}}</p>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fillDetails",
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
      id (){
        return this.$route.params.id
      },
      type (){
        return +this.$route.params.type
      }
    },
    created (){
      this.$http.get(`/member/payment/stream/${this.id}`).then(res => {
        if(res.data.code === 200){
          const data = res.data.data
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
    .gear{
      width: 100%;
      height: 10px;
      background-color: #f7f7fa;
    }
    .main{
      width: 100%;
      min-height: 486px;
      background-color: #fff;
      padding: 5px 29px;
      box-sizing: border-box;
      p{
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50px;
        letter-spacing: 1px;
        color: #999999;
        .expend{
          color: #ff7b0e;
        }
        .recharge{
          color: #1bb974;
        }
      }
    }
  }
</style>
