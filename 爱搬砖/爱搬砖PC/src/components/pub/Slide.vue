<template>
  <div class="slide">
    <el-carousel trigger="click" :height="height">
      <el-carousel-item v-for="(item,index) in cslides" :key="index">
        <a :href="item.link" target="_blank"><img :src="item.path" :onerror="$store.state.defaultImg"></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  data () {
    return {}
  },
  props: ['slides', 'height'],
  computed: {
    cslides () {
      this.slides.forEach(value => {
        if (!(/^(https?|\/\/)/i.test(value.path))) { value.path = this.$store.state.site + value.path }
      })
      return this.slides
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .slide {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>

<style lang="less">
  .slide{
    .el-carousel__indicator{
      .el-carousel__button{
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #ffffff;
        opacity: 1;
      }
      &.is-active{
        .el-carousel__button{
          width: 40px;
        }
      }
    }
    .el-carousel__arrow{
      i{
        font-size: 22px !important;
      }
      &:hover{
        i{
          color: #3686f4;
        }
      }
    }
    .el-carousel__arrow{
      background-color: rgba(0,0,0,0.3);
    }
    .el-carousel__arrow--left{
      left: 388px;
    }
    .el-carousel__arrow--right{
      right: 412px;
    }
  }
</style>
