<template>
  <div class="popUp">
    <router-link to="/identitySelect"><img src="../../../assets/invite/pop.png" alt=""></router-link>
    <i @click="$emit('close')"></i>
  </div>
</template>

<script>
  export default {
    name: "popUp",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .popUp{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 7.18rem;
      margin-bottom: 0.29rem;
    }
    i{
      display: block;
      width: 0.52rem;
      height: 0.52rem;
      background: url("../../../assets/invite/close.png") no-repeat center / 100%;
    }
  }
</style>