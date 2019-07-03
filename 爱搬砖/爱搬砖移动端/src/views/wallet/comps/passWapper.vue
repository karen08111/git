<template>
  <div class="passWapper">
    <div class="p-header">
      <van-icon class="close" name="cross" @click.stop="$emit('close')" />
      输入密码
    </div>
    <div class="p-cen">
      <passInput v-model="value"></passInput>
      <router-link to="/wa_getCode">忘记密码</router-link>
    </div>
    <div class="p-bot">

    </div>
  </div>
</template>

<script>
  import passInput from './passInput'
  export default {
    name: "passWapper",
    components: {passInput},
    props: ['pass'],
    computed: {
      value: {
        get (){
          return this.pass
        },
        set(val){
          this.$emit('update:pass', val)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .passWapper{
    width: 100%;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 1rem;
    z-index: 999;
    border-top: 1PX solid #cccccc;
    box-sizing: border-box;
    .p-header{
      width: 100%;
      height: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1PX solid #cccccc;
      margin-bottom: 0.6rem;
      padding: 0 0.5rem;
      box-sizing: border-box;
      .close{
        position: absolute;
        left: 0.5rem;
      }
    }
    .p-cen{
      padding: 0 0.5rem 1.42rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      a{
        font-family: MicrosoftYaHei;
        font-size: 0.2rem;
        letter-spacing: 0.02rem;
        color: #3388ff;
        align-self: flex-end;
        margin-top: 0.1rem;
      }
    }
    .p-bot{

    }
  }
</style>