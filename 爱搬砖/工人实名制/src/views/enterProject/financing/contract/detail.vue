<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'>
    </detailHeader>
    <div class="formStyle detail-page-style">
      <el-form ref="addForm"
               :model="addForm"
               label-width="200px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style divMargin">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="甲方（企业）">
                {{addForm.corpName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div style="line-height:54px">统一社会信用码：{{addForm.corpCode}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="乙方（工人）"
                            prop="twID">
                工人姓名：{{addForm.workerName}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div style="line-height:54px">所属班组：{{addForm.teamName}}</div>
            </el-col>
            <el-col :span="6">
              <div style="line-height:54px">身份证号：{{addForm.idCardNumber}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="工人工资"
                            prop="workingHours">
                <div style="line-height:54px"> {{addForm.wages}}元/天 </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="18">
              <el-form-item label="合同类型"
                            prop="wagesPayable">
                {{termOfContract.find(val => val.id === parseInt(addForm.type)) && termOfContract.find(val => val.id === parseInt(addForm.type)).title}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="合同有效期"
                            prop="wagesPayable">
                {{addForm.startTime + ' 至 '+ addForm.endTime}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="备注"
                            class="useGetHeightRef">
                {{addForm.content}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="20">
              <el-form-item label="合同"
                            class="useGetHeightRef2">
                <!-- <img v-if="addForm.uploadFiles"
                     :src="baseUrl+addForm.uploadFiles"
                     style="margin-top:20px;width: 250px;height: 250px"
                     alt=""> -->
                <!--<el-upload class="upload-demo"
                           drag
                           :action='url'
                           :file-list="addForm.uploadFiles"
                           :disabled='true'
                           multiple>
                  <i class="el-icon-upload"></i>
                </el-upload>-->
                <a class="download" v-for="(item, idx) in addForm.uploadFiles" :key="idx" :href="item.url" :download="item.name">{{item.name}}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       size="mini"
                       @click="toEdit()">编辑</el-button>
            <el-button size="mini"
                       @click="back()">返回</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, bankData, termOfContract } from '../../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
      url: process.env.VUE_APP_baseURL + '/uploadContract',
      addBankDialogVisible: false,
      baseUrl: process.env.VUE_APP_baseURL,
      bankData: bankData,
      termOfContract: termOfContract,
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
      addForm: {
      },
      dialogWorkerTableVisible: false,
      img: [],
      corpArr: [],
      bankArr: [],
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/contract',
        label: '合同管理'
      }, {
        label: '合同详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入参建单位名称', trigger: 'blur' }
        ],
        corpCode: [
          { required: true, message: '请输入统一社会信用码', trigger: 'blur' }
        ],
        enterType: [
          { required: true, message: '请选择参建类型', trigger: 'blur' }
        ],
        pmName: [
          { required: true, message: '请输入项目经理名称', trigger: 'blur' }
        ],
        pmPhone: [
          { required: true, message: '请输入项目经理联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  updated () {
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef2')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef2')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef2')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef2')[0].clientHeight + 'px'
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/member/contract/details/' + this.$route.params.id).then(res => {
      // console.log(res.data.data)
      if (res.data.code === 200) {
        this.addForm = res.data.data
        let uploadFiles = res.data.data.uploadFiles
        if (uploadFiles.length) {
          this.addForm.uploadFiles = uploadFiles.map(v => {
            return {
              url: process.env.VUE_APP_baseURL + v,
              name: v && v.replace(/^\/uploads\/contract\/20190614\//, '')
            }
          })
          this.list = this.addForm.uploadFiles.map(val => val.url)
        }
      }
    })
    this.$http.get('/cardInfo/lists').then(res => {
      this.bankArr = res.data.data
    })
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
  },
  methods: {
    // 打开选择工人列表的dialog
    showSelectWorkerDialog () {
      // this.$getData.workList(this.proId).then(res => {
      //   console.log(res)
      //   if (res !== null) {
      //     this.workerList = res
      //   }
      // })
      this.dialogWorkerTableVisible = true
    },
    // 编辑
    toEdit () {
      this.$router.push('/enterProject/contracts/edit/' + this.$route.params.id)
    },
    // 返回
    back () {
      this.$router.push('/enterProject/contract')
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
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (Number(this.addForm.isBackPay) === 0) {
            this.addForm.backPayMonth = ''
          }
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.workersID
          this.addForm.workerName = this.selectWorker.workerName
          this.$http.post('/member/payroll/update/' + this.detailId, this.addForm).then(res => {
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
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .upload-demo {
      padding-bottom: 20px;
      padding-top: 20px;
    }
  }
  h4 {
    margin: 12px 0;
    padding: 8px 10px;
    font-weight: 600;
  }
  td {
    padding: 5px 0;
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
  .download {
    display: block;
    margin-top: 5px;
  }
</style>

<style lang='less'>
.useGetHeightRef2{
  .el-upload-dragger{
    display:none;
  }
}
</style>
