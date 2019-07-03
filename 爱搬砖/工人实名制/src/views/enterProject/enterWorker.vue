<template>
  <div class="enterWorker">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">工人花名册</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="120px"
             label-position="left"
             class="searchFormStyle">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="工种">
            <el-radio-group v-model="form.workType"
                            v-if="isShowSimple">
              <el-radio v-for="item in simpleTypeOfWork"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code"
                        class='radioStyle'>{{item.title}}</el-radio>
            </el-radio-group>
            <i v-if="isShowSimple"
               class="el-icon-arrow-down"
               style="color:#008af1;cursor:pointer"
               @click="isShowSimple = false"></i>
            <el-radio-group v-model="form.workType"
                            v-if="!isShowSimple">
              <el-radio v-for="item in typeOfWork"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code"
                        class='radioStyle'>{{item.title}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16">
          <teamSelect v-model="teamSel"></teamSelect>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input v-model="form.idCardNumber"
                      style="width: 200px"
                      placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="form.workerName"
                      style="width: 200px"
                      placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary"
                     @click="searchWorker"
                     size='small'>查询</el-button>
          <el-button plain
                     @click="teamSel={};form={};refresh({})"
                     size='small'>重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="exportExcel">
      <el-button type="success"
                 icon="el-icon-download"
                 :disabled="!delList.length>0"
                 size="mini"
                 @click="exportExcel">导出选中</el-button>
    </div>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
               @tableSelectRowChange="tableSelectRowChange"
               @tablePaginationChange='tablePaginationChange'>
      <el-table-column slot="operation"
                       property="name"
                       width='80px'
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.$index, scope.row)"
                     type="text"
                     size="mini">详情</el-button>
        </template>
      </el-table-column>
    </easyTable>
    <!--
            工人详情
            -->
    <el-dialog title="工人详情"
               width="1100px"
               :visible.sync="detailDialogVisible"
               center>
      <div class="dd">
        <table align="center"
               class="tableClass">
          <tr>
            <td width='30%'
                rowspan="4"
                colspan="2"
                style="text-align:center;"><img class="avatar"
                   :src="workerDetailData.worker.headImage?imgSrcHeader + workerDetailData.worker.headImage:'http://resource.aibanzhuan.cn/rotation/none.png'"
                   alt=""></td>
            <td colspan="2"
                style="font-size:20px;font-weight:600">{{workerDetailData.worker.workerName}}</td>
          </tr>
          <tr>
            <td width='30%'>性别：{{workerDetailData.worker.sex === 1 ? '男' : '女'}}</td>
            <td>年龄：{{workerDetailData.worker.birth && workerDetailData.worker.birth.birthday}}</td>
          </tr>
          <tr>
            <td>所在班组：{{workerDetailData.teamName}}</td>
            <td>工种：{{workerDetailData.worker.workType}}</td>
          </tr>
          <tr>
            <td width='100px'
                colspan="3">身份证号：{{workerDetailData.worker.idCardNumber}}</td>
          </tr>
        </table>
        <h4 align="left"
            style="background: #CCCCCC;">详细信息</h4>
        <table align="center">
          <tr class="miss">
            <td width='30%'>民族：{{workerDetailData.worker.nation}}</td>
            <td>出生日期：{{workerDetailData.worker.birth && workerDetailData.worker.birth.date}}</td>
            <td>联系电话：{{workerDetailData.worker.cellPhone}}</td>
          </tr>
          <tr class="missTwo">
            <td height="30">住址：{{workerDetailData.worker.address}}</td>
          </tr>
          <tr>
            <td v-if="workerDetailData.worker.politicsType">政治面貌：{{politics.find(val => parseInt(val.id) === parseInt(workerDetailData.worker.politicsType)).title }}</td>
            <td height="30">文化程度：{{workerDetailData.worker.cultureLevelType}}</td>
            <td>特长：{{workerDetailData.worker.Specialty}}</td>
          </tr>
          <tr>
            <td>紧急联系人：{{workerDetailData.worker.urgentLinkMan}}</td>
            <td>紧急联系电话：{{workerDetailData.worker.urgentLinkManPhone}}</td>
            <td>
              身份证复印件
              <el-button type="primary"
                         size='mini'
                         v-print="'#print'">打印</el-button>
              <el-button type="primary"
                         size='mini'
                         @click="preview">预览</el-button>
            </td>
          </tr>
        </table>
        <h4 align="left"
            style="background: #CCCCCC;">进退场时间</h4>
        <table align="center"
               width="800">
          <tr>
            <td width='50%'>进场时间：{{getLocalTime(workerDetailData.einlass)}}</td>
            <td width='50%'>退场时间：{{getLocalTime(workerDetailData.walkOff)}}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <el-dialog title="预览"
               :visible.sync="previewDialogVisible"
               width="80%">
      <div id='print'>
        <img class="idCardStyle"
             :src="imgSrcHeader + workerDetailData.worker.positiveIDCardImage" />
        <img class="idCardStyle"
             :src="imgSrcHeader + workerDetailData.worker.negativeIDCardImage" />
      </div>
    </el-dialog>
    <!-- <div id='print'>
  <img class="idCardStyle" :src="workerDetailData.positiveIDCardImage" />
  <img class="idCardStyle" :src="workerDetailData.negativeIDCardImage" />
</div> -->
    <el-dialog title="预览"
               :visible.sync="previewDialogVisible"
               width="80%">
      <div>
        <img class="idCardStyle"
             :src="workerDetailData.positiveIDCardImage" />
        <img class="idCardStyle"
             :src="workerDetailData.negativeIDCardImage" />
      </div>
    </el-dialog>
    <div id='print'>
      <img class="idCardStyle"
           :src="workerDetailData.positiveIDCardImage" />
      <img class="idCardStyle"
           :src="workerDetailData.negativeIDCardImage" />
    </div>
  </div>
</template>

<script>
import { culture, gender, politics } from '../data'
import teamSelect from '@/components/form/teamSelect'
export default {
  name: 'enterWorker',
  components: { teamSelect },
  data () {
    return {
      politics: politics,
      imgSrcHeader: process.env.VUE_APP_baseURL,
      form: {
        workerName: '',
        idCardNumber: '',
        workType: ''
      },
      teamSel: {},
      title: '',
      detailDialogVisible: false,
      isLoading: false,
      selectTypeOfWork: '',
      typeOfWork: [],
      culture: culture,
      delList: [],
      isShowSimple: true,
      simpleTypeOfWork: [],
      gender: gender,
      workerDetailData: { worker: {} },
      previewDialogVisible: false,
      dialogData: {
        data: [[{ '姓名': '王晓' }], [{ '事件类型': '违法乱纪' }], [{ '时效性': '12个月' }], [{ '严重程度': '一般' }], [{ '不良记录原因': '上班喝酒' }, { '备注': '多次违纪' }]],
        dialogVisible: false,
        dialogTitle: '不良记录详情'
      },
      proId: '',
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
            label: '所在班组',
            data: 'teamName'
          },
          {
            label: '进场时间',
            data: 'einlass'
          },
          {
            label: '出场时间',
            data: 'walkOff'
          }
        ],
        type: 'selection',
        cols: [],
        footer: {
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    getLocalTime (nS) {
      if (nS) {
        // return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\s*/, ' ')
        var now = new Date(parseInt(nS) * 1000)
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        var date = now.getDate()
        return year + '-' + month + '-' + date
      } else {
        return ''
      }
    },
    applicationAdded () {
      this.dialogVisible = true
    },
    tableSelectRowChange (val) {
      this.delList = val.map(val => {
        return val.id
      })
    },
    // 导出
    exportExcel () {
      let params = this.delList.join(',')
      window.open(process.env.VUE_APP_baseURL + '/member/teamclassWorkers/excelFileExportWorker?ids=' + params)
    },
    preview () {
      this.previewDialogVisible = true
    },
    handleDialogClose () {
      this.dialogVisible = false
    },
    handleSelectWorkerName () {
      console.log('选择工人姓名')
    },
    handleDetailDialogClose () {
      this.dialogData.dialogVisible = false
    },
    editDetail () {
      this.editDialogData.dialogVisible = false
    },
    // 获取table数据
    refresh (val) {
      this.isLoading = true
      this.$http.get('/member/teamclassWorkers/lists/' + this.proId, { params: val }).then(res => {
        res.data.data.data.map((val, index) => {
          val.workType = this.typeOfWork.find((value) => value.code === val.workType) && this.typeOfWork.find((value) => value.code === val.workType).title
        })
        this.tableData.cols = res.data.data.data.map(val => {
          return {
            ...val,
            walkOff: val.walkOff ? walkOff : ''
          }
        })
        this.isLoading = false
        this.tableData.footer.total = res.data.data.total
        this.tableData.footer.pageSize = res.data.data.per_page
      })
    },
    // 表格页码变化时
    tablePaginationChange (val) {
      this.form.page = val
      this.refresh(this.form)
    },
    // 查看详情
    seeDetail (index, row) {
      this.$router.push('/enterProject/workbook/detail/' + row.id)
    },
    // 查询
    searchWorker () {
      this.form = Object.assign(this.form, this.teamSel)
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = {}
      this.teamSel = {}
      this.refresh()
    }
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.simpleTypeOfWork = JSON.parse(JSON.stringify(res.data.data))
      this.simpleTypeOfWork = this.simpleTypeOfWork.splice(0, 7)
    })
    this.refresh()
  }
}
</script>

<style scoped lang="less">
.enterWorker {
  margin: 16px 24px 24px;
  :global {
    .el-select {
      display: block;
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
.wd {
  /*margin-left: 25px;*/
}
.exportExcel {
  text-align: right;
  margin-bottom: 20px;
}
.miss {
  td {
    width: 25%;
  }
}
.missTwo {
  td {
    width: 30%;
  }
}
.idCardStyle {
  width: 52%;
  margin-left: 20%;
  margin-right: 16px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.radioStyle {
  margin: 10px 24px 10px 0;
}
.avatar {
  width: 100px;
  margin-right: 20px;
}
</style>
