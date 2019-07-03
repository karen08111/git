<template>
  <div class="contractors">
    <detailHeader :routeName='"/enterProject/seeEnter"'
                  :breadcrumbData='breadcrumbItemData'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="140px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <div class="worker-detail-child-title">
            参建单位信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="参建单位名称"
                            prop="corpName">
                <el-input v-model="addForm.corpName"
                          placeholder="请输入参建单位名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right">
              <el-form-item label="统一社会信用代码"
                            prop="corpCode"
                            label-width="140px">
                <el-input v-model="addForm.corpCode"
                          placeholder="请输入统一社会信用代码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="参建类型"
                            prop="type">
                <el-select v-model="addForm.type"
                           placeholder="请选择参建类型">
                  <el-option v-for="item in enterType"
                             :key="item.id"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="企业性质(M,C)"
                            label-width="140px">
                <el-select v-model="addForm.corpType"
                           placeholder="请选择企业性质">
                  <el-option v-for="item in natureOfUnit"
                             :key="item.id"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="注册地"
                            prop="areaCode">
                <citySelect v-model="addForm.areaCode"
                            @provId="val => addForm.region = val "></citySelect>
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-right">
              <el-form-item label="企业经营地址"
                            prop="trainer">
                <el-input v-model="addForm.address"
                          placeholder="请输入企业经营地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="邮编">
                <el-input v-model="addForm.zipCode"
                          placeholder="请输入邮编"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col
            :lg='12'
            :md="12"
          >
            <el-form-item
              label="企业性质(M,C)"
              label-width="140px"
            >
              <el-select
                v-model="addForm.corpType"
                placeholder="请选择企业性质"
              >
                <el-option
                  v-for="item in natureOfUnit"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            单位联系人信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="项目经理名称"
                            prop="pmName">
                <el-input v-model="addForm.pmName"
                          placeholder="请输入项目经理名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right">
              <el-form-item label="项目经理联系方式"
                            prop="pmPhone"
                            label-width="160px">
                <el-input v-model="addForm.pmPhone"
                          placeholder="请输入项目经理联系方式"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            代发工资银行
          </div>
          <el-form-item label="">
            <p v-for="(tag,index) in addForm.bankInfo"
               :key="index">
              <el-tag closable
                      @close='onTagClose(index)'
                      :type="tag.type">
                {{ tag.payRollBankName + ', ' + tag.payBankName + ', ' + tag.payBankCardNumber}}
              </el-tag>
            </p>
            <el-button class="button-new-tag"
                       size="small"
                       @click="addBank">+ 点击添加</el-button>
          </el-form-item>
          <el-form-item style="margin-left: 305px;"
                        class="btnStyle">
            <el-button type="primary"
                       :loading="saveLoading"
                       @click="submitAddForm('addForm')">保 存</el-button>
            <el-button @click="$router.go(-1)">返 回</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-dialog title="添加代发工资银行"
               :visible.sync="addBankDialogVisible"
               width="500px"
               center>
      <el-form :model="addBankForm"
               status-icon
               :rules="rulesOfBank"
               ref="ruleBankForm"
               label-width="140px">
        <el-form-item label="工资代发银行"
                      prop="payBankCode"
                      class="selectFullWidth">
          <el-select v-model="addBankForm.payBankCode"
                     placeholder="请选择"
                     @change='bankNameChange'>
            <el-option v-for="item in Object.keys(bankData)"
                       :key="item"
                       :label="bankData[item]"
                       :value="bankData[item]">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代发工资卡开户行"
                      prop="payBankName">
          <el-input v-model="addBankForm.payBankName"
                    placeholder="请输入代发工资卡开户行"></el-input>
        </el-form-item>
        <el-form-item label="代发工资卡卡号"
                      prop="payBankCardNumber">
          <el-input v-model="addBankForm.payBankCardNumber"
                    placeholder="请输入代发工资卡卡号"></el-input>
        </el-form-item>
        <div class="btnStyle"
             style="margin-left:75px">
          <el-button type="primary"
                     @click="submitBankForm('ruleForm')">提交</el-button>
          <el-button class="btnStyle"
                     @click="addBankDialogVisible = false">返 回</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import citySelect from '@/components/formItems/citySelect'
import { enterType, natureOfUnit, bankData } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, citySelect },
  data () {
    return {
      addBankDialogVisible: false,
      bankData: bankData,
      bankInfo: [],
      proId: '',
      rulesOfBank: {
        payBankCode: [
          { required: true, message: '请选择银行', trigger: 'change' }
        ],
        payBankName: [
          { required: true, message: '请输入开户行名称', trigger: 'change' }
        ],
        payBankCardNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'change' }
        ]
      },
      addForm: {
        bankInfo: []
      },
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/seeEnter',
        label: '参建单位库'
      }, {
        label: '新建参建单位'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        corpName: [
          { required: true, message: '请输入参建单位名称', trigger: 'change' }
        ],
        corpCode: [
          { required: true, message: '请输入统一社会信用码', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择参建类型', trigger: 'change' }
        ],
        pmName: [
          { required: true, message: '请输入项目经理名称', trigger: 'change' }
        ],
        pmPhone: [
          { required: true, message: '请输入项目经理联系方式', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0] && domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    // 提交添加的银行
    submitBankForm () {
      this.$refs['ruleBankForm'].validate((valid) => {
        if (valid) {
          let centerVal = this.addBankForm.payRollBankName
          this.addBankForm.payRollBankName = this.addBankForm.payBankCode
          this.addBankForm.payBankCode = centerVal
          this.addBankDialogVisible = false
          this.addForm.bankInfo.push(JSON.parse(JSON.stringify(this.addBankForm)))
        } else {
          return false
        }
      })
    },
    // 添加银行
    addBank () {
      this.addBankDialogVisible = true
      this.addBankForm = {}
      setTimeout(_ => {
        this.$refs['ruleBankForm'].clearValidate()
      }, 0)
    },
    // 取消
    onTagClose (val) {
      console.log(val)
      this.addForm.bankInfo.splice(val, 1)
    },
    // 银行信息修改
    bankNameChange () {
      for (let val in this.bankData) {
        if (bankData[val] === this.addBankForm.payBankCode) {
          this.addBankForm.payRollBankName = val
          break
        }
      }
    },
    // 提交
    submitAddForm (val) {
      if (!(this.addForm.bankInfo.length > 0)) {
        this.$message({
          message: '代发工资银行信息不能为空',
          type: 'warning'
        })
        return false
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.saveLoading = true
          this.$http.post('/member/buildCorp/insertNoName/' + this.proId, this.addForm).then(res => {
            if (res && res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.$router.go(-1)
            }
            this.saveLoading = false
          })
        } else {
          return false
        }
      })
    }
    // // 重置
    // resetTable () {
    //   this.form = {}
    //   this.refreshList({})
    // }
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
