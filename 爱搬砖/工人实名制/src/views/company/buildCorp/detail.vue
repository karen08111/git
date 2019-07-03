<template>
  <div class="contractors detail-page-style">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :routeName='"/company/contractors"'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="200px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <div class="worker-detail-child-title">
            参建单位信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="参建单位名称"
                            class="elFormItemStyle">
                {{addForm.corpName}}
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="统一社会信用代码">
                {{addForm.corpCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="24"
                    :lg='24'
                    :md="12">
              <el-form-item label="参建类型">
                {{addForm.type}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12">
              <el-form-item label="注册地"
                            prop="areaCode">
                {{addForm.areaCode}}
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="企业经营地址"
                            prop="trainer">
                {{addForm.address}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="邮编">
                {{addForm.zipCode}}
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="企业性质(M,C)">
                {{addForm.corpType}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            单位联系人信息
          </div>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :lg='12'>
              <el-form-item label="项目经理名称">
                {{addForm.pmName}}
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="项目经理联系方式">
                {{addForm.pmPhone}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            代发工资银行
          </div>
          <el-form-item label="">
            <el-tag v-for="(tag,index) in addForm.bankInfo"
                    :key="index"
                    @close='onTagClose(index)'
                    class="plusClass"
                    :type="tag.type">
              {{ (tag.payRollBankName ? tag.payRollBankName + ', ' : '') + tag.payBankName + ', ' + tag.payBankCardNumber}}
            </el-tag>
          </el-form-item>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            工程业绩
          </div>
          <easyTable :easyTableObj='tableData'
                     :isLoading='isLoading'
                     @tablePaginationChange='tablePaginationChange'>
          </easyTable>
        </div>
        <div class="bottomBtn">
          <el-button type="primary"
                     @click="toEdit()"
                     size="mini">编辑</el-button>
          <el-button size="mini"
                     @click="back()">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, bankData } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
      addBankDialogVisible: false,
      bankData: bankData,
      binkInfo: [],
      isLoading: false,
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
      tableData: {
        colsTitle: [
          {
            label: '工程名称',
            data: 'name'
          },
          {
            label: '总承包公司',
            data: 'contractorCorpName'
          },
          {
            label: '进场时间',
            data: 'einlass'
          },
          {
            label: '退场时间',
            data: 'einlass'
          }
        ],
        cols: [],
        footer: {
          layout: ''
        }
      },
      addForm: {
        binkInfo: []
      },
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/company/contractors',
        label: '参建单位库'
      }, {
        label: '参建单位详情'
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
    this.$http.get('/member/company/details/' + this.$route.params.id).then(res => {
      // console.log(res.data.data)
      if (res.data.code === 200) {
        this.addForm = res.data.data
        this.addForm.type = this.enterType.find((val) => {
          return val.id === this.addForm.type
        })
        this.addForm.type = this.addForm.type && this.addForm.type.title
        this.addForm.corpType = this.natureOfUnit.find((val) => {
          return Number(val.id) === Number(this.addForm.corpType)
        })
        this.addForm.corpType = this.addForm.corpType && this.addForm.corpType.title
        let addre = ''
        if (this.addForm.areaCode.length > 0) {
          this.addForm.areaCode.map((val) => {
            addre = addre + (val && val.title)
          })
        }
        this.tableData.cols = this.addForm.jobCase
        this.addForm.areaCode = addre
      }
    })
  },
  methods: {
    toEdit () {
      this.$router.push('/builCorp/edit/' + this.$route.params.id)
    },
    back () {
      this.$router.push('/company/contractors')
    },
    tablePaginationChange () {
      // ss
    }
  }
}
</script>

<style scoped lang="less">
.button-new-tag {
  margin: 8px 8px 0 0;
}
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
