<template>
  <div class="tips">
    <div class="title">{{title}}</div>
    <span v-for="item in list">{{item}}</span>
  </div>
</template>

<script>
export default {
  name: 'tips',
  data () {
    return {
    }
  },
  props: ['title', 'tips'],
  computed: {
    list () {
      let arr = []
      this.tips.map((value, index) => {
        if (value) { arr.push(value) }
      })
      return arr
    }
  }
}
</script>

<style scoped lang="less">
  .tips{
    width: 1200px;
    height: 65px;
    border-bottom: 1px solid #cccccc;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .title{
      display: inline-block;
      height: 24px;
      line-height: 24px;
      background-color: #ffffff;
      border-radius: 6px;
      border: solid 1px #cccccc;
      padding: 0 10px;
      margin-right: 10px;
      font-size: 12px;
      letter-spacing: 1px;
      color: #333333;
    }
    span{
      font-size: 12px;
      letter-spacing: 1px;
      color: #999999;
      &:not(:last-child):after{
        content: '>';
        display: inline-block;
        margin-left: 11px;
        margin-right: 9px;
      }
    }
  }
</style>
