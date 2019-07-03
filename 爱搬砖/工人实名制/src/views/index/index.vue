<template>
  <div class="index">
    <Header></Header>
    <div class="right">
      <login class="centerClass"></login>
      <div class="news">
        <el-row :gutter='24'>
          <el-col :span='12'
                  style="width:600px;padding-right:28px;padding-left:8px">
            <ul>
              <li>
                <p class="news-child-title">政策信息<span v-if="policyInformation.length>0"
                        @click="seeMoreNews">更多<i class="el-icon-arrow-right iconStyle"></i></span></p>
              </li>
              <li class="articleList"
                  @click="toArticleDetail(item.id)"
                  v-for="(item,index) in policyInformation"
                  :key="index">
                <h4><b>{{item.title}}</b><span v-if="item.isUp === 1">置顶</span></h4>
                <p class="resume"><b>{{item.abstract}}</b><span><i class="el-icon-time"></i>{{item.create_time}}</span></p>
              </li>
            </ul>
          </el-col>
          <el-col :span='12'
                  style="width:600px;padding-left:28px;padding-right:0">
            <ul>
              <li>
                <p class="news-child-title">政策信息<span @click="seeMoreNews"
                        v-if="industryInformation.length>0">更多<i class="el-icon-arrow-right iconStyle"></i></span></p>
              </li>
              <li class="articleList"
                  @click="toArticleDetail(item.id)"
                  v-for="(item,index) in industryInformation"
                  :key="index">
                <h4>{{item.title}}<span>置顶</span></h4>
                <p class="resume"><b>{{item.abstract}}</b><span><i class="el-icon-time"></i>{{item.create_time}}</span></p>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
    'login': _ => import('./comps/login')
    // 'infoList': _ => import('./comps/infoList')
  },
  data () {
    return {
      workerNum: 12313,
      comNum: 312321,
      proNum: 4132,
      policyInformation: [],
      industryInformation: [],
      l1: [
        { id: 1, title: 'dsadas', time: '3123123' },
        { id: 2, title: 'dsadas', time: '3123123' },
        { id: 3, title: 'dsadas', time: '3123123' },
        { id: 12, title: 'dsadas', time: '3123123' },
        { id: 21, title: 'dsadas', time: '3123123' }
      ]
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.filedData.dialogVisible = false
    },
    handleOk () {
    },
    handleDialogClose () {
    },
    toArticleDetail (articleID) {
      // 查看文章详情
      this.$router.push('/newsDetails/' + articleID)
    },
    seeMoreNews () {
      this.$router.push('/newsLists')
    }
  },
  mounted () {
    let req = {
      'type': '1', // 类型 1政策信息 2行业动态
      'isPage': '0' // 分页传1  不分页传0
    }
    this.$http.get('/loginNewsLists', { params: req }).then(res => {
      if (res.data.code === 200) {
        this.policyInformation = res.data.data
      }
    })
    let req2 = {
      'type': '2', // 类型 1政策信息 2行业动态
      'isPage': '0' // 分页传1  不分页传0
    }
    this.$http.get('/loginNewsLists', { params: req2 }).then(res => {
      if (res.data.code === 200) {
        this.industryInformation = res.data.data
      }
    })
  }
}
</script>

<style scoped lang="less">
.index {
  .right {
    width: 100%;
    padding-top: 24px;
    min-height: 680px;
    background-color: #fff;
    .nums {
      padding: 20px;
      height: 200px;
      h6 {
        font-size: 20px;
        line-height: 60px;
        font-weight: bold;
        span {
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
    // }
  }
  .news {
    width: 1200px;
    margin: 0 auto;
    margin-top: 36px;
    min-height: 455px;
    .news-child-title {
      font-size: 24px;
      color: #272828;
      font-weight: 600;
      margin-bottom: 14px;
      span {
        font-size: 18px;
        color: #25a69a;
        float: right;
        font-weight: 600;
        cursor: pointer;
        .iconStyle {
          font-size: 20px;
        }
      }
    }
    .articleList {
      padding: 13px 0 11px;
      border-bottom: solid 2px rgba(80, 81, 81, 0.04);
      cursor: pointer;
    }
    li:nth-last-of-type(1) {
      border-bottom: 0;
    }
    h4 {
      margin-bottom: 12px;
      font-size: 19px;
      span {
        width: 46px;
        height: 23px;
        background-color: #f5a623;
        border-radius: 12px 0px 0px 12px;
        font-size: 10px;
        line-height: 24px;
        margin-top: -5px;
        color: #ffffff;
        display: inline-block;
        text-align: center;
        float: right;
      }
      b {
        font-size: 19px;
        display: inline-block;
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
      }
    }
    .resume {
      color: #505151;
      opacity: 0.6;
      font-size: 16px;
      b {
        display: inline-block;
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
      }
      span {
        float: right;
        font-size: 12px;
        i {
          margin-right: 9px;
        }
      }
    }
  }
  .centerClass {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .centerClass {
    // position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .info {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
