<template>
  <div class="app">
    <div class="slide">
      <slide :imgs="imgs" :height="200" v-if="imgs.length > 0">
      </slide>
      <!--<form @submit.prevent>
        <van-field v-model="searchVal" icon="search" @focus="searchSome" @click-icon="searchSome" />
      </form>-->
    </div>
    <div class="main">
      <ul class="links">
        <li>
          <router-link :to="{ path: 'screenList',query: { id: '1' ,urls: '/resumeList' }}">
            <img src="../../assets/images/navbar2.png" alt="">
            <p>找工人</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: 'screenList',query: { id: '2' ,urls:'/teamList' }}">
            <img src="../../assets/images/navbar1.png" alt="">
            <p>找团队</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: 'screenList',query: { id: '3' ,urls:'/recruitList',nature:1}}">
            <img src="../../assets/images/navbar3.png" alt="">
            <p>工人找活</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: 'screenList',query: { id: '4' ,urls:'/recruitList',nature:2}}">
            <img src="../../assets/images/navbar4.png" alt="">
            <p>团队找活</p>
          </router-link>
        </li>
      </ul>


      <!--<atitle headline="推荐信息" subhead="Hot recruitment"></atitle>
      <div class="info">
        <nav>
          <div class="item" :class="{active: infoAct == 1}" @click="infoAct = 1">推荐招聘</div>
          <div class="item" :class="{active: infoAct == 2}" @click="infoAct = 2">推荐求职</div>
          <div class="item" :class="{active: infoAct == 3}" @click="infoAct = 3">推荐项目</div>
        </nav>
        <div class="content">
          <infoList v-show="infoAct == 1" v-for=" p in fairer" :list="p" type="information"></infoList>
          <infoList v-show="infoAct == 1" v-for="p in workjob" :list="p" type="information"></infoList>
          <infoList v-show="infoAct == 2" v-for="p in person" :list="p" type="geren"></infoList>
          <infoList v-show="infoAct == 2" v-for="p in group" :list="p" type="team"></infoList>
          <infoList v-show="infoAct == 3" v-for="p in project" :list="p" type="projectDetail"></infoList>
          &lt;!&ndash;<proList v-show="infoAct == 3" :list="project" type="project/detail"></proList>&ndash;&gt;
        </div>
      </div>
      <atitle headline="推荐企业" subhead="Recommendable projects"></atitle>
      <div class="ptc">
        &lt;!&ndash;<nav>
          <div class="item" :class="{active: ptcAct == 1}" @click="ptcAct = 1">推荐个人</div>
          <div class="item" :class="{active: ptcAct == 2}" @click="ptcAct = 2">推荐团队</div>
          <div class="item" :class="{active: ptcAct == 3}" @click="ptcAct = 3">推荐企业</div>
        </nav>&ndash;&gt;
        <div class="content">
          &lt;!&ndash;<BigProject v-show="ptcAct == 1" :list="person" type="person"></BigProject>&ndash;&gt;
          &lt;!&ndash;<BigProject v-show="ptcAct == 2" :list="group" type="groupe"></BigProject>&ndash;&gt;
          	<BigProject :list="entreprise" type="compayMain"></BigProject>
        </div>
      </div>-->

      <div class="com-title">热门企业</div>
      <div class="com-box">
        <ul class="com-wapper">
          <li v-for="item in entreprise">
            <router-link :to="`/compayMain/${item.uid}`">
              <h4>
                <span style="display:inline-block;width: 70%;overflow: hidden;">{{item.name}}</span>
                <img :src="baseURL + item.avatar" onerror="this.src = 'http://resource.aibanzhuan.cn/material/person.jpg'" alt="">
              </h4>
              <div class="content">{{item.content}}</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="recruit-box">
        <div class="header">
          <h3>热门招聘</h3>
          <div class="btns">
            <span :class="{active: recIdx == 0}" @click="recIdx = 0">工  人</span>
            <span :class="{active: recIdx == 1}" @click="recIdx = 1">团  队</span>
          </div>
        </div>
        <div class="ul-wapper" :style="{transform: `translateX(${recWidth})`}">
          <ul>
            <li v-for="item in fairer">
              <router-link :to="`/information/${item.id}`">
                <h4>
                  <span class="title">{{item.title}}</span>
                  <span class="pay"></span>
                </h4>
                <div class="tips">
                  <span v-if="item.work_type">{{item.work_type}}</span>
                  <span v-if="item.nums">{{item.nums}}人</span>
                  <span v-if="item.work_time">{{item.work_time}}年</span>
                  <span>{{item.region.map(value => value.title).join('')}}</span>
                </div>
                <div class="bot">
                  <div class="bleft">
                    <img :src="baseURL + item.avatar" onerror="this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'" alt="">
                    <span>{{item.publisher}}</span>
                  </div>
                  <div class="bright">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <ul>
            <li v-for="item in workjob">
              <router-link :to="`/information/${item.id}`">
                <h4>
                  <span class="title">{{item.title}}</span>
                  <span class="pay"></span>
                </h4>
                <div class="tips">
                  <span v-if="item.work_type">{{item.work_type}}</span>
                  <span v-if="item.nums">{{item.nums}}人</span>
                  <span v-if="item.work_time">{{item.work_time}}年</span>
                  <span>{{item.region.map(value => value.title).join('')}}</span>
                </div>
                <div class="bot">
                  <div class="bleft">
                    <img :src="baseURL + item.avatar" onerror="this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'" alt="">
                    <span>{{item.publisher}}</span>
                  </div>
                  <div class="bright">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="news">
        <router-link to="/news_center"><atitle headline="新闻资讯" subhead="News Center" style="margin-bottom: 0.3rem"></atitle></router-link>
        <newsProject style="background-color: #fff;"></newsProject>
      </div>
    </div>
  </div>
</template>

<script>
  import slide from '@/components/slide/slide'
  import atitle from './components/atitle'
  import {baseURL} from '@/axios'
  export default {
    name: "index",
    components: {slide,atitle},
    data() {
      return {
        baseURL: baseURL,
        imgs: [],
        searchVal: '',
        infoAct: 1,
        ptcAct: 1,
        fairer: [],
        workjob: [],
        project: [],
        person: [],
        group: [],
        entreprise: [],
        recIdx: 0,
        recWidth: 0
      }
    },
    watch: {
      recIdx (){
        this.recWidth = -this.recIdx * 50 + '%'
      }
    },
    mounted() {
//			console.log(this.$cookies.get("status"))
      localStorage.setItem("liuPage",1);
      localStorage.setItem("liuScroll",0);
      //
//  	var r = /^(https?|\/\/)/i;
//			if(r.test(res.data.avatar)){this.$cookies.set('avatar',res.data.avatar)};
//			this.$cookies.set('name',res.data.nick)
//			this.$cookies.set('status',res.data.auth_status)//认证状态0.未认证、1.待审核、2.审核中、3.认证失败、4.认证通过
//			this.$cookies.set('statusTwxt',res.data.auth_status_text)//认证文本
//			setToken(res.data.token)
//			this.$router.push({name: 'personal'})
    },
    methods: {
      searchSome() {
        this.$router.push({ path: 'screenList',query: { id: '1' ,urls: '/resumeList' }})
      },
      GetUrlRelativePath(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.href.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      }
    },
    created() {
      this.$http.get('/common/sowing', {params: {sn: 20000}}).then(res => {
        var r = /^(https?|\/\/)/i
        var imgs=[]
        for(let i in res.data){
          var obj = res.data[i]
          if(r.exec(res.data[i].path)){
            obj.store = true
          }else {
            obj.store = false
          }
          imgs.push(obj)
        }
        imgs.forEach(value => {
          if(!r.test(value.path)) value.path = this.baseURL + value.path
        })
        this.imgs = imgs
//      console.log(this.imgs)
      })

//    console.log(this.$route.query)

      this.$http.get('/main').then(res => {
//    	console.log(res.data)
        this.fairer = res.data.recruitPerson//推荐找人
        this.workjob = res.data.recruitTeam
        this.project = res.data.project
        this.person = res.data.resume
        this.group = res.data.team
        this.entreprise = res.data.company
//      this.fairer = res.data.fairer.slice(0,4)
////      console.log(this.fairer)
//      this.workjob = res.data.workjob.slice(0,4)
//      this.project = res.data.project.data.slice(0,4)
//      this.person = res.data.person.slice(0,2)
//      this.group = res.data.group.slice(0,2)
//      this.entreprise = res.data.entreprise.slice(0,2)
      }).then(_ => {
        let com_wapper = document.querySelector('.com-wapper')
        let com_item = com_wapper.querySelectorAll('li')
        com_wapper.style.width = com_item[0].offsetWidth * com_item.length + 'px'
      })
    }
  }
</script>

<style scoped lang="less">
  .slide{
    position:relative;
    .van-field{
      width: 3.30rem;
      height: 0.60rem;
      line-height: 0.60rem;
      background-color: #f2f2f2;
      border-radius: 0.30rem;
      font-size: 0.24rem;
      position: absolute;
      top: 0.24rem;
      right: 0.3rem;
      padding: 0 0.2rem;
    }
  }

  .main{
    /*padding: 0.3rem;*/
    background: #f7f7fa;
    padding-top: 0.3rem;
    box-sizing: border-box;
    .links{
      width: 6.90rem;
      margin: auto;
      height: 1.50rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.06rem 0.15rem 0rem
      rgba(51, 136, 255, 0.3);
      border-radius: 0.20rem;
      display: flex;
      justify-content: space-around;
      padding-top: 0.3rem;
      box-sizing: border-box;
      margin-bottom: 0.2rem;
      li{
        text-align: center;
        img{
          height: 0.48rem;
          margin-bottom: 0.26rem;
        }
        p{
          font-family: PingFangSC-Regular,MicrosoftYaHei;
          font-size: 0.28rem;
          color: #808080;
        }
      }
    }
    nav{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      /*margin-bottom: 0.2rem;*/
      padding: 0.3rem;
      box-sizing: border-box;
      .item{
        width: 1.80rem;
        height: 0.60rem;
        line-height: 0.60rem;
        text-align: center;
        background-color: #f2f2f2;
        border-radius: 0.16rem;
        font-family: PingFangSC-Regular,MicrosoftYaHei;
        font-size: 0.26rem;
        letter-spacing: 0.03rem;
        color: #333333;
        box-sizing: border-box;
        &.active{
          border: solid 1PX #3388ff;
          background-color: #fff;
        }
      }
    }
    .info{
      margin-top: 0.25rem;
    }
    .content{
      margin-bottom: 0.3rem;
      /*background: #FFFFFF;*/
    }
  }
  /*2.0新增样式*/
  .com-title{
    font-family: AdobeHeitiStd-Regular;
    font-size: 0.34rem;
    letter-spacing: 0.02rem;
    color: #333333;
    padding: 0.3rem;
    background-color: #fff;
    margin-top: 0.42rem;
  }
  .com-box{
    width: 100%;
    margin-bottom:  0.1rem;
    background-color: #fff;
    padding-bottom: 0.3rem;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    ul{
      display: flex;
      li{
        margin-left: 0.3rem;
        a{
          display: block;
          width: 2.80rem;
          height: 1.76rem;
          background-color: #ffffff;
          border-radius: 0.10rem;
          border: solid 1PX #f2f2f2;
          padding: 0.2rem;
          box-sizing: border-box;
          h4{
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            span{
              font-family: AdobeHeitiStd-Regular;
              font-size: 0.28rem;
              color: #343434;
            }
            img{
              width: 0.40rem;
              height: 0.40rem;
              object-fit: cover;
              border-radius: 50%;
            }
          }
          .content{
            height: 0.8rem;
            overflow: hidden;
            font-family: MicrosoftYaHei;
            font-size: 0.24rem;
            line-height: 0.28rem;
            color: #666666;
            margin: 0.2rem 0 0;
          }
        }
      }
    }
  }
  .recruit-box{
    width: 100%;
    overflow: hidden;
    .header{
      background-color: #fff;
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
      h3{
        font-family: AdobeHeitiStd-Regular;
        font-size: 0.34rem;
        letter-spacing: 0.02rem;
        color: #333333;
      }
      .btns{
        span{
          display: inline-block;
          font-family: AdobeHeitiStd-Regular;
          font-size: 0.26rem;
          letter-spacing: 1PX;
          color: #cccccc;
          margin-left: 0.45rem;
          padding-bottom: 0.1rem;
          &.active{
            font-size: 0.28rem;
            color: #333333;
            border-bottom: 0.04rem solid #3388ff;
          }
        }
      }
    }
    .ul-wapper{
      width: 200%;
      display: flex;
      transition: all .4s;
      ul{
        width: 50%;
        li{
          margin-bottom: 0.16rem;
          a{
            display: block;
            width: 100%;
            height: 2.12rem;
            background-color: #fff;
            padding: 0.4rem 0.3rem 0;
            box-sizing: border-box;
            h4{
              font-family: MicrosoftYaHei;
              font-size: 0.28rem;
              letter-spacing: 0.03rem;
              color: #333333;
              margin-bottom: 0.2rem;
            }
            .tips{
              margin-bottom: 0.2rem;
              span{
                font-family: MicrosoftYaHei;
                font-size: 0.22rem;
                line-height: 0.36rem;
                letter-spacing: 0.02rem;
                color: #999999;
                &:not(:last-of-type):after{
                  content: '';
                  display: inline-block;
                  width: 1PX;
                  height: 0.18rem;
                  background-color: #CCCCCC;
                  margin: 0 0.14rem;
                }
              }
            }
            .bot{
              height: 0.8rem;
              border-top: 1PX dashed #cccccc;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .bleft{
                img{
                  width: 0.30rem;
                  height: 0.30rem;
                  object-fit: cover;
                  border-radius: 50%;
                  margin-right: 0.2rem;
                }
                span{
                  font-family: MicrosoftYaHei;
                  font-size: 0.24rem;
                  letter-spacing: 0.02rem;
                  color: #999999;
                }
              }
            }
          }
        }
      }
    }
  }
</style>