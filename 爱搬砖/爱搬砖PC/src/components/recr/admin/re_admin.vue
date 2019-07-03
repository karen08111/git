<template>
  <div class="admin">
    <div class="main">
      <div class="nav">
        <img :src="$store.state.avatar" alt="" onerror="this.src='http://resource.aibanzhuan.cn/material/company.jpg'">
        <p>{{$store.state.username}}</p>
        <ul>
          <li v-for="item in adnav" :class="{active: item.route === adIdx}">
            <router-link :to="item.route" @click.native="changeNav(item.route)">
              <i class="iconfont" :class="item.icon"></i><span>{{item.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 're_admin',
  data () {
    return {
      adnav: [
        {
          icon: 'icon-adjianli',
          title: '我的项目',
          route: '/re_admin'
        }, {
          icon: 'icon-adguanzhu',
          title: '我的关注',
          route: '/attention'
        }
      ],
      avatar: require('../../../assets/himg.png')
    }
  },
  computed: {
    adIdx () {
      return this.$store.state.receNav
    }
  },
  methods: {
    changeNav (route) {
      this.$store.commit('changeReceNav', route)
    }
  }
}
</script>

<style scoped lang="less">
.admin{
  background-color: #eef0f1;
  .main{
    width: 1200px;
    margin: 0 auto;
    padding: 10px 0 20px;
    display: flex;
    justify-content: space-between;
    .nav{
      width: 212px;
      background-color: #eef0f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: 125px;
        height: 125px;
        object-fit: cover;
        border-radius: 50%;
      }
      p{
        font-size: 16px;
        letter-spacing: 2px;
        color: #34495e;
        margin: 25px 0;
        text-align: center;
      }
      ul{
        width: 100%;
        li{
          height: 55px;
          line-height: 55px;
          border-radius: 0px 2px 2px 0px;
          border-bottom: 1px dashed #e5e5e5;
          text-align: center;
          box-sizing: border-box;
          &.active, &:hover{
            background-color: #ffffff;
            box-shadow: 0px 2px 4px 0px rgba(153, 153, 153, 0.1);
            border-bottom: none;
            border-left: 2px solid #3388ff;
            a{
              color: #3388ff;
            }
          }
          a{
            display: block;
            font-size: 16px;
            letter-spacing: 2px;
            color: #34495e;
            i{
              margin-right: 11px;
            }
          }
        }
      }
    }
    .container{
      width: 978px;
      background-color: #ffffff;
      box-shadow: 0px 0px 25px 0px rgba(62, 67, 73, 0.14);
      border-radius: 6px;
      border: solid 1px #dee1e7;
      padding-left: 30px;
      padding-right: 35px;
      box-sizing: border-box;
      position: relative;
    }
  }
}
</style>
