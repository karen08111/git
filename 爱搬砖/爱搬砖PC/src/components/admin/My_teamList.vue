<template>
  <div class="container">
    <header>
      <router-link to="/My_teamPlus">
        <el-button type="primary">新建团队</el-button>
      </router-link>
    </header>
    <div class="list">
      <ul>
        <li v-for="item in list">
          <img :src="$store.state.site + item.avatar" :onerror="$store.state.defaultImg" alt="">
          <h3>{{item.team_name}}</h3>
          <div class="content">
            <router-link :to="`/My_teamPlus/${item.id}`"><el-button type="primary" size="mini">团队简历</el-button></router-link>
            <router-link :to="`/BringPlus/${item.id}`"><el-button type="primary" size="mini">团队招聘</el-button></router-link>
          </div>
        </li>
        <li class="empty"></li>
        <li class="empty"></li>
        <li class="empty"></li>
      </ul>
    </div>
    <paging :total="total" :size="size" :page.sync="page"></paging>
  </div>
</template>

<script>
import paging from '@/components/need/components/paging'
export default {
  name: 'My_teamList',
  components: { paging },
  data () {
    return {
      total: 0,
      size: 0,
      page: 1,
      list: []
    }
  },
  watch: {
    page () {
      this.request()
    }
  },
  methods: {
    request () {
      this.$http.get('/member/team', { params: { page: this.page } }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.total = +data.all
          this.size = +data.per_page
          this.page = +data.current_page
          this.list = data.data
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
  .container {
    width: 963px;
    background-color: #ffffff;
    padding-bottom: 30px;

    header {
      width: 100%;
      height: 60px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .list {
      padding: 0 40px;

      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          width: 200px;
          height: 174px;
          text-align: center;
          padding: 22px 15px;

          &.empty {
            height: 0 !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 15px !important;
          }

          img {
            width: 80px;
            height: 80px;
            object-fit: cover;
          }

          h3 {
            line-height: 42px;
            letter-spacing: 1px;
            color: #34495e;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
