<template>
  <span class="count-down">{{end_time}}</span>
</template>

<script>
  export default {
    name: "countDown",
    props: ['et'],
    data() {
      return {
        end_time: '',
        timer: null
      }
    },
    methods: {
      countTime (){
        let endTime = new Date(this.et).getTime()
        let nt = new Date()

        if(endTime - nt > 0){
          this.timer = setInterval(() => {
            let nowTime = new Date().getTime()
            let ct = endTime - nowTime
            //计算出相差天数
            var days=Math.floor(ct/(24*3600*1000))
            //计算出小时数
            var leave1=ct%(24*3600*1000)    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))
            //计算相差分钟数
            var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
            var mins=Math.floor(leave2/(60*1000))
            //计算相差秒数
            var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            var sec=Math.round(leave3/1000)
            console.log( days,hours, mins, sec)
            if(days === 0 && hours === 0 &&  mins === 0 && sec === 0){
                setTimeout(() => {
                clearInterval(this.timer)
                this.end_time = '已结束'
              },1000)
            }else{
              this.end_time = `${days > 0 ? `${days}天` : ''}${hours < 10 ? `0${hours}` : hours}小时${mins < 10 ? `0${mins}` : mins}分${sec < 10 ? `0${sec}` : sec}秒`
            }
          },1000)
        }else{
          this.end_time = '已结束'
        }
      }
    },
    created (){
      this.countTime()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="less">

</style>