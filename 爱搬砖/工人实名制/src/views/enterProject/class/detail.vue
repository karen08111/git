<template>
  <div class="contractors detail-page-style">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :routeName='"/enterProject/class"'>
    </detailHeader>
    <div class="formStyle">
      <el-form label-width="120px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <div class="worker-detail-child-title">
            班组信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="班组编号">
                {{details.id}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="所属参建单位"
                            label-width="140px">
                {{details.corpName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="24"
                    :lg='24'
                    :md="12">
              <el-form-item label="班组名称">
                {{details.teamName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="班组长">
                {{details.leaderName}}{{details.idCardNumber?'身份证号：'+details.idCardNumber:''}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="联系方式"
                            label-width="140px">
                {{details.cellPhone}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="进场时间">
                {{details.einlass}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="退场时间"
                            label-width="140px">
                {{details.walkOff}}
              </el-form-item>
            </el-col>
          </el-row>
          <!--          班组成员-->
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            班组成员
          </div>
          <easyTable :easyTableObj='tableData'
                     :isLoading='isLoading'
                     @tablePaginationChange='tablePaginationChange'>
          </easyTable>
        </div>
        <div class="bottomBtn">
          <!-- <el-button
            type="primary"
            :loading="saveLoading"
            @click="toEdit()"
          >编辑</el-button> -->
          <el-button @click="back()">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
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
      typeOfWork: [],
      tableData: {
        colsTitle: [
          {
            label: '姓名',
            data: 'workerName'
          },
          {
            label: '身份证号',
            data: 'idCardNumber'
          },
          {
            label: '工种',
            data: 'workType'
          },
          {
            label: '进场时间',
            data: 'einlass'
          },
          {
            label: '退场时间',
            data: 'walkOff'
          }
        ],
        cols: [],
        footer: {
          pageSize: 10,
          total: 0
        }
      },
      details: {
      },
      isLoading: false,
      loading: false,
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/class',
        label: '班组管理'
      }, {
        label: '班组详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入参建单位名称', trigger: 'blur' }
        ],
        corpCode: [
          { required: true, message: '请输入统一社会信用码', trigger: 'blur' }
        ],
        enterType: [
          { required: true, message: '请选择参建类型', trigger: 'blur' }
        ],
        pmName: [
          { required: true, message: '请输入项目经理名称', trigger: 'blur' }
        ],
        pmPhone: [
          { required: true, message: '请输入项目经理联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.$http.get('/member/teamclass/details/' + this.$route.params.id).then(res => {
        if (res.data.code === 200) {
          this.details = res.data.data
          this.details.teamclassworkers.map((val) => {
            val.workType = val.workType && this.typeOfWork.find((value) => {
              return value.code === val.workType
            }).title
            if (val.einlass === 0) {
              val.einlass = ''
            }
            if (val.walkOff === 0) {
              val.walkOff = ''
            }
          })
          this.tableData.cols = this.details.teamclassworkers
          this.tableData.footer.total = this.details.teamclassworkers.length
        }
      })
    })
  },
  methods: {
    toEdit () {
      this.$router.push('/enterProject/contract/edit/' + this.$route.params.id)
    },
    back () {
      this.$router.push('/enterProject/class')
    },
    tablePaginationChange () {
      // 不会用上的
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
    .el-row {
      padding: 0;
      border: 1px solid #dddddd;
      border-bottom: 0;
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
