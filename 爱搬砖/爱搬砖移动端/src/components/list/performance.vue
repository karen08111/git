<template>
  <ul class="list">
    <li v-for="item in list">
      <h3>{{item.ach_name}}</h3>
      <div class="label">
        <span>{{item.job_type}}</span>
        <span>{{item.region[1].title}}</span>
        <span>{{item.start_time}}</span>
      </div>
      <div class="imgs">
        <img v-for="img in item.imgs" :src="baseURL + img.path" alt="">
      </div>
    </li>
  </ul>
</template>

<script>
  import { baseURL } from '@/axios'
  export default {
    name: "performance",
    data() {
      return {
        baseURL: baseURL
      }
    },
    props: ['list']
  }
</script>

<style scoped lang="less">
  .list{
    li{
      width: 6.9rem;
      height: 3.09rem;
      background-color: #f2f2f2;
      padding: 0 0.2rem;
      box-sizing: border-box;
      margin-bottom: 0.1rem;
      h3{
        height: .7rem;
        line-height: .7rem;
        font-family: PingFangSC-Regular,MicrosoftYaHei;
        font-size: 0.32rem;
        letter-spacing: 0.03rem;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
      }
      .label{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        span{
          display: inline-block;
          height: 0.40rem;
          line-height: 0.40rem;
          background-color: #ffffff;
          border-radius: 0.06rem;
          padding: 0 0.19rem;
        }
      }
      .imgs{
        font-size: 0;
        img{
          width: 2.10rem;
          height: 1.60rem;
          object-fit: cover;
          background-color: #ffffff;
          border-radius: 0.10rem;
          margin-right: 0.1rem;
          &:last-of-type{
            margin-right: 0;
          }
        }
      }
    }
  }
</style>