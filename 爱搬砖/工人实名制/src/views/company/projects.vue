<template>
  <div class="projects">
    <el-form ref="form"
             :model="form"
             label-width="80px"
             class="searchFormStyle"
             label-position="left"
             style="margin-top:54px">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="项目所在地"
                        label-width="100px">
            <citySelect v-model="form.region"
                        @provId="val => form.region = val "
                        @giveCity='selectCity'
                        @giveSheng='selectCity'></citySelect>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目分类">
            <el-select v-model="form.category"
                       placeholder="请选择">
              <el-option v-for="item in projectClass"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目状态">
            <el-select v-model="form.prjStatus"
                       placeholder="请选择">
              <el-option v-for="item in projectStatus"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="form.keyWord"
                      placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                style="text-align:right;margin-bottom:24px">
          <el-button type="primary"
                     @click="searchPro"
                     size='small'>查询</el-button>
          <el-button plain
                     @click="resetTable"
                     size='small'>重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="btnGroup">
      <el-button type="success"
                 size="mini"
                 @click="addProject">新建项目</el-button>
      <el-button type="danger"
                 @click="deletePro"
                 size="mini"
                 :disabled="selectRows.length===0?true:false">删除项目</el-button>
    </div>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tablePaginationChange='tablePaginationChange'
               @tableSelectRowChange='tableSelectRowChange'>
      <el-table-column slot="operation"
                       property="name"
                       label="操作"
                       width="100px">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     size="mini"
                     type="text">详情</el-button>
          <el-button @click="edit(scope.$index, scope.row)"
                     type="text"
                     size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </easyTable>
    <detailDialog :dialogData="dialogData"
                  @handleDialogClose="handleDetailDialogClose">
      <template slot='HeaderSlot'>
        <div style='text-align:right;margin-bottom:24px'>
          <el-button type="primary"
                     @click="editProBtnClick">编辑项目</el-button>
          <el-button type="primary"
                     @click="enterProBtnClick">进入项目</el-button>
          <el-button type="warning"
                     @click="endPro">完工</el-button>
          <el-button type="danger"
                     @click="shutDownPro">停工</el-button>
        </div>
      </template>
      <template slot='slot'>
        <el-form-item label="施工许可证：">
          <el-tag v-for="(tag,index) in builderLicensesData"
                  :key="index"
                  :type="tag.type"
                  class="plusClass">
            {{'工程名称：' + tag.prjName + ', 施工许可证编号：' + tag.builderLicenseNum}}
          </el-tag>
        </el-form-item>
      </template>
    </detailDialog>
    <!-- 新建项目 -->
    <el-dialog title="新建项目"
               :visible.sync="addDialogVisible"
               width="60%">
      <keep-alive v-if="addDialogVisible">
        <forms :formData="formData"
               :labelWidth="'120px'"
               @giveForm='submitNewProject'
               @cancelBtnClick='dialogCancelAdd'>
          <template slot='slot'>
            <el-form-item label="施工许可证">
              <el-tag v-for="(tag,index) in builderLicensesData"
                      :key="index"
                      closable
                      @close='onTagClose(index)'
                      class="plusClass"
                      :type="tag.type">
                {{'工程名称：' + tag.prjName + ', 施工许可证编号：' + tag.builderLicenseNum}}
              </el-tag>
              <el-button class="button-new-tag plusClass"
                         size="small"
                         @click="addBuilderLicenses">+ 添加施工许可证</el-button>
            </el-form-item>
          </template>
        </forms>
      </keep-alive>
    </el-dialog>
    <!-- 添加施工许可证 -->
    <el-dialog title="添加施工许可证"
               :visible.sync="dialogOfaddBuilderLicenses"
               width="50%"
               center>
      <forms :formData="formDataOfAddBuilderLicenses"
             :labelWidth="'130px'"
             @giveForm='saveBuilderLicensesData'>
      </forms>
    </el-dialog>
    <!-- 编辑项目 -->
    <el-dialog title="编辑项目"
               :visible.sync="editDialogVisible"
               width="60%">
      <keep-alive v-if="editDialogVisible">
        <forms :formData="editFormData"
               :labelWidth="'120px'"
               @giveForm='submitUpdateProject'
               @cancelBtnClick='dialogCancelAdd'>
          <template slot='slot'>
            <el-form-item label="施工许可证">
              <el-tag v-for="(tag,index) in builderLicensesData"
                      :key="index"
                      closable
                      @close='onTagClose(index)'
                      class="plusClass"
                      :type="tag.type">
                {{'工程名称：' + tag.prjName + ', 施工许可证编号：' + tag.builderLicenseNum}}
              </el-tag>
              <el-button class="button-new-tag plusClass"
                         size="small"
                         @click="addBuilderLicenses">+ 添加施工许可证</el-button>
            </el-form-item>
          </template>
        </forms>
      </keep-alive>
    </el-dialog>
  </div>
</template>

<script>
import citySelect from '@/components/formItems/citySelect'
import forms from '@/components/form/form'
import { projectStatus, projectClass } from '../data'
// console.log(projectStatus)
export default {
  name: 'projects',
  components: { citySelect, forms },
  data () {
    return {
      form: {
        keyWord: '',
        prjStatus: '',
        number: '',
        region: ''
      },
      isLoading: true,
      editDialogVisible: false,
      projectStatus: projectStatus,
      addDialogVisible: false,
      dialogOfaddBuilderLicenses: false,
      proDetailOfId: '',
      dialogData: {
        data: [],
        dialogVisible: false,
        dialogTitle: ''
      },
      projectClass: projectClass,
      selectRows: [],
      tableData: {
        colsTitle: [
          {
            label: '项目名称',
            data: 'name'
          },
          {
            label: '项目所在地',
            data: 'areaCode'
          },
          {
            label: '项目分类',
            data: 'category'
          },
          {
            label: '项目状态',
            data: 'prjStatus'
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
      formDataOfAddBuilderLicenses: [{
        label: '工程名称',
        type: 'input',
        returns: 'builderLicensesPrjName',
        rules: {
          name: 'builderLicensesPrjName',
          message: '工程名称不能为空'
        }
      }, {
        label: '施工许可证编号',
        type: 'input',
        returns: 'builderLicenseNum',
        rules: {
          name: 'builderLicenseNum',
          message: '施工许可证编号不能为空'
        }
      }],
      formData: [
        {
          label: '项目名称',
          type: 'input',
          returns: 'name',
          rules: {
            name: 'name',
            message: '项目名称不能为空'
          }
        },
        {
          label: '项目分类',
          type: 'select',
          returns: 'category',
          rules: {
            name: 'category',
            message: '项目分类不能为空'
          },
          children: projectClass
        },
        {
          label: '项目状态',
          type: 'select',
          returns: 'prjStatus',
          rules: {
            name: 'prjStatus',
            message: '项目状态不能为空'
          },
          children: projectStatus
        },
        {
          label: '项目所在地',
          type: 'city',
          returns: 'areaCode',
          value: '',
          rules: {
            name: 'areaCode',
            message: '项目所在地不能为空'
          }
        },
        {
          label: '施工单位',
          type: 'input',
          returns: 'constructionCorp'
        },
        {
          label: '建设单位',
          type: 'input',
          returns: 'buildCorpName'
        },
        {
          label: '统一社会信用码',
          type: 'input',
          returns: 'buildCorpCode'
        }
      ],
      editFormData: [],
      builderLicensesData: [],
      proData: {}
    }
  },
  methods: {
    addProject () {
      this.$router.push('/addPro')
    },
    editProBtnClick () {
      this.editDialogVisible = true
      this.dialogData.dialogVisible = false
    },
    handleDialogClose () {
      this.dialogVisible = false
    },
    edit (index, row) {
      this.$router.push('/editPro/' + row.id)
    },
    seeDetail (index, row) {
      this.proDetailOfId = row.id
      this.dialogData.data = []
      this.$router.push('/proDetail/' + row.id)
      // this.$http.get('/member/project/details/' + row.id).then(res => {
      //   this.proData = JSON.parse(JSON.stringify(res.data.data))
      //   this.proData.builderLicenses = this.proData.builderLicenses.length > 0 ? this.proData.builderLicenses : []
      //   this.builderLicensesData = this.proData.builderLicenses
      //   res.data.data.prjStatus = projectStatus.find((v) => {
      //     return Number(v.id) === Number(res.data.data.prjStatus)
      //   })
      //   res.data.data.prjStatus = res.data.data.prjStatus && res.data.data.prjStatus.title
      //   res.data.data.category = projectClass.find((v) => {
      //     return Number(v.id) === Number(res.data.data.category)
      //   })
      //   res.data.data.category = res.data.data.category && res.data.data.category.title
      //   this.dialogData.data = [
      //     [ { '项目编号：': res.data.data.prjAppid }, { '验签密钥：': res.data.data.prjSecretkey } ],
      //     [ { '项目名称：': res.data.data.name } ],
      //     [ { '项目分类：': res.data.data.category }, { '项目状态：': res.data.data.prjStatus } ],
      //     [ { '项目所在地：': res.data.data.areaCode.map(val => val.title).join('-') } ],
      //     [ { '施工单位：': res.data.data.constructionCorp } ],
      //     [ { '建设单位：': res.data.data.buildCorpName }, { '统一社会信用码：': res.data.data.buildCorpCode } ]
      //   ]
      //   this.builderLicensesData = res.data.data.builderLicenses
      //   this.dialogData.dialogTitle = '项目详情'
      //   this.dialogData.width = '130px'
      //   this.dialogData.center = true
      //   this.editFormData = [
      //     {
      //       label: '项目名称',
      //       type: 'input',
      //       returns: 'name',
      //       value: this.proData.name,
      //       rules: {
      //         name: 'name',
      //         message: '项目名称不能为空'
      //       }
      //     },
      //     {
      //       label: '项目分类',
      //       type: 'select',
      //       returns: 'category',
      //       value: this.proData.category,
      //       rules: {
      //         name: 'category',
      //         message: '项目分类不能为空'
      //       },
      //       children: projectClass
      //     },
      //     {
      //       label: '项目状态',
      //       type: 'select',
      //       returns: 'prjStatus',
      //       value: this.proData.prjStatus,
      //       rules: {
      //         name: 'prjStatus',
      //         message: '项目状态不能为空'
      //       },
      //       children: projectStatus
      //     },
      //     {
      //       label: '项目所在地',
      //       type: 'city',
      //       returns: 'areaCode',
      //       value: this.proData.areaCode,
      //       rules: {
      //         name: 'areaCode',
      //         message: '项目所在地不能为空'
      //       }
      //     },
      //     {
      //       label: '施工单位',
      //       type: 'input',
      //       value: this.proData.constructionCorp,
      //       returns: 'constructionCorp'
      //     },
      //     {
      //       label: '建设单位',
      //       type: 'input',
      //       value: this.proData.buildCorpName,
      //       returns: 'buildCorpName'
      //     },
      //     {
      //       label: '统一社会信用码',
      //       type: 'input',
      //       value: this.proData.buildCorpCode,
      //       returns: 'buildCorpCode'
      //     }
      //   ]
      // }).catch(msg => {
      // })
      // this.dialogData.dialogVisible = true
    },
    handleDetailDialogClose () {
      this.dialogData.dialogVisible = false
    },
    // 进入项目
    enterProBtnClick () {
      localStorage.setItem('proId', this.proDetailOfId)
      this.$router.push('/enterProject')
    },
    submitNewProject (val) {
      // 提交新建项目信息
      val.builderLicenses = this.builderLicensesData
      if (this.builderLicensesData.length === 0) {
        this.$message({
          message: '添加施工许可证以后才可以提交',
          type: 'warning'
        })
        return false
      }
      this.$http.post('/member/project/save', val).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '项目信息保存成功',
            type: 'success'
          })
          this.addDialogVisible = false
          this.refreshList()
        } else {
          this.$notify.error({
            title: '请求失败',
            message: res.data.msg
          })
        }
      })
    },
    addBuilderLicenses () {
      this.dialogOfaddBuilderLicenses = true
    },
    saveBuilderLicensesData (val) {
      // 保存许可证信息
      this.builderLicensesData.push({
        prjName: val.builderLicensesPrjName,
        builderLicenseNum: val.builderLicenseNum
      })
      this.dialogOfaddBuilderLicenses = false
    },
    onTagClose (i) {
      this.builderLicensesData.splice(i, 1)
    },
    dialogCancelAdd () {
      this.proData = {}
      this.form = {}
      this.builderLicensesData = []
    },
    dialogCancelAdd2 () {
      console.log(this.editFormData)
      let arr = []
      this.editFormData.forEach(val => {
        val.value = ''
        arr.push(val)
      })
      this.$set(this.editFormData, '', arr)
      // this.editDialogVisible = true
      this.proData = {}
      this.form = {}
      this.builderLicensesData = []
    },
    // 选择城市
    selectCity (val) {
      this.form.region = val
    },
    // 查询
    searchPro () {
      this.isLoading = true
      this.$http.get('/member/project/lists', { params: this.form }).then(res => {
        this.isLoading = false
        this.tableData.footer.total = res.data.data.total
        this.tableData.footer.pageSize = res.data.data.per_page
        let str = ''
        res.data.data.data.map((val) => {
          val.areaCode.map((v) => {
            str = str + v.title
          })
          val.areaCode = str
          val.prjStatus = projectStatus.find((v) => {
            return Number(v.id) === Number(val.prjStatus)
          }).title
          val.category = projectClass.find((v) => {
            return Number(v.id) === Number(val.category)
          })
          if (val.category) {
            val.category = val.category.title
          }
          str = ''
        })
        console.log(res.data.data.data)
        this.tableData.cols = res.data.data.data
      })
    },
    // 重置
    resetTable () {
      this.form = {}
      this.refreshList()
    },
    // 完工按钮
    endPro () {
      this.$http.get('/member/project/finished/' + this.proDetailOfId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '项目状态已更变为‘完工’状态！',
            type: 'success'
          })
          this.refreshList()
          this.dialogData.dialogVisible = false
        } else {
          this.$message.error('更新项目状态失败：' + res.data.msg)
        }
      })
    },
    // 停工按钮
    shutDownPro () {
      this.$http.get('/member/project/stoppage/' + this.proDetailOfId).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '项目状态已更变为‘停工’状态！',
            type: 'success'
          })
          this.refreshList()
          this.dialogData.dialogVisible = false
        } else {
          this.$message.error('更新项目状态失败：' + res.data.msg)
        }
      })
    },
    // 删除项目
    deletePro () {
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
        this.$http.get('/member/project/delete', { params: { 'delId': params } }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '已成功删除选中的' + params.split(',').length + '个项目',
              type: 'success'
            })
            this.refreshList()
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
    // 修改
    submitUpdateProject (val) {
      if (typeof (val.areaCode) === 'object') {
        val.areaCode = val.areaCode[val.areaCode.length - 1].id
      }
      if (typeof (this.builderLicensesData) === 'object') {
        val.builderLicenses = this.builderLicensesData
      } else {
        val.builderLicenses = []
      }
      this.$http.post('/member/project/update/' + this.proDetailOfId, val).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '项目信息修改成功',
            type: 'success'
          })
          this.editDialogVisible = false
          this.refreshList()
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
      this.$http.get('/member/project/lists', { params: val }).then(res => {
        this.isLoading = false
        this.tableData.footer.total = res.data.data.total
        this.tableData.footer.pageSize = res.data.data.per_page
        let str = ''
        res.data.data.data.map((val) => {
          val.areaCode.map((v) => {
            str = str + v.title
          })
          val.areaCode = str
          val.prjStatus = projectStatus.find((v) => {
            return Number(v.id) === Number(val.prjStatus)
          }).title
          val.category = projectClass.find((v) => {
            return Number(v.id) === Number(val.category)
          })
          if (val.category) {
            val.category = val.category.title
          }
          str = ''
        })
        this.tableData.cols = res.data.data.data
      })
    }
  },
  mounted: function () {
    this.$http.get('/member/project/lists').then(res => {
      this.isLoading = false
      this.tableData.footer.total = res.data.data.total
      this.tableData.footer.pageSize = res.data.data.per_page
      let str = ''
      res.data.data.data.map((val) => {
        val.areaCode.map((v) => {
          str = str + v.title
        })
        val.areaCode = str
        val.prjStatus = projectStatus.find((v) => {
          return Number(v.id) === Number(val.prjStatus)
        })
        if (val.prjStatus) {
          val.prjStatus = val.prjStatus.title
        }
        val.category = projectClass.find((v) => {
          return Number(v.id) === Number(val.category)
        })
        if (val.category) {
          val.category = val.category.title
        }
        str = ''
      })
      // console.log(res.data.data.data)
      this.tableData.cols = res.data.data.data
    })
  }
}
</script>

<style scoped lang="less">
.projects {
  margin: 16px 24px 24px;
  :global {
    .el-select {
      display: block;
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
