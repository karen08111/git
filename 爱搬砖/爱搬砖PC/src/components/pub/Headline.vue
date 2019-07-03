<template>
  <h4>{{h4}}<span>{{span}}</span></h4>
</template>

<script>
export default {
  name: 'Headline',
  props: ['h4', 'span']
}
</script>

<style scoped lang="less">
  h4{
    font-size: 16px;
    letter-spacing: 2px;
    color: #666666;
    display: flex;
    align-items: center;
    &:before{
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background-color: #3388ff;
      margin-right: 10px;
    }
    span{
      font-size: 12px;
      letter-spacing: 1px;
      color: #cccccc;
      margin-left: 20px;
    }
  }
</style>
