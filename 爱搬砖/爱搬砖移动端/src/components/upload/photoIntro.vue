<template>
  <div>
    <div class="filelist">
      <span v-for="(item,index) in fileList"><img :src="baseURL + item" :key="index" alt=""><van-icon name="clear" @click="delImg(index)"/></span>
    </div>
    <upload :id="tagID" url="/member/upload/photos" @upSuccess="upSuccess"></upload>
  </div>
</template>

<script>
  import upload from './upload'
  import { baseURL } from '@/axios'
  export default {
    name: "photoIntro",
    data() {
      return {
        baseURL: baseURL,
        fileList: []
      }
    },
    watch: {
      fileList (val){
        if(val.length === this.max){
          document.getElementById(this.tagID).style.display = 'none'
        }else{
          document.getElementById(this.tagID).style.display = 'inline-block'
        }
      }
    },
    methods: {
      upSuccess (val){
        this.fileList.push(val)
      },
      delImg (index){
        this.fileList.splice(index,1)
      }
    },
    props: {
      tagID: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      str: {
        type: String,
        default: 'path'
      },
      max: {
        type: Number,
        default: 1
      }
    },
    components: {upload}
  }
</script>

<style scoped lang="less">
  .filelist{
    display: inline-block;
    span{
      display: inline-block;
      height: 1.5rem;
      position: relative;
      margin-right: 0.15rem;
      img{
        width: 1.5rem;
        height: 1.5rem;
      }
      .van-icon{
        font-size: 0.3rem;
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
      }
    }
  }
</style>