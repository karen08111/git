<template>
  <div class="Eclass">
    <el-row>
      <el-col>
        <el-form ref="form"
                 :model="form"
                 :inline="true"
                 label-width="100px"
                 class="searchFormStyle"
                 label-position="left">
          <el-form-item label="参建单位"
                        style="margin-right:56px">
            <el-select v-model="form.bcorpID"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.corpName"
                         :value="item.id">{{item.corpName}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班组名称"
                        style="margin-right:56px">
            <el-input v-model="form.teamName"
                      placeholder="请输入班组名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="selectClick(form)"
                       size="mini">查询</el-button>
            <el-button @click="form = {};getList()"
                       size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--      列表-->
    <div class="add">
      <el-button type="success"
                 :disabled="!delList.length>0"
                 size="mini"
                 @click="exportExcel">导出选中</el-button>
    </div>
    <div style="background:#fff">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <!--          prop="workerName"-->
        <!--          label="班组名称">-->
        <!--          <template slot-scope="scope">{{options.find(val => val.id === scope.row.id).corpName}}</template>-->
        <!--        </el-table-column>-->
        <el-table-column prop="teamName"
                         label="班组名"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="班组长"
                         prop="workernew"
                         align="center"
                         show-overflow-tooltip>
          <template>
          </template>
        </el-table-column>
        <el-table-column prop="classCount"
                         label="班组人数"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="corpName"
                         label="所属参建单位"
                         width='180px'
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="einlass"
                         label="进场时间"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="walkOff"
                         label="退场时间"
                         align="center"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="80px">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleDetail(scope.row.id, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="currentChange"
                     :current-page='current_page'
                     background
                     :page-size='15'
                     :total="total"
                     style="text-align: center;margin-top: 20px"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'class',
  data () {
    return {
      isShowDetail: false,
      loading: true,
      proId: '',
      form: {},
      options: [],
      tableData: [],
      delList: [],
      current_page: 1,
      total: 0,
      per_page: '',
      selectValue: {},
      details: {},
      teamSel: {}
    }
  },
  watch: {
    teamSel (val) {
      console.log(val)
    }
  },
  created () {
    this.proId = localStorage.getItem('proId')
  },
  mounted () {
    this.getEnter()
    this.getList()
  },
  methods: {
    getSelect (val) {
      console.log(val)
    },
    selectClick (val) {
      var data = val
      this.current_page = 1
      data.page = 1
      this.getList(val)
    },
    // 导出
    exportExcel () {
      let params = this.delList.join(',')
      window.open(process.env.VUE_APP_baseURL + '/member/teamclass/excelFileExportClass?ids=' + params)
    },
    // 获取参见单位列表
    getEnter () {
      this.$http.get('/member/buildCorp/addClassLists/' + this.proId).then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data
        }
      })
    },
    getList (value) {
      var that = this
      this.loading = true
      that.$http.get('/member/teamclass/lists/' + this.proId, { params: value }).then(res => {
        if (res.data.code === 200) {
          var objs = res.data.data
          that.current_page = objs.current_page
          that.total = objs.total
          that.per_page = objs.per_page
          that.tableData = objs.data
          that.loading = false
          // console.log(objs.data)
        }
        this.loading = false
      })
    },
    handleDetail (id) {
      this.$router.push('/enterProject/class/detail/' + id)
      // var that = this
      // that.$http.get('/member/teamclass/details/' + id).then(res => {
      //   if (res.data.code === 200) {
      //     that.details = res.data.data
      //     console.log(res.data.data)
      //     that.isShowDetail = true
      //   }
      // })
    },
    handleClose (done) {
      done()
    },
    Approach () { },
    exits () { },
    add () { },
    dels () { },
    handleSelectionChange (val) {
      this.delList = val.map(val => {
        return val.id
      })
    },
    currentChange (val) {
      this.selectValue.page = val
      this.getList(this.selectValue)
    }
  }
}
</script>

<style scoped>
.Eclass {
  padding: 0 25px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.add {
  text-align: right;
  padding-right: 25px;
}
.banTitle {
  font-weight: bold !important;
}

.showDetail .label {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
</style>
