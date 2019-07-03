<template>
  <div>
    <el-dialog :title="dialogTitle || '选择工人'"
               :visible.sync="dialogVisible"
               width="70%"
               :before-close="handleClose">
      <slot name='HeaderSlot'>
      </slot>
      <el-form ref="form"
               :model="form"
               label-width="100px">
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="身份证号">
              <el-input placeholder="请输入身份证号"
                        v-model="form.idCardNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名"
                        v-model="form.workerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div style='text-align:right;margin-right:24px;'>
              <el-button type="primary"
                         @click="searchWorker">查询</el-button>
              <el-button plain
                         @click="searchAllWorker">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-alert title="点击需要选择的工人列即可选中单个工人。"
                type="info"
                style="margin-top:20px">
      </el-alert>
      <el-table :data="workerList"
                v-loading="wokerLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :highlight-current-row="type === 'selection' ? false : true"
                @current-change="handleCurrentChange"
                @selection-change="handleSelectionChange">
        >
        <el-table-column v-if="type === 'selection' ? true : false"
                         :type='type'
                         width="55">
        </el-table-column>
        <el-table-column property="workerName"
                         label="姓名"
                         width="200"></el-table-column>
        <el-table-column property="idCardNumber"
                         label="身份证号"></el-table-column>
        <el-table-column property="corpName"
                         label="参建单位"></el-table-column>
        <el-table-column property="teamName"
                         label="班组"
                         width='120px'></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="handleCurrentPageChange"
                       :page-size='15'
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
      <span class="dialog-footer"
            v-if="type === 'selection' ? true : false">
        <el-button @click="dialogCancelBtnClick">{{'取消'}}</el-button>
        <el-button type="primary"
                   @click="dialogOkBtnClick">{{'确定'}}</el-button>
      </span>
    </el-dialog>
  </div>
  <!--
      属性：dialogVisible：是否显示
      事件：
       handleTableCurrentChange 单选事件触发，默认有参数
       handleTableSelectionChange 多选事件 有默认参数
       onOkClick                  点击右下角确定按钮时触发
       type：selection            如需多选，必须设置此项属性
       proIdInParams proId是否在params里面
   -->
</template>

<script>
export default {
  name: 'workerList',
  props: {
    dialogTitle: String,
    dialogData: Object,
    dialogVisible: Boolean,
    footer: Object,
    url: {
      type: String,
      default: '/member/teamclassWorkers/selectLists/'
    },
    paramsPorp: {
      type: Object
    },
    type: {
      type: String,
      default: ''
    },
    proIdInParams: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      proId: '',
      workerList: [],
      wokerLoading: false,
      form: {
        idCardNumber: '',
        workerName: ''
      },
      typeOfWork: [],
      total: 0,
      newsList: []
    }
  },
  methods: {
    dialogCancelBtnClick () {
      this.$emit('handleDialogClose')
    },
    dialogOkBtnClick () {
      // console.log(this.newsList)
      this.$emit('onOkClick', true)
      this.$emit('onOkClick2', this.newsList)
    },
    handleClose () {
      this.$emit('handleDialogClose')
    },
    // 多选事件触发时
    handleSelectionChange (val) {
      // console.log(val)
      this.newsList = val
      this.$emit('handleTableSelectionChange', val)
    },
    // 搜索
    searchWorker () {
      this.refreshList(this.form)
    },
    // 重置
    searchAllWorker () {
      this.form = { idCardNumber: '',
        workerName: '' }
      this.refreshList()
    },
    // 单选点击事件
    handleCurrentChange (val) {
      if (val) {
        this.$emit('handleTableCurrentChange', val)
      }
    },
    // 分页事件
    handleCurrentPageChange (val) {
      this.form.page = val
      this.refreshList(this.form)
    },
    // 列表刷新事件
    refreshList (val) {
      this.wokerLoading = true
      let reqUrl = this.proIdInParams ? this.url : (this.url + this.proId)
      this.$http.get(reqUrl, { params: this.form }).then(res => {
        this.total = res.data.data.total
        this.wokerLoading = false
        this.workerList = res.data.data.data
      })
    }
  },
  computed: {
    dataFiled () {
      return Object.keys(this.dialogData.data)
    },
    okBtnText () {
      return this.dialogData.footer.okBtnText || '确定'
    },
    cancelBtnText () {
      return this.dialogData.footer.cancelBtnText || '取消'
    }
  },
  mounted: function () {
    if (this.paramsPorp) {
      this.form = this.paramsPorp
    }
    this.proId = localStorage.getItem('proId')
    if (!this.proIdInParams) {
      this.refreshList()
    }
    // this.$http.get('/publicFunction/classify').then(res => {
    //   this.typeOfWork = res.data.data
    // })
  }
}
</script>

<style scoped lang="less">
.block {
  margin-top: 24px;
  text-align: right;
}
.dialog-footer {
  margin-top: 14px;
  display: block;
  text-align: right;
}
</style>
