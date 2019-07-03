<template>
  <div class="button-wapper">
    <div class="button" :class="disable && 'disable' || 'can'"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: "inButton",
    props: {
      disable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="less">
  .button-wapper{
    display: flex;
    justify-content: center;
    align-items: center;
    .button{
      width: 5.97rem;
      height: 0.94rem;
      line-height: 0.88rem;
      text-align: center;
      font-family: PingFang-SC-Bold;
      font-size: 0.34rem;
      letter-spacing: 0.03rem;
      &.can{
        background: url("../../../assets/invite/btn_bg.png") no-repeat center center / 5.76rem 0.82rem;
        color: #f34353;
        &:active{
          background: url("../../../assets/invite/btn_active.png") no-repeat center center / 5.97rem 0.94rem;
        }
      }
    }
    .disable{
      background: url("../../../assets/invite/btn_disable.png") no-repeat center center / 5.75rem 0.79rem;
      color: #fff;
    }
  }
</style>