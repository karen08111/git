<template>
  <div class="need">
    <Header v-if="routeChange"></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'Need',
  data () {
    return {
      routeChange: true
    }
  },
  watch: {
    '$route' () {
      this.routeChange = !this.routeChange
      this.$nextTick(function () {
        this.routeChange = !this.routeChange
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header{
    position: relative;
    z-index: 99;
  }
</style>
