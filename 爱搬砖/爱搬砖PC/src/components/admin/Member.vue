<template>
  <div class="container Member">
    <div class="list">
      <header><router-link :to="`/Add_members/${tid}`"><el-button type="primary" plain class="add">+ 添加成员</el-button></router-link></header>
      <el-table
          :data="clist"
          height="485"
          style="width: 100%;">
        <el-table-column
            prop="user_name"
            label="姓    名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年    龄"
            width="180">
        </el-table-column>
        <el-table-column
            prop="work_time"
            label="工    龄">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号码">
        </el-table-column>
        <el-table-column
            prop="isfu"
            label="团队负责人">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <div class="btns">
              <el-button @click="edit(scope.row.id)" type="primary" size="small">编辑</el-button>
              <el-button @click="del(scope.row.id)" type="primary" plain size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <paging :total="total" :page.sync="page"></paging>
    </div>
  </div>
</template>

<script>
import paging from '@/components/need/components/paging'
export default {
  name: 'Member',
  components: { paging },
  data () {
    return {
      sname: '',
      tid: '',
      stype: '',
      types: [],
      keywords: '',
      list: [],
      total: 0,
      page: 1
    }
  },
  watch: {
    page () {
      this.request()
    }
  },
  methods: {
    edit (id) {
      this.$router.push({ name: 'Add_members', params: { tid: this.tid, id: id } })
    },
    del (id) {
      this.$confirm('是否确认删除成员', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/member/teamMamber/delete', { id: id, tid: this.tid }).then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.$store.commit('success', res.data.msg)
            this.request()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    change (val) {
      this.page = val
    },
    request () {
      this.$http.get('member/teamMamber/odd', { params: { page: this.page } }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.tid = data.tid
          this.list = data.data
          this.total = +data.all
          this.page = +data.current_page
        }
      })
    }
  },
  computed: {
    clist () {
      let arr = this.list
      for (let i of arr) {
        if (i.is_leader) i['isfu'] = '是'
        else i['isfu'] = '否'
      }
      return arr
    }
  },
  created () {
    this.request()
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 963px;
    background-color: #ffffff;
    padding-bottom: 20px;
    header{
      padding: 40px 40px 40px 52px;
      width: 100%;
      height: 60px;
      box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.1);
      /*padding: 0 40px;*/
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>

<style lang="less">
  .Member{
    .cell{
      text-align: center;
    }
    .el-table{
      &::before{
        height: 0;
      }
      thead{
        background-color: #fafafd;
        tr{
          background-color: #fafafd;
          /*box-shadow: 0px 2px 6px 0px
          rgba(51, 51, 51, 0.1);*/
          th{
            background-color: transparent;
            border-bottom: none !important;
          }
        }
      }
      .el-table__fixed-right::before{
        height: 0;
      }
      td, th.is-leaf{
        border-bottom: 1px dashed #ebeef5;
      }
      .btns{
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-button{
          margin-left: 0;
          width: 47px;
          height: 22px;
          padding: 0;
          &:first-of-type{
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
