<template>
  <div class="contractors">
    <detailHeader :routeName='routeNameData'
                  :breadcrumbData='breadcrumbItemData'>
    </detailHeader>
    <div class="formStyle detail-page-style">
      <el-form ref="addForm"
               :model="addForm"
               label-width="120px"
               :rules="rules"
               label-position='left'>
        <div class="worker-detail-style">
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="所属项目"
                            placeholder="点击选择"
                            v-if="prjNameExist">
                {{addForm.prjID}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="参建单位名称"
                            placeholder="点击选择">
                {{addForm.bcorpID}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="处罚开始时间"
                            prop="punishDate">
                {{addForm.punishDate}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="处罚结束时间"
                            prop="punishEDate">
                {{addForm.punishEDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="事件类型"
                            prop="eventType">
                {{addForm.eventType}}
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="严重程度"
                            prop="severity">
                {{addForm.severity}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="不良记录原因"
                            prop="badCause">
                {{addForm.badCause}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="24">
              <el-form-item label="备注"
                            class="useGetHeightRef">
                {{addForm.content}}
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       :loading="saveLoading"
                       @click="toEdit()"
                       size="mini"
                       v-if="!prjNameExist">编辑</el-button>
            <el-button size="mini"
                       @click="back()">返回</el-button>
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
      routeNameData: '/badness/contractorsBadness',
      addBankDialogVisible: false,
      dialogWorkerTableVisible: false,
      rules: {
      },
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
      prjNameExist: false,
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
        path: '/enterProject/workerBadness',
        label: '参建单位不良记录'
      }, {
        label: '参建单位不良记录详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      }
    }
  },
  updated () {
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/member/BcorpBadRecord/details/' + this.$route.params.id).then(res => {
      this.addForm = res.data.data
      this.addForm.eventType = this.addEventType.find((val) => {
        return Number(val.id) === Number(this.addForm.eventType)
      })
      this.addForm.eventType = this.addForm.eventType.title
      this.addForm.severity = this.severity.find((val) => {
        return Number(val.id) === Number(this.addForm.severity)
      })
      this.addForm.severity = this.addForm.severity.title
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.breadcrumbItemData[1].path = from.path
      if (from.path === '/badness/contractorsBadness') {
        vm.prjNameExist = true
      }
    })
  },
  methods: {
    // 提交
    toEdit () {
      this.$router.push('/enterProject/contractorsBadness/edit/' + this.$route.params.id)
    },
    // 重置
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.contractors {
  margin: 0 0 24px;
  :global {
    .el-select {
      display: block;
    }
    .el-row {
      border: 1px solid #dddddd;
      border-bottom: 0;
    }
  }
  h4 {
    margin: 12px 0;
    padding: 8px 10px;
    font-weight: 600;
  }
  td {
    padding: 5px 0;
  }
}
.tableClass {
  width: 100%;
  margin-bottom: 6px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.formStyle {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  color: #333;
  .el-row {
    margin: 0 !important;
  }
}
.formChildTitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}
.photoStyle {
  width: 70%;
  div {
    float: left;
  }
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
.divMargin {
  margin-top: 20px;
}
.elFormItemStyle {
  margin-bottom: 0;
}
.headerStyle {
  width: 1200px;
  display: flex;
  justify-content: space-between;
}
.infoStyle {
  margin-top: 75px;
  width: 30%;
  margin-left: 22px;
  .el-row {
    border: 0;
  }
}
</style>
