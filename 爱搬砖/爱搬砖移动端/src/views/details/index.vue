<template>
  <div class="details"  v-wechat-title="$route.meta.title=title">
    <div class="top">
      <div class="info">
        <div class="left">
          <h3>{{title}}</h3>
          <p v-if="region">{{region[0].title}}-{{region[1].title}}</p>
          <span v-if="min_pay"><b>¥</b>{{min_pay}}/{{min_pay_time}}</span>
          <span v-else>面议</span>
        </div>
        <div class="right">
          <p><i class="iconfont icon-yuedu"></i>浏览数量：{{hits}}人</p>
          <p><i class="iconfont icon-shijian"></i>发布时间：{{create_time}}</p>
        </div>
      </div>
      <!--<router-link class="homePage" :to="`/homePage/${type}/${uid?uid:cid}`">
        <div class="home">
          <div v-if="avatar" class="image"><img :src="avatar" alt=""></div>
          <div v-else class="image"><img src="../../assets/none.png" alt=""></div>
          {{company_name}}
        </div>
        <van-icon name="arrow" />
      </router-link>-->
    </div>
    <div class="pro" v-if="$route.query.type ==  'project/detail'">
      <div class="item">
        <h4>详细信息</h4>
        <p>{{content}}</p>
      </div>
    </div>
    <div class="find" v-else>
      <div class="item">
        <h4>职位描述</h4>
        <p>{{content}}</p>
      </div>
      <!--<div class="item">
        <h4>发布者介绍</h4>
        <p>{{introduce}}</p>
      </div>-->
    </div>
    <div class="recommend">
      <div class="item">
        <h4>推荐信息</h4>
        <proList v-if="$route.query.type ==  'project/detail'" :list="list" type="project/detail"></proList>
        <infoList v-else :list="list" :type="$route.query.type"></infoList>
      </div>
    </div>
    <div class="btns">
      <button class="attention" @click="attention">{{isatt ? '已关注' : '关注'}}</button>
      <a class="contact" :href="`tel:${mobile}`">立即联系</a>
    </div>
  </div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script>
  import { baseURL } from '@/axios'
  import { getToken } from '@/utils/auth'
  export default {
    name: "index",
    data() {
      return {
      	cid:'',
        uid: '',
        dq_type: '',
        mobile: '',
        title: '',
        region: [],
        min_pay: '',
        min_pay_time:'',
        max_pay: '',
        hits: '',
        create_time: '',
        avatar: '',
        company_name: '',
        content: '',
        introduce: '',
        list: [],
        isatt: false
      }
    },
    mounted() {
    	this.fenxiang();
			
    },
    computed: {
//    pay (){
//      if(this.min_pay == 0 && this.max_pay == 0){
//        return '面议'
//      }else{
//        return `${this.min_pay}k-${this.max_pay}k/月`
//      }
//    },
      type (){
        if(this.dq_type == 1) return 'person'
        else if(this.dq_type == 2) return 'groupe'
        else return 'company'
      },
      infoType (){
        const type = this.$route.query.type
        if(type == 'read') return 1
        else if(type == 'detail') return 2
        else return 3
      }
    },
    watch: {
      '$route' (){
        this.request()
      }
    },
    methods: {
      request (){
        const type = this.$route.query.type
        this.$http.get(`/${type}/detail/${this.$route.query.id}`).then(res => {
        	console.log(res.data)
          if(type != 'project/detail'){
//          this.dq_type = res.data.data.dq_type
            this.uid = res.data.info.uid
            this.title = res.data.info.name
            this.region = res.data.info.region
            this.min_pay = res.data.info.min_pay
            this.hits = res.data.info.hits
            this.create_time = res.data.info.update_time
            this.avatar = baseURL + res.data.info.avatar
            this.cid=res.data.info.cid
            this.min_pay_time=res.data.info.quantity_unit
//          console.log(this.avatar,'111111111111');
            this.company_name = res.data.info.name
            this.content = res.data.info.content
            this.introduce = res.data.info.content
            this.list = res.data.recommander
          }else{
            this.dq_type = res.data.info.dq_type
            this.mobile = res.data.info.mobile
            this.title = res.data.info.title
            this.company_name = res.data.info.company_name
            this.hits = res.data.info.hits
            this.create_time = res.data.info.update_time.slice(0,10)
            this.avatar = baseURL + res.data.info.image[0].path
            this.content = res.data.info.content
            this.list = res.data.push
            this.cid=res.data.info.cid
          }
        })
        
      },
      getAtt (){
        if(getToken()){
          this.$http.get('/member/seeReleaseFollow',{params: {followId: this.$route.query.id, type: this.infoType}}).then(res => {
            this.isatt = res
          })
        }
      },
      attention (){
        let url = this.isatt ? '/member/offReleaseFollow' : '/member/inReleaseFollow'
        this.$http.get(url,{params: {followId: this.$route.query.id, type: this.infoType}}).then(res => {
          if(res.code == 200){
            this.isatt = !this.isatt
          }
        })
      },
      contact (){
        this.$dialog.alert({
          title: '联系方式',
          message: this.mobile
        }).then(() => {
          // on close
        })
      },
      fenxiang (){
      	var formData = new FormData();
	    	formData.append('url',window.location.href)
				var that =this;
//				console.log('测试')
				this.$http.post('/common/third_auth/share_sign',formData).then(res=>{
					var obj =res.data;
					 wx.config({
	          debug: false,
	          appId: obj.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
	          timestamp:obj.timestamp, // 必填，生成签名的时间戳
	          nonceStr: obj.nonceStr, // 必填，生成签名的随机串
	          signature: obj.signature,// 必填，签名，见附录1
	          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
	          jsApiList: [
	            'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'
	          ]
	        });
//	        console.log()
	
	
	         //处理验证失败的信息
	//      wx.error(function (res) {
	//        logUtil.printLog('验证失败返回的信息:',res);
	//      });
	        //处理验证成功的信息
	        wx.ready(function () {
	        	//发送给朋友
//	          wx.updateAppMessageShareData({ 
//						        title: that.title, // 分享标题
//						        desc: that.content, // 分享描述
//						        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//						        imgUrl: that.avatar, // 分享图标
//						});
						wx.onMenuShareAppMessage({
							title: that.title, // 分享标题
							desc: that.content, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.avatar, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
							// 用户点击了分享后执行的回调函数
							}
						});
						wx.onMenuShareTimeline({
							title: that.title, // 分享标题
					    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: that.avatar, // 分享图标
					    success: function () {}
						})
						//QQ
						wx.onMenuShareQQ({
							title: that.title, // 分享标题
							desc: that.content, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.avatar, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
						});
						//QQ空间
						wx.onMenuShareQZone({
							title: that.title, // 分享标题
							desc: that.content, // 分享描述
							link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: that.avatar, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
						});
	
	        });
					
				})
      }
    },
    created (){
      this.request()
      this.getAtt()
      
    }
  }
</script>

<style scoped lang="less">
  .details{
    padding: 0.2rem 0.3rem;
    .top{
      width: 6.90rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.06rem 0.15rem 0rem
      rgba(51, 136, 255, 0.2);
      border-radius: 0.20rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin-bottom: 0.6rem;
      .info{
        width: 100%;
        border-bottom: 1PX solid #e5e5e5;
        padding: 0.2rem 0 0.3rem;
        display: flex;
        justify-content: space-between;
        .left{
          h3{
            font-family: PingFangSC-Regular,MicrosoftYaHei;
            font-size: 0.32rem;
            line-height: 1;
            letter-spacing: 0.03rem;
            color: #333333;
            margin-bottom: 0.2rem;
          }
          p{
            font-family: PingFangSC-Regular,MicrosoftYaHei;
            font-size: 0.28rem;
            line-height: 1;
            letter-spacing: 0.03rem;
            color: #999999;
            margin-bottom: 0.43rem;
          }
          span{
            font-family: PingFangSC-Medium,MicrosoftYaHei;
            font-size: 0.34rem;
            color: #ff5400;
            b{
              font-size: 0.3rem;
              font-weight: 400;
            }
          }
        }
        .right{
          min-width: 2.56rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          p{
            font-family: PingFangSC-Regular,MicrosoftYaHei;
            font-size: 0.18rem;
            line-height: 0.28rem;
            letter-spacing: 0.02rem;
            color: #b6b6b6;
            i{
              font-size: 0.18rem !important;
            }
          }
        }
      }
      .homePage{
        display: block;
        width: 100%;
        height: 1.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .home{
          font-family: PingFangSC-Regular,MicrosoftYaHei;
          font-size: 0.34rem;
          line-height: 0.90rem;
          letter-spacing: 0.03rem;
          color: #333333;
          white-space: nowrap;
          .image{
            display: inline-block;
            width: 1.21rem;
            height: 1.21rem;
            margin-right: 0.28rem;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }
        }
        .van-icon{
          font-size: 0.34rem;
        }
      }
    }
    .item{
      margin-bottom: 0.3rem;
      white-space: pre-line;
      & > h4{
        font-family: PingFangSC-Regular,MicrosoftYaHei;
        font-size: 0.28rem;
        letter-spacing: 0.03rem;
        color: #333333;
        margin-bottom: 0.17rem;
        overflow: hidden;
        &:before{
          content: '';
          display: inline-block;
          width: 0.10rem;
          height: 0.3rem;
          background-color: #3388ff;
          vertical-align: top;
          margin-right: 0.2rem;
        }
      }
      & > p{
        font-family: PingFangSC-Regular;
        font-size: 0.24rem;
        line-height: 0.36rem;
        letter-spacing: 0.02rem;
        color: #999999;
      }
    }
    .recommend{
      margin-bottom: 1rem;
    }
    .btns{
      height: 1.30rem;
      background-color: #ffffff;
      padding: 0.15rem 0.3rem;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button,a{
        height: 100%;
        text-align: center;
        font-family: PingFangSC-Regular,MicrosoftYaHei;
        font-size: 0.34rem;
        letter-spacing: 0.03rem;
      }
      .attention{
        width: 2.60rem;
        min-width: 2.60rem;
        height: 1.00rem;
        line-height: 1.00rem;
        background-color: #ffffff;
        border-radius: 0.10rem;
        border: solid 1PX #3388ff;
        color: #3388ff;
        margin-right: 0.2rem;
      }
      .contact{
        display: block;
        width: 100%;
        max-width: 4.1rem;
        height: 1.00rem;
        line-height: 1.00rem;
        text-align: center;
        background-color: #3388ff;
        border-radius: 0.10rem;
        color: #ffffff;
      }
    }
  }
</style>