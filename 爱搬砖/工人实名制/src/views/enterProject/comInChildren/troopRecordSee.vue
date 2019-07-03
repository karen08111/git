<template>
  <div class="troopRecordSelet">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">出入记录统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="120px"
             class="searchFormStyle"
             label-position="left">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="工种">
            <el-radio-group v-model="form.workType"
                            v-if="isShowSimple">
              <el-radio v-for="item in simpleTypeOfWork"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code"
                        class='radioStyle'>{{item.title}}</el-radio>
            </el-radio-group>
            <i v-if="isShowSimple"
               class="el-icon-arrow-down"
               style="color:#008af1;cursor:pointer"
               @click="isShowSimple = false"></i>
            <el-radio-group v-model="form.workType"
                            v-if="!isShowSimple">
              <el-radio v-for="item in typeOfWork"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code"
                        class='radioStyle'>{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="日期区间"
                        prop="punishDate">
            <el-date-picker v-model="form.punishDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            format='yyyy-MM-dd'
                            value-format="yyyy-MM-dd"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16">
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
        <!-- <el-col :span="">
          <el-form-item label="工种：">
            <el-select v-model="form.workType" placeholder="请选择工种">
              <el-option
                v-for="item in typeOfWork"
                :key="item.id"
                :label="item.title"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="form.workerName"
                      placeholder="请输入姓名"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input v-model="form.idCardNumber"
                      placeholder="请输入身份证号"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">
          <el-form-item label="考勤卡号：">
            <el-input v-model="form.cardID" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <div style="text-align:right">
            <el-button type="primary"
                       @click="searchWorker"
                       size="mini">查询</el-button>
            <el-button plain
                       @click="searchAllWorker"
                       size="mini">重置</el-button>
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
      <el-table-column slot="operation"
                       property="name"
                       width='100px'
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.row)"
                     size="small"
                     :loading="scope.row.loading"
                     type="text">明细</el-button>
        </template>
      </el-table-column>
    </easyTable>
    <!--明细-->
    <el-dialog title="刷卡明细" :visible.sync="particularsVisible" width="45%">
      <el-table :data="particulars">
        <el-table-column property="create_time" label="日期" align="center" min-width="200"></el-table-column>
        <el-table-column property="state" label="状态" align="center" min-width="150"></el-table-column>
      </el-table>
      <paging :total="particularsTotal" :per_page="particularsSize" :current_page.sync="particularsPage" style="margin-top: 10px;"></paging>
    </el-dialog>
  </div>
</template>

<script>
import teamSelect from '@/components/form/teamSelect'
import paging from '../../../components/paging/paging'
export default {
  name: 'troopRecordSelet',
  components: { teamSelect, paging },
  data () {
    return {
      form: {},
      typeOfWork: [],
      teamSel: {},
      buildCorp: [],
      simpleTypeOfWork: [],
      isShowSimple: true,
      teamclass: [],
      delList: [],
      isLoading: false,
      proId: '',
      tableData: {
        colsTitle: [
          {
            label: '姓名',
            data: 'workerName'
          },
          {
            label: '身份证号',
            data: 'idCardNumber'
          },
          {
            label: '工种',
            data: 'workType'
          },
          {
            label: '参建单位',
            data: 'corpName'
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
            label: '刷卡记录',
            data: 'sum',
            width: '100px'
          }
        ],
        cols: [],
        type: 'selection',
        footer: {
          pageSize: 10,
          total: 0
        }
      },
      particulars: [],
      particularsVisible: false,
      particularsTotal: 0,
      particularsSize: 15,
      particularsPage: 1,
      particularsID: null
    }
  },
  watch: {
    particularsPage () {
      this.getParticulars()
    }
  },
  methods: {
    // 导出
    exportExcel () {
      let params = this.delList.join(',')
      window.open(process.env.VUE_APP_baseURL + '/member/workStatistics/recordsEnteringExcelList?ids=' + params + '&startDate=' + (this.form.startDate || '') + '&endDate=' + (this.form.endDate || ''))
    },
    // 多选选中
    tableSelectRowChange (val) {
      this.delList = val.map(val => {
        return val.id
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
      this.$http.get('/member/workStatistics/recordsEnteringList?prjID=' + this.proId, { params: val }).then(res => {
        this.tableData.cols = res.data.data.data.map(v => {
          return {
            loading: false,
            ...v
          }
        })
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
        this.form.endDate = this.form.punishDate[1]
        this.form.startDate = this.form.punishDate[0]
      }
      this.form = Object.assign(this.form, this.teamSel)
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = {}
      this.refresh()
    },
    // 显示进出明细
    async seeDetail (row) {
      row.loading = true
      this.particularsID = row.id
      await this.getParticulars()
      row.loading = false
      this.particularsVisible = !this.particularsVisible
    },
    // 获取进出明细数据
    async getParticulars () {
      let prjID = localStorage.getItem('proId')
      let twID = this.particularsID
      return this.$http.get('/member/workStatistics/workerInOutDetails', { params: { prjID, twID, page: this.particularsPage } }).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.particularsTotal = data.total
          this.particularsSize = data.per_page
          this.particulars = data.data
          return true
        }
      })
    }
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.simpleTypeOfWork = JSON.parse(JSON.stringify(res.data.data))
      this.simpleTypeOfWork = this.simpleTypeOfWork.splice(0, 7)
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
.troopRecordSelet {
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
