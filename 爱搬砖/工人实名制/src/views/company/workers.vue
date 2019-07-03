<template>
  <div class="enterWorker">
    <el-breadcrumb separator=">"
                   class="breadcrumbStyle">
      <el-breadcrumb-item :to="{ path: '/' }"
                          class="breadcrumbItemStyle">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumbItemStyle">工人库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form"
             :model="form"
             label-width="100px"
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
        <el-col :span="8">
          <el-form-item label="选择项目">
            <el-select v-model="form.prjID"
                       placeholder="请选择"
                       @change="proSelect">
              <el-option v-for="item in proArr"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="secondColStyle">
          <el-form-item label="选择参建单位">
            <el-select :disabled="!form.prjID"
                       v-model="form.bcorpID"
                       placeholder="请选择"
                       @change="corpSelect">
              <el-option v-for="item in corpArr"
                         :key="item.id"
                         :label="item.corpName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="thirdColStyle">
          <el-form-item label="选择班组">
            <el-select :disabled="!form.bcorpID"
                       v-model="form.teamID"
                       placeholder="请选择">
              <el-option v-for="item in teamArr"
                         :key="item.id"
                         :label="item.teamName"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input placeholder="请输入身份证号"
                      v-model="form.idCardNumber"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="secondColStyle">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"
                      v-model="form.workerName"
                      style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="thirdColStyle">
          <div style='text-align:right;margin-right:24px;'>
            <el-button type="primary"
                       @click="searchWorker"
                       size='small'>查询</el-button>
            <el-button plain
                       @click="searchAllWorker"
                       size='small'>重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <easyTable :easyTableObj='tableData'
               :isLoading='isLoading'
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
            <td>民族：{{workerDetailData.worker.nation}}</td>
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
    <!-- <div id='print' style="">
  <img class="idCardStyle" :src="imgSrcHeader + workerDetailData.worker.positiveIDCardImage" />
  <img class="idCardStyle" :src="imgSrcHeader + workerDetailData.worker.negativeIDCardImage" />
</div> -->
  </div>
</template>

<script>
import { culture, gender, politics } from '../data'
export default {
  name: 'enterWorker',
  data () {
    return {
      politics: politics,
      imgSrcHeader: process.env.VUE_APP_baseURL,
      form: {
        prjID: ''
      },
      corpArr: [],
      imgSrc: '',
      previewDialogVisible: false,
      title: '',
      detailDialogVisible: false,
      isLoading: false,
      selectTypeOfWork: '',
      typeOfWork: [],
      culture: culture,
      gender: gender,
      workerDetailData: { worker: {} },
      proId: '',
      teamArr: [],
      proArr: [],
      isShowSimple: true,
      simpleTypeOfWork: [],
      tableData: {
        colsTitle: [
          {
            label: '姓名',
            data: 'workerName',
            width: '120px'
          },
          {
            label: '身份证号',
            data: 'idCardNumber'
          },
          {
            label: '所属项目',
            data: 'prjName'
          },
          {
            label: '所在班组',
            data: 'teamName'
          },
          {
            label: '工种',
            data: 'workType'
          }
        ],
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
      this.$http.get('/member/teamclassWorkers/allLists', { params: val }).then(res => {
        res.data.data.data.map((val, index) => {
          val.workType = this.typeOfWork.find((value) => value.code === val.workType) && this.typeOfWork.find((value) => value.code === val.workType).title
        })
        this.tableData.cols = res.data.data.data
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
    proSelect (val) {
      let params = {
        prjID: val
      }
      this.$http.get('/member/public/searchBCorpLists', { params: params }).then((res) => {
        this.corpArr = res.data.data
      })
    },
    corpSelect (val) {
      let params = {
        prjID: this.form.prjID,
        bcorpID: val
      }
      this.$http.get('/member/public/searchClassLists', { params: params }).then((res) => {
        this.teamArr = res.data.data
      })
    },
    // 查看详情
    seeDetail (index, row) {
      this.$router.push(`/enterProject/worker/detail/${row.id}`)
    },
    // 查询
    searchWorker () {
      this.refresh(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = {}
      this.refresh()
    }
  },
  mounted: function () {
    this.$http.get('/member/project/slectLists').then(res => {
      this.proArr = res.data.data
    })
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.simpleTypeOfWork = JSON.parse(JSON.stringify(res.data.data))
      this.simpleTypeOfWork = this.simpleTypeOfWork.splice(0, 7)
      this.refresh()
    })
  }
}
</script>

<style scoped lang="less">
.enterWorker {
  :global {
    /*.el-select {
        display: block;
      }*/
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
  margin-bottom: 6px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.radioStyle {
  margin: 10px 24px 10px 0;
}
.add {
  text-align: right;
}
.avatar {
  width: 50%;
}
.idCardStyle {
  width: 40%;
  margin-right: 16px;
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
</style>
