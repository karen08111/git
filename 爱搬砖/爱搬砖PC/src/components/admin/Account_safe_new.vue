<template>
  <div>
    <div class="contents" v-show="phoneStore==0 && !isEmail">
      <p class="title">为了更好的保护您的交易安全，建议您通过以下方式提高安全级别</p>
      <ul class="safeUl">
        <li>
          <span class="safeSet right blue" @click="changPhone">{{phone?'修改':'马上绑定'}}</span>
          <span class="left">手机绑定</span>
          <div class="safeInfo">
            <p>{{phone?'已经绑定手机':'未绑定'}}</p>
            <p>{{phone?'直接使用'+phone+'登录，并接收重要信息提醒':'绑定手机，并接收重要信息提醒'}}</p>
          </div>
        </li>
        <li>
          <span class="safeSet right blue" v-if="emailStore==0" @click="bindEmail">立即绑定</span>
          <span class="safeSet right blue" v-else-if="emailStore==1">未激活</span>
          <span class="safeSet right blue" v-else-if="emailStore==2" @click="bindEmail">重新绑定</span>
          <span class="left">邮箱绑定</span>
          <div class="safeInfo">
            <p v-if="emailStoreValue">已绑定邮箱号{{emailStoreValue}}</p>
            <p></p>
          </div>
        </li>
        <li>
          <!--<span class="safeSet right blue" @click="upgrade" v-if="identType==10">升级</span>-->
          <span class="safeSet right blue" @click="upgrade">{{btnText}}</span>
          <!--<span class="safeSet right blue" v-if="!identType">
            <router-link to="/Account_identity_new">认证</router-link>
          </span>-->
          <span class="left">身份认证</span>
          <div class="safeInfo">
            <p>{{writer}}</p>
            <p>认证后可享受更多会员权利</p>
          </div>
        </li>
        <!--<li class="border">
          <span class="safeSet right blue">修改</span>
          <span class="left">邮箱绑定</span>
          <div class="safeInfo">
            <p>已绑定手机号</p>
            <p>直接使用“手机号码”登录，并接收重要信息提醒</p>
          </div>
        </li>-->
      </ul>
    </div>
    <!--邮箱绑定-->
    <div class="contents">
      <ul class="table" v-if="isEmail">
        <li>
          <span>邮箱号:</span>
          <input type="email" v-model="email"/>
        </li>
        <li>
          <div class="submit" @click="getEmailCode">绑定</div>
        </li>
      </ul>
    </div>

    <!--解绑-->
    <div class="contents">
      <ul class="table" v-show="phoneStore==2">
        <li>
          <span>当前手机号是:</span>
          <p>{{phone}}</p>
        </li>
        <li>
          <span>解绑短信验证码:</span>
          <input type="text" class="code-input" v-model="oldcode"/>
          <span class="getCode" @click="timer<60?'':getCode()">{{timer<60?timer:'获取验证码'}}</span>
        </li>
        <li>
          <div class="submit" @click="setPhoneSubMit">验证</div>
        </li>
      </ul>
    </div>
    <!--新手机号-->
    <div class="contents">
      <ul class="table" v-show="phoneStore==3">
        <li>
          <span>新手机手机号:</span>
          <input type="text" v-model="bindPhone"/>
        </li>
        <li>
          <span>解绑短信验证码:</span>
          <input type="text" class="code-input" v-model="newcode"/>
          <span class="getCode" @click="newtimer<60?'':getNewCode()">{{newtimer<60?newtimer:'获取验证码'}}</span>
        </li>
        <li>
          <div class="submit" @click="setNewPhone">验证</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: null, // 邮箱
      emailTile: 60, //
      emailStore: null, // 邮箱状态
      emailStoreValue: null, // 邮箱
      emailCode: null, // 邮箱验证码
      isEmail: false, // 邮箱修改视图
      bindPhone: null, // 绑定新手机号
      newcode: null, // 新手机号验证码
      identStore: null, // 身份认证状态0.未认证、1.待审核、2.审核中、3.拒绝、4.通过
      identType: null, // 身份类型10.个人、11.企业
      userObj: {},
      phone: null,
      phoneStore: 0, // 0是初始状态 1是绑定状态  2 是修改状态
      timer: 60,
      newtimer: 60,
      newPhone: '', // 新手机号
      oldcode: '', // 验证码,
      store: null// 账户状态
    }
  },
  computed: {
    btnText () {
      if (this.identStore == 1) return '审核中'
      else if (this.identStore == 3) return '重新认证'
      else if (this.identType == 10 && this.identStore == 4) return '升级'
      else if (this.identType == 11 && this.identStore == 4) return ''
      else if (this.identType == 1) return '认证'
    },
    writer () {
      /* if(this.identType == 10 && this.authState == 1) return '个人认证审核中'
        else if(this.identType == 10 && this.authState == 2) return '个人认证成功'
        else if(this.identType == 10 && this.authState == 3) return '个人认证失败'
        else if(this.identType == 11 && this.authState == 1) return '企业认证审核中'
        else if(this.identType == 11 && this.authState == 2) return '企业认证成功'
        else if(this.identType == 11 && this.authState == 3) return '企业认证失败' */

      if (this.identType == 10) {
        if (this.identStore == 0) {
          return '个人未认证'
        } else if (this.identStore == 1) {
          return '个人认证待审核'
        } else if (this.identStore == 2) {
          return '个人认证审核中'
        } else if (this.identStore == 3) {
          return '个人认证待未通过'
        } else if (this.identStore == 4) {
          return '个人认证成功'
        }
      } else if (this.identType == 11) {
        if (this.identStore == 0) {
          return '企业未认证'
        } else if (this.identStore == 1) {
          return '企业认证待审核'
        } else if (this.identStore == 2) {
          return '企业认证审核中'
        } else if (this.identStore == 3) {
          return '企业认证待未通过'
        } else if (this.identStore == 4) {
          return '企业认证成功'
        }
      } else {
        return '当前未认证'
      }
    }
  },
  created () {
    // 获取状态
    this.$http.get('/member/account').then(res => {
      //				console.log(res.data.data)
      if (res.data.code == 200) {
        this.store = res.data.data
        this.identType = res.data.data.auth_id
        this.identStore = res.data.data.auth_status
        if (res.data.data.auth_status != 1) { this.$cookies.set('authState', res.data.data.auth_status, '0') }
        this.$store.commit('getCoo')
        this.phone = res.data.data.mobile
        this.emailStore = res.data.data.mail_status
        this.emailStoreValue = res.data.data.email

        // 储存认证状态
        this.$cookies.set('identType', res.data.data.auth_id)
      }
    })
  },
  filters: {
    shield (val) {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      if (reg) { return val.replace(reg, '$1****$2') } else { return val }
    }
  },
  methods: {
    bindEmail () {
      this.isEmail = true
    },
    getEmailCode () {
      var that = this
      if (this.email) {
        var data = { mail: that.email }
        that.$http.post('/member/account/bind_mail', data).then(res => {
          if (res.data.code == 200) {
            that.$message({
              message: '验证邮件发送成功，请登录邮箱完成激活!',
              type: 'success'
            })
            setTimeout(function () {
              that.$router.go(0)
            }, 1500)
          }
        })
      }
    },
    saveEmail () {

    },
    changPhone () {
      if (this.phone) {
        this.phoneStore = 2// 解绑手机号    3 绑定状态
      }
      /* if(this.phone) {
          console.log('修改')
          this.phoneStore = 2;
        }else {
          console.log('绑定')
        } */
      //				this.$router.push({name: 'Mobile_binding', params: {mobile: this.phone}})
    },
    getCode () {
      var that = this
      if (this.phone) {
        //
        this.$http.get('/member/account/unbind_mobile').then(res => {
          //						console.log(res.data)
          if (res.data.code == 200) {
            var inter = setInterval(function () {
              if (that.timer <= 0) {
                that.timer = 60
                clearInterval(inter)
              } else {
                that.timer--
              }
            }, 1000)
          }
        })
      }
    },
    getNewCode () {
      var that = this
      if (that.isPhone(that.bindPhone)) {
        var data = { mobile: that.bindPhone }
        that.$http.post('/member/account/send_code', data).then(res => {
          that.des = false
          if (res.data.code == 200) {
            var inter = setInterval(function () {
              if (that.newtimer <= 0) {
                that.newtimer = 60
                clearInterval(inter)
              } else {
                that.newtimer--
              }
            }, 1000)
          }
        })
      }
    },
    // 新手机号提交
    setNewPhone () {
      var that = this
      if (that.newcode) {
        var data = {
          mobile: that.bindPhone,
          code: that.newcode
        }
        that.$http.post('/member/account/bind_mobile', data).then(res => {
          //						console.log(res)
          if (res.data.code == 200) {
            that.$message(res.data.msg)
            setTimeout(function () {
              that.$router.go(0)
            }, 1500)
          }
        })
      }
    },
    // 解绑原手机号
    setPhoneSubMit () {
      var that = this
      //				console.log(this.oldcode)
      if (this.oldcode) {
        var data = { code: this.oldcode }
        this.$http.post('/member/account/unbind_mobile', data).then(res => {
          //						console.log(res)
          if (res.data.code == 200) {
            that.phoneStore = 3
          }
        })
      } else {

      }
    },
    // 手机号正则
    isPhone (phone) {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(phone)) {
        return false
      } else {
        return true
      }
    },
    upgrade () {
      if (this.btnText == '升级') {
        this.$router.push('Attestation_com/3')
      } else if (this.btnText == '重新认证' | this.btnText == '认证') {
        this.$router.push('Account_identity_new')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .contents {
    background: #fff;
    padding: 25px;
    box-sizing: border-box;
  }

  .title {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 1px;
    color: #cccccc;
  }

  .border {
    border: none !important;
  }

  .safeUl {
    width: 85%;
    margin: auto;

    li {
      display: block;
      width: 100%;
      height: 78px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      margin-bottom: 40px;
      color: #666666;

      .safeInfo {
        margin: 0 100px 0 100px;
        padding-top: 13px;
        padding-left: 20px;
        box-sizing: border-box;

        p {
          line-height: 25px;
        }
      }

      span {
        display: block;
        width: 100px;
        line-height: 78px;
      }

      .blue {
        color: #3366cc;
        letter-spacing: 7px;
        cursor: pointer;
      }
    }
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .table {
    width: 100%;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #666666;

    li {
      display: block;
      height: 40px;
      margin-bottom: 40px;

      p {
        line-height: 40px;
      }

      span {
        float: left;
        display: block;
        width: 130px;
        height: 100%;
        line-height: 40px;
      }

      input {
        float: left;
        width: 250px;
        height: 100%;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #cccccc;
        padding-left: 10px;
        box-sizing: border-box;
      }

      .code-input {
        width: 185px;
      }

      .getCode {
        color: #3388ff;
        padding-left: 20px;
        box-sizing: border-box;
        cursor: pointer;
      }

      .submit {
        width: 200px;
        height: 40px;
        background-color: #3388ff;
        border-radius: 4px;
        font-family: AdobeHeitiStd-Regular;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        margin-left: 130px;
        cursor: pointer;
      }
    }
  }

  .safeSet a {
    color: #3366cc;
  }
</style>
