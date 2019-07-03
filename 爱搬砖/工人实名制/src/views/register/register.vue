<template>
  <div>
    <Header></Header>
    <div class="register">
      <h1>承包企业账号申请</h1>
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="180px"
               label-position="left"
               class="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称："
                          prop="corpName">
              <el-input v-model="form.corpName"
                        placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码："
                          label-width="250px"
                          prop="corpCode">
              <el-input v-model="form.corpCode"
                        placeholder="请输入统一社会信用代码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码证："
                          prop="">
              <smUpload :imgs="form.businessLicenseImages"
                        @geveImg='geveImgCorpCode'></smUpload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照有效截止日期："
                          label-width="250px"
                          prop="businessLicenseEndDate">
              <timeSelect v-model="form.businessLicenseEndDate"></timeSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span='12'
                  class="selectFullWidth">
            <el-form-item label="企业类型"
                          style="width:64.6%">
              <el-select v-model="form.companyType"
                         placeholder="请选择企业类型">
                <el-option v-for="item in natureOfUnit"
                           :key="item.id"
                           :label="item.title"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册日期："
                          label-width="240px">
              <timeSelect v-model="form.registerDate"
                          placeholder="请输入注册日期"></timeSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span='24'
                  class="fullwidth">
            <el-form-item label="注册地址："
                          prop="areaCode">
              <div style="display: flex; flex: 1 1 auto;">
                <citySelect v-model="form.areaCode"></citySelect>
                <el-input v-model="form.detailedAreaCode"
                          placeholder="详细地址"
                          style="margin-left: 20px; width: 49% !important"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span='12'
                  class="selectFullWidth">
            <el-form-item label="营业地址：">
              <el-input v-model="form.address"
                        placeholder="请输入营业地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本(万)："
                          label-width="240px">
              <el-input v-model="form.regCapital"
                        placeholder="请输入注册资本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span='12'>
            <el-form-item label="法定代表人：">
              <div style="display: flex; flex: 1 1 auto;">
                <el-input v-model="form.legalMan"
                          placeholder="请输入法定代表人姓名"
                          style="margin-right: 10px; width: 150px !important"></el-input>
                <el-input v-model="form.legalManMobile"
                          placeholder="请输入法定代表人联系方式"
                          style="width: 300px !important;"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人："
                          prop="linkman"
                          label-width="240px">
              <div style="display: flex; flex: 1 1 auto;">
                <el-input v-model="form.linkman"
                          placeholder="请输入联系人姓名"
                          style="margin-right: 10px; width: 150px !important"></el-input>
                <el-input v-model="form.linkMobile"
                          placeholder="请输入联系方式"
                          style="width: 300px !important;"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系人邮箱：">
          <el-input v-model="form.email"
                    placeholder="请输入联系人邮箱"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总承包资质证书："
                          prop="v">
              <smUpload :imgs="img"
                        @geveImg='geveImgContractorCorpCertification'></smUpload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总承包资质证书有效期截止时间："
                          label-width="250px">
              <timeSelect v-model="form.validEndDate"></timeSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">立即申请</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- -->
      <el-dialog title="账号申请成功"
                 :visible.sync="centerDialogVisible"
                 width="40%"
                 center>
        <p style="line-height: 1.5; font-size: 16px;">尊敬的企业用户，我们已收到您的账号申请，申请将于一个工作日内审核完毕，账号密码将于申请通过后以短信的形式发送到您所预留的联系人手机号中，请您留意查看，感谢您的支持与信赖！</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { natureOfUnit } from '../data'
export default {
  name: 'register',
  components: {
    'citySelect': _ => import('@/components/formItems/citySelect'),
    'smUpload': _ => import('@/components/formItems/smUpload'),
    'timeSelect': _ => import('@/components/formItems/timeSelect')
  },
  data () {
    return {
      form: {
        companyType: '130'
      },
      rules: {
        corpName: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        corpCode: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        businessLicenseImages: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        companyType: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        regCapital: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        registerDate: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        legalMan: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        linkman: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        businessLicenseEndDate: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      },
      centerDialogVisible: false,
      natureOfUnit: natureOfUnit,
      img: []
    }
  },
  mounted () {
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        console.log(domArr[index].getElementsByClassName('el-form-item__label'))
        domArr[index].getElementsByClassName('el-form-item__label')[0] && domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let req = Object.assign({}, this.form)
          Object.entries(req).forEach(value => {
            if (Array.isArray(value[1])) {
              req[value[0]] = value[1].map(val => val.path).join('')
            }
          })
          console.log(this.form)
          this.$http.post('/register', this.form).then(res => {
            if (res.data.code === 200) {
              this.centerDialogVisible = true
            } else {
              this.$message.error('提交失败：' + res.data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    geveImgContractorCorpCertification (val) {
      this.form.contractorCorpCertification = val[0]
    },
    geveImgCorpCode (val) {
      this.form.businessLicenseImages = val[0]
    },
    handleConfirm () {
      this.centerDialogVisible = false
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped lang="less">
h1 {
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  // font-weight: bold;
  padding: 30px;
}
.form {
  width: 1200px;
  padding-bottom: 40px;
  margin: 0 auto;
}
.el-input {
  width: 350px !important;
}
</style>

<style lang="less">
.register {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #fff;
  margin-top: 20px;
  .el-form-item__content {
    width: 350px;
  }
  .fullwidth {
    .el-form-item__content {
      width: 100%;
    }
  }
  .el-form-item__content > .el-input {
    width: 200px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.tip {
  margin-top: 10px;
  color: #aaa;
}
</style>
