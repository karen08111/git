<template>
  <div class="register">
    <h1>注 册</h1>
    <i class="el-icon-error" @click="$store.commit('changeRegister')"></i>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm">
      <el-form-item label="" prop="telNum" style="margin-bottom: 30px; padding-left: 160px;">
        <el-input v-model.number="ruleForm2.telNum" style="width: 320px;" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="imageCode" style="margin-bottom: 30px; padding-left: 160px; position:relative;">
        <el-input v-model="ruleForm2.imageCode" style="width: 320px;" placeholder="图像验证"></el-input>
        <div class="check_img" @click="changeUrl"><img :src="url"></div>
      </el-form-item>
      <el-form-item label="" prop="messageCode" style="margin-bottom: 30px; padding-left: 160px; position:relative;">
        <el-input v-model="ruleForm2.messageCode" style="width: 320px;" placeholder="短信验证码"></el-input>
        <span v-show="sendAuthCode" class="auth_text" @click="getAuthCode">获取验证码</span>
        <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒后重新发送</span>
      </el-form-item>
      <div class="agree">
        <el-checkbox v-model="agree"></el-checkbox>
        注册即表示同意
        <router-link to="">《用户协议》</router-link>
      </div>
      <el-form-item style="padding-left: 160px; margin-bottom: 12px">
        <el-button type="primary" @click="submitForm('ruleForm2')" style="width: 320px;">立即注册</el-button>
      </el-form-item>
    </el-form>
    <div class="other">已有账号？<span @click="$store.commit('login')">立即登录</span></div>
    <!--<div class="third">
        <img src="../../assets/wxdl.png" class="wx">
        <img src="../../assets/qqdl.png" class="qq">
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      setTimeout(() => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('手机号码格式错误'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      sendAuthCode: true,
      auth_time: 0,
      agree: true,
      ruleForm2: {
        telNum: '',
        imageCode: '',
        messageCode: ''
      },
      rules2: {
        telNum: [
          { validator: checkTel, trigger: 'blur' }
        ]
      },
      url: this.imgUrl,
      allow: false
    }
  },
  props: ['imgUrl'],
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('mobile', this.ruleForm2.telNum)
          formData.append('code', this.ruleForm2.messageCode)

          if (this.allow) {
            this.$http.post(this.$store.state.site + '/member/register/mobile', formData, {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then((res) => {
              if (res.data.code == 200) {
                this.$cookies.set('abztoken', res.data.data.token, '0')
                this.$cookies.set('usertel', res.data.data.name, '0')
                this.$store.commit('changeRegister')
                this.$store.commit('getCoo')
                location.reload()
              } else {
                this.$message.error(res.data.msg)
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$message.error('请输入正确的验证码')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getAuthCode: function () {
      // 17696743323
      let formData = new FormData()
      formData.append('mobile', this.ruleForm2.telNum)
      formData.append('code', this.ruleForm2.imageCode)
      this.$http.post(this.$store.state.site + '/member/captcha/regmob', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.code == 200) {
          this.allow = true
          this.sendAuthCode = false
          this.auth_time = 59
          var auth_timetimer = setInterval(() => {
            this.auth_time--
            if (this.auth_time <= 0) {
              this.sendAuthCode = true
              clearInterval(auth_timetimer)
            }
          }, 1000)
        } else {
          this.$message.error(res.data.msg)
          this.changeUrl()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeUrl () {
      this.$http.get(this.$store.state.site + '/member/captcha/regimg').then(res => {
        this.url = res.data
        this.$cookies.set('abzID', res.headers['abz-request-id'], '0')
      })
    }
  },
  created () {
    this.changeUrl()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .register {
    width: 640px;
    height: 660px;
    background-color: #ffffff;
    box-shadow: -2px -3px 29px 1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 9999;
    h1 {
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #323333;
      text-align: center;
      line-height: 160px;
    }
    .check_img {
      width: 128px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 160px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .auth_text {
      color: #3388ff;
      position: absolute;
      right: 182px;
      &:first-of-type {
        cursor: pointer;
      }
      &:last-of-type {
        color: #999999;
      }
    }
    .el-icon-error {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 16px;
      cursor: pointer;
    }
    .other {
      text-align: center;
      color: #333333;
      span {
        cursor: pointer;
        color: #3388ff;
      }
    }
    .agree {
      text-align: center;
      margin-bottom: 28px;
      color: #333333 !important;
      a {
        color: #3388ff;
      }
    }
    .third {
      width: 160px;
      margin: 46px auto 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      img {
        cursor: pointer;
      }
    }
  }
</style>
