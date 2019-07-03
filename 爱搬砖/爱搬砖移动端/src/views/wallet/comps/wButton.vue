<template>
  <div class="wButton"><slot></slot></div>
</template>

<script>
  export default {
    name: "wButton"
  }
</script>

<style scoped lang="less">
  .wButton{
    width: 5.8rem;
    height: 1rem;
    background-color: #3388ff;
    border-radius: 0.5rem;
    opacity: 0.9;
    font-family: AdobeHeitiStd-Regular;
    font-size: 0.34rem;
    line-height: 1rem;
    letter-spacing: 0.03rem;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
  }
</style>