<template>
  <div class="app">
    <adminHeader>充 值</adminHeader>
    <div class="main">
      <div class="bingo"></div>
      <h3>充值完成</h3>
      <div>
        <p>充值方式：{{type}}</p>
        <p>充值金额：{{money}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "rechargeSuccess",
    data() {
      return {
        type: '微 信',
        money: '520.00'
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    .main{
      width: 960px;
      height: 599px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .bingo{
        width: 104px;
        height: 84px;
        background: url("../../../assets/bingo.png") no-repeat center / 100%;
      }
      h3{
        font-size: 24px;
        font-weight: normal;
        letter-spacing: 2px;
        color: #333333;
        margin-top: 20px;
        margin-bottom: 30px;
      }
      p{
        font-size: 13px;
        letter-spacing: 1px;
        color: #999999;
        margin-bottom: 10px;
      }
    }
  }
</style>