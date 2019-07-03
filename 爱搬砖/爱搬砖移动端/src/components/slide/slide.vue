<template>
  <div>
    <van-swipe :autoplay="3000" :height="height">
      <van-swipe-item v-for="(item,index) in imgs" :key="index"><a :href="item.link ? item.link : '###'"><img :src="item.path" alt=""></a></van-swipe-item>
      <slot></slot>
    </van-swipe>
  </div>
</template>

<script>
  import { baseURL } from '@/axios'
  export default {
    name: "slide",
    data() {
      return {
        baseURL: baseURL
      }
    },
    methods: {
      searchSome (e){
        if(e.keyCode == 13){
          alert(this.searchVal)
        }
      },
      searchClick (){
        alert(this.searchVal)
      }
    },
    props: ['imgs','height']
  }
</script>

<style scoped lang="less">
  .van-swipe{
    width: 100%;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>