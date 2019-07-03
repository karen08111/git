<template>
  <div class="step">
    <div class="floor"></div>
    <div class="briefs" :style="{width: percent}"></div>
    <div class="now" :style="{left: percent}">
      <img src="../../../assets/invite/triangle.png" alt="">
      <p>已邀请<span>{{invited}}</span>人
      </p>
    </div>
    <div class="grading five">
      <p class="top" v-if="steps[0] === 0">100元</p>
      <p class="top" v-else-if="steps[0] === 2">待领取<span>100</span>元</p>
      <p class="top" v-else>已领取<span>100</span>元</p>
      <i :class="steps[0] === 0 && 'cant' || 'can'"></i>
      <p class="bot">50人</p>
    </div>
    <div class="grading ten">
      <p class="top" v-if="steps[1] === 0">300元</p>
      <p class="top" v-else-if="steps[1] === 2">待领取<span>300</span>元</p>
      <p class="top" v-else>已领取<span>300</span>元</p>
      <i :class="steps[1] === 0 && 'cant' || 'can'"></i>
      <p class="bot">100人</p>
    </div>
    <div class="grading twe">
      <p class="top" v-if="steps[2] === 0">600元</p>
      <p class="top" v-else-if="steps[2] === 2">待领取<span>600</span>元</p>
      <p class="top" v-else>已领取<span>600</span>元</p>
      <i :class="steps[2] === 0 && 'cant' || 'can'"></i>
      <p class="bot">200人</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "inStep",
    props: {
      invited: Number,
      steps: {
        type: Array,
        default: [1,1,1]
      }
    },
    computed: {
      percent (){
        if(this.invited === 0) return '1%'
        else if(this.invited <= 200) return (this.invited / 200) * 100 + '%'
        else return '100%'
      }
    }
  }
</script>

<style scoped lang="less">
  .step{
    width: 6.86rem;
    height: 1.34rem;
    margin: 0.44rem auto 0.5rem;
    position: relative;
    .floor{
      width: 6.86rem;
      height: 0.25rem;
      background-color: #7c0013;
      box-shadow: inset 0rem 0.03rem 0.03rem 0rem
      rgba(4, 0, 0, 0.34);
      border-style: solid;
      border-width: 0.01rem;
      border-image-source: linear-gradient(0deg,
      rgba(255, 255, 255, 0.28) 0%,
      #ffffff 100%);
      border-image-slice: 1;
      position: absolute;
      top: 0.32rem;
      left: 0;
      z-index: 1;
    }
    .briefs{
      height: 0.25rem;
      position: absolute;
      top: 0.32rem;
      left: 0;
      z-index: 2;
      background: url("../../../assets/invite/step.png") repeat-x left top / auto 100%;
    }
    .now{
      display: inline-block;
      transform: translateX(-0.32rem);
      position: absolute;
      top: 0.7rem;
      z-index: 4;
      img{
        width: 0.34rem;
        height: 0.29rem;
        margin-left: 0.15rem;
      }
      p{
        font-family: PingFang-SC-Medium;
        font-size: 0.2rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.48rem;
        letter-spacing: 0.01rem;
        color: #fefefe;
        white-space: nowrap;
        span{
          color: #ffc62f;
        }
      }
    }
    .grading{
      position: absolute;
      top: 0.27rem;
      z-index: 3;
      height: 0.38rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      transform: translateX(-80%);
      &.five{
        left: 25%;
      }
      &.ten{
        left: 50%;
      }
      &.twe{
        left: 100%;
      }
      p{
        font-family: PingFang-SC-Medium;
        font-size: 0.2rem;
        letter-spacing: 0.01rem;
        color: #fefefe;
        text-align: center;
        position: absolute;
        &.top{
          width: 1.8rem;
          bottom: 0.45rem;
        }
        &.bot{
          width: 0.9rem;
          top: 0.4rem;
        }
        span{
          font-size: 0.25rem;
          letter-spacing: 0.01rem;
          color: #fff413;
        }
      }
      i{
        display: block;
        width: 0.35rem;
        height: 0.38rem;
        &.cant{
          background: url("../../../assets/invite/oval.png") no-repeat center center / 0.34rem 0.38rem;
        }
        &.can{
          width: 0.35rem;
          height: 0.35rem;
          background-color: #ff1617;
          border: solid 0.03rem #fff413;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
    }
  }
</style>