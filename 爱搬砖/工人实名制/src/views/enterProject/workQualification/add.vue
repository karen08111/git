<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle">
      <el-form ref="addForm"
               :model="addForm"
               label-width="140px"
               :rules="rules"
               label-position="left">
        <div class="worker-detail-style">
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="工人姓名"
                            prop="twID">
                <el-input placeholder="点击选择工人"
                          v-model="addForm.twID"
                          @focus="showSelectWorkerDialog"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号："
                            prop="idCardNumber"
                            class="el-col-md-12-right">
                {{addForm.idCardNumber || '（选择工人以后显示）'}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="所属参建单位："
                            prop="corpName"
                            class="el-col-md-12-left">
                {{addForm.corpName || '（选择工人以后显示）'}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班组："
                            prop="teamName"
                            class="el-col-md-12-right">
                {{addForm.teamName || '（选择工人以后显示）'}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <aptitude :isRequire="true"
                      :startCheck='isStartCheck'
                      v-model="aptitude"></aptitude>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="证书等级"
                            prop="credentialLevelType">
                <el-select v-model="addForm.credentialLevelType"
                           placeholder="请选择证书等级">
                  <el-option v-for="item in professionalArr"
                             :key="item.id"
                             :label="item.title"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right">
              <el-form-item label="证书名称"
                            prop="certificationName">
                <el-input v-model="addForm.certificationName"
                          placeholder="请输入证书名称"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="证书编号"
                            prop="certificationCode">
                <el-input v-model="addForm.certificationCode"
                          placeholder="请输入证书编号"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right">
              <el-form-item label="发证机关"
                            prop="grantOrg">
                <el-input v-model="addForm.grantOrg"
                          placeholder="请输入发证机关"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="证书有效时间"
                            prop="time">
                <el-date-picker v-model="addForm.time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format='yyyy-MM-dd'
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="资质图片"
                            label-width="140px"
                            prop="certificationImage">
                <smUpload v-model="addForm.certificationImage"
                          @geveImg='geveImg'
                          :imgs="img"></smUpload>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button type="primary"
                       size="mini"
                       @click="submitAddForm('addForm')">保存</el-button>
            <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
            <el-button size="mini"
                       @click="$router.go(-1)">返 回</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <workerList :dialogVisible='dialogWorkerTableVisible'
                @handleTableCurrentChange="handleCurrentChange"
                @handleDialogClose="handleSelectWorkerDialogClose"></workerList>
  </div>
</template>

<script>
import workerList from '@/components/workerList/workerList'
import detailHeader from '@/components/detailHeader'
import smUpload from '@/components/formItems/smUpload'
import aptitude from '@/components/form/aptitude'
import { enterType, natureOfUnit, bankData, termOfContract } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, workerList, smUpload, aptitude },
  data () {
    return {
      addBankDialogVisible: false,
      bankData: bankData,
      termOfContract: termOfContract,
      binkInfo: [],
      aptitude: {},
      isStartCheck: false,
      addForm: {
        certificationImage: ''
      },
      professional: {
        '1': [
          { id: '01', title: '初级职称' },
          { id: '02', title: '中级职称' },
          { id: '03', title: '高级职称' }
        ],
        '33': [
          { id: '01', title: '普通' },
          { id: '02', title: '初级工' },
          { id: '03', title: '中级工' },
          { id: '04', title: '高级工' },
          { id: '05', title: '技师' },
          { id: '06', title: '高级技师' }
        ]
      },
      dialogWorkerTableVisible: false,
      img: [],
      professionalArr: [],
      corpArr: [],
      bankArr: [],
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/workQualification',
        label: '工人资质'
      }, {
        label: '添加工人资质'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        certificationName: [
          { required: true, message: '请输入证书名称', trigger: 'change' }
        ],
        credentialLevelType: [
          { required: true, message: '请选择证书等级', trigger: 'change' }
        ],
        certificationCode: [
          { required: true, message: '请输入证书编号', trigger: 'change' }
        ],
        grantOrg: [
          { required: true, message: '请输入发证机关', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择证书有效时间', trigger: 'change' }
        ],
        certificationImage: [
          { required: true, message: '请上传资质图片', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    aptitude: {
      handler (val) {
        this.professionalArr = this.professional[val.certificationCategoriesType]
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/cardInfo/lists').then(res => {
      this.bankArr = res.data.data
    })
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
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
      this.dialogWorkerTableVisible = true
    },
    // 工人列表的选择事件
    handleCurrentChange (val) {
      this.selectWorker = val
      this.addForm.twID = val.workerName
      this.addForm.idCardNumber = val.idCardNumber
      this.addForm.corpName = val.corpName
      // 获取工人的班组信息
      this.$http.get('/member/payroll/tWIDGeneratesTeamClassInfo/' + this.selectWorker.id).then(res => {
        this.addForm.teamName = res.data.data.teamInfo.teamName
        this.addForm.teamID = res.data.data.teamInfo.teamID
        this.addForm.bcorpID = res.data.data.teamInfo.bcorpID
        this.dialogWorkerTableVisible = false
        this.$nextTick(() => {
          this.$refs['addForm'].clearValidate(('twID'))
        })
      })
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    geveImg (val) {
      this.addForm.certificationImage = val[0]
    },
    // 提交
    submitAddForm () {
      Object.assign(this.addForm, this.aptitude)
      if (this.addForm.time) {
        this.addForm.validBeginDate = this.addForm.time[0]
        this.addForm.validEndDate = this.addForm.time[1]
      }
      this.isStartCheck = true
      if (this.addForm.certificationProfessional) {
        this.isStartCheck = false
      } else {
        return false
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.prjID = this.proId
          this.addForm.twID = this.selectWorker.id
          this.addForm.workerName = this.selectWorker.workerName
          this.$http.post('/member/workerCredential/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '保存修改成功',
                type: 'success'
              })
              this.$router.push('/enterProject/workQualification')
            } else {
              this.$message.error('保存失败：' + res.data.msg)
            }
          })
        } else {
          return false
        }
      })
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
