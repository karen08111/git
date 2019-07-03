<template>
  <ul class="list">
    <li v-for="item in list">
      <router-link :to="`/details?type=${type}&id=${item.id}`">
        <img v-if="item.avatar" :src="baseURL + item.avatar" alt="">
        <img v-else src="../../assets/none.png" alt="">
        <h3>{{item.title}}</h3>
        <div class="comname">{{item.name}}</div>
        <!--<div class="tap">{{item.project_type_name || item.project_type}}</div>-->
        <!--<div class="time"><i class="iconfont icon-shijian"></i>{{item.create_time || item.update_time}}</div>-->
      </router-link>
    </li>
  </ul>
</template>

<script>
  import { baseURL } from '@/axios'
  export default {
    name: "proList",
    data (){
      return {
        baseURL: baseURL
      }
    },
    props: ['list','type']
  }
</script>

<style scoped lang="less">
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      /*width: 3.40rem;*/
     width: 49%;
      height: 4.95rem;
      background-color: #f5f6f8;
      border-radius: 0.10rem;
      opacity: 0.8;
      margin-bottom: 0.2rem;
      padding: 0.1rem;
      box-sizing: border-box;
      a{
        display: block;
        img{
          width: 100%;
          height: 2.80rem;
          object-fit: cover;
          border-radius: 0.10rem;
        }
        h3{
          width: 94%;
          height: 0.7rem;
          line-height: 0.7rem;
          font-size: 0.30rem;
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
        }
        .comname{
          font-size: 0.22rem;
          line-height: 1;
          color: #b3b3b3;
          margin-bottom: 0.2rem;
        }
        .tap{
          display: inline-block;
          height: 0.30rem;
          line-height: 0.28rem;
          background-color: #ffffff;
          border-radius: 0.15rem;
          border: solid 1PX #3388ff;
          padding: 0 0.15rem;
          font-size: 0.18rem;
          letter-spacing: 0.01rem;
          color: #3388ff;
          box-sizing: border-box;
          margin-bottom: 0.24rem;
        }
        .time{
          font-family: PingFangSC-Regular,MicrosoftYaHei;
          font-size: 0.20rem;
          line-height: 1;
          color: #b3b3b3;
          i{
            font-size: 0.20rem !important;
          }
        }
      }
    }
  }
</style>