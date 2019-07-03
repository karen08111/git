<template>
  <div class="enterProject">
    <Header></Header>
    <navMenu :navs="navs"></navMenu>
    <router-view style="width:1200px;margin:0 auto;"/>
  </div>
</template>

<script>
import { enterRoutes } from '../../router'
export default {
  name: 'enterProject',
  data () {
    return {
      navs: enterRoutes[0].children
    }
  }
}
</script>

<style scoped>

</style>
