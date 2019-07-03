<template>
  <div class="adminHeader"><slot></slot><slot name="lab"></slot></div>
</template>

<script>
  export default {
    name: "adminHeader",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .adminHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 23px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    font-family: "Microsoft YaHei";
    font-size: 16px;
    font-weight: bold;
    line-height: 50px;
    letter-spacing: 2px;
    color: #000003;
    position: relative;
    z-index: 1;
  }
</style>