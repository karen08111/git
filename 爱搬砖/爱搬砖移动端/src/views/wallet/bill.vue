<template>
  <div class="app">
    <nav id="bill_nav">
      <span :class="{active: idx === 1}" @click="idx = 1">充值</span>
      <i></i>
      <span :class="{active: idx === 2}" @click="idx = 2">消费</span>
    </nav>
    <billList v-show="idx === 1" :genre="1"></billList>
    <billList v-show="idx === 2" :genre="2"></billList>
  </div>
</template>

<script>
  import billList from './comps/billList'
  export default {
    name: "bill",
    components: {billList},
    data() {
      return {
        idx: 1
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    nav{
      width: 100%;
      height: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.2rem;
      span{
        font-family: AdobeHeitiStd-Regular;
        font-size: 0.32rem;
        letter-spacing: 0.03rem;
        color: #bababa;
        padding-bottom: 0.16rem;
        border-bottom: 0.04rem solid transparent;
        &.active{
          color: #3388ff;
          border-bottom: 0.04rem solid #2c85ff;
        }
      }
      i{
        display: block;
        width: 0.02rem;
        height: 0.31rem;
        background-color: #bababa;
        border-radius: 0.01rem;
        margin: -0.1rem 1.33rem 0;
      }
    }
  }
</style>