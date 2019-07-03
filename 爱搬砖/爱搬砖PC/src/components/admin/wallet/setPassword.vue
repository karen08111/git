<template>
  <div class="app">
    <adminHeader>{{fir}}支付密码</adminHeader>
    <div class="main">
      <h6>{{fir}}支付密码：</h6>
      <step :step="step"></step>
      <template v-if="step === 1">
        <div class="tit">请输入手机{{mobile}}收到的验证码</div>
        <div class="code">
          <div class="c-left">请输入验证码：</div>
          <passInput v-model="code" :num="4" style="margin: 0 19px 0 10px"></passInput>
          <codeCount @click.native="getCode"></codeCount>
        </div>
        <div class="nextBtn one" @click="canNext1">下一步</div>
      </template>
      <template v-else-if="step === 2">
        <div class="tit">请设置密码，用于支付验证</div>
        <div class="code">
          <div class="c-left" style="margin-right: 15px;">请输入6位数字密码：</div>
          <passInput v-model="pass" :vari="step" :isPassType="true"></passInput>
        </div>
        <div class="nextBtn one" @click="canNext2">下一步</div>
      </template>
      <template v-else>
        <div class="tit">请再次输入，以确认密码</div>
        <div class="code">
          <div class="c-left" style="margin-right: 15px;">请输入6位数字密码：</div>
          <passInput v-model="afPass" :vari="step" :isPassType="true"></passInput>
        </div>
        <div class="nextBtn one" @click="lastStep">设置完成</div>
      </template>
    </div>
  </div>
</template>

<script>
  import step from '../components/step'
  import passInput from '../components/passInput'
  import codeCount from '@/components/pub/codeCount'
  export default {
    name: "setPassword",
    components: {step, passInput, codeCount},
    data() {
      return {
        step: 1,
        mobile: '',
        code: '',
        pass: '',
        afPass: ''
      }
    },
    computed: {
      fir (){
        return this.$route.params.fir ? '设置' : '修改'
      }
    },
    methods: {
      getCode (){
        this.$http.get('/member/account/paypasswd_code').then(res => {
          if(res.data.code === 200){
            let token = this.$cookies.get('abzID')
            let newToken = res.headers['abz-request-id']
            if(token !== newToken){
              this.$cookies.set('abzID', newToken , '0')
            }
          }
        })
      },
      canNext1 (){
        if(this.code){
          this.step++
        }
      },
      canNext2 (){
        if(this.pass){
          this.step++
        }
      },
      lastStep (){
        if(this.pass === this.afPass){
          let req = {
            code: this.code,
            passwd: this.pass,
            repasswd: this.afPass
          }
          this.$http.post('/member/account/set_paypasswd',req).then(res => {
            if(res.data.code === 200){
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              sessionStorage.setItem('adNavIdx', '/wallet_balance')
              this.$router.push({path: '/wallet_balance'})
              setTimeout(() => {
                window.location.reload()
              },300)
            }
          })
        }else{
          this.$message.error('与上次输入不一致，请重新输入！')
        }
      }
    },
    created (){
      this.$http.get('/member/account/mobile').then(res => {
        if(res.data.code === 200){
          this.mobile = res.data.data
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .app{
    .main{
      width: 958px;
      height: 613px;
      background-color: #ffffff;
      padding: 23px 24px;
      box-sizing: border-box;
      h6{
        letter-spacing: 1px;
        color: #666666;
        margin-bottom: 24px;
      }
      .tit{
        font-size: 18px;
        letter-spacing: 2px;
        color: #666666;
        margin: 92px 0 69px;
        text-align: center;
      }
      .code{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .nextBtn{
        width: 260px;
        height: 50px;
        line-height: 50px;
        background-color: #3388ff;
        border-radius: 10px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        margin-top: 148px;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
        &.one{
          margin-top: 124px;
        }
      }
    }
  }
</style>
