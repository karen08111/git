<template>
  <ul>
    <li v-for="item in titles">{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: 'taHeader',
  props: ['titles']
}
</script>

<style scoped lang="less">
  ul{
    display: flex;
    align-items: center;
    height: 57px;
    background-color: #f3f9ff;
    box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.1);
    li{
      flex: 1;
      text-align: center;
      height: 12px;
      font-size: 13px;
      color: #34495e;
      &:not(:last-of-type){
        border-right: 1px solid #34495e;
      }
    }
  }
</style>
