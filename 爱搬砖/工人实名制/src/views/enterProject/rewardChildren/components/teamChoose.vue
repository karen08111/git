<template>
  <div class="teamChoose">
    <el-input v-model="name"
              :placeholder="placeholder"
              readonly
              @focus="handleChoose"></el-input>
    <el-dialog :visible.sync="dialogVisible"
               width="1000px">
      <div class="dia">
        <el-form ref="form"
                 :model="filters"
                 inline
                 label-width="120px">
          <el-form-item label="所属参建单位：">
            <corpSelect v-model="filters.bcorpID"></corpSelect>
          </el-form-item>
          <el-form-item label="班组名称："
                        style="margin-left:24px">
            <el-input v-model="filters.teamName"
                      placeholder="请输入班组名称"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary"
                       size="mini"
                       @click="handleRefer">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table v-if="tableShow"
                  :data="users"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%; margin-top: 20px;">
          <el-table-column prop="teamName"
                           label="班组名称"
                           min-width="180">
          </el-table-column>
          <el-table-column prop="corpName"
                           label="参建单位"
                           width="240px">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleConfirm"
                   v-if="tableShow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'teamChoose',
  components: {
    'corpSelect': _ => import('./corpSelect')
  },
  props: {
    value: [String, Number],
    prop: {
      type: String,
      default: 'id'
    },
    flag: {
      type: Boolean,
      default: true
    },
    teamData: Object,
    placeholder: String
  },
  data () {
    return {
      name: '',
      user: {},
      users: [
        // {
        //   id: 1, // 班组ID
        //   teamName: '我团牛逼', // 团队名称
        //   corpName: '匠韵科技222', // 参建单位
        //   einlass: '2019-04-25', // 入场时间
        //   walkOff: '2019-05-21', // 退场时间
        //   workernew: '点点点', // 班组长
        //   classCount: 1// 班组人数
        // }
      ],
      dialogVisible: false,
      filters: {
        bcorpID: '',
        teamName: '',
        page: 1
      },
      crops: [],
      tableShow: true
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
      this.handleConfirm()
    },
    handleConfirm () {
      this.name = this.user.teamName
      this.$emit('input', this.user[this.prop])
      this.$emit('update:teamData', this.user)
      this.dialogVisible = !this.dialogVisible
    },
    handleChoose () {
      if (this.flag) {
        this.dialogVisible = !this.dialogVisible
      }
    },
    req () {
      this.$http.get(`/member/teamclass/lists/${localStorage.getItem('proId')}`, { params: this.filters }).then(res => {
        if (res.data.code === 200) {
          this.users = res.data.data.data
        }
      })
    }
  },
  created () {
    this.req()
  }
}
</script>

<style lang="less" scoped>
.teamChoose {
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
