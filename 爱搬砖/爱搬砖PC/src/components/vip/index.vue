<template>
  <div class="app">
    <Header></Header>
    <div class="main">
      <div class="v-header">
        <img src="//resource.aibanzhuan.cn/vip/vip_banner.png" alt="" class="bg">
        <div class="mask"></div>
        <img src="//resource.aibanzhuan.cn/vip/vip_txt.png" alt="" class="txt">
      </div>
      <div class="container">
        <div class="card-wapper">
          <div class="card">
            <div class="c-top v1">
              <div class="txt">
                <h3>大砖会员</h3>
                <div class="line">
                  <p>原价:1288元</p>
                  <p>活动价:<span>699元</span></p>
                </div>
              </div>
            </div>
            <div class="content">1.一年内，不限地区，全国信息免费查看。
              2.服务时间从成功订阅后开始计算。
              3.信息可在PC端、移动端、APP端三方查看。
              4.站内信息版权归摩云爱搬砖所有，禁止赠与、借用、转让、售卖，否则平台有权在未经通知的情况下取消会员服务资格，由此带来的损失由会员自行承担，并追究法律责任。
              5.订阅成功后不支持退款。</div>
            <div class="btn" @click="open(12)">立即开通</div>
          </div>
          <div class="card">
            <div class="c-top v2">
              <div class="txt">
                <h3>小砖会员</h3>
                <div class="line">
                  <p>原价:699元</p>
                  <p>活动价:<span>299元</span></p>
                </div>
              </div>
            </div>
            <div class="content">1.一个月内，不限地区，全国信息免费查看。
              2.服务时间从成功订阅后开始计算。
              3.信息可在PC端、移动端、APP端三方查看。
              4.站内信息版权归摩云爱搬砖所有，禁止赠与、借用、转让、售卖，否则平台有权在未经通知的情况下取消会员服务资格，由此带来的损失由会员自行承担，并追究法律责任。
              5.订阅成功后不支持退款。</div>
            <div class="btn" @click="open(1)">立即开通</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <v-pop v-if="show" :serve.sync="serve" :balance="balance" @close="close"></v-pop>
  </div>
</template>

<script>
  import vPop from './comps/vPop'
  export default {
    name: "index",
    components: { vPop },
    data() {
      return {
        show: false,
        serve: 12,
        balance: 0
      }
    },
    methods: {
      getBalance (){
        this.$http.get('/member/payment/wallet').then(res => {
          if(res.data.code === 200){
            this.balance = +res.data.data.balance
          }
        })
      },
      open (num){
        this.getBalance()
        if(this.$cookies.get('abztoken')){
          this.serve = num
          this.show = true
        }else{
          this.$router.push({path: '/Login'})
        }
      },
      close (){
        this.show = false
        this.getBalance()
      }
    },
    created (){
    }
  }
</script>

<style scoped lang="less">
  .app{
    .main{
      width: 100%;
      position: relative;
      padding-top: 302px;
      .v-header{
        width: 100%;
        height: 356px;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 0;
        overflow: hidden;
        .bg{
          width: 1920px;
          height: 100%;
          clip-path: polygon(0 0, 100% 0, 100% 44.66%, 50% 100%, 0 44.66%);
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .mask{
          width: 1920px;
          height: 100%;
          background-color: #000;
          opacity: 0.5;
          clip-path: polygon(0 0, 100% 0, 100% 44.66%, 50% 100%, 0 44.66%);
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .txt{
          width: 37.967%;
          position: absolute;
          top: 69px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
      }
      .container{
        width: 100%;
        height: 1045px;
        background: url("//resource.aibanzhuan.cn/vip/vip_bg.png") no-repeat top center / 1896px;
        padding-top: 164px;
        box-sizing: border-box;
        .card-wapper{
          width: 1200px;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          .card{
            width: 500px;
            background-color: #d4ad7f;
            padding-bottom: 22px;
           .c-top{
             width: 500px;
             height: 200px;
             &.v1{
               background: url("//resource.aibanzhuan.cn/vip/vip1.png") no-repeat center / 100%;
             }
             &.v2{
               background: url("//resource.aibanzhuan.cn/vip/vip2.png") no-repeat center / 100%;
             }
             .txt{
               width: 100%;
               height: 100%;
               line-height: 200px;
               background-color: rgba(0,0,0,0.5);
               h3{
                 font-family: HYQiHei-FZS;
                 font-size: 40px;
                 letter-spacing: 4px;
                 color: #ffffff;
                 padding: 40px 0 29px;
                 text-align: center;
               }
               .line{
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 p{
                   font-family: HYQiHei-FZS;
                   font-size: 18px;
                   line-height: 50px;
                   letter-spacing: 2px;
                   color: #ffffff;
                   &:first-of-type{
                     margin-right: 25px;
                     text-decoration: line-through;
                   }
                   span{
                     font-size: 26px;
                     letter-spacing: 3px;
                   }
                 }
               }
             }
           }
            .content{
              font-family: HYQiHei-FZS;
              font-size: 22px;
              line-height: 50px;
              color: #ffffff;
              padding: 25px 37px 57px 20px;
              white-space: pre-line;
            }
            .btn{
              width: 280px;
              height: 72px;
              line-height: 72px;
              border-radius: 20px;
              background: url("../../assets/vip_btn.png") no-repeat center / 100%;
              text-align: center;
              font-family: HYQiHei-FZS;
              font-size: 26px;
              letter-spacing: 3px;
              color: #ffffff;
              margin: 0 auto;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
