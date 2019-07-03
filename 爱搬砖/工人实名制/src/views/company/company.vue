<template>
  <div class="company">
    <Header></Header>
    <navMenu></navMenu>
    <router-view style="width:1200px;margin:0 auto;" />
  </div>
</template>

<script>
export default {
  name: 'company',
  data () {
    return {
      nav: []
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
</style>
