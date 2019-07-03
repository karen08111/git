<template>
  <div class="container">
    <div style="background-color: #f3f7fa;">
      <header>
        <div class="hleft">
          <div class="newAdd">
            <img :src="avatar" alt="" onerror="this.src = 'http://resource.aibanzhuan.cn/material/person.jpg'">
            <span class="zhuangtai">{{current_state}}</span>
          </div>
          <div class="title">
            <h1><span class="title">{{name}}</span><span>{{trade}}</span><span class="part">|</span><span>{{wage}}</span></h1>
            <p>{{year}}工作经验<span class="part">|</span>{{age}}<span class="part">|</span>{{health}}病史<span class="part">|</span>{{region}}</p>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="getMobile">立即联系</el-button>
          <!--<el-button type="primary" plain @click="attention">{{isAtt ? '已关注' : '关注'}}</el-button>-->
          <el-button type="primary" v-if="release==0" plain @click="attention">关注</el-button>
          <el-button type="primary" v-if="release==1" plain @click="quxiao">取消关注</el-button>
        </div>
      </header>
    </div>
    <div style="width: 1200px; margin: 10px auto 0; display: flex; justify-content: space-between;">
      <div class="main">
        <div style="border: solid 1px #eaeeed;">
          <h4>工作经验</h4>
          <ul class="performance" v-if="experiences.length > 0">
            <li v-for="item in experiences">
              <h3>{{item.ach_name}}<span>{{item.create_time}}</span></h3>
              <p><i class="iconfont icon-dibiao"></i>{{item.region.map(value => value.title).join('')}}</p>
              <p class="content"><span>工作描述：</span><span>{{item.content}}</span></p>
            </li>
          </ul>
          <div v-else style="padding: 10px 20px">暂无</div>
          <h4>个人资质</h4>
          <Aptitude :list="aptitudes" v-if="aptitudes.length > 0"></Aptitude>
          <div v-else style="padding: 10px 20px">暂无</div>
          <h4>个人介绍</h4>
          <p class="content" v-if="content">{{content}}</p>
          <div v-else style="padding: 10px 20px">暂无</div>
        </div>
        <h4>推荐个人</h4>
        <RecommendTeam :list="recommend" path="/WorkerResume" defImg="this.src = 'http://resource.aibanzhuan.cn/material/person.jpg'"></RecommendTeam>
      </div>
      <notice></notice>
    </div>
  </div>
</template>

<script>
import RecommendTeam from './components/RecommendTeam'
import Aptitude from './components/Aptitude'
import notice from './components/notice'
export default {
  name: 'WorkerResume',
  components: { RecommendTeam, Aptitude, notice },
  data () {
    return {
      	id: '',
      avatar: '',
      name: '',
      trade: '',
      wage: '',
      year: '',
      age: '',
      health: '',
      region: '',
      isAtt: false,
      experiences: [],
      recommend: [],
      aptitudes: [],
      content: '',
      current_state: null,
      release: 0
    }
  },
  watch: {
    name (val) {
      document.title = val
    },
    '$route' () {
      this.getInfo()
    }
  },
  methods: {
    	getMobile () {
      this.$store.commit('toLoginPlus')
    		var that = this
    		this.$http.get(`/member/getInfoMobile/${this.id}/1`).then(res => {
    			if (res.data.code == 200) {
      			that.$alert(res.data.data, '联系方式', {
		          confirmButtonText: '确定',
		          callback: action => {

		          }
		        })
    			}
    		})
    	},
    attention () {
      this.$store.commit('toLogin')
      //      this.isAtt = !this.isAtt
      var that = this
      that.$http.get('/member/inReleaseFollow?follow_id=' + that.id + '&follow_type=1').then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = 1
        	}
      })
    },
    quxiao () {
      this.$store.commit('toLogin')
      //    	console.log('取消')
      	var that = this
      	that.$http.get('/member/offReleaseFollow?follow_id=' + that.id + '&follow_type=1').then(res => {
        //    		console.log(res.data)
      		if (res.data.code == 200) {
      			that.release = 0
      		}
      	})
    },
    isReset () {
      	var that = this
      that.$http.get('/member/seeReleaseFollow?follow_id=' + that.id + '&follow_type=1').then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = res.data.msg
        	}
      })
    },
    getInfo () {
      this.$http.get(`/resume/detail/${this.$route.params.id}`).then(res => {
        //      	console.log(res.data.data)
        if (res.data.code == 200) {
          const data = res.data.data
          const info = data.info
          /* 基本信息 */
          this.avatar = this.$store.state.site + info.avatar
          this.id = info.id
          this.name = info.name
          this.trade = info.work_type
          this.wage = info.min_pay == 0 ? '面议' : `${info.min_pay}/${info.quantity_unit}`
          this.year = info.work_time && info.work_time + '年' || '不限'
          this.age = info.birth && info.birth + '岁' || '不限'
          this.health = info.has_bad_medical_history
          this.region = info.region.map(value => value.title).join('')
          this.content = info.content
          /// ////////////////////////
          this.experiences = data.job_case
          this.aptitudes = info.senioritys
          this.recommend = data.push
          this.current_state = info.current_state
          if (this.$store.state.state != 0) { this.isReset() }
        }
      })
    }
  },
  created () {
    // console.log(this.$route.params.id)
    this.$cookies.set('navIdx', 2, '0')

    this.getInfo()
  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
.zhuangtai{
	display: block;
	width: 50px;
	height: 16px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #cccccc;
	line-height: 16px;
	letter-spacing: 1px;
	color: #f56c6c;
	text-align: center;
	margin-left: 18px;
	margin-top: 8px;
}
  .container{
    header{
      width: 1200px;
      height: 161px;
      border-bottom: 1px solid #eaeeed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      .hleft{
        display: flex;
        align-items: center;
      }
      img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 36px;
      }
      .title{
        height: 90px;
        overflow: hidden;
        h1{
          margin: 9px auto 33px;
          span{
            font-size: 20px;
            letter-spacing: 2px;
            color: #666666;
            &.part{
              margin: 0 10px;
              font-size: 18px;
            }
            &.title{
              display: inline-block;
              max-width: 666px;
              height: auto;
              font-size: 24px;
              letter-spacing: 2px;
              color: #34495e;
              margin-right: 20px;
            }
          }
        }
        p{
          letter-spacing: 1px;
          color: #666666;
          .part{
            margin: 0 10px;
          }
        }
      }
    }
    .main{
      width: 970px;
      box-sizing: border-box;
      background-color: #fff;
      .vacancy{
        width: 970px;
        height: 4px;
        background-color: #f3f7fa;
        position: relative;
        left: -20px;
      }
      h4{
        font-size: 24px;
        letter-spacing: 2px;
        color: #34495e;
        display: flex;
        align-items: center;
        margin: 20px 0 9px;
        padding: 0 20px;
        &:before{
          content: '';
          display: inline-block;
          width: 2px;
          height: 24px;
          background-color: #3388ff;
          margin-right: 20px;
        }
      }
      .performance{
        li{
          padding: 20px 20px 12px;
          border-bottom: 1px dashed #cccccc;
          &:last-child{
            border-bottom: 1px solid #eaeeed;
          }
          &:hover{
            background-color: #fafafb;
          }
          h3{
            font-size: 16px;
            letter-spacing: 2px;
            color: #333333;
            margin-bottom: 5px;
            span{
              font-size: 14px;
              color: #cccccc;
              margin-left: 20px;
            }
          }
          p{
            line-height: 36px;
            letter-spacing: 1px;
            color: #666666;
          }
          .content{
            display: flex;
          }
        }
      }
      .content{
        line-height: 36px;
        letter-spacing: 1px;
        color: #666666;
        padding-top: 9px;
        padding-bottom: 8px;
        white-space: pre-wrap;
      }
      & > div > .content{
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
</style>
