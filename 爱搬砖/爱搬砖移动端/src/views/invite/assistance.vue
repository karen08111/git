<template>
  <div class="app">
    <inHeader></inHeader>
    <inStep :invited="invited" :steps="steps"></inStep>
    <div class="info">{{name}}已邀请<span>{{invited}}</span>人，已领取<span>{{bonus}}</span>元红包</div>
    <div class="team">
      <h2><span>{{name}}的工友团</span></h2>
      <div class="success">已经成功邀请{{invited}}位工友</div>
      <inList :list="team"></inList>
      <router-link class="lookAll" to="/invitation/teamList/invitee">查看全部工友团</router-link>
      <inButton @click.native="BuildGroup">我也要组建工友团</inButton>
    </div>
    <inFooter></inFooter>
    <div class="first" v-show="imgShow" @click="imgShow = false">
      <div class="msg">
        <p>成功加入</p>
        <p>{{name}}的工友团</p>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
  import inStep from './components/inStep'
  import inButton from './components/inButton'
  import inList from './components/inList'

  export default {
    name: "assistance",
    components: {inStep, inButton, inList},
    data() {
      return {
        invited: 0,
        steps: [0,0,0],
        bonus: 0,
        team: [],
        imgShow: false
      }
    },
    computed: {
      name (){
        return this.$store.state.inter_name
      }
    },
    watch: {
      imgShow (val){
        this.stopPen(val)
      }
    },
    methods: {
      BuildGroup (){
        this.$router.push({name: 'invite'})
        setTimeout(_ => {location.reload()},50)
      },
      stopPen (val){
        let bd = document.querySelector('body')
        if(val){
          bd.style.height = '100%'
          bd.style.overflow = 'hidden'
        }else{
          bd.style.height = 'auto'
          bd.style.overflow = 'visible'
        }
      },
      req (){
        this.$http.get(`/member/beInvited/invitationInfo?code=${this.$store.state.inter_code}`).then(res => {
          if(res.code == 200){
            const data = res.data
            this.invited = data.userInfo.invitationCount
            this.bonus = data.userInfo.alreadyReceived
            this.team = data.list
            this.steps = data.UserInvitationMoneyStatusList.map(value => value.status)
          }
        })
      }
    },
    created (){
      this.req()
    },
    mounted() {
      if(this.$route.params.count){
        this.imgShow = true
        this.$router.push('/invitation/assistance')
      }
    }
  }
</script>

<style scoped lang="less">
  .app{
    .info{
      font-family: PingFang-SC-Medium;
      font-size: 0.25rem;
      letter-spacing: 0.01rem;
      color: #fefefe;
      padding-left: 0.36rem;
      margin-bottom: 0.66rem;
      span{
        color: #ffc62f;
      }
    }
    .team{
      margin-bottom: 0.75rem;
      h2{
        font-family: PingFang-SC-Bold;
        font-size: 0.34rem;
        letter-spacing: 0.03rem;
        color: #ffc62f;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          margin: 0 0.19rem;
        }
        &:before, &:after{
          content: '';
          display: block;
          height: 0.01rem;
          background-color: #fff;
          flex: 1 1 auto;
        }
      }
      .success{
        font-family: PingFang-SC-Bold;
        font-size: 0.25rem;
        letter-spacing: 0.03rem;
        color: #ffc62f;
        text-align: center;
        margin: 0.17rem 0 0.16rem;
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
    .first{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
      background-color: rgba(0,0,0,0.4);
      .msg{
        width: 6.8rem;
        height: 7.73rem;
        background: url("../../assets/invite/first_join.png") no-repeat center / 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        margin: auto;
        padding-top: 4rem;
        box-sizing: border-box;
        i{
          display: block;
          width: 0.52rem;
          height: 0.52rem;
          background: url("../../assets/invite/close.png") no-repeat center / 100%;
          position: absolute;
          top: 0.75rem;
          right: 0;
        }
        p{
          font-size: 0.72rem;
          font-weight: bold;
          line-height: 0.94rem;
          letter-spacing: 0.04rem;
          color: #ffffff;
          text-align: center;
          text-shadow: 0.04rem 0.06rem rgba(222, 78, 8, 0.61);
        }
      }
    }
  }
</style>