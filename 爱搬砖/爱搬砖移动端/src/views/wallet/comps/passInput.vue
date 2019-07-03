<template>
  <div class="passInput" :style="{width: 0.9*num + 0.22*(num-1) + 'rem'}">
    <input type="password" v-focus ref="passInp" class="big" :maxLength="num" :value="value" @input="inping($event)" @focus="changeFlag(true)" @blur="changeFlag(false)">
    <div class="inps">
      <div class="inp" v-for="(item, index) in num" :class="{active: idx === index+1 && flag}" @click="handelInp(index)">{{value[item-1]}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "passInput",
    props: {
      value: [String, Number],
      num: {
        type: Number,
        default: 6
      },
      vari: [String, Number]
    },
    data (){
      return {
        idx: 1,
        flag: false
      }
    },
    watch: {
      vari (){
        this.$refs.passInp.focus()
        this.idx = 1
      }
    },
    methods: {
      inping (e){
        if(this.flag){
          this.$emit('input', e.target.value)
          this.idx = this.$refs.passInp.selectionStart + 1
        }
      },
      handelInp (index){
        this.$refs.passInp.focus()
        this.$refs.passInp.selectionStart = index
        this.$refs.passInp.selectionEnd = index
        this.idx = this.$refs.passInp.selectionStart + 1
      },
      changeFlag (boo){
        this.flag = boo
      }
    },
    directives: {
      focus: {
        inserted (el){
          el.focus()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .passInput{
    position: relative;
    height: 0.9rem;
    margin: 0 auto;
    .big{
      background-color: transparent;
      border: none;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 6;
      opacity: 0;
      text-indent: -999em; // 隐藏input文字
      margin-left: -100%;// 隐藏input光标
      width: 200%; // 保留inputDOM在页面可视区域内
    }
    .inps{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 7;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      .inp{
        width: 0.9rem;
        height: 0.9rem;
        background-color: #ffffff;
        border-radius: 0.2rem;
        border: solid 0.01rem #e5e5e5;
        line-height: 0.9rem;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        cursor: text;
        &.active:after{
          content: '';
          display: block;
          width: 1PX;
          height: 80%;
          background-color: #999999;
          position: absolute;
          left: 50%;
          top: 10%;
        }
      }
    }
  }
</style>
