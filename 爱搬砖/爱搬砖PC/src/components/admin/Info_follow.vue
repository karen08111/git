<template>
  <div class="info">
    <div class="banner">
      <span :class="{active : index == 1}" @click="index = 1">我关注的信息</span>
      <span :class="{active : index == 2}" @click="index = 2">我关注的会员</span>
    </div>
    <div class="context" v-if="index == 1 && infos.length > 0 || index == 2 && coms.length > 0">
      <div v-show="index == 1">
        <list :list="infos.filter(value=>value.follow_type==1)" :mod="1"  path="/WorkerResume" style="width: 100%">
        	<span v-if="item.work_type" slot="type" slot-scope="{ item }">{{item.work_type}}</span>
	        <span v-if="item.work_time" slot="time" slot-scope="{ item }">{{item.work_time}}年工龄</span>
	        <span v-if="item.min_pay" slot="pay" slot-scope="{ item }">{{item.min_pay}}/{{item.quantity_unit}}</span>
        </list>
        <list :list="infos.filter(value=>value.follow_type==2)" :mod="2"  path="/TeamResume" style="width: 100%">
        	<span v-if="item.industry_type" slot="type" slot-scope="{ item }">{{item.industry_type}}</span>
	        <span v-if="item.nums" slot="nums" slot-scope="{ item }">{{item.nums}}人</span>
	        <span v-if="item.avg_work_time" slot="time" slot-scope="{ item }">{{item.avg_work_time}}年工龄</span>
        </list>
        <list :list="infos.filter(value=>value.follow_type==3)" :mod="3"  path="/TFJ_details" style="width: 100%">
        	<span v-if="item.work_type" slot="type" slot-scope="{ item }">{{item.work_type}}</span>
	        <span v-if="item.nums" slot="nums" slot-scope="{ item }">{{item.nums}}人</span>
	        <span v-if="item.work_time" slot="time" slot-scope="{ item }">{{item.work_time}}年工龄</span>
        </list>
        <list :list="infos.filter(value=>value.follow_type==4)" :mod="4"  path="/Project_details" style="width: 100%">
        	<span v-if="item.project_type" slot="type" slot-scope="{ item }">{{item.project_type}}</span>
        </list>
        <paging :total="total" :page.sync="page"></paging>
      </div>
      <div v-show="index == 2">
        <RecommendTeam :list="coms" path="/ComResume"></RecommendTeam>
        <paging :total="totalUser" :page.sync="pageUser"></paging>
      </div>
    </div>
    <div class="bot" v-if="index == 1 && infos.length > 0 || index == 2 && coms.length > 0"></div>
  </div>
</template>

<script>
import list from '@/components/need/components/list'
import RecommendTeam from '@/components/need/components/RecommendTeam'
import paging from '@/components/need/components/paging'
export default {
  name: 'Info_follow',
  components: { list, RecommendTeam, paging },
  data () {
    return {
      	total: 0,
      	page: 1,
      	totalUser: 0,
      	pageUser: 1,
      index: 1,
      infos: [],
      coms: []
    }
  },
  computed: {

  },
  watch: {
    	page (value) {
    		this.getInfor()
    	},
    	pageUser () {
    		this.getUserInfo()
    	}
  },
  methods: {
    	getInfor () {
    		var that = this
	      this.$http.get('/member/releaseFollowList', { params: { page: this.page } }).then(res => {
        //	      	console.log(res.data.data)
	      	if (res.data.code == 200) {
	      		this.total = res.data.data.total
	      		this.page = +res.data.data.current_page
	      		that.infos = res.data.data.data
	      	}
	      })
    	},
    	getUserInfo () {
    		this.$http.get('/member/followList').then(res => {
    			if (res.data.code == 200) {
          //  				console.log(res.data.data.data)
    				this.totalUser = res.data.data.total
    				this.page = +res.data.data.current_page
    				this.coms = res.data.data.data
    			}
    		})
    	}
  },
  created () {
    /* this.$store.state.admin_nav_active = '/Info_follow'

      this.$http.get(this.$store.state.site + '/member/releaseFollowList').then(res => {
        if(res.data.code == 200){
          this.infos = res.data.data.data.data
        }
      })

      this.$http.get(this.$store.state.site + '/member/followList').then(res => {
        if(res.data.code == 200){
          this.coms = res.data.data.data.data
        }
      }) */
    this.getInfor()
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
  .info {
    width: 100%;
    .banner {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #000003;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 10px;
      span {
        display: inline-block;
        height: 100%;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 2px;
        color: #000003;
        box-sizing: border-box;
        margin-right: 62px;
        cursor: pointer;
        &.active {
          border-bottom: 4px solid #3388ff;
        }
      }
    }
    .context {
      width: 100%;
      /*height: 534px;*/
      background-color: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .list {
        h2 {
          font-size: 14px;
          line-height: 50px;
          letter-spacing: 1px;
          color: #999999;
        }
        ul.groom {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          width: 906px;
          li{
            width:220px;
            height:352px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(231,231,231,1);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            box-sizing: border-box;
            margin-right: 6px;
            margin-bottom: 40px;
            transition: all .4s;
            position: relative;
            overflow: hidden;
            &:hover{
              margin-top: -2px;
              margin-bottom: 42px;
              box-shadow: 0 10px 15px #e2e2e2;
            }
            .image{
              width: 100%;
              height: 178px;
              overflow: hidden;
              position: relative;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .txt{
              padding: 0 10px;
              .red{
                height: 16px;
                font-size:13px;
                color:rgba(245,70,70,1);
                margin-top: 10px;
                span{
                  font-size: 16px;
                }
              }
              .tit{
                font-size:13px;
                color:rgba(51,51,51,1);
                height: 38px;
                line-height:38px;
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .com{
                font-size:13px;
                color:rgba(153,153,153,1);
                line-height:1;
                padding: 13px 0 18px;
                border-top: 1px dashed rgba(229,229,229,1);
              }
              .bt{
                height: 20px;
                line-height: 20px;
                padding: 0 9px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(51,136,255,1);
                border-radius:4px;
                font-size: 13px;
                color: #3388ff;
                white-space: nowrap;
              }
              .place{
                font-size:13px;
                color:rgba(153,153,153,1);
                line-height:20px;
                white-space: nowrap;
                margin-top: 11px;
              }
            }
          }
        }
        ul.com {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 40px;
          li {
            width: 220px;
            min-width: 220px;
            height: 283px;
            border-radius: 0px 0px 10px 10px;
            border: solid 1px #e7e7e7;
            transition: all .4s;
            box-sizing: border-box;
            margin-bottom: 20px;
            &:not(:last-child) {
              margin-right: 10px;
            }
            &:hover {
              margin-top: -2px;
              margin-bottom: 22px;
              box-shadow: 0 10px 15px #888888;
            }
            .image {
              width: 100%;
              height: 220px;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center center;
              position: relative;
              p {
                width: 100%;
                height: 40px;
                line-height: 40px;
                background-color: #000000;
                opacity: 0.4;
                font-size: 16px;
                letter-spacing: 2px;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 9px;
                box-sizing: border-box;
                position: absolute;
                left: 0;
                bottom: 0;
              }
            }
            .gbot {
              padding: 10px;
              p {
                font-size: 13px;
                line-height: 20px;
                letter-spacing: 1px;
                color: #b6b6b6;
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
    & > .bot {
      width: 960px;
      height: 40px;
      background-color: #fafafd;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    }
  }
</style>
