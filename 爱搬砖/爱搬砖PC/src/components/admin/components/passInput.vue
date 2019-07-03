<template>
  <div class="passInput" :style="{width: 34*num + 5*(num-1) + 'px'}">
    <input type="text" v-focus ref="passInp" class="big" :maxlength="num" :value="value" @input="inping($event)" @focus="changeFlag(true)" @blur="changeFlag(false)">
    <!--<div class="inps" v-if="isPassType">
      <div class="inp" v-for="(item, index) in num" :class="{active: idx === index+1 && flag}" @click="handelInp(index)">{{value[item-1] | num2star}}</div>
    </div>-->
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
      vari: [String, Number],
      isPassType: {
        type: Boolean,
        default: false
      }
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
    filters: {
      num2star (val){
        return val ? '*' : ''
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
    height: 34px;
    .big{
      background-color: transparent;
      border: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 6;
      opacity: 0;
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
      .inp{
        width: 35px;
        height: 34px;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #999999;
        line-height: 34px;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        cursor: text;
        &.active:after{
          content: '';
          display: block;
          width: 1px;
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
