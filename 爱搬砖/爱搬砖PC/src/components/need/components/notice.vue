<template>
  <div class="notice">
    <img src="../../../assets/notice.png" alt="">
<!--    <img src="../../../assets/cloud.png" alt="">-->
  </div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .notice{
    width: 210px;
    font-size: 0;
    img:first-child{
      position: relative;
      top: -5px;
      left: -5px;
      margin-bottom: 18px;
    }
  }
</style>
