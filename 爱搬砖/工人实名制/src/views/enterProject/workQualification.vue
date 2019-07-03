<template>
  <div class="enterWorker">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">工人资质</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="120px"
             label-position="left"
             class="searchFormStyle">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="证书种类">
            <el-select v-model="form.certificationCategoriesType"
                       placeholder="请选择">
              <el-option v-for="item in certificationCategoriesTypeArr"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书等级">
            <el-select v-model="form.credentialLevelType"
                       placeholder="请选择">
              <el-option v-for="item in professionalArr"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书状态">
            <el-select v-model="form.certificationStatus"
                       placeholder="请选择">
              <el-option v-for="item in credentialStatus"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16">
          <teamSelect v-model="teamSel"></teamSelect>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书名称">
            <el-input v-model="form.certificationName"
                      placeholder="请输入证书名称"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input v-model="form.idCardNumber"
                      placeholder="请输入身份证号"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="form.workerName"
                      placeholder="请输入姓名"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                style="text-align:right;">
          <el-button type="primary"
                     @click="searchWorker"
                     size='small'>查询</el-button>
          <el-button plain
                     @click="searchAllWorker"
                     size='small'
                     style="margin-right:32px">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="btnGroup">
      <el-button type="success"
                 size="mini"
                 @click="add">新增</el-button>
      <el-button :disabled="!selectRows.length"
                 type="danger"
                 @click="dels"
                 size="mini">删除</el-button>
    </div>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tableSelectRowChange='tableSelectRowChange'
               @tablePaginationChange='tablePaginationChange'>
      <el-table-column slot="operation"
                       property="name"
                       width='100px'
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     type="text"
                     size="mini">详情</el-button>
          <el-button @click="toEdit(scope.$index, scope.row)"
                     type="text"
                     size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </easyTable>
    <el-dialog title="预览"
               :visible.sync="previewDialogVisible"
               width="80%">
      <div>
        <img class="idCardStyle"
             :src="workerDetailData.positiveIDCardImage" />
        <img class="idCardStyle"
             :src="workerDetailData.negativeIDCardImage" />
      </div>
    </el-dialog>
    <div id='print'>
      <img class="idCardStyle"
           :src="workerDetailData.positiveIDCardImage" />
      <img class="idCardStyle"
           :src="workerDetailData.negativeIDCardImage" />
    </div>
  </div>
</template>

<script>
import { culture, gender, politics, Personnel, aptitudeStatus } from '../data'
import teamSelect from '@/components/form/teamSelect'
// import aptitude from '@/components/form/aptitude'
export default {
  name: 'enterWorker',
  components: { teamSelect },
  data () {
    return {
      politics: politics,
      form: {
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
      credentialStatus: [
        {
          id: '1',
          title: '有效'
        },
        {
          id: '2',
          title: '过期'
        }
      ],
      certificationCategoriesTypeArr: [],
      professionalArr: [],
      teamSel: {},
      title: '',
      aptitudeStatus: aptitudeStatus,
      Personnel: Personnel,
      detailDialogVisible: false,
      isLoading: false,
      selectTypeOfWork: '',
      typeOfWork: [],
      corpArr: [],
      culture: culture,
      gender: gender,
      workerDetailData: { worker: {} },
      previewDialogVisible: false,
      selectRows: [],
      proId: '',
      tableData: {
        colsTitle: [
          {
            label: '姓名',
            data: 'workerName'
          },
          {
            label: '身份证号',
            data: 'idCardNumber',
            width: '200px'
          },
          {
            label: '证书名称',
            data: 'certificationName'
          },
          {
            label: '证书种类',
            data: 'certificationCategoriesType.title'
          },
          {
            label: '证书等级',
            data: 'credentialLevelType'
          },
          {
            label: '证书状态',
            data: 'status_text'
          },
          {
            label: '所属参建单位',
            data: 'corpName',
            width: '240px'
          },
          {
            label: '所属班组',
            data: 'teamName'
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
    form: {
      handler (val) {
        this.professionalArr = this.professional[val.certificationCategoriesType]
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getLocalTime (nS) {
      if (nS) {
        // return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\s*/, ' ')
        var now = new Date(parseInt(nS) * 1000)
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        var date = now.getDate()
        return year + '-' + month + '-' + date
      } else {
        return ''
      }
    },
    // 表格选中
    tableSelectRowChange (val) {
      this.selectRows = val
    },
    applicationAdded () {
      this.dialogVisible = true
    },
    preview () {
      this.previewDialogVisible = true
    },
    handleDialogClose () {
      this.dialogVisible = false
    },
    handleSelectWorkerName () {
      console.log('选择工人姓名')
    },
    handleDetailDialogClose () {
      this.dialogData.dialogVisible = false
    },
    editDetail () {
      this.editDialogData.dialogVisible = false
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      this.$http.get('/member/workerCredential/lists/' + this.proId, { params: val }).then(res => {
        res.data.data.data.map((val, index) => {
          if (val.sex === 1) {
            res.data.data.data[index].sex = '男'
          } else {
            res.data.data.data[index].sex = '女'
          }
        })
        this.tableData.cols = res.data.data.data.map(val => {
          let credentialLevelType = this.professional['1'].find(v => v.id === val.credentialLevelType)
          return {
            ...val,
            credentialLevelType: credentialLevelType ? credentialLevelType.title : ''
          }
        })
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
      this.$router.push('/enterProject/workQualification/detail/' + row.id)
    },
    toEdit (index, row) {
      this.$router.push('/enterProject/workQualification/edit/' + row.id)
    },
    // 查询
    searchWorker () {
      Object.assign(this.form, this.teamSel)
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.teamSel = {}
      this.form = {}
      this.refresh()
    },
    dels () {
      let params = []
      this.selectRows.map((val) => {
        params.push(val.id)
      })
      params = params.join(',')
      this.$confirm('是否删除选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/member/workerCredential/delete', { params: { 'delId': params } }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '已成功删除选中的' + params.split(',').length + '个项目',
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
    add () {
      this.$router.push('/enterProject/workQualification/add')
    }
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
    // 获取证书种类列表
    this.isLoading = true
    this.$http.get('/publicFunction/getCredential/0').then(res => {
      this.certificationCategoriesTypeArr = res.data.data
      this.refresh()
    })
  }
}
</script>

<style scoped lang="less">
.enterWorker {
  margin: 16px 24px 24px;
  :global {
    /*.el-select {
      display: block;
    }*/
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
.wd {
  /*margin-left: 25px;*/
}
.miss {
  td {
    width: 25%;
  }
}
.missTwo {
  td {
    width: 30%;
  }
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
.avatar {
  width: 100px;
  margin-right: 20px;
}
</style>
