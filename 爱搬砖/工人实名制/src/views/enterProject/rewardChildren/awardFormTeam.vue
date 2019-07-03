<template>
  <div class="contractors">
    <!-- <detailHeader :breadcrumbData='breadcrumbItemData'>
    </detailHeader> -->
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
             :rules="rules"
             ref="awardForm"
             label-width="120px"
             class="awardForm"
             label-position="left">
      <div class="worker-detail-style">
        <div class="worker-detail-child-title">
          新增班组奖励记录
        </div>
        <el-row :gutter="24">
          <el-col :xl="12"
                  :lg='12'
                  :md="12"
                  class="el-col-md-12-left">
            <el-form-item label="班组名称"
                          prop="rid">
              <teamChoose v-model="form.rid"
                          :flag="id === undefined"
                          :placeholder="placeholder"
                          :teamData.sync="teamData"></teamChoose>
            </el-form-item>
          </el-col>
          <el-col :xl="12"
                  :lg='12'
                  :md="12"
                  class="el-col-md-12-right">
            <el-form-item label="所属参建单位">{{teamData.corpName}}</el-form-item>
          </el-col>
        </el-row>
        <!--      <template v-if="form.rid || form.id">-->
        <template>
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
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right selectFullWidth">
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
                      :maxlength="100"
                      placeholder="请输入奖励说明"></el-input>
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
export default {
  name: 'awardFormTeam',
  components: {
    'teamChoose': _ => import('./components/teamChoose')
    // 'detailHeader': _ => import('@/components/detailHeader')
  },
  data () {
    return {
      form: {
        prjID: localStorage.getItem('proId'),
        rid: '',
        dataType: '2',
        rewardDate: '',
        rewardType: '',
        rewardLevel: '',
        content: ''
      },
      breadcrumbData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/award',
        label: '奖励记录'
      }, {
        label: '新增班组奖励记录'
      }],
      rules: {
        rid: [{ required: true, message: '请选择班组', trigger: 'input' }],
        rewardDate: [{ required: true, message: '请输入奖励时间', trigger: 'blur' }],
        rewardType: [{ required: true, message: '请输入奖励类别', trigger: 'blur' }],
        rewardLevel: [{ required: true, message: '请输入奖励级别', trigger: 'blur' }],
        content: [{ required: true, message: '请输入奖励说明', trigger: 'blur' }]
      },
      teamData: {},
      RewardCategory,
      RewardLevel,
      placeholder: ''
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
      document.title = '编辑班组奖励记录'
      this.breadcrumbData[2].label = '编辑班组奖励记录'
      this.$http.get(`/member/reward/details/${this.id}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.form = this.teamData = data
          this.form.rewardLevel = +data.rewardLevel
          this.form.rewardType = +data.rewardType
          this.placeholder = data.teamName
        }
      })
    } else {
      document.title = '新增班组奖励记录'
      this.breadcrumbData[2].label = '新增班组奖励记录'
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

<style scoped lang="less">
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
