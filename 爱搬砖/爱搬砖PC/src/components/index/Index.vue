<template>
  <div class="index">
    <Header></Header>
    <div class="slide_box">
      <Slide :slides="slide" :height="'600px'"></Slide>
    </div>
    <div class="info">
      <h1 class="title">推荐信息</h1>
      <div class="taps">
        <span :class="{active: infoId == 1}" @click="infoId = 1">招聘信息</span>
        <span :class="{active: infoId == 2}" @click="infoId = 2">求职信息</span>
        <span :class="{active: infoId == 3}" @click="infoId = 3">项目信息</span>
      </div>
      <infoList v-show="infoId == 1" :list="recruits.filter(value=>value.nature==1)" path="/WFJ_details"></infoList>
      <infoList v-show="infoId == 1" :list="recruits.filter(value=>value.nature==2)" path="/TFJ_details"></infoList>
      <infoList v-show="infoId == 2" :list="wanteds1" path="/WorkerResume"></infoList>
      <infoList v-show="infoId == 2" :list="wanteds2" path="/TeamResume"></infoList>
      <infoList v-show="infoId == 3" :list="subpackages" path="/Project_details" ispro="true" defImg="this.src='http://resource.aibanzhuan.cn/material/company.jpg'"></infoList>
    </div>
    <router-link to="/base" class="banner"><img src="../../assets/enter3.png" alt=""></router-link>
    <div class="company">
      <h1 class="title">热门企业</h1>
      <comList :list="companys"></comList>
    </div>
    <a href="http://shop.aibanzhuan.cn" class="banner"><img src="../../assets/enter4.png" :onerror="$store.state.defaultImg" alt=""></a>
    <div class="news">
      <div class="main">
        <router-link to="/News_center">
          <h1 class="title">新闻中心</h1>
        </router-link>
        <div v-for="(i,index) in news">
          <div class="item" v-if="index%2 == 0">
            <div class="image" v-if="i.img_path"><img :src="$store.state.site + i.img_path" :onerror="$store.state.defaultImg"></div>
            <div class="txt">
              <h5><router-link :to="{path: '/News_details',query:{id: i.id}}">{{i.title}}</router-link></h5>
              <p>{{i.abstract}}</p>
              <router-link class="more" :to="{path: '/News_details',query:{id: i.id}}">MORE</router-link>
              <div class="time">{{i.create_time}}</div>
            </div>
          </div>
          <div class="item" v-if="index%2 != 0">
            <div class="txt">
              <h5><router-link :to="{path: '/News_details',query:{id: i.id}}">{{i.title}}</router-link></h5>
              <p>{{i.abstract}}</p>
              <router-link class="more" :to="{path: '/News_details',query:{id: i.id}}">MORE</router-link>
              <div class="time">{{i.create_time}}</div>
            </div>
            <div class="image" v-if="i.img_path"><img :src="$store.state.site + i.img_path" :onerror="$store.state.defaultImg"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import infoList from './components/infoList'
import comList from './components/comList'
export default {
  name: 'Index',
  data () {
    return {
      	loading: false,
      slide: [],
      infoId: 1,
      proId: 1,
      recruits: [],
      wanteds1: [],
      wanteds2: [],
      subpackages: [

      ],
      companys: [],
      news: []
    }
  },
  components: { infoList, comList },
  created () {
    this.$cookies.set('navIdx', 0, '0')
    // document.querySelector('title').innerHTML = '爱搬砖首页'

    /* this.$http.get(this.$store.state.site + '/main').then(res => {
        if (res.data.code == 200) {
          let data = res.data.data
          this.recruits = data.fairer
          this.wanteds = data.workjob
          this.workers = data.person
          this.teams = data.group
          this.companys = data.entreprise
          this.subpackages = data.project.data
        }
      }).catch(error => {
        console.log(error)
      }) */
    var that = this
    this.$http.get('/main').then(res => {
      if (res.data.code == 200) {
        //					this.loading =false
        //					console.log(res.data.data)
        this.recruits = res.data.data.recruitTeam.concat(res.data.data.recruitPerson)

        this.wanteds1 = res.data.data.resume
        this.wanteds2 = res.data.data.team
        that.subpackages = res.data.data.project
        this.companys = res.data.data.company
      }
    })
    this.$http.get('/common/sowing', { params: { sn: 10000 } }).then(res => {
      if (res.data.code == 200) {
        this.slide = res.data.data
      }
    })

    this.$http.get('/newsList').then(res => {
      if (res.data.code == 200) {
        this.news = res.data.data.data.slice(0, 2)
      }
    })
  }
}
</script>

<style scoped lang="less">
  .slide_box {
    width: 100%;
    height: 600px;
  }

  .main {
    width: 1200px;
    margin: 0 auto;
    flex-direction: ;
  }

  h2 {
    text-align: center;
    p:first-child {
      display: inline-block;
      font-size: 30px;
      font-weight: bold;
      line-height: 1;
      color: #333333;
      padding: 0 20px 10px;
      border-bottom: 1px solid #bdbdbd;
      position: relative;
      margin: 0 auto;
      &:after {
        content: '';
        display: block;
        width: 48px;
        height: 5px;
        background-color: #3388ff;
        position: absolute;
        left: 50%;
        bottom: -3px;
        transform: translateX(-50%);
      }
    }
    p:last-child {
      font-size: 24px;
      line-height: 36px;
      color: #bdbdbd;
    }
  }

  .tab {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 30px 0 40px;
    li {
      width: 140px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: solid 1px #3388ff;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:nth-child(2) {
        margin: 0 40px;
      }
      &.active {
        background-color: #3388ff;
        color: #f5f6f8;
      }
    }
  }
  h1.title{
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #333333;
    text-align: center;
    &:before{
      content: '';
      display: inline-block;
      width: 110px;
      height: 1px;
      background-color: #cccccc;
      margin-right: 20px;
      vertical-align: middle;
    }
    &:after{
      content: '';
      display: inline-block;
      width: 110px;
      height: 1px;
      background-color: #cccccc;
      margin-left: 20px;
      vertical-align: middle;
    }
  }
  .taps{
    width: 1200px;
    height: 57px;
    line-height: 57px;
    background-color: #ffffff;
    padding: 0 20px;
    box-sizing: border-box;
    span{
      display: inline-block;
      cursor: pointer;
      margin-right: 59px;
      font-size: 16px;
      letter-spacing: 2px;
      color: #999999;
      position: relative;
      &:not(:first-of-type):before{
        content: '';
        display: block;
        width: 1px;
        height: 14px;
        background-color: #999999;
        position: absolute;
        left: -29px;
        top: 22px;
      }
      &.active{
        color: #3388ff;
        &:after{
          content: '';
          display: block;
          width: 69px;
          height: 4px;
          background-color: #3388ff;
          border-radius: 2px 2px 0px 0px;
          position: absolute;
          left: 0;
          bottom: 2px;
        }
      }
      &:after{
        content: '';
        display: block;
        width: 0;
        height: 4px;
        background-color: #3388ff;
        border-radius: 2px 2px 0px 0px;
        color: #3388ff;
        position: absolute;
        left: 50%;
        bottom: 2px;
        transition: all .3s;
      }
      &:hover{
        color: #3388ff;
      }
      &:hover:after{
        width: 69px;
        left: 0;
      }
    }
  }
  .banner{
    display: block;
    width: 100%;
    text-align: center;
  }
  .info{
    width: 1200px;
    margin: 0 auto 30px;
    h1.title{
      margin: 39px 0 20px;
    }
  }
  .company{
    overflow: hidden;
    padding-bottom: 30px;
    h1{
      margin: 40px 0;
    }
    background-color: #f3f7fa;
  }
  .news {
    width: 100%;
    overflow: hidden;
    padding-bottom: 25px;
    h1 {
      margin: 39px 0 42px;
    }
    .main > div:not(:first-of-type) {
      margin-top: 40px;
    }
    .item {
      width: 100%;
      height: 320px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .image {
        width: 550px;
        min-width: 550px;
        height: 320px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .txt {
        width: 630px;
        h5 {
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 30px;
          letter-spacing: 1px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 25px;
        }
        p {
          width: 629px;
          height: 82px;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 30px;
          color: #999999;
        }
        .more {
          display: block;
          width: 140px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          border-radius: 30px;
          border: solid 1px #e5e5e5;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #999999;
          margin: 57px auto 0;
          &:hover {
            background-color: #3388ff;
            color: #fff;
          }
        }
        .time {
          font-size: 15px;
          letter-spacing: 2px;
          color: #e5e5e5;
          text-align: right;
          margin-top: 28px;
        }
      }
    }
  }

</style>
