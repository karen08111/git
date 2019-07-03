<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'
                  :routeName='"/company/projects"'
                  :showMenu='true'>
    </detailHeader>
    <div class="formStyle detail-page-style"
         v-loading='!addForm.name'
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading">
      <el-form ref="addForm"
               :model="addForm"
               label-width="0px"
               :rules="rules"
               label-position='left'>
        <div class="worker-detail-style">
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="8">
              <el-form-item>
                项目名称：{{addForm.name}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                项目状态：<span :style="Number(addForm.prjStatus) > 3?'color:orange;' : 'color:green'">{{addForm.prjStatus && projectStatus.find((val) => val.id === addForm.prjStatus).title}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=""
                            label-width="0">
                <el-button v-if="addForm.prjStatus !== '004'"
                           type="primary"
                           size="mini"
                           @click="editProBtnClick">编辑项目</el-button>
                <el-button v-if="addForm.prjStatus !== '001' && addForm.prjStatus !== '002'"
                           type="primary"
                           size="mini"
                           @click="enterProBtnClick">进入项目</el-button>
                <el-button v-if="addForm.prjStatus === '005' || addForm.prjStatus === '003'"
                           type="warning"
                           size="mini"
                           @click="endPro">完工</el-button>
                <el-button v-if="addForm.prjStatus === '005'"
                           type="danger"
                           @click="returnToWorkPro"
                           size="mini">复工</el-button>
                <el-button v-if="addForm.prjStatus === '003'"
                           type="danger"
                           @click="shutDownPro"
                           size="mini">停工</el-button>
                <el-button v-if="addForm.prjStatus === '001' || addForm.prjStatus === '002'"
                           type="primary"
                           size="mini"
                           @click="startPro">开工</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <el-form ref="addForm"
               :model="addForm"
               label-width="200px"
               :rules="rules"
               label-position='left'>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            项目信息
          </div>
          <el-row :gutter="24">
            <el-col :xl="14"
                    :lg='14'
                    :md="14">
              <el-form-item label="项目编号">
                {{addForm.prjAppid}}
              </el-form-item>
            </el-col>
            <el-col :xl="10"
                    :lg='10'
                    :md="10">
              <el-form-item label="项目秘钥">
                {{addForm.prjSecretkey}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xl="14"
                    :lg='14'
                    :md="14">
              <el-form-item label="项目所在地">
                {{addForm.areaCode && addForm.areaCode.map((val) => val.title).join('')}}
              </el-form-item>
            </el-col>
            <el-col :lg='10'
                    :md="10">
              <el-form-item label="项目分类">
                {{addForm.category && projectClass.find((val) => val.id === addForm.category).title}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='14'
                    :md="14">
              <el-form-item label="项目联系人">
                {{addForm.linkMan}}
              </el-form-item>
            </el-col>
            <el-col :lg='10'
                    :md="10">
              <el-form-item label="联系方式"
                            placeholder="请输入项目联系人联系方式">
                {{addForm.linkPhone}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='10'
                    :md="10">
              <el-form-item label="总投资">
                {{addForm.invest || 0}}万元
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='24'
                    :md="24">
              <el-form-item label="施工许可证"
                            class="useGetHeightRef">
                <el-tag v-for="(tag,index) in addForm.builderLicenses"
                        :key="index"
                        @close='onTagClose(index)'
                        class="plusClass"
                        :type="tag.type">
                  {{'工程名称：' + tag.prjName + ', 施工许可证编号：' + tag.builderLicenseNum}}
                </el-tag>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :lg='12'
                    :md="12">
              <el-form-item label="项目简介"
                            class="useGetHeightRef2">
                {{addForm.content}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            建设单位信息
          </div>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :lg='14'
                    :md="14">
              <el-form-item label="建设单位名称">
                {{addForm.buildCorpName}}
              </el-form-item>
            </el-col>
            <el-col :xl="10"
                    :lg='10'
                    :md="10">
              <el-form-item label="统一社会信用码"
                            label-width="160px">
                {{addForm.buildCorpCode}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            项目阶段
          </div>
          <easyTable :easyTableObj='tableData'>
          </easyTable>
          <div class="bottomBtn">
            <!-- <el-button type="primary" @click="toEdit()">编辑</el-button> -->
            <el-button @click="$router.go(-1)">返回</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <el-dialog :title="dialogTit"
               :visible.sync="dialogVisible"
               width="500px"
               class="dialogClass"
               center>
      <el-form :model="dateValue"
               ref='dateValue'
               :rules="dataRules"
               label-width="100px">
        <el-form-item :label="dialogTitlable"
                      prop="time">
          <timeSelect v-model="dateValue.time"></timeSelect>
        </el-form-item>
        <p style="margin-bottom: 22px;
    margin-left: 108px;
    color: #ccc;">{{updateProTip}}</p>
        <el-form-item>
          <el-button style="margin-right:72px"
                     size="mini"
                     type="primary"
                     @click="submitForm()">确定</el-button>
          <el-button size="mini"
                     @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import timeSelect from '@/components/formItems/timeSelect'
import { enterType, natureOfUnit, bankData, projectStatus, projectClass } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader, timeSelect },
  data () {
    return {
      dialogTit: '开工',
      dialogTitlable: '开工时间',
      dialogVisible: false,
      bankData: bankData,
      bankInfo: [],
      dateValue: {
        time: ''
      },
      dataRules: {
        time: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      projectClass: projectClass,
      addForm: {
        bankInfo: []
      },
      formDataOfAddBuilderLicenses: [{
        label: '工程名称',
        type: 'input',
        returns: 'builderLicensesPrjName',
        rules: {
          name: 'builderLicensesPrjName',
          message: '工程名称不能为空'
        }
      }, {
        label: '施工许可证编号',
        type: 'input',
        returns: 'builderLicenseNum',
        rules: {
          name: 'builderLicenseNum',
          message: '施工许可证编号不能为空'
        }
      }],
      tableData: {
        colsTitle: [
          {
            label: '序号',
            data: 'id'
          },
          {
            label: '阶段',
            data: 'state'
          },
          {
            label: '日期',
            width: '120px',
            data: 'time'
          }
        ],
        cols: [],
        footer: {
          layout: '',
          pageSize: 15,
          total: 0
        }
      },
      proState: '',
      updateProTip: '',
      builderLicensesData: [],
      projectStatus: projectStatus,
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/company/projects',
        label: '项目管理'
      }, {
        label: '项目详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择项目分类', trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请选择项目所在地', trigger: 'blur' }
        ],
        prjStatus: [
          { required: true, message: '请选择项目状态', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择开工时间', trigger: 'blur' }
        ],
        linkMan: [
          { required: true, message: '请输入项目联系人', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, message: '请输入项目联系人联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  updated () {
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef2')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef2')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef2')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef2')[0].clientHeight + 'px'
  },
  created () {
    const that = this
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.$http.get('/member/project/details/' + that.$route.params.id).then(res => {
        that.addForm = res.data.data
        that.tableData.cols = that.addForm.state
        let stateArr = {
          1: '开工',
          2: '停工',
          3: '完工',
          4: '复工'
        }
        that.tableData.cols.map((val) => {
          val.state = stateArr[val.state]
        })
      })
    })
  },
  methods: {
    editProBtnClick () {
      this.$router.push('/editPro/' + this.$route.params.id)
    },
    enterProBtnClick () {
      localStorage.setItem('proId', this.$route.params.id)
      this.$router.push('/enterProject')
    },
    toEdit () {
      this.$router.push('/editPro/' + this.$route.params.id)
    },
    // 开工
    startPro () {
      this.proState = 1
      this.dialogTit = '开工'
      this.dialogTitlable = '开工时间'
      this.dialogVisible = true
    },
    // 完工按钮
    endPro () {
      this.proState = 3
      this.dialogTit = '完工'
      this.dialogTitlable = '完工时间'
      this.updateProTip = '完工后，未退场的工人将自动退场'
      this.dialogVisible = true
    },
    // 停工按钮
    shutDownPro () {
      this.proState = 2
      this.dialogTit = '停工'
      this.dialogTitlable = '停工时间'
      this.dialogVisible = true
    },
    // 复工按钮
    returnToWorkPro () {
      this.proState = 4
      this.dialogTit = '复工'
      this.dialogTitlable = '复工时间'
      this.dialogVisible = true
    },
    // 提交状态的修改
    submitForm (val) {
      const that = this
      this.$refs['dateValue'].validate((valid) => {
        let params = {
          prjID: this.$route.params.id,
          state: this.proState,
          time: this.dateValue.time
        }
        if (valid) {
          this.$http.get('/member/project/modifyPrjState', { params: params }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '项目状态已更改',
                type: 'success'
              })
              this.dialogVisible = false
              this.dateValue.time = ''
              that.$http.get('/publicFunction/classify').then(res => {
                that.typeOfWork = res.data.data
                that.$http.get('/member/project/details/' + that.$route.params.id).then(res => {
                  that.addForm = res.data.data
                  that.tableData.cols = that.addForm.state
                  let stateArr = {
                    1: '开工',
                    2: '停工',
                    3: '完工',
                    4: '复工'
                  }
                  that.tableData.cols.map((val) => {
                    val.state = stateArr[val.state]
                  })
                })
              })
            } else {
              this.$message.error('更新项目状态失败：' + res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs['dateValue'].resetFields()
    },
    saveBuilderLicensesData (val) {
      // 保存许可证信息
      this.builderLicensesData.push({
        prjName: val.builderLicensesPrjName,
        builderLicenseNum: val.builderLicenseNum
      })
      this.dialogOfaddBuilderLicenses = false
    },
    onTagClose (i) {
      this.builderLicensesData.splice(i, 1)
    },
    // 添加银行
    addBank () {
      this.addBankDialogVisible = true
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
    submitNewProject (val) {
      // 提交新建项目信息
      this.addForm.builderLicenses = this.builderLicensesData
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.builderLicensesData.length === 0) {
            this.$message({
              message: '添加施工许可证以后才可以提交',
              type: 'warning'
            })
            return false
          }
          this.$http.post('/member/project/save', this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '项目信息保存成功',
                type: 'success'
              })
              this.addDialogVisible = false
              this.refreshList()
            } else {
              this.$notify.error({
                title: '请求失败',
                message: res.data.msg
              })
            }
          })
        }
      })
    },
    // 重置
    resetTable () {
      this.form = {}
      this.refreshList({})
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
.dialogClass {
  :global {
    .el-input {
      width: 100% !important;
    }
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
