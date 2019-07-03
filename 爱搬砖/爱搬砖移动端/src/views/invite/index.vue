<template>
  <div class="index">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    created (){
      if(!sessionStorage.getItem('firstOpenTime')){
        sessionStorage.setItem('firstOpenTime', true)
        location.reload()
      }
    },
    mounted (){
      setTimeout(_ => {
        document.getElementById('footer_bar').style.display = 'none'
      },200)
    },
    beforeDestroy (){
      setTimeout(_ => {
        document.getElementById('footer_bar').style.display = 'block'
      },200)
    }
  }
</script>

<style scoped lang="less">
  .index{
    width: 100%;
    background-color: #f34353;
    overflow-x: hidden;
  }
</style>