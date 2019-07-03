<template>
  <div class="app">
    <div class="item">
      <img src="../../../assets/recr/ch1.png" alt="">
      <router-link to="/zhaoForm">招标采购</router-link>
    </div>
    <div class="item">
      <img src="../../../assets/recr/ch2.png" alt="">
      <router-link to="/xunForm">询价采购</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chooseType',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .app{
    height: 570px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 79px;
    padding-right: 65px;
    .item{
      width: 300px;
      height: 379px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      &:last-of-type{
        img{
          margin-top: 23px;
        }
      }
      img{
        margin-bottom: 107px;
      }
      a{
        display: block;
        width: 125px;
        height: 40px;
        background-image: linear-gradient(90deg,
        rgba(51, 136, 255, 0.9) 0%,
        rgba(145, 175, 252, 0.9) 100%),
        linear-gradient(
            #3388ff,
            #3388ff);
        background-blend-mode: normal,
        normal;
        border-radius: 20px;
        font-size: 16px;
        line-height: 40px;
        color: #ffffff;
      }
    }
  }
</style>
