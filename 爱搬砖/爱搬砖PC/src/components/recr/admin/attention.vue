<template>
  <div class="app">
    <div class="header">
      <h3>我的关注</h3>
      <div class="options">
        <span :class="{active: index === 1}" @click="index = 1">采购项目</span>
        <span :class="{active: index === 2}" @click="index = 2">采购企业</span>
      </div>
    </div>
    <keep-alive>
      <att_pro v-show="index === 1" :info="projects"></att_pro>
    </keep-alive>
    <keep-alive>
      <att_com v-show="index === 2" :info="coms"></att_com>
    </keep-alive>
  </div>
</template>

<script>
import att_pro from '../components/att_pro'
import att_com from '../components/att_com'

export default {
  name: 'attention',
  components: { att_pro, att_com },
  data () {
    return {
      index: 1,
      projects: {
        list: [],
        total: 0,
        size: 15,
        page: 1
      },
      coms: {
        list: [],
        total: 0,
        size: 15,
        page: 1
      }
    }
  },
  methods: {
    getComs () {
      this.$http.get('/purchase/lists', { params: { page: this.coms.page } }).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          const coms = this.coms
          coms.list = data.data
          coms.total = +data.total
          coms.size = +data.per_page
          coms.page = +data.current_page
        }
      })
    }
  },
  created () {
    this.getComs()
  }
}
</script>

<style scoped lang="less">
  .app{
    padding-top: 50px;
    padding-bottom: 50px;
    .header{
      width: 976px;
      height: 50px;
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30px;
      padding-right: 35px;
      box-sizing: border-box;
      h3{
        font-size: 20px;
        color: #434348;
      }
      .options{
        span{
          display: inline-block;
          font-size: 16px;
          line-height: 48px;
          letter-spacing: 2px;
          color: #999999;
          cursor: pointer;
          margin-left: 44px;
          &:hover, &.active{
            color: #000003;
            border-bottom: 4px solid #3388ff;
          }
        }
      }
    }
  }
</style>
