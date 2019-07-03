<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :showMenu='true'>
    </detailHeader>
    <div class="paybankClass">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>代发银行设置</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="add">
        <el-button type="success"
                   size="mini"
                   @click="add">添加银行卡</el-button>
        <el-button type="danger"
                   size="mini"
                   :disabled="!selectRows.length>0"
                   @click="dels">删除</el-button>
      </div>
      <easyTable :easyTableObj='tableData'
                 :isLoading='isLoading'
                 @tablePaginationChange='tablePaginationChange'
                 @tableSelectRowChange='tableSelectRowChange'>
        <el-table-column slot="operation"
                         property="name"
                         width='100px'
                         label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.$index, scope.row)"
                       type="text"
                       size="small">编辑</el-button>
            <el-button @click="seeDetail(scope.$index, scope.row)"
                       type="text"
                       size="small">详情</el-button>
          </template>
        </el-table-column>
      </easyTable>
      <!-- 新增工资单 -->
      <el-dialog :title="dialogTitle"
                 :visible.sync="addDialogVisible"
                 width="40%">
        <el-form ref="addForm"
                 :model="addForm"
                 label-width="140px">
          <el-form-item label="工资代发银行"
                        prop="bankCode">
            <el-select v-model="addForm.payBankCode"
                       placeholder="请选择银行"
                       @change='bankNameChange'>
              <el-option v-for="item in Object.keys(bankData)"
                         :key="item"
                         :label="bankData[item]"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号"
                        prop="bankCode">
            <el-input v-model="addForm.payBankCardNumber"
                      placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="工资代发开户行名称"
                        prop="bankCode">
            <el-input v-model="addForm.payBankName"
                      placeholder="请输入工资代发开户行名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitAddForm('addForm')">保存</el-button>
            <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
            <el-button @click="addDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 工资单详情 -->
      <el-dialog title="工资单详情"
                 :visible.sync="detailDialogVisible"
                 width="50%">
        <el-form ref="addForm"
                 :model="addForm"
                 label-width="140px">
          <el-form-item label="工资代发银行"
                        prop="bankCode">
            {{bankData[addForm.payBankCode]}}
          </el-form-item>
          <el-form-item label="工资代发银行卡号"
                        prop="bankCode">
            {{addForm.payBankCardNumber}}
          </el-form-item>
          <el-form-item label="工资代发开户行名称"
                        prop="bankCode">
            {{addForm.payBankName}}
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="toEdit()">编辑</el-button>
            <el-button @click="detailDialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import easyTable from '@/components/easyTable'
import detailHeader from '@/components/detailHeader'
import { bankData } from '../data'
export default {
  name: 'payrollBank',
  components: { easyTable, detailHeader },
  data () {
    return {
      form: {
        workerName: '',
        idCardNumber: '',
        selectEventStatus: '',
        selectEventType: '',
        startTime: ''
      },
      selectRows: [],
      addForm: {
        bankName: ''
      },
      isLoading: false,
      detailDialogVisible: false,
      addDialogVisible: false,
      bankData: bankData,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        label: '代发银行设置'
      }],
      rules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        backPayMonth: [
          { required: true, message: '请选择补发工资月份', trigger: 'change' }
        ],
        teamName: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        payMonth: [
          { required: true, message: '请选择工资发放时间', trigger: 'blur' }
        ],
        days: [
          { required: true, message: '请输入工人出勤天数', trigger: 'change' }
        ],
        isBackPay: [
          { required: true, message: '请选择是否为补发工资', trigger: 'change' }
        ],
        workingHours: [
          { required: true, message: '请输入工人工作时长', trigger: 'change' }
        ],
        wagesPayable: [
          { required: true, message: '请输入应发工资', trigger: 'change' }
        ],
        realWages: [
          { required: true, message: '请输入实发工资', trigger: 'change' }
        ],
        bonus: [
          { required: true, message: '请输入奖金金额', trigger: 'change' }
        ]
      },
      dialogTitle: '添加代发工资银行',
      tableData: {
        colsTitle: [
          {
            label: '序号',
            data: 'id'
          },
          {
            label: '银行名称',
            data: 'bankName'
          },
          {
            label: '工资代发银行卡号',
            data: 'payBankCardNumber'
          },
          {
            label: '开户行名称',
            data: 'payBankName'
          }
        ],
        type: 'selection',
        cols: [],
        footer: {
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    edit (index, row) {
      console.log(index, row)
      this.dialogTitle = '编辑代发银行信息'
      this.addDialogVisible = true
      this.$http.get('/cardInfo/details/' + row.id).then(res => {
        this.addForm = res.data.data
        this.addForm.bankName = res.data.data.payBankCode
        this.addForm.bankName = res.data.data.payBankCode
        this.addForm.payBankName = res.data.data.payBankName
        this.addForm.payRollBankName = res.data.data.payBankName
        this.detailId = row.id
      })
    },
    tableSelectRowChange (val) {
      this.selectRows = val
    },
    handleDialogClose () {
      this.dialogVisible = false
    },
    handleSelectWorkerName () {
      console.log('选择工人姓名')
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    // 点击已上传的文件链接时的钩子,
    handlePreview (file) {
      console.log(file)
    },
    // 文件上传数量超过限制时
    handleExceed () {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 打开编辑不良记录
    toEdit () {
      this.detailDialogVisible = false
      this.addDialogVisible = true
      this.dialogTitle = '编辑代发银行信息'
    },
    // 打开选择工人列表的dialog
    showSelectWorkerDialog () {
      // this.$getData.workList(this.proId).then(res => {
      //   if (res !== null) {
      //     this.workerList = res
      //   }
      // })
      this.dialogWorkerTableVisible = true
    },
    // 银行信息修改
    addFormBankNameChange (val) {
      console.log(val)
      this.addForm.bankName = val
    },
    addFormPayRollBankNameChange (val) {
      console.log(val)
      this.addForm.payRollBankName = val
    },
    addFormPayRollBankCardNumberChange (val) {
      console.log(val)
      this.addForm.payRollBankCardNumber = val
    },
    // 银行信息修改
    bankNameChange () {
      for (let val in this.bankData) {
        if (bankData[val] === this.addForm.bankName) {
          this.addForm.payRollBankCode = val
          break
        }
      }
    },
    dels () {
      var that = this
      var idString = that.selectRows.map(val => val.id).join(',')
      this.$confirm('是否删除选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$http.get('/cardInfo/delete', { params: { 'id': idString } }).then(res => {
          if (res.data.code === 200) {
            that.$message({
              message: res.data.data,
              type: 'success'
            })
            that.refresh()
            that.selectRows = []
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
        if (res.data.data.workerInfo.bankID.length > 0) {
          this.addForm.payRollBankCardNumber = res.data.data.workerInfo.bankID
        }
        // this.addForm.payRollBankCardNumber = res.data.data.workerInfo.bankID
        if (res.data.data.workerInfo.openBank.length > 0) {
          this.addForm.payRollBankName = res.data.data.workerInfo.openBank
        }
        // this.addForm.payRollBankName = res.data.data.workerInfo.openBank
        this.addForm.payRollBankCode = res.data.data.workerInfo.bankCode
        if (this.bankData[res.data.data.workerInfo.bankCode]) {
          this.addForm.bankName = this.bankData[res.data.data.workerInfo.bankCode]
        }
        // this.addForm.bankName = this.bankData[res.data.data.workerInfo.bankCode]
        this.dialogWorkerTableVisible = false
      })
    },
    // 提交新建不良记录详情
    submitAddForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '编辑代发银行信息') {
            this.$http.post('/cardInfo/update/' + this.detailId, this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: res.data.data,
                  type: 'success'
                })
                this.addDialogVisible = false
              } else {
                this.$message.error('修改信息失败：' + res.data.msg)
              }
            })
            this.refresh()
            return ''
          }
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.id
          this.addForm.workerName = this.selectWorker.workerName
          this.$http.post('/CardInfo/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存记录成功',
                type: 'success'
              })
              this.addForm.twID = this.selectWorker.workerName
              this.addDialogVisible = false
              this.refresh()
            } else {
              this.$message.error('保存项目失败：' + res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    geveImg (val) {
      this.addForm.uploadFiles = val[0]
    },
    // 提交编辑不良记录详情
    submitEditForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (Number(this.addForm.isBackPay) === 0) {
            this.addForm.backPayMonth = ''
          }
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.id
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
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.addForm = {}
      this.$refs[formName].resetFields()
    },
    // 新增工资单
    add () {
      this.selectWorker = {}
      this.addForm = {}
      this.img = []
      this.addDialogVisible = true
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      this.$http.get('/cardInfo/lists').then(res => {
        this.tableData.cols = res.data.data.data
        this.tableData.cols.map((val) => {
          val.bankName = this.bankData[val.payBankCode]
        })
        this.isLoading = false
        this.tableData.footer = {
          pageSize: res.data.data.per_page,
          total: res.data.data.total
        }
      })
    },
    // 表格页码变化时
    tablePaginationChange (val) {
      this.form.page = val
      this.refresh(this.form)
    },
    // 查看详情
    seeDetail (index, row) {
      this.$http.get('/cardInfo/details/' + row.id).then(res => {
        this.addForm = res.data.data
        this.detailDialogVisible = true
        this.detailId = row.id
      })
    },
    // 查询
    searchWorker () {
      if (this.form.startTime) {
        this.form.endDate = this.form.startTime[1]
        this.form.startDate = this.form.startTime[0]
      }
      delete this.form.startTime
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = {}
      this.refresh()
    }
  },
  mounted: function () {
    this.refresh()
    // this.$http.get('/cardInfo/lists').then(res => {
    //   console.log(res.data.data)
    //   this.tableData.cols = res.data.data.data
    //   this.tableData.cols.map((val) => {
    //     val.bankName = this.bankData[val.payBankCode]
    //   })
    //   this.tableData.footer = {
    //     pageSize: res.data.data.per_page,
    //     total: res.data.data.total
    //   }
    // })
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
    .paybankClass {
      width: 1200px;
      margin: 0 auto;
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
