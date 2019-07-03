<template>
  <div class="details">
    <div class="news_container">
      <div class="art">
        <h1>{{title}}<span>{{create_time}}</span></h1>
        <div v-html="content"></div>
        <div class="information">
          <!--<p>作者：PM圈子</p>-->
          <!--<p>链接：<a target="_blank" href="https://www.toutiao.com/a6526765158696501763/">https://www.toutiao.com/a6526765158696501763/</a></p>-->
          <p>来源：{{publisher}}</p>
        </div>
      </div>
      <div class="pz">
        <i class="pl" :class="{active : isComment}" @click="isComment = !isComment"></i><span>{{discuss.length}}</span>
        <i class="zan" :class="{ active : isLaud}" @click="laud"></i><span>{{upvote}}</span>
      </div>
    </div>
    <el-collapse-transition>
      <div class="comment" v-show="isComment">
        <div class="cheader">评论（<span class="cnum">{{discuss.length}}</span>）</div>
        <ul id="discuss">
          <li v-for="i in discuss">
            <div class="himg" v-if="i.avatar"><img :src="$store.state.site + i.avatar" :onerror="$store.state.defaultImg"></div>
            <div class="himg" v-else><img src="../../assets/none.png" :onerror="$store.state.defaultImg"></div>
            <div class="txt">
              <div class="user">{{i.name}}<span class="ftime">{{i.create_time}}</span></div>
              <div class="content">{{i.comment}}</div>
            </div>
          </li>
        </ul>
        <paging :total="total" :page.sync="page" :size="size"></paging>
        <div class="release">
          <el-input v-model="release" placeholder="写下你的评论" style="width: 916px; margin-right: 41px"></el-input>
          <el-button type="primary" @click="publish">发 布</el-button>
        </div>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
/* 日期格式转换 */
import paging from '@/components/need/components/paging'

Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

// 取窗口可视范围的高度
function getClientHeight () {
  var clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  } else {
    var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
  }
  return clientHeight
}

// 取窗口滚动条高度
function getScrollTop () {
  var scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}
export default {
  name: 'News_details',
  components: { paging },
  data () {
    return {
      id: this.$route.query.id,
      release: '',
      isComment: false,
      isLaud: false,
      discuss: [],
      title: '',
      create_time: '',
      content: '',
      publisher: '',
      upvote: '',
      total: 0,
      page: 1,
      size: 15
    }
  },
  watch: {
    title (val) {
      document.title = val
    },
    page () {
      this.getCuss()
    }
  },
  methods: {
    getCuss () {
      this.$http.get(this.$store.state.site + '/commentLists/' + this.id, { params: { page: this.page } }).then(res => {
        if (res.data.code == 200) {
          this.discuss = res.data.data.data
          this.total = +res.data.data.total
          this.page = +res.data.data.current_page
          this.size = +res.data.data.per_page
        }
      })
    },
    publish () {
      const formData = new FormData()
      formData.append('news', this.id)
      formData.append('comment', this.release)
      this.$http.post(this.$store.state.site + '/member/mkComment', formData).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.release = ''
        } else {
          this.$message.error(res.data.msg)
        }
        this.getCuss()
      })
    },
    laud () {
      this.$http.get(this.$store.state.site + '/member/publisher/' + this.id).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.isLaud = true
          this.$http.get(this.$store.state.site + '/detailsNews/' + this.id).then(res => {
            if (res.data.code == 200) {
              const data = res.data.data
              this.upvote = data.upvote
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  created () {
    document.title = '资讯详情'

    if (this.$route.query.iscomment) {
      const height = getClientHeight() + getScrollTop()
      this.isComment = true
      document.body.scrollTop = height - 450 + 'px'
    }

    this.$http.get(this.$store.state.site + '/detailsNews/' + this.id).then(res => {
      if (res.data.code == 200) {
        const data = res.data.data
        this.title = data.title
        this.create_time = data.create_time
        this.content = data.content
        this.publisher = data.publisher
        this.upvote = data.upvote
      }
    })

    if (this.$cookies.get('abztoken')) {
      this.$http.get(this.$store.state.site + '/member/queryPublisher/' + this.id).then(res => {
        if (res.data) this.isLaud = true
        else this.isLaud = false
      })
    }

    this.getCuss()
  }
}
</script>

<style lang="less">
  .details {
    width: 1200px;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    word-break: break-all;
  }

  .news_container {
    width: 100%;
    background-color: #fafafd;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 30px 30px 20px;
    box-sizing: border-box;
  }

  .art h1 {
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    line-height: 1.4;
    margin: 0;
    padding: 30px 0 14px;
    text-align: center;
  }

  .art h1 span {
    float: right;
    font-size: 13px;
    color: #999999;
  }

  .art p {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1px;
    color: #333333;
    margin-bottom: 20px;
  }

  .information p {
    margin-bottom: 0 !important;
  }

  .art .link a {
    color: #333333;
    &:hover {
      color: #3f7be9;
    }
  }

  h2,h3,h4,h5,h6 {
    font-size: 14px;
    color: #000;
    font-weight: 600;
    margin: 0;
  }

  .art img {
    display: block;
    margin: 0 auto 20px;
    max-width: 1000px;
  }

  .pz {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-right: 30px;
    margin-top: 20px;
  }

  .pz i.pl {
    display: inline-block;
    width: 22px;
    height: 20px;
    background-image: url("../../assets/comment.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    cursor: pointer;
    &.active {
      background-image: url("../../assets/comment1.png");
    }
  }

  .pz i.zan {
    display: inline-block;
    width: 23px;
    height: 20px;
    background-image: url("../../assets/laud.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin-left: 40px;
    cursor: pointer;
    &.active {
      background-image: url("../../assets/laud1.png");
    }
  }

  .pz span {
    font-size: 14px;
    font-style: initial;
    font-family: ArialMT;
    color: rgba(128, 128, 128, 1);
  }

  .comment {
    width: 100%;
    /*height: 501px;*/
    background-color: #ffffff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    margin-top: 20px;
    padding: 20px 30px 40px;
    box-sizing: border-box;
  }

  .comment .cheader {
    font-size: 14px;
    font-weight: 600;
    line-height: 50px;
    color: #434348;
    line-height: 1;
    margin-bottom: 20px;
  }

  .comment > ul {
    /*height: 316px;
    overflow-y: scroll;*/
    margin-bottom: 40px;
  }

  .comment > ul::-webkit-scrollbar {
    display: none;
  }

  .comment > ul li {
    width: 100%;
    padding-top: 39px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .comment > ul li .himg {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
  }

  .comment > ul li .himg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .comment > ul li .txt {
    width: 100%;
  }

  .comment > ul li .txt .user {
    font-size: 14px;
    font-weight: 600;
    line-height: 40px;
    color: #333333;
    position: relative;
  }

  .comment > ul li .txt .user span {
    position: absolute;
    top: 0;
    right: 0;
    font-family: ArialMT,MicrosoftYaHei,'宋体';
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }

  .comment > ul li .txt .content {
    width: 965px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 1px;
    color: #333333;
    padding-bottom: 30px;
    border-bottom: 1px solid #f0f0f0;
  }

  .comment .release {
    font-size: 0;
  }
</style>
