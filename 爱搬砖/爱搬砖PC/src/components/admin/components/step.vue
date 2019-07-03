<template>
  <div class="steps">
    <div class="step">
      <div class="ic" :class="aStep[0] ? 'icon_a' : 'icon'">1</div>
      <p :class="{active: aStep[0] === true}">手机验证</p>
    </div>
    <div class="line active"></div>
    <div class="step">
      <div class="ic" :class="aStep[1] ? 'icon_a' : 'icon'">2</div>
      <p :class="{active: aStep[1] === true}">设置密码</p>
    </div>
    <div class="line" :class="{active: step === 3}"></div>
    <div class="step">
      <div class="ic" :class="aStep[2] ? 'icon_a' : 'icon'">√</div>
      <p :class="{active: aStep[2] === true}">确认密码</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "step",
    props: {
      step: {
        type: Number,
        default: 1
      }
    },
    computed: {
      aStep (){
        let arr = [false, false, false]
        for(let i=0; i<this.step; i++){
          arr[i] = true
        }
        return arr
      }
    }
  }
</script>

<style scoped lang="less">
  .steps{
    display: flex;
    justify-content: center;
    .step{
      display: flex;
      flex-direction: column;
      align-items: center;
      &:last-of-type{
        .ic{
          font-family: "Ubuntu Mono";
        }
      }
      .ic{
        font-size: 13px;
        line-height: 30px;
        color: #ffffff;
        text-align: center;
      }
      .icon{
        width: 30px;
        height: 30px;
        background: url("../../../assets/wallet_step.png") no-repeat center / 100%;
      }
      .icon_a{
        width: 30px;
        height: 30px;
        background: url("../../../assets/wallet_step_a.png") no-repeat center / 100%;
      }
      p{
        letter-spacing: 1px;
        color: #cccccc;
        margin-top: 9px;
        &.active{
          color: #999999;
        }
      }
    }
    .line{
      width: 298px;
      height: 3px;
      background-color: #cccccc;
      margin: 14px 10px;
      &.active{
        background-color: #3388ff;
      }
    }
  }
</style>