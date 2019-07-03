<template>
  <div class="enter">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">参建单位库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-form ref="form"
                 :model="form"
                 label-width="80px"
                 class="searchFormStyle"
                 label-position="left">
          <div style="display: flex;">
            <el-form-item label="参建单位类型"
                          label-width="100px">
              <el-select v-model="form.type"
                         placeholder="请选择"
                         style="width: 200px;margin-right:21px">
                <el-option v-for="item in enterType"
                           :key="item.id"
                           :label="item.title"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业代码">
              <el-input v-model="form.corpCode"
                        style="width: 200px;margin-right:21px"
                        placeholder="请输入企业代码"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input v-model="form.corpName"
                        style="width: 200px;margin-right:21px"
                        placeholder="请输入企业名称"></el-input>
            </el-form-item>
            <el-form-item label-width="0px">
              <el-button type="primary"
                         @click="selectClick(form)"
                         size="mini">查询</el-button>
              <el-button @click="form = {};selectClick(form)"
                         size="mini">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div class="add">
      <el-button type="primary"
                 :disabled="!delList.length>0"
                 size="mini"
                 @click="Approach">进场</el-button>
      <el-button type="primary"
                 :disabled="!delList.length>0"
                 size="mini"
                 @click="exits">退场</el-button>
      <el-button type="success"
                 size="mini"
                 @click="add">新增</el-button>
      <el-button type="danger"
                 :disabled="!delList.length>0"
                 size="mini"
                 @click="dels">移除</el-button>
    </div>
    <!-- 新建参建单位 -->
    <el-dialog title="添加参建单位"
               :visible.sync="dialogVisible"
               width="920px">
      <el-form :inline="true"
               :model="searchForm"
               class="demo-form-inline">
        <el-form-item label="请输入企业名称">
          <el-input v-model="searchForm.corpName"
                    placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="请输入统一社会信用码">
          <el-input v-model="searchForm.corpCode"
                    placeholder="请输入统一社会信用码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchIsExist"
                     size="mini">查询</el-button>
          <el-button @click="searchAll"
                     size="mini">重置</el-button>
        </el-form-item>
      </el-form>
      <template v-if="tableDatasm.cols.length > 0">
        <easyTable :easyTableObj='tableDatasm'
                   :isLoading='isLoading'
                   @tablePaginationChange='tablePaginationChange'
                   @tableSelectRowChange='tableSelectRowChange'>
        </easyTable>
      </template>
      <div style="margin-top:16px"
           v-if="!tableDatasm.cols.length > 0">没有找到参建单位，点击 <u @click="addNew"
           style="color:#409EFF;cursor: pointer;">新建参建单位</u></div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :disabled="!selectRows.length>0"
                   type="primary"
                   @click="okAdd">确 定</el-button>
        <!-- <el-button type="primary" @click="addNew">新建参建单位</el-button> -->
      </span>
    </el-dialog>
    <div style="background:#fff">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%; min-width: 1100px;"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="corpName"
                         align='center'
                         label="参建单位名称">
        </el-table-column>
        <el-table-column label="参建单位类型"
                         prop="type"
                         align='center'>
        </el-table-column>
        <el-table-column prop="corpCode"
                         align='center'
                         label="统一社会信用代码"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="einlass"
                         label="进场时间"
                         align='center'
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="walkOff"
                         align='center'
                         label="退场时间"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="90px"
                         align='center'
                         label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleDetail(scope.row.id, scope.row)">详情</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.row.cid, scope.row)">编辑</el-button>
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
    <el-dialog title="详情"
               :visible.sync="isShowDetail"
               width="50%"
               :before-close="handleClose">
      <div class="showDetail">
        <p><span class="label">参建单位名称：</span>{{enter.corpName}}</p>
        <p><span class="label">法定代表人：</span>{{enter.legalMan}}</p>
        <p><span class="label">法定代表人电话：</span>{{enter.legalManMobile}}</p>
        <p><span class="label">企业营业地址：</span>{{enter.address}}</p>
        <p v-if="enter.areaCode"><span class="label">企业注册地址：</span>{{enter.areaCode.map(val => val.title).join('-')}}</p>
        <p v-if="enter.type"><span class="label">类型：</span>{{enterType.find(val => val.id === enter.type).title}}</p>
        <p><span class="label">统一社会信用代码：</span>{{enter.corpCode}}</p>
        <p><span class="label">邮编：</span>{{enter.zipCode}}</p>
        <p v-if="enter.einlass_walkOff"><span class="label">进场时间：</span>{{enter.einlass_walkOff.einlass}}</p>
        <p v-if="enter.einlass_walkOff"><span class="label">出场时间：</span>{{enter.einlass_walkOff.walkOff}}</p>
        <!--          <p>添加时间：{{enter.create_time}}</p>-->
      </div>
    </el-dialog>
    <!--      进场-->
    <el-dialog :title="title"
               width="30%"
               :visible.sync="showDate"
               :before-close="handleClose">
      <div class="showDetail">
        <pickTime @giveDate="giveDate"
                  @quit='cancelAdd'></pickTime>
      </div>
    </el-dialog>
    <!--      修改-->
    <el-dialog :title="title"
               width="50%"
               :visible.sync="setXin"
               :before-close="handleClose">
      <div class="showDetail">
        <keep-alive v-if="setXin">
          <Form :formData="addForm"
                labelWidth="150px"
                @giveForm="giveForm"
                :success="isSuccess"></Form>
        </keep-alive>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Form from '@/components/form/form'
import { enterType, natureOfUnit } from '../data'
import pickTime from '@/components/formItems/retreat'
export default {
  name: 'seeEnter',
  components: { pickTime, Form },
  data () {
    return {
      loading: true,
      isSuccess: false,
      dialogVisible: false,
      form: {},
      searchContent: '',
      searchData: {
        data: []
      },
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      proId: '',
      delList: [],
      selectValue: {},
      current_page: 1,
      total: 0,
      per_page: '',
      activeName: 'first',
      pickArr: [],
      pickValue: [],
      enter: {},
      isShowDetail: false,
      showDate: false,
      title: '',
      postUrl: '',
      selectRows: [],
      setXin: false,
      searchForm: {
      },
      tableData: [],
      tableDatasm: {
        colsTitle: [
          {
            label: '参建单位名称',
            data: 'corpName'
          },
          {
            label: '统一社会信用码',
            data: 'corpCode'
          },
          {
            label: '项目经理名称',
            data: 'pmName'
          }
        ],
        cols: [],
        type: 'selection',
        footer: {
          pageSize: 10,
          total: 0
        }
      },
      isLoading: false,
      addForm: [
        { label: '参建单位名称', type: 'input', returns: 'corpName', rules: { name: 'corpName' } },
        { label: '统一社会信用代码', type: 'input', returns: 'corpCode', rules: { name: 'corpCode' } },
        { label: '法定代表人', type: 'input', returns: 'legalMan', rules: { name: 'legalMan' } },
        { label: '法定代表人电话', type: 'input', returns: 'legalManMobile', rules: { name: 'legalManMobile' } },
        { label: '参建类型', type: 'select', children: enterType, returns: 'type', rules: { name: 'type' } },
        { label: '注册地', type: 'city', returns: 'areaCode', rules: { name: 'areaCode' } },
        // { label: '注册日期', type: 'date', returns: 'registerDate', rules: { name: 'registerDate' } },
        { label: '企业营业地址', type: 'input', returns: 'address', rules: { name: 'address' } },
        { label: '邮编', type: 'input', returns: 'zipCode' },
        { label: '企业性质(M,C)', type: 'select', children: natureOfUnit, returns: 'corpType', rules: { name: 'corpType' } }
      ],
      cid: ''
    }
  },
  // watch: {
  //   form: {
  //     handler (val) {
  //       var data = val
  //       this.current_page = 1
  //       data.page = 1
  //       this.selectValue = data
  //       this.getList()
  //     },
  //     deep: true
  //   }
  // },
  created () {
    this.proId = localStorage.getItem('proId')
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleClose (done) {
      done()
    },
    cancelAdd () {
      this.showDate = false
    },
    // 表格页码变化时
    tablePaginationChange (val) {
      this.searchForm.page = val
      this.generateData(this.searchForm)
    },
    // 表格选中时的事件
    tableSelectRowChange (val) {
      this.selectRows = val
    },
    // 确定添加
    okAdd () {
      let corpID = []
      this.selectRows.map((val) => {
        corpID.push(val.id)
      })
      corpID = corpID.join(',')
      this.$http.post('/member/buildCorp/save', { corpID: corpID, prjID: this.proId }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
          this.getList()
          this.saveLoading = false
          this.dialogVisible = false
        }
      })
    },
    searchIsExist () {
      console.log(this.searchForm)
      this.generateData(this.searchForm)
    },
    searchAll () {
      this.searchForm = {}
      this.generateData(this.searchForm)
    },
    selectClick (val) {
      console.log(val)
      var data = val
      this.current_page = 1
      data.page = 1
      this.selectValue = data
      this.getList()
    },
    getList () {
      var that = this
      that.loading = true
      that.$http.get('/member/buildCorp/lists/' + this.proId, { params: this.selectValue }).then(res => {
        if (res.data.code === 200) {
          var objs = res.data.data
          res.data.data.data.map((val) => {
            let corpTipe = this.enterType.find((value) => {
              return value.id === val.type
            })
            val.type = corpTipe && corpTipe.title
          })
          that.current_page = objs.current_page
          that.total = objs.total
          that.per_page = objs.per_page
          that.tableData = objs.data
          that.loading = false
          // console.log(objs.data)
        }
      })
    },
    generateData (val) {
      var that = this
      this.isLoading = true
      that.$http.get('/company/saveLists/' + this.proId, { params: val }).then(res => {
        if (res.data.code === 200) {
          this.tableDatasm.cols = res.data.data.data
          this.tableDatasm.footer = {
            pageSize: 15,
            total: res.data.data.total
          }
          this.isLoading = false
        }
      })
    },
    // 穿梭框值
    pickChange (value) {
      this.pickValue = value
    },
    // 提交穿梭框选择
    subPick () {
      var that = this
      var ids = that.pickValue.join(',')
      var data = {
        corpID: ids,
        prjID: that.proId
      }
      that.$http.post('/member/buildCorp/save', data).then(res => {
        if (res.data.code === 200) {
          that.$message({
            message: res.data.data,
            type: 'success'
          })
          that.pickValue = []
          that.dialogVisible = false
          that.getList()
        }
      })
    },
    handleSet (id) {
    },
    addNew () {
      this.$router.push('/enterProject/contract/add')
    },
    // 新增
    add () {
      this.pickArr = []
      this.dialogVisible = true
      this.generateData()
    },
    // 删除
    dels () {
      if (this.delList.length > 0) {
        var that = this
        var idString = that.delList.join(',')
        this.$confirm('是否删除选中项?（移除后，选择的参建单位将解除与项目的关联，且不可恢复，移除后的参建单位，不会从企业参建单位库删除，如需删除请到企业级参建单位库中删除。确认移除么?）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.get('/member/buildCorp/delete', { params: { delId: idString } }).then(res => {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.data,
                type: 'success'
              })
              that.getList()
              that.delList = []
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '没有选择'
        })
      }
    },
    // 编辑
    handleEdit (id, row) {
      console.log(row)
      this.$router.push({
        path: '/enterProject/contract/edit',
        query: {
          id: row.id,
          cid: row.cid
        }
      })
    },
    giveForm (val) {
      var form = val
      form.areaCode = val.areaCode[1].id
      var that = this
      that.$http.post('/member/company/update/' + this.cid, form).then(res => {
        if (res.data.code === 200) {
          that.$message({
            message: res.data.data,
            type: 'success'
          })
          that.setXin = false
          that.dialogVisible = false
          that.getList()
        }
      })
    },
    // 详情
    handleDetail (id) {
      this.$router.push('/enterProject/contract/detail/' + id)
    },
    giveDate (val) {
      //  进退场
      if (this.delList.length > 0) {
        var data = {}
        if (this.title === '选择进场日期') data = { einlass: val, ids: this.delList.join(',') }
        else data = { walkOff: val, ids: this.delList.join(',') }
        if (!data.einlass && !data.walkOff) {
          this.$message({
            message: '请选择日期',
            type: 'warning'
          })
          this.getList()
          return false
        }
        this.$http.post(this.postUrl, data).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.data,
              type: 'success'
            })
            this.getList()
            this.showDate = false
          }
        })
      } else {
        this.$message({
          message: '没有选择',
          type: 'warning'
        })
      }
    },
    handleSelectionChange (val) {
      //  这里
      this.delList = val.map(val => {
        return val.id
      })
    },
    // 进场
    Approach () {
      this.showDate = true
      this.title = '选择进场日期'
      this.postUrl = '/member/buildCorp/einlass'
    },
    // 退场
    exits () {
      this.showDate = true
      this.title = '选择退场日期'
      this.postUrl = '/member/buildCorp/walkOff'
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    // 新增
    postForm (val) {
      // console.log(val)
      var that = this
      that.$http.post('/member/company/save', val).then(res => {
        if (res.data.code === 200) {
          that.$message({
            message: res.data.data + '请切换单位库增加',
            type: 'success'
          })
          that.pickArr = []
          that.dialogVisible = false
          that.generateData()
        }
      })
    },
    currentChange (val) {
      this.selectValue.page = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.enter {
  padding: 0 25px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.table {
  width: 100%;
  margin: auto;
}
.add {
  text-align: right;
}
.showDetail {
  .label {
    display: inline-block;
    width: 140px;
    text-align: right;
    margin-right: 10px;
  }
}
</style>

<style lang="less">
.enter {
  .el-radio {
    margin-top: 10px;
  }
}
</style>
