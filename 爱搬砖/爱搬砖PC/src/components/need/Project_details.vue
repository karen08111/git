<template>
  <div class="container">
    <div style="background-color: #f3f7fa;">
      <header>
        <div class="image">
          <img :src="avatar" alt="" onerror="this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'">
          <p><router-link :to="`/ComResume/${cid}`">{{name}}</router-link></p>
        </div>
        <div class="txt">
          <h1>{{title}}</h1>
          <div class="time">
            <span>{{type}}</span>
            <span class="part">|</span>
            <span>{{region}}</span>
          </div>
          <!--<div class="num">
            <span>人数要求:{{num}}</span>
            <span class="part">|</span>
            <span>平均工龄:{{year}}</span>
            <span class="part">|</span>
            <span>平均年龄:{{age}}</span>
            <span class="part">|</span>
            <span>工期:{{deadline}}天</span>
          </div>-->
          <div class="creat">
            <span>发布时间：{{create_time}}</span>
            <span>浏览数量:{{hits}}次</span>
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
        <div class="info">
          <h4>信息描述</h4>
          <div class="table">
            <div class="theader">
              <div class="td">
                <p>信息名称</p>
                <p>信息描述</p>
              </div>
              <div class="td">
                <p>信息名称</p>
                <p>信息描述</p>
              </div>
              <div class="td">
                <p>信息名称</p>
                <p>信息描述</p>
              </div>
            </div>
            <ul>
              <li>
                <p>总投资</p>
                <p>{{invest}}万元</p>
              </li>
              <li>
                <p>工程用途</p>
                <p>{{function_num}}</p>
              </li>
              <li>
                <p>总长度</p>
                <p>{{building_length}}米</p>
              </li>
              <li>
                <p>立项文号</p>
                <p>{{approval_num}}</p>
              </li>
              <li>
                <p>立项级别</p>
                <p>{{approval_level_num}}</p>
              </li>
              <li>
                <p>总面积</p>
                <p>{{building_area}}平方米</p>
              </li>
              <li>
                <p>建设规模</p>
                <p>{{prj_size}}</p>
              </li>
              <li>

              </li>
              <li>

              </li>
              <li class="content">
                <p>项目介绍</p>
                <p>{{content}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="area">
          <div class="address"><i class="iconfont icon-dibiao"></i>{{address}}</div>
          <Map_temp style="margin-left: 20px;" :mapxy="mapxy"></Map_temp>
        </div>
        <h4>推荐信息</h4>
        <RecommendTeam :list="recommend" path="/Project_details" defImg="this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'"></RecommendTeam>
      </div>
      <notice></notice>
    </div>
  </div>
</template>

<script>
import RecommendTeam from './components/RecommendTeam'
import notice from './components/notice'
export default {
  name: 'Project_details',
  components: { RecommendTeam, notice },
  data () {
    return {
      	id: null,
      cid: null,
      avatar: require('../../assets/none.png'),
      name: '',
      title: '',
      type: '',
      region: [],
      num: '',
      year: '',
      age: '',
      deadline: '',
      create_time: '',
      hits: '',
      isAtt: false,
      invest: '',
      approval_num: '',
      approval_level_num: '',
      prj_size: '',
      function_num: '',
      building_area: '',
      building_length: '',
      content: '',
      address: '',
      mapxy: '',
      recommend: [],
      release: 0
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
  created () {
    this.$cookies.set('navIdx', 5, '0')
    	this.getInfo()
  },
  methods: {
    	getMobile () {
      this.$store.commit('toLoginPlus')
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
    attention () {
      this.$store.commit('toLogin')
      //      this.isAtt = !this.isAtt
      var that = this
      that.$http.get('/member/inReleaseFollow?follow_id=' + that.id + '&follow_type=4').then(res => {
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
      	that.$http.get('/member/offReleaseFollow?follow_id=' + that.id + '&follow_type=4').then(res => {
        //    		console.log(res.data)
      		if (res.data.code == 200) {
      			that.release = 0
      		}
      	})
    },
    isReset () {
      	var that = this
      that.$http.get('/member/seeReleaseFollow?follow_id=' + that.id + '&follow_type=4').then(res => {
        //      	console.log(res.data)
        	if (res.data.code == 200) {
        		that.release = res.data.msg
        	}
      })
    },
    getInfo () {
      this.$http.get(`/project/detail/${this.$route.params.id}`).then(res => {
        //      	console.log(res.data.data)
        if (res.data.code == 200) {
          const data = res.data.data
          const info = data.info
          /* 基本信息 */
          this.avatar = this.$store.state.site + info.avatar
          this.name = info.name
          this.title = info.title
          this.type = info.project_type
          this.id = info.id
          this.region = info.region.map(value => value.title).join('')
          this.hits = info.hits
          this.create_time = info.update_time
          this.info = info.content
          this.address = info.address
          this.mapxy = `${info.lat},${info.lng}`
          this.invest = info.invest
          this.approval_num = info.approval_num
          this.approval_level_num = info.approval_level_num
          this.prj_size = info.prj_size
          this.function_num = info.function_num
          this.building_area = info.building_area
          this.building_length = info.building_length
          this.content = info.content
          this.cid = info.cid
          /// ////////////////////
          this.recommend = data.push
          if (this.$store.state.state != 0) { this.isReset() }
        }
      })
    }
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
      .area{
        padding-bottom: 20px;
      }
      .address{
        width: 970px;
        height: 56px;
        line-height: 56px;
        background-color: #ffffff;
        box-shadow: 0px -2px 4px 0px rgba(68, 68, 68, 0.1);
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 16px;
        letter-spacing: 2px;
        color: #666666;
        margin-left: 17px;
        i{
          margin-right: 10px;
        }
      }
      h4{
        font-size: 24px;
        letter-spacing: 2px;
        color: #34495e;
        display: flex;
        align-items: center;
        margin: 20px 0 9px;
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
    }
    .info{
      margin-bottom: 20px;
      .table{
        padding-left: 20px;
        .theader{
          width: 951px;
          height: 60px;
          background-color: #d9e2e7;
          display: flex;
          justify-content: space-between;
          .td{
            flex: 1 1 33.333%;
            display: flex;
            box-sizing: border-box;
            &:not(:last-of-type){
              border-right: 1px solid #ebeef2;
            }
            p{
              width: 50%;
              text-align: center;
              line-height: 60px;
              font-weight: bold;
              color: #333333;
            }
          }
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          border: 1px solid #ebeef2;
          border-top: none;
          li{
            flex: 1 1 33.333%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            &:hover{
              background-color: #f3f9ff;
            }
            p{
              width: 50%;
              text-align: center;
              &:first-of-type{
                color: #b3b3b3;
              }
            }
            &:not(.content){
              border-bottom: 1px solid #ebeef2;
              p:first-child{
                border-right: 1px solid #ebeef2;
              }
            }
            &:not(:nth-child(3n+3)){
              border-right: 1px solid #ebeef2;
            }
          }
          .content{
            height: auto;
            p{
              text-align: left;
              padding-left: 43px;
              &:first-child{
                width: 132px;
                min-width: 132px;
                line-height: 60px;
              }
              &:last-child{
                width: auto;
                line-height: 24px;
                color: #333333;
                padding: 20px 24px 20px 43px;
              }
            }
          }
        }
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
