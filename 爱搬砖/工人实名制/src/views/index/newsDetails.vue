<template>
  <div class="newsDetails">
    <Header :headerData='headerTag'></Header>
    <div class="news-details-body">
      <div class="title">
        <h3>{{newsData.title}}</h3>
      </div>
      <div class="new-info-style">
        <span>{{newsData.type.title}}</span>
        <span class="new-info-center-style"><i class="el-icon-time"></i><b>{{newsData.create_time}}</b></span>
        <span class="new-info-right-style"><i class="el-icon-view"></i><b>{{(newsData.hits || 0 ) +'人已浏览'}}</b></span>
      </div>
      <div class="content"
           v-html="newsData.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsDetails',
  data () {
    return {
      title: '新闻详情',
      content: '',
      headerTag: {
        msg: '新闻资讯',
        path: 'newsLists'
      },
      newsData: {
        'id': 24, // 新闻ID
        'publisher': '爱搬砖', // 发布源、出版商
        'type': {
          'id': 1, // 新闻类型ID
          'title': '跋扈'// 新闻类型名称
        },
        'title': '标题', // 新闻标题
        'abstract': '嘿嘿', // 新闻简介
        'content': '详情而已', // 详情
        'img_path': '1231', // 资讯图片
        'upvote': 1, // 点赞量
        'hits': 0, // 浏览量
        'create_time': '2019-06-21'// 发布时间
      }
    }
  },
  created () {
    this.$http.get('/detailsNews/' + this.$route.params.id, this.corpInfo).then(res => {
      if (res.data.code === 200) {
        this.newsData = res.data.data
        document.title = this.newsData.title
      } else {
        this.errorMsg = res.data.msg
      }
      this.getCodeBtnLoading = false
    })
  }
}
</script>

<style scoped lang="less">
.newsDetails {
  background-color: #fff;
  .news-details-body {
    width: 1200px;
    margin: 0 auto;
  }
  .title {
    text-align: center;
    h3 {
      font-size: 42px;
      margin: 36px auto;
    }
  }
  .content {
    // line-height: 30px;
    // /deep/ p {
    //   line-height: 30px;
    //   font-size: 16px;
    // }
    // /deep/ img {
    //   line-height: 30px;
    //   font-size: 16px;
    // }
  }
  .new-info-style {
    margin-bottom: 94px;
    span {
      color: #505151;
      opacity: 0.6;
      float: left;
      font-size: 16px;
      i {
        font-size: 16px;
      }
    }
    .new-info-center-style {
      margin-left: 850px;
      i {
        margin-right: 12px;
      }
    }
    .new-info-right-style {
      margin-left: 40px;
      font-size: 16px;
      i {
        font-size: 16px;
        margin-right: 8px;
      }
    }
  }
}
</style>
