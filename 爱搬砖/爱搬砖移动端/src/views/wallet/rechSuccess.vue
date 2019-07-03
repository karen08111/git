<template>
  <div class="app">
    <img src="../../assets/wallet_success.png" alt="">
    <h3>充值成功</h3>
    <div class="btn">确 定</div>
  </div>
</template>

<script>
  export default {
    name: "rechSuccess",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .app{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.9rem;
    img{
      width: 2.2rem;
      height: 2rem;
      margin-bottom: 0.55rem;
      position: relative;
      right: 0.2rem;
    }
    h3{
      font-family: MicrosoftYaHei;
      font-size: 0.54rem;
      color: #eb2d4d;
      margin-bottom: 4.34rem;
    }
    .btn{
      width: 5.8rem;
      height: 1.2rem;
      background-color: #ffffff;
      border-radius: 0.6rem;
      border: solid 0.01rem #999999;
      opacity: 0.9;
      font-family: AdobeHeitiStd-Regular;
      font-size: 0.34rem;
      line-height: 1.2rem;
      letter-spacing: 0.03rem;
      color: #999999;
      text-align: center;
    }
  }
</style>