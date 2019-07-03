<template>
  <div class="app">
    <div class="main">
      <div class="header">
        <img :src="site + info.avatar" alt="" class="logo" onerror="this.src='http://resource.aibanzhuan.cn/material/company.jpg'">
        <h3>
          <p>{{info.name}}</p>
          <div class="btn" @click="attention">{{isattTxt}}</div>
        </h3>
        <div class="contact">
          <p>办公电话：{{info.office_mobile}}</p>
          <p>传真号码：{{info.fax_number}}</p>
          <p>企业网址：{{info.official_website}}</p>
          <p>企业邮箱：{{info.enterprise_email}}</p>
        </div>
      </div>
      <div class="sam">
        <comSwiper :list="imgs" hei="300px" style="width: 400px;"></comSwiper>
        <div>
          <div class="address"><i class="iconfont icon-dibiao"></i>{{info.company_address}}</div>
          <Map_temp :mapxy="map_pos" :width="740" :height="259"></Map_temp>
        </div>
      </div>
      <div class="content">
        <h4>企业介绍</h4>
        <p>{{info.content}}</p>
      </div>
      <div class="aptitude" v-if="senioritys.length !== 0">
        <h4>个人资质</h4>
        <Aptitude :list="senioritys"></Aptitude>
      </div>
      <div class="pros">
        <h4>采购项目</h4>
        <taHeader :titles="titles"></taHeader>
        <ul>
          <li v-for="item in pros">
            <p>{{item.title}}</p>
            <p>{{item.update_time}}</p>
            <p>{{item.hits}}</p>
            <p>{{item.type_text}}</p>
          </li>
          <li class="nothing" v-if="pros.length === 0">暂无记录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import comSwiper from '@/components/need/components/comSwiper'
import Aptitude from '@/components/need/components/Aptitude'
import taHeader from '../components/taHeader'

export default {
  name: 'comPage',
  components: { comSwiper, Aptitude, taHeader },
  data () {
    return {
      info: {},
      projectdata: {},
      push: [],
      senioritys: [],
      imgs: [],
      map_pos: '',
      recruitdata: {},
      titles: ['采购标题', '发布时间', '浏览人数', '采购类型'],
      pros: [],
      isatt: false
    }
  },
  computed: {
    site () {
      return this.$store.state.site
    },
    isattTxt () {
      if (this.isatt) return '取消关注'
      else return '关  注'
    },
    isattUrl () {
      if (this.isatt) return '/purchase/offFollow/'
      else return '/purchase/inFollow/'
    }
  },
  methods: {
    request () {
      this.$http.get(`/purchase/companyDetails/${this.$route.params.uid}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data.info
          this.info = data
          this.imgs = data.imgs.map(val => this.site + val.path)
          this.senioritys = data.senioritys
          this.map_pos = data.map_pos
          this.pros = res.data.data.companyPurchaseList
        }
      })
    },
    isAttention () {
      this.$http.get(`/purchase/seeFollow/${this.$route.params.uid}`).then(res => {
        if (res.data.code === 200) {
          this.isatt = Number(res.data.msg) && true || false
        }
      })
    },
    attention () {
      this.$http.get(this.isattUrl + this.$route.params.uid).then(res => {
        if (res.data.code === 200) {
          this.isatt = !this.isatt
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    }
  },
  created () {
    this.request()
    this.isAttention()
  }
}
</script>

<style scoped lang="less">
  .app{
    background-color: #eef0f1;
    padding: 31px 0 20px;
    .main{
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      padding: 0 20px 17px;
      box-sizing: border-box;
      overflow: hidden;
      h4{
        font-size: 22px;
        letter-spacing: 2px;
        color: #34495e;
        display: flex;
        align-items: center;
        &:before{
          content: '';
          display: inline-block;
          width: 2px;
          height: 24px;
          background-color: #3388ff;
          margin-right: 20px;
        }
      }
      .header{
        display: flex;
        align-items: center;
        height: 154px;
        .logo{
          width: 90px;
          height: 90px;
          border: solid 1px #f2f2f2;
          border-radius: 50%;
          object-fit: scale-down;
          margin-right: 30px;
        }
        h3{
          margin-right: auto;
          p{
            font-size: 26px;
            letter-spacing: 1px;
            color: #34495e;
            margin-bottom: 29px;
          }
          .btn{
            width: 90px;
            height: 30px;
            line-height: 30px;
            background-color: #3388ff;
            border-radius: 4px;
            text-align: center;
            font-size: 18px;
            letter-spacing: 1px;
            color: #ffffff;
            cursor: pointer;
          }
        }
        .contact{
          p{
            font-size: 12px;
            line-height: 24px;
            letter-spacing: 1px;
            color: #666666;
          }
        }
      }
      .sam{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        .address{
          width: 740px;
          height: 41px;
          line-height: 41px;
          background-color: #ffffff;
          box-shadow: 0px -2px 4px 0px
          rgba(68, 68, 68, 0.1);
          padding: 0 10px;
          box-sizing: border-box;
          font-size: 16px;
          letter-spacing: 2px;
          color: #666666;
          i{
            margin-right: 6px;
            color: #3388ff !important;
          }
        }
      }
      .content{
        margin-bottom: 26px;
        h4{
          margin-bottom: 34px;
        }
        p{
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 1px;
          color: #666666;
          white-space: pre-wrap;
        }
      }
      .aptitude{
        h4{
          margin-bottom: 41px;
        }
        ul{
          border-bottom: none;
        }
      }
      .pros{
        h4{
          margin-bottom: 40px;
        }
        ul{
          border: 1px solid #f1f1f1;
          border-top: none;
          li{
            display: flex;
            min-height: 71px;
            align-items: center;
            padding: 8px 0;
            box-sizing: border-box;
            cursor: pointer;
            &:not(:last-of-type){
              border-bottom: 1px dashed #e5e5e5;
            }
            &:hover{
              background-color: #fafafb;
            }
            p{
              flex: 1 1 220px;
              text-align: center;
              font-size: 11px;
              color: #666666;
              padding: 0 16px;
              &:first-of-type{
                text-align: left;
              }
              &.handle{
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            }
          }
          .nothing{
            justify-content: center;
          }
        }
      }
    }
  }
</style>
