<template>
  <div>
    <router-link class="news" v-for="(item,index) in list" v-if="index<2" :to="`/news_details/${item.id}`">
      <div v-if="!index%2" class="imgs">
        <img :src="baseURL + item.img_path" alt="">
      </div>
      <div class="content">
        <p class="title">{{item.title}}</p>
        <p class="intr">{{item.abstract}}</p>
      </div>
      <div v-if="index%2" class="imgs">
        <img :src="baseURL + item.img_path" alt="">
      </div>
    </router-link>
  </div>
</template>

<script>
  import {baseURL} from '@/axios'
	export default{
    name: 'newsProject',
    data (){
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

<style scoped lang="postcss">
	.news{
		height: 2rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;
	}
	.imgs{
		width:50%;
		height: 100%;
		
	}
	.imgs img{
		width: 100%;
		height: 100%;
    object-fit: cover;
	}
	.content{
		width: 50%;
		height: 100%;
		padding: 0.08rem;
		box-sizing: border-box;
	}
	.title{
		font-size: 0.3rem;
		letter-spacing: 0.02rem;
		color: #333;
		line-height: 0.4rem;
		font-weight: 500;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.intr{
		font-size: 0.2rem;
		letter-spacing: 0.02rem;
		overflow: hidden;
	    text-overflow:ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 3;
	  -webkit-box-orient: vertical;
	  margin-top: 0.1rem;
    line-height: 0.28rem;
    color: #999999;
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
</style>