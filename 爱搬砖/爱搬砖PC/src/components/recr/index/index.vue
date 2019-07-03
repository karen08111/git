<template>
  <div class="index recrIndex">
    <div class="slide">
      <el-carousel trigger="click" height="600px">
        <el-carousel-item v-for="(item,index) in slide" :key="index">
          <a :href="item.link" target="_blank"><img class="slide-img" :src="item.path" :onerror="$store.state.defaultImg"></a>
        </el-carousel-item>
      </el-carousel>
      <div class="info_box">
        <div class="num">
          <h3>今日采购信息</h3>
          <span>{{todayTotal}}条</span>
        </div>
        <div class="listWapper">
          <ul ref="todayInfo">
            <li v-for="item in todayInfos"><router-link :to="`/recrDetails/${item.id}`">{{item.title}}</router-link></li>
          </ul>
        </div>
        <div class="down" @click="following"></div>
      </div>
    </div>
    <div class="coms">
      <div class="tit">
        <h3>我们的客户</h3>
        <p>众多中外知名企业，选择了我们</p>
      </div>
      <ul>
<!--        <li v-for="item in coms"><router-link :to="`/comPage/${item.uid}`"><img :src="$store.state.site + item.avatar" alt="" :onerror="$store.state.defaultImg"></router-link></li>-->
        <li v-for="item in coms"><img :src="item" alt=""></li>
        <li class="empty"></li>
        <li class="empty"></li>
        <li class="empty"></li>
        <li class="empty"></li>
      </ul>
    </div>
    <div class="hot">
      <div class="tit">
        <h3>热门采购</h3>
        <p>众多中外知名企业，需要提供文案</p>
      </div>
      <ul>
        <li v-for="item in hotPurchaseInquiryList">
          <router-link :to="`/recrDetails/${item.id}`">
            <div class="title">{{item.title}}</div>
            <div class="bot">
              <img :src="$store.state.site + item.avatar" alt="" onerror="this.src='http://resource.aibanzhuan.cn/material/company.jpg'">
              <div class="txt">
                <p>{{item.company_name}}</p>
                <i class="xun"></i>
              </div>
            </div>
          </router-link>
        </li>
        <li v-for="item in hotPurchaseTenderingList">
          <router-link :to="`/recrDetails/${item.id}`">
            <div class="title">{{item.title}}</div>
            <div class="bot">
              <img :src="$store.state.site + item.avatar" alt="" onerror="this.src='http://resource.aibanzhuan.cn/material/company.jpg'">
              <div class="txt">
                <p>{{item.company_name}}</p>
                <i class="zhao"></i>
              </div>
            </div>
          </router-link>
        </li>
        <li class="empty"></li>
      </ul>
    </div>
    <div class="news">
      <div class="tit">
        <h3>行业资讯</h3>
        <p>众多中外知名企业，需要提供文案</p>
      </div>
      <ul>
        <li v-for="item in news">
          <img :src="$store.state.site + item.img_path" alt="" :onerror="$store.state.defaultImg">
          <div class="news_right">
            <div class="title"><router-link :to="{path: '/News_details',query:{id: item.id}}">{{item.title}}</router-link></div>
            <div class="content">
              <span>{{item.abstract | cutStr}}</span><router-link :to="{path: '/News_details',query:{id: item.id}}">了解更多</router-link>
            </div>
            <div class="part">
              <span>已有{{item.hits}}人阅读</span>
              <span>{{item.create_time}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      slide: [],
      todayTotal: 0,
      todayCount: 0,
      todayInfos: [],
      todayPage: 1,
      // coms: [],
      hotPurchaseInquiryList: [],
      hotPurchaseTenderingList: [],
      news: []
    }
  },
  filters: {
    cutStr (str) {
      if (str.length > 70) return str.slice(0, 70) + '...'
      else return str
    }
  },
  computed: {
    coms () {
      let arr = []
      for (let i = 1; i < 21; i++) {
        arr.push(require(`../../../assets/recr/comsLogo/timg${i}.jpg`))
      }
      return arr
    }

  },
  methods: {
    following () {
      this.todayPage++
      this.getTodayInfo().then(r => {
        if (r.length > 0) {
          this.todayInfos.push(...r)
          const el = this.$refs.todayInfo
          el.style.top = el.offsetTop - 278 + 'px'
        } else {
          this.todayPage--
        }
      })
    },
    async getTodayInfo () {
      let arr = await this.$http.get('/purchase/todayCreateInfoList', { params: { page: this.todayPage } }).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.todayCount = data.content
          this.todayTotal = data.total
          return data.data
        }
      })
      return arr
    }
  },
  created () {
    /* slider */
    this.$http.get('/common/sowing', { params: { sn: 10001 } }).then(res => {
      if (res.data.code === 200) {
        let arr = res.data.data
        arr.forEach(val => {
          val.path = /^(https?|\/\/)/i.test(val.path) ? val.path : this.$store.state.site + val.path
        })
        this.slide = res.data.data
      }
    })

    /* mian */
    this.$http.get('/purchase/index').then(res => {
      if (res.data.code === 200) {
        const data = res.data.data
        // this.coms =data.companyLogoList
        this.hotPurchaseInquiryList = data.hotPurchaseInquiryList
        this.hotPurchaseTenderingList = data.hotPurchaseTenderingList
        this.news = data.news
      }
    })

    /* 今日 */
    this.getTodayInfo().then(r => {
      this.todayInfos = r
    })
  }
}
</script>

<style scoped lang="less">
.index{
  .slide{
    position: relative;
    margin-bottom: 39px;
    .slide-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .info_box{
      width: 326px;
      height: 395px;
      background-color: #ffffff;
      border-radius: 2px;
      opacity: 0.9;
      position: absolute;
      top: 103px;
      right: 360px;
      z-index: 9;
      padding: 0 20px;
      padding-bottom: 15px;
      box-sizing: border-box;
      .num{
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
        h3{
          font-size: 20px;
          letter-spacing: 2px;
          color: #34495e;
        }
        span{
          font-size: 12px;
          letter-spacing: 1px;
          color: #ffffff;
          padding: 3px 10px;
          background-color: #3388ff;
          border-radius: 6px;
        }
      }
      .listWapper{
        height: 274px;
        overflow: hidden;
        margin-bottom: 19px;
        position: relative;
        ul{
          width: 100%;
          position: absolute;
          top: 0;
          transition: top .4s;
          li{
            width: 100%;
            background: url("../../../assets/recr/yuandian.png") no-repeat left center / 8px 8px;
            text-indent: 18px;
            font-size: 12px;
            letter-spacing: 1px;
            color: #34495e;
            margin-bottom: 19px;
            &:hover{
              background: url("../../../assets/recr/yuandian1.png") no-repeat left center / 8px 8px;
            }
            a{
              display: block;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .down{
        height: 13px;
        background: url("../../../assets/recr/index_down.png") no-repeat center center;
        cursor: pointer;
      }
    }
  }
  .tit{
    text-align: center;
    h3{
      font-size: 55px;
      letter-spacing: 3px;
      color: #34495e;
      margin-bottom: 18px;
    }
    p{
      font-size: 14px;
      letter-spacing: 1px;
      color: #34495e;
    }
  }
  .empty{
    height: 0 !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .coms{
    padding: 39px 0 41px;
    ul{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 60px;
      li{
        width: 20%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        &:hover{
          background-color: #f7f7f7;
        }
        img{
          width: 200px;
          height: 100px;
          object-fit: scale-down;
        }
      }
    }
  }
  .hot{
    width: 100%;
    padding: 40px 0 30px;
    background-color: #f1f1f1;
    ul{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 59px;
      li{
        width: 386px;
        height: 140px;
        background-color: #ffffff;
        border-radius: 4px;
        transition: all .4s;
        margin-bottom: 10px;
        &:hover{
          box-shadow: 0px 4px 5px 1px rgba(187, 187, 187, 0.3);
        }
        a{
          display: block;
          width: 100%;
          height: 100%;
          padding: 20px;
          padding-top: 0;
          box-sizing: border-box;
          .title{
            height: 56px;
            line-height: 56px;
            border-bottom: 1px dashed #e5e5e5;
            font-size: 16px;
            letter-spacing: 1px;
            color: #34495e;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .bot{
            display: flex;
            align-items: center;
            height: 83px;
            img{
              width: 44px;
              height: 44px;
              border-radius: 50%;
              object-fit: cover;
              margin-right: 10px;
            }
            .txt{
              p{
                font-size: 14px;
                letter-spacing: 1px;
                color: #999999;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                margin-bottom: 12px;
              }
              i{
                display: block;
                width: 48px;
                height: 17px;
                &.xun{
                  background: url("../../../assets/recr/xunjia.png");
                }
                &.zhao{
                  background: url("../../../assets/recr/zhaobiao.png");
                }
              }
            }
          }
        }
      }
    }
  }
  .news{
    padding: 39px 0 20px;
    ul{
      width: 1200px;
      height: 428px;
      margin: 60px auto 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: space-between;
      li{
        width: 590px;
        height: 194px;
        background-color: #ffffff;
        border: solid 1px #f1f1f1;
        box-sizing: border-box;
        padding: 20px 10px 20px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: 240px;
          height: 154px;
          background-color: #ff532d;
          border-radius: 2px;
          object-fit: cover;
        }
        .news_right{
          width: 305px;
          .title{
            height: 40px;
            line-height: 20px;
            letter-spacing: 1px;
            color: #34495e;
            margin-bottom: 11px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .content{
            height: 60px;
            font-size: 12px;
            line-height: 20px;
            color: #999999;
            margin-bottom: 25px;
            a{
              color: #3388ff;
            }
          }
          .part{
            display: flex;
            justify-content: space-between;
            span{
              font-size: 12px;
              letter-spacing: 1px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
  .recrIndex{
    .slide .el-carousel__arrow--left{
      left: 5%;
    }
    .slide .el-carousel__arrow--right{
      right: 5%;
    }
  }
</style>
