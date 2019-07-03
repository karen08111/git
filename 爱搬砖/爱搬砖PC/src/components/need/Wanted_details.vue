<template>
  <div>
    <div class="tips">
      <div class="main">
        <span class="tip" v-for="i in tips">{{i}}</span>
      </div>
    </div>
    <div class="details">
      <div class="dheader">
        <div class="image"><img v-if="imgurl" :src="$store.state.site + imgurl" :onerror="$store.state.defaultImg"></div>
        <div class="txt">
          <h1>
            <b v-if="dq_type == 1">{{title}}</b>
            <b v-if="dq_type == 2">{{title}}</b>
            <span class="right"><i class="iconfont icon-yuedu"></i>浏览数量：{{hits}}人</span>
            <span class="right"><i class="iconfont icon-shijian"></i>发布时间：{{create_time ? create_time.slice(0,10) : ''}}</span>
          </h1>
          <div class="ttop">
            <div class="info">
              <p><span>薪资：<b>{{pay}}</b></span></p>
              <p v-if="dq_type == 2 && resume_type == 1"><span>队伍规模：<b>{{nums}}人</b></span></p>
              <p v-if="dq_type == 2 && resume_type == 2"><span>机械数量：<b>{{nums}}人</b></span></p>
              <p><span>服务范围：<b>{{region}}</b></span></p>
              <p v-if="dq_type == 1"><span>工人名称：<b><router-link :to="{path: '/Homepage_per',query: {id:uid}}">{{team_name}}</router-link></b></span>
              </p>
              <p v-if="dq_type == 2"><span>队伍名称：<b><router-link :to="{path: '/Homepage_team',query: {id:uid}}">{{team_name}}</router-link></b></span>
              </p>
            </div>
            <div class="btn">
              <el-button type="primary" plain @click="follow">{{isFollow ? '已关注' : '关注'}}</el-button>
              <el-button type="primary" @click="dialogVisible = true">立即沟通</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="mian_left">
          <h4 v-if="job_content">详情描述</h4>
          <div class="content">{{job_content}}</div>
          <h4 v-if="per_content">个人介绍</h4>
          <div class="content">{{per_content}}</div>
          <h4>推荐找活</h4>
          <ul class="groom">
            <li v-for="i in list">
              <router-link :to="{path: '/Wanted_details',query: {id:i.id}}">
                <div class="image" v-if="i.imgs"><img :src="$store.state.site + i.imgs" :onerror="$store.state.defaultImg"></div>
                <div class="image" v-else><img src="../../assets/none.png"></div>
                <div class="txt">
                  <p class="red">￥: <span class="bs">{{i.min_pay == 0 ? '面议' : (i.min_pay == i.max_pay ? i.max_pay+'k' : i.min_pay+'k-'+i.max_pay+'k')}}</span>
                  </p>
                  <p class="tit">{{i.title}}</p>
                  <div class="com">{{i.team_name}}</div>
                  <div class="bot">
                    <span class="bt">{{i.work_name}}</span>
                    <div class="place"><i class="el-icon-location-outline"></i>{{i.region[1].title}}</div>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="main_right">
          <Advert></Advert>
        </div>
      </div>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span style="font-size: 16px">联系方式: {{mobile}}</span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Wanted_details',
  data () {
    return {
      id: this.$route.query.id,
      uid: null,
      dq_type: 1,
      resume_type: null,
      imgurl: '',
      title: '',
      mobile: '',
      create_time: 0,
      hits: 0,
      nums: 0,
      min_pay: 0,
      max_pay: 0,
      region: '',
      team_name: '',
      job_content: '',
      per_content: '',
      isFollow: false,
      list: [],
      tips: null,
      dialogVisible: false
    }
  },
  computed: {
    pay () {
      if (this.min_pay == 0) return '面议'
      else if (this.min_pay == this.max_pay) return this.max_pay + 'k'
      else return this.min_pay + 'k-' + this.max_pay + 'k'
    }
  },
  watch: {
    '$route' (to, from) {
      window.location.reload()
    }
  },
  methods: {
    follow () {
      if (this.isFollow) {
        this.$http.get(this.$store.state.site + '/member/offReleaseFollow', { params: { followId: this.id, type: 2 } }).then(res => {
          if (res.data.code == 200) {
            this.isFollow = !this.isFollow
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.$http.get(this.$store.state.site + '/member/inReleaseFollow', { params: { followId: this.id, type: 2 } }).then(res => {
          if (res.data.code == 200) {
            this.isFollow = !this.isFollow
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  },
  created () {
    document.querySelector('title').innerHTML = '找活详情'
    const navs = this.$store.state.navs
    for (let i of navs) {
      i.isactive = false
    }
    navs[2].isactive = true

    this.$http.get(this.$store.state.site + '/detail/' + this.id).then(res => {
      const data = res.data.data
      this.uid = data.info.uid
      this.dq_type = data.data.dq_type
      this.resume_type = data.data.resume_type
      if (data.imgs.length > 0) { this.imgurl = data.imgs[0].path }
      this.tips = data.data.recruit_type == 1 ? ['技术工种', data.work_name] : ['司机/驾驶员', data.work_name]
      this.title = data.data.title
      this.mobile = data.data.mobile
      this.create_time = data.data.update_time
      this.hits = data.data.hits
      this.nums = data.info.nums
      this.min_pay = data.data.min_pay
      this.max_pay = data.data.max_pay
      this.region = data.data.region
      this.team_name = data.info.company_name
      this.job_content = data.data.content
      this.per_content = data.info.content
      this.list = data.recommander
    }).catch(error => {
      console.log(error)
    })

    if (this.$cookies.get('usertel') || this.$cookies.get('username')) {
      this.$http.get(this.$store.state.site + '/member/seeReleaseFollow', { params: { followId: this.id, type: 2 } }).then(res => {
        if (res.data == 1) {
          this.isFollow = true
        } else {
          this.isFollow = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .tips {
    width: 100%;
    height: 50px;
    background-color: #f2f2f2;
    .main {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
    .tip {
      padding: 4px 12px;
      border-radius: 6px;
      background-color: #fff;
      cursor: pointer;
      position: relative;
      margin-right: 20px;
      white-space: nowrap;
      float: left;
    }
  }

  .details {
    width: 1200px;
    margin: 10px auto 40px;
    .dheader {
      display: flex;
      align-items: flex-start;
      padding-bottom: 24px;
      border-bottom: 1px dashed #e5e5e5;
      .image {
        width: 440px;
        min-width: 440px;
        margin-right: 35px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .txt {
        h1 {
          width: 723px;
          font-size: 18px;
          letter-spacing: 2px;
          color: #333333;
          margin-bottom: 60px;
          span {
            font-size: 12px;
            letter-spacing: 1px;
            color: #b6b6b6;
            i {
              margin-right: 10px;
              font-size: 12px;
            }
            &:first-of-type {
              margin-left: 20px;
            }
          }
        }
        .ttop {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          p {
            margin-bottom: 30px;
            span {
              font-size: 16px;
              letter-spacing: 2px;
              color: #999999;
              margin-right: 50px;
              b {
                font-weight: 400;
                color: #333333;
              }
            }
          }
          .btn {
            padding-top: 115px;
          }
          a {
            color: #3388ff;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .tbot {
          padding-top: 20px;
          h2 {
            font-size: 16px;
            letter-spacing: 2px;
            color: #999999;
            margin-bottom: 39px;
            i {
              display: inline-block;
              width: 12px;
              height: 14px;
              background: url("../../assets/auth_com.png") no-repeat;
              margin-left: 14px;
              vertical-align: middle;
            }
          }
          .introduce {
            .intr {
              display: inline-block;
              width: 505px;
              vertical-align: top;
              margin-right: 52px;
              p {
                font-size: 13px;
                line-height: 28px;
                letter-spacing: 1px;
                color: #999999;
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 6;
                overflow: hidden;
              }
            }
            img {
              width: 157px;
            }
          }
        }
      }
    }
    .main {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .mian_left {
        width: 898px;
        h4 {
          font-size: 16px;
          letter-spacing: 2px;
          color: #333333;
          margin-top: 40px;
          margin-bottom: 15px;
          &:before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 16px;
            background-color: #3388ff;
            margin-right: 10px;
            vertical-align: top;
          }
        }
        .content {
          font-size: 16px;
          line-height: 28px;
          letter-spacing: 2px;
          color: #999999;
        }
        #map {
          width: 898px;
          height: 363px;
          border-radius: 10px;
          border: solid 1px #e7e7e7;
          margin-top: 14px;
        }
        ul.groom {
          display: flex;
          width: 906px;
          li{
            width:220px;
            height:352px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(231,231,231,1);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-sizing: border-box;
            margin-right: 6px;
            margin-bottom: 40px;
            transition: all .4s;
            position: relative;
            overflow: hidden;
            &:hover{
              margin-top: -2px;
              margin-bottom: 42px;
              box-shadow: 0 10px 15px #888888;
            }
            .image{
              width: 100%;
              height: 178px;
              overflow: hidden;
              position: relative;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .txt{
              padding: 0 10px;
              .red{
                font-size:13px;
                color:rgba(245,70,70,1);
                margin-top: 10px;
                span{
                  font-size: 16px;
                }
              }
              .tit{
                font-size:13px;
                color:rgba(51,51,51,1);
                height: 38px;
                line-height:38px;
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .com{
                font-size:13px;
                color:rgba(153,153,153,1);
                line-height:1;
                padding: 13px 0 18px;
                border-top: 1px dashed rgba(229,229,229,1);
              }
              .bt{
                height: 20px;
                line-height: 20px;
                padding: 0 9px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(51,136,255,1);
                border-radius:4px;
                font-size: 13px;
                color: #3388ff;
                white-space: nowrap;
              }
              .place{
                font-size:13px;
                color:rgba(153,153,153,1);
                line-height:20px;
                white-space: nowrap;
                margin-top: 11px;
              }
            }
          }
        }
      }
      .main_right {
        width: 280px;
        margin-top: 20px;
        .headtitle {
          width: 280px;
          height: 370px;
          border-radius: 4px;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          padding-top: 30px;
          text-align: center;
          background: url("../../assets/grbg.png") no-repeat center center / 102% 103%;
          h6 {
            font-size: 14px;
            font-weight: bold;
            line-height: 20px;
            color: rgba(51, 51, 51, 1);
            padding-left: 30px;
            text-align: left;
          }
          img {
            width: 157px;
            border-radius: 6px;
            margin-top: 21px;
          }
          p {
            font-size: 18px;
            font-weight: bold;
            color: rgba(51, 136, 255, 1);
            line-height: 30px;
            margin-top: 39px;
          }
        }
      }
    }
  }
</style>
