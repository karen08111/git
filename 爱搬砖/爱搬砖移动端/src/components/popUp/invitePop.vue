<template>
  <div class="invitePop" v-if="show">
    <router-link @click.native="hs" to="/invitation"><img src="http://resource.aibanzhuan.cn/ingenuity/first_open.png" alt=""></router-link>
    <i @click="hs"></i>
  </div>
</template>

<script>
  export default {
    name: "invitePop",
    data() {
      return {
        show: false
      }
    },
    computed: {

    },
    methods: {
      /*hs (){
        this.show = !this.show
        localStorage.setItem('firstOpenTime', new Date())
      },*/
      hs (){
        this.show = !this.show
        sessionStorage.setItem('firstOpenTime', true)
      }
    },
    /*created (){
      const fTime = localStorage.getItem('firstOpenTime')
      if(fTime){
        const nowDate = new Date().getTime()
        const prevDate = new Date(fTime).getTime()
        let hours = Math.floor((nowDate - prevDate)/(3600*1000))
        if(hours >= 24){
          this.show = true
        }
      }else{
        this.show = true
      }
    }*/
    created (){
      if(sessionStorage.getItem('firstOpenTime')){
        this.show = false
      }else{
        this.show = true
      }
    }
  }
</script>

<style scoped lang="less">
  .invitePop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 7.18rem;
      margin-bottom: 0.29rem;
    }
    i{
      display: block;
      width: 0.52rem;
      height: 0.52rem;
      background: url("../../assets/invite/close.png") no-repeat center / 100%;
    }
  }
</style>