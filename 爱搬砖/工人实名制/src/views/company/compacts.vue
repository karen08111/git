<template>
  <div class="badness">
    <el-form ref="form"
             :inline="true"
             :model="form"
             label-width="100px">
      <div>
        <el-row :gutter="24">
          <el-col :xl="6"
                  :md="8">
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名"
                        v-model="form.keywords"></el-input>
            </el-form-item>
            <!--        <el-form-item label="参见单位">-->
            <!--          <el-select v-model="form.bcorpID" placeholder="请选择">-->
            <!--            <el-option :label="item.corpName" :value="item.id" v-for="item in danList" :key="item.id"></el-option>-->
            <!--          </el-select>-->
            <!--        </el-form-item>-->
            <el-form-item label="合同类型">
              <el-select v-model="form.type"
                         placeholder="请选择">
                <el-option :label="item.title"
                           :value="item.id"
                           v-for="item in termOfContract"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="6"
                  :md="8">
            <el-form-item>
              <el-button type="primary"
                         @click="onSubmit(form)"
                         size="mini">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!--      <el-form-item label="班组">-->
      <!--        <el-select v-model="form.teamID" placeholder="请选择">-->
      <!--          <el-option :label="item.teamName" :value="item.id" v-for="item in TeamList" :key="item.id"></el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <!--    <div class="add">-->
    <!--      <el-button type="success" size="mini" @click="add">新增</el-button>-->
    <!--    </div>-->
    <!--    列表-->
    <el-table ref="multipleTable"
              :data="tableData"
              v-loading="loading"
              style="width: 100%">
      <el-table-column label="时间"
                       width="250">
        <template slot-scope="scope">{{ scope.row.startTime+'/'+scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column prop="workerName"
                       label="工人姓名"
                       width="120">
      </el-table-column>
      <el-table-column prop="teamName"
                       label="班组名称"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="corpName"
                       label="企业名称"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="wages"
                       label="工资"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="wages"
                       label="工资"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleDetail(scope.row.id, scope.row)">详情</el-button>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <Page :current_page="current_page"
          :total="total"
          @currentChange="currentChange"
          :per_page="per_page"></Page>
    <!--    详情-->
    <el-dialog title="详情"
               :visible.sync="isShowDetail"
               width="30%"
               :before-close="handleClose">
      <div class="detail">
        <p><span class="label">工人名称：</span>{{enter.workerName}}</p>
        <p><span class="label">身份证号：</span>{{enter.idCardNumber}}</p>
        <p><span class="label">企业名称：</span>{{enter.corpName}}</p>
        <p><span class="label">统一社会信用代码：</span>{{enter.corpCode}}</p>
        <p><span class="label">班组名称：</span>{{enter.teamName}}</p>
        <p><span class="label">工人工资：</span>{{enter.wages}}</p>
        <p v-if="enter.type"><span class="label">合同类型：</span>{{termOfContract.find(val => val.id === parseInt(enter.type)).title}}</p>
        <p><span class="label">合同期限：</span>{{enter.startTime + '-----'+ enter.endTime}}</p>
        <p><span class="label">备注：</span>{{enter.content}}</p>
        <p><span class="label">创建时间：</span>{{enter.create_time}}</p>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShowDetail = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--    新增弹窗-->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="50%"
               :before-close="handleClose">
      <el-form :model="addForm"
               :rules="rules"
               ref="addForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="参建单位">
          <el-select v-model="addForm.bcorpID"
                     placeholder="请选择"
                     @change="pickBcorpId">
            <el-option :label="item.corpName"
                       :value="item.id"
                       v-for="item in danList"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工人列表">
          <el-select v-model="addForm.twID"
                     placeholder="请选择"
                     @change="pickWork">
            <el-option :label="item.workerName"
                       :value="item.id"
                       v-for="item in erList"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="工人">-->
        <!--          <el-select v-model="addForm.twID" placeholder="请选择">-->
        <!--            <el-option label="" :value="item.id" v-for="item in erWork" :key="item.id"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="合同类型">
          <el-select v-model="addForm.type"
                     placeholder="请选择">
            <el-option :label="item.title"
                       :value="item.id"
                       v-for="item in termOfContract"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组">
          <el-select v-model="addForm.teamID"
                     placeholder="请选择">
            <el-option :label="item.teamName"
                       :value="item.id"
                       v-for="item in TeamList"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input placeholder="请输入身份证号"
                    v-model="addForm.idCardNumber"></el-input>
        </el-form-item>
        <el-form-item label="工人工资">
          <el-input placeholder="请输入工人工资"
                    v-model="addForm.wages"
                    style="width: 200px"></el-input> 元/天
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker class="timeSelect"
                          v-model="addForm.startTime"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker class="timeSelect"
                          v-model="addForm.endTime"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同">
          <upload @geveImg="geveImg"></upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input placeholder="请输入备注"
                    type="textarea"
                    v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('addForm')"
                     v-if="!isSet">保存</el-button>
          <el-button type="primary"
                     @click="setForm('addForm')"
                     v-if="!isSet">保存</el-button>
          <!--          <el-button @click="resetForm('addForm')">重置</el-button>-->
          <el-button @click="$router.go(-1)">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { termOfContract } from '../data'
import Page from '@/components/paging/paging'
import upload from '@/components/formItems/smUpload'
export default {
  name: 'contract',
  components: { Page, upload },
  data () {
    return {
      isShowDetail: false,
      dialogVisible: false,
      loading: true,
      proId: '',
      termOfContract: termOfContract,
      form: {},
      TeamList: [],
      danList: [],
      current_page: 1,
      total: '',
      delList: [],
      per_page: '',
      tableData: [],
      selectValue: {},
      enter: {},
      addForm: {},
      rules: {},
      erList: [],
      erWork: {},
      imgs: [],
      isSet: false
    }
  },
  created () {
    // this.proId = localStorage.getItem('proId')
  },
  mounted () {
    this.getList()
    // that.$getData.TeamList(this.proId).then(res => {
    //   that.TeamList = res
    // })
    //  获取参见单位列表
    // that.$http.get('/member/buildCorp/addClassLists/' + this.proId).then(res => {
    //   if (res.data.code === 200) {
    //     that.danList = res.data.data
    //   }
    // })
  },
  watch: {
    form: {
      handler (val) {
        var data = val
        this.current_page = 1
        data.page = 1
        this.selectValue = data
      },
      deep: true
    }
  },
  methods: {
    submitForm (formName) {
      var that = this
      this.isSet = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$http.post('/member/contract/save', that.addForm).then(res => {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.data,
                type: 'success'
              })
              that.dialogVisible = false
              that.selectValue.page = 1
              that.getList()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    geveImg (val) {
      // console.log(val)
      this.addForm.uploadFiles = val[0]
    },
    resetTable () {
      this.form = {}
      this.getList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    pickBcorpId (id) {
      // 获取班组列表
      var that = this
      that.$http.get('/member/contract/bcorpIDGeneratesTWorkerLists/' + id).then(res => {
        if (res.data.code === 200) {
          that.erList = res.data.data
        }
      })
    },
    pickWork (id) {
      // 获取工人
      var that = this
      that.$http.get('/member/contract/tWIDGeneratesTeamClassInfo/' + id).then(res => {
        // console.log(res.data.data)
        if (res.data.code === 200) {
          that.erWork = res.data.data
          this.addForm.idCardNumber = this.erWork.workerInfo.idCardNumber
          this.addForm.teamID = this.erWork.teamInfo.teamID
          this.addForm.teamName = this.erWork.teamInfo.teamName
          // this.addForm.twID = this.erWork.workerInfo.twID
          this.addForm.workerName = this.erWork.workerInfo.workerName
        }
      })
    },
    onSubmit (val) {
      var data = val
      this.current_page = 1
      data.page = 1
      this.selectValue = data
      this.getList()
    },
    handleEdit (id) {
      var that = this
      this.$http.get('/member/contract/details/' + id).then(res => {
        // console.log(res.data.data)
        if (res.data.code === 200) {
          this.dialogVisible = true
          this.enter = res.data.data
          var obj = res.data.data
          that.addForm = {
            bcorpID: obj.bcorpID,
            content: obj.content,
            corpCode: obj.corpCode,
            corpName: obj.corpName,
            endTime: obj.endTime,
            idCardNumber: obj.idCardNumber,
            startTime: obj.startTime,
            teamID: obj.teamID,
            teamName: obj.teamName,
            twID: obj.twID,
            type: obj.type,
            uploadFiles: obj.uploadFiles,
            wages: obj.wages,
            workerName: obj.workerName
          }
          that.isSet = true
        }
      })
    },
    setForm (id) {
      console.log(id)
    },
    getList () {
      var that = this
      this.loading = true
      let val = {}
      val = JSON.stringify(this.form)
      val = JSON.parse(val)
      if (val.type >= 0) {
        val.type = Number(val.type) + 1
      }
      that.$http.get('/member/contract/notPrjIDLists', { params: val }).then(res => {
        if (res.data.code === 200) {
          this.loading = false
          var objs = res.data.data
          that.current_page = objs.current_page
          that.total = objs.total
          that.per_page = objs.per_page
          that.tableData = objs.data
          that.loading = false
        }
      })
    },
    currentChange (val) {
      this.selectValue.page = val
      this.getList()
    },
    // 详情
    handleDetail (id) {
      this.$http.get('/member/contract/details/' + id).then(res => {
        // console.log(res.data.data)
        if (res.data.code === 200) {
          this.isShowDetail = true
          this.enter = res.data.data
        }
      })
    },
    // 新增
    add () {
      // this.pickArr = []
      this.dialogVisible = true
      // this.generateData()
    },
    handleClose (done) {
      done()
    }
  }
}
</script>

<style scoped lang="less">
.badness {
  margin: 16px 24px 24px;
  :global {
    .el-select {
      display: block;
    }
  }
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.detail p {
  line-height: 35px;
  .label {
    display: inline-block;
    width: 140px;
    text-align: right;
    margin-right: 10px;
  }
}
.add {
  text-align: right;
}
</style>
