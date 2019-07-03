<template>
  <div class="ProjectInfo">
    <div class="filtrate">
      <tips title="项目信息" :tips="tips"></tips>
      <screen label="行业分类" :list="trades" @choose="choose($event,'trade',0)"></screen>
      <screen label="工作地点" :list="regions" @choose="choose($event,'region',1)" style="border-bottom: none"></screen>
    </div>
    <div class="list">
      <div class="sort">
        <div class="btn" :class="{active: sortIdx == 1}" @click="sortIdx = 1">热度排序</div>
        <div class="btn" :class="{active: sortIdx != 1}" @click="sort">发布时间<i :class="{'el-icon-caret-bottom': sortIdx != 3, 'el-icon-caret-top': sortIdx ==3}"></i></div>
      </div>
      <div style="width: 1200px; margin: 0 auto; display: flex; justify-content: space-between;">
        <div style="width: 971px;">
          <list :list="list" :mod="4" path="/Project_details" defImg="http://resource.aibanzhuan.cn/material/company.jpg">
            <span slot="type" slot-scope="{ item }" v-if="item.project_type">{{item.project_type}}</span>
          </list>
        </div>
        <div class="notice"><img src="../../assets/notice.png" alt="" style="transform: translateY(-5px)"></div>
      </div>
      <paging :total="total" :page.sync="page"></paging>
    </div>
  </div>
</template>

<script>
import tips from './components/tips'
import screen from './components/screen'
import list from './components/list'
import paging from './components/paging'
export default {
  name: 'ProjectInfo',
  components: { tips, screen, list, paging },
  data () {
    return {
      tips: [],
      trades: [],
      trade: '',
      regions: [],
      region: '',
      sortIdx: 1,
      list: [],
      page: 1,
      total: 0
    }
  },
  computed: {
    filtrate () {
      return {
        keywords: this.$store.state.searchVal,
        classify: this.trade,
        province: this.region,
        page: this.page,
        sort: this.sortIdx
      }
    }
  },
  watch: {
    filtrate () {
      this.getList()
    }
  },
  methods: {
    choose (val, str, idx) {
      this[str] = val.id
      this.$set(this.tips, idx, val.title)
    },
    sort () {
      if (this.sortIdx == 2) this.sortIdx = 3
      else this.sortIdx = 2
    },
    getList () {
      this.$http.get('/project/list', { params: this.filtrate }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.page = +data.current_page
          this.total = data.total
          this.list = data.data
        }
      })
    }
  },
  created () {
    document.title = '项目信息'
    this.$cookies.set('navIdx', 5, '0')
    this.$store.commit('changeSearchIdx', '/ProjectInfo')

    this.getList()

    /* 行业 */
    this.$http.get('/common/project').then(res => {
      this.trades = res.data.data
    })

    /* 地区 */
    this.$http.get('/common/getarea').then(res => {
      this.regions = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
  .ProjectInfo{
    background-color: #f3f7fa;
    .filtrate{
      background-color: #fff;
      margin-bottom: 4px;
    }
    .list{
      background-color: #fff;
      padding-bottom: 20px;
      .sort{
        width: 1200px;
        height: 46px;
        margin: 0 auto;
        display: flex;
        .btn{
          width: 120px;
          height: 46px;
          line-height: 46px;
          text-align: center;
          letter-spacing: 1px;
          color: #cccccc;
          cursor: pointer;
          &.active{
            background-color: #3388ff;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
