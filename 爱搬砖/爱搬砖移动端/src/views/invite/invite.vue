<template>
  <div class="app">
    <inHeader></inHeader>
    <inStep :invited="invited" :steps="steps"></inStep>
    <div class="then" v-if="invited === 0">您的工友团还没有成员，赶紧邀请吧！</div>
    <div class="then" v-else-if="invited < 200">再邀请{{short}}人，得{{nextStep}}元现金红包</div>
    <div class="then" v-else>您已邀请{{invited}}人，惊喜礼包等着你</div>
    <inButton class="btn1" @click.native="invite">邀请工友帮抢红包</inButton>
    <inButton class="btn2" v-if="invited < 200 && receive === 0" :disable="true">红包在眼前啦 继续加油哦</inButton>
    <inButton class="btn2" v-if="receive !== 0" @click.native="draw">可领{{receive}}元红包啦</inButton>
    <inButton class="btn2" v-if="invited > 200 && receive === 0" @click.native="draw">超大惊喜，点击领取</inButton>
    <div class="list">
      <h5><span>我的工友团</span></h5>
      <h6>已经成功邀请{{invited}}位工友</h6>
      <inList :list="teams"></inList>
      <router-link class="lookAll" to="/invitation/teamList/inviter">查看全部工友团</router-link>
    </div>
    <inFooter></inFooter>
    <div class="guide" v-show="imgShow" @click="imgShow = false">
      <img src="../../assets/invite/guide.png" alt="">
      <i class="back"></i>
    </div>
    <div class="qr-wapper" v-show="qrShow" @click="hide($event)">
      <img src="../../assets/invite/qr.jpg" alt="" id="qrImg">
      <p>长按添加小编微信，领取现金红包~</p>
    </div>
    <popUp v-if="popShow" @close="popShow = false"></popUp>
  </div>
</template>

<script>
  import inStep from './components/inStep'
  import inButton from './components/inButton'
  import inList from './components/inList'
  import popUp from './components/popUp'

  export default {
    name: "invite",
    components: {inStep, inButton, inList, popUp},
    data() {
      return {
        invited: 0,
        steps: [0,0,0],
        imgShow: false,
        qrShow: false,
        popShow: true,
        receive: 0,
        url: process.env.VUE_APP_third,
        code: '',
        teams: []
      }
    },
    computed: {
      short (){
        let num = this.invited
        if(num > 0 && num < 200){
          if(num < 50) return 50 - num
          else if(num < 100) return 100 - num
          else return 200 - num
        }
      },
      nextStep (){
        let num = this.invited
        if(num > 0 && num < 200){
          if(num < 50) return 200 + this.receive
          else if(num < 100) return 500 + this.receive
          else return 1200 + this.receive
        }
      },
      shareTxt (){
        return {
          title: '【爱搬砖】邀请工友领红包',
          desc: ' 最高600元红包等你来拿！',
          // link: decodeURIComponent(`http://${window.location.host}/%23/invitation/inviteeLogin?from=singlemessage&isappinstalled=0&code=${this.code}`),
          link: window.location.href.replace(/invite/g, `inviteeLogin?code=${this.code}`),
          imgUrl: 'http://resource.aibanzhuan.cn/logo/login_logo.png',
          type: '',
          dataUrl: '',
          success (){}
        }
      }
    },
    watch: {
      imgShow (val){
        let bd = document.querySelector('body')
        if(val){
          bd.style.height = '100%'
          bd.style.overflow = 'hidden'
        }else{
          bd.style.height = 'auto'
          bd.style.overflow = 'visible'
        }
      },
      qrShow (val){
        let bd = document.querySelector('body')
        if(val){
          bd.style.height = '100%'
          bd.style.overflow = 'hidden'
        }else{
          bd.style.height = 'auto'
          bd.style.overflow = 'visible'
        }
      }
    },
    methods: {
      req (){
        this.$http.get('/member/invitationInfo').then(res => {
          if(res.code == 200){
            const data = res.data
            this.invited = data.userInfo.invitationCount
            this.receive = data.userInfo.waitReceived
            this.teams = data.list
            this.steps = data.UserInvitationMoneyStatusList.map(value => value.status)
          }
        })

        this.$http.get('member/invitationCode').then(res => {
          if(res.code == 200){
            this.code = res.data
          }
        }).then(_ => {
          this.share()
        })
      },
      invite (){
        this.imgShow = true
        // this.$router.push({path: `/invitation/inviteeLogin?code=${this.code}`})
      },
      draw (){
        this.qrShow = true
      },
      hide (e){
        if(e.target.id !== 'qrImg'){
          this.qrShow = false
        }
      },
      share (){
        var formData = new FormData();
        formData.append('url',window.location.href)

        this.$http.post('/common/third_auth/share_sign',formData).then(res => {
          if(res.code == 200){
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
            })

            wx.ready(function (){
              //发送给朋友
              wx.onMenuShareAppMessage({
                title: this.shareTxt.title, // 分享标题
                desc: this.shareTxt.desc, // 分享描述
                link: this.shareTxt.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareTxt.imgUrl, // 分享图标
                type: this.shareTxt.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: this.shareTxt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: this.shareTxt.success
              })

              //分享到朋友圈
              wx.onMenuShareTimeline({
                title: this.shareTxt.title, // 分享标题
                desc: this.shareTxt.desc, // 分享描述
                link: this.shareTxt.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareTxt.imgUrl, // 分享图标
                type: this.shareTxt.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: this.shareTxt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: this.shareTxt.success
              })

              //QQ
              wx.onMenuShareQQ({
                title: this.shareTxt.title, // 分享标题
                desc: this.shareTxt.desc, // 分享描述
                link: this.shareTxt.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareTxt.imgUrl, // 分享图标
                type: this.shareTxt.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: this.shareTxt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: this.shareTxt.success
              })

              //QQ空间
              wx.onMenuShareQZone({
                title: this.shareTxt.title, // 分享标题
                desc: this.shareTxt.desc, // 分享描述
                link: this.shareTxt.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareTxt.imgUrl, // 分享图标
                type: this.shareTxt.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: this.shareTxt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: this.shareTxt.success
              })
            }.bind(this))
          }
        })
      }
    },
    created (){
      this.req()
    }
  }
</script>

<style scoped lang="less">
  .app{
    .then{
      font-family: PingFang-SC-Medium;
      font-size: 0.25rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0.01rem;
      color: #fefefe;
      margin-bottom: 0.27rem;
      text-indent: 0.36rem;
    }
    .btn1{
      margin-bottom: 0.2rem;
    }
    .btn2{
      margin-bottom: 0.35rem;
    }
    .guide{
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      img{
        width: 100%;
      }
      .back{
        display: block;
        width: 0.2rem;
        height: 0.34rem;
        background: url("../../assets/invite/back.png") no-repeat center center / 100%;
        position: absolute;
        top: 0.45rem;
        left: 0.2rem;
      }
    }
    .list{
      margin-bottom: 0.68rem;
      h5{
        width: 100%;
        font-family: PingFang-SC-Bold;
        font-size: 0.34rem;
        letter-spacing: 0.03rem;
        color: #ffc62f;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:before, &:after{
          content: '';
          display: block;
          width: 2.44rem;
          height: 0.01rem;
          background-color: #fff;
          flex: 1 1 auto;
        }
        span{
          margin: 0 0.33rem;
        }
      }
      h6{
        font-family: PingFang-SC-Bold;
        font-size: 0.25rem;
        letter-spacing: 0.03rem;
        color: #ffc62f;
        margin: 0.17rem 0 0.17rem;
        text-align: center;
      }
      .lookAll{
        display: block;
        text-align: center;
        font-family: PingFang-SC-Medium;
        font-size: 0.22rem;
        letter-spacing: 0.02rem;
        color: #ffcb00;
        margin: 0.45rem 0 0.52rem;
      }
    }
    .qr-wapper{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background-color: rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 100%;
      }
      p{
        font-family: PingFang-SC-Bold;
        font-size: 0.32rem;
        line-height: 0.5rem;
        letter-spacing: 0.04rem;
        color: #ffffff;
      }
    }
  }
</style>