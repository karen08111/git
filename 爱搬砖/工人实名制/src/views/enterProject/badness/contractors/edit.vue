<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="120px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="参建单位名称"
                            prop="bcorpID"
                            placeholder="点击选择">
                {{addForm.bcorpID}}
                <!-- <el-select
                v-model="addForm.bcorpID"
                placeholder="请选择参建单位"
              >
                <el-option
                  v-for='item in corpArr'
                  :key='item.id'
                  :label="item.corpName"
                  :value='item.id'
                ></el-option>
              </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="事件类型"
                            prop="eventType">
                <el-select v-model="addForm.eventType"
                           placeholder="请选择事件类型">
                  <el-option v-for='item in addEventType'
                             :key='item.id'
                             :label="item.title"
                             :value='item.id'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="严重程度"
                            prop="severity">
                <el-select v-model="addForm.severity"
                           placeholder="请选择事件类型">
                  <el-option v-for='item in severity'
                             :key='item.id'
                             :label="item.title"
                             :value='item.id'></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="处罚开始时间"
                            prop="punishDate">
                <el-date-picker v-model="addForm.punishDate"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd "
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="处罚结束时间"
                            prop="punishEDate">
                <el-date-picker v-model="addForm.punishEDate"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd "
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="不良记录原因"
                            prop="badCause">
                <el-input :rows="3"
                          type="textarea"
                          placeholder="请输入不良记录原因"
                          :maxlength="100"
                          v-model="addForm.badCause">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input :rows="3"
                          type="textarea"
                          placeholder="请输入备注"
                          :maxlength="100"
                          v-model="addForm.content">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       size='mini'
                       :loading="saveLoading"
                       @click="submitAddForm('addForm')">保存</el-button>
            <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
            <el-button size='mini'
                       @click="$router.go(-1)">返 回</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, trainingTypeCode } from '../../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
      addBankDialogVisible: false,
      dialogWorkerTableVisible: false,
      rules: {
        bcorpID: [
          { required: true, message: '请选择参建单位', trigger: 'blur' }
        ],
        eventType: [
          { required: true, message: '请选择事件类型', trigger: 'change' }
        ],
        punishDate: [
          { type: 'string', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        punishEDate: [
          { type: 'string', required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        severity: [
          { required: true, message: '请选择事件严重程度', trigger: 'change' }
        ],
        badCause: [
          { required: true, message: '请输入不良记录原因', trigger: 'change' }
        ]
      },
      corpArr: [],
      addEventType: [{
        id: 1,
        title: '违法乱纪'
      }, {
        id: 2,
        title: '不服从项目管理'
      }, {
        id: 3,
        title: '违章操作'
      }, {
        id: 4,
        title: '违反道德规范'
      }],
      severity: [
        {
          id: 0,
          title: '一般'
        },
        {
          id: 1,
          title: '严重'
        },
        {
          id: 2,
          title: '非常严重'
        }
      ],
      addForm: {
      },
      trainingTypeCode: trainingTypeCode,
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/contractorsBadness',
        label: '参建单位不良记录'
      }, {
        label: '编辑参建单位不良记录'
      }],
      addBankForm: {
        payBankCardNumber: ''
      }
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/member/buildCorp/addContractLists/' + this.proId).then(res => {
      this.corpArr = res.data.data
    })
    this.$http.get('/member/BcorpBadRecord/details/' + this.$route.params.id).then(res => {
      this.addForm = res.data.data
      this.addForm.eventType = Number(this.addForm.eventType)
      this.addForm.severity = Number(this.addForm.severity)
    })
    this.proId = localStorage.getItem('proId')
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    // 打开选择工人列表的dialog
    showSelectWorkerDialog () {
      // this.$getData.workList(this.proId).then(res => {
      //   console.log(res)
      //   if (res !== null) {
      //     this.workerList = res
      //   }
      // })
      this.dialogWorkerTableVisible = true
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      console.log(val)
      this.selectWorker = val
      this.addForm.twID = val.workerName
      this.addForm.corpName = val.corpName
      this.addForm.idCardNumber = val.idCardNumber
      this.addForm.teamName = val.teamName
      this.dialogWorkerTableVisible = false
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    // 提交
    submitAddForm () {
      this.addForm.prjID = localStorage.getItem('proId')
      if (this.corpArr.find((val) => val.corpName === this.addForm.bcorpID)) {
        this.addForm.bcorpID = this.corpArr.find((val) => val.corpName === this.addForm.bcorpID).id
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.saveLoading = true
          this.$http.post('/member/BcorpBadRecord/update/' + this.$route.params.id, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.$router.go(-1)
            } else {
              this.$message.error('修改失败：' + res.data.msg)
            }
            this.saveLoading = false
          })
        }
      })
    },
    // 重置
    resetTable () {
      this.addForm = {}
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
