<template>
  <div class="troops">
     <el-breadcrumb separator=">" class="breadcrumbStyle">
  <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumbItemStyle">首页</el-breadcrumb-item>
  <el-breadcrumb-item class="breadcrumbItemStyle">参建单位出入汇总</el-breadcrumb-item>
</el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      class="searchFormStyle" label-position="left"
    >
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="参建单位"
          >
          <el-select v-model="form.bcorpID" placeholder="请选择">
            <el-option
              v-for="item in buildCorp"
              :key="item.id"
              :label="item.corpName"
              :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="日期区间"
            prop="punishDate"
          >
            <el-date-picker
              v-model="form.punishDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              format='yyyy-MM-dd'
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div style='text-align:right;margin-right:24px;'>
            <el-button
              type="primary"
              size="mini"
              @click="searchWorker"
            >查询</el-button>
            <el-button
              plain
              size="mini"
              @click="searchAllWorker"
            >重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="exportExcel">
      <el-button
        type="success"
        size="mini"
        icon='el-icon-download'
        @click="exportExcel"
        :disabled="!delList.length>0"
      >导出选中</el-button>
    </div>
    <easyTable
      :easyTableObj='tableData'
      :isLoading='isLoading'
      @tableSelectRowChange='tableSelectRowChange'
      @tablePaginationChange='tablePaginationChange'
    >
    </easyTable>
  </div>
</template>

<script>
export default {
  name: 'troops',
  data () {
    return {
      form: {
        workerName: '',
        endDate: '',
        startDate: ''
      },
      typeOfWork: [],
      buildCorp: [],
      teamclass: [],
      delList: [],
      isLoading: false,
      proId: '',
      tableData: {
        colsTitle: [
          {
            label: '参建单位',
            data: 'corpName'
          },
          {
            label: '出入合计',
            data: 'stats'
          }
        ],
        cols: [],
        type: 'selection',
        footer: {
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    // 导出
    exportExcel () {
      let params = this.delList.join(',')
      window.open(process.env.VUE_APP_baseURL + '/member/workStatistics/teamSummarySelectExcelList?ids=' + params + '&startDate=' + (this.form.startDate || '') + '&endDate=' + (this.form.endDate + ''))
    },
    // 多选选中
    tableSelectRowChange (val) {
      this.delList = val.map(val => {
        return val.id
      })
    },
    getSelecltValue (val) {
      console.log(val)
      this.form.bcorpID = val
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
    // 打开编辑不良记录
    toEdit () {
      this.editDialog = true
      this.detailDialogVisible = false
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      this.$http.get('/member/workStatistics/teamSummarySelectList?prjID=' + this.proId, { params: val }).then(res => {
        this.tableData.cols = res.data.data.data
        this.tableData.colsTitle = [
          {
            label: '参建单位',
            data: 'corpName'
          },
          {
            label: '出入合计',
            data: 'stats'
          }
        ]
        if (this.tableData.colsTitle.length === 2) {
          if (res.data.data.data.length > 0) {
            Object.keys(res.data.data.data[0]).map((val) => {
              if (val !== 'corpName' && val !== 'stats' && val !== 'id') {
                this.tableData.colsTitle.push({
                  label: val,
                  data: val
                })
              }
            })
          } else {
            let date = new Date()
            this.tableData.colsTitle.push({
              label: date.getFullYear() + '-' + date.getMonth(),
              data: date.getFullYear() + '-' + date.getMonth()
            })
          }
        }
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
    // 查询
    searchWorker () {
      if (this.form.punishDate) {
        this.form.endDate = this.form.punishDate[1]
        this.form.startDate = this.form.punishDate[0]
      }
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
    this.$http.get('/member/buildCorp/lists/' + this.proId).then(res => {
      this.buildCorp = res.data.data.data
    })
    // 班组
    this.$http.get('/member/teamclass/lists/' + this.proId).then(res => {
      this.teamclass = res.data.data.data
    })
    this.refresh()
  }
}
</script>

<style scoped lang="less">
.troops {
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
</style>
