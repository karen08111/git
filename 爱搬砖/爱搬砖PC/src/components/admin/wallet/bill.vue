<template>
  <div class="app">
    <div class="nav">
      <p :class="{active: navIdx === 0}" @click="navIdx = 0">全部</p>
      <p :class="{active: navIdx === 2}" @click="navIdx = 2">消费</p>
      <p :class="{active: navIdx === 1}" @click="navIdx = 1">获取</p>
    </div>
    <div class="division"></div>
    <div class="main">
      <fTable v-show="navIdx === 0" :genre="0"></fTable>
      <fTable v-show="navIdx === 2" :genre="2"></fTable>
      <fTable v-show="navIdx === 1" :genre="1"></fTable>
    </div>
  </div>
</template>

<script>
  import fTable from '../components/bill/fTable'
  export default {
    name: "bill",
    components: {fTable},
    data() {
      return {
        navIdx: 0
      }
    },
    methods: {
      req (){
        this.$http.get('/member/payment/stream', {params: {page}})
      }
    },
    created (){

    }
  }
</script>

<style scoped lang="less">
  .app{
    .nav{
      width: 960px;
      height: 50px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1;
      display: flex;
      padding: 0 50px;
      box-sizing: border-box;
      p{
        font-size: 16px;
        font-weight: bold;
        line-height: 50px;
        color: #333333;
        box-sizing: border-box;
        padding: 0 10px;
        cursor: pointer;
        margin-right: 100px;
        &.active{
          border-bottom: 2px solid #3388ff;
        }
      }
    }
    .division{
      width: 100%;
      height: 10px;
      background-color: #f9f9fc;
    }
    .main{

    }
  }
</style>
