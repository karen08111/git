<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="140px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="工人姓名"
                            prop="twID">
                {{addForm.workerName}}
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right">
              <el-form-item label="身份证号">
                {{addForm.idCardNumber}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="所属参建单位">
                {{addForm.corpName}}
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right">
              <el-form-item label="班组">
                {{addForm.teamName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <aptitude v-model="aptitude"></aptitude>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="证书等级"
                            prop="credentialLevelType">
                <el-select v-model="addForm.credentialLevelType"
                           placeholder="请选择">
                  <el-option v-for="item in professionalArr"
                             :key="item.id"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right">
              <el-form-item label="证书名称"
                            prop="certificationName">
                <!-- <el-input v-model="addForm.certificationName"
                          placeholder="请输入证书名称"></el-input> -->
                {{addForm.certificationName}}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
            <el-form-item
              label="证书种类"
              prop="workingHours"
            >
              <el-input v-model="addForm.workingHours"></el-input>
            </el-form-item>
          </el-col> -->
          </el-row>
          <!-- <el-row :gutter="24">
          <el-col :span="12" class="el-col-md-12-left selectFullWidth">
            <el-form-item
              label="证书等级"
              prop="credentialLevelType"
            >
              <el-select v-model="addForm.credentialLevelType" placeholder="请选择">
                <el-option
                    v-for="item in professionalArr"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="证书编号"
                            prop="certificationCode">
                <el-input v-model="addForm.certificationCode"
                          placeholder="请输入证书编号"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right">
              <el-form-item label="发证机关"
                            prop="grantOrg">
                <el-input v-model="addForm.grantOrg"
                          placeholder="请输入发证机关"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
            <el-form-item
              label="证书状态"
              prop="wagesPayable"
            >
              <el-select
              v-model="addForm.certificationStatus"
              placeholder="请选择"
            >
              <el-option
                v-for="item in termOfContract"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
            </el-form-item>
          </el-col> -->
          </el-row>
          <!-- <el-row :gutter="24">
          <el-col :span="12" class="el-col-md-12-left">
            <el-form-item
              label="发证机关"
              prop="grantOrg"
            >
              <el-input v-model="addForm.grantOrg"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="证书有效时间"
                            prop="time">
                <el-date-picker v-model="addForm.time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format='yyyy-MM-dd'
                                value-format="yyyy-MM-dd"
                                @blur="datePicker"
                                v-if="reRender">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="资质图片"
                            label-width="140px"
                            prop="certificationImage">
                <smUpload v-model="addForm.certificationImage"
                          @geveImg='geveImg'
                          :imgs="img"></smUpload>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       @click="submitAddForm('addForm')"
                       size="mini">保存</el-button>
            <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
            <el-button @click="$router.go(-1)"
                       size="mini">返 回</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <workerList :dialogVisible='dialogWorkerTableVisible'
                @handleTableCurrentChange="handleCurrentChange"
                @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
    <el-dialog title="添加代发工资银行"
               :visible.sync="addBankDialogVisible"
               width="500px"
               center>
      <el-form :model="addBankForm"
               status-icon
               :rules="rulesOfBank"
               ref="ruleForm"
               label-width="125px">
        <el-form-item label="代发银行"
                      prop="bankCode">
          <el-select v-model="addBankForm.payBankCode"
                     placeholder="请选择"
                     @change='bankNameChange'>
            <el-option v-for="item in Object.keys(bankData)"
                       :key="item"
                       :label="bankData[item]"
                       :value="bankData[item]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户行"
                      prop="payBankName">
          <el-input v-model="addBankForm.payBankName"
                    placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item label="卡号"
                      prop="bankCardNum">
          <el-input v-model="addBankForm.payBankCardNumber"
                    placeholder="请输入卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="submitBankForm('ruleForm')">提交</el-button>
          <el-button size="mini"
                     @click="$router.go(-1)">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import workerList from '@/components/workerList/workerList'
import detailHeader from '@/components/detailHeader'
import smUpload from '@/components/formItems/smUpload'
import aptitude from '@/components/form/aptitude'
import { enterType, natureOfUnit, bankData, termOfContract } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, workerList, smUpload, aptitude },
  data () {
    return {
      addBankDialogVisible: false,
      bankData: bankData,
      termOfContract: termOfContract,
      reRender: true,
      binkInfo: [],
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
        certificationImage: ''
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
        label: '修改工人资质'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        certificationName: [
          { required: true, message: '请输入证书名称', trigger: 'change' }
        ],
        credentialLevelType: [
          { required: true, message: '请选择证书等级', trigger: 'change' }
        ],
        certificationCode: [
          { required: true, message: '请输入证书编号', trigger: 'change' }
        ],
        grantOrg: [
          { required: true, message: '请输入发证机关', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择证书有效时间', trigger: 'change' }
        ],
        certificationImage: [
          { required: true, message: '请上传资质图片', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    aptitude: {
      handler (val) {
        this.professionalArr = this.professional[val.certificationCategoriesType]
        // console.log(this.professionalArr)
      },
      deep: true
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/cardInfo/lists').then(res => {
      this.bankArr = res.data.data
    })
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
    this.$http.get('/member/workerCredential/details/' + this.$route.params.id).then(res => {
      this.addForm = JSON.parse(JSON.stringify(res.data.data))
      this.addForm.time = []
      this.addForm.time.push(this.addForm.validBeginDate)
      this.addForm.time.push(this.addForm.validEndDate)
      if (this.addForm.certificationImage) {
        this.img.push(this.addForm.certificationImage)
      }
      this.aptitude = {
        certificationCategoriesType: this.addForm.certificationCategoriesType,
        certificationType: this.addForm.certificationType,
        certificationProfessional: this.addForm.certificationProfessional
      }
      delete this.addForm.validEndDate
      delete this.addForm.validBeginDate
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
    datePicker () {
      this.reRender = false
      this.$nextTick((val) => {
        this.reRender = true
      })
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      console.log(val)
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
      this.addForm.certificationImage = val[0]
    },
    // 提交添加的银行
    submitBankForm () {
      let centerVal = this.addBankForm.payRollBankName
      this.addBankForm.payRollBankName = this.addBankForm.payBankCode
      this.addBankForm.payBankCode = centerVal
      this.addBankDialogVisible = false
      this.addForm.binkInfo.push(this.addBankForm)
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
      Object.assign(this.addForm, this.aptitude)
      if (this.addForm.time) {
        this.addForm.validBeginDate = this.addForm.time[0]
        this.addForm.validEndDate = this.addForm.time[1]
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.prjID = this.proId
          this.$http.post('/member/workerCredential/update/' + this.$route.params.id, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存修改成功',
                type: 'success'
              })
              this.$router.push('/enterProject/workQualification')
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
