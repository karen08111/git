<template>
  <div class="app">
    <img src="../../assets/vip/success.png" alt="">
    <p>恭喜您成功成为{{type}}会员</p>
    <div class="btn" @click="back">完 成</div>
  </div>
</template>

<script>
  export default {
    name: "vipSuccess",
    data() {
      return {}
    },
    computed: {
      type (){
        return this.$route.params.type == 1 ? '小砖' : '大砖'
      }
    },
    methods: {
      back (){
        this.$router.push({name: 'vip'})
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 1.94rem;
      height: 1.48rem;
      padding-top: 1.6rem;
      margin-bottom: 0.59rem;
    }
    p{
      font-family: MicrosoftYaHei;
      font-size: 0.24rem;
      letter-spacing: 0.02rem;
      color: #555555;
      margin-bottom: 4.44rem;
    }
    .btn{
      width: 6.9rem;
      height: 1.1rem;
      background-color: #13a7ff;
      border-radius: 0.2rem;
      font-family: MicrosoftYaHei;
      font-size: 0.32rem;
      line-height: 1.1rem;
      color: #ffffff;
      text-align: center;
    }
  }
</style>
