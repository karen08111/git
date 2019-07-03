<template>
  <div class="footer">
    <inTitle>活动规则</inTitle>
    <div class="main">
      <div class="rule">

      </div>
      <img src="../../../assets/invite/footer.png" alt="" class="footer_img">
    </div>
  </div>
</template>

<script>
  import inTitle from './inTitle'
  export default {
    name: "inFooter",
    components: {inTitle},
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .footer{
    width: 100%;
    padding-bottom: 1.24rem;
    .main{
      margin-top: 0.19rem;
      .rule{
        width: 6.57rem;
        height: 9.9rem;
        background: url("../../../assets/invite/rule.jpg") no-repeat top center / 100%;
        margin: 0 auto;
      }
      .footer_img{
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>