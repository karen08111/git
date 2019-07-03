<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle detail-page-style">
      <el-form ref="addForm"
               :model="addForm"
               label-width="200px"
               label-position="left">
        <div class="worker-detail-style divMargin">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="工人姓名">
                {{addForm.workerName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号"
                            prop="idCardNumber">
                {{addForm.idCardNumber}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="所属参建单位"
                            prop="twID">
                {{addForm.corpName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班组"
                            prop="teamName">
                {{addForm.teamName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="证书名称"
                            prop="workingHours">
                {{addForm.certificationName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证书种类"
                            prop="workingHours">
                {{addForm.certificationCategoriesType && addForm.certificationCategoriesType.title}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="证书类型"
                            prop="wagesPayable">
                {{addForm.certificationType && addForm.certificationType.title}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书等级"
                            prop="wagesPayable">
                {{addForm.credentialLevelType}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="证书编号"
                            prop="wagesPayable">
                {{addForm.certificationCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="发证机关"
                            prop="wagesPayable">
                {{addForm.grantOrg}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="证书有效时间"
                            prop="wagesPayable">
                {{addForm.validBeginDate}}至{{addForm.validEndDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="14">
              <el-form-item label="资质图片">
                <img :src="addForm.certificationImage && baseUrl+addForm.certificationImage"
                     style="width: 250px;height: 250px;margin-top:20px"
                     alt="">
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-button style="margin-top:125px"
                         type="primary"
                         icon="el-icon-search"
                         @click="preview">预览</el-button>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       @click="toEdit()"
                       size="mini">编辑</el-button>
            <el-button size="mini"
                       @click="back()">返回</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <workerList :dialogVisible='dialogWorkerTableVisible'
                @handleTableCurrentChange="handleCurrentChange"
                @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
    <el-dialog title="资质图片预览"
               :visible.sync="previewDialogVisible"
               width="550px">
      <div style="margin:0 auto">
        <img :src="addForm.certificationImage && baseUrl+addForm.certificationImage"
             style="width: 500px;height: 500px"
             alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import workerList from '@/components/workerList/workerList'
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, bankData, termOfContract } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, workerList },
  data () {
    return {
      baseUrl: process.env.VUE_APP_baseURL,
      addBankDialogVisible: false,
      bankData: bankData,
      termOfContract: termOfContract,
      binkInfo: [],
      previewDialogVisible: false,
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
      aptitude: {},
      addForm: {
      },
      professional: {
        '1': [
          { id: '01', title: '初级职称' },
          { id: '02', title: '中级职称' },
          { id: '03', title: '高级职称' }
        ],
        '33': [
          { id: '01', title: '普通' },
          { id: '02', title: '初级工' },
          { id: '03', title: '中级工' },
          { id: '04', title: '高级工' },
          { id: '05', title: '技师' },
          { id: '06', title: '高级技师' }
        ]
      },
      dialogWorkerTableVisible: false,
      img: [],
      professionalArr: [],
      corpArr: [],
      bankArr: [],
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/workQualification',
        label: '工人资质'
      }, {
        label: '工人资质详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      }
    }
  },
  watch: {
    aptitude: {
      handler (val) {
        this.professionalArr = this.professional[val.certificationCategoriesType]
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/cardInfo/lists').then(res => {
      this.bankArr = res.data.data
    })
    const that = this
    this.$http.get('/member/workerCredential/details/' + this.$route.params.id).then(res => {
      that.addForm = res.data.data
      console.log(that.addForm.certificationCategoriesType)
      console.log(that.professional[that.addForm.certificationCategoriesType.id.toString()])
      that.addForm.credentialLevelType = that.professional[Number(that.addForm.certificationCategoriesType.id)].find((value) => {
        return value.id === that.addForm.credentialLevelType
      })
      that.addForm.credentialLevelType = that.addForm.credentialLevelType && that.addForm.credentialLevelType.title
    })
  },
  methods: {
    // 打开选择工人列表的dialog
    showSelectWorkerDialog () {
      // this.$getData.workList(this.proId).then(res => {
      //   if (res !== null) {
      //     this.workerList = res
      //   }
      // })
      this.dialogWorkerTableVisible = true
    },
    preview () {
      this.previewDialogVisible = true
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      this.selectWorker = val
      this.addForm.twID = val.workerName
      this.addForm.idCardNumber = val.idCardNumber
      // 获取工人的班组信息
      this.$http.get('/member/payroll/tWIDGeneratesTeamClassInfo/' + this.selectWorker.workersID).then(res => {
        this.addForm.teamName = res.data.data.teamInfo.teamName
        this.addForm.teamID = res.data.data.teamInfo.teamID
        this.addForm.bcorpID = res.data.data.teamInfo.bcorpID
        this.dialogWorkerTableVisible = false
      })
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    addFormPayRollBankNameChange (val) {
      this.addForm.payRollBankName = val
    },
    addFormPayRollBankCardNumberChange (val) {
      this.addForm.payRollBankCardNumber = val
    },
    geveImg (val) {
      this.addForm.uploadFiles = val[0]
    },
    // 提交添加的银行
    submitBankForm () {
      let centerVal = this.addBankForm.payRollBankName
      this.addBankForm.payRollBankName = this.addBankForm.payBankCode
      this.addBankForm.payBankCode = centerVal
      this.addBankDialogVisible = false
      this.addForm.binkInfo.push(this.addBankForm)
    },
    toEdit () {
      this.$router.push('/enterProject/workQualification/edit/' + this.$route.params.id)
    },
    back () {
      this.$router.push('/enterProject/workQualification')
    },
    // 添加银行
    addBank () {
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
    submitAddForm () {
      Object.assign(this.aptitude, this.addForm)
      if (this.addForm.time) {
        this.addForm.validBeginDate = this.addForm.time[0]
        this.addForm.validEndDate = this.addForm.time[1]
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.id
          this.addForm.workerName = this.selectWorker.workerName
          this.$http.post('/member/workerCredential/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存修改成功',
                type: 'success'
              })
              this.editDialog = false
              this.refresh()
            } else {
              this.$message.error('保存失败：' + res.data.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
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
  margin: 0 0 24px;
  :global {
    .el-select {
      display: block;
    }
    .el-row {
      border: 1px solid #dddddd;
      border-bottom: 0;
      margin: 0 !important;
    }
  }
}
.tableClass {
  width: 100%;
  margin-bottom: 6px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.formStyle {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  color: #333;
}
.formChildTitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}
.photoStyle {
  width: 70%;
  div {
    float: left;
  }
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
.divMargin {
  margin-top: 20px;
}
.elFormItemStyle {
  margin-bottom: 0;
}
.headerStyle {
  width: 1200px;
  display: flex;
  justify-content: space-between;
}
.infoStyle {
  margin-top: 75px;
  width: 30%;
  margin-left: 22px;
  .el-row {
    border: 0;
  }
}
</style>
