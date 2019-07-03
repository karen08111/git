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
             :rules="rules"
             ref="awardForm"
             label-width="120px"
             class="awardForm"
             label-position="left">
      <div class="worker-detail-style">
        <div class="worker-detail-child-title">
          {{breadcrumbData[2].label}}
        </div>
        <el-form-item label="参与人员"
                      prop="name">
          <el-button size="mini"
                     icon="el-icon-circle-plus"
                     type="primary"
                     @click="showSelectWorkerDialog">添加人员</el-button>
          <workerList :dialogVisible='dialogWorkerTableVisible'
                      @handleTableCurrentChange="handleCurrentChange"
                      @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
          <!-- <span class="name" v-for="(item, index) in participant" :key="index">{{item.workerName}}-{{item.idCardNumber}}<i class="el-icon-close" style="margin-left: 5px; cursor:pointer;" @click="rmPartic(index)"></i></span> -->
          <el-tag :key="index"
                  v-for="(item, index) in participant"
                  closable
                  :disable-transitions="false"
                  @close="rmPartic(index)">
            {{item.workerName}}-{{item.idCardNumber}}
          </el-tag>
        </el-form-item>
        <!--      <template v-if="participant.length">-->
        <template>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="发生时间"
                            prop="penaltyDate">
                <el-date-picker v-model="form.penaltyDate"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="事项"
                            prop="penaltyType">
                <el-select v-model="form.penaltyType"
                           placeholder="请选择">
                  <el-option v-for="(item, idx) in PunishmentList"
                             :key="idx"
                             :label="item.title"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="级别"
                            prop="penaltyLevel">
                <el-select v-model="form.penaltyLevel"
                           placeholder="请选择">
                  <el-option v-for="(item, idx) in PunishmentLeval"
                             :key="idx"
                             :label="item.title"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="事件缘由"
                        prop="causesOfEvents">
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入事件缘由"
                      :maxlength="100"
                      v-model="form.causesOfEvents"></el-input>
          </el-form-item>
          <el-form-item label="处理结果"
                        prop="penaltyResult">
            <el-input type="textarea"
                      :rows="4"
                      :maxlength="100"
                      placeholder="请输入处理结果"
                      v-model="form.penaltyResult"></el-input>
          </el-form-item>
          <div class="bottomBtn">
            <el-button size='mini'
                       type="primary"
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
import { PunishmentList, PunishmentLeval } from '../../data'
import workerList from '@/components/workerList/workerList'
export default {
  name: 'punFormWorker',
  components: {
    workerList
  },
  data () {
    return {
      form: {
        prjID: localStorage.getItem('proId'),
        rid: '',
        dataType: '1',
        penaltyDate: '',
        penaltyType: '',
        penaltyLevel: '',
        causesOfEvents: '',
        penaltyResult: ''
      },
      breadcrumbData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/award',
        label: '惩罚记录'
      }, {
        label: '新增工人惩罚记录'
      }],
      rules: {
        rid: [{ required: true, message: '请选择工人', trigger: 'input' }],
        penaltyDate: [{ required: true, message: '请输入发生时间', trigger: 'blur' }],
        penaltyType: [{ required: true, message: '请输入事项', trigger: 'blur' }],
        penaltyLevel: [{ required: true, message: '请输入级别', trigger: 'blur' }],
        causesOfEvents: [{ required: true, message: '请输入事件缘由', trigger: 'blur' }],
        penaltyResult: [{ required: true, message: '请输入处理结果', trigger: 'blur' }]
      },
      participant: [],
      workerData: {},
      PunishmentList,
      PunishmentLeval,
      dialogWorkerTableVisible: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    name () {
      return this.form.name
    }
  },
  watch: {
    participant (val) {
      console.log(val)
      this.form.rid = val.map(val => val.id || val.id).toString()
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
      this.$http.post('/member/penalty/save', this.form).then(res => {
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
      this.$http.post(`/member/penalty/update/${this.id}`, this.form).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.data,
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    },
    addPartic (item) {
      this.participant.push(item)
    },
    rmPartic (index) {
      this.participant.splice(index, 1)
    },
    showSelectWorkerDialog () {
      // this.$getData.workList(this.proId).then(res => {
      //   if (res !== null) {
      //     this.workerList = res
      //   }
      // })
      this.dialogWorkerTableVisible = true
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      let selectVal = JSON.parse(JSON.stringify(val))
      this.addPartic(selectVal)
      this.dialogWorkerTableVisible = false
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    }
  },
  mounted () {
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  created () {
    if (this.id) {
      document.title = '编辑工人惩罚记录'
      this.$http.get(`/member/penalty/details/${this.id}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.form = data
          this.participant = data.workerInfo
        }
      })
    } else {
      document.title = '新增工人惩罚记录'
    }
  }
}
</script>

<style lang="scss" scoped>
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
