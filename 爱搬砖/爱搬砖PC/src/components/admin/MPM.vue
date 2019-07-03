<template>
  <div class="container">
    <header><router-link to="/ProjectForm"><el-button type="primary" plain>发布项目信息</el-button></router-link></header>
    <div class="list">
      <ul>
        <li v-for="item in list">
          <!--<div class="image">
            <img v-if="item.img" :src="$store.state.site + item.img" alt="">
            <img v-else src="../../assets/none.png" alt="">
          </div>-->
          <div class="title">
            <h3>{{item.title}}<span>{{item.prj_status.title}}</span></h3>
            <p><span>{{item.project_type.title}}</span><span>{{item.region.length < 2 ? item.region[0].title : item.region[0].title + item.region[1].title}}</span></p>
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
  </div>
</template>

<script>
export default {
  name: 'MPM',
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
      this.$router.push({ name: 'ProjectForm', params: { id: id } })
    },
    hidden (is_show, id) {
      let methods = ''
      if (is_show) methods = 'setHide'
      else methods = 'setShow'
      this.$http.get(`/member/project/${id}/${methods}`).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', '修改成功')
          this.request()
        }
      })
    },
    del (id) {
      this.$http.get(`/member/project/${id}/delete`).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
        }
      })
    },
    request () {
      this.$http.get('/member/project', { params: { page: this.page } }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.list = data.data
          this.total = data.all
          this.page = data.current_page
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
              span{
                margin-left: 10px;
                height: 13px;
                line-height: 13px;
                background-color: #ffffff;
                border-radius: 4px;
                border: solid 1px #cccccc;
                font-size: 10px;
                letter-spacing: 1px;
                color: #f56c6c;
                padding: 0 6px;
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
