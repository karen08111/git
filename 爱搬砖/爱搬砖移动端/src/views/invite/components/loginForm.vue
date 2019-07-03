<template>
  <div class="input">
    <div class="inp-line">
      <i class="tel"></i><input v-model="tel" type="text" placeholder="请输入手机号">
    </div>
    <div class="cod">
      <div class="inp-line">
        <i class="code"></i><input v-model="cod" type="text" placeholder="请输入验证码">
      </div>
      <span class="btn" :class="{dis: !disable}" @click="getCode">{{btnTxt | count}}</span>
    </div>
    <verify :mobile="tel" :img="imgUrl" :mob="mobUrl" :request_id="request_id" :x_qe_with="x_qe_with" v-if="puzzleShow" @success="success" @close="puzzleShow = false"></verify>
  </div>
</template>

<script>
  import verify from '@/views/login/components/verify'
  export default {
    name: "loginForm",
    props: {
      mobile: String,
      code: String,
      imgUrl: String,
      mobUrl: String,
      request_id: String,
      x_qe_with: Object
    },
    components: {verify},
    data (){
      return {
        btnTxt: '获取',
        puzzleShow: false
      }
    },
    computed: {
      tel: {
        get (){
          return this.mobile
        },
        set (val){
          this.$emit('update:mobile',val)
        }
      },
      cod: {
        get (){
          return this.code
        },
        set (val){
          this.$emit('update:code',val)
        }
      },
      disable (){
        if(typeof this.btnTxt === "number") return false
        else return true
      }
    },
    methods: {
      success (){
        this.puzzleShow = !this.puzzleShow
        this.btnTxt = 59
        const timer = setInterval(() => {
          this.btnTxt--
          if(this.btnTxt == 0){
            clearInterval(timer)
            this.btnTxt = '获取'
          }
        },1000)
      },
      getCode (){
        if(this.disable){
          if(this.mobile){
            if(this.mobile.length === 11){
              this.puzzleShow = true
            }else {
              this.$toast('请输入正确的手机号！')
            }
          }else {
            this.$toast('手机号不能为空！')
          }
        }
      }
    },
    filters: {
      count (val){
        if(typeof val === "number"){
          return `${val}秒`
        }else{
          return val
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .input{
    .cod{
      padding: 0 0.34rem;
      display: flex;
      .inp-line{
        margin: 0;
        width: 3.7rem;
      }
      .btn{
        min-width: 2.07rem;
        height: 0.88rem;
        line-height: 0.88rem;
        background-color: #f34250;
        border-radius: 0.1rem;
        text-align: center;
        font-size: 0.3rem;
        letter-spacing: 0.01rem;
        color: #ffffff;
        margin-left: 0.08rem;
      }
      .dis{
        background-color: rgba(164,165,169,0.91);
      }
    }
    .inp-line{
      width: 5.87rem;
      height: 0.88rem;
      background-color: #eeeeee;
      border-radius: 0.1rem;
      margin: 0 auto 0.31rem;
      padding-left: 0.26rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      overflow: hidden;
      i{
        display: inline-block;
        min-width: 0.29rem;
        height: 0.38rem;
        margin-right: 0.21rem;
        background-repeat: no-repeat;
        background-position: right center;
        &.tel{
          background-image: url('../../../assets/invite/tel.png');
          background-size: 0.26rem 0.38rem;
        }
        &.code{
          background-image: url('../../../assets/invite/code.png');
          background-size: 0.29rem 0.34rem;
        }
      }
      input{
        font-size: 0.28rem;
        letter-spacing: 0.01rem;
        background-color: transparent;
        flex: 1 1 auto;
      }
    }
  }
</style>