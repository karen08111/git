<template>
  <div class="news">
    <!--<Slide :slides="slides" :height="'600px'"></Slide>-->
    <div class="container">
      <div class="item" v-for="i in items">
        <h4>{{i.title}}<span>{{i.create_time}}</span></h4>
        <div class="fb">发布源：<span class="fby">{{i.publisher}}</span></div>
        <div class="article">
          <div class="txt">
            <span>{{i.abstract}}</span>
            <router-link :to="{path: '/News_details',query:{id: i.id}}" class="more">阅读全文</router-link>
            <div class="icon">
              <i class="zan" :class="{isLaud : i.isUpvote}"
                 @click.prevent="zan(i.id)"><span>{{i.upvote}}</span></i>
              <router-link :to="{path: '/News_details',query:{id: i.id,iscomment: 1}}" class="more"><i class="pl"><span>{{i.commentNumber}}</span></i></router-link>
            </div>
          </div>

        </div>
        <div class="image" v-if="i.img_path"><img :src="$store.state.site + i.img_path" :onerror="$store.state.defaultImg"></div>
        <div class="image" v-else><img src="../../assets/none.png"></div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <paging :total="total" :page.sync="page" :size="size"></paging>
  </div>
</template>

<script>
import paging from '@/components/need/components/paging'
export default {
  name: 'News_center',
  components: { paging },
  data () {
    return {
      slides: [require('../../assets/slide1.png'), require('../../assets/slide2.png')],
      items: [],
      total: 0,
      page: 1,
      size: 15
    }
  },
  watch: {
    page () {
      this.request()
    }
  },
  methods: {
    request () {
      this.$http.get(this.$store.state.site + '/newsList', { params: { page: this.page } }).then(res => {
        if (res.data.code == 200) {
          this.items = res.data.data.data
          this.total = +res.data.data.total
          this.page = +res.data.data.current_page
          this.size = +res.data.data.per_page
        }
      })
    },
    zan (val) {
      this.$http.get(this.$store.state.site + '/member/publisher/' + val).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.request()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created () {
    document.querySelector('title').innerHTML = '咨询中心'

    /* const navs = this.$store.state.navs
      for (let i of navs) {
        i.isactive = false
      }
      navs[0].isactive = true */

    this.request()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .container {
    width: 1200px;
    margin: 46px auto 40px;
    padding: 0 !important;
  }

  .item {
    width: 1200px;
    height: 245px;
    background-color: #fafafd;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 30px;
    transition: all .4s;
    margin-bottom: 20px;
    position: relative;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .item .txt .icon{
    position: absolute;
    bottom: 30px;
    right: 200px;
  }

  .item:hover {
    margin-top: -2px;
    margin-bottom: 22px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  }

  .item h4 {
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    letter-spacing: 0px;
    color: #333333;
    line-height: 1;
    padding-top: 35px;
    margin: 0;
  }

  .item h4 span {
    font-family: ArialMT;
    font-size: 14px;
    letter-spacing: 1px;
    color: #808080;
    float: right;
  }

  .item .fb {
    font-size: 13px;
    letter-spacing: 1px;
    color: #808080;
    line-height: 1;
    margin: 30px 0 25px;
  }

  .item .article {
    width: 948px;
    float: left;
    .txt a {
      color: #3388ff;
    }
  }

  .item .article span {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1px;
    color: #333333;
  }

  .item .article i.pl {
    display: inline-block;
    width: 22px;
    height: 20px;
    background-image: url("../../assets/comment.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    float: right;
    cursor: pointer;
  }

  .item .article i.zan {
    display: inline-block;
    width: 23px;
    height: 20px;
    background-image: url("../../assets/laud.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    float: right;
    margin-left: 40px;
    margin-right: 30px;
    cursor: pointer;
    &.isLaud {
      background-image: url("../../assets/laud1.png");
    }
  }

  .item .article i span {
    margin-left: 24px;
    font-size: 14px;
    font-style: initial;
    font-family: ArialMT;
    color: rgba(128, 128, 128, 1);
  }

  .item .image {
    float: right;
    width: 160px;
    height: 90px;
    background-color: #e6e6e6;
    border-radius: 10px;
    overflow: hidden;
  }

  .item .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

</style>
