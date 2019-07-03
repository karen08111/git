<template>
  <div class="pop-wapper" @click.self="$emit('close')">
    <div class="v-pop">
      <div class="p-top">
        <el-form ref="form" label-width="100px">
          <el-form-item label="开通服务：">
            <p class="pi"><el-radio v-model="cServe" :label="12">大砖会员699元/年</el-radio></p>
            <p><el-radio v-model="cServe" :label="1">小砖会员299元/月</el-radio></p>
          </el-form-item>
          <el-form-item label="服务介绍：">
            {{introduce}}免费查看网站信息
          </el-form-item>
          <el-form-item label="钱包余额：">
            {{balance}}
          </el-form-item>
          <template v-if="balance < fee">
            <el-form-item label="还需充值：">
              <div class="inTxt">
                <el-input v-model="price" :placeholder="needPay" readonly></el-input>
                <span>元</span>
              </div>
            </el-form-item>
            <el-form-item label="充值方式：">
              <p class="pi"><el-radio v-model="type" :label="1">微信</el-radio></p>
              <!--<p><el-radio v-model="type" :label="2">支付宝</el-radio></p>-->
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class="p-bot">
        <el-button type="primary" @click="kjin" v-if="balance < fee">确定充值</el-button>
        <el-button type="primary" @click="open" v-else>确定开通</el-button>
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
    name: "vPop",
    props: {
      serve: {
        type: Number,
        defalut: 12
      },
      balance: {
        type: Number,
        defalut: 0
      }
    },
    data() {
      return {
        type: 1,
        price: null,
        kjID: '',
        kjImg: '',
        kjImgShow: false,
        kjCount: 0,
        timer: null
      }
    },
    computed: {
      cServe: {
        get (){
          return this.serve
        },
        set (val){
          this.$emit('update:serve', val)
        }
      },
      fee (){
        return this.serve === 1 && 299 || 699
      },
      needPay (){
        return this.fee - this.balance
      },
      introduce (){
        if(this.serve === 12)
          return '一年'
        else
          return '一个月'
      }
    },
    methods: {
      open (){
        this.$http.get('/member/payment/vip_order',{ params: {month: this.cServe}}).then(res => {
          if(res.data.code === 200){
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$store.commit('setViper', 1)
            this.$emit('close')
            this.$store.commit('setVip', 1)
          }
        })
      },
      kjin (){
        this.$http.get('/member/payment/vip_buy',{ params: {month: this.cServe}}).then(res => {
          if(res.data.code === 200){
            const data = res.data.data
            this.kjID = data.id
            this.kjImg = data.qrcode
            this.kjImgShow = true
            this.timer = setInterval(this.getKjInfo,2000)
          }
        })
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
              message: '购买成功！',
              type: 'success'
            })
            this.$store.commit('setViper', 1)
            this.$store.commit('setVip', 1)
            this.$emit('close')
            clearInterval(this.timer)
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
  .pop-wapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-pop{
    width: 617px;
    background-color: #ffffff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-sizing: border-box;
    .p-top{
      padding: 52px 32px 38px;
      border: solid 1px #e5e5e5;
      .pi{
        margin: 13px 0 25px;
      }
      .inTxt{
        width: 207px;
        position: relative;
        span{
          display: inline-block;
          height: 100%;
          line-height: 40px;
          position: absolute;
          top: 0;
          right: 10px;
          font-size: 16px;
          color: #333333;
        }
      }
    }
    .p-bot{
      padding: 40px 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .kjImg-wapper{
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 999;
    p{
      margin-bottom: 20px;
      color: #fff;
    }
  }
</style>
