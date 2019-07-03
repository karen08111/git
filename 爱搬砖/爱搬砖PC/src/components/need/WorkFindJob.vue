<template>
  <div class="FindWorker">
    <div class="filtrate">
      <tips title="个人找活" :tips="tips"></tips>
      <screen label="行业一级" :list="trades" @choose="choose($event,'trade',0)"></screen>
      <screen label="行业二级" :ismore="true" :idx="trade2" :list="trades2" @choose="choose($event,'trade2',1)"></screen>
      <screen label="平均工龄" :list="senioritys" @choose="choose($event,'seniority',2)"></screen>
      <screen label="工作地点" :list="regions" @choose="choose($event,'region',3)" style="border-bottom: none"></screen>
    </div>
    <div class="list">
      <div class="sort">
        <div class="btn" :class="{active: sortIdx == 1}" @click="sortIdx = 1">热度排序</div>
        <div class="btn" :class="{active: sortIdx != 1}" @click="sort">发布时间<i :class="{'el-icon-caret-bottom': sortIdx != 3, 'el-icon-caret-top': sortIdx ==3}"></i></div>
      </div>
      <div style="width: 1200px; margin: 0 auto; display: flex; justify-content: space-between;">
        <div style="width: 971px;">
          <list :list="list" :mod="3" path="/WFJ_details">
            <span slot="type" slot-scope="{ item }" v-if="item.work_type">{{item.work_type}}</span>
            <template slot="nums" slot-scope="{ item }">
              <span v-if="item.nums">{{item.nums}}人</span>
              <span v-else>不限人数</span>
            </template>
            <template slot="time" slot-scope="{ item }">
              <span v-if="item.work_time">{{item.work_time}}年工龄</span>
              <span v-else>不限工龄</span>
            </template>
            <span slot="pay" slot-scope="{ item }">{{item.min_pay == 0 ? '面议' : `${item.min_pay}/${item.quantity_unit}`}}</span>
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
  name: 'WorkFindJob',
  components: { tips, screen, list, paging },
  data () {
    return {
      tips: [],
      trades: [],
      trade: '',
      trade2: '',
      nums: [
        {
          id: '0-10',
          title: '0-10'
        },
        {
          id: '11-20',
          title: '11-20'
        },
        {
          id: '21-50',
          title: '21-50'
        },
        {
          id: '50-',
          title: '50以上'
        }
      ],
      num: '',
      senioritys: [
        {
          id: '-1',
          title: '一年以内'
        },
        {
          id: '1-3',
          title: '1-3年'
        },
        {
          id: '3-5',
          title: '3-5年'
        },
        {
          id: '5-10',
          title: '5-10年'
        },
        {
          id: '10-',
          title: '10年以上'
        }
      ],
      seniority: '',
      regions: [],
      region: '',
      sortIdx: 1,
      list: [],
      page: 1,
      total: 0
    }
  },
  computed: {
    trades2 () {
      if (this.trade) {
        return this.trades.filter(value => value.id == this.trade)[0].children
      } else {
        let arr = []
        for (let i of this.trades) {
          arr.push(...i.children)
        }
        return arr
      }
    },
    filtrate () {
      return {
        keywords: this.$store.state.searchVal,
        nature: 1,
        big_type: this.trade,
        works: this.trade2,
        work_time: this.seniority,
        province: this.region,
        page: this.page,
        sort: this.sortIdx
      }
    }
  },
  watch: {
    trade () {
      this.trade2 = ''
      this.$set(this.tips, 1, undefined)
    },
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
      this.$http.get('/recruitList', { params: this.filtrate }).then(res => {
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
    document.title = '工人找活'
    this.$cookies.set('navIdx', 4, '0')
    this.$store.commit('changeSearchIdx', '/WorkFindJob')

    this.getList()

    /* 工种 */
    this.$http.get('/common/getworks').then(res => {
      if (res.data.code == 200) {
        this.trades = res.data.data
      }
    })

    /* 地区 */
    this.$http.get('/common/getarea').then(res => {
      if (res.data.code == 200) {
        this.regions = res.data.data
      }
    })
  }
}
</script>

<style scoped lang="less">
  .FindWorker{
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
