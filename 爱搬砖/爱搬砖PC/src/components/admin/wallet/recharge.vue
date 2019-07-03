<template>
  <div>
    <div class="app">
      <adminHeader>充 值</adminHeader>
      <div class="main recharge">
        <div class="item">
          <div class="label">充值金额：</div>
          <div class="inp"><el-input v-model="money" size="small" placeholder=""></el-input></div>
          <span>元</span>
        </div>
        <div class="item">
          <div class="label">充值方式：</div>
          <div class="inp2">
            <el-radio-group v-model="checked">
              <el-radio-button :label="1">微 信</el-radio-button>
              <!--            <el-radio-button label="2">支付宝</el-radio-button>-->
            </el-radio-group>
          </div>
        </div>
        <div class="nextBtn one" @click="next">下一步</div>
      </div>
    </div>
    <div class="kjImg-wapper" v-show="kjImgShow" @click.self="closeKj">
      <p>请使用微信扫一扫功能扫描下方二维码来支付并开通会员</p>
      <img :src="kjImg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "recharge",
    data() {
      return {
        money: '',
        checked: 1,
        kjID: '',
        kjImg: '',
        kjImgShow: false,
        kjCount: 0,
        timer: null
      }
    },
    methods: {
      next (){
        // this.$router.push({path: '/rechargeSuccess'})

        if (this.money > 100000) {
          this.$message({
            message: '充值金额不能超过10万',
            type: 'warning'
          })
        } else {
          this.$http.post('/member/account/wallet/recharge',{mount: this.money}).then(res => {
            if(res.data.code === 200){
              const data = res.data.data
              this.kjID = data.id
              this.kjImg = data.qrcode
              this.kjImgShow = true
              this.timer = setInterval(this.getKjInfo,2000)
            }
          })
        }
      },
      getKjInfo (){
        this.kjCount++
        if(this.kjCount === 60){
          this.kjCount = 0
          clearInterval(this.timer)
          this.$message.error('请求超时，请重新购买！')
          this.kjImgShow = false
          return
        }
        this.$http.get(`/member/payment/vip_buy_status/${this.kjID}`).then(res => {
          if(res.data.msg === 'success'){
            this.kjImgShow = false
            this.$message({
              message: '充值成功！',
              type: 'success'
            })
            this.$emit('close')
            clearInterval(this.timer)
            this.$router.push({path: '/wallet_balance'})
          }
        })
      },
      closeKj (){
        clearInterval(this.timer)
        this.kjImgShow = false
        this.kjCount = 0
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    .main{
      width: 960px;
      height: 599px;
      background-color: #ffffff;
      padding: 13px 21px;
      box-sizing: border-box;
      .item{
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .label{
          width: 90px;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 1px;
          color: #333333;
        }
        .inp{
          width: 160px;
        }
        span{
          font-size: 16px;
          color: #cccccc;
          margin-left: 10px;
        }
      }
      .nextBtn{
        width: 260px;
        height: 50px;
        line-height: 50px;
        background-color: #3388ff;
        border-radius: 10px;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        margin-top: 247px;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
      }
    }
  }
  .kjImg-wapper{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    p{
      margin-bottom: 20px;
      color: #fff;
    }
  }
</style>

<style lang="less">
  .recharge{
    .el-radio-button{
      margin-right: 30px;
    }
    .el-radio-button__inner{
      padding: 11px 62px;
      border-radius: 4px !important;
      border: solid 1px #cecece;
    }
  }
</style>
