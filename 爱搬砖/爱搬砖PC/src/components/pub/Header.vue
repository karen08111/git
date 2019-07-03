<template>
  <div class="header">
    <header>
      <div class="logo">
        <router-link to="/"><img src="../../assets/logo.png" alt=""></router-link>
        <!--<span class="cityname">{{cityname}}</span>-->
        <!--<span class="citychange" @click="cityshow = !cityshow">[切换城市]</span>-->
      </div>
      <nav>
        <router-link :class="{active: navIdx === item.path}" v-for="(item,index) in navs" :key="index" :to="item.path">{{item.title}}</router-link>
      </nav>
      <div class="search">
        <el-input
            class="search_input"
            ref="search"
            style="width: 376px; height: 40px;"
            placeholder="输入关键词"
            @focus="searchShow = true"
            @keyup.enter.native="searchList"
            v-model="searchVal">
          <i slot="suffix" class="el-icon-search" @click="searchList"></i>
        </el-input>
        <el-select v-model="searchIdx" v-show="searchShow" @focus="searchShow = true" class="search_select" ref="searchOP">
          <el-option
              v-for="item in options"
              :key="item.path"
              :label="item.title"
              :value="item.path">
          </el-option>
        </el-select>
      </div>
      <div v-if="$store.state.state == 0" class="member">
        <!--<span @click="$store.commit('changeLogin')">登录</span>-->
        <!--<span @click="$store.commit('changeRegister')">注册</span>-->
        <router-link to="/Login">登录</router-link>
        <router-link to="/Login/res">注册</router-link>
      </div>
      <div v-if="$store.state.state == 1" class="approved">
        <div v-if="$store.state.authState != 1">
          <span @click="show = !show" class="name">{{$store.state.username}}</span><router-link class="authState" to="/Account_identity_new" @click.native="changeNav(999)">{{attestation}}</router-link>
        </div>
        <div v-else>
          <span @click="show = !show" class="name">{{$store.state.username}}</span><a class="authState" href="javascript:;" @click.native="changeNav(999)">{{attestation}}</a>
        </div>
        <transition name="el-zoom-in-top">
          <ul class="pull_down" v-show="show">
            <li v-for="item in adnav"><router-link @click.native="changeNav(999,item.route)" :to="'/' + item.route">{{item.title}}</router-link></li>
            <li @click="quit">退 出</li>
          </ul>
        </transition>
      </div>
      <div v-if="$store.state.state == 2" class="approved">
        <p @click="show = !show" class="name">
          <i class="vip" v-if="$store.state.viper"></i>
          {{$store.state.username}}<i :class="pullIco" @click.stop="show = !show"></i>
        </p>
        <transition name="el-zoom-in-top">
          <ul class="pull_down" v-show="show">
            <li v-for="item in adnav"><router-link @click.native="changeNav(999,item.route)" :to="'/' + item.route">{{item.title}}</router-link></li>
            <li @click="quit">退 出</li>
          </ul>
        </transition>
      </div>
    </header>
    <transition name="el-zoom-in-center">
      <Login v-if="$store.state.loginShow" :imgUrl="imgUrl"></Login>
    </transition>
    <transition name="el-zoom-in-center">
      <Register v-if="$store.state.registerShow" :imgUrl="imgUrl"></Register>
    </transition>
    <transition name="el-zoom-in-center">
      <div class="change_city clearfix" v-show="cityshow">
        <h2>切换城市<i class="el-icon-close right" @click="cityshow = !cityshow"></i></h2>
        <div class="context">
          <h1>
            亲爱的用户您好：
            <p>切换城市分站，让我们为您提供更准确的职位信息。</p>
          </h1>
          <p>
            <span>点击进入</span>
            <button type="button" @click="changeCity">山东省</button>
            <span>切换到</span>
            <button type="button" @click="changeCity">浙江省</button>
          </p>
          <div class="expect">其他城市正在开发，敬请期待~</div>
        </div>
      </div>
    </transition>
    <div id="mask" v-show="mask"></div>
  </div>
</template>

<script>
import Login from '@/components/pub/Login'
import Register from '@/components/pub/Register'

export default {
  name: 'Header',
  data () {
    return {
      msgLen: this.$store.state.msgLen,
      navs: [
        { title: '首页', path: '/worker' },
        { title: '找团队', path: '/FindTeam' },
        { title: '找工人', path: '/FindWorker' },
        { title: '团队找活', path: '/TeamFindJob' },
        { title: '工人找活', path: '/WorkFindJob' },
        { title: '项目信息', path: '/ProjectInfo' },
        { title: '入驻基地', path: '/base' }
      ],
      options: [
        { title: '找 团 队', path: '/FindTeam' },
        { title: '找 工 人', path: '/FindWorker' },
        { title: '团队找活', path: '/TeamFindJob' },
        { title: '工人找活', path: '/WorkFindJob' },
        { title: '项目信息', path: '/ProjectInfo' }
      ],
      searchShow: false,
      info: 0,
      show: false,
      adnav: [],
      adnav1: [
        {
          path: '/My_resume',
          txt: '我的简历'
        },
        {
          path: '/Info_follow',
          txt: '我的关注'
        }, {
          path: '/Account_safe_new',
          txt: '账户管理'
        }, {
          path: '/Member',
          txt: '我的团队'
        }],
      adnav2: [
        {
          path: '/Com_resume',
          txt: '企业主页'
        },
        {
          path: '/Info_follow',
          txt: '我的关注'
        }, {
          path: '/Account_safe_new',
          txt: '账户管理'
        }, {
          path: '/Member',
          txt: '我的团队'
        }],
      cityname: '浙江',
      cityshow: false,
      imgUrl: ''
    }
  },
  computed: {
    navIdx () {
      return this.$store.state.navIdx
    },
    searchVal: {
      get () {
        return this.$store.state.searchVal
      },
      set (val) {
        this.$store.commit('search', val)
      }
    },
    attestation () {
      if (this.$cookies.get('authState') == 1) {
        return '审核中'
      } else if (this.$cookies.get('authState') == 3) {
        return '未通过'
      } else {
        return '未认证'
      }
    },
    /* adnav (){
        if(this.$store.state.auth == 1) return this.adnav1
        else if(this.$store.state.auth == 3) return this.adnav2
      }, */
    routePath () {
      if (this.info == 1) return '/Need'
      else if (this.info == 2) return '/Wanted'
      else return '/Subpackage'
    },
    mask () {
      if (this.$store.state.loginShow || this.$store.state.registerShow || this.cityshow) return true
      else return false
    },
    searchIdx: {
      get () {
        return this.$store.state.searchIdx
      },
      set (val) {
        this.$store.commit('changeSearchIdx', val)
      }
    },
    pullIco () {
      if (this.show) return 'el-icon-caret-top'
      else return 'el-icon-caret-bottom'
    }
  },
  watch: {
    info () {
      this.$router.push({ path: this.routePath })
    },
    searchShow (val) {
      const el = this.$refs.search.$el.getElementsByTagName('input')[0]
      if (val) {
        el.style.paddingLeft = '110px'
      } else {
        el.style.paddingLeft = '15px'
      }
    }
  },
  methods: {
    changeCity (e) {
      this.cityname = e.target.innerHTML.slice(0, 2)
      this.cityshow = false
    },
    quit () {
      this.$store.commit('quit')
    },
    searchList () {
      this.$store.commit('search', this.searchVal)
      this.$router.push({ path: this.searchIdx })
    },
    changeNav (index, path) {
      this.show = false
      this.$cookies.set('navIdx', index, '0')
      this.$cookies.set('adnav', '/' + path, '0')
    }
  },
  created () {
    setTimeout(_ => {
      if (this.$store.state.state != 0) {
        this.$http.get('/member/avatar_droplist').then(res => {
          if (res.data.code == 200) {
            this.adnav = res.data.data
          }
        })
      }
    }, 200)
  },
  mounted () {
    if (this.$store.state.state != 0) {
      this.$http.get(this.$store.state.site + '/member/noticeNotRead').then(res => {
        const reg = /^[0-9]+.?[0-9]*$/
        if (reg.test(res.data)) {
          this.$store.commit('changeMsgLen', res.data)
        }
      })
    }

    document.addEventListener('click', e => {
      if (e.target.className != 'name') { this.show = false }
    })

    document.addEventListener('click', e => {
      console.log()
      if (e.target.className != 'el-input__inner') this.searchShow = false
    })

    /* document.getElementsByClassName('search_select')[0].addEventListener('click',e => {
        console.log(e.target)
        this.$refs.searchOP.focus()
      }) */
  },
  filters: {
    telStar (val) {
      return val.substr(0, 3) + '****' + val.substr(7)
    }
  },
  components: { Login, Register }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header {
    width: 100%;
    min-width: 1200px;
    height: 70px;
    background-color: #ffffff;
    box-shadow: 0px -2px 10px 0px
    rgba(0, 0, 0, 0.2);
    header{
      width: 1200px;
      height: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo{
        display: flex;
        align-items: center;
        img{
          margin-right: 9px;
        }
        .cityname{
          font-size: 12px;
          letter-spacing: 1px;
          color: #3388ff;
          margin-right: 8px;
        }
        .citychange{
          font-size: 12px;
          color: #cccccc;
          cursor: pointer;
        }
      }
      nav{
        width: 526px;
        display: flex;
        justify-content: space-between;
        a{
          display: inline-block;
          height: 70px;
          /*margin-right: 30px;*/
          line-height: 70px;
          box-sizing: border-box;
          position: relative;
          &:last-child{
            margin-right: 0;
          }
          &.active{
            &:after{
              width: 100%;
              left: 0;
            }
          }
          &:after{
            content: '';
            display: block;
            width: 0;
            height: 2px;
            background-color: #3388ff;
            position: absolute;
            left: 50%;
            bottom: 0;
            transition: all .2s;
          }
          &:hover{
            &:after{
              width: 100%;
              left: 0;
            }
          }
        }
      }
      .member{
        margin-left: 29px;
        a{
          letter-spacing: 1px;
          color: #34495e;
          cursor: pointer;
          &:hover{
            color: #0371df;
          }
          &:last-child{
            margin-left: 23px;
          }
        }
      }
      .noapprove{
        position: relative;
        span{
          letter-spacing: 1px;
          color: #34495e;
          cursor: pointer;
        }
        a{
          font-size: 10px;
          letter-spacing: 1px;
          color: #cccccc;
          margin-left: 5px;
        }
      }
      .approved{
        position: relative;
        p{
          cursor: pointer;
          letter-spacing: 1px;
          color: #34495e;
        }
        .name{
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          .vip{
            display: block;
            width: 14px;
            height: 14px;
            background: url("../../assets/vip_ico.png") no-repeat center / 100%;
            margin-right: 5px;
          }
        }
        .authState{
          font-size: 10px;
          letter-spacing: 1px;
          color: #cccccc;
          margin-left: 5px;
        }
      }
      .pull_down{
        position: absolute;
        left: 0;
        top: 24px;
        z-index: 99;
        width: 92px;
        background-color: #ffffff;
        border: solid 1px #3388ff;
        &:after{
          content: '';
          display: block;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom: 6px solid #fff;
          position: absolute;
          left: 41px;
          top: -12px;
        }
        &:before{
          content: '';
          display: block;
          width: 0;
          height: 0;
          border: 7px solid transparent;
          border-bottom: 6px solid #3388ff;
          position: absolute;
          left: 40px;
          top: -14px;
        }
        li{
          width: 100%;
          height: 31px;
          line-height: 31px;
          text-align: center;
          font-size: 12px;
          letter-spacing: 1px;
          color: #999999;
          cursor: pointer;
          &:not(.disable):hover{
            color: #0371df;
          }
          &.disable{
            color: #d9d9d9;
          }
          a{
            display: block;
          }
        }
      }
    }
    .change_city {
      width: 530px;
      height: 330px;
      background-color: #ffffff;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 9998;
      h2 {
        width: 530px;
        height: 50px;
        line-height: 50px;
        background-color: #0371df;
        font-size: 16px;
        letter-spacing: 2px;
        color: #ffffff;
        padding: 0 20px;
        box-sizing: border-box;
        i {
          line-height: 50px;
          font-size: 24px !important;
          cursor: pointer;
        }
      }
      .context {
        padding: 26px 20px 19px;
        h1 {
          font-size: 24px;
          letter-spacing: 2px;
          color: #333333;
          p {
            line-height: 56px;
            font-size: 16px;
            letter-spacing: 2px;
            color: #999999;
            border-bottom: 1px dashed #e5e5e5;
            margin: 0;
          }
        }
        p {
          font-size: 0;
          margin: 52px 0 50px;
          span {
            line-height: 40px;
            font-size: 16px;
            letter-spacing: 2px;
            color: #999999;
            &:first-of-type {
              margin-right: 9px;
            }
            &:last-of-type {
              margin: 0 20px;
            }
          }
          button {
            width: 90px;
            height: 40px;
            background-color: #ffffff;
            border-radius: 10px;
            border: solid 1px #999999;
            font-size: 16px;
            letter-spacing: 2px;
            cursor: pointer;
            color: #999999;
            &:hover {
              color: #333333;
              border: solid 1px #3388ff;
            }
          }
        }
        .expect{
          font-size: 12px;
          letter-spacing: 1px;
          color: #999999;
        }
      }
    }
  }

  #mask{
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9995;
  }

  .cen {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
</style>

<style lang="less">
  header{
    .search{
      position: relative;
      .el-input__suffix{
        display: flex;
        align-items: center;

      }
      & > div:first-of-type{
        i{
          height: auto;
          cursor: pointer;
          font-size: 18px !important;
          margin-right: 15px;
        }
        input{
          position: absolute;
          right: 0;
          width: 376px;
          transition: all .4s;
          box-sizing: border-box;
          /*padding-left: 10px;*/
        }
      }
      .el-select{
        width: 105px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 77;
        input{
          border-color: #409EFF;
          border-radius: 6px 0px 0px 0px;
        }
      }
      .search_input{
        z-index: 0;
      }
    }
  }
  .el-scrollbar{
    border: solid 1px #3388ff;
  }
  .el-select-dropdown__list{
    padding: 0;
    text-align: center;
    box-shadow: 0px 2px 4px 0px
    rgba(68, 68, 68, 0.1);
    border-radius: 0px 0px 6px 6px;
  }
  .el-popper[x-placement^=bottom] .popper__arrow::after{
    display: none;
  }
  .el-popper[x-placement^=bottom] .popper__arrow{
    display: none;
  }
  .el-popper[x-placement^=bottom]{
    margin-top: -2px;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: rgba(51,136,255,0.15);
    font-weight: 400;
  }
  .el-select-dropdown__item.selected{
    font-weight: 400;
  }
  .el-select-dropdown{
    box-sizing: content-box;
    transform: translateX(-1px);
    border-top: none;
  }
</style>
