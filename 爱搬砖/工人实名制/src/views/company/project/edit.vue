<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :routeName='"/company/projects"'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="120px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <div class="worker-detail-child-title">
            项目信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="项目名称"
                            prop="name">
                <el-input placeholder="请输入项目名称"
                          v-model="addForm.name"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="项目分类"
                            prop="category">
                <el-select v-model="addForm.category"
                           placeholder="请选择项目分类">
                  <el-option v-for="item in projectClass"
                             :key="item.id"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="项目所在地"
                            prop="areaCode">
                <citySelect v-model="addForm.areaCode"></citySelect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="施工许可证"
                            prop="builderLicenses">
                <el-tag v-for="(tag,index) in addForm.builderLicenses"
                        :key="index"
                        closable
                        @close='onTagClose(index)'
                        class="plusClass"
                        :type="tag.type">
                  {{'工程名称：' + tag.prjName + ', 施工许可证编号：' + tag.builderLicenseNum}}
                </el-tag>
                <el-button class="button-new-tag plusClass"
                           size="small"
                           @click="addBank">+ 点击添加</el-button>
              </el-form-item>
            </el-col>
            <el-col :lg='10'
                    :md="10"
                    class="el-col-md-12-right">
              <el-form-item label="总投资">
                <el-input placeholder="请输入总投资"
                          v-model="addForm.invest"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg='2'
                    :md="2">
              <p style="line-height:38px">万元</p>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="项目联系人"
                            prop="linkMan">
                <el-input placeholder="请输入项目联系人"
                          v-model="addForm.linkMan"
                          :maxlength="10">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-right">
              <el-form-item label="联系方式"
                            prop="linkPhone">
                <el-input placeholder="请输入项目联系人联系方式"
                          v-model="addForm.linkPhone"
                          :maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="项目简介">
                <el-input type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          :maxlength="100"
                          placeholder="请输入项目简介"
                          v-model="addForm.content">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            建设单位信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="建设单位名称">
                <el-input placeholder="请输入建设单位名称"
                          v-model="addForm.buildCorpName"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right">
              <el-form-item label="统一社会信用码"
                            label-width="160px">
                <el-input placeholder="请输入统一社会信用码"
                          v-model="addForm.buildCorpCode"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       :loading="saveLoading"
                       size="mini"
                       @click="submitNewProject('addForm')">保存</el-button>
            <el-button size="mini"
                       @click="$router.go(-1)">返回</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <el-dialog title="添加施工许可证"
               :visible.sync="addBankDialogVisible"
               width="500px"
               center>
      <forms :formData="formDataOfAddBuilderLicenses"
             :labelWidth="'130px'"
             @giveForm='saveBuilderLicensesData'
             v-if="isShow"
             :showReturn='true'
             @returnBtn='addBankDialogVisible=false'>
      </forms>
    </el-dialog>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import citySelect from '@/components/formItems/citySelect'
import forms from '@/components/form/form'
import { enterType, natureOfUnit, bankData, projectStatus, projectClass } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, citySelect, forms },
  data () {
    return {
      addBankDialogVisible: false,
      bankData: bankData,
      bankInfo: [],
      isShow: true,
      projectClass: projectClass,
      rulesOfBank: {
        bankCode: [
          { required: true, message: '请选择银行', trigger: 'blur' }
        ],
        payBankName: [
          { required: true, message: '请输入开户行名称', trigger: 'blur' }
        ],
        bankCardNum: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      },
      addForm: {
        bankInfo: []
      },
      formDataOfAddBuilderLicenses: [{
        label: '工程名称',
        type: 'input',
        returns: 'builderLicensesPrjName',
        rules: {
          name: 'builderLicensesPrjName',
          message: '工程名称不能为空'
        }
      }, {
        label: '施工许可证编号',
        type: 'input',
        returns: 'builderLicenseNum',
        rules: {
          name: 'builderLicenseNum',
          message: '施工许可证编号不能为空'
        }
      }],
      builderLicensesData: [],
      projectStatus: projectStatus.slice(0, 3),
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/company/projects',
        label: '项目管理'
      }, {
        label: '编辑项目'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      builderLicensesForm: {},
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择项目分类', trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请选择项目所在地', trigger: 'blur' }
        ],
        prjStatus: [
          { required: true, message: '请选择项目状态', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择开工时间', trigger: 'blur' }
        ],
        builderLicenses: [
          { required: true, message: '请添加施工许可证', trigger: 'change' }
        ],
        linkMan: [
          { required: true, message: '请输入项目联系人', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, message: '请输入项目联系人联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    const that = this
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.$http.get('/member/project/details/' + that.$route.params.id).then(res => {
        that.addForm = res.data.data
        that.builderLicensesData = res.data.data.builderLicenses
      })
    })
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0] && domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    saveBuilderLicensesData (val) {
      this.builderLicensesData.push({
        prjName: val.builderLicensesPrjName,
        builderLicenseNum: val.builderLicenseNum
      })
      this.isShow = false
      this.addBankDialogVisible = false
    },
    onTagClose (i) {
      this.builderLicensesData.splice(i, 1)
    },
    // 添加银行
    addBank () {
      this.isShow = true
      this.addBankDialogVisible = true
    },
    // 银行信息修改
    bankNameChange () {
      for (let val in this.bankData) {
        if (bankData[val] === this.addBankForm.payBankCode) {
          this.addBankForm.payRollBankName = val
          break
        }
      }
    },
    // 提交
    submitNewProject (val) {
      // 提交新建项目信息
      this.addForm.builderLicenses = this.builderLicensesData
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.builderLicensesData.length === 0) {
            this.$message({
              message: '添加施工许可证以后才可以提交',
              type: 'warning'
            })
            return false
          }
          this.$http.post('/member/project/update/' + this.$route.params.id, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '项目信息修改成功',
                type: 'success'
              })
              this.$router.push('/company/projects')
            } else {
              this.$notify.error({
                title: '请求失败',
                message: res.data.msg
              })
            }
          })
        }
      })
    },
    // 重置
    resetTable () {
      this.form = {}
      this.refreshList({})
    }
  }
}
</script>

<style scoped lang="less">
.contractors {
  padding: 0px 0px 24px;
  box-sizing: border-box;
  :global {
    .el-tag {
      margin-right: 12px;
      margin-bottom: 12px;
    }
    .el-col-md-12-left {
      padding-right: 110px !important;
    }
    .el-col-md-12-right {
      padding-left: 90px !important;
    }
    .btnStyle {
      button {
        width: 80px;
        height: 32px;
        padding-top: 9px !important;
        margin: 0 36px;
      }
    }
  }
}
.selectFullWidth {
  .el-select {
    width: 100%;
  }
}
.divMargin {
  margin-top: 20px;
}
.formStyle {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}
.formChildTitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}
.worker-detail-style {
  background-color: #ffffff;
  padding: 20px;
  .el-form-item__label {
    background-color: #ececec;
  }
  .worker-detail-child-title {
    font-size: 18px;
    padding-left: 10px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 20px;
    font-family: "PingFang-SC-Bold";
    border-left: 4px solid #008af1;
  }
}
.el-tag {
  font-size: 14px;
}
.add {
  text-align: right;
}
.showDetail {
  .label {
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 10px;
  }
}
</style>
