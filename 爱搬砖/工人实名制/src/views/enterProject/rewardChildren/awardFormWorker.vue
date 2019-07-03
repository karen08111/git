<template>
  <div class="contractors">
    <div style="width:1200px;margin:0 auto;margin-bottom:21px">
      <el-breadcrumb separator=">"
                     class="breadcrumbStyle">
        <el-breadcrumb-item class="breadcrumbItemStyle"
                            v-for="(item, index) in breadcrumbData"
                            :to="{ path: item.path?item.path:'' }"
                            :key="index">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="form"
             label-position="left"
             :rules="rules"
             ref="awardForm"
             label-width="120px"
             class="awardForm">
      <div class="worker-detail-style">
        <div class="worker-detail-child-title">
          {{breadcrumbData[2].label}}
        </div>
        <el-row :gutter="24">
          <el-col :xl="12"
                  :lg='12'
                  :md="12">
            <el-form-item label="工人姓名"
                          prop="rid">
              <el-input v-model="form.workerName"
                        @focus="showSelectWorkerDialog"
                        readonly
                        :placeholder="placeholder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12"
                  :lg='12'
                  :md="12">
            <el-form-item label="身份证号">{{userData.idCardNumber}}</el-form-item>
          </el-col>
          <el-col :xl="12"
                  :lg='12'
                  :md="12">
            <el-form-item label="所属参建单位">{{ userData && userData.corpName}}</el-form-item>
          </el-col>
          <el-col :xl="5"
                  :lg='5'
                  :md="5">
            <el-form-item label="所属班组">{{userData.teamName}}</el-form-item>
          </el-col>
        </el-row>
        <workerList :dialogVisible='dialogWorkerTableVisible'
                    @handleTableCurrentChange="handleCurrentChange"
                    @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
        <!--      <template v-if="form.rid || form.id">-->
        <template>
          <!-- <el-form-item label="身份证号">{{userData.idCardNumber}}</el-form-item>
        <el-form-item label="所属参建单位">{{userData.corpName}}</el-form-item>
        <el-form-item label="所属班组">{{userData.teamName}}</el-form-item> -->
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="奖励时间"
                            prop="rewardDate">
                <el-date-picker v-model="form.rewardDate"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="奖励类别"
                            prop="rewardType">
                <el-select v-model="form.rewardType"
                           placeholder="请选择">
                  <el-option v-for="(item, idx) in RewardCategory"
                             :key="idx"
                             :label="item.title"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="奖励级别"
                            prop="rewardLevel">
                <el-select v-model="form.rewardLevel"
                           placeholder="请选择">
                  <el-option v-for="(item, idx) in RewardLevel"
                             :key="idx"
                             :label="item.title"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="奖励说明"
                        prop="content">
            <el-input type="textarea"
                      :rows="4"
                      v-model="form.content"
                      placeholder="请输入奖励说明"
                      :maxlength="100"></el-input>
          </el-form-item>
          <div class="bottomBtn">
            <el-button type="primary"
                       size='mini'
                       @click="onSubmit">保存</el-button>
            <el-button size='mini'
                       @click="$router.go(-1)">返回</el-button>
          </div>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
import { RewardCategory, RewardLevel } from '../../data'
import workerList from '@/components/workerList/workerList'
export default {
  name: 'awardFormWorker',
  components: {
    workerList
  },
  data () {
    return {
      breadcrumbData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/award',
        label: '奖励记录'
      }, {
        label: '新增工人奖励记录'
      }],
      teamData: [],
      form: {
        prjID: localStorage.getItem('proId'),
        rid: '',
        dataType: '1',
        rewardDate: '',
        rewardType: '',
        rewardLevel: '',
        content: ''
      },
      dialogWorkerTableVisible: false,
      rules: {
        rid: [{ required: true, message: '请选择工人', trigger: 'input' }],
        rewardDate: [{ required: true, message: '请输入奖励时间', trigger: 'blur' }],
        rewardType: [{ required: true, message: '请输入奖励类别', trigger: 'blur' }],
        rewardLevel: [{ required: true, message: '请输入奖励级别', trigger: 'blur' }],
        content: [{ required: true, message: '请输入奖励说明', trigger: 'blur' }]
      },
      userData: {},
      RewardCategory,
      RewardLevel,
      placeholder: null
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    name () {
      return this.form.rid
    }
  },
  watch: {
    name () {
      this.$refs.awardForm.clearValidate(['rid'])
    }
  },
  methods: {
    showSelectWorkerDialog () {
      if (!this.id) {
        // this.$getData.workList(this.proId).then(res => {
        //   if (res !== null) {
        //     this.workerList = res
        //   }
        // })
        this.dialogWorkerTableVisible = true
      }
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      this.userData = val
      this.form.workerName = val.workerName
      this.form.rid = val.id
      this.form.corpName = val.corpName
      this.form.idCardNumber = val.idCardNumber
      this.form.teamName = val.teamName
      this.dialogWorkerTableVisible = false
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    onSubmit () {
      if (this.id) {
        this.editSub()
      } else {
        this.addSub()
      }
    },
    addSub () {
      this.$http.post('/member/reward/save', this.form).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    },
    editSub () {
      let { rewardDate, rewardType, rewardLevel, content } = this.form
      let req = { rewardDate, rewardType, rewardLevel, content }
      this.$http.post(`/member/reward/update/${this.id}`, req).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    }
  },
  created () {
    if (this.id) {
      document.title = '编辑工人奖励记录'
      this.breadcrumbData[2].label = '编辑工人奖励记录'
      this.$http.get(`/member/reward/details/${this.id}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.form = this.userData = data
          this.form.rewardLevel = +data.rewardLevel
          this.form.rewardType = +data.rewardType
          this.placeholder = data.workerName
          this.form.workerName = ''
        }
      })
    } else {
      document.title = '新增工人奖励记录'
      this.breadcrumbData[2].label = '新增工人奖励记录'
    }
  },
  mounted () {
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.contractors {
  padding: 0px 0px 24px;
  box-sizing: border-box;
  :global {
    .el-tag {
      margin-right: 12px;
      margin-bottom: 12px;
    }
    .el-date-editor {
      width: 100% !important;
    }
    .el-col-md-12-left {
      padding-right: 110px !important;
    }
    .el-col-md-12-right {
      padding-left: 90px !important;
    }
    .btnStyle {
      button {
        width: 80px;
        height: 32px;
        padding-top: 9px !important;
        margin: 0 36px;
      }
    }
  }
}
.selectFullWidth {
  .el-select {
    width: 100%;
  }
}
.divMargin {
  margin-top: 20px;
}
.formStyle {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}
.formChildTitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}
.worker-detail-style {
  background-color: #ffffff;
  padding: 20px;
  .el-form-item__label {
    background-color: #ececec;
  }
  .worker-detail-child-title {
    font-size: 18px;
    padding-left: 10px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 20px;
    font-family: "PingFang-SC-Bold";
    border-left: 4px solid #008af1;
  }
}
.el-tag {
  font-size: 14px;
}
.add {
  text-align: right;
}
.showDetail {
  .label {
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 10px;
  }
}
</style>
