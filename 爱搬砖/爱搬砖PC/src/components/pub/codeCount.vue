<template>
  <div class="codeCount">
    <button type="button" :class="{ban: !flag}" :disabled="!flag" @click="countDown">{{text | bracket}}</button>
  </div>
</template>

<script>
  export default {
    name: "codeCount",
    props: {
      count: {
        type: Number,
        default: 60
      }
    },
    data() {
      return {
        text: '获取验证码',
        flag: true
      }
    },
    methods: {
      countDown (){
        this.text = this.count
        this.flag = false
        const timer = setInterval(() => {
          if(this.text === 0){
            clearInterval(timer)
            this.text = '重新获取验证码'
            this.flag = true
          }else{
            this.text --
          }
        },1000)
      }
    },
    filters: {
      bracket (val){
        if(typeof val == 'number')
          return `( ${val}s )`
        else
          return val
      }
    }
  }
</script>

<style scoped lang="less">
  .codeCount{
    button{
      border: none;
      background-color: transparent;
      letter-spacing: 1px;
      color: #3388ff;
      cursor: pointer;
      &.ban{
        color: #cccccc;
        cursor: default;
      }
    }
  }
</style>