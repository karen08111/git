<template>
  <ul class="container" v-wechat-title="$route.meta.title='新闻资讯'">
    <li v-for="item in list">
      <h3>{{item.title}}</h3>
      <p>{{item.abstract.slice(0,40)}}...<router-link :to="`/news_details/${item.id}`">查看详情</router-link></p>
      <div class="image"><img :src="baseURL + item.img_path" alt=""></div>
    </li>
  </ul>
</template>

<script>
  import { baseURL } from '@/axios'
  export default {
    name: "center",
    data() {
      return {
        baseURL: baseURL,
        list: []
      }
    },
    created (){
      this.$http.get('/newsList').then(res => {
        this.list = res.data.data
      })
    }
  }
</script>

<style scoped lang="less">
  .container{
    padding: 0.4rem 0.3rem;
    li{
      width: 6.90rem;
      height: 5.03rem;
      background-color: #fafafd;
      box-shadow: 0rem 0.06rem 0.15rem 0rem
      rgba(123, 179, 255, 0.3);
      border-radius: 0.20rem;
      padding: 0.2rem;
      box-sizing: border-box;
      margin-bottom: 0.2rem;
      position: relative;
      h3{
        font-family: MicrosoftYaHei;
        font-size: 0.30rem;
        color: #4d4d4d;
        padding: 0.1rem 0;
        line-height: 1;
        /*white-space: nowrap;
        overflow: hidden;*/
      }
      p{
        font-family: AdobeHeitiStd-Regular,MicrosoftYaHei;
        font-size: 0.22rem;
        line-height: 0.34rem;
        color: #999999;
        margin-bottom: 0.28rem;
        a{
          font-family: AdobeHeitiStd-Regular,MicrosoftYaHei;
          font-size: 0.22rem;
          font-weight: normal;
          font-stretch: normal;
          color: #3388ff;
          margin-left: 0.24rem;
        }
      }
      .image{
        width: 6.5rem;
        height: 3.2rem;
        border-radius: 0.1rem;
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>