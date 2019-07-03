<template>
  <div class="homePage" v-wechat-title="$route.meta.title=name">
    <div class="header">
      <div class="htop">
        <div class="avatar" v-if="avatar"><img :src="avatar" alt=""></div>
        <div class="avatar" v-else><img src="../../assets/none.png" alt=""></div>
        <div class="txt">
          <h1>{{name}}<span>{{status}}</span></h1>
          <button @click="attention">{{isatt ? '已关注' : '关 注'}}</button>
        </div>
        <div class="qr">
          <div class="image"><img v-if="qr_img" :src="qr_img" alt=""></div>
          <p>{{qr_name}}</p>
        </div>
      </div>
      <div class="hbot" v-if="imgs"><img :src="imgs" alt=""></div>
    </div>
    <div class="item">
      <h4>{{type}}介绍</h4>
      <p>{{content}}</p>
    </div>
    <div class="tabnav">
      <nav>
        <span :class="{active : tabidx == 1}" @click="tabidx = 1">工程业绩</span>
        <span :class="{active : tabidx == 2}" @click="tabidx = 2">发布信息</span>
      </nav>
      <performance v-show="tabidx == 1" :list="jcdata"></performance>
      <div v-show="tabidx == 2">
        <infoList :list="list" :type="$route.params.type == 'company' ? 'read' : 'detail'"></infoList>
        <infoList v-if="isall" :list="resumedata" type="detail"></infoList>
        <van-button size="large" v-if="!isall && (recruitdata.length > 0 || resumedata.length > 0)" @click="isall = !isall">显示全部</van-button>
      </div>
    </div>
    <div class="item">
      <h4>推荐{{type}}</h4>
      <BigProject :list="nom" :type="$route.params.type"></BigProject>
    </div>
  </div>
</template>

<script>
  import { baseURL } from '@/axios'
  import performance from '@/components/list/performance'
  export default {
    name: "index",
    components: {performance},
    data() {
      return {
        baseURL: baseURL,
        avatar: '',
        name: '',
        status: '',
        qr_img: '',
        qr_name: '',
        imgs: '',
        content: '',
        jcdata: [],
        recruitdata: [],
        resumedata: [],
        nom: [],
        isatt: false,
        isall: false,
        tabidx: 1,
        showName:''
      }
    },
    computed: {
      type() {
        const type = this.$route.params.type
        if (type == 'person') return '个人'
        else if (type == 'group') return '团队'
        else return '企业'
      },
      list() {
        const type = this.$route.params.type
        if (type == 'person') {
          if (this.isall) {
            return this.resumedata
          } else {
            return this.resumedata.slice(0, 2)
          }
        } else if (type == 'group') {
          if (this.isall) {
            return this.recruitdata
          } else {
            return this.recruitdata.slice(0, 2)
          }
        } else {
          if (this.isall) {
            return this.recruitdata
          } else {
            return this.recruitdata.slice(0, 2)
          }
        }
      }
    },
    watch: {
      '$route'() {
        this.request()
      }
    },
    mounted() {
    	this.fenxiang();
    },
    methods: {
      request() {
        this.$http.get(`/${this.$route.params.type}/${this.$route.params.uid}`).then(res => {
//      	console.log(res)
          const data = res.data.info
          this.showName = data.team_name || data.company_name
          this.avatar = data.avatar ? baseURL + data.avatar : ''
          this.name = data.team_name || data.company_name
          if (data.status == 1) this.status = '离职 - 随时到岗'
          else if (data.status == 2) this.status = '在职 - 考虑机会'
          else if (data.status == 3) this.status = '在职 - 月内到岗'
          this.qr_img = data.qr_img ? baseURL + data.qr_img : ''
          this.qr_name = data.qr_name
          this.imgs = data.imgs ? baseURL + data.imgs[0].path : ''
          this.content = data.content
          this.jcdata = res.data.jcdata ? res.data.jcdata : []
          this.recruitdata = res.data.recruitdata ? res.data.recruitdata : []
          this.resumedata = res.data.resumedata ? res.data.resumedata : []
          this.nom = res.data.nom ? res.data.nom.slice(0, 2) : []
        })
      },
      attention() {
        let url = this.isatt ? '/member/offFollow/' : '/member/inFollow/'
        this.$http.get(url + this.$route.params.uid).then(res => {
          if (res.code == 200) {
            this.isatt = !this.isatt
          } else {
            this.$toast.fail(res.msg)
          }
        })
      },
      fenxiang (){
      	var formData = new FormData();
	    	formData.append('url',window.location.href)
				var that =this;
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
	
	
	
	         //处理验证失败的信息
	//      wx.error(function (res) {
	//        logUtil.printLog('验证失败返回的信息:',res);
	//      });
	        //处理验证成功的信息
	        wx.ready(function () {
//	        	//发送给朋友
//	          wx.updateAppMessageShareData({ 
//						        title: that.name, // 分享标题
//						        desc: that.content, // 分享描述
//						        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//						        imgUrl: that.avatar, // 分享图标
//						});
//						//分享朋友圈和QQ空间
//						wx.updateTimelineShareData({ 
//						        title: that.name, // 分享标题
//						        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//						        imgUrl: that.avatar, // 分享图标
//						});
//						//
							wx.onMenuShareAppMessage({
							title: that.showName, // 分享标题
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
							title: that.showName, // 分享标题
					    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: that.avatar, // 分享图标
					    success: function () {}
						})
						//QQ
						wx.onMenuShareQQ({
							title: that.showName, // 分享标题
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
							title: that.showName, // 分享标题
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
    created() {
      this.request()
    }
  }
</script>

<style scoped lang="less">
  .homePage{
    padding: 0.2rem 0.3rem;
    .header{
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0rem 0.06rem 0.15rem 0rem
      rgba(51, 136, 255, 0.2);
      border-radius: 0.20rem;
      margin-bottom: 0.3rem;
      .htop{
        display: flex;
        padding: 0.2rem 0.2rem 0.4rem;
        .avatar{
          width: 1.20rem;
          min-width: 1.20rem;
          height: 1.20rem;
          margin-right: 0.3rem;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        .txt{
          min-width: 3.44rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h1{
            font-family: PingFangSC-Regular,MicrosoftYaHei;
            font-size: 0.32rem;
            line-height: 1;
            letter-spacing: 0.03rem;
            color: #333333;
            span{
              font-family: PingFangSC-Regular,MicrosoftYaHei;
              font-size: 0.16rem;
              letter-spacing: 0.02rem;
              color: #999999;
            }
          }
          button{
            width: 1rem;
            height: 0.40rem;
            background-color: #ff5400;
            border-radius: 0.20rem;
            font-family: PingFangSC-Regular,MicrosoftYaHei;
            font-size: 0.22rem;
            letter-spacing: 0.02rem;
            color: #ffffff;
          }
        }
        .qr{
          .image{
            width: 1.30rem;
            min-width: 1.30rem;
            img{
              width: 100%;
            }
          }
          p{
            font-family: PingFangSC-Regular,MicrosoftYaHei;
            font-size: 0.16rem;
            letter-spacing: 0.01rem;
            color: #000000;
          }
        }
      }
      .hbot{
        width: 100%;
        height: 3.38rem;
        font-size: 0;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0rem 0rem 0.20rem 0.20rem;
          object-fit: cover;
        }
      }
    }
    .item{
      margin-bottom: 0.3rem;
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
    .tabnav{
      nav{
        display: flex;
        justify-content: space-around;
        width: 6.91rem;
        height: 1.10rem;
        background-color: #ffffff;
        box-shadow: 0rem 0.06rem 0.15rem 0rem
        rgba(51, 136, 255, 0.2);
        border-radius: 0.20rem 0.20rem 0rem 0rem;
        margin-bottom: 0.2rem;
        span{
          display: block;
          line-height: 1.1rem;
          font-family: MicrosoftYaHei;
          font-size: 0.28rem;
          letter-spacing: 0.03rem;
          color: #999999;
          &.active{
            color: #333333;
            border-bottom: 0.04rem solid #3388ff;
          }
        }
      }
    }
  }
</style>