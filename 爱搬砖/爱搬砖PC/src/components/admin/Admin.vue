<template>
  <div class="admin">
    <Header :navs="navs"></Header>
    <div class="main">
      <div class="ad_nav">
        <!--<div class="headimg" @click="show = true">
          &lt;!&ndash;<el-upload
                  class="avatar-uploader"
                  :action="this.$store.state.site+'/member/upload/images'"
                  :with-credentials="true"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i class="iconfont icon-camera2"></i>
          </el-upload>&ndash;&gt;
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i class="iconfont icon-camera2"></i>
        </div>-->
        <!--<h4>{{name}}</h4>-->
        <!--<p>我的积分：<span>{{integral}}</span></p>
        <p>账户余额：<span>{{balance | toDecimal2}}</span></p>-->
        <el-menu
            :unique-opened="true"
            :router="true"
            :default-active="$store.state.navIdx"
            class="el-menu-vertical-demo"
            background-color="#fafafd"
            text-color="#999999"
            active-text-color="#3388ff">
          <template v-for="(item,index) in adnav">
            <el-menu-item :index="`/${item.route}`" v-if="!item.children">
              <i class="iconfont" :class="item.ico"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu :index="String(index)" v-else>
              <template slot="title">
                <i class="iconfont" :class="item.ico"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="(group,idx) in item.children" :key="index+idx">
                <el-menu-item :index="`/${group.route}`">{{group.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <!----------------------------------------------------------------------->
          <!--<el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-tubiao"></i>
              <span>我的钱包</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/wallet_balance" @click="chooseAdnav('wallet_balance')">我的余额</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/setPassword" @click="chooseAdnav('setPassword')">修改支付密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
      <Head_upload v-if="show" @changeHeadShow="changeHeadShow" @upSuccess="upSuccess"></Head_upload>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Head_upload from '@/components/pub/Head_upload'
export default {
  name: 'Admin',
  data () {
    return {
      imageUrl: require('../../assets/headicon_128.png'),
      name: this.$store.state.username,
      integral: 150,
      balance: 800,
      adnav11: [
        {
          title: '我的简历',
          icon: 'icon-adjianli',
          controller: 'My_resume',
          children: []
        }, {
          title: '我的关注',
          icon: 'icon-adguanzhu',
          controller: 'Info_follow',
          children: []
        }, {
          	title: '账户管理',
          	icon: 'icon-adzhanghu',
          	controller: 'Info_account',
          	children: [
          		{
          			title: '账户安全',
          			controller: 'Account_safe_new'
          		},
          		{
          			title: '身份管理',
          			controller: 'Account_identity_new'
          		},
          		{
          			title: '资质证书',
          			controller: 'License'
          		},
          		{
          			title: '站内信',
          			controller: 'Message_official'
          		}
          	]
        }, {
          title: '我的团队',
          icon: 'icon-adtuandui',
          controller: '',
          children: [
            {
              title: '成员管理',
              controller: 'Member'
            }, {
              title: '团队简历',
              controller: 'My_team'
            }, {
              title: '招聘管理',
              controller: 'Bring'
            }
          ]
        }
      ],
      adnav: [
        {
          title: '企业主页',
          icon: 'icon-adjianli',
          controller: 'Com_resume',
          children: []
        }, {
          title: '我的关注',
          icon: 'icon-adguanzhu',
          controller: 'Info_follow',
          children: []
        }, {
          title: '招聘管理',
          icon: 'icon-adzhaopin',
          controller: 'Com_bring',
          children: []
        }, {
          title: '项目管理',
          icon: 'icon-adxiangmu',
          controller: 'MPM',
          children: []
        }, {
          title: '账户管理',
          icon: 'icon-adzhanghu',
          controller: 'Info_account',
          children: [
            {
              title: '账户安全',
              controller: 'Account_safe_new'
            },
            {
              title: '身份管理',
              controller: 'Account_identity_new'
            },
            {
              title: '资质证书',
              controller: 'License'
            },
            {
              title: '站内信',
              controller: 'Message_official'
            }
          ]
        }, {
          title: '我的团队',
          icon: 'icon-adtuandui',
          controller: '',
          children: [
            {
              title: '成员管理',
              controller: 'Member'
            }, {
              title: '团队简历',
              controller: 'My_team'
            }, {
              title: '招聘管理',
              controller: 'Bring'
            }
          ]
        }
      ],
      show: false
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(res.data.path)
      // this.imageUrl = res.data.path
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isType) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isType && isLt2M
    },
    changeHeadShow () {
      this.show = false
    },
    upSuccess (val) {
      this.show = !this.show
      this.imageUrl = this.$store.state.site + val.path
    },
    chooseAdnav (controller) {
      this.$cookies.set('adnav', `/${controller}`, '0')
      /* if(controller == sessionStorage.getItem("name")){
        	this.$router.go(0);
        } */
      sessionStorage.setItem('name', controller)
    }
  },
  computed: {
    navs () {
      return this.$store.state.navs
    }
  },
  filters: {
    toDecimal2 (val) {
      var f = parseFloat(val)
      if (isNaN(f)) {
        return false
      }
      var f = Math.round(val * 100) / 100
      var s = f.toString()
      var rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    }
  },
  created () {
    this.$http.get('/member/menu').then(res => {
      if (res.data.code == 200) {
        this.adnav = res.data.data
      }
    }).catch(error => {
      console.log(error)
    })

    /* this.$http.get('/member/info').then(res => {
        if (res.data.code == 200) {
          const avatar = res.data.data.avatar
          if (avatar)
            this.imageUrl = this.$store.state.site + avatar
        }
      }).catch(error => {
        console.log(error)
      }) */
  },
  components: { Head_upload }
}
</script>

<style scoped lang="less">
  .admin{
    background-color: #f3f7fa;
  }
  .main {
    width: 1200px;
    margin: 40px auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .ad_nav {
      width: 210px;
      background-color: #fafafd;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      text-align: center;
      .iconfont{
        font-size: 16px !important;
      }
      .headimg {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        position: relative;
        margin: 23px auto 12px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        .iconfont {
          position: relative;
          top: -80px;
          font-size: 32px !important;
          color: #fff;
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 125px;
          height: 125px;
          line-height: 125px;
          text-align: center;
        }
        .avatar {
          height: 125px;
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      h4 {
        font-size: 16px;
        letter-spacing: 2px;
        color: #333333;
        margin-bottom: 19px;
      }
      p {
        font-size: 13px;
        letter-spacing: 1px;
        color: #999999;
        margin-bottom: 20px;
        span {
          color: #f54646;
        }
      }
    }
    .container {
      width: 960px;
    }
  }
</style>

<style lang="less">
  .ad_nav{
    .el-menu-item,.el-submenu__title{
      border-bottom: 1px dashed #e5e5e5;
      &:last-child{
        border-bottom: none;
      }
    }
    .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:hover{
      background-color: #fff !important;
      color: #3388ff !important;
      .iconfont{
        color: #3388ff !important;
      }
    }
    .el-menu-item-group__title{
      display: none;
    }
    .el-menu-item.is-active{
      background-color: #fff !important;
    }
  }
  .el-input__inner{
    height: 44px;
    line-height: 44px;
  }
</style>
