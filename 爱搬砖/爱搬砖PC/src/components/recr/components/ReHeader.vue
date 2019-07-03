<template>
  <div class="r-header">
    <div class="main">
      <router-link to="/"><img src="../../../assets/logo.png" alt="" class="logo"></router-link>
      <nav>
        <router-link v-for="(item, index) in navs" :key="index" :to="item.route" :class="{active: nav === item.route}">{{item.title}}</router-link>
      </nav>
      <div class="user" v-if="username">
        <router-link to="/re_admin" @click.native="$store.commit('changeReceNav', '/re_admin')"><i class="vip" v-if="$store.state.viper"></i>{{username}}</router-link>
        <span class="quit" @click="quit">退 出</span>
      </div>
      <div class="login" v-else>
        <router-link to="/Login">登录</router-link>/<router-link to="/Login/res">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReHeader',
  data () {
    return {
      navs: [
        { title: '首 页', route: '/recr' },
        { title: '招标采购', route: '/zhaoList' },
        { title: '询价采购', route: '/xunList' },
        { title: '优秀采购企业', route: '/comList' }
      ]
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    },
    nav () {
      return this.$store.state.navIdx
    }
  },
  methods: {
    quit () {
      this.$store.commit('quit')
    },
    changeNav (route) {
      this.$store.commit('changeNav', route)
    }
  }
}
</script>

<style scoped lang="less">
.r-header{
  width: 100%;
  height: 90px;
  .main{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .logo{
      margin-right: 76px;
    }
    nav{
      margin-right: auto;
      a{
        padding: 12px 24px;
        transition: all .4s;
        &:not(:last-of-type){
          margin-right: 15px;
        }
        &.active,&:hover{
          background-color: #3388ff;
          color: #fff;
        }
      }
    }
    .user{
      display: flex;
      align-items: center;
      a{
        font-size: 16px;
        letter-spacing: 2px;
        margin-right: 6px;
        display: flex;
        align-items: center;
      }
      .quit{
        font-size: 12px;
        letter-spacing: 1px;
        color: #34495e;
        cursor: pointer;
      }
      .vip{
        display: block;
        width: 14px;
        height: 14px;
        background: url("../../../assets/vip_ico.png") no-repeat center / 100%;
        margin-right: 5px;
      }
    }
  }
}
</style>
