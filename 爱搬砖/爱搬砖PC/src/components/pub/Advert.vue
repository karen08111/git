<template>
  <div>
    <div class="shopping">
      <a href="http://town.aibanzhuan.cn">立即进入</a>
    </div>
    <a href="http://shop.aibanzhuan.cn"><img src="../../assets/bazaar.png" class="street" :onerror="$store.state.defaultImg" alt=""></a>
  </div>

</template>

<script>
export default {
  name: 'Advert'
}
</script>

<style scoped lang="less">
  .shopping {
    width: 280px;
    height: 370px;
    position: relative;
    background: url("../../../static/image/shopping.png") no-repeat center center / 100% 100%;
    a {
      display: block;
      width: 102px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 15px 15px 15px 15px;
      border: solid 1px #3388ff;
      font-size: 16px;
      letter-spacing: 1px;
      color: #3388ff;
      position: absolute;
      left: 15px;
      bottom: 17px;
    }
  }
  .street{
    width: 280px;
    height: 160px;
    margin-top: 20px;
  }
</style>
