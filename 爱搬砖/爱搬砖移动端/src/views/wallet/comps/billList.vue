<template>
  <div ref="billList" class="billList">
    <ul>
      <li v-for="item in list">
        <div class="b-left">
          <h3>{{item.genre_text}}--{{item.title}}</h3>
          <p>{{item.create_time}}</p>
        </div>
        <router-link class="b-right" :to="`/billDetails/${item.genre}/${item.id}`">
          <span :style="{color: +item.genre === 2 ? '#ff7b0e' : '#38c285'}">{{+item.genre === 2 ? `-${item.total_fee}` : `+${item.total_fee}`}}</span>
          <van-icon name="arrow" />
        </router-link>
      </li>
    </ul>
    <div class="botText loading" v-show="loading">加载中。。。</div>
    <div class="botText noMore" v-show="noMore">我是有底线哒！(╯‵□′)╯︵┻━┻</div>
  </div>
</template>

<script>
  export default {
    name: "billList",
    props: ['genre'],
    data() {
      return {
        list: [],
        page: 1,
        last_page: null,
        loading: false,
        noMore: false,
        scollBottom: 0
      }
    },
    watch: {
      scollBottom (val){
        console.log(val === 0)
        if(this.page === this.last_page){
          this.noMore = true
          setTimeout(() => {
            this.noMore = false
          },1500)
        }else{
          if(val === 0){
            this.page++
            this.getList()
          }
        }
      }
    },
    methods: {
      getList() {
        this.loading = true
        this.$http.get('/member/payment/stream', {params: {page: this.page, genre: this.genre}}).then(res => {
          if (res.code === 200) {
            const data = res.data
            this.list.push(...data.data)
            this.page = +data.current_page
            this.last_page = +data.last_page
            this.loading = false
          }
        })
      },
      onScroll() {                    //可滚动容器的高度
        let innerHeight = this.$refs.billList.clientHeight                    //屏幕尺寸高度
        let bill_nav = document.querySelector('#bill_nav').clientHeight                    //屏幕尺寸高度
        let footer_bar = document.querySelector('#footer_bar').clientHeight                    //屏幕尺寸高度
        let outerHeight = document.documentElement.clientHeight                    //可滚动容器超出当前窗口显示范围的高度
        let scrollTop = document.documentElement.scrollTop                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。

        this.scollBottom = innerHeight - outerHeight - scrollTop + bill_nav + footer_bar + 10
      }
    },
    created() {
      this.getList()
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy (){
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>

<style scoped lang="less">
  .billList {
    ul {
      border-top: 1PX solid #e5e5e5;
      padding: 0 0.3rem;
      li {
        width: 100%;
        height: 1.38rem;
        border-bottom: solid 0.01rem #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .b-left{
          h3{
            font-family: MicrosoftYaHei;
            font-size: 0.24rem;
            color: #343434;
            margin-bottom: 0.29rem;
          }
          p{
            font-family: MicrosoftYaHei;
            font-size: 0.18rem;
            color: #cccccc;
          }
        }
        .b-right{
          display: flex;
          align-items: center;
          span{
            font-family: MicrosoftYaHei;
            font-size: 0.26rem;
          }
        }
      }
    }
    .botText{
      text-align: center;
      line-height: 1rem;
      background-color: #ccc;
      color: #fff;
    }
  }
</style>