<template>
  <div class="award">
    <!--    筛选-->
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">惩罚记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-form ref="form"
                 class="searchFormStyle"
                 label-position="left"
                 :model="form"
                 :inline="true"
                 label-width="80px">
          <el-form-item label=" ">
            <!-- <el-select v-model="form.dataType" placeholder="请选择">
              <el-option label="工人" :value="1"></el-option>
              <el-option label="班组" :value="2"></el-option>
            </el-select> -->
            <!-- <el-switch style="display: block"
                       v-model="form.dataType"
                       active-color="#13ce66"
                       inactive-color="#409eff"
                       active-text="工人"
                       :active-value="1"
                       :inactive-value="2"
                       inactive-text="班组">
            </el-switch> -->
            <el-button-group>
              <el-button @click="form.dataType = 2"
                         :type="form.dataType == 2 ? 'primary' : ''"
                         size="mini">班组</el-button>
              <el-button :type="form.dataType == 1 ? 'primary' : ''"
                         @click="form.dataType = 1"
                         size="mini">工人</el-button>
            </el-button-group>
          </el-form-item>
          <br>
          <!--<el-form-item label="名称">
            <el-input v-model="form.keywords"></el-input>
          </el-form-item>-->
          <el-form-item label="事项"
                        prop="penaltyType">
            <el-select v-model="form.penaltyType"
                       placeholder="请选择">
              <el-option v-for="item in PunishmentList"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别"
                        prop="penaltyLevel"
                        style="margin-left:121px">
            <el-select v-model="form.penaltyLevel"
                       placeholder="请选择">
              <el-option v-for="item in PunishmentLeval"
                         :key="item.id"
                         :label="item.title"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属参建单位"
                        label-width="120px"
                        prop="bcorpID"
                        style="margin-left:87px">
            <corpSelect v-model="form.bcorpID"></corpSelect>
          </el-form-item>
          <br>
          <el-form-item label="所属班组"
                        prop="teamID"
                        v-if="dataType === 1">
            <teamSelect v-model="form.teamID"
                        :bcorpID="form.bcorpID"></teamSelect>
          </el-form-item>
          <template v-if="dataType === 1">
            <el-form-item label="姓名"
                          prop="name"
                          style="margin-left:121px">
              <el-input v-model="form.name"
                        style="width: 200px"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号"
                          label-width="120px"
                          prop="idCardNumber"
                          style="margin-left:87px">
              <el-input v-model="form.idCardNumber"
                        style="width: 200px"
                        placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="班组名称"
                          prop="teamName">
              <el-input v-model="form.teamName"
                        placeholder="请输入班组名称"
                        style="width: 200px"></el-input>
            </el-form-item>
            <!--<el-form-item label="班组编号：">
              <el-input v-model="form.keywords"></el-input>
            </el-form-item>-->
          </template>
          <div style="text-align:right;padding-bottom:24px">
            <el-button type="primary"
                       @click="selectClick(form)"
                       size="mini">查询</el-button>
            <el-button @click="resetForm('form')"
                       size="mini">重置</el-button>
            <!--              <el-button @click="form = {}" size="mini">全部</el-button>-->
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div class="add">
      <el-button type="success"
                 size="mini"
                 @click="add">新增</el-button>
      <el-button type="danger"
                 :disabled="!delList.length"
                 size="mini"
                 @click="dels">移除</el-button>
    </div>
    <!--      列表-->
    <div style="background:#fff">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="loading"
                style="width: 100%;margin-bottom:20px"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <!--<el-table-column
        label="序号">
        <template slot-scope="scope">
          {{parseInt(scope.$index)+1}}
        </template>
      </el-table-column>-->
        <el-table-column :label="dataType === 1?'工人姓名':'班组名称'"
                         :prop="dataType === 1?'workerName':'teamName'"
                         align="center"
                         show-overflow-tooltip>
          <template>
          </template>
        </el-table-column>
        <el-table-column v-if="dataType === 1"
                         prop="idCardNumber"
                         align="center"
                         width="180px"
                         label="身份证号">
        </el-table-column>
        <!--<el-table-column
        v-if="form.dataType === 2"
        prop="teamID"
        label="班组编号">
      </el-table-column>-->
        <el-table-column prop="penaltyType"
                         align="center"
                         label="事项"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="penaltyLevel"
                         align="center"
                         label="级别"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="causesOfEvents"
                         align="center"
                         label="事件缘由"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="penaltyResult"
                         align="center"
                         label="处理结果"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="penaltyDate"
                         align="center"
                         label="发生时间">
        </el-table-column>
        <el-table-column width="100px"
                         align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleDetail(scope.row.id, scope.row)">详情</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleSet(scope.row.id, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :current_page="current_page"
            :total="total"
            @currentChange="currentChange"
            :per_page="per_page"></Page>
    </div>
    <!--      新增表单弹出-->
    <!--        选择惩罚工人列表-->
    <workLists :dialogVisible="ruleForm.dataType === 1 && dialogVisibleTwo"
               dialogTitle="选择惩罚工人"
               @onOkClick2="onOkClick2"
               @handleDialogClose="twoHidden"></workLists>
  </div>
</template>

<script>
import Page from '@/components/paging/paging'
import workLists from '@/components/workerList/workerList'
import { RewardCategory, RewardLevel, PunishmentList, PunishmentLeval } from '../../data'
export default {
  name: 'punishment',
  components: {
    Page,
    workLists,
    'corpSelect': _ => import('./components/corpSelect'),
    'teamSelect': _ => import('./components/teamSelect')
  },
  data () {
    return {
      dialogVisible: false,
      isShowDetail: false,
      dialogVisibleTwo: true,
      loading: true,
      isSet: false,
      proId: '',
      bid: [],
      RewardCategory: RewardCategory,
      RewardLevel: RewardLevel,
      PunishmentList: PunishmentList,
      PunishmentLeval: PunishmentLeval,
      form: {
        penaltyType: '',
        penaltyLevel: '',
        bcorpID: '',
        teamID: '',
        name: '',
        idCardNumber: '',
        teamName: '',
        dataType: +sessionStorage.getItem('dataTypeP') || 1
      },
      banId: {},
      setForm: {},
      tableData: [{ id: 1 }],
      delList: [],
      current_page: 1,
      total: '',
      per_page: '',
      selectValue: {},
      ruleForm: {
      },
      rules: {
        dataType: [
          { required: true, message: '必选', trigger: 'change' }
        ],
        rid: [
          { required: true, message: '必选', trigger: 'change' }
        ],
        penaltyDate: [{ required: true, message: '必选', trigger: 'change' }],
        penaltyType: [{ required: true, message: '必选', trigger: 'change' }],
        penaltyLevel: [{ required: true, message: '必选', trigger: 'change' }],
        causesOfEvents: [{ required: true, message: '必填', trigger: 'change' }],
        penaltyResult: [{ required: true, message: '必填', trigger: 'change' }]
      },
      TeamList: [],
      workList: [],
      details: {},
      id: '',
      getWorkList: [],
      matters: [],
      levels: [],
      crops: [],
      teams: [],
      dataType: +sessionStorage.getItem('dataTypeP') || 1
    }
  },
  watch: {
    form: {
      handler (val) {
        var data = val
        this.current_page = 1
        data.page = 1
        this.selectValue = data
        // this.getList()
      },
      deep: true
    },
    'form.dataType' (val) {
      this.dataType = val
      this.getList()
    }
  },
  created () {
    this.proId = localStorage.getItem('proId')
  },
  mounted () {
    this.getList()
    // 获取所有班组
    this.$getData.TeamList(this.proId).then(res => {
      this.TeamList = res
      // console.log(res)
    })
    // 获取所有工人
    this.$getData.workList(this.proId).then(res => {
      this.workList = res
    })
  },
  methods: {
    selectClick (val) {
      var data = val
      this.current_page = 1
      data.page = 1
      this.form = data
      this.dataType = this.form.dataType
      sessionStorage.setItem('dataTypeP', this.dataType)
      this.getList()
    },
    twoHidden () {
      this.dialogVisibleTwo = false
    },
    pickchange (val) {
      if (!val) {
        this.dialogVisibleTwo = true
      }
    },
    banque () {
      if (this.banId.banId) {
        this.ruleForm.rid = this.banId.banId
      }
      this.dialogVisibleTwo = false
    },
    banChange (val) {
      if (val === 2) {
        this.ruleForm.rid = null
      }
    },
    onOkClick2 (val) {
      this.dialogVisibleTwo = false
      if (val.length > 0) {
        this.getWorkList = val
        this.ruleForm.rid = val.map(value => value.id).join(',')
      }
    },
    currentChange (val) {
      this.form.page = val
      this.getList()
    },
    getList () {
      var that = this
      that.$http.get('/member/penalty/lists/' + this.proId, { params: this.form }).then(res => {
        if (res.data.code === 200) {
          var objs = res.data.data
          that.current_page = objs.current_page
          that.total = objs.total
          that.per_page = objs.per_page
          that.tableData = objs.data.map(val => {
            let type = PunishmentList.find(v => v.id === val.penaltyType)
            let level = PunishmentLeval.find(v => v.id === val.penaltyLevel)
            return { ...val, penaltyType: type ? type.title : val.penaltyType, penaltyLevel: level ? level.title : val.penaltyLevel }
          })
          that.loading = false
          // console.log(objs.data)
        }
      })
    },
    handleDetail (id) {
      if (this.dataType === 1) this.$router.push(`/enterProject/punDetails/Worker/${id}`)
      else this.$router.push(`/enterProject/punDetails/Team/${id}`)
    },
    handleSet (id) {
      if (this.dataType === 1) this.$router.push(`/enterProject/punFormWorker/${id}`)
      else this.$router.push(`/enterProject/punFormTeam/${id}`)
    },
    add (val) {
      this.isSet = false
      this.ruleForm = {}
      if (this.form.dataType === 1) this.$router.push(`/enterProject/punFormWorker`)
      else this.$router.push(`/enterProject/punFormTeam`)
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
          that.$http.get('/member/penalty/delete', { params: { delId: idString } }).then(res => {
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
    handleSelectionChange (val) {
      this.delList = val.map(val => {
        return val.id
      })
    },
    handleClose (done) {
      done()
    },
    postForm (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = that.ruleForm
          data.prjID = that.proId
          that.$http.post('/member/penalty/save', data).then(res => {
            that.$message({
              message: res.data.data,
              type: 'success'
            })
            that.dialogVisible = false
            that.getList()
          })
        } else {
          return false
        }
      })
    },
    setFormSave (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = that.setForm
          that.$http.post('/member/penalty/update/' + this.id, data).then(res => {
            that.$message({
              message: res.data.data,
              type: 'success'
            })
            that.dialogVisible = false
            that.getList()
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.form = {
        dataType: 1
      }
      this.$refs[formName].resetFields()
      this.getList()
    }
  }
}
</script>

<style scoped lang='less'>
.award {
  box-sizing: border-box;
  :global {
    .el-switch__label {
      height: 14px;
    }
  }
}
.el-switch__label {
  height: 14px;
}
.add {
  text-align: right;
  padding-right: 25px;
}
</style>

<style lang='less'>
.award {
  box-sizing: border-box;
  :global {
    .el-switch__label {
      height: 14px;
    }
  }
}
</style>
