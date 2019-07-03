<template>
  <div class="container" ref="container">
    <img src="http://resource.aibanzhuan.cn/index/No4eWxu6.png" alt="" class="bg">
    <div class="main">
      <header>
        <img src="../../assets/allIndex/b_logo.png" alt="" class="logo">
        <nav>
          <a v-for="item in navs" :href="item.route">{{item.title}}</a>
          <router-link to="/aboutUs">关于我们</router-link>
          <router-link to="/contactUs">联系我们</router-link>
        </nav>
        <div class="user" v-if="username">
          <router-link to="/Account_safe_new">{{username}}</router-link>
          <span class="quit" @click="quit">退 出</span>
        </div>
        <div class="login" v-else>
          <router-link to="/Login">登录</router-link>/<router-link to="/Login/res">注册</router-link>
        </div>
      </header>
      <div class="bot">
        <div class="links" v-itemLink>
          <a v-for="item in navs2" :href="item.route">
            <img :src="item.icon" alt="">
            <p>{{item.desc}}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  computed: {
    navs () {
      const env = process.env.NODE_ENV
      let url
      if (env === 'development') url = 'http://localhost'
      else if (env === 'test') url = 'http://www.qqdoubao.net'
      else url = 'http://www.aibanzhuan.cn'

      let arr = [
        { title: '产业工人', desc: '建筑招聘求职', icon: require('../../assets/allIndex/icon1.png'), route: `${url}/#/worker` },
        { title: '招采中心', desc: '项目招标采购', icon: require('../../assets/allIndex/icon3.png'), route: `${url}/#/recr` },
        { title: '匠心小镇', desc: '项目众包平台', icon: require('../../assets/allIndex/icon5.png'), route: 'http://town.aibanzhuan.cn' },
        { title: '智慧工地', desc: '智慧工地', icon: require('../../assets/allIndex/icon2.png'), route: 'https://datav.aliyuncs.com/share/f31c6cb108f53a6099d83d4747c1c4af' },
        { title: '匠人街', desc: '建材供应商城', icon: require('../../assets/allIndex/icon4.png'), route: 'http://shop.aibanzhuan.cn' }
        // {title: '匠管家', desc: '项目管理系统', icon: require('../../assets/allIndex/icon6.png'), route: '###'}
      ]
      return arr
    },
    navs2 () {
      const env = process.env.NODE_ENV
      let url
      if (env === 'development') url = 'http://localhost'
      else if (env === 'test') url = 'http://www.qqdoubao.net'
      else url = 'http://www.aibanzhuan.cn'

      let arr = [
        { title: '产业工人', desc: '建筑招聘求职', icon: require('../../assets/allIndex/icon1.png'), route: `${url}/#/worker` },
        { title: '招采中心', desc: '项目招标采购', icon: require('../../assets/allIndex/icon3.png'), route: `${url}/#/recr` },
        { title: '匠心小镇', desc: '项目众包平台', icon: require('../../assets/allIndex/icon5.png'), route: 'http://town.aibanzhuan.cn' },
        { title: '智慧工地', desc: '智慧工地', icon: require('../../assets/allIndex/icon2.png'), route: 'https://datav.aliyuncs.com/share/f31c6cb108f53a6099d83d4747c1c4af' },
        { title: '匠人街', desc: '建材供应商城', icon: require('../../assets/allIndex/icon4.png'), route: 'http://shop.aibanzhuan.cn' },
        { title: '匠管家', desc: '项目管理系统', icon: require('../../assets/allIndex/icon6.png'), route: '###' }
      ]
      return arr
    },
    username () {
      return this.$store.state.username
    }
  },
  directives: {
    itemLink: {
      inserted (el) {
        let h
        if (window.innerWidth) h = window.innerHeight
        else {
          if (document.compatMode === 'BackCompat') h = document.body.clientHeight
          else h = document.documrntElement.clientHeight
        }
        el.style.transform = `scale(${h / 1080})`
      }
    }
  },
  methods: {
    quit () {
      this.$store.commit('quit')
    }
  },
  mounted () {
    let h
    if (window.innerWidth) h = window.innerHeight
    else {
      if (document.compatMode === 'BackCompat') h = document.body.clientHeight
      else h = document.documrntElement.clientHeight
    }
    if (h < 480) {
      this.$refs.container.style.minHeight = 480 + 'px'
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    height: 100vh;
    font-size: 0;
    position: relative;
    overflow: hidden;
    .bg{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .main{
      position: absolute;
      top: 4.5%;
      left: 0;
      right: 0;
      margin: auto;
      width: 1200px;
      height: calc(100% - 49px);
      header{
        display: flex;
        align-items: center;
        margin-bottom: 5.55556%;
        .logo{
          margin-right: 69px;
        }
        nav{
          width: 750px;
          display: flex;
          justify-content: space-between;
          margin-right: auto;
          a{
            display: inline-block;
            /*margin-right: 30px;*/
            box-sizing: border-box;
            position: relative;
            font-size: 16px;
            line-height: 36px;
            letter-spacing: 1px;
            color: #ffffff;
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
              background-color: #fff;
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
        .user{
          display: flex;
          align-items: center;
          a{
            font-size: 14px;
            letter-spacing: 2px;
            color: #fff;
            margin-right: 6px;
          }
          .quit{
            font-size: 12px;
            letter-spacing: 1px;
            color: #fff;
            cursor: pointer;
          }
        }
        .login{
          font-size: 14px;
          color: #fff;
          a{
            color: #fff;
          }
        }
      }
      .bot{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        .links{
          width: 373px;
          height: 788px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          transform-origin: top right;
          a{
            display: flex;
            width: 50%;
            font-size: 16px;
            background-color: rgba(40, 17, 71, 0.7);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1 1 33.333%;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            &:hover{
              background-color: rgba(40, 17, 71, 1);
            }
            &:first-child, &:nth-child(2), &:nth-child(3){
              border-right: 1px solid rgba(255, 255, 255, 0.05);
            }
            &:nth-child(3n){
              border-bottom: none;
            }
            img{
              width: 21.39%;
            }
            p{
              margin-top: 19px;
              font-size: 100%;
              letter-spacing: 2px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
