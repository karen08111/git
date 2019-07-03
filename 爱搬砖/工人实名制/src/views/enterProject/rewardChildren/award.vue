<template>
  <div class="award">
    <!--    筛选-->
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">奖励记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-form ref="form"
                 :model="form"
                 :inline="true"
                 label-width="80px"
                 class="searchFormStyle"
                 label-position="left">
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
          <el-form-item label="奖励类别"
                        prop="rewardType">
            <el-select v-model="form.rewardType"
                       placeholder="请选择">
              <el-option :label="item.title"
                         :value="item.id"
                         :key="item.id"
                         v-for="item in RewardCategory">{{item.title}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖励级别"
                        prop="rewardLevel"
                        style="margin-left:141px">
            <el-select v-model="form.rewardLevel"
                       placeholder="请选择">
              <el-option :label="item.title"
                         :value="item.id"
                         :key="item.id"
                         v-for="item in RewardLevel"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属参建单位"
                        label-width="120px"
                        prop="bcorpID"
                        style="margin-left:107px">
            <corpSelect v-model="form.bcorpID"></corpSelect>
          </el-form-item>
          <br>
          <el-form-item label="所属班组"
                        prop="teamID">
            <teamSelect v-model="form.teamID"
                        :bcorpID="form.bcorpID"></teamSelect>
          </el-form-item>
          <template v-if="form.dataType === 1">
            <el-form-item label="姓名"
                          prop="name"
                          style="margin-left:141px">
              <el-input v-model="form.name"
                        style="width: 200px"
                        placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号"
                          label-width="120px"
                          prop="idCardNumber"
                          style="margin-left:107px">
              <el-input v-model="form.idCardNumber"
                        placeholder="请输入身份证号"
                        style="width: 200px"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="班组名称"
                          prop="teamName"
                          style="margin-left:141px">
              <el-input v-model="form.teamName"
                        placeholder="请输入班组名称"
                        style="width: 200px"></el-input>
            </el-form-item>
          </template>
          <div style="text-align:right;padding-bottom:24px">
            <el-button type="primary"
                       @click="selectClick(form)"
                       size="mini">查询</el-button>
            <el-button @click="resetForm('form')"
                       size="mini">重置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div class="add">
      <el-button type="success"
                 size="mini"
                 @click="add">新增</el-button>
      <el-button :disabled="!delList.length>0"
                 type="danger"
                 size="mini"
                 @click="dels">移除</el-button>
    </div>
    <!--      列表-->
    <div style="background:#fff">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-bottom:20px"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <template v-if="form.dataType === 1">
          <el-table-column prop="workerName"
                           label="工人姓名"
                           align="center"
                           min-width="120">
          </el-table-column>
          <el-table-column prop="idCardNumber"
                           label="身份证号"
                           align="center"
                           show-overflow-tooltip
                           width="180px">
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column prop="teamName"
                           label="班组名称"
                           align="center"
                           min-width="120">
          </el-table-column>
          <!--<el-table-column
            prop="teamID"
            label="班组编号"
            min-width="120">
          </el-table-column>-->
        </template>
        <el-table-column prop="corpName"
                         label="所属参建单位"
                         align="center"
                         show-overflow-tooltip
                         min-width="120">
        </el-table-column>
        <el-table-column v-if="form.dataType === 1"
                         prop="teamName"
                         label="所属班组"
                         align="center"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="rewardType"
                         label="奖励类别"
                         align="center"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="rewardLevel"
                         label="奖励级别"
                         align="center"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="rewardDate"
                         label="发生时间"
                         align="center"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="content"
                         label="事件缘由"
                         show-overflow-tooltip
                         align="center"
                         min-width="120">
        </el-table-column>
        <el-table-column min-width="100px"
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
  </div>
</template>

<script>
import Page from '@/components/paging/paging'
import { RewardCategory, RewardLevel } from '../../data'
export default {
  name: 'award',
  components: {
    Page,
    'corpSelect': _ => import('./components/corpSelect'),
    'teamSelect': _ => import('./components/teamSelect')
  },
  data () {
    return {
      dialogVisible: false,
      isShowDetail: false,
      loading: true,
      isSet: false,
      proId: '',
      RewardCategory: RewardCategory,
      RewardLevel: RewardLevel,
      form: {
        dataType: +sessionStorage.getItem('dataType') || 1,
        rewardType: '',
        rewardLevel: '',
        bcorpID: '',
        teamID: '',
        name: '',
        idCardNumber: '',
        teamName: ''
      },
      setForm: {},
      tableData: [{ id: 1 }],
      delList: [],
      current_page: 1,
      total: '',
      per_page: '',
      selectValue: {},
      ruleForm: {
        dataType: 1
      },
      rules: {
        dataType: [
          { required: true, message: '必选', trigger: 'change' }
        ],
        rid: [
          { required: true, message: '必选', trigger: 'change' }
        ],
        rewardDate: [{ required: true, message: '必选', trigger: 'change' }],
        rewardType: [{ required: true, message: '必选', trigger: 'change' }],
        rewardLevel: [{ required: true, message: '必选', trigger: 'change' }]
      },
      TeamList: [],
      workList: [],
      crops: [],
      teams: [],
      details: {},
      id: '',
      dataType: +sessionStorage.getItem('dataType') || 1
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
      sessionStorage.setItem('dataType', this.dataType)
      this.getList()
    },
    currentChange (val) {
      this.form.page = val
      this.getList()
    },
    getList () {
      var that = this
      this.loading = true
      that.$http.get('/member/reward/lists/' + this.proId, { params: this.form }).then(res => {
        if (res.data.code === 200) {
          var objs = res.data.data
          that.current_page = objs.current_page
          that.total = objs.total
          that.per_page = objs.per_page
          that.tableData = objs.data.map(val => {
            let type = RewardCategory.find(v => v.id === +val.rewardType)
            let level = RewardLevel.find(v => v.id === +val.rewardLevel)
            return { ...val, rewardType: type ? type.title : val.rewardType, rewardLevel: level ? level.title : val.rewardLevel }
          })
          that.loading = false
          // console.log(objs.data)
        }
      })
    },
    handleDetail (id) {
      // var that = this
      // that.$http.get('/member/reward/details/' + id).then(res => {
      //   if (res.data.code === 200) {
      //     that.details = res.data.data
      //     that.isShowDetail = true
      //   }
      // })
      if (this.form.dataType === 1) this.$router.push(`/enterProject/awardDetails/Worker/${id}`)
      else this.$router.push(`/enterProject/awardDetails/Team/${id}`)
    },
    handleSet (id) {
      // var that = this
      // that.id = id
      // that.$http.get('/member/reward/details/' + id).then(res => {
      //   if (res.data.code === 200) {
      //     that.isSet = true
      //     that.setForm = {
      //       rewardDate: res.data.data.rewardDate,
      //       rewardType: parseInt(res.data.data.rewardType),
      //       content: res.data.data.content,
      //       rewardLevel: parseInt(res.data.data.rewardLevel)
      //     }
      //     that.dialogVisible = true
      //   }
      // })
      if (this.form.dataType === 1) this.$router.push(`/enterProject/awardFormWorker/${id}`)
      else this.$router.push(`/enterProject/awardFormTeam/${id}`)
    },
    add () {
      this.isSet = false
      // this.dialogVisible = true
      if (this.form.dataType === 1) this.$router.push(`/enterProject/awardFormWorker`)
      else this.$router.push(`/enterProject/awardFormTeam`)
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
          that.$http.get('/member/reward/delete', { params: { delId: idString } }).then(res => {
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
          that.$http.post('/member/reward/save', data).then(res => {
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
          that.$http.post('/member/reward/update/' + this.id, data).then(res => {
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
