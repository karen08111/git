<template>
  <div class="contractors">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item class="breadcrumbItemStyle">不良记录</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">参建单位不良记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-position="left"
             label-width="80px"
             class="searchFormStyle">
      <el-row>
        <el-col :span="8">
          <el-form-item label="事件类型">
            <el-select v-model="form.eventType"
                       placeholder="请选择">
              <el-option v-for="item in eventType"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="secondColStyle">
          <el-form-item label="严重程度">
            <el-select v-model="form.severity"
                       placeholder="请选择">
              <el-option v-for="item in severity"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="thirdColStyle">
          <el-form-item label="状态">
            <el-select v-model="form.status"
                       placeholder="请选择">
              <el-option v-for="item in eventStatus"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属项目">
            <el-select v-model="prjID"
                       placeholder="请选择">
              <el-option v-for="item in proArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="secondColStyle">
          <el-form-item label="参建单位">
            <el-select v-model="bcorpID"
                       :disabled="!!!prjID"
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
                class="thirdColStyle">
          <div class="searchFormBtn">
            <el-button type="primary"
                       size='mini'
                       @click="searchWorker">查询</el-button>
            <el-button plain
                       size='mini'
                       @click="searchAllWorker">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tablePaginationChange='tablePaginationChange'
               @tableSelectRowChange='tableSelectRowChange'>
      <el-table-column slot="operation"
                       property="name"
                       width='80px'
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     size="small"
                     type="text">详情</el-button>
          <!-- <el-button
            @click="toEdit(scope.$index, scope.row)"
            size="small"
          >编辑</el-button> -->
        </template>
      </el-table-column>
    </easyTable>
    <!-- 新增不良记录 -->
    <el-dialog title="添加不良记录"
               :visible.sync="addDialogVisible"
               width="60%">
      <el-form ref="addForm"
               :model="addForm"
               label-width="120px"
               :rules="rules">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="姓名"
                          prop="twID">
              <el-input v-model="addForm.twID"
                        placeholder="请输入姓名"
                        @focus="showSelectWorkerDialog"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件类型"
                          prop="eventType">
              <el-select v-model="addForm.eventType"
                         placeholder="请选择事件类型">
                <el-option v-for='item in addEventType'
                           :key='item.id'
                           :label="item.title"
                           :value='item.id'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="处罚开始时间"
                          prop="punishDate">
              <el-date-picker v-model="addForm.punishDate"
                              align="right"
                              type="date"
                              placeholder="请选择出发开始日期"
                              format="yyyy-MM-dd "
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="处罚结束时间"
                          prop="punishEDate">
              <el-date-picker v-model="addForm.punishEDate"
                              align="right"
                              type="date"
                              placeholder="请选择出发结束日期"
                              format="yyyy-MM-dd "
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="严重程度"
                          prop="severity">
              <el-select v-model="addForm.severity"
                         placeholder="请选择事件类型">
                <el-option v-for='item in severity'
                           :key='item.id'
                           :label="item.title"
                           :value='item.id'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="不良记录原因"
                          prop="badCause">
              <el-input :rows="3"
                        type="textarea"
                        placeholder="请输入不良记录原因"
                        v-model="addForm.badCause">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input :rows="3"
                        type="textarea"
                        placeholder="请输入备注"
                        v-model="addForm.content">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary"
                     @click="submitAddForm('addForm')">保存</el-button>
          <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
          <el-button @click="$router.go(-1)">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'contractors',
  data () {
    return {
      form: {
        workerName: '',
        idCardNumber: '',
        selectEventStatus: '',
        selectEventType: '',
        startTime: ''
      },
      addForm: {
        twID: '',
        eventType: '',
        severity: '',
        badCause: '',
        content: '',
        punishDate: '',
        punishEDate: ''
      },
      proArr: [],
      corpArr: [],
      prjID: '',
      bcorpID: '',
      rules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'blur' }
        ],
        eventType: [
          { required: true, message: '请选择事件类型', trigger: 'change' }
        ],
        punishDate: [
          { type: 'string', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        punishEDate: [
          { type: 'string', required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        severity: [
          { required: true, message: '请选择事件严重程度', trigger: 'change' }
        ],
        badCause: [
          { required: true, message: '请输入不良记录原因', trigger: 'change' }
        ]
      },
      editDialog: false,
      dialogWorkerTableVisible: false,
      addDialogVisible: false,
      title: '',
      selectRows: [],
      detailDialogVisible: false,
      recordDetail: {},
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
            label: '参建单位名称',
            data: 'corpName'
          },
          {
            label: '事件类型',
            data: 'eventType'
          },
          {
            label: '严重程度',
            data: 'severity'
          },
          {
            label: '状态',
            data: 'status_text'
          },
          {
            label: '处罚开始时间',
            data: 'punishDate'
          },
          {
            label: '处罚结束时间',
            data: 'punishEDate'
          },
          {
            label: '所属项目',
            data: 'prjID'
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
  watch: {
    prjID (val) {
      this.teamID = ''
      this.bcorpID = ''
      let params = {
        'prjID': this.prjID
      }
      this.$http.get('/member/public/searchBCorpLists', { params: params }).then(res => {
        this.corpArr = res.data.data
      })
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
    toEdit (index, row) {
      this.$router.push('/enterProject/contractorsBadness/edit/' + row.record_id)
      // this.editDialog = true
      // this.detailDialogVisible = false
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
      console.log(val)
      this.selectWorker = val
      this.addForm.twID = val.workerName
      this.dialogWorkerTableVisible = false
    },
    // 表格选中时的事件
    tableSelectRowChange (val) {
      this.selectRows = val
    },
    // 提交新建不良记录详情
    submitAddForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.workersID
          this.$http.post('/member/workerBadRecord/save', this.addForm).then(res => {
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
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交编辑不良记录详情
    submitEditForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.workersID
          this.$http.post('/member/workerBadRecord/update/' + this.detailId, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存记录成功',
                type: 'success'
              })
              this.addForm.twID = this.selectWorker.workerName
              this.editDialog = false
              this.refresh()
            } else {
              this.$message.error('删除项目失败：' + res.data.msg)
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
    // 新增不良记录
    add () {
      this.$router.push('/enterProject/contractorsBadness/add')
      // this.selectWorker = {}
      // this.addForm = {}
      // this.addDialogVisible = true
    },
    // 删除记录
    dels () {
      let params = []
      this.selectRows.map((val) => {
        params.push(val.record_id)
      })
      params = params.join(',')
      this.$http.get('/member/BcorpBadRecord/delete', { params: { 'delId': params } }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '已成功删除选中的' + params.split(',').length + '个项目',
            type: 'success'
          })
          this.refresh()
        } else {
          this.$message.error('删除项目失败：' + res.data.msg)
        }
      })
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      if (!val) {
        val = {}
      }
      val.prjID = this.prjID
      val.bcorpID = this.bcorpID
      this.$http.get('/member/BcorpBadRecord/notPrjIDLists', { params: val }).then(res => {
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
      this.$router.push('/enterProject/contractorsBadness/detail/' + row.record_id)
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
      this.prjID = ''
      this.bcorpID = ''
      this.corpArr = []
      this.refresh()
    }
  },
  mounted: function () {
    this.$http.get('/member/project/notPageLists').then(res => {
      this.proArr = res.data.data
    })
    this.refresh()
  }
}
</script>

<style scoped lang="less">
.contractors {
  // margin: 16px 24px 24px;
  width: 1200px;
  margin: 0 auto 20px;
  :global {
    // .el-form-item{
    //   margin-left: 21px;
    // }
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
.searchFormStyle {
  background-color: #fff;
  margin-bottom: 40px;
  padding-top: 20px;
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
.searchFormBtn {
  .el-button {
    width: 80px;
    height: 28px;
  }
}
</style>
<style lang="less">
.breadcrumbItemStyle {
  .el-breadcrumb__inner {
    color: #008af1 !important;
  }
  .el-breadcrumb__separator {
    color: #008af1 !important;
  }
}
</style>
