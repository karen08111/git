<template>
  <div class="title">
    <h2>{{headline}}</h2>
    <div class="line"></div>
    <p>{{subhead}}</p>
  </div>
</template>

<script>
  export default {
    name: "atitle",
    props: ['headline','subhead']
  }
</script>

<style scoped lang="less">
  .title{
    text-align: center;
    h2{
      font-family: PingFangSC-Regular,MicrosoftYaHei;
      font-size: 0.34rem;
      letter-spacing: 0.03rem;
      color: #333333;
    }
    .line{
      width: 1.43rem;
      height: 0.01rem;
      background-color: #bdbdbd;
      margin: 0.2rem auto 0.12rem;
      position: relative;
      &:after{
        content: '';
        display: block;
        width: 0.40rem;
        height: 0.05rem;
        background-color: #3388ff;
        position: absolute;
        top: -0.02rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    p{
      font-family: MicrosoftYaHei;
      font-size: 0.24rem;
      line-height: 0.36rem;
      color: #bdbdbd;
    }
  }
</style>