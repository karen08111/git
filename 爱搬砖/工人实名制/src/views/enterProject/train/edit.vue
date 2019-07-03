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
          <div class="worker-detail-child-title">
            新增项目培训
          </div>
          <el-row :gutter="24">
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="培训名称"
                            prop="trainingName">
                <el-input v-model="addForm.trainingName"
                          placeholder="请输入培训名称"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="12"
                    :lg='12'
                    :md="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="培训类型"
                            prop="trainingTypeCode">
                <el-select v-model="addForm.trainingTypeCode"
                           placeholder="请选择培训类型">
                  <el-option v-for='item in trainingTypeCode'
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
                    class="el-col-md-12-left">
              <el-form-item label="培训日期"
                            prop="trainingDate">
                <el-date-picker v-model="addForm.trainingDate"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd "
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xl="10"
                    :lg='10'
                    :md="10"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="培训时长"
                            prop="trainingDuration">
                <el-input v-model="addForm.trainingDuration"
                          placeholder="请输入培训时长"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="2"
                    :lg='2'
                    :md="2">
              <p style="line-height:40px">小时</p>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-left">
              <el-form-item label="培训机构"
                            prop="trainingOrg">
                <el-input v-model="addForm.trainingOrg"
                          placeholder="请输入培训机构"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg='12'
                    :md="12"
                    class="el-col-md-12-right">
              <el-form-item label="培训人">
                <el-input v-model="addForm.trainer"
                          placeholder="请输入培训人"
                          :maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="培训地址"
                            prop="trainingAddress">
                <el-input placeholder="请输入培训地址"
                          v-model="addForm.trainingAddress"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="培训简述"
                            prop="description">
                <el-input :rows="3"
                          type="textarea"
                          placeholder="请输入培训简述"
                          v-model="addForm.description"
                          :maxlength="100">a
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="24">
            <el-col :span="24"
                    class="selectFullWidth">
              <el-form-item label="参与人员"
                            prop="workers">
                <el-select v-model="addForm.workers"
                           multiple
                           filterable
                           remote
                           reserve-keyword
                           placeholder="请输入工人姓名"
                           :remote-method="remoteMethod"
                           :loading="searchLoading">
                  <el-option v-for="item in workerList"
                             :key="item.id"
                             :label="item.workerName"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            参与培训工人
          </div>
          <div style="color:#aaa;height:30px;line-height:30px;">
            <div style="display:inline-block;float:right;">
              <el-button type="primary"
                         size='mini'
                         v-if="addForm.workerLists.length<20"
                         @click="showSelectWorkerDialog()">添加</el-button>
              <el-button size='mini'
                         :disabled="!selectRows.length>0"
                         @click="deleteSelectRow">移除</el-button>
            </div>
          </div>
          <!-- 列表 -->
          <el-table :data="addForm.workerLists"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column label="工人姓名"
                             width="120"
                             prop="workerName">
            </el-table-column>
            <el-table-column label="身份证号"
                             width="180"
                             prop="idCardNumber">
            </el-table-column>
            <el-table-column label="所属参建单位"
                             width="180"
                             prop="corpName">
            </el-table-column>
            <el-table-column label="所属班组"
                             width="180"
                             prop="teamName">
            </el-table-column>
            <el-table-column label="是否合格"
                             prop="teamName"
                             width="140">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isPass"
                           active-color="#13ce66"
                           inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="培训分数"
                             prop="trainingScore"
                             width="180">
              <template slot-scope="scope">
                <input class="inputClass"
                       placeholder="请输入工人培训分数"
                       v-model="scope.row.trainingScore" />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteSelect(scope.$index, addForm.workerLists)"
                           type="text"
                           size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 按钮操作栏 -->
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
    <!-- 工人列表 -->
    <el-dialog title="选择工人"
               :visible.sync="dialogWorkerTableVisible"
               width="950px">
      <el-form>
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="所属参建单位:"
                          prop="bcorpID">
              <el-select v-model="searchForm.bcorpID"
                         @change="corpSelectChange"
                         placeholder="请选择">
                <el-option v-for="item in corpArr"
                           :key="item.id"
                           :label="item.corpName"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="所属班组:">
              <el-select v-model="searchForm.teamID"
                         :disabled="!searchForm.bcorpID"
                         placeholder="请选择">
                <el-option v-for="item in teamArr"
                           :key="item.id"
                           :label="item.teamName"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary"
                       :disabled="!searchForm.teamID"
                       @click="searchWorker"
                       size='small'>查询</el-button>
            <el-button plain
                       @click="resetTable"
                       size='small'>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-alert title="选择班组以后才可以进行搜索"
                type="info">
      </el-alert>
      <el-table :data="workerList"
                ref="multipleTable"
                v-loading="wokerLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @select="handleWokerListSelectionChange">
        <el-table-column type='selection'
                         width="55">
        </el-table-column>
        <el-table-column property="workerName"
                         label="工人姓名"
                         width="200"></el-table-column>
        <el-table-column property="idCardNumber"
                         label="身份证号"></el-table-column>
        <el-table-column property="corpName"
                         label="所属参建单位"></el-table-column>
        <el-table-column property="teamName"
                         label="所属班组"
                         width="140px"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="searchWorker"
                       :page-size='15'
                       layout="total, prev, pager, next, jumper"
                       :total="wokerListTotal">
        </el-pagination>
      </div>
      <span class="dialog-footer">
        <el-button @click="dialogWorkerTableVisible=false">{{'取消'}}</el-button>
        <el-button type="primary"
                   @click="dialogOkBtnClick">{{'确定'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, bankData, trainingTypeCode } from '../../data/index'
export default {
  name: 'trainEdit',
  components: { detailHeader },
  data () {
    return {
      addBankDialogVisible: false,
      bankData: bankData,
      binkInfo: [],
      searchLoading: false,
      dialogWorkerTableVisible: false,
      addForm: {
        'projectId': '', // 所属项目id
        'trainingName': '', // 培训名称
        'trainingTypeCode': '', // 培训类型
        'trainingDate': '', // 培训日期
        'trainingDuration': '', // 培训时长
        'trainingOrg': '', // 培训机构
        'trainer': '', // 培训人
        'trainingAddress': '', // 培训地址
        'description': '', // 培训简述
        workerLists: []
      },
      workerList: [],
      wokerLoading: false,
      wokerListTotal: 0,
      trainingTypeCode: trainingTypeCode,
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/enterProjectTarin',
        label: '培训记录'
      }, {
        label: '编辑培训记录'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      workerListReqParams: {
        bcorpID: '',
        prjID: '',
        teamID: '',
        payMonth: '1997-03-09'
      },
      selectRows: [],
      selectWorker: [],
      corpArr: [],
      teamArr: [],
      tableData: [],
      searchForm: {
        bcorpID: '',
        teamID: ''
      },
      choosedWorkerID: [],
      proId: '',
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
        ],
        workers: [
          { required: true, message: '请选择参与培训人员', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/member/projectTrain/details/' + this.$route.params.id).then(res => {
      res.data.data.workerLists.map((val) => {
        if (val.isPass === 1) {
          val.isPass = true
        } else {
          val.isPass = false
        }
      })
      this.addForm = res.data.data
    })
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
    this.proId = localStorage.getItem('proId')
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
  },
  updated () {
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    // 提交
    submitAddForm () {
      if (!this.addForm.workerLists.length > 0) {
        this.$message.error('参与培训人员列表不能为空')
        return
      }
      let isAllVerify = true
      this.addForm.workerLists.map((val) => {
        if (!val.trainingScore) {
          this.$message.error('请输入培训人员的考核分数')
          isAllVerify = false
        }
      })
      if (!isAllVerify) {
        return
      }
      this.addForm.projectId = localStorage.getItem('proId')
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          // this.addForm.workers = this.addForm.workers.join(',')
          this.saveLoading = true
          this.$http.post('/member/projectTrain/update/' + this.$route.params.id, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.saveLoading = false
              this.$router.go(-1)
            }
          })
        }
      })
    },
    // 参建单位选择变化
    corpSelectChange (val) {
      this.addForm.teamID = ''
      let params = {
        'bcorpID': val,
        'prjID': this.proId
      }
      // 获取参建单位列表
      this.$http.get('/member/public/searchClassLists', { params: params }).then(res => {
        this.teamArr = res.data.data
      })
    },
    // 需要修改请求的接口
    showSelectWorkerDialog (val) {
      if (val) {
        this.workerListReqParams.page = val
      } else {
        const that = this
        for (let index = 0; index < this.workerList.length; index++) {
          that.addForm.workerLists.map((value) => {
            if (value.twID === this.workerList[index].twID) {
              this.workerList.splice(index, 1)
              if (index > 0) {
                index = index - 1
              }
            }
          })
        }
        this.dialogWorkerTableVisible = true
      }
    },
    // 按照班组筛选工人
    searchWorker (val) {
      this.wokerLoading = true
      const that = this
      this.searchForm.prjID = this.proId
      if (val) {
        this.searchForm.page = val
      }
      this.$http.get('/member/projectTrain/workerListSave', { params: this.searchForm }).then(res => {
        this.wokerLoading = false
        // this.addForm.workerLists.map((value) => {
        //   let ind = res.data.data.data.findIndex((val) => {
        //     return val.twID === value.twID
        //   })
        //   if (ind > -1) {
        //     res.data.data.data.splice(ind, 1)
        //   }
        // })
        for (let index = 0; index < res.data.data.data.length; index++) {
          that.addForm.workerLists.map((value) => {
            if (value.twID === res.data.data.data[index].twID) {
              res.data.data.data.splice(index, 1)
              if (index > 0) {
                index = index - 1
              }
            }
          })
        }
        this.workerList = res.data.data.data
        this.wokerListTotal = res.data.data.total
      })
    },
    handleSelectionChange (val, index) {
      this.selectRows = val
    },
    // 工人列表多选事件
    handleWokerListSelectionChange (val, index) {
      this.selectWorker = val
    },
    // 确认选择工人的事件
    dialogOkBtnClick () {
      this.selectWorker.map((val) => {
        val.trainingScore = ''
        val.isPass = true
      })
      // 确认选择以后从列表中移除选中的
      this.addForm.workerLists = this.addForm.workerLists.concat(this.selectWorker)
      this.dialogWorkerTableVisible = false
      this.workerList.map((val, index) => {
        this.addForm.workerLists.map((value) => {
          if (val.idCardNumber === value.idCardNumber) {
            this.workerList.splice(index, 1)
          }
        })
      })
      this.selectWorker = []
    },
    deleteSelectRow () {
      const that = this
      this.$confirm('移除后数据将不能恢复，确认移除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // that.addForm.workerLists.map((val, index) => {
        //   that.selectRows.map((value) => {
        //     if (value.twID === val.twID) {
        //       that.addForm.workerLists.splice(index, 1)
        //     }
        //   })
        // })
        for (let index = 0; index < that.addForm.workerLists.length; index++) {
          that.selectRows.map((value) => {
            if (value.twID === that.addForm.workerLists[index].twID) {
              that.addForm.workerLists.splice(index, 1)
              if (index > 0) {
                index--
              }
            }
          })
        }
      }).catch((ms) => {
        console.log(ms)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 移除已添加的
    deleteSelect (index) {
      const that = this
      this.$confirm('移除后数据将不能恢复，确认移除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.addForm.workerLists.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 重置
    resetTable () {
      this.searchForm = {
        bcorpID: '',
        teamID: ''
      }
      this.workerList = []
      this.selectWorker = []
      this.wokerListTotal = 0
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
.dialog-footer {
  margin-top: 14px;
  display: block;
  text-align: center;
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
.inputClass {
  height: 40px;
  border-color: #c0c4cc;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 80%;
  padding-left: 15px;
  padding-right: 20px;
}
.inputClass:focus {
  border-color: #409eff;
  border-radius: 4px;
  outline: 0;
}
</style>
