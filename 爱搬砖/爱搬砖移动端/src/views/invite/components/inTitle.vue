<template>
  <div class="title"><i></i><slot></slot><i></i></div>
</template>

<script>
  export default {
    name: "inTitle"
  }
</script>

<style scoped lang="less">
  .title{
    font-size: 0.4rem;
    letter-spacing: 0.04rem;
    color: #ffffff;
    text-align: center;
    i{
      display: inline-block;
      width: 0.21rem;
      height: 0.3rem;
      background: url("../../../assets/invite/tit_icon.png") no-repeat center center / 100%;
      margin: 0 0.23rem;
    }
  }
</style>