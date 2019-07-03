<template>
  <div class="salary">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">工资单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             class="searchFormStyle"
             label-position="left">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="所属参建单位">
            <el-select v-model="form.bcorpID"
                       @change="corpSelectChange"
                       placeholder="请选择">
              <el-option v-for="item in corpArr"
                         :key="item.id"
                         :label="item.corpName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                :offset="5">
          <el-form-item label="所属班组">
            <el-select v-model="form.teamID"
                       :disabled="!form.bcorpID"
                       placeholder="请选择">
              <el-option v-for="item in teamArr"
                         :key="item.id"
                         :label="item.teamName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="工资发放月份">
            <el-date-picker v-model="form.payMonth"
                            type="monthrange"
                            value-format="yyyy-MM"
                            range-separator="至"
                            start-placeholder="开始月份"
                            end-placeholder="结束月份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                :offset="5"
                style="text-align:center">
          <el-button type="primary"
                     @click="searchWorker(form)"
                     size="mini">查询</el-button>
          <el-button @click="searchAllWorker(form)"
                     size="mini">重置</el-button>
        </el-col>
        <!-- <el-col :span="8"
                :offset="5">
          <el-form-item label="是否为补发">
            <el-select v-model="form.isBackPay"
                       placeholder="请选择">
              <el-option label="是"
                         value="1">
              </el-option>
              <el-option label="否"
                         value="0">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <!-- <p class="formChildTitle">工资发放企业</p>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="企业名称">
            <el-select v-model="form.bcorpID"
                       placeholder="请选择"
                       @change="bcorpChange">
              <el-option :label="item.corpName"
                         :value="item.id"
                         v-for="item in danList"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                :offset="5">
          <el-form-item label="代发银行">
            <el-select v-model="form.payBankCode"
                       :disabled='!form.bcorpID'
                       placeholder="请选择银行">
              <el-option :label="item.payBankName"
                         :value="item.payBankCode"
                         v-for="item in bankArr"
                         :key="item.payBankCardNumber"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="formChildTitle">工人</p>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="班组">
            <el-select v-model="form.teamID"
                       :disabled='!form.bcorpID'
                       placeholder="请选择">
              <el-option :label="item.teamName"
                         :value="item.id"
                         v-for="item in teamclass"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                :offset="5">
          <el-form-item label="姓名">
            <el-input v-model="form.workerName"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="身份证">
            <el-input v-model="form.idCardNumber"
                      placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                :offset="5"
                style="text-align:center">
          <el-button type="primary"
                     @click="searchWorker(form)"
                     size="mini">查询</el-button>
          <el-button @click="searchAllWorker(form)"
                     size="mini">重置</el-button>
        </el-col>
      </el-row> -->
    </el-form>
    <div class="addb">
      <el-button type="success"
                 size="mini"
                 @click="add">新增工资单</el-button>
      <el-button type="danger"
                 @click="deleteSel"
                 size="mini"
                 :disabled="selectRows.length===0?true:false">删除</el-button>
    </div>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tablePaginationChange='tablePaginationChange'
               @tableSelectRowChange="selectRowChange">
      <el-table-column slot="operation"
                       property="name"
                       width='100px'
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="toEdit(scope.$index, scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     size="small"
                     type="text">详情</el-button>
        </template>
      </el-table-column>
    </easyTable>
  </div>
</template>

<script>
import { bankData } from '../../data'
export default {
  name: 'salary',
  data () {
    return {
      form: {
      },
      bankData: bankData,
      danList: [],
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
      proId: '',
      teamclass: [],
      corpArr: [],
      teamArr: [],
      selectRows: [],
      bankArr: [],
      tableData: {
        colsTitle: [
          {
            label: '所属参建单位',
            data: 'corpName'
          },
          {
            label: '班组名称',
            data: 'teamName'
          },
          {
            label: '工资发放月份',
            data: 'payMonth'
          },
          {
            label: '工人工资单数量',
            data: 'count'
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
    handleDialogClose () {
      this.dialogVisible = false
    },
    bcorpChange (val) {
      this.$http.get('/member/buildCorp/details/' + val).then((res) => {
        if (res.data.data.bankInfo) {
          this.bankArr = res.data.data.bankInfo
          this.bankArr.map((val) => {
            val.payBankName = this.bankData[val.payBankCode]
          })
        }
      })
      let params = {
        'bcorpID': val,
        'prjID': this.proId
      }
      this.$http.get('/member/public/searchClassLists', { params: params }).then((res) => {
        this.teamclass = res.data.data
      })
    },
    deleteSel () {
      let params = []
      this.selectRows.map((val) => {
        params.push(val.id)
      })
      params = params.join(',')
      this.$confirm('此操作将永久删除选中的记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/member/payroll/delete', { params: { 'delId': params } }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '已成功删除选中的' + params.split(',').length + '条数据',
              type: 'success'
            })
            this.selectRows = []
            this.refresh()
          } else {
            this.$message.error('删除项目失败：' + res.data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectRowChange (val) {
      this.selectRows = val
    },
    // 打开编辑不良记录
    toEdit (index, row) {
      this.$router.push('/enterProject/financing/salary/edit/' + row.id)
    },
    // 银行信息修改
    addFormBankNameChange (val) {
      this.addForm.bankName = val
    },
    addFormPayRollBankNameChange (val) {
      this.addForm.payRollBankName = val
    },
    addFormPayRollBankCardNumberChange (val) {
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
      this.$router.push('/enterProject/financing/salary/add')
    },
    // 参建单位选择变化
    corpSelectChange (val) {
      this.teamID = ''
      let params = {
        'bcorpID': val,
        'prjID': this.proId
      }
      // 获取参建单位列表
      this.$http.get('/member/public/searchClassLists', { params: params }).then(res => {
        this.teamArr = res.data.data
      })
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      if (this.form.payMonth) {
        this.form.endPayMonth = this.form.payMonth[1]
        this.form.startPayMonth = this.form.payMonth[0]
      }
      this.$http.get('/member/payroll/lists/' + this.proId, { params: val }).then(res => {
        this.tableData.cols = res.data.data.data
        this.isLoading = false
        this.tableData.footer.total = res.data.data.total
        this.tableData.footer.pageSize = res.data.data.per_page
        this.tableData.footer.currentPage = Number(res.data.data.current_page)
        this.tableData.cols.map((val) => {
          val.payBankName = bankData[val.payBankCode]
          if (val.isBackPay === 0) {
            val.isBackPay = '否'
          }
          if (val.isBackPay === 1) {
            val.isBackPay = '是'
          }
        })
      })
    },
    // 表格页码变化时
    tablePaginationChange (val) {
      this.form.page = val
      this.refresh(this.form)
    },
    // 查看详情
    seeDetail (index, row) {
      this.$router.push('/enterProject/financing/salary/detail/' + row.id)
    },
    // 查询
    searchWorker () {
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
    // 获取参建单位列表
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
    this.refresh()
  }
}
</script>

<style scoped lang="less">
.salary {
  :global {
    .el-select {
      display: block;
    }
    .el-date-editor {
      width: 100% !important;
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
.addb {
  text-align: right;
  margin-bottom: 20px;
}
.formChildTitle {
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
}
</style>
