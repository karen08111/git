<template>
  <div class="comSwiper">
    <el-carousel :interval="3000" :height="hei" arrow="always">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img :src="item" alt="" :onerror="$store.state.defaultImg">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'comSwiper',
  props: {
    list: Array,
    hei: {
      type: String,
      default: '370px'
    }
  }
}
</script>

<style lang="less">
  .comSwiper{
    width: 1200px;
    text-align: center;
    .el-carousel__indicator{
      padding: 20px 5px;
      .el-carousel__button{
        width: 8px;
        height: 8px;
        background-color: #cccccc;
        border-radius: 50%;
      }
      &.is-active .el-carousel__button{
        background-color: #3388ff;
      }
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .el-carousel__arrow{
      width: 60px;
      height: 130px;
      background-color: transparent;
      border-radius: 0;
      opacity: 0.24;

    }
    .el-carousel__arrow:hover{
      background-color: #3388ff;
      i{
        color: #f9f9fd;
      }
    }
    .el-carousel__arrow i{
      font-size: 40px !important;
      color: #797878;
    }
  }
</style>
