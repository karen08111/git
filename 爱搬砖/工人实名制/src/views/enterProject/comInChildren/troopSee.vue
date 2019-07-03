<template>
  <div class="troopSelect">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">出入查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="120px"
             class="searchFormStyle"
             label-position="left">
      <el-row :gutter="24">
        <el-col :span="16"
                class="selectFullWidth">
          <teamSelect v-model="teamSel"></teamSelect>
          <!-- <el-form-item label="参建单位：">
            <el-select
              v-model="form.bcorpID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in buildCorp"
                :key="item.id"
                :label="item.corpName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="班组：">
            <el-select
              v-model="form.teamID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teamclass"
                :key="item.workerName"
                :label="item.corpName"
                :value="item.workerName"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-col>
        <el-col :span="8">
          <el-form-item label="工种">
            <el-select v-model="form.workType"
                       placeholder="请选择工种">
              <el-option v-for="item in typeOfWork"
                         :key="item.id"
                         :label="item.title"
                         :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"
                      v-model="form.workerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input placeholder="请输入身份证号"
                      v-model="form.idCardNumber"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">
          <el-form-item label="考勤卡号：">
            <el-input v-model="form.cardID"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <div style="text-align:right">
            <el-button type="primary"
                       size="mini"
                       @click="searchWorker">查询</el-button>
            <el-button plain
                       size="mini"
                       @click="searchAllWorker">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="exportExcel">
      <el-button type="success"
                 size="mini"
                 icon='el-icon-download'
                 @click="exportExcel"
                 :disabled="!delList.length>0">导出选中</el-button>
    </div>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tableSelectRowChange='tableSelectRowChange'
               @tablePaginationChange='tablePaginationChange'>
    </easyTable>
  </div>
</template>

<script>
import teamSelect from '@/components/form/teamSelect'
export default {
  name: 'troopSelect',
  components: { teamSelect },
  data () {
    return {
      form: {
      },
      teamSel: {},
      typeOfWork: [],
      delList: [],
      buildCorp: [],
      teamclass: [],
      isLoading: false,
      proId: '',
      tableData: {
        colsTitle: [
          {
            label: '姓名',
            data: 'workerName',
            wdith: '20px'
          },
          {
            label: '身份证号',
            data: 'idCardNumber'
          },
          {
            label: '参建单位',
            data: 'corpName'
          },
          {
            label: '工种',
            data: 'workType'
          },
          {
            label: '班组',
            data: 'teamName'
          },
          // {
          //   label: '考勤卡号',
          //   data: 'cardID'
          // },
          {
            label: '最后一次入场',
            data: 'lastInTime',
            wdith: '220px'
          },
          {
            label: '最后一次出场',
            data: 'lastOutTime',
            wdith: '240px'
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
      window.open(process.env.VUE_APP_baseURL + '/member/workStatistics/inOutSelectExcelList?ids=' + params)
    },
    // 多选选中
    tableSelectRowChange (val) {
      this.delList = val.map(val => {
        return val.twID
      })
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
      this.$http.get('/member/workStatistics/inOutSelectList?prjID=' + this.proId, { params: val }).then(res => {
        this.tableData.cols = res.data.data.data
        this.tableData.cols.map((value) => {
          value.workType = this.typeOfWork.find((val) => {
            return Number(value.workType) === Number(val.code)
          })
          value.workType = value.workType && value.workType.title
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
    // 查询
    searchWorker () {
      if (this.form.punishDate) {
        this.form.endDate = this.form.startTime[1]
        this.form.startDate = this.form.startTime[0]
      }
      this.form = Object.assign(this.form, this.teamSel)
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = {}
      this.teamSel = {}
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
.troopSelect {
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
.add {
  text-align: right;
}
.selectFullWidth {
  .el-select {
    width: 100%;
  }
}
</style>
