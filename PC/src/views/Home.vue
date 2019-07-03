<template>
    <div class="demo">
      <div class="best">周杰伦</div>
      <a href="">fsadfas</a>
      <ul>
        <li></li>
        <li>23</li>
        <li>333</li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: "Home",
    mounted () {
      // console.log(process.env.VUE_APP_URL)
      this.$http.get('/').then(res => {
        console.log(res)
      })
    }
  }
</script>

<style scoped lang="less">
.demo {
  .best {
    color: red;
  }
}
</style>
