<template>
  <div class="contract">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">合同管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="100px"
             class="searchFormStyle"
             label-position="left">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="参建单位">
            <el-select v-model="form.bcorpID"
                       placeholder="请选择">
              <el-option :label="item.corpName"
                         :value="item.id"
                         v-for="item in danList"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">
            <el-select v-model="form.type"
                       placeholder="请选择">
              <el-option v-for="item in termOfContract"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="参建单位">
            <el-select v-model="form.bcorpID" placeholder="请选择">
            <el-option :label="item.corpName" :value="item.id" v-for="item in danList" :key="item.id"></el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="所属班组">
            <el-select v-model="form.teamID"
                       placeholder="请选择">
              <el-option :label="item.teamName"
                         :value="item.id"
                         v-for="item in TeamList"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"
                      v-model="form.keywords"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input placeholder="请输入身份证号"
                      v-model="form.idCardNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="text-align:right;padding-bottom:22px;">
        <el-button type="primary"
                   @click="onSubmit(form)"
                   size="mini">查询</el-button>
        <el-button @click="onSubmit()"
                   size="mini">重置</el-button>
      </div>
      <!-- <div>
        <el-form-item label="姓名">
          <el-input v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item label="参建单位">
          <el-select v-model="form.bcorpID" placeholder="请选择">
            <el-option :label="item.corpName" :value="item.id" v-for="item in danList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option :label="item.title" :value="item.id" v-for="item in termOfContract" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="班组">
        <el-select v-model="form.teamID" placeholder="请选择">
          <el-option :label="item.teamName" :value="item.id" v-for="item in TeamList" :key="item.id"></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <div class="add">
      <el-button type="success"
                 size="mini"
                 @click="add">新增</el-button>
      <el-button type="danger"
                 @click="deleteSel"
                 size="mini"
                 :disabled="selectRows.length===0?true:false">删除</el-button>
    </div>
    <!--    列表-->
    <div style="background:#fff">
      <el-table ref="multipleTable"
                :data="tableData"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @selection-change="selectRowChange"
                style="min-height:550px;margin-bottom:20px">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="corpName"
                         width="200px"
                         label="甲方（企业名称）"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="corpCode"
                         label="统一社会信用码"
                         width="250">
        </el-table-column>
        <el-table-column prop="workerName"
                         label="乙方（工人姓名）"
                         width="160">
        </el-table-column>
        <el-table-column prop="idCardNumber"
                         label="身份证号"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="teamName"
                         label="所属班组"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type"
                         label="合同类型">
        </el-table-column>
        <el-table-column prop="wages"
                         label="薪资"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作"
                         width="100px">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleDetail(scope.row.id, scope.row)">详情</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :current_page="current_page"
            :total="total"
            @currentChange="currentChange"
            :per_page="per_page"></Page>
    </div>
  </div>
</template>

<script>
import { termOfContract } from '../../data'
import Page from '@/components/paging/paging'
export default {
  name: 'contract',
  components: { Page },
  data () {
    return {
      dialogTitle: '新增合同管理',
      baseUrl: process.env.VUE_APP_baseURL,
      isShowDetail: false,
      dialogVisible: false,
      loading: true,
      proId: '',
      termOfContract: termOfContract,
      form: {},
      TeamList: [],
      danList: [],
      current_page: 1,
      total: '',
      delList: [],
      per_page: '',
      tableData: [],
      selectValue: {},
      enter: {},
      addForm: {
        prjID: '',
        bcorpID: '',
        content: '',
        endTime: '',
        idCardNumber: '',
        startTime: '',
        teamID: '',
        teamName: '',
        twID: '',
        type: '',
        uploadFiles: '',
        wages: '',
        workerName: ''
      },
      rules: {},
      erList: [],
      erWork: {},
      selectRows: [],
      img: [],
      isSet: false,
      setId: '',
      PropForm: {
        bcorpID: [{ required: true, message: '必填', trigger: 'blur' }],
        idCardNumber: [{ required: true, message: '必填', trigger: 'blur' }],
        teamID: [{ required: true, message: '必填', trigger: 'blur' }],
        twID: [{ required: true, message: '必填', trigger: 'blur' }],
        type: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  computed: {
    corpCode () {
      let corpCodeValue = ''
      corpCodeValue = this.danList.find((val) => {
        return val.id === this.addForm.bcorpID
      }).corpCode
      return corpCodeValue
    },
    corpName () {
      let corpNameValue = ''
      corpNameValue = this.danList.find((val) => {
        return val.id === this.addForm.bcorpID
      }).corpName
      return corpNameValue
    }
  },
  created () {
    this.proId = localStorage.getItem('proId')
  },
  mounted () {
    var that = this
    this.getList()
    that.$getData.TeamList(this.proId).then(res => {
      that.TeamList = res
    })
    //  获取参见单位列表
    that.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      if (res.data.code === 200) {
        that.danList = res.data.data
      }
    })
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
  //   // addForm: {
  //   //   handler (val) {
  //   //     console.log(this.erWork)
  //   //     var data = val
  //   //     if (this.erWork.length > 0) {
  //   //       data.idCardNumber = this.erWork.workerInfo.idCardNumber
  //   //       data.teamID = this.erWork.teamInfo.teamID
  //   //       data.teamName = this.erWork.teamInfo.teamName
  //   //       data.workerName = this.erWork.workerInfo.workerName
  //   //     }
  //   //     console.log(data)
  //   //   },
  //   //   deep: true
  //   // }
  // },
  methods: {
    submitForm (formName) {
      var that = this
      this.addForm.workerName = this.erList.find((val) => {
        return val.id === that.addForm.twID
      })
      this.addForm.workerName = this.addForm.workerName && this.addForm.workerName.workerName
      this.addForm.corpCode = this.corpCode
      this.addForm.corpName = this.corpName
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$http.post('/member/contract/save', that.addForm).then(res => {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.data,
                type: 'success'
              })
              that.dialogVisible = false
              that.selectValue.page = 1
              that.getList()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteSel () {
      let params = []
      this.selectRows.map((val) => {
        params.push(val.id)
      })
      params = params.join(',')
      this.$confirm('此操作将永久删除选中的合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/member/contract/delete', { params: { 'delId': params } }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '已成功删除选中的' + params.split(',').length + '条数据',
              type: 'success'
            })
            this.selectRows = []
            this.getList()
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
    selectRowChange (val) {
      this.selectRows = val
    },
    setForm (id) {
      var that = this
      // // this
      this.$http.post('/member/contract/update/' + this.setId, this.addForm).then(res => {
        if (res.data.code === 200) {
          if (res.data.code === 200) {
            that.$message({
              message: res.data.data,
              type: 'success'
            })
            that.isSet = false
            that.dialogVisible = false
            that.getList()
          }
        }
      })
    },
    geveImg (val) {
      // console.log(val)
      this.addForm.uploadFiles = val[0]
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    pickBcorpId (id) {
      // 获取班组列表
      var that = this
      this.addForm.twID = ''
      that.$http.get('/member/contract/bcorpIDGeneratesTWorkerLists/' + id).then(res => {
        if (res.data.code === 200) {
          that.erList = res.data.data
        }
      })
    },
    pickWork (id) {
      // 获取工人
      var that = this
      that.$http.get('/member/contract/tWIDGeneratesTeamClassInfo/' + id).then(res => {
        // console.log(res.data.data)
        if (res.data.code === 200) {
          that.erWork = res.data.data
          this.addForm.idCardNumber = this.erWork.workerInfo.idCardNumber
          this.addForm.teamID = this.erWork.teamInfo.teamID
          this.addForm.teamName = this.erWork.teamInfo.teamName
          // this.addForm.twID = this.erWork.workerInfo.twID
          this.addForm.workerName = this.erWork.workerInfo.workerName
        }
      })
    },
    onSubmit (val) {
      if (val) {
        var data = val
        this.current_page = 1
        data.page = 1
        this.selectValue = data
      } else {
        this.selectValue = {}
        this.form = {}
      }
      this.getList()
    },
    handleEdit (id) {
      this.$router.push('/enterProject/contracts/edit/' + id)
    },
    getList () {
      var that = this
      let params = JSON.parse(JSON.stringify(this.selectValue))
      if (params.type || params.type === 0) {
        params.type = params.type + 1
      }
      that.$http.get('/member/contract/lists/' + this.proId, { params: params }).then(res => {
        if (res.data.code === 200) {
          var objs = res.data.data
          // console.log(objs.data)
          that.current_page = objs.current_page
          that.total = objs.total
          that.per_page = objs.per_page
          that.tableData = objs.data
          that.tableData.map((val) => {
            val.type = termOfContract.find(value => value.id === parseInt(val.type)).title
          })
          that.loading = false
        }
      })
    },
    currentChange (val) {
      this.selectValue.page = val
      this.getList()
    },
    // 详情
    handleDetail (id) {
      this.$router.push('/enterProject/contracts/detail/' + id)
      // this.$http.get('/member/contract/details/' + id).then(res => {
      //   // console.log(res.data.data)
      //   if (res.data.code === 200) {
      //     this.isShowDetail = true
      //     this.enter = res.data.data
      //   }
      // })
    },
    // 新增
    add () {
      this.$router.push('/enterProject/contracts/add')
      // this.pickArr = []
      // this.dialogVisible = true
      // // this.generateData()
      // this.isSet = false
      // this.dialogTitle = '新增合同管理'
      // this.addForm.prjID = localStorage.getItem('proId')
      // this.addForm = {}
    },
    handleClose (done) {
      done()
    }
  }
}
</script>

<style scoped lang="less">
.contract {
  :global {
    .el-select {
      display: block;
    }
  }
}
.formChildTitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.detail p {
  line-height: 35px;
  .label {
    display: inline-block;
    width: 140px;
    text-align: right;
    margin-right: 10px;
  }
}
.add {
  text-align: right;
}
</style>
