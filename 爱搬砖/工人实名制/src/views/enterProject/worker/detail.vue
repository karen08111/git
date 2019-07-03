<template>
  <div class="contractors">
    <detailHeader v-if="isShowMenu"
                  :breadcrumbData='breadcrumbItemData'
                  :routeName='routeNameData'>
    </detailHeader>
    <div class="formStyle"
         v-if="workerDetailData.data"
         element-loading-text="拼命加载中">
      <div class="dd">
        <el-form label-width="100px"
                 label-position="left">
          <div class="workerd-detail-style">
            <div class="worker-detail-child-title">
              工人详情
            </div>
            <div class="headerStyle">
              <div class='photoStyle'>
                <div style="width:180px;height:180px;text-align:center">
                  <img class="avatar"
                       :src="workerDetailData.data.headImage?baseUrl + workerDetailData.data.headImage:'http://resource.aibanzhuan.cn/rotation/none.png'"
                       alt="" />
                </div>
                <div style="width:300px;height:180px;margin-left:20px;text-align:center">
                  <img class="avatar"
                       :src="workerDetailData.data.positiveIDCardImage?baseUrl + workerDetailData.data.positiveIDCardImage:'http://resource.aibanzhuan.cn/rotation/none.png'"
                       alt="" />
                </div>
                <div style="width:300px;height:180px;margin-left:20px;text-align:center">
                  <img class="avatar"
                       :src="workerDetailData.data.negativeIDCardImage?baseUrl + workerDetailData.data.negativeIDCardImage:'http://resource.aibanzhuan.cn/rotation/none.png'"
                       alt="" />
                </div>
              </div>
              <div class='infoStyle'>
                <el-row>
                  <el-col :span='24'>
                    <span style="font-size:16px">{{workerDetailData.data.workerName}}</span>
                  </el-col>
                </el-row>
                <el-row style="margin:20px 0;">
                  <el-col :span='12'>
                    性别：{{workerDetailData.data.sex === 1 ? '男' : '女'}}
                  </el-col>
                  <el-col :span='12'>
                    年龄:{{workerDetailData.data.birth && workerDetailData.data.birth.birthday}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='24'>
                    身份证号：{{workerDetailData.data.idCardNumber}}
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-form>
        <!-- 参建项目信息 -->
        <div class="workerd-detail-style divMargin">
          <div class="worker-detail-child-title">
            参建项目信息
          </div>
          <el-form label-width="200px"
                   label-position="left">
            <el-row>
              <el-col :lg='12'
                      v-if="prjNameExist">
                <el-form-item label="所在项目："
                              class="elFormItemStyle">
                  {{workerDetailData.prjInfo.prjName}}
                </el-form-item>
              </el-col>
              <el-col :lg='12'>
                <el-form-item label="所在参建单位："
                              class="elFormItemStyle">
                  {{workerDetailData.prjInfo.corpName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg='12'>
                <el-form-item label="所在班组："
                              class="elFormItemStyle">
                  {{workerDetailData.prjInfo.teamName}}
                </el-form-item>
              </el-col>
              <el-col :lg='12'>
                <el-form-item label="工种："
                              class="elFormItemStyle">
                  {{workerDetailData.prjInfo.workType}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="border-bottom: 1px solid #dddddd;">
              <el-col :lg='12'>
                <el-form-item label="进场时间："
                              class="elFormItemStyle">
                  {{workerDetailData.prjInfo.einlass}}
                </el-form-item>
              </el-col>
              <el-col :lg='12'>
                <el-form-item label="退场时间："
                              class="elFormItemStyle">
                  {{workerDetailData.prjInfo.walkOff ? workerDetailData.prjInfo.walkOff : ''}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 详细信息 -->
        <div class="workerd-detail-style divMargin">
          <div class="worker-detail-child-title">
            详细信息
          </div>
          <el-form label-width="200px"
                   label-position="left">
            <el-row>
              <el-col :lg='12'>
                <el-form-item label="民族："
                              class="elFormItemStyle">
                  {{workerDetailData.data.nation}}
                </el-form-item>
              </el-col>
              <el-col :lg='12'>
                <el-form-item label="出生日期："
                              class="elFormItemStyle">
                  {{workerDetailData.data.birth && workerDetailData.data.birth.date}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg='24'>
                <el-form-item label="住址："
                              class="elFormItemStyle">
                  {{workerDetailData.data.address}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg='12'>
                <el-form-item label="文化程度："
                              class="elFormItemStyle">
                  {{workerDetailData.data.cultureLevelType}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg='12'>
                <el-form-item label="政治面貌："
                              class="elFormItemStyle">
                  <span v-if="workerDetailData.data.politicsType">{{politics.find(val => parseInt(val.id) === parseInt(workerDetailData.data.politicsType)) && politics.find(val => parseInt(val.id) === parseInt(workerDetailData.data.politicsType)).title }}</span>
                </el-form-item>
              </el-col>
              <el-col :lg='12'>
                <el-form-item label="联系电话："
                              class="elFormItemStyle">
                  {{workerDetailData.data.cellPhone}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="border-bottom: 1px solid #dddddd;">
              <el-col :lg='12'>
                <el-form-item label="紧急联系人："
                              class="elFormItemStyle">
                  {{workerDetailData.data.urgentLinkMan}}
                </el-form-item>
              </el-col>
              <el-col :lg='12'>
                <el-form-item label="紧急联系人电话："
                              class="elFormItemStyle">
                  {{workerDetailData.data.urgentLinkManPhone}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="workerd-detail-style divMargin">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="从业信息"
                         name="first">
              <easyTable :easyTableObj='tableData'>
              </easyTable>
            </el-tab-pane>
            <el-tab-pane label="不良记录"
                         name="second">
              <easyTable :easyTableObj='tableDataBad'
                         :showStripe='true'>
              </easyTable>
            </el-tab-pane>
          </el-tabs>
        </div>
        <p style="text-align:center;margin-top:20px">
          <el-button style="width:98px;height:36px"
                     size="mini"
                     @click="back()">返回</el-button>
        </p>
      </div>
      <div>
        <img class="idCardStyle"
             :src="workerDetailData.positiveIDCardImage" />
        <img class="idCardStyle"
             :src="workerDetailData.negativeIDCardImage" />
      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/detailHeader'
import { enterType, natureOfUnit, culture, politics } from '../../data/index'
export default {
  name: 'contractors',
  components: { detailHeader },
  data () {
    return {
      routeNameData: '/company/workers',
      baseUrl: process.env.VUE_APP_baseURL,
      workerDetailData: {},
      typeOfWork: [],
      politics: politics,
      culture: culture,
      activeName: 'first',
      prjNameExist: false,
      details: {
      },
      isLoading: false,
      isShowMenu: true,
      loading: false,
      saveLoading: false,
      enterType: enterType,
      natureOfUnit: natureOfUnit,
      breadcrumbItemData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/workbook',
        label: '工人库'
      }, {
        label: '工人详情'
      }],
      addBankForm: {
        payBankCardNumber: ''
      },
      addEventType: [{
        id: 1,
        title: '违法乱纪'
      }, {
        id: 2,
        title: '不服从项目管理'
      }, {
        id: 3,
        title: '违章操作'
      }, {
        id: 4,
        title: '违反道德规范'
      }],
      severity: [
        {
          id: 0,
          title: '一般'
        },
        {
          id: 1,
          title: '严重'
        },
        {
          id: 2,
          title: '非常严重'
        }
      ],
      tableDataBad: {
        colsTitle: [
          {
            label: '序号',
            data: 'id',
            width: '80px'
          },
          {
            label: '事件类型',
            data: 'eventType'
          },
          {
            label: '严重程度',
            data: 'severity'
          },
          {
            label: '处罚开始时间',
            data: 'punishDate'
          },
          {
            label: '处罚结束时间',
            data: 'punishEDate',
            width: '120px'
          }
        ],
        cols: [],
        footer: {
          layout: '',
          pageSize: 10,
          total: 0
        }
      },
      tableData: {
        colsTitle: [
          {
            label: '序号',
            data: 'id',
            width: '80px'
          },
          {
            label: '工程名称',
            data: 'name'
          },
          {
            label: '总承包公司',
            data: '"contractorCorpName'
          },
          {
            label: '进场时间',
            data: 'einlass'
          },
          {
            label: '退场时间',
            data: 'walkOff',
            width: '120px'
          }
        ],
        cols: [],
        footer: {
          layout: '',
          pageSize: 10,
          total: 0
        }
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
  created () {
    if (localStorage.getItem('proId')) {
      this.routeNameData = '/enterProject/workbook'
      this.isShowMenu = false
    }
    const that = this
    this.$http.get('/publicFunction/classify').then(res => {
      this.typeOfWork = res.data.data
      this.$http.get('/member/teamclassWorkers/details/' + that.$route.params.id).then(res => {
        res.data.data.prjInfo.workType = that.typeOfWork.find((val) => {
          return Number(val.code) === Number(res.data.data.prjInfo.workType)
        })
        res.data.data.prjInfo.workType = res.data.data.prjInfo.workType && res.data.data.prjInfo.workType.title
        res.data.data.data.cultureLevelType = that.culture.find((val) => {
          return Number(val.id) === Number(res.data.data.data.cultureLevelType)
        })
        res.data.data.jobCase.map((val) => {
          if (val.walkOff === 0) {
            val.walkOff = ''
          }
          if (val.einlass === 0) {
            val.einlass = ''
          }
        })
        that.workerDetailData = res.data.data
        that.workerDetailData.data.headImage = that.workerDetailData.data.headImage + '!s180x180'
        that.workerDetailData.data.positiveIDCardImage = that.workerDetailData.data.positiveIDCardImage + '!s300x180'
        that.workerDetailData.data.negativeIDCardImage = that.workerDetailData.data.negativeIDCardImage + '!s300x180'
        this.tableDataBad.cols = res.data.data.record.map((val) => {
          let et = this.addEventType.find((value) => {
            return Number(value.id) === Number(val.eventType)
          })
          let sv = this.severity.find((value) => {
            return Number(value.id) === Number(val.severity)
          })
          return {
            ...val,
            eventType: et ? et.title : '',
            severity: sv ? sv.title : ''
          }
        })
        res.data.data.data.cultureLevelType = res.data.data.data.cultureLevelType && res.data.data.data.cultureLevelType.title
      })
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.breadcrumbItemData[1].path = from.path
      if (from.path === '/company/workers') {
        vm.prjNameExist = true
      }
    })
  },
  methods: {
    toEdit () {
      this.$router.push('/enterProject/contract/edit/' + this.$route.params.id)
    },
    back () {
      this.$router.go(-1)
    },
    headImage () {
      // 不知道会不会用上
    },
    preview () {
      // cd
    },
    handleClick (tab, event) {
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
.workerd-detail-style {
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

 <style lang='less'>
.workerd-detail-style {
  background-color: #ffffff;
  padding: 20px;
  .el-form-item__label {
    padding-left: 20px;
    line-height: 54px;
    background-color: #ececec;
  }
  .el-form-item__content {
    line-height: 54px;
    padding-left: 20px;
  }
}
</style>
