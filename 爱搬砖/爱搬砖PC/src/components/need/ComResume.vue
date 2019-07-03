<template>
  <div class="container">
    <div class="header">
      <div class="main">
        <div class="logo">
          <img :src="logo" :onerror="$store.state.defaultImg" alt="">
        </div>
        <div class="name">
          <h3>{{name}}</h3>
          <p>{{content}}</p>
        </div>
        <div class="contact">
          <div class="btns">
            <!--<el-button type="primary" @click="getMobile">联系我们</el-button>-->
            <!--<el-button type="primary" plain class="second">关注</el-button>-->
            <el-button type="primary" v-if="release==0" plain @click="attention">关注</el-button>
        		<el-button type="primary" v-if="release==1" plain @click="quxiao">取消关注</el-button>
          </div>
          <p>办公电话：{{office_mobile}}</p>
          <p>传真号码：{{fax_number}}</p>
          <p>企业网址：{{official_website}}</p>
          <p>企业邮箱：{{enterprise_email}}</p>
        </div>
      </div>
    </div>
    <div class="main">
      <comSwiper :list="silders"></comSwiper>
      <div class="address"><i class="iconfont icon-dibiao"></i>{{company_address}}</div>
      <Map_temp :mapxy="map_pos" :height="411" style="margin-bottom: 20px;"></Map_temp>
      <headline h4="资质证书" style="margin-bottom: 20px;"></headline>
      <Aptitude :list="aptitudes" style="border-bottom: 1px solid #eaeeed; margin-bottom: 20px;"></Aptitude>
      <headline h4="发布的招聘信息" v-if="recruits.length>0" style="margin-bottom: 20px;"></headline>
      <list :list="recruits" :mod="3" path="/WFJ_details"></list>
      <paging :total="recruittotal" :size="recruitsize" :page.sync="recruitpage"></paging>
      <headline h4="发布的项目信息" v-if="items.length>0" style="margin-bottom: 20px;"></headline>
      <list :list="items" :mod="4" path="/Project_details"></list>
      <paging :total="projecttotal" :size="projectsize" :page.sync="projectpage"></paging>
      <headline h4="推荐企业" style="margin-bottom: 20px;"></headline>
      <RecommendTeam :list="recommend" path="/ComResume"></RecommendTeam>
    </div>
  </div>
</template>

<script>
import comSwiper from './components/comSwiper'
import Aptitude from './components/Aptitude'
import list from './components/list'
import RecommendTeam from './components/RecommendTeam'
import paging from './components/paging'

export default {
  name: 'ComResume',
  components: { comSwiper, Aptitude, list, RecommendTeam, paging },
  data () {
    return {
      	uid: null,
      	release: 0,
      logo: require('../../assets/none.png'),
      name: '',
      content: '',
      silders: [require('../../assets/com_default.jpg')],
      office_mobile: '',
      fax_number: '',
      official_website: '',
      enterprise_email: '',
      company_address: '',
      map_pos: '',
      aptitudes: [],
      recruits: [],
      recruittotal: 0,
      recruitpage: 1,
      recruitsize: 8,
      items: [],
      projecttotal: 0,
      projectpage: 1,
      projectsize: 8,
      recommend: []
    }
  },
  watch: {
    '$route' () {
      this.getInfo()
    },
    name (val) {
      document.title = val
    }
  },
	  methods: {
	  	attention () {
      //      this.isAtt = !this.isAtt
      var that = this
      that.$http.get('/member/inFollow/' + this.uid).then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = 1
        	}
      })
    },
    quxiao () {
      //    	console.log('取消')
      	var that = this
      	that.$http.get('/member/offFollow/' + this.uid).then(res => {
        //    		console.log(res.data)
      		if (res.data.code == 200) {
      			that.release = 0
      		}
      	})
    },
    isReset () {
      	var that = this
      that.$http.get('/member/seeFollow/' + this.uid).then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = res.data.msg
        	}
      })
    },
	  	getMobile () {
    		var that = this
    		this.$http.get(`/member/getInfoMobile/${this.id}/4`).then(res => {
    			if (res.data.code == 200) {
      			that.$alert(res.data.data, '联系方式', {
		          confirmButtonText: '确定',
		          callback: action => {

		          }
		        })
    			}
    		})
    	},
	  	getInfo () {
	  		this.$http.get(`/company/${this.$route.params.id}`).then(res => {
	  			if (res.data.code == 200) {
	  				var userInfo = res.data.data
          if (userInfo.info.avatar) this.logo = this.$store.state.site + userInfo.info.avatar
          else this.avatar = require('../../assets/none.png')
	  				this.name = userInfo.info.name
	  				this.content = userInfo.info.content
	  				this.uid = userInfo.info.uid
	  				this.office_mobile = userInfo.info.office_mobile
	  				this.fax_number = userInfo.info.fax_number
	  				this.official_website = userInfo.info.official_website
	  				this.enterprise_email = userInfo.info.enterprise_email
          if (userInfo.info.imgs.length > 0) { this.silders = userInfo.info.imgs.map(value => this.$store.state.site + value.path) }
	  				this.company_address = userInfo.info.company_address
	  				this.map_pos = userInfo.info.map_pos
	  				this.aptitudes = userInfo.info.senioritys
	  				this.recommend = userInfo.push
	  				this.recruits = userInfo.recruitdata.data
	  				this.recruittotal = userInfo.recruitdata.total
	  				this.recruitpage = userInfo.recruitdata.current_page
	  				this.recruitsize = userInfo.recruitdata.per_page
	  				this.items = userInfo.projectdata.data
	  				this.projecttotal = userInfo.projectdata.total
	  				this.projectpage = userInfo.projectdata.current_page
	  				this.projectsize = userInfo.projectdata.per_page
          if (this.$store.state.state != 0) { this.isReset() }
	  			}
	  		})
	  	}
	  },
  created () {
    this.$cookies.set('navIdx', 5, '0')
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
  .container{
    .header{
      width: 100%;
      background-color: #f3f7fa;
      padding: 25px 0 28px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .main{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        .logo{
          margin-right: 20px;
          img{
            width: 120px;
            height: 120px;
            border-radius: 10px;
            object-fit: cover;
          }
        }
        .name{
          width: 700px;
          margin-right: auto;
          h3{
            font-size: 22px;
            letter-spacing: 2px;
            color: #34495e;
            margin-bottom: 30px;
          }
          p{
            line-height: 24px;
            letter-spacing: 1px;
            color: #666666;
            white-space: pre-wrap;
          }
        }
        .contact{
          .btns{
            margin-bottom: 10px;
            .second{
              margin-right: 20px;
            }
          }
          p{
            font-size: 12px;
            letter-spacing: 1px;
            color: #cccccc;
            margin-bottom: 10px;
            &:last-of-type{
              margin-bottom: 0;
            }
          }
        }
      }
    }
    & > .main{
      width: 1200px;
      margin: 0 auto;
      .address{
        width: 1179px;
        height: 56px;
        line-height: 56px;
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
        }
      }
    }
  }
</style>
