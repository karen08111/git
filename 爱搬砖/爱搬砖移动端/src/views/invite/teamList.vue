<template>
  <div class="app">
    <div class="title">
      <i @click="$router.go(-1)"></i>
      <p>工友成员<span>（{{team.length}}）</span></p>
    </div>
    <inList :list="team" color="#000"></inList>
  </div>
</template>

<script>
  import inList from './components/inList'

  export default {
    name: "teamList",
    components: {inList},
    data() {
      return {
        team: []
      }
    },
    computed: {
      url() {
        if(this.$route.params.role === 'inviter'){
          return '/member/invitationPeopleList'
        }else{
          return `/member/beInvited/invitationPeopleList?code=${this.$store.state.inter_code}`
        }
      }
    },
    methods: {
      req (){
        this.$http.get(this.url).then(res => {
          if(res.code == 200){
            this.team = res.data
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
    background-color: #fff;
    overflow: hidden;
    .title{
      width: 7.5rem;
      height: 0.44rem;
      background-color: #ea5a71;
      margin: 0.4rem 0 0.65rem;
      display: flex;
      align-items: center;
      i{
        display: block;
        width: 0.2rem;
        height: 0.34rem;
        background: url("../../assets/invite/back.png") no-repeat center center / 100%;
        margin-left: 0.19rem;
        margin-right: 0.38rem;
      }
      p{
        font-family: PingFang-SC-Medium;
        font-size: 0.25rem;
        letter-spacing: 0.05rem;
        color: #ffffff;
        span{
          font-size: 0.2rem;
          letter-spacing: 0.04rem;
          color: #ffffff;
        }
      }
    }
    .nothing{
      color: #000;
    }
  }
</style>