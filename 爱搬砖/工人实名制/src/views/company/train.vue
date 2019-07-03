<template>
  <div class="train">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">项目培训</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="80px"
             class="searchFormStyle">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="所属项目">
            <el-select v-model="form.projectId"
                       placeholder="请选择">
              <el-option v-for="item in projectArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训时间">
            <el-date-picker v-model="form.time"
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
        <el-col :span="8">
          <el-form-item label="培训类型">
            <el-select v-model="form.trainingTypeCode"
                       placeholder="请选择">
              <el-option v-for="item in trainingTypeCode"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9"
                style="padding-right:0">
          <el-form-item label="培训名称">
            <el-input v-model="form.trainingName"
                      placeholder="请输入培训名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                style="text-align:right">
          <el-button type="primary"
                     @click="searchPro"
                     size='small'>查询</el-button>
          <el-button plain
                     @click="resetTable"
                     size='small'>重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tablePaginationChange='tablePaginationChange'
               @tableSelectRowChange='tableSelectRowChange'>
      <el-table-column slot="operation"
                       property="name"
                       label="操作"
                       width="80px">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     size="mini"
                     type="text">详情</el-button>
        </template>
      </el-table-column>
    </easyTable>
    <detailDialog :dialogData="dialogData"
                  @handleDialogClose="handleDetailDialogClose">
    </detailDialog>
  </div>
</template>

<script>
import { projectStatus, trainingTypeCode } from '../data'
// console.log(projectStatus)
export default {
  name: 'train',
  data () {
    return {
      form: {
      },
      dialogTitle: '添加项目培训',
      addForm: {
        'projectId': '', // 所属项目id
        'trainingName': '', // 培训名称
        'trainingTypeCode': '', // 培训类型
        'trainingDate': '', // 培训日期
        'trainingDuration': '', // 培训时长
        'trainingOrg': '', // 培训机构
        'trainer': '', // 培训人
        'trainingAddress': '', // 培训地址
        'description': '' // 培训简述
      },
      rules: {
        trainingName: [
          { required: true, message: '请输入培训名称', trigger: 'blur' }
        ],
        trainingTypeCode: [
          { required: true, message: '请选择培训类型', trigger: 'blur' }
        ],
        trainingDate: [
          { required: true, message: '请选择培训日期', trigger: 'blur' }
        ],
        trainingDuration: [
          { required: true, message: '请输入培训时长', trigger: 'blur' }
        ]
      },
      projectArr: [],
      detailDialogVisible: false,
      trainingTypeCode: trainingTypeCode,
      isLoading: true,
      editDialogVisible: false,
      projectStatus: projectStatus,
      addDialogVisible: false,
      dialogOfaddBuilderLicenses: false,
      trainDetailOfId: '',
      dialogData: {
        data: [],
        dialogVisible: false,
        dialogTitle: ''
      },
      selectRows: [],
      tableData: {
        colsTitle: [
          {
            label: '培训名称',
            data: 'trainingName'
          },
          {
            label: '培训时长',
            data: 'trainingDuration'
          },
          {
            label: '培训类型',
            data: 'trainingType'
          },
          {
            label: '培训日期',
            data: 'trainingDate'
          },
          {
            label: '所属项目',
            data: 'name'
          }
        ],
        type: 'selection',
        cols: [],
        footer: {
          pageSizes: [10, 20],
          pageSize: 10,
          total: 10
        }
      },
      editFormData: [],
      proData: {}
    }
  },
  methods: {
    addTrain () {
      this.$router.push('/enterProject/train/add')
    },
    edit (val, row) {
      this.$router.push('/trainEdit/' + row.id)
    },
    handleDialogClose () {
      this.dialogVisible = false
    },
    seeDetail (index, row) {
      this.$router.push('/enterProject/trainDetail/' + row.id)
    },
    handleDetailDialogClose () {
      this.dialogData.dialogVisible = false
    },
    dialogCancelAdd () {
      this.proData = {}
      this.form = {}
    },
    dialogCancelAdd2 () {
      let arr = []
      this.editFormData.forEach(val => {
        val.value = ''
        arr.push(val)
      })
      this.$set(this.editFormData, '', arr)
      this.proData = {}
      this.form = {}
    },
    // 查询
    searchPro () {
      if (this.form.time) {
        this.form.trainDateStart = this.form.time[0]
        this.form.trainDateEnd = this.form.time[1]
      }
      this.refreshList(this.form)
    },
    // 重置
    resetTable () {
      this.form = {}
      this.refreshList({})
    },
    // 删除项目
    deleteTrain () {
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
        this.$http.get('/member/projectTrain/delete', { params: { 'id': params } }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '已成功删除选中的' + params.split(',').length + '个项目',
              type: 'success'
            })
            this.refreshList({})
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
    // 提交新建和修改记录详情
    submitAddForm (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.trainDetailOfId > 0) {
            this.$http.post('/member/projectTrain/update/' + this.trainDetailOfId, this.addForm).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '培训信息修改成功',
                  type: 'success'
                })
                this.addDialogVisible = false
                this.refreshList({})
              }
            })
            return ''
          }
          this.addForm.projectId = this.proId
          this.$http.post('/member/projectTrain/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存记录成功',
                type: 'success'
              })
              this.addDialogVisible = false
              this.refreshList({})
            } else {
              this.$message.error('保存项目失败：' + res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 表格选中
    tableSelectRowChange (val) {
      this.selectRows = val
    },
    // 表格页码变化时
    tablePaginationChange (val) {
      this.form.page = val
      this.refreshList(this.form)
    },
    // 请求列表，可重复使用
    refreshList (val) {
      this.isLoading = true
      this.$http.get('/member/projectTrain/lists', { params: val }).then(res => {
        this.isLoading = false
        this.tableData.footer.total = res.data.data.total
        this.tableData.footer.pageSize = res.data.data.per_page
        this.tableData.cols = res.data.data.data
        res.data.data.data.map((val) => {
          val.trainingType = this.trainingTypeCode.find((value) => {
            return val.trainingTypeCode === value.id
          })
          val.trainingDuration = val.trainingDuration + '小时'
          val.trainingType = val.trainingType && val.trainingType.title
        })
      })
    }
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    this.refreshList({})
    this.$http.get('/member/project/notPageLists', {}).then(res => {
      this.projectArr = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
.train {
  margin: 16px 24px 24px;
  :global {
    .el-select {
      display: block;
    }
    .breadcrumbItemStyle {
      margin-bottom: 0;
    }
  }
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.plusClass {
  margin-left: 8px;
}
.radioStyle {
  margin: 10px 24px 10px 0;
}
</style>
