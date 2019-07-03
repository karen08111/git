<template>
  <div class="container">
    <div style="background-color: #f3f7fa;">
      <header>
        <div class="hleft">
          <img :src="avatar" alt="" onerror="this.src = 'http://resource.aibanzhuan.cn/material/team.jpg'">
          <div class="title">
            <h1><span class="title">{{name}}</span><span>{{trade}}</span><span class="part">|</span><span>成立时间:{{time}}</span></h1>
            <p>
              <span>团队人数:{{num}}人</span>
              <span>平均年龄:{{age}}</span>
              <span>平均工龄：{{working_age}}</span>
            </p>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="getMobile">联系我们</el-button>
          <!--<el-button type="primary" plain @click="attention">{{isAtt ? '已关注' : '关注'}}</el-button>-->
          <el-button type="primary" v-if="release==0" plain @click="attention">关注</el-button>
          <el-button type="primary" v-if="release==1" plain @click="quxiao">取消关注</el-button>
        </div>
      </header>
    </div>
    <div style="width: 1200px; margin: 10px auto 0; display: flex; justify-content: space-between;">
      <div class="main">
        <div style="border: solid 1px #eaeeed;">
          <h4>工程业绩</h4>
          <ul class="performance" v-if="performances.length > 0">
            <li v-for="item in performances">
              <h3>{{item.ach_name}}<span>{{item.create_time}}</span></h3>
              <p><i class="iconfont icon-dibiao"></i>{{item.region.map(value => value.title).join('')}}</p>
              <p class="content"><span>业绩说明：</span><span>{{item.content}}</span></p>
            </li>
          </ul>
          <div v-else style="padding: 10px 20px">暂无</div>
          <h4>团队介绍</h4>
          <p class="content" v-if="content">{{content}}</p>
          <div v-else style="padding: 10px 20px">暂无</div>
        </div>
        <h4 v-if="recommend.length > 0">推荐团队</h4>
        <RecommendTeam v-if="recommend.length > 0" :list="recommend" path="/TeamResume" defImg="this.src = 'http://resource.aibanzhuan.cn/material/team.jpg'"></RecommendTeam>
      </div>
      <notice></notice>
    </div>
  </div>
</template>

<script>
import RecommendTeam from './components/RecommendTeam'
import notice from './components/notice'
export default {
  name: 'TeamResume',
  components: { RecommendTeam, notice },
  data () {
    return {
      	release: 0,
      avatar: '',
      name: '',
      trade: '',
      time: '',
      num: '',
      age: '',
      isAtt: false,
      working_age: '',
      performances: [],
      recommend: [],
      content: '我们的制作团队不光在技术上处于行业前端，我们更注重将客户的产品表达的清楚与准确，我们大多是理科出身，在机械、游戏、电子、物理等各学科我们都有研究，能轻松理解客户的构思，所以我们能更好的将客户的意图表现出来。我们拥有自己的专业三维动画、建筑动画、虚拟现实和影视拍摄制作团队。我们不断创新与提高三维动画、建筑动画、虚拟现实的制作水准，运用尖端的三维动画技术、虚拟现实技术，不断满足客户对数字体验服务的需求.。'
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
    		this.$http.get(`/member/getInfoMobile/${this.id}/2`).then(res => {
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
      that.$http.get('/member/inReleaseFollow?follow_id=' + that.id + '&follow_type=2').then(res => {
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
      	that.$http.get('/member/offReleaseFollow?follow_id=' + that.id + '&follow_type=2').then(res => {
        //    		console.log(res.data)
      		if (res.data.code == 200) {
      			that.release = 0
      		}
      	})
    },
    isReset () {
      	var that = this
      that.$http.get('/member/seeReleaseFollow?follow_id=' + that.id + '&follow_type=2').then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = res.data.msg
        	}
      })
    },
    getInfo () {
      this.$http.get(`/team/detail/${this.$route.params.id}`).then(res => {
        //      	console.log(res.data.data)
        if (res.data.code == 200) {
          const data = res.data.data
          const info = data.info
          /* 基本信息 */
          this.avatar = this.$store.state.site + info.avatar
          this.id = info.id
          this.name = info.team_name
          this.trade = info.industry_type
          this.time = info.team_create_time && info.team_create_time || '未知'
          this.num = info.nums
          this.age = info.avg_age && info.avg_age + '岁' || '未知'
          this.working_age = info.avg_work_time && info.avg_work_time + '年' || '未知'
          this.content = info.content
          /// ////////////////
          this.performances = data.job_case
          this.recommend = data.push
          if (this.$store.state.state != 0) { this.isReset() }
        }
      })
    }
  },
  created () {
    // console.log(this.$route.params.id)
    this.$cookies.set('navIdx', 1, '0')
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
  .container{
    header{
      width: 1200px;
      height: 161px;
      margin: 0 auto;
      border-bottom: 1px solid #eaeeed;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
          span:not(:last-of-type):after{
            content: '|';
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
