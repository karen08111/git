<template>
  <div class="container">
    <header><router-link to="/Recruit_form/1"><el-button type="primary" plain>发布招聘信息</el-button></router-link></header>
    <div class="list">
      <ul>
        <li v-for="item in list">
          <!--<div class="image">
            <img v-if="item.img" :src="$store.state.site + item.img" alt="">
            <img v-else src="../../assets/none.png" alt="">
          </div>-->
          <div class="title">
            <h3>{{item.title}}</h3>
            <p><span>{{item.work_type.title}}</span><span>{{item.nums}}人</span><span>{{item.work_time}}年工龄</span><span>{{item.region.length > 1 ? item.region[0].title+item.region[1].title : item.region[0].title}}</span></p>
            <p><span>发布于{{item.update_time}}</span><span>{{item.hits}}次浏览</span></p>
          </div>
          <div class="handle">
            <el-button type="primary" size="mini" class="btn" @click="edit(item.id)">编 辑</el-button>
            <el-button type="primary" size="mini" class="btn" @click="hidden(item.is_show, item.id)">{{item.is_show ? '隐 藏' : '显 示'}}</el-button>
            <el-button type="primary" size="mini" class="btn" @click="del(item.id)">删 除</el-button>
          </div>
        </li>
      </ul>
    </div>
    <paging :total="total" :page.sync="page"></paging>
  </div>
</template>

<script>
import paging from '@/components/need/components/paging'
export default {
  name: 'Com_bring',
  components: { paging },
  data () {
    return {
      list: [],
      role: this.$route.params.role,
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
      this.$router.push({ name: 'Recruit_form', params: { id: id, publisher: 1 } })
    },
    hidden (is_show, id) {
      let methods = ''
      if (is_show) methods = 'setHide'
      else methods = 'setShow'
      this.$http.get(`/member/recruit/${id}/${methods}`).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', '修改成功')
          this.request()
        }
      })
    },
    del (id) {
      this.$confirm('是否确认删除成员', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`/member/recruit/${id}/delete`).then(res => {
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
    request () {
      this.$http.get('/member/recruit', { params: { page: this.page, publisher: 1 } }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.list = data.data
          this.total = data.all
          this.page = Number(data.current_page)
        }
      })
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
    padding-bottom: 30px;
    header{
      width: 100%;
      height: 60px;
      box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.1);
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .list{
      padding: 0 40px;
      ul{
        width: 100%;
        margin: 0 auto 20px;
        li{
          width: 100%;
          height: 123px;
          padding: 16px 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #cccccc;
          display: flex;
          align-items: center;
          &:last-of-type{
            border-bottom: none;
          }
          & > div{
            height: 90px;
          }
          .image img{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 20px;
          }
          .title{
            margin-right: auto;
            h3{
              letter-spacing: 1px;
              color: #34495e;
              margin-bottom: 18px;
              display: block;
              &:hover{
                color: #3388ff;
              }
            }
            p{
              font-size: 12px;
              letter-spacing: 1px;
              color: #999999;
              &:first-of-type{
                margin-bottom: 19px;
                span{
                  display: inline-block;
                  height: 22px;
                  line-height: 22px;
                  border-radius: 4px;
                  border: solid 1px #999999;
                  margin-right: 15px;
                  padding: 0 10px;
                }
              }
              &:last-of-type{
                span{
                  margin-right: 20px;
                }
              }
            }
          }
          .handle{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            left: 20px;
            .btn{
              margin-left: 0;
            }
          }
        }
      }
    }
  }
</style>
