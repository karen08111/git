<template>
  <div class="login"
       style="padding:0;box-sizing: border-box;">
    <div style="background-color: #2cacd3;">
      <div class="carouselStyle">
        <el-carousel :interval="3000"
                     height="472px"
                     arrow="always">
          <el-carousel-item>
            <img :src="banner1Src"
                 height="472px" />
          </el-carousel-item>
          <el-carousel-item>
            <img :src="banner2Src"
                 height="472px" />
          </el-carousel-item>
          <el-carousel-item>
            <img :src="banner3Src"
                 height="472px" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="loginRight">
        <h3>企业登录</h3>
        <div class="loginFormStylew">
          <p>
            <label>账号</label>
            <span class="border-style"></span> <input class="inputStylew"
                   v-model="form.username"
                   placeholder="请输入账号" />
          </p>
          <p style="padding-top:20px;position:relative">
            <label>密码</label><span class="border-style"></span>
            <input class="inputStylew"
                   type="password"
                   v-model="form.passwd"
                   placeholder="请输入密码" />
            <i class="el-icon-view pw-view-style"
               @click="seePW"></i>
          </p>
        </div>
        <div class="loginBtnStyle">
          <el-button type="primary"
                     @click="handleLogin">登 录</el-button>
        </div>
        <div class="apply">
          <router-link class="btn"
                       to="/register">
            <span>注册</span>
          </router-link>
          <span class="border-style-2"></span>
          <router-link class="btn leftBorder"
                       to="">
            <span @click="changePwDialogVisible=true">忘记密码</span>
          </router-link>
        </div>
      </div>
    </div>
    <el-dialog title="忘记密码"
               :visible.sync="changePwDialogVisible"
               class='changepw-dialog-style'
               :center='false'
               width="1035px">
      <div class="step-style">
        <div class="step-item-style"><b>1</b><span>填写企业</span></div>
        <div class="step-item-div-style"></div>
        <div :class="nowStep==1?'step-item-style  div-opacity':'step-item-style'"><b>2</b><span>身份认证</span></div>
        <div :class="nowStep==1?'step-item-div-style  div-opacity':'step-item-div-style'"></div>
        <div :class="nowStep==3?'step-item-style':'step-item-style div-opacity'"><b>3</b><span>提交申请</span></div>
      </div>
      <el-form :model="corpInfo"
               :rules="rules"
               ref="cahngePwForm"
               label-width="237px">
        <div class="corp-info-style"
             v-if="nowStep==1">
          <div v-if="!!errorMsg"
               class="error-tip-style error-tip-style"><i class="el-icon-warning"></i>
            <p>{{errorMsg}}</p>
          </div>
          <el-form-item label="企业名称:"
                        prop="corpName">
            <el-input v-model="corpInfo.corpName"
                      placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用码:"
                        prop="corpCode">
            <el-input v-model="corpInfo.corpCode"
                      placeholder="请输入统一社会信用码"></el-input>
          </el-form-item>
          <el-form-item class="corp-info-btn-style">
            <el-button type="primary"
                       :loading='btnLoading'
                       :disabled="!(corpInfo.corpName && corpInfo.corpCode)"
                       @click="nextStep">下一步</el-button>
          </el-form-item>
        </div>
        <div class="corp-info-style"
             v-if="nowStep==2">
          <div v-if="!!errorMsg"
               class="error-tip-style error-tip-style"><i class="el-icon-warning"></i>
            <p>{{errorMsg}}</p>
          </div>
          <el-form-item label="手机号:"
                        prop="linkMobile">
            <el-input v-model="corpInfo.linkMobile"
                      placeholder="请输入企业预留手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码:"
                        class="verification-code-style"
                        prop="code">
            <el-input style="width: 224px;"
                      v-model="corpInfo.code"
                      placeholder="请输入验证码"></el-input>
            <span class="input-countzero-style">{{countZero>0?countZero+'s':''}}</span>
            <el-button type="primary"
                       @click="getCode"
                       :loading="getCodeBtnLoading"
                       :disabled="(!corpInfo.linkMobile || countZero>0)">获取验证码</el-button>
          </el-form-item>
          <el-form-item class="corp-info-btn-style">
            <el-button type="primary"
                       :loading='btnLoading'
                       :disabled="!(corpInfo.linkMobile && corpInfo.code)"
                       @click="nextStep">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="corp-info-style"
           v-if="nowStep==3">
        <div class="icon-style">
          <i class="el-icon-success"></i>
        </div>
        <div class="text-tip-style">您的“忘记密码”申请已提交，我们将在1-2个工作日内，将您的账号、密码信息发放至您的手机上，请注意查收。<p>详情咨询：16657159171</p>
        </div>
        <div class="back-btn-style">
          <el-button type="primary"
                     @click="changePwDialogVisible=false">返回</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        passwd: ''
      },
      timer: {},
      errorMsg: '',
      countZero: 0,
      rules: {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'change' }
        ],
        corpCode: [
          { required: true, message: '请输入企业社会统一信用码', trigger: 'change' }
        ],
        linkMobile: [
          { required: true, message: '请输入手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      },
      changePwDialogVisible: false,
      btnLoading: false,
      nowStep: 1,
      corpInfo: {
        'corpName': '枣庄硕安门窗有限公司', // 企业名称
        'corpCode': '91370405MA3N857Y32', // 社会统一信用代码
        linkMobile: '',
        code: ''
      },
      getCodeBtnLoading: false,
      sendCodeDisabled: true,
      banner1Src: 'http://resource.aibanzhuan.cn/rotation/20190625/lADPDgQ9qyRrJ4fNAdjNAtg.jpg',
      banner2Src: 'http://resource.aibanzhuan.cn/rotation/20190625/lADPDgQ9qyRu3ebNAdjNAtg.jpg',
      banner3Src: 'http://resource.aibanzhuan.cn/rotation/20190625/lADPDgQ9qyRvkTTNAdjNAtg.jpg'
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('/login', this.form).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data
          if (data.corpName === '') {
            data.corpName = this.form.username
          }
          this.$store.commit('setUserInfo', data)
          this.$store.commit('setToken', data.token)
          this.$router.push({ name: 'company' })
        }
      })
    },
    seePW () {
      let dom = document.getElementsByClassName('inputStylew')
      for (let i in dom) {
        if (document.getElementsByClassName('loginFormStylew')[0].getElementsByClassName('pw-view-noopacity-style').length > 0) {
          document.getElementsByClassName('loginFormStylew')[0].getElementsByClassName('pw-view-noopacity-style')[0].classList.remove('pw-view-noopacity-style')
          document.getElementsByClassName('loginFormStylew')[0].getElementsByClassName('el-icon-view')[0].classList.add('pw-view-style')
          dom[1].type = 'password'
          break
        }
        if (dom[i].type === 'password') {
          dom[i].type = 'text'
          document.getElementsByClassName('el-icon-view')[0].classList.remove('pw-view-style')
          document.getElementsByClassName('loginFormStylew')[0].getElementsByClassName('el-icon-view')[0].classList.add('pw-view-noopacity-style')
          break
        }
      }
    },
    nextStep () {
      if (this.nowStep === 1) {
        this.$refs['cahngePwForm'].validateField((['corpName', 'corpCode']))
        if (this.corpInfo.corpName && this.corpInfo.corpCode) {
          this.corpInfo.type = 1
          this.btnLoading = true
          this.$http.post('/forgetPass', this.corpInfo).then(res => {
            if (res.data.code === 200) {
              this.nowStep = this.nowStep + 1
            } else {
              this.errorMsg = res.data.msg
            }
            this.btnLoading = false
          })
        }
      } else if (this.nowStep === 2) {
        // 提交找回密码请求
        this.btnLoading = true
        this.$refs['cahngePwForm'].validateField((['linkMobile', 'code']))
        if (this.corpInfo.corpName && this.corpInfo.corpCode && this.corpInfo.linkMobile && this.corpInfo.code) {
          this.corpInfo.type = 2
          this.$http.post('/forgetPass', this.corpInfo).then(res => {
            if (res.data.code === 200) {
              this.nowStep = this.nowStep + 1
            } else {
              this.errorMsg = res.data.msg
            }
            this.btnLoading = false
          })
        }
      } else {
        this.nowStep = this.nowStep + 1
      }
    },
    getCode () {
      if (this.corpInfo.corpName && this.corpInfo.corpCode && this.corpInfo.linkMobile) {
        this.getCodeBtnLoading = true
        this.$http.post('/sendCaptcha', this.corpInfo).then(res => {
          if (res.data.code === 200) {
            this.countZero = 60
            const that = this
            this.timer = setInterval(() => {
              that.countZero = that.countZero - 1
              if (that.countZero === 0) {
                window.clearInterval(this.timer)
              }
            }, 1000)
          } else {
            this.errorMsg = res.data.msg
          }
          this.getCodeBtnLoading = false
        })
      } else {
        this.$refs['cahngePwForm'].validateField((['corpName', 'corpCode', 'linkMobile']))
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  width: 1200px;
  height: 472px;
  border-radius: 24px;
  background-color: #fff;
  clear: both;
  margin: 0 auto;
  // border: 1px solid #F5F5F5;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0px 6px 17px 1px rgba(0, 0, 0, 0.04);
  .form {
  }
  .border-style {
    height: 18px;
    border-right: solid 2px rgba(255, 255, 255, 0.16);
  }
  .linkColor {
    color: #008af1;
  }
  .step-style {
    width: 800px;
    margin-left: 145px;
    margin-bottom: 165px;
    clear: both;
    .step-item-style {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #25a69a;
      color: #fff;
      font-size: 18px;
      text-align: center;
      float: left;
      b {
        text-align: center;
        display: inline-block;
        line-height: 38px;
        width: 38px;
        height: 38px;
      }
      span {
        color: #000;
        display: inline-block;
        font-size: 17px;
        width: 71px;
        margin-left: -15px;
        margin-top: 10px;
      }
    }
    .div-opacity {
      opacity: 0.3;
    }
    .step-item-div-style {
      width: 278px;
      height: 4px;
      margin: 0 9px;
      margin-top: 17px;
      background-image: linear-gradient(90deg, #25a69a 0%, #f5f4f4 100%),
        linear-gradient(#25a69a, #25a69a);
      background-blend-mode: normal, normal;
      float: left;
    }
  }
  .error-tip-style {
    position: absolute;
    overflow: hidden;
    left: 470px;
    top: 235px;
  }
  .carouselStyle {
    width: 723px;
    height: 472px;
    overflow: hidden;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    float: left;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 440px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  .loginRight {
    background-color: #fff;
    width: 475px;
    height: 472px;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    float: left;
    .pw-view-style {
      font-size: 22px;
      opacity: 0.3;
      position: absolute;
      right: 5px;
      cursor: pointer;
      top: 36px;
      color: #dddddd;
    }
    .pw-view-noopacity-style {
      font-size: 22px;
      position: absolute;
      right: 5px;
      cursor: pointer;
      top: 36px;
      color: #ddd;
    }
    h3 {
      font-family: PingFang-SC-Bold;
      font-size: 34px;
      letter-spacing: 0px;
      color: #25a69a;
      margin: 0 auto;
      margin-top: 60px;
      margin-bottom: 60px;
      text-align: center;
    }
    .labelStyle {
      font-size: 24px;
      color: #ffffff;
    }
    .loginBtnStyle {
      border-radius: 25px;
      background-color: #ffffff;
      color: #25a69a;
      width: 367px;
      height: 50px;
      button {
        width: 367px !important;
        height: 50px;
      }
      span {
        font-size: 20px;
        display: inline-block;
        height: 23px;
        border: 1px solid #25a69a;
      }
    }
  }
  .corp-info-style {
    width: 564px;
    height: 239px;
    margin: 0 auto;
    .el-form-item__label {
      padding-right: 54px;
    }
    .icon-style {
      display: inline-block;
      float: left;
      margin-top: 8px;
    }
    .input-countzero-style {
      position: absolute;
      top: 14px;
      right: 110px;
    }
    .el-icon-success {
      font-size: 124px;
      color: #25a69a;
    }
    .text-tip-style {
      font-size: 20px;
      color: #505151;
      opacity: 0.6;
      width: 360px;
      line-height: 36px;
      display: inline-block;
      margin-left: 68px;
      p {
        font-size: 20px;
        color: #505151;
        margin-top: 18px;
      }
    }
  }
  .apply {
    margin: 0 20px;
    margin-top: 30px;
    margin-left: 45px;
    text-align: center;
    span {
      color: #25a69a;
      font-size: 18px;
    }
    .border-style-2 {
      border-left: 2px solid #25a69a;
      display: inline-block;
      height: 15px;
    }
    .btn {
      padding: 0 13px;
      // span {
      //   border-right: 1px solid rgba(255, 255, 255, 0.6);
      // }
    }
    .loginForm {
      label {
        font-size: 24px;
        color: #ffffff;
      }
    }
  }
}
</style>

<style lang='less'>
.login {
  .labelStyle {
    .el-form-item__label {
      font-size: 24px;
      color: #ffffff;
    }
  }
  .loginBtnStyle {
    margin: 0 auto;
    margin-top: 54px;
    span {
      font-size: 20px;
    }
    button {
      width: 367px;
      height: 50px;
      background-color: #ffffff;
      border-radius: 25px;
      color: #25a69a;
    }
  }
  .changepw-dialog-style {
    .el-dialog {
      height: 635px;
      .el-dialog__header {
        padding-top: 40px;
        padding-right: 30px;
        padding-bottom: 10px;
        padding-left: 62px;
        .el-dialog__headerbtn {
          top: 38px;
          right: 30px;
        }
        i {
          &::before {
            font-size: 30px;
            margin-top: 40px;
            content: "\e78d";
          }
        }
      }
    }
    .el-dialog__title {
      font-size: 24px;
    }
  }
  .is-disabled {
    opacity: 0.5;
  }
  .corp-info-style {
    width: 564px;
    height: 239px;
    margin: 0 auto;
    .el-form-item__label {
      padding-right: 54px;
    }
    .text-tip-style {
      .el-button--primary {
        width: 83px;
        height: 40px;
        margin-left: 20px;
        padding-left: 7px;
        padding-right: 7px;
        background-color: #25a69a;
        opacity: 1;
      }
    }
  }
  .corp-info-btn-style {
    .el-button--primary {
      width: 159px;
      height: 50px;
      margin-top: 53px;
      background-color: #25a69a;
      span {
        font-size: 23px;
      }
    }
  }
  .verification-code-style {
    .el-button--primary {
      width: 83px;
      height: 40px;
      margin-left: 20px;
      padding-left: 7px;
      padding-right: 7px;
      background-color: #25a69a;
    }
  }
}
.back-btn-style {
  text-align: center;
  .el-button--primary {
    width: 159px;
    height: 50px;
    margin-top: 70px;
    background-color: #25a69a;
    margin-bottom: 138px;
    span {
      font-size: 23px;
    }
  }
}
.loginFormStylew {
  margin-left: 54px;
  margin-right: 54px;
  width: 369px;
  p {
    border-bottom: solid 2px rgba(37, 166, 154, 0.16);
  }
  label {
    color: #25a69a;
    font-size: 24px;
    padding-right: 15px;
    border-right: solid 2px rgba(37, 166, 154, 0.16);
  }
  input {
    width: 264px;
    height: 51px;
    padding-left: 20px;
  }
}
.inputStylew {
  border: 0;
  color: #25a69a;
  background: #fff !important;
  &:-internal-autofill-selected {
    background-color: #fff !important;
  }
  &:focus {
    border: 0;
    outline: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  }
  &:-webkit-autofill {
    color: #fff !important;
    -webkit-text-fill-color: #25a69a;
    background-color: #fff !important;
    box-shadow: 0 0 0 200px #fff inset;
  }
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &::-moz-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &::-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
