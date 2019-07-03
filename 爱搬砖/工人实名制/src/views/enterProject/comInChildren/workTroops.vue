<template>
  <div class="workTroops">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">工人出入统计</el-breadcrumb-item>
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
      <el-row>
        <el-col :span="8">
          <el-form-item label="日期区间">
            <el-date-picker v-model="form.startTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            format='yyyy-MM-dd'
                            value-format="yyyy-MM-dd"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
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
        <!-- <el-col :span="8">
          <el-form-item label="考勤卡号：">
            <el-input v-model="form.cardID" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>-->
      </el-row>
      <!-- <el-row>
        <el-col :span="10">
          <el-form-item label="参建单位：">
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
      </el-row> -->
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="工种：">
            <el-select v-model="form.workType" placeholder="请选择工种">
              <el-option
                v-for="item in typeOfWork"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="24">
        <!-- <el-col :span="8">
          <el-form-item label="考勤卡状态">
            <el-select
    v-model="form.workerName"
    >
    <el-option
      v-for="item in cardStatus"
      :key="item.id"
      :label="item.label"
      :value="item.id">
    </el-option>
  </el-select>
          </el-form-item>
        </el-col> -->
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
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16">
          <teamSelect v-model="teamSel"></teamSelect>
          <!-- <el-form-item label="班组：">
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
          </el-form-item>-->
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="姓名：">
            <el-input v-model="form.workerName"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="5">
          <div style='text-align:right;margin-right:24px;'>
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
  name: 'workTroops',
  components: { teamSelect },
  data () {
    return {
      form: {
      },
      delList: [],
      teamSel: {},
      cardStatus: [{
        id: 0,
        label: '正常'
      }, {
        id: 1,
        label: '异常'
      }],
      typeOfWork: [],
      buildCorp: [],
      teamclass: [],
      isLoading: false,
      simpleTypeOfWork: [],
      isShowSimple: true,
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
            label: '参建单位',
            data: 'corpName'
          },
          {
            label: '班组',
            data: 'teamName'
          },
          {
            label: '工种',
            data: 'workType'
          },
          {
            label: '刷卡合计',
            data: 'number',
            width: '80px'
          },
          {
            label: '出勤天数',
            data: 'num',
            width: '80px'
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
    // 导出excel
    exportExcel () {
      let params = this.delList.join(',')
      window.open(process.env.VUE_APP_baseURL + '/member/workStatistics/workerInOutSelectExcelList?ids=' + params + '&startDate=' + (this.form.startDate || '') + '&endDate=' + (this.form.endDate || ''))
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
      this.$http.get('/member/workStatistics/workerInOutSelectList?prjID=' + this.proId, { params: val }).then(res => {
        this.tableData.cols = res.data.data.data
        this.tableData.cols.map((val, index) => {
          val.workType = this.typeOfWork.find((value) => value.code === val.workType) && this.typeOfWork.find((value) => value.code === val.workType).title
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
      if (this.form.startTime) {
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
.workTroops {
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
