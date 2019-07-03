<template>
  <div class="salary">
    <el-form ref="form"
             :model="form"
             label-width="140px">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="工种">
            <el-radio-group v-model="form.workType">
              <el-radio v-for="item in typeOfWork"
                        :key="item.id"
                        :label="item.id"
                        class='radioStyle'>{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="参建单位">
            <el-select v-model="form.corpName"
                       placeholder="请选择">
              <el-option v-for="item in buildCorp"
                         :key="item.id"
                         :label="item.corpName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="班组">
            <el-select v-model="form.teamclass"
                       placeholder="请选择班组">
              <el-option v-for="item in teamclass"
                         :key="item.workerName"
                         :label="item.corpName"
                         :value="item.workerName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"
                      v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div style='text-align:right;margin-right:24px;'>
            <el-button type="primary"
                       @click="searchWorker"
                       size='small'>查询</el-button>
            <!--<el-button
              plain
              @click="searchAllWorker"
              size='small'
            >重置</el-button>-->
          </div>
        </el-col>
      </el-row>
    </el-form>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tablePaginationChange='tablePaginationChange'>
      <el-table-column slot="operation"
                       property="name"
                       width='70px'
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     size="small">查看</el-button>
        </template>
      </el-table-column>
    </easyTable>
    <workerList :dialogVisible='dialogWorkerTableVisible'
                @handleTableCurrentChange="handleCurrentChange"
                @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
    <!-- 工资单详情 -->
    <el-dialog title="工资单详情"
               :visible.sync="detailDialogVisible"
               width="60%">
      <el-form ref="addForm"
               :model="addForm"
               label-width="140px"
               :rules="rules">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="姓名"
                          label-width="120px">
              {{ payrollDetails.workerName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班组"
                          label-width="120px">
              {{ payrollDetails.teamName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号"
                          label-width="120px">
              {{ payrollDetails.idCardNumber }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="工人工资卡银行"
                          label-width="120px">
              {{ payrollDetails.bankName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行名称"
                          label-width="120px">
              {{ payrollDetails.payRollBankName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工人银行卡卡号"
                          label-width="120px">
              {{ payrollDetails.payRollBankCardNumber }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工资发放起止时间"
                          label-width="140px">
              {{ payrollDetails.payMonth }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="出勤天数">
              {{ payrollDetails.days }}天
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="工作时长">
              {{ payrollDetails.workingHours }}小时
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="应发工资">
              {{ payrollDetails.wagesPayable }}元
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="实发工资">
              {{ payrollDetails.wagesPayable }}元（含奖金：{{ payrollDetails.bonus }}元）
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="是否为补发">
              {{ payrollDetails.isBackPay == 1 ? '是' : '否' }}
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="补发月份"
                          v-if="payrollDetails.isBackPay == 1">
              {{ payrollDetails.backPayMonth }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工资发放凭证"
                          label-width="140px">
              <smUpload @geveImg='geveImg'
                        :imgs="img"></smUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              {{ payrollDetails.content }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="detailDialogVisible=false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import workerList from '@/components/workerList/workerList'
import { bankData } from '../data'
export default {
  name: 'salary',
  components: { workerList },
  data () {
    return {
      form: {
        workerName: '',
        idCardNumber: '',
        selectEventStatus: '',
        selectEventType: '',
        startTime: ''
      },
      bankData: bankData,
      addForm: {
        content: '',
        uploadFiles: ''
      },
      imgSrcHeader: process.env.VUE_APP_baseURL,
      img: [],
      rules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'blur' }
        ],
        teamName: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        punishDate: [
          { type: 'array', required: true, message: '请选择工资发放起止时间', trigger: 'change' }
        ],
        wages: [
          { required: true, message: '请输入工人工资', trigger: 'blur' }
        ],
        workingHours: [
          { required: true, message: '请输入工人工作时长', trigger: 'blur' }
        ],
        wagesPayable: [
          { required: true, message: '请输入应发工资', trigger: 'blur' }
        ],
        realWages: [
          { required: true, message: '请输入实发工资', trigger: 'blur' }
        ],
        bonus: [
          { required: true, message: '请输入奖金金额', trigger: 'blur' }
        ]
      },
      editDialog: false,
      dialogWorkerTableVisible: false,
      addDialogVisible: false,
      title: '',
      typeOfWork: [],
      buildCorp: [],
      teamclass: [],
      detailDialogVisible: false,
      payrollDetails: {},
      isLoading: false,
      eventStatus: [
        {
          id: 0,
          title: '不限'
        },
        {
          id: 2,
          title: '有效'
        },
        {
          id: 1,
          title: '过期'
        }
      ],
      eventType: [{
        id: 0,
        title: '不限'
      }, {
        id: 1,
        title: '违法乱纪'
      }, {
        id: 2,
        title: '不服从项目管理'
      }, {
        id: 3,
        title: '违章操作'
      }, {
        id: 4,
        title: '违反道德规范'
      }],
      addEventType: [{
        id: 1,
        title: '违法乱纪'
      }, {
        id: 2,
        title: '不服从项目管理'
      }, {
        id: 3,
        title: '违章操作'
      }, {
        id: 4,
        title: '违反道德规范'
      }],
      severity: [
        {
          id: 0,
          title: '一般'
        },
        {
          id: 1,
          title: '严重'
        },
        {
          id: 2,
          title: '非常严重'
        }
      ],
      workerList: [],
      detailId: '',
      proId: '',
      tableData: {
        colsTitle: [
          {
            label: '工人姓名',
            data: 'workerName'
          },
          {
            label: '上次发放工资时间',
            data: 'last_payroll_time'
          },
          {
            label: '本次工资发放至',
            data: 'endTime'
          },
          {
            label: '出入天数',
            data: 'days'
          },
          {
            label: '应发工资',
            data: 'wagesPayable'
          },
          {
            label: '实发工资',
            data: 'realWages'
          },
          {
            label: '备注',
            data: 'content'
          }
        ],
        cols: [],
        footer: {
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    handleDialogClose () {
      this.dialogVisible = false
    },
    handleSelectWorkerName () {
      console.log('选择工人姓名')
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    // 打开编辑不良记录
    toEdit () {
      this.editDialog = true
      this.detailDialogVisible = false
    },
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
    // 工人列表的选择事件
    handleCurrentChange (val) {
      this.selectWorker = val
      this.addForm.twID = val.workerName
      this.addForm.idCardNumber = val.idCardNumber
      // 获取工人的班组信息
      this.$http.get('/member/payroll/tWIDGeneratesTeamClassInfo/' + this.selectWorker.workersID).then(res => {
        console.log(res.data.data)
        this.addForm.teamName = res.data.data.teamInfo.teamName
        this.addForm.teamID = res.data.data.teamInfo.teamID
        this.addForm.bcorpID = res.data.data.teamInfo.bcorpID
        this.dialogWorkerTableVisible = false
      })
    },
    // 提交新建不良记录详情
    submitAddForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.addForm.punishDate) {
            this.addForm.endDate = this.addForm.punishDate[1]
            this.addForm.startDate = this.addForm.punishDate[0]
          }
          delete this.addForm.startTime
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.workersID
          this.addForm.workerName = this.selectWorker.workerName
          this.$http.post('/member/payroll/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存记录成功',
                type: 'success'
              })
              this.addForm.twID = this.selectWorker.workerName
              this.refresh()
            } else {
              this.$message.error('保存项目失败：' + res.data.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    geveImg (val) {
      console.log(val)
      this.addForm.uploadFiles = val[0]
    },
    // 提交编辑不良记录详情
    submitEditForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.workersID
          this.$http.post('/member/payroll/update/' + this.detailId, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存修改成功',
                type: 'success'
              })
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
    // 参建单位选择事件
    corpNameChange (val) {
      console.log(val)
      this.teamLoading = true
      this.$http.get('/member/teamclass/basisBcorpIdGetLists', { params: {
        'bcorpID': val
      } }).then(res => {
        this.teamLoading = false
        console.log(res.data.data)
        this.teamclass = res.data.data
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
      this.addDialogVisible = true
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      this.$http.get('/member/payroll/notPrjIDLists', { params: val }).then(res => {
        res.data.data.data.map((val, index) => {
          val.eventType = this.eventType.find((v) => {
            return Number(v.id) === Number(val.eventType)
          })
          val.eventType = val.eventType && val.eventType.title
          val.severity = this.severity.find((v) => {
            return Number(v.id) === Number(val.severity)
          })
          val.severity = val.severity && val.severity.title
        })
        this.tableData.cols = res.data.data.data
        this.isLoading = false
        this.tableData.footer.total = res.data.data.total
        this.tableData.footer.pageSize = res.data.data.per_page
      })
    },
    // 表格页码变化时
    tablePaginationChange (val) {
      this.form.page = val
      this.refresh(this.form)
    },
    // 查看详情
    seeDetail (index, row) {
      this.$http.get('/member/payroll/details/' + row.id).then(res => {
        this.payrollDetails = JSON.parse(JSON.stringify(res.data.data))
        this.payrollDetails.bankName = this.bankData[this.payrollDetails.payRollBankCode]
        this.detailDialogVisible = true
        this.detailId = row.id
        this.selectWorker = {
          id: res.data.data.id,
          workerName: res.data.data.name
        }
        this.addForm = res.data.data
        this.addForm.payRollBankCode = this.payrollDetails.payRollBankCode
        this.addForm.bankName = this.bankData[this.payrollDetails.payRollBankCode]
        console.log(this.payrollDetails.uploadFiles)
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
    this.proId = localStorage.getItem('proId')
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
    })
    // 获取参建单位列表
    this.$http.get('/member/buildCorp/notPrjIDLists').then(res => {
      this.buildCorp = res.data.data
    })
    // 班组
    this.$http.get('/member/teamclass/notPrjIDLists').then(res => {
      this.teamclass = res.data.data
    })
    this.refresh()
  }
}
</script>

<style scoped lang="less">
.salary {
  margin: 16px 24px 24px;
  :global {
    .el-select {
      display: block;
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
  margin-bottom: 6px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.radioStyle {
  margin: 10px 24px 10px 0;
}
.add {
  text-align: right;
}

@media only screen and (max-width: 1024px) {
  .detailStyle {
    :global {
      el-dialog {
        width: 1024px !important;
      }
    }
  }
}
</style>
