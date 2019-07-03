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
          <div class="worker-detail-child-title">
            新增项目培训
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="培训名称">
                {{addForm.trainingName}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="培训类型">
                {{ addForm.trainingType }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="培训日期">
                {{ addForm.trainingDate }}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="培训时长">
                {{ addForm.trainingDuration }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="培训机构">
                {{ addForm.trainingOrg }}
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="培训人">
                {{ addForm.trainer }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="培训地址">
                {{ addForm.trainingAddress }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="培训简述"
                            style="border-bottom:1px solid #ddd"
                            class="useGetHeightRef">
                {{ addForm.description }}
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="参与人员"
                            prop="description"
                            class="useGetHeightRef2"
                            style="border-bottom: 1px solid #dddddd;">
                <el-tag v-for="(item, index) in addForm.workers"
                        :key='item.id'
                        @close="addForm.workers.splice(index, 1)">{{item.workerName}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row> -->
          <div class="worker-detail-style divMargin">
            <div class="worker-detail-child-title">
              参与培训工人
            </div>
            <div style="color:#aaa;height:30px;line-height:30px;">
            </div>
            <!-- 列表 -->
            <el-table :data="addForm.workerLists"
                      style="width: 100%">
              <el-table-column label="工人姓名"
                               width="120"
                               prop="workerName">
              </el-table-column>
              <el-table-column label="身份证号"
                               width="180"
                               prop="idCardNumber">
              </el-table-column>
              <el-table-column label="所属参建单位"
                               prop="corpName">
              </el-table-column>
              <el-table-column label="所属班组"
                               width="180"
                               prop="teamName">
              </el-table-column>
              <el-table-column label="是否合格"
                               prop="isPass"
                               width="140">
              </el-table-column>
              <el-table-column label="培训分数"
                               prop="trainingScore"
                               width="180">
              </el-table-column>
            </el-table>
          </div>
          <div class="bottomBtn">
            <el-button type="primary"
                       size="mini"
                       :loading="saveLoading"
                       @click="toEdit()"
                       v-if="!prjNameExist">修改</el-button>
            <el-button @click="$router.go(-1)"
                       size="mini">返回</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, bankData, trainingTypeCode } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
      routeNameData: '/company/train',
      addBankDialogVisible: false,
      bankData: bankData,
      binkInfo: [],
      rulesOfBank: {
        bankCode: [
          { required: true, message: '请选择银行', trigger: 'blur' }
        ],
        payBankName: [
          { required: true, message: '请输入开户行名称', trigger: 'blur' }
        ],
        bankCardNum: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      },
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
        path: '/enterProjectTarin',
        label: '培训记录'
      }, {
        label: '培训详情'
      }],
      fromRoute: '',
      addBankForm: {
        payBankCardNumber: ''
      },
      prjNameExist: false,
      rules: {
        trainingName: [
          { required: true, message: '请输入培训名称', trigger: 'blur' }
        ],
        trainingTypeCode: [
          { required: true, message: '请选择培训类型', trigger: 'blur' }
        ],
        trainingDate: [
          { required: true, message: '请选择培训日期', trigger: 'blur' }
        ],
        trainingDuration: [
          { required: true, message: '请输入培训时长', trigger: 'blur' }
        ]
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.breadcrumbItemData[1].path = from.path
      if (from.path === '/company/train') {
        vm.prjNameExist = true
      }
    })
  },
  mounted () {
    this.$http.get('/member/projectTrain/details/' + this.$route.params.id).then(res => {
      res.data.data.workerLists.map((val) => {
        if (val.isPass === 1) {
          val.isPass = '合格'
        } else {
          val.isPass = '不合格'
        }
      })
      this.addForm = res.data.data
      this.addForm.trainingType = this.trainingTypeCode.find((value) => {
        return this.addForm.trainingTypeCode === value.id
      })
      this.addForm.trainingDuration = this.addForm.trainingDuration + '小时'
      this.addForm.trainingType = this.addForm.trainingType && this.addForm.trainingType.title
      this.addForm.workers = this.addForm.workers.split(',')
    }).catch(msg => {
    })
  },
  updated () {
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
  },
  methods: {
    // 提交
    toEdit () {
      this.$router.push('/enterProject/trainEdit/' + this.$route.params.id)
    },
    // 重置
    back () {
      this.$router.push('/enterProjectTarin')
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
