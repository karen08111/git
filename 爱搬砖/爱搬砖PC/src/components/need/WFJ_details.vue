<template>
  <div class="container">
    <div style="background-color: #f3f7fa;">
      <header>
        <div class="image">
          <img :src="avatar" alt="" :onerror="defImg">
          <p><router-link :to="resumePath">{{name}}</router-link></p>
        </div>
        <div class="txt">
          <h1>{{title}}</h1>
          <div class="time">
            <span>{{type}}</span>
            <span class="part">|</span>
            <span>薪资:{{pay}}</span>
          </div>
          <div class="num">
            <span>开工时间:{{time}}</span>
            <span class="part">|</span>
            <span>所需人数:{{num}}</span>
            <span class="part">|</span>
            <span>工龄:{{year}}</span>
            <span class="part">|</span>
            <span>工期:{{deadline}}</span>
          </div>
          <div class="creat">
            <span>发布时间：{{create_time}}</span>
            <span>浏览数量:{{hits}}次</span>
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
          <div class="info">
            <h4>信息描述</h4>
            <div class="content" v-if="info">{{info}}</div>
            <div v-else style="padding: 10px 20px">暂无</div>
          </div>
          <div class="introduce">
            <h4>发布者介绍</h4>
            <div class="content" v-if="introduce">{{introduce}}</div>
            <div v-else style="padding: 10px 20px">暂无</div>
          </div>
        </div>
        <h4>推荐信息</h4>
        <RecommendTeam :list="recommend" path="/WFJ_details" :defImg="defImg"></RecommendTeam>
      </div>
      <notice></notice>
    </div>
  </div>
</template>

<script>
import RecommendTeam from './components/RecommendTeam'
import notice from './components/notice'
export default {
  name: 'WFJ_details',
  components: { RecommendTeam, notice },
  data () {
    return {
      	release: '',
      	id: null,
      	uid: null,
      resumePath: '',
      avatar: require('../../assets/none.png'),
      name: '',
      title: '',
      type: '',
      time: '',
      num: '',
      pay: '',
      year: '',
      deadline: '',
      create_time: '',
      hits: '',
      isAtt: false,
      info: '',
      introduce: '',
      recommend: [],
      defImg: ''
    }
  },
  watch: {
    title (val) {
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
    		this.$http.get(`/member/getInfoMobile/${this.id}/3`).then(res => {
        //  			console.log(res)
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
      that.$http.get('/member/inReleaseFollow?follow_id=' + that.id + '&follow_type=3').then(res => {
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
      	that.$http.get('/member/offReleaseFollow?follow_id=' + that.id + '&follow_type=3').then(res => {
        //    		console.log(res.data)
      		if (res.data.code == 200) {
      			that.release = 0
      		}
      	})
    },
    isReset () {
      	var that = this
      that.$http.get('/member/seeReleaseFollow?follow_id=' + that.id + '&follow_type=3').then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = res.data.msg
        	}
      })
    },
    getInfo () {
      this.$http.get(`/recruit/detail/${this.$route.params.id}`).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          const info = data.info
          /* 基本信息 */
          this.avatar = this.$store.state.site + info.avatar
          this.id = info.id
          this.uid = info.uid
          this.name = info.publisher
          this.title = info.title
          this.type = info.work_type
          this.time = info.start_time && info.start_time || '不限'
          this.num = info.nums && info.nums + '人' || '不限'
          this.pay = info.min_pay == 0 ? '面议' : `${info.min_pay}元/${info.quantity_unit}`
          this.deadline = info.construction_period && info.construction_period + '天' || '不限'
          this.year = info.work_time && info.work_time + '年' || '不限'
          this.create_time = info.update_time
          this.hits = info.hits
          this.info = info.content
          this.introduce = info.abstract
          this.defImg = info.publishers == 1 ? `this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'` : `this.src = 'http://resource.aibanzhuan.cn/material/team.jpg'`
          this.resumePath = info.publishers == 1 ? `/ComResume/${this.uid}` : `/TeamResume/${this.uid}`
          /// ////////////////////////////////
          this.recommend = data.push
          if (this.$store.state.state != 0) { this.isReset() }
        }
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
  .container{
    header{
      width: 1200px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 11px;
      display: flex;
      .image{
        margin-right: 40px;
        img{
          width: 90px;
          height: 90px;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 15px;
        }
        p{
          width: 90px;
          line-height: 20px;
          letter-spacing: 1px;
          color: #666666;
          text-align: center;
        }
      }
      .txt{
        margin-right: auto;
        span.part{
          margin: 0 10px;
        }
        h1{
          font-size: 24px;
          letter-spacing: 2px;
          color: #34495e;
          margin-bottom: 18px;
        }
        .time{
          margin-bottom: 20px;
          span{
            font-size: 20px;
            letter-spacing: 2px;
            color: #666666;
          }
          .part{
            font-size: 18px;
          }
        }
        .num{
          margin-bottom: 20px;
          span{
            letter-spacing: 1px;
            color: #666666;
          }
          .part{
            font-size: 12px;
          }
        }
        .creat{
          span{
            letter-spacing: 1px;
            color: #cccccc;
            margin-right: 55px;
          }
        }
      }
    }
    .main{
      width: 970px;
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
      .vacancy{
        width: 970px;
        height: 4px;
        background-color: #f3f7fa;
        position: relative;
        left: -20px;
      }
      .info{
        border-bottom: 1px solid #eaeeed;
        &:hover{
          background-color: #fafafb;
        }
      }
      .introduce{
        &:hover{
          background-color: #fafafb;
        }
      }
      h4{
        font-size: 24px;
        letter-spacing: 2px;
        color: #34495e;
        display: flex;
        align-items: center;
        padding: 20px 20px 9px;
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
          padding: 20px 0 12px;
          border-bottom: 1px dashed #cccccc;
          &:last-child{
            border-bottom: 1px solid #eaeeed;
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
        }
      }
      .content{
        line-height: 36px;
        letter-spacing: 1px;
        color: #666666;
        padding-top: 9px;
        padding-bottom: 8px;
        padding-left: 20px;
        padding-right: 20px;
        white-space: pre-wrap;
      }
    }
  }
</style>

<style lang="less">
  .btns{
    font-size: 0;
    padding-top: 18px;
  }
</style>
