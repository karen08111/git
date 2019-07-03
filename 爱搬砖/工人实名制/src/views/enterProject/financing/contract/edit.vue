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
            编辑合同
          </div>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="甲方（企业）">
                {{addForm.corpName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用码">
                {{addForm.corpCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="乙方（工人）"
                            prop="twID">
                {{addForm.workerName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班组"
                            prop="teamName">
                {{addForm.teamName}}
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
                                value-format="yyyy-MM-dd"
                                @blur="datePicker"
                                v-if="reRender">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="上传合同"
                            label-width="140px"
                            prop="uploadFiles">
                <!-- <smUpload v-model="addForm.uploadFiles"
                          @geveImg='geveImg'
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
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
// import smUpload from '@/components/formItems/smUpload'
import { enterType, natureOfUnit, bankData, termOfContract } from '../../../data/index'
// import { log } from 'util'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
      url: process.env.VUE_APP_baseURL + '/uploadContract',
      addBankDialogVisible: false,
      bankData: bankData,
      termOfContract: termOfContract,
      binkInfo: [],
      reRender: true,
      list: [],
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
      selectWorker: {},
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
        label: '编辑合同'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ],
        wages: [
          { required: true, message: '请输入工人工资', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择合同有效期', trigger: 'change' }
        ],
        uploadFiles: [
          { required: true, message: '请上传合同图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/member/contract/details/' + this.$route.params.id).then(res => {
      if (res.data.code === 200) {
        this.addForm = res.data.data
        this.addForm.type = Number(this.addForm.type)
        this.addForm.time = []
        let uploadFiles = res.data.data.uploadFiles
        if (this.addForm.startTime !== 0) {
          this.addForm.time.push(this.addForm.startTime)
          this.addForm.time.push(this.addForm.endTime)
        }
        if (uploadFiles.length) {
          this.addForm.uploadFiles = uploadFiles.map(v => {
            return {
              url: v,
              name: v && v.replace(/^\/uploads\/contract\/20190614\//, '')
            }
          })
          this.list = this.addForm.uploadFiles.map(val => val.url)
        }
      }
    })
    // 获取参建单位列表
    this.$http.get('/cardInfo/lists').then(res => {
      this.bankArr = res.data.data
    })
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    // 打开选择工人列表的dialog
    showSelectWorkerDialog () {
      this.dialogWorkerTableVisible = true
    },
    datePicker () {
      this.reRender = false
      this.$nextTick((val) => {
        this.reRender = true
      })
    },
    handleExceed (files, fileList) {
      this.$message({
        message: '最多只能上传两条数据',
        type: 'warning'
      })
    },
    onRemove (file, fileList) {
      if (file.response) {
        this.list.splice((this.list.findIndex((val) => {
          return val === file.response.data.path
        })), 1)
        this.addForm.uploadFiles = this.list.join(',')
        let uploadFilesObj = {}
        this.addForm.uploadFiles.split(',').map((val, index) => {
          uploadFilesObj[index] = val
        })
        this.addForm.uploadFiles = uploadFilesObj
      } else {
        this.list.splice((this.list.findIndex((val) => {
          return val === file.url
        })), 1)
        this.addForm.uploadFiles = this.list.join(',')
        let uploadFilesObj = {}
        this.addForm.uploadFiles.split(',').map((val, index) => {
          uploadFilesObj[index] = val
        })
        this.addForm.uploadFiles = uploadFilesObj
      }
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        // if (typeof (this.addForm.uploadFiles) !== 'string') {
        //   let uploadFiles = []
        //   this.addForm.uploadFiles.map((val) => {
        //     uploadFiles.push(val.url)
        //     this.list.push(val.url)
        //   })
        // }
        this.list.push(response.data.path)
      } else {
        fileList.pop()
        this.$message.error(response.msg)
      }
      this.addForm.uploadFiles = this.list.join(',')
      let uploadFilesObj = {}
      this.addForm.uploadFiles.split(',').map((val, index) => {
        uploadFilesObj[index] = val
      })
      this.addForm.uploadFiles = uploadFilesObj
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
    submitAddForm (val) {
      if (!(this.addForm.uploadFiles && this.addForm.uploadFiles['0'])) {
        this.$message.error('请上传合同')
        return
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.prjID = this.proId
          if (this.selectWorker.id) {
            this.addForm.twID = this.selectWorker.id
            this.addForm.workerName = this.selectWorker.workerName
          }
          this.$http.post('/member/contract/update/' + this.$route.params.id, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存修改成功',
                type: 'success'
              })
              this.$router.go(-1)
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
