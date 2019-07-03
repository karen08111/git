<template>
  <div class="record">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item class="breadcrumbItemStyle">不良记录</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">工人不良记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="80px"
             label-position="left"
             class="searchFormStyle">
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
                class="thirdColStyle"
                style="margin-left:37px">
          <el-form-item label="班组"
                        label-width="80px">
            <el-select v-model="teamID"
                       :disabled="!!!bcorpID"
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
                class="thirdColStyle"
                style="margin-left:37px">
          <el-form-item label="状态">
            <el-select v-model="form.status"
                       placeholder="请选择状态">
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
          <el-form-item label="身份证号">
            <el-input placeholder="请输入身份证号"
                      v-model="form.idCard"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="secondColStyle">
          <el-form-item label="姓名">
            <el-input v-model="form.name"
                      placeholder="请输入姓名"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="thirdColStyle"
                style="margin-left:37px">
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
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      form: {
        prjID: '',
        bcorpID: '',
        teamID: ''
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
      teamSel: {},
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
      proArr: [],
      corpArr: [],
      teamArr: [],
      prjID: '',
      bcorpID: '',
      teamID: '',
      workerList: [],
      detailId: '',
      proId: '',
      tableData: {
        colsTitle: [
          {
            label: '姓名',
            data: 'name'
          },
          {
            label: '身份证号',
            data: 'idCardNumber',
            width: '180px'
          },
          {
            label: '事件类型',
            data: 'eventType',
            width: '140px'
          },
          {
            label: '严重程度',
            data: 'severity'
          },
          {
            label: '状态',
            data: 'status_text',
            width: '60px'
          },
          {
            label: '所属项目',
            data: 'prjID',
            width: '180px'
          },
          {
            label: '所属参建单位',
            data: 'corpName',
            width: '220px'
          },
          {
            label: '所属班组',
            data: 'teamName',
            width: '120px'
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
    toEdit (index, row) {
      this.$router.push('/enterProject/workerBadness/edit/' + row.id)
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
      this.$router.push('/enterProject/workerBadness/add')
      // this.selectWorker = {}
      // this.addForm = {}
      // this.addDialogVisible = true
    },
    // 删除记录
    dels () {
      let params = []
      this.selectRows.map((val) => {
        params.push(val.id)
      })
      params = params.join(',')
      this.$http.get('/member/workerBadRecord/delete', { params: { 'delId': params } }).then(res => {
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
      if (!val) {
        val = {}
      }
      this.isLoading = true
      val.prjID = this.prjID
      val.bcorpID = this.bcorpID
      val.teamID = this.teamID
      this.$http.get('/member/workerBadRecord/notPrjIDLists', { params: val }).then(res => {
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
      this.$router.push('/enterProject/workerBadness/detail/' + row.id)
    },
    // 查询
    searchWorker () {
      this.form = Object.assign(this.form, this.teamSel)
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = {}
      this.prjID = ''
      this.bcorpID = ''
      this.teamID = ''
      this.corpArr = []
      this.teamArr = []
      this.refresh()
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
    },
    bcorpID (val) {
      this.teamID = ''
      let params = {
        'bcorpID': val,
        'prjID': this.prjID
      }
      this.$http.get('/member/public/searchClassLists', { params: params }).then(res => {
        this.teamArr = res.data.data
      })
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
.record {
  margin: 16px 24px 24px;
  :global {
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
</style>
