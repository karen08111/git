<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="120px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <div class="worker-detail-child-title">
            新增合同
          </div>
          <el-row :gutter="24">
            <el-col :span="8"
                    class="selectFullWidth">
              <el-form-item label="甲方（企业）"
                            prop="corpName">
                <el-select v-model="addForm.corpName"
                           placeholder="请选择"
                           @change="corpChange">
                  <el-option v-for="item in corpArr"
                             :key="item.id"
                             :label="item.corpName"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="150px"
                            label="社会统一信用代码：">
                {{addForm.corpCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="乙方（工人）"
                            prop="twID">
                <el-input v-model="addForm.twID"
                          placeholder="点击选择工人"
                          @focus="showSelectWorkerDialog"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属班组："
                            prop="teamName">
                {{addForm.teamName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号："
                            prop="idCardNumber">
                {{addForm.idCardNumber}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8"
                    class="selectFullWidth">
              <el-form-item label="合同类型"
                            prop="type">
                <el-select v-model="addForm.type"
                           placeholder="请选择">
                  <el-option v-for="item in termOfContract"
                             :key="item.id"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工人工资"
                            prop="wages">
                <el-input v-model="addForm.wages"
                          placeholder="请输入工人工资"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div style="line-height:3">
                元/天
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="合同有效期"
                            prop="time">
                <el-date-picker v-model="addForm.time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format='yyyy-MM-dd'
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="上传合同"
                            prop="uploadFiles">
                <!-- <smUpload v-model="addForm.uploadFiles"
                          @geveImg='geveImg'
                          :multiple='true'
                          :imgs="img"></smUpload> -->
                <el-upload class="upload-demo"
                           drag
                           :file-list="addForm.uploadFiles"
                           :action='url'
                           :limit="2"
                           :on-remove="onRemove"
                           :on-exceed='handleExceed'
                           :on-success="handleSuccess"
                           multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="备注">
                <el-input :rows="3"
                          type="textarea"
                          placeholder="请输入备注"
                          v-model="addForm.content"
                          :maxlength="100">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       size="mini"
                       @click="submitAddForm('addForm')">保存</el-button>
            <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
            <el-button size="mini"
                       @click="$router.go(-1)">返 回</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <workerList :dialogVisible='dialogWorkerTableVisible'
                @handleTableCurrentChange="handleCurrentChange"
                @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
  </div>
</template>

<script>
import workerList from '@/components/workerList/workerList'
import detailHeader from '@/components/detailHeader'
// import smUpload from '@/components/formItems/smUpload'
import { enterType, natureOfUnit, bankData, termOfContract } from '../../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, workerList },
  data () {
    return {
      url: process.env.VUE_APP_baseURL + '/uploadContract',
      addBankDialogVisible: false,
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
        uploadFiles: []
      },
      dialogWorkerTableVisible: false,
      img: [],
      corpArr: [],
      list: [],
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
        label: '新增合同'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ],
        wages: [
          { required: true, message: '请输入工人工资', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择合同有效期', trigger: 'change' }
        ],
        corpName: [
          { required: true, message: '请选择参建单位', trigger: 'change' }
        ],
        uploadFiles: [
          { required: true, message: '请上传合同图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/cardInfo/lists').then(res => {
      this.bankArr = res.data.data
    })
    this.$http.get('/member/buildCorp/addContractLists/' + this.proId).then(res => {
      this.corpArr = res.data.data
    })
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  computed: {
    fileList () {
      return this.list.map(val => {
        let url = this.keyName ? val[this.keyName] : val
        return {
          url: /^(https?|\/\/)/i.test(url) ? url : `${process.env.VUE_APP_baseURL}${url}`
        }
      })
    }
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
    onRemove (file, fileList) {
      this.list.splice((this.list.findIndex((val) => {
        return val === file.response.data.path
      })), 1)
      let list = JSON.parse(JSON.stringify(this.list))
      this.addForm.uploadFiles = list.join(',')
      let uploadFilesObj = {}
      this.addForm.uploadFiles.split(',').map((val, index) => {
        uploadFilesObj[index] = val
      })
      this.addForm.uploadFiles = uploadFilesObj
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.list.push(response.data.path)
      } else {
        fileList.pop()
        this.$message.error(response.msg)
      }
      let list = JSON.parse(JSON.stringify(this.list))
      this.addForm.uploadFiles = list.join(',')
      let uploadFilesObj = {}
      this.addForm.uploadFiles.split(',').map((val, index) => {
        uploadFilesObj[index] = val
      })
      this.addForm.uploadFiles = uploadFilesObj
    },
    handleExceed (files, fileList) {
      this.$message({
        message: '最多只能上传两条数据',
        type: 'warning'
      })
    },
    corpChange (val) {
      this.addForm.corpName = this.corpArr.find((value) => {
        return value.id === val
      }).corpName
      this.addForm.corpCode = this.corpArr.find((value) => {
        return value.id === val
      }).corpCode
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      this.selectWorker = val
      this.addForm.twID = val.workerName
      this.addForm.idCardNumber = val.idCardNumber
      // 获取工人的班组信息
      this.$http.get('/member/payroll/tWIDGeneratesTeamClassInfo/' + this.selectWorker.id).then(res => {
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
      console.log(this.addForm)
      if (!(this.addForm.uploadFiles && this.addForm.uploadFiles['0'])) {
        this.$message.error('请上传合同')
        return
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.prjID = this.proId
          // this.addForm.twID = this.selectWorker.id
          this.addForm.twID = this.selectWorker.id
          this.addForm.workerName = this.selectWorker.workerName
          this.addForm.startTime = this.addForm.time[0]
          this.addForm.endTime = this.addForm.time[1]
          this.$http.post('/member/contract/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.$router.push('/enterProject/contract')
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
  padding: 0px 0px 24px;
  box-sizing: border-box;
  :global {
    .el-tag {
      margin-right: 12px;
      margin-bottom: 12px;
    }
    .el-date-editor {
      width: 100% !important;
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
