<template>
  <div>(￣▽￣)~*</div>
</template>

<script>
export default {
  name: 'Fxnxpon20AVospA9',
  data () {
    return {}
  },
  created () {
    const obj = this.$route.query
    if (Object.keys(obj).length != 0) {
      this.$cookies.set('abztoken', obj.token, '0')
      this.$cookies.set('username', obj.nick, '0')
      this.$cookies.set('authState', obj.auth_status, '0')
      this.$store.commit('setAvatar', this.$store.state.site + obj.avatar)
      this.$store.commit('getCoo')
      this.$router.push({ name: 'index' })
      setTimeout(_ => { location.reload() }, 300)
    }
  }
}
</script>

<style scoped lang="less">

</style>
