<template>
  <div class="app">
    <div class="header">
      <h3>我的项目</h3>
      <el-button type="primary" @click="issue">+ 发布项目</el-button>
    </div>
    <div class="table">
      <div class="t-header">
        <taHeader :titles="tableHeader"></taHeader>
        <ul>
          <li v-for="item in list">
            <p>{{item.title}}</p>
            <p>{{item.hits}}</p>
            <p>{{item.type_text}}</p>
            <p class="handle">
              <el-button type="primary" size="mini" @click="edit(item)">编  辑</el-button>
              <el-button type="primary" size="mini" plain @click="del(item.id)">删  除</el-button>
            </p>
          </li>
          <li class="nothing" v-if="list.length === 0">暂无记录</li>
        </ul>
      </div>
      <paging :total="total" :page.sync="page" :size="size"></paging>
    </div>
  </div>
</template>

<script>
import taHeader from '../components/taHeader'
import paging from '@/components/need/components/paging'
export default {
  name: 'proList',
  components: { taHeader, paging },
  data () {
    return {
      tableHeader: ['采购标题', '浏览人数', '采购类型', '操 作'],
      list: [],
      total: 0,
      page: 1,
      size: 0
    }
  },
  methods: {
    issue () {
      this.$router.push({ path: '/chooseType' })
    },
    edit (item) {
      if (item.type === 1) {
        this.$router.push({ name: 'xunForm', params: { id: item.id } })
      } else {
        this.$router.push({ name: 'zhaoForm', params: { id: item.id } })
      }
    },
    del (id) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/member/purchase/delete', { id: id }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.req()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    req () {
      this.$http.get('/member/purchase', { params: { page: this.page } }).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.list = data.data
          this.page = +data.current_page
          this.size = +data.per_page
          this.total = +data.total
        }
      })
    }
  },
  created () {
    this.req()
  }
}
</script>

<style scoped lang="less">
  .app{
    min-height: 570px;
    .header{
      height: 88px;
      line-height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3{
        font-size: 20px;
        color: #434348;
      }
      a{
        color: #fff;
      }
    }
    .table{
      ul{
        border: 1px solid #f1f1f1;
        border-top: none;
        li{
          display: flex;
          min-height: 71px;
          align-items: center;
          padding: 8px 0;
          box-sizing: border-box;
          cursor: pointer;
          &:not(:last-of-type){
            border-bottom: 1px dashed #e5e5e5;
          }
          &:hover{
            background-color: #fafafb;
          }
          p{
            flex: 1 1 220px;
            text-align: center;
            font-size: 11px;
            color: #666666;
            padding: 0 16px;
            &:first-of-type{
              text-align: left;
            }
            &.handle{
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
        }
        .nothing{
          justify-content: center;
        }
      }
    }
  }
</style>

<style lang="less">
  .table{
    .el-button--mini, .el-button--mini.is-round{
      padding: 5px 7px;
    }
    .el-button+.el-button{
      margin-left: 0;
      margin-top: 10px;
    }
  }
</style>
