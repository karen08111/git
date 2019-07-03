<template>
  <div class="flexs">
    <router-link class="project" v-for="item in list" :to="item.uid?`/${type}/${item.uid}`:`/${type}/${item.follow_id}`">
    	<!--<router-link class="project" v-for="item in list" :to="item.uid?`/${type}/${item.uid}`:`/${type}/${item.follow_id}`">-->
      <div class="imgs">
        <img v-if="item.avatar" :src="baseURL + item.avatar" alt="">
        <img v-else src="../../assets/none.png" alt="">
      </div>
      <p class="title">{{item.name}}</p>
      <p class="content">{{item.content}}</p>
    </router-link>
  </div>
</template>

<script>
  import {baseURL} from '@/axios'
  export default {
    props: ['list','type'],
    data() {
      return {
        baseURL: baseURL
      }
    }
  }
</script>

<style scoped lang="postcss">

  .project {
    display: block;
    width: 3.4rem;
    height: 4.48rem;
    background-color: #f5f6f8;
    border-radius: 0.1rem;
    opacity: 0.8;
    padding: 0.1rem;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    background: #FFFFFF;
  }
	.flexs{
  	width: 7rem;
  	margin: auto;
  	display: flex;
  	flex-wrap: wrap;
  	padding-top: 0.2rem;
  	box-sizing: border-box;
  	justify-content: space-between;
  }
  .imgs {
    width: 100%;
    height: 2.8rem;
    margin: auto;
	
  }

  .imgs img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.1rem;
  }

  .title {
    font-size: 0.3rem;
    line-height: 0.7rem;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
    margin: auto;
    box-sizing: border-box;
  }

  .content {
    font-size: 0.2rem;
    line-height: 0.32rem;
    color: #999;
    width: 90%;
    margin: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  img {
    border: none;
  }
</style>