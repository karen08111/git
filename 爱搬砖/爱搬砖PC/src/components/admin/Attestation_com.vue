<template>
  <div class="container Attestation_com">
    <header>
      <main>
        <router-link class="logo" to="/"><img src="../../assets/att_logo.png" alt=""></router-link>
        <div class="ver"></div>
        <p>企业认证</p>
      </main>
    </header>
    <div class="main">
      <el-form :model="form" label-width="140px">
        <el-form-item>
          <el-radio v-model="form.auth" :label="1">企业员工</el-radio>
          <el-radio v-model="form.auth" :label="2">企业法人</el-radio>
        </el-form-item>
        <el-form-item label="公司职位：" v-show="form.auth == 1">
          <el-input v-model="form.job_name" placeholder="请输入您在公司的职位"></el-input>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="form.company_name" placeholder="请输入您的企业名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input v-model="form.credit_code" placeholder="请输入公司的统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="营业执照：" class="item-bus">
          <images baseURL="/member/auth/upload" :list.sync="img_path"></images>
          <div class="hint">1.请提供有效年检内的《企业法人营业执照》副本
            2.请确保营业执照公司名称与公司全称一致
            3.请保证所有信息清晰完整
            4.不接受电子版执照
            5.支持JPG、PNG格式，大小在2M以内
          </div>
        </el-form-item>
        <el-form-item label="企业授权书：" class="item-accredit" v-show="form.auth == 1">
          <images baseURL="/member/auth/upload" :list.sync="auth_certify"></images>
          <div class="hint">1.请下载<a href="./static/accredit.docx" download="企业授权书.docx">企业授权书</a>，并按规定格式填写
            2.请保证所有信息清晰完整
            3.请确保营业执照公司名称与公司全称一致
            4.支持JPG、PNG格式，大小在2M以内
          </div>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" @click="submit">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Attestation_com',
  data () {
    return {
      form: {
        auth: Number(sessionStorage.getItem('comauth')) || 1,
        job_name: sessionStorage.getItem('job_name') || '',
        company_name: sessionStorage.getItem('company_name') || '',
        credit_code: sessionStorage.getItem('credit_code') || '',
        img_path: sessionStorage.getItem('img_path') || '',
        auth_certify: sessionStorage.getItem('auth_certify') || ''
      },
      img_path: [],
      auth_certify: []
    }
  },
  computed: {
    ...mapState(['accounForm']),
    assignForm () {
      if (this.$route.params.role == 2) {
        return Object.assign(this.form, this.accounForm)
      } else {
        return this.form
      }
    },
    auth () {
      if (this.form.auth == 2) {
        this.form.job_name = ''
        this.form.auth_certify = ''
      }
    },
    url () {
      if (this.$route.params.role == 2) { return '/member/auth/company' } else { return '/member/auth/up_company' }
    }
  },
  watch: {
    img_path (val) {
      if (val.length != 0) { this.form.img_path = val[0].path } else { this.form.img_path = '' }
    },
    auth_certify (val) {
      if (val.length != 0) { this.form.auth_certify = val[0].path } else { this.form.auth_certify = '' }
    },
    form: {
      handler (val) {
        for (let i in val) {
          sessionStorage.setItem(i, val[i])
        }
      },
      deep: true
    }
  },
  methods: {
    submit () {
      this.$http.post(this.url, this.assignForm).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          if (this.$route.params.role == 2) { this.$cookies.set('authState', 1, '0') }
          this.$store.commit('getCoo')
          this.$store.commit('removeAuth')
          this.$router.push({ path: '/worker' })
        }
      })
    }
  },
  created () {
    if (this.form.img_path) {
      this.img_path = [{ path: this.form.img_path }]
    }
    if (this.form.auth_certify) {
      this.auth_certify = [{ path: this.form.auth_certify }]
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: #f3f7fa;
    padding-bottom: 40px;
    header{
      width: 100%;
      height: 70px;
      background-color: #3388ff;
      box-shadow: 0px 2px 10px 0px rgba(123, 178, 255, 0.2);
      margin-bottom: 20px;
      main{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        .ver{
          width: 2px;
          height: 15px;
          background-color: #ffffff;
          border-radius: 1px;
          margin: 0 10px 0 20px;
        }
        p{
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .main{
      width: 1200px;
      min-height: 792px;
      background: #ffffff url("../../assets/rolebg.png") no-repeat 650px 178px;
      /*background-color: #fff;
      background-repeat: no-repeat;
      background-position: 650px 178px;*/
      margin: 0 auto;
      padding: 40px;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
  }
</style>

<style lang="less">
  .Attestation_com{
    .el-input{
      width: 380px;
    }
    .el-icon-plus{
      display: none;
    }
    .el-form-item__label{
      white-space: pre-wrap;
    }
    .item-bus{
      .el-upload--picture-card{
        background: url("../../assets/rolebg3.png") no-repeat center;
      }
    }
    .item-accredit{
      .el-upload--picture-card{
        background: url("../../assets/rolebg4.png") no-repeat center;
      }
    }
    .hint{
      font-size: 12px;
      line-height: 1.4;
      letter-spacing: 1px;
      color: #cccccc;
      margin-top: 10px;
      white-space: pre-wrap;
      a{
        color: #3388ff;
      }
    }
    .el-button{
      width: 267px;
      height: 59px;
      line-height: 70px;
      padding: 0;
      font-family: AdobeHeitiStd-Regular,"Microsoft Himalaya";
      font-size: 18px;
      letter-spacing: 2px;
      color: #ffffff;
      margin-left: 56px;
    }
    .images{
      .el-upload-list__item,.el-upload--picture-card{
        width: 380px;
        height: 190px;
        border-radius: 5px;
      }
      .el-upload--picture-card{
        line-height: 190px;
      }
      .el-icon-plus{
        font-size: 28px !important;
      }
      img{
        object-fit: cover;
      }
    }
  }
</style>
