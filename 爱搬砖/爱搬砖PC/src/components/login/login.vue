<template>
  <div class="login">
    <div class="main">
      <div class="logo"><router-link to="/"><img src="../../assets/login_logo.png" alt=""></router-link></div>
      <h1 :style="{marginBottom: step == 1 ? '57px' : '20px'}">{{title}}</h1>
      <div class="explain" v-show="step == 2">创建或登录已有账号，与你现在登录的{{modeTxt}}绑定
        绑定后，可以使用{{modeTxt}}账号登录</div>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="0" class="loginForm">
        <el-form-item prop="mobile" ref="mobileIpt">
          <el-input v-model="form.mobile" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model.trim="form.code" placeholder="短信验证码"></el-input>
          <span id="tn" class="gain" :class="{disable: isCount}" @click="send">{{txt | bracket}}</span>
        </el-form-item>
        <el-button v-if="step === 1" type="primary" class="loginBtn" @click="haddleLogin">{{title}}</el-button>
        <el-button v-if="step === 2 && mode === 'wx'" type="primary" class="loginBtn" @click="wxLogin">{{title}}</el-button>
        <el-button v-if="step === 2 && mode === 'qq'" type="primary" class="loginBtn" @click="qqLogin">{{title}}</el-button>
      </el-form>
      <div class="protocol">登录即表示同意 <router-link to="/protocol" target="_blank">用户协议及隐私政策</router-link></div>
      <div v-show="step == 1" class="threeTxt"></div>
      <div class="jump">
        <img v-show="step == 1" src="../../assets/wxdl.png" alt="" class="three" @click="wxJump">
        <img v-show="step == 1" src="../../assets/qqdl.png" alt="" class="three" @click="qqJump">
      </div>
      <div v-show="step == 2" class="back" @click="step = 1"></div>
    </div>
    <verify :mobile="form.mobile" :method="mode" :state="state" v-if="puzzleShow" @success="success" @close="puzzleShow = false"></verify>
  </div>
</template>

<script>
import verify from './components/verify'
export default {
  name: 'login',
  components: { verify },
  data () {
    const checMob = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }

      if (!this.reg.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
    }
    return {
      reg: /^1(30|31|32|33|34|35|36|37|38|39|45|46|47|48|49|50|51|52|53|55|56|57|58|59|65|66|67|70|71|72|73|74|75|76|77|78|80|81|82|83|84|85|86|87|88|89|98|99)\d{8}$/,
      step: 1,
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [{ validator: checMob, trigger: 'blur' }],
        code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
      },
      txt: '获取验证码',
      isCount: false,
      puzzleShow: false,
      timer: null
    }
  },
  computed: {
    title () {
      const res = this.$route.params.res
      if (this.step == 1 && res !== 'res') return '登 录'
      else if (this.step == 1 && res === 'res') return '注 册'
      else return '绑 定 账 号'
    },
    text () {
      if (this.$route.params.res) return '注册'
      else return '登录'
    },
    third_url () {
      return process.env.THIRD_URL
    },
    state () {
      return this.$route.query.state || null
    },
    mode () {
      return this.$route.params.mode
    },
    modeTxt () {
      return this.mode === 'wx' && '微信' || 'QQ'
    }
  },
  filters: {
    bracket (val) {
      if (typeof val === 'number') { return `( ${val}s )` } else { return val }
    }
  },
  methods: {
    send () {
      if (this.form.mobile) {
        if (!this.isCount) {
          if (this.reg.test(this.form.mobile)) {
            this.puzzleShow = true
            sessionStorage.setItem('login_tel', this.form.mobile)
          }
        }
      } else {
        this.$message.error('请填写手机号')
      }
    },
    pass () {
      this.puzzleShow = false
      this.count_down()
    },
    count_down () {
      this.txt = 59
      this.isCount = true
      this.timer = setInterval(() => {
        if (this.txt <= 0) {
          this.txt = '重新获取验证码'
          this.isCount = false
          clearInterval(this.timer)
        } else {
          this.txt--
        }
      }, 1000)
    },
    success () {
      this.puzzleShow = false
      this.count_down()
    },
    haddleLogin () {
      this.$http.post('/member/login/mobile', this.form).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.$cookies.set('abztoken', data.token, '0')
          this.$cookies.set('username', data.nick, '0')
          this.$cookies.set('authState', data.auth_status, '0')

          this.$store.commit('setAvatar', this.$store.state.site + data.avatar)
          this.$store.commit('getCoo')
          this.$store.commit('setVip', +data.viper)

          if (data.auth_status === 0) {
            this.$router.push({ path: '/Account_identity_new' })
            setTimeout(_ => window.location.reload(), 200)
          } else {
            this.$router.go(-1)
            setTimeout(_ => window.location.reload(), 200)
          }
        }
      })
    },
    wxJump () {
      let para
      if (process.env.NODE_ENV === 'development') para = `?redirect_uri=http://localhost/%23/Fxnxpon20AVospA9&not_exist=http://localhost/%23/Login/r/wx`
      else if (process.env.NODE_ENV === 'test') para = `?redirect_uri=http://www.qqdoubao.net/%23/Fxnxpon20AVospA9&not_exist=http://www.qqdoubao.net/%23/Login/r/wx`
      else para = `?redirect_uri=http://www.aibanzhuan.cn/%23/Fxnxpon20AVospA9&not_exist=http://www.aibanzhuan.cn/%23/Login/r/wx`

      window.location.href = this.third_url + '/wxapi/auth' + para
    },
    qqJump () {
      let para
      if (process.env.NODE_ENV === 'development') para = `?redirect_uri=http://localhost/%23/Fxnxpon20AVospA9&not_exist=http://localhost/%23/Login/r/qq`
      else if (process.env.NODE_ENV === 'test') para = `?redirect_uri=http://www.qqdoubao.net/%23/Fxnxpon20AVospA9&not_exist=http://www.qqdoubao.net/%23/Login/r/qq`
      else para = `?redirect_uri=http://www.aibanzhuan.cn/%23/Fxnxpon20AVospA9&not_exist=http://www.aibanzhuan.cn/%23/Login/r/qq`

      window.location.href = this.third_url + '/qqapi/auth' + para
    },
    thirdLogin (mode) {
      this.$http.post(`${this.third_url}/${mode}/auth/bind`, { mobile: this.form.mobile, code: this.form.code, state: this.state }, { headers: { 'X-Requested-With': 'XMLHttpRequest' } }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.$cookies.set('abztoken', data.token, '0')
          this.$cookies.set('username', data.nick, '0')
          this.$cookies.set('authState', data.auth_status, '0')

          this.$store.commit('getCoo')
          this.$router.push({ name: 'index' })
          setTimeout(_ => window.location.reload(), 50)
        }
      })
    },
    wxLogin () {
      this.thirdLogin('wxapi')
    },
    qqLogin () {
      this.thirdLogin('qqapi')
    }
  },
  created () {
    document.title = this.title

    if (this.state) this.step = 2
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
  .login{
    width: 100vw;
    height: 100vh;
    background: #c2dcff url("../../assets/logo_bg.png") no-repeat right bottom;
    position: relative;
    .main{
      width: 640px;
      height: 660px;
      background-color: #ffffff;
      box-shadow: 0px 4px 29px 1px
      rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .logo{
        padding: 28px 0 12px;
        text-align: center;
        img{
          width: 110px;
        }
      }
      h1{
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 10px;
        color: #333333;
      }
      .gain{
        letter-spacing: 1px;
        color: #3388ff;
        opacity: 0.6;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 182px;
        &.disable{
          color: #cccccc;
          cursor: default;
        }
      }
    }
    .loginBtn{
      display: block;
      width: 320px;
      height: 50px;
      border-radius: 10px;
      margin: 60px auto 12px;
    }
    .protocol{
      text-align: center;
      margin-bottom: 36px;
      a{
        color: #3388ff;
      }
    }
    .threeTxt{
      height: 12px;
      background: url("../../assets/third-party.png") no-repeat center center;
      margin-bottom: 20px;
    }
    .jump{
      display: flex;
      justify-content: center;
    }
    .three{
      display: block;
      cursor: pointer;
      margin: 10px;
    }
    .explain{
      width: 322px;
      height: 37px;
      line-height: 24px;
      letter-spacing: 1px;
      color: #cccccc;
      margin: 0 auto 26px;
    }
    .back{
      width: 20px;
      height: 35px;
      background: url("../../assets/loginBack.png");
      position: absolute;
      top: 30px;
      left: 30px;
      cursor: pointer;
    }
  }
</style>

<style lang="less">
  .loginForm{
    .el-form-item{
      margin-bottom: 30px;
      position: relative;
    }
    .el-input{
      display: block;
      width: 320px;
      margin: 0 auto;
    }
    .el-form-item__error{
      top: 11px;
      left: 490px;
    }
  }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
    border-color: #cccccc;
  }
</style>
