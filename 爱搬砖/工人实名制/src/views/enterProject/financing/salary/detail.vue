<template>
  <div class="contractors">
    <detailHeader :breadcrumbData='breadcrumbItemData'>
    </detailHeader>
    <div class="formStyle detail-page-style">
      <el-form ref="addForm"
               :model="addForm"
               label-width="160px"
               label-position="left">
        <div class="worker-detail-style">
          <div class="worker-detail-child-title">
            企业信息
          </div>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="发放工资企业">
                {{addForm.corpName}}
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="社会统一信用代码"
                            label-width="160px">
                {{addForm.corpCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="24">
              <el-form-item label="代发银行"
                            prop="payBankCardNumber">
                {{bankData[addForm.payBankCode]}},{{addForm.payBankName}},{{addForm.payBankCardNumber}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            工资单统一信息
          </div>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left selectFullWidth">
              <el-form-item label="参建单位"
                            prop="bcorpID">
                {{addForm.bcorpID && corpArr.find((val) => val.id == addForm.bcorpID ).corpName}}
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    class="el-col-md-12-right selectFullWidth">
              <el-form-item label="班组"
                            prop="teamID">
                {{addForm.teamID && teamArr.find((val) => val.id == addForm.teamID ) && teamArr.find((val) => val.id == addForm.teamID ).teamName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12"
                    class="el-col-md-12-left">
              <el-form-item label="工资发放月份"
                            prop="payMonth">
                {{addForm.payMonth}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="20">
              <el-form-item label="上传工资发放凭证"
                            label-width="160px"
                            prop="uploadFiles"
                            class="useGetHeightRef2">
                <el-upload class="upload-demo"
                           drag
                           :file-list="addForm.uploadFiles"
                           :action='url'
                           :limit="2"
                           :disabled='true'
                           :on-remove="onRemove"
                           :on-exceed='handleExceed'
                           :on-success="handleSuccess"
                           multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="worker-detail-style divMargin">
          <div class="worker-detail-child-title">
            工人工资单列表
          </div>
          <!-- <div style="color:#aaa;height:30px;line-height:30px;">
            最多同时上传20个工人的工资单，如班组内工人数量较多，请分多次上传
            <div style="display:inline-block;float:right;">
              <el-button type="primary"
                         size='mini'
                         @click="showSelectWorkerDialog()">添加</el-button>
              <el-button size='mini'
                         @click="$router.go(-1)">移除</el-button>
            </div>
          </div> -->
          <easyTable :easyTableObj='tableData'
                     :isLoading='isLoading'
                     @tablePaginationChange='tablePaginationChange'
                     @tableSelectRowChange="selectRowChange">
            <el-table-column slot="operation"
                             property="name"
                             width='100px'
                             label="操作">
              <template slot-scope="scope">
                <!-- <el-button @click="toEdit(scope.$index, scope.row)"
                           type="text"
                           size="small">编辑</el-button> -->
                <el-button @click="seeDetail(scope.$index, scope.row)"
                           size="small"
                           type="text">详情</el-button>
              </template>
            </el-table-column>
          </easyTable>
          <div class="bottomBtn">
            <el-button type="primary"
                       size='mini'
                       @click="toEdit">编辑</el-button>
            <el-button size='mini'
                       @click="$router.go(-1)">返 回</el-button>
          </div>
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
               label-width="125px">
        <el-form-item label="代发银行"
                      prop="payBankCode">
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
        <el-form-item label="开户行"
                      prop="payBankName">
          <el-input v-model="addBankForm.payBankName"
                    :maxlength="20"
                    placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item label="卡号"
                      prop="payBankCardNumber">
          <el-input v-model="addBankForm.payBankCardNumber"
                    :maxlength="20"
                    placeholder="请输入卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitBankForm('ruleForm')">保存</el-button>
          <el-button @click="addBankDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 工人工资 -->
    <!-- 工人工资 -->
    <el-dialog title="工人工资信息"
               :visible.sync="dialogWorkerSalaryVisible"
               width="1000px">
      <div>
        <div class="detail-page-style">
          <div class="worker-detail-child-title">
            工资单信息
          </div>
          <el-form :label-width="workerForm.hasOwnProperty('seeId') ? '140px' : ''"
                   label-position="left">
            <el-row :gutter="24"
                    style="border-bottom:1px solid #ddd">
              <el-col :span="workerForm.hasOwnProperty('seeId') ? 12 : 4"
                      class="itemClass">
                <el-form-item label="姓名">
                  {{workerForm.workerName}}
                </el-form-item>
              </el-col>
              <el-col :span="workerForm.hasOwnProperty('seeId') ? 12 : 7"
                      class="itemClass">
                <el-form-item label="身份证号">
                  {{workerForm.idCardNumber}}
                </el-form-item>
              </el-col>
              <el-col :span="workerForm.hasOwnProperty('seeId') ? 12 : 8"
                      :style="workerForm.hasOwnProperty('seeId') ? 'border-top:1px solid #dddddd;' :''"
                      class="itemClass">
                <el-form-item label="所属参建单位:">
                  {{addForm.bcorpID && corpArr.find((val) => val.id == workerListReqParams.bcorpID ) && corpArr.find((val) => val.id == workerListReqParams.bcorpID ).corpName}}
                </el-form-item>
              </el-col>
              <el-col :span="workerForm.hasOwnProperty('seeId') ? 12 : 5"
                      :style="workerForm.hasOwnProperty('seeId') ? 'border-top:1px solid #dddddd;' :''"
                      class="itemClass">
                <el-form-item label="所属班组:">
                  {{workerForm.teamName}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-form label-width="140px"
                 :rules="workerForm.hasOwnProperty('seeId') ? {} : workerSalaryRules"
                 :model="workerForm"
                 ref="workerSalary"
                 label-position="left">
          <div :class="workerForm.hasOwnProperty('seeId')?'detail-page-style divMargin':'worker-detail-style divMargin'">
            <div class="worker-detail-child-title">
              工资单信息
            </div>
            <el-row :gutter="24">
              <el-col :span="12"
                      class="selectFullWidth">
                <el-form-item label="工人工资卡银行"
                              prop="payRollBankCode"
                              label-width="140px">
                  <el-select v-if="!workerForm.hasOwnProperty('seeId')"
                             v-model="workerForm.payRollBankCode"
                             placeholder="请选择"
                             @change='bankNameChange'>
                    <el-option v-for="item in Object.keys(bankData)"
                               :key="item"
                               :label="bankData[item]"
                               :value="item">
                    </el-option>
                  </el-select>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{bankData[workerForm.payRollBankCode]}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工资卡卡号"
                              prop="payRollBankCardNumber">
                  <el-input v-model="workerForm.payRollBankCardNumber"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            placeholder="请输入工资卡卡号"
                            @change="addFormPayRollBankCardNumberChange"></el-input>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.payRollBankCardNumber}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="开户行名称"
                              prop="payRollBankName">
                  <el-input v-model="workerForm.payRollBankName"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            placeholder="请输入开户行名称"></el-input>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.payRollBankName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工资发放日期"
                              prop="payMonth">
                  <el-date-picker v-model="workerForm.balanceDate"
                                  v-if="!workerForm.hasOwnProperty('seeId')"
                                  type="date"
                                  format='yyyy-MM-dd'
                                  value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.balanceDate}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="workerForm.hasOwnProperty('seeId')?12:10">
                <el-form-item label="出勤天数"
                              prop="days">
                  <el-input v-model="workerForm.days"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            placeholder="请输入出勤天数"
                            :maxlength="10"></el-input>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.showDays}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="2"
                      v-if="!workerForm.hasOwnProperty('seeId')"
                      style="line-height:3">
                天
              </el-col>
              <el-col :span="9">
                <el-form-item label="工作时长"
                              prop="workingHours">
                  <el-input v-model="workerForm.workingHours"
                            placeholder="请输入工作时长"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            :maxlength="10"></el-input>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.showWorkingHours}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="2"
                      v-if="!workerForm.hasOwnProperty('seeId')"
                      style="line-height:3">
                小时
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="21">
                <el-form-item label="应发工资"
                              prop="wagesPayable">
                  <el-input v-model="workerForm.wagesPayable"
                            placeholder="请输入应发工资"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            :maxlength="11"></el-input>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.showWagesPayable}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="2"
                      v-if="!workerForm.hasOwnProperty('seeId')"
                      style="
                            line-height:3">
                元
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="实发工资"
                              prop="realWages">
                  <el-input v-model="workerForm.realWages"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            placeholder="请输入实发工资"
                            :maxlength="12"></el-input>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.showRealWagesTemplate}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="2"
                      v-if="!workerForm.hasOwnProperty('seeId')">
                <div style="line-height:3; white-space: nowrap;">
                  元，<el-checkbox v-if="!workerForm.hasOwnProperty('seeId')"
                               v-model="workerForm.isHadBouns">含奖金</el-checkbox>
                </div>
              </el-col>
              <el-col :span="8"
                      v-if="workerForm.isHadBouns || workerForm.bonus>0">
                <el-form-item prop="bonus"
                              style="margin-left:-120px">
                  <el-input :disabled="!workerForm.realWages"
                            v-model="workerForm.bonus"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            placeholder="请输入奖金"
                            :maxlength="13"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"
                      v-if="workerForm.isHadBouns">
                <div style="line-height:3"
                     v-if="!workerForm.hasOwnProperty('seeId')">
                  元
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12"
                      class="selectFullWidth">
                <el-form-item label="是否为补发"
                              prop="isBackPay">
                  <template v-if="!workerForm.hasOwnProperty('seeId')">
                    <el-radio v-model="workerForm.isBackPay"
                              :label="1">是</el-radio>
                    <el-radio v-model="workerForm.isBackPay"
                              :label="0">否</el-radio>
                  </template>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.isBackPay== 1 ?'是':'否'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="workerForm.isBackPay == 1"
                              label="补发月份"
                              prop="backPayMonth"
                              label-width="140px">
                  <el-date-picker v-model="workerForm.backPayMonth"
                                  v-if="!workerForm.hasOwnProperty('seeId')"
                                  type="month"
                                  format='yyyy-MM'
                                  value-format="yyyy-MM"
                                  placeholder="选择补发月份">
                  </el-date-picker>
                  <span v-if="workerForm.hasOwnProperty('seeId')">{{workerForm.backPayMonth}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24"
                    style="border-bottom:1px solid #ddd">
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input :rows="3"
                            type="textarea"
                            placeholder="请输入备注"
                            v-if="!workerForm.hasOwnProperty('seeId')"
                            v-model="workerForm.content"
                            :maxlength="100">
                  </el-input>
                  <span v-if="!!workerForm.hasOwnProperty('seeId')">{{workerForm.content}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="bottomBtn">
              <el-button size='mini'
                         @click="dialogWorkerSalaryVisible = false; ">返 回</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 工人列表 -->
    <el-dialog title="选择工人"
               :visible.sync="dialogWorkerTableVisible"
               width="800px">
      <el-form>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="所属参建单位:"
                          prop="bcorpID">
              {{workerListReqParams.bcorpID && corpArr.find((val) => val.id == workerListReqParams.bcorpID ).corpName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属参建单位:"
                          prop="bcorpID">
              {{workerListReqParams.teamID && teamArr.find((val) => val.id == workerListReqParams.teamID ) && teamArr.find((val) => val.id == workerListReqParams.teamID ).teamName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="已添加"
                          prop="bcorpID">
              {{addForm.workerLists.length}}/20个工人
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-alert title="点击需要选择的工人列即可选中单个工人。"
                type="info"
                style="margin-top:20px">
      </el-alert>
      <el-table :data="workerList"
                ref="multipleTable"
                v-loading="wokerLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @select="handleWokerListSelectionChange">
        >
        <el-table-column type='selection'
                         width="55">
        </el-table-column>
        <el-table-column property="workerName"
                         label="工人姓名"
                         width="200"></el-table-column>
        <el-table-column property="idCardNumber"
                         label="身份证号"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="showSelectWorkerDialog"
                       :page-size='15'
                       layout="total, prev, pager, next, jumper"
                       :total="wokerListTotal">
        </el-pagination>
      </div>
      <span class="dialog-footer">
        <el-button @click="workerDialogVisible=false">{{'取消'}}</el-button>
        <el-button type="primary"
                   @click="dialogOkBtnClick">{{'确定'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, bankData } from '../../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    var checkBonus = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('奖金金额不能为空'))
      }
      setTimeout(() => {
        if (isNaN(Number(value))) {
          callback(new Error('请输入数字值'))
        } else {
          if (Number(value) > Number(this.addForm.realWages)) {
            callback(new Error('奖金金额不能大于实发工资'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    var checkIsNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        if (isNaN(Number(value))) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      url: process.env.VUE_APP_baseURL + '/uploadContract',
      addBankDialogVisible: false,
      bankData: bankData,
      binkInfo: [],
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
        payRollBankCardNumber: '',
        payRollBankName: '',
        payRollBankCode: '',
        workerLists: []
      },
      list: [],
      dialogWorkerTableVisible: false,
      payRollBankCardNumber: '',
      img: [],
      isLoading: false,
      selectRows: [],
      corpArr: [],
      teamArr: [],
      bankArr: [],
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/enterSalary',
        label: '工资单管理'
      }, {
        label: '工资单详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      proInfo: {
      },
      tableData: {
        colsTitle: [
          {
            label: '工人姓名',
            data: 'workerName'
          },
          {
            label: '身份证号',
            data: 'idCardNumber'
          },
          {
            label: '出勤天数',
            data: 'showDays'
          },
          {
            label: '工作时长',
            data: 'showWorkingHours',
            width: '150px'
          },
          {
            label: '应发工资',
            data: 'showWagesPayable'
          },
          {
            label: '实发工资',
            data: 'showRealWagesTemplate'
          }
        ],
        type: '',
        cols: [],
        footer: {
          pageSize: 10,
          total: 0
        }
      },
      workerList: [],
      workerListReqParams: {
        bcorpID: '',
        payMonth: '',
        prjID: '',
        teamID: ''
      },
      workerForm: {
        payRollBankCardNumber: '',
        payRollBankName: '',
        payRollBankCode: ''
      },
      wokerListTotal: 0,
      selectWorker: [],
      dialogWorkerSalaryVisible: false,
      wokerLoading: false,
      workerDialogVisible: false,
      workerSalaryRules: {
        twID: [
          { required: true, message: '请选择工人', trigger: 'change' }
        ],
        bcorpID: [
          { required: true, message: '请选择参建单位', trigger: 'change' }
        ],
        payBankCardNumber: [
          { required: true, message: '请选择代发银行或添加代发银行', trigger: 'change' }
        ],
        payRollBankCode: [
          { required: true, message: '请选择工人工资卡银行', trigger: 'change' }
        ],
        payRollBankName: [
          { required: true, message: '请输入工人工资卡开户行', trigger: 'change' }
        ],
        payRollBankCardNumber: [
          { required: true, message: '请输入工人工资卡卡号', trigger: 'change' }
        ],
        payMonth: [
          { required: true, message: '请选择工资发放月份', trigger: 'change' }
        ],
        realWages: [
          { required: true, validator: checkIsNumber, trigger: 'change' }
        ],
        isBackPay: [
          { required: true, message: '请选择是否为补发工资', trigger: 'change' }
        ],
        backPayMonth: [
          { required: true, message: '请选择补发工资月份', trigger: 'change' }
        ],
        wagesPayable: [
          { required: true, validator: checkIsNumber, trigger: 'change' }
        ],
        bonus: [
          { required: true, validator: checkBonus, trigger: 'change' }
        ]
      },
      rules: {
        bcorpID: [
          { required: true, message: '请选择参建单位', trigger: 'change' }
        ],
        payBankCardNumber: [
          { required: true, message: '请选择代发银行或添加代发银行', trigger: 'change' }
        ],
        payMonth: [
          { required: true, message: '请选择工资发放月份', trigger: 'change' }
        ],
        uploadFiles: [
          { required: true, message: '请上传工资发放凭证', trigger: 'change' }
        ],
        teamID: [
          { required: true, message: '请选择班组', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'addForm.payMonth': function (val, oldValue) {
      this.workerListReqParams.bcorpID = this.addForm.bcorpID
      this.workerListReqParams.teamID = this.addForm.teamID
      this.workerListReqParams.prjID = this.addForm.prjID
      this.workerListReqParams.payMonth = this.addForm.payMonth
      // this.$http.get('member/payroll/noPayrollWorkerList', { params: this.workerListReqParams }).then(res => {
      //   this.wokerListTotal = res.data.data.total
      //   this.wokerLoading = false
      //   this.workerList = res.data.data.data
      // })
    },
    'addForm.teamID': function (val, oldValue) {
      this.workerListReqParams.bcorpID = this.addForm.bcorpID
      this.workerListReqParams.teamID = this.addForm.teamID
      this.workerListReqParams.prjID = this.addForm.prjID
      this.workerListReqParams.payMonth = this.addForm.payMonth
    },
    'addForm.payBankCardNumberidx': function (val) {
      this.addForm.payBankCardNumber = this.bankArr[val].payBankCardNumber
      this.addForm.payBankCode = this.bankArr[val].payBankCode
      this.addForm.payBankName = this.bankArr[val].payBankName
    },
    'tableData.cols': function (val) {
      val.map((value) => {
        value.showDays = value.days && value.days + '天'
        value.showWorkingHours = value.workingHours && value.workingHours + '小时'
        value.showWagesPayable = value.wagesPayable && value.wagesPayable + '元'
        value.showRealWagesTemplate = value.realWagesTemplate && value.realWagesTemplate + '元'
      })
    },
    'addForm.bcorpID': function (val) {
      this.teamID = ''
      let params = {
        'bcorpID': val,
        'prjID': this.proId
      }
      // 获取参建单位列表
      this.$http.get('/member/public/searchClassLists', { params: params }).then(res => {
        this.teamArr = res.data.data
      })
    }
    // 'addForm.teamID': function (val, oldValue) {
    //   console.log(val)
    // }
    // 'addForm.bcorpID': function (val, oldValue) {
    //   console.log(val)
    // }
    // 'addForm.bcorpID': function (val, oldValue) {
    //   console.log(val)
    // }
  },
  updated () {
    document.body.getElementsByClassName('useGetHeightRef2')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef2')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef2')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef2')[0].clientHeight + 'px'
  },
  mounted () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('member/payroll/insertDetails/' + this.proId).then(res => {
      this.proInfo = res.data.data
      if (typeof (res.data.data.bankInfo) !== 'string') {
        this.bankArr = res.data.data.bankInfo
      } else {
        this.bankArr = []
      }
      // 获取工资单详情
      this.$http.get('/member/payroll/details/' + this.$route.params.id).then(res => {
        this.addForm = Object.assign(res.data.data.corpInfo, res.data.data.workerInfo)
        this.addForm.workerLists = res.data.data.payrollList
        this.list = JSON.parse(JSON.stringify(this.addForm.uploadFiles))
        this.addForm.uploadFiles = this.addForm.uploadFiles.map(v => {
          return {
            url: v,
            name: v && v.replace(/^\/uploads\/contract\/20190614\//, '')
          }
        })
        this.bankArr.map((val, ind) => {
          if (val.payBankCardNumber === this.addForm.payBankCardNumber) {
            this.addForm.payBankCardNumberidx = ind
          }
        })
        this.tableData.cols = JSON.parse(JSON.stringify(this.addForm.workerLists))
        this.tableData.cols.map((val) => {
          if (val.bonus > 0) {
            val.realWagesTemplate = val.realWages + '（含奖金' + val.bonus + '）'
          } else {
            val.realWagesTemplate = val.realWages
          }
        })
        this.tableData.footer.total = this.addForm.workerLists.length
        this.tableData.footer.total = this.addForm.workerLists.length
        console.log(this.addForm)
      })
    })
    this.addForm.prjID = this.proId
    this.$http.get('/member/public/searchBCorpLists', { params: { 'prjID': this.proId } }).then(res => {
      this.corpArr = res.data.data
    })
    let domArr = document.getElementsByClassName('el-form-item')
    for (let index = 0; index < domArr.length; index++) {
      if (!domArr[index].classList.contains('is-required')) {
        domArr[index].getElementsByClassName('el-form-item__label')[0] && domArr[index].getElementsByClassName('el-form-item__label')[0].classList.add('notIsRequired')
      }
    }
  },
  methods: {
    // 打开选择工人列表的dialog
    showSelectWorkerDialog (val) {
      if (val) {
        this.workerListReqParams.page = val
      } else {
        this.dialogWorkerTableVisible = true
      }
      this.workerListReqParams.bcorpID = this.addForm.bcorpID
      this.workerListReqParams.teamID = this.addForm.teamID
      this.workerListReqParams.prjID = this.addForm.prjID
      this.workerListReqParams.payMonth = this.addForm.payMonth
      this.wokerLoading = true
      this.$http.get('member/payroll/noPayrollWorkerList', { params: this.workerListReqParams }).then(res => {
        this.wokerListTotal = res.data.data.total
        this.wokerLoading = false
        this.workerList = res.data.data.data
      })
    },
    // 添加银行
    addCorpBank () {
      this.addBankDialogVisible = true
      this.addBankForm = {}
      setTimeout(_ => {
        this.$refs['ruleBankForm'].clearValidate()
      }, 0)
    },
    onRemove (file, fileList) {
      this.list.splice((this.list.findIndex((val) => {
        return val === file.response.data.path
      })), 1)
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.list.push(response.data.path)
      } else {
        fileList.pop()
        this.$message.error(response.msg)
      }
      // let list = JSON.parse(JSON.stringify(this.list))
      // this.addForm.uploadFiles = list.join(',')
      // let uploadFilesObj = {}
      // this.addForm.uploadFiles.split(',').map((val, index) => {
      //   uploadFilesObj[index] = val
      // })
      // this.addForm.uploadFiles = uploadFilesObj
    },
    handleExceed (files, fileList) {
      this.$message({
        message: '最多只能上传两条数据',
        type: 'warning'
      })
    },
    corpChange (val) {
      this.$http.get('/member/buildCorp/getCorpBankInfo/' + val).then(res => {
        if (typeof (res.data.data.bankInfo) !== 'string') {
          this.bankArr = res.data.data.bankInfo
        } else {
          this.bankArr = []
        }
      })
    },
    // 工资单列表
    tablePaginationChange (val) {
      this.workerListReqParams.page = val
      this.refresh(this.form)
    },
    refresh (val) {
      this.isLoading = true
      this.$http.get('member/payroll/noPayrollWorkerList', { params: this.workerListReqParams }).then(res => {
        this.isLoading = false
      })
    },
    selectRowChange (val) {
      this.selectRows = val
    },
    // 确认选择工人的事件
    dialogOkBtnClick () {
      // 获取工人的班组信息
      this.$http.get('/member/payroll/tWIDGeneratesTeamClassInfo/' + this.selectWorker.twID).then(res => {
        this.workerForm.payRollBankCardNumber = res.data.data.workerInfo.bankID // 获取工人的默认银行卡号
        this.workerForm.payRollBankName = res.data.data.workerInfo.openBank // 获取工人的默认银行卡开户行
        this.workerForm.payRollBankCode = res.data.data.workerInfo.bankCode // 获取工人的默认银行卡开户行
      })
      Object.assign(this.workerForm, this.selectWorker)
      this.dialogWorkerSalaryVisible = true
    },
    // 编辑工人工资单
    toEdit () {
      this.$router.push('/enterProject/financing/salary/edit/' + this.$route.params.id)
    },
    seeDetail (index, row) {
      this.workerForm = row
      this.workerForm.seeId = index
      this.dialogWorkerSalaryVisible = true
    },
    // 工人列表多选事件
    handleWokerListSelectionChange (val, index) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(val[val.length - 1])
      this.selectWorker = val[val.length - 1]
    },
    handleSelectWorkerDialogClose () {
      this.dialogWorkerTableVisible = false
    },
    addFormPayRollBankNameChange (val) {
      this.addForm.payRollBankName = val
    },
    addFormPayRollBankCardNumberChange (val) {
      this.addForm.payRollBankCardNumber = val
    },
    geveImg (val) {
      this.addForm.uploadFiles = val[0]
    },
    // 提交添加的银行
    submitBankForm () {
      this.$refs['ruleBankForm'].validate((valid) => {
        if (valid) {
          let centerVal = this.addBankForm.payRollBankName
          this.addBankForm.payRollBankName = this.addBankForm.payBankCode
          this.addBankForm.payBankCode = centerVal
          this.addBankDialogVisible = false
          this.addForm.bankInfo = this.bankArr
          this.addForm.bankInfo.push(this.addBankForm)
          let params = {
            bankInfo: this.addForm.bankInfo
          }
          this.$http.post('/member/company/updateBankInfo/' + this.proId, params).then((res) => {
          })
        } else {
          return false
        }
      })
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
    // 提交工人工资单
    submitAddWorkerForm () {
      this.dialogWorkerTableVisible = false
      this.$refs['workerSalary'].validate((valid) => {
        if (valid) {
          // Object.assign(this.workerForm, this.selectWorker)
          if (this.workerForm.hasOwnProperty('selectId')) {
            this.addForm.workerLists[this.workerForm.selectId] = JSON.parse(JSON.stringify(this.workerForm))
          } else {
            this.addForm.workerLists.push(JSON.parse(JSON.stringify(this.workerForm)))
            this.tableData.cols = this.addForm.workerLists
          }
          this.dialogWorkerSalaryVisible = false
          this.workerForm = { payRollBankCardNumber: '',
            payRollBankName: '',
            payRollBankCode: '' }
        } else {
          console.log('提交失败')
          return false
        }
      })
    },
    // 提交
    submitAddForm () {
      this.addForm.uploadFiles = this.list
      this.addForm.uploadFiles = this.addForm.uploadFiles.join(',')
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$http.post('/member/payroll/update/' + this.$route.params.id, this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.$router.push('/enterProject/enterSalary')
            } else {
              this.$message.error('保存失败：' + res.data.msg)
            }
          })
        } else {
          console.log('保存失败')
          return false
        }
      })
    },
    // 参建单位选择变化
    corpSelectChange (val) {
      this.teamID = ''
      let params = {
        'bcorpID': val,
        'prjID': this.proId
      }
      // 获取参建单位列表
      this.$http.get('/member/public/searchClassLists', { params: params }).then(res => {
        this.teamArr = res.data.data
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
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .upload-demo {
      padding-bottom: 20px;
      padding-top: 20px;
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
.worker-detail-child-title {
  font-size: 18px;
  padding-left: 10px;
  color: #333333;
  line-height: 18px;
  margin-bottom: 20px;
  font-family: "PingFang-SC-Bold";
  border-left: 4px solid #008af1;
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

<style lang='less'>
.useGetHeightRef2 {
  .el-upload-dragger {
    display: none;
  }
}
</style>
