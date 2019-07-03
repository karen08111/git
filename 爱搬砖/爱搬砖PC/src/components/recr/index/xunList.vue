<template>
  <div class="app">
    <el-carousel trigger="click" height="360px">
      <el-carousel-item v-for="(item,index) in slides" :key="index">
        <img :src="item.path" :onerror="$store.state.defaultImg">
      </el-carousel-item>
    </el-carousel>
    <div class="main">
      <div class="lef">
        <list :list="list"></list>
        <div class="pag"><paging :total="total" :page.sync="page" :size="size"></paging></div>
      </div>
      <div class="rig">
        <adv1></adv1>
        <adv2></adv2>
      </div>
    </div>
  </div>
</template>

<script>
import list from '../components/list'
import adv1 from '../components/adv1'
import adv2 from '../components/adv2'
import paging from '@/components/need/components/paging'

export default {
  name: 'xunList',
  components: { list, paging, adv1, adv2 },
  data () {
    return {
      slides: [],
      list: [],
      total: 0,
      size: 15,
      page: 1
    }
  },
  watch: {
    page () {
      this.req()
    }
  },
  methods: {
    req () {
      this.$http.get('/purchase/inquiryList', { params: { page: this.page } }).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.list = data.data
          this.page = +data.current_page
          this.total = +data.total
          this.size = +data.per_page
        }
      })
    }
  },
  created () {
    /* slider */
    this.$http.get('/common/sowing', { params: { sn: 10003 } }).then(res => {
      if (res.data.code === 200) {
        let arr = res.data.data
        arr.forEach(val => {
          val.path = /^(https?|\/\/)/i.test(val.path) ? val.path : this.$store.state.site + val.path
        })
        this.slides = res.data.data
      }
    })

    this.req()
  }
}
</script>

<style scoped lang="less">
  .app{
    background-color: #eef0f1;
    padding-bottom: 30px;
    .main{
      width: 1200px;
      margin: 20px auto 0;
      display: flex;
      justify-content: space-between;
      .lef{
        width: 880px;
        .pag{
          margin-top: 20px;
        }
      }
    }
  }
</style>
