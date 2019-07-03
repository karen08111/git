<template>
  <div>
    <ReHeader></ReHeader>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import ReHeader from './components/ReHeader'
export default {
  name: 'recr',
  components: { ReHeader },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">

</style>
