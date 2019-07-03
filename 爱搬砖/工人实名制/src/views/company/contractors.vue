<template>
  <div class="contractors">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">参建单位库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="searchFormStyle"
               label-position="left">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="参建单位类型">
              <el-select v-model="form.type"
                         clearable
                         placeholder="请选择类型">
                <el-option v-for="item in enterType"
                           :key="item.id"
                           :label="item.title"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业名称"
                          label-width="80px">
              <el-input placeholder="请输入企业名称"
                        v-model="form.corpName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业代码"
                          label-width="80px">
              <el-input placeholder="请输入企业代码"
                        v-model="form.corpCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="40px"
                          style="margin-bottom:0px;margin-top:5px">
              <div>
                <el-button type="primary"
                           @click="selectClick(form)"
                           size="mini">查询</el-button>
                <el-button @click="form = {};selectClick(form)"
                           size="mini">重置</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <div class="add">
      <el-button type="success"
                 size="mini"
                 @click="add">新增</el-button>
      <el-button type="danger"
                 :disabled="!delList.length"
                 size="mini"
                 @click="dels">删除</el-button>
    </div>
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
        <!--<el-table-column
        width="80"
        label="序号">
        <template slot-scope="scope">
          {{parseInt(scope.$index)+1}}
        </template>
      </el-table-column>-->
        <el-table-column prop="corpName"
                         align="center"
                         label="参建单位名称"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="类型"
                         align="center"
                         prop="type">
        </el-table-column>
        <el-table-column prop="corpCode"
                         label="统一社会信用代码"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pmName"
                         align="center"
                         label="项目经理"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pmPhone"
                         align="center"
                         label="项目经理联系方式"
                         show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
        label="企业注册/营业地址"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.areaCode.map(val => val.title).join('-')}}
        </template>
      </el-table-column> -->
        <el-table-column width="100px"
                         label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDetail(scope.row.id, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <Page :current_page="current_page" :total="total" @currentChange="currentChange" :per_page="per_page"></Page> -->
      <el-pagination @current-change="currentChange"
                     :current-page='current_page'
                     background
                     :page-size='15'
                     :total="total"
                     style="text-align: center;margin-top: 20px"></el-pagination>
    </div>
    <!--    新增-->
    <el-dialog title="提示"
               :visible.sync="addDialogVisible"
               width="50%">
      <keep-alive v-if="addDialogVisible">
        <Form :formData="addForm"
              labelWidth="150px"
              @giveForm="postForm"
              @giveSetForm="giveSetForm"
              :set="isSet"
              :success="isSuccess"></Form>
      </keep-alive>
    </el-dialog>
    <!-- 新建参建单位 -->
    <el-dialog title="请输入统一社会信用码"
               :visible.sync="dialogVisible"
               width="420px">
      <el-row :gutter="20">
        <el-col :xs="16"
                :sm="16"
                :xl="16">
          <el-input v-model="searchContent"
                    placeholder="请输入统一社会信用码"></el-input>
        </el-col>
        <el-col :xs="4"
                :sm="4"
                :xl="4">
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="searchIsExist">搜索</el-button>
        </el-col>
      </el-row>
      <template v-if="searchData.length > 0">
        <el-table :data="searchData"
                  style="width: 100%">
          <el-table-column prop="date"
                           label="参建单位名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="统一社会信用码"
                           width="180">
          </el-table-column>
        </el-table>
      </template>
      <div style="margin-top:16px"
           v-if="!searchData.length > 0">没有找到参建单位，点击 <u @click="addNew"
           style="color:#409EFF;cursor: pointer;">新建参建单位</u></div>
    </el-dialog>
  </div>
</template>

<script>
// import citySelect from '@/components/formItems/citySelect'
import Form from '@/components/form/form'
import { enterType, natureOfUnit } from '../data'

export default {
  name: 'contractors',
  components: { Form },
  data () {
    return {
      addDialogVisible: false,
      dialogVisible: false,
      loading: true,
      enterType: enterType,
      form: {
        corpName: '',
        corpCode: ''
      },
      searchContent: '',
      searchData: [],
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
      tableData: [],
      addValue: {},
      selectValue: {},
      current_page: 1,
      total: 0,
      per_page: '',
      workType: [],
      isSuccess: false,
      delList: [],
      id: '',
      isSet: false,
      isShowDetail: false,
      enter: {}
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
  mounted () {
    this.getList()
    this.$getData.workType.then(res => {
      // this.form[0].children = res
    })
    // this.$http.get('/syncs/v1/contractor_corp').then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    searchIsExist () {
      console.log(this.searchContent)
    },
    // 查询
    selectClick (val) {
      var data = val
      this.current_page = 1
      data.page = 1
      this.selectValue = data
      // console.log(this.selectValue)
      this.getList()
    },
    handleSelectionChange (val) {
      //  这里
      this.delList = val.map(val => {
        return val.id
      })
    },
    handleClose (done) {
      done()
    },
    currentChange (val) {
      this.selectValue.page = val
      this.getList()
    },
    postForm (val) {
      // console.log(val)
      var that = this
      that.$http.post('/member/company/save', val).then(res => {
        if (res.data.code === 200) {
          that.$message({
            message: res.data.data,
            type: 'success'
          })
          that.dialogVisible = false
          that.isSuccess = true
          that.getList()
        }
      })
    },
    giveSetForm (val) {
      var that = this
      var id = that.id
      that.$http.post(`/member/company/update/${id}`, val).then(res => {
        if (res.data.code === 200) {
          that.$message({
            message: res.data.data,
            type: 'success'
          })
          that.dialogVisible = false
          that.isSuccess = true
          that.getList()
        }
      })
    },
    handleDetail (id) {
      // 详情
      // var that = this
      // that.isShowDetail = true
      // that.$http.get(`/member/company/details/${id}`).then(res => {
      //   if (res.data.code === 200) {
      //     this.enter = res.data.data
      //     // console.log(this.enter)
      //   }
      // })
      this.$router.push(`/builCorp/detail/${id}`)
    },
    addNew () {
      this.addDialogVisible = true
      this.isSet = false
      for (let i in this.addForm) {
        this.addForm[i].value = ''
      }
    },
    add () {
      this.$router.push('/builCorp/add')
    },
    getList () {
      var that = this
      that.loading = true
      that.$http.get('/member/company/lists', { params: this.selectValue }).then(res => {
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
        }
      })
    },
    handleEdit (id) {
      this.$router.push(`/builCorp/edit/${id}`)
    },
    dels () {
      if (this.delList.length > 0) {
        var that = this
        var idString = that.delList.join(',')
        this.$confirm('是否删除选中项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.get('/member/company/delete', { params: { delId: idString } }).then(res => {
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
    }
  }
}
</script>

<style scoped lang="less">
.contractors {
  box-sizing: border-box;
}
.add {
  text-align: right;
  margin-bottom: 20px;
  button {
    width: 80px;
    height: 32px;
  }
}
.showDetail {
  .label {
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 10px;
  }
}
.el-col-6 {
}
</style>

<style lang="less">
.contractors {
  .el-radio {
    margin-top: 10px;
  }
}
</style>
