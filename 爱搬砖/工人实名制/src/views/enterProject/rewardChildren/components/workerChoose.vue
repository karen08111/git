<template>
  <div class="workerChoose">
    <el-input ref="nameInp"
              v-model="name"
              :placeholder="placeholder"
              readonly
              @focus="handleChoose"></el-input>
    <el-dialog :visible.sync="dialogVisible"
               width="auto">
      <div class="dia">
        <el-form ref="form"
                 :model="filters"
                 inline
                 label-width="100px">
          <el-form-item label="姓名：">
            <el-input v-model="filters.workerName"
                      placeholder="请输入工人姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="filters.idCardNumber"
                      placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary"
                       @click="handleRefer">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table v-if="tableShow"
                  :data="users"
                  ref="workerChooseTable"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%; margin-top: 20px;">
          <el-table-column prop="workerName"
                           label="姓名"
                           min-width="180">
          </el-table-column>
          <el-table-column prop="idCardNumber"
                           label="身份证号"
                           min-width="180">
          </el-table-column>
          <el-table-column prop="prjName"
                           label="参建单位"
                           min-width="180">
          </el-table-column>
          <el-table-column prop="teamName"
                           label="班组"
                           min-width="180">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleConfirm"
                   v-if="users.length">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'workerChoose',
  props: {
    value: [String, Number], // v-model绑定值
    prop: { // 返回的key
      type: String,
      default: 'id'
    },
    flag: { // 是否可选择（编辑状态应为false）
      type: Boolean,
      default: true
    },
    placeholder: String, // input的placeholder
    userData: Object // 选中的工人信息 sync
  },
  data () {
    return {
      name: '',
      user: {},
      users: [
        // {
        //   id: 172,
        //   workerName: '吴博',
        //   idCardNumber: '370403198310102230',
        //   prjName: '台儿庄广建路项目',
        //   teamName: '砌筑班组',
        //   workType: '1000'
        // }
      ],
      dialogVisible: false,
      filters: {
        workerName: '',
        idCardNumber: '',
        page: 1
      },
      tableShow: false
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.tableShow = val
      }
    }
  },
  methods: {
    handleRefer () {
      this.req()
      this.tableShow = true
    },
    handleCurrentChange (val) {
      this.user = val
    },
    handleConfirm () {
      if (this.placeholder !== '添加人员') {
        this.name = this.user.workerName
        this.$emit('input', this.user[this.prop])
      }
      this.$emit('update:userData', this.user)
      this.$emit('confirm', this.user)
      this.dialogVisible = !this.dialogVisible
    },
    handleChoose () {
      if (this.flag) {
        this.dialogVisible = !this.dialogVisible
      }
    },
    req () {
      this.$http.get('/member/teamclassWorkers/allLists', { params: { prjID: localStorage.getItem('proId'), ...this.filters } }).then(res => {
        if (res.data.code === 200) {
          this.users = res.data.data.data
        }
      })
    }
  },
  mounted () {
    if (this.placeholder === '添加人员') {
      this.name = '添加人员'
      this.$refs.nameInp.$el.style.cssText = 'width: 90px;'
    }
  }
}
</script>

<style lang="less">
.workerChoose {
  .el-dialog__wrapper {
    text-align: center;
  }
  .el-dialog {
    display: inline-block;
  }
  .dia {
    text-align: left;
    min-width: 960px;
  }
}
</style>
