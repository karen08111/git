<template>
  <div class="index">
    <Header :headerData='headerTag'></Header>
    <div class="header-img-style"></div>
    <div class="news-content-style">
      <div class="news-class-style">
        <el-row :gutter='24'>
          <el-col :span='12'
                  style="border-right: 1px solid rgba(80,81,81,0.04);">
            <div>
              <p class="news-child-title"><b></b>政策信息<span @click="more1">更多</span></p>
              <div class="news-child-1-class-bg">
              </div>
            </div>
          </el-col>
          <el-col :span='12'
                  style="padding-left:80px;">
            <div>
              <p class="news-child-title"><b></b>行业动态<span @click="more2">更多</span></p>
              <div class="news-child-class-bg">
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <div class="news">
          <el-row :gutter='24'>
            <el-col :span='24'
                    style="width:1200px;padding-right:12px;padding-left:8px">
              <ul>
                <!-- <li>
                  <p class="news-child-title">政策信息<span>更多<i class="el-icon-arrow-right iconStyle"></i></span></p>
                </li> -->
                <li class="articleList"
                    @click="toArticleDetail(item.id)"
                    v-for="(item,index) in policyInformation"
                    :key="index">
                  <div class="news-li-left-info-style">
                    <img :src='baseUrl + item.img_path'
                         width="383px"
                         height='228px' />
                    <span>{{item.title}}</span>
                  </div>
                  <div class="news-li-right-info-style">
                    <h4><b>{{item.title}}</b><span v-if="item.isUp === 1">置顶</span></h4>
                    <p class="resume"><b>{{item.abstract}}</b></p>
                    <p class="resume-footer-style"><span><i class="el-icon-time"></i>{{item.create_time}}</span><span class="view-style"><i class="el-icon-view"></i>{{(item.hits || 0) + '人已浏览'}}</span></p>
                  </div>
                </li>
              </ul>
            </el-col>
            <!-- <el-col :span='12'
                    style="width:600px;padding-left:28px;padding-right:0">
              <ul>
                <li>
                  <p class="news-child-title">政策信息<span v-if="industryInformation.length>0">更多<i class="el-icon-arrow-right iconStyle"></i></span></p>
                </li>
                <li class="articleList"
                    @click="toArticleDetail(item.id)"
                    v-for="(item,index) in industryInformation"
                    :key="index">
                  <h4>{{item.title}}<span>置顶</span></h4>
                  <p class="resume"><b>{{item.abstract}}</b><span><i class="el-icon-time"></i>{{item.create_time}}</span></p>
                </li>
              </ul>
            </el-col> -->
          </el-row>
        </div>
        <div class="pagination-style">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page="paginationData.current_page"
                         :page-size="15"
                         prev-text='上一页'
                         next-text='下一页'
                         background
                         layout="total, prev, pager, next, jumper"
                         :total="paginationData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsLists',
  data () {
    return {
      workerNum: 12313,
      comNum: 312321,
      proNum: 4132,
      baseUrl: process.env.VUE_APP_baseURL,
      policyInformation: [],
      industryInformation: [],
      params: {},
      l1: [
        { id: 1, title: 'dsadas', time: '3123123' },
        { id: 2, title: 'dsadas', time: '3123123' },
        { id: 3, title: 'dsadas', time: '3123123' },
        { id: 12, title: 'dsadas', time: '3123123' },
        { id: 21, title: 'dsadas', time: '3123123' }
      ],
      headerTag: {
        msg: '新闻资讯',
        path: 'newsLists'
      },
      paginationData: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 14
      }
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
    handleCurrentChange (val) {
      this.params.page = val
      this.getNewsList(this.params)
    },
    getNewsList (val) {
      this.$http.get('/loginNewsLists', { params: val }).then(res => {
        if (res.data.code === 200) {
          this.policyInformation = res.data.data.data
        }
      })
    },
    more1 () {
      this.params.type = 1
      this.getNewsList(this.params)
    },
    more2 () {
      this.params.type = 2
      this.getNewsList(this.params)
    }
  },
  mounted () {
    this.params = {
      'isPage': '1' // 分页传1  不分页传0
    }
    this.getNewsList(this.params)
    // this.$http.get('/newsList', { params: req }).then(res => {
    //   if (res.data.code === 200) {
    //     this.policyInformation = res.data.data.data
    //   }
    // })
    // let req2 = {
    //   'type': '2', // 类型 1政策信息 2行业动态
    //   'isPage': '0' // 分页传1  不分页传0
    // }
    // this.$http.get('/loginNewsLists', { params: req2 }).then(res => {
    //   if (res.data.code === 200) {
    //     this.industryInformation = res.data.data
    //   }
    // })
  }
}
</script>

<style scoped lang="less">
.index {
  background-color: #fff;
  .right {
    width: 100%;
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
    .pagination-style {
      text-align: right;
      margin-top: 72px;
    }
  }
  .header-img-style {
    height: 400px;
    background-image: url("../../assets/newsBG.png");
  }
  .news-content-style {
    width: 1200px;
    margin: 0 auto;
    margin-top: -87px;
  }
  .news-class-style {
    width: 984px;
    height: 281px;
    box-shadow: 0px 6px 17px 1px rgba(0, 0, 0, 0.04);
    border-radius: 40px;
    background-color: #fff;
    margin-bottom: 87px;
    padding: 31px 108px 38px;
    .news-child-title {
      font-size: 24px;
      color: #272828;
      font-weight: 600;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      b {
        width: 10px;
        height: 10px;
        background-color: #25a69a;
        border-radius: 50%;
        display: inline-block;
        margin-right: 20px;
      }
      span {
        font-size: 18px;
        border-radius: 15px;
        border: solid 2px #25a69a;
        color: #25a69a;
        width: 70px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        margin-left: 193px;
        font-weight: 600;
        cursor: pointer;
        .iconStyle {
          font-size: 20px;
        }
      }
    }
    .news-child-1-class-bg {
      margin-left: 10px;
      width: 383px;
      height: 228px;
      background-image: url("../../assets/news-title-1.png");
      background-size: 100%;
    }
    .news-child-class-bg {
      margin-left: 10px;
      width: 383px;
      height: 228px;
      background-image: url("../../assets/news-title-2.png");
      background-size: 100%;
    }
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
      cursor: pointer;
      overflow: hidden;
      position: relative;
      img {
      }
      .news-li-left-info-style {
        border-radius: 20px;
        width: 383px;
        height: 228px;
        float: left;
        span {
          display: inline-block;
          width: 68px;
          padding-left: 10px;
          line-height: 30px;
          color: #fff;
          height: 30px;
          position: absolute;
          left: 0;
          top: 32px;
          background-color: #25a69a;
          border-radius: 0px 15px 15px 0px;
        }
      }
      .news-li-right-info-style {
        margin-left: 54px;
        float: left;
        width: 740px;
        overflow: hidden;
      }
    }
    h4 {
      margin-bottom: 30px;
      font-size: 24px;
      span {
        width: 46px;
        height: 23px;
        background-color: #f5a623;
        border-radius: 0px 0px 4px 4px;
        font-size: 10px;
        line-height: 24px;
        color: #ffffff;
        display: inline-block;
        text-align: center;
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
    .resume-footer-style {
      position: absolute;
      bottom: 14px;
      color: #505151;
      opacity: 0.6;
      font-size: 16px;
      i {
        margin-right: 9px;
      }
      .view-style {
        margin-left: 40px;
      }
    }
    .resume {
      color: #505151;
      opacity: 0.6;
      font-size: 16px;
      b {
        display: inline-block;
        width: 740px;
        overflow: hidden;
      }
      // span {
      //   float: right;
      //   font-size: 12px;
      //   i {
      //     margin-right: 9px;
      //   }
      // }
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
