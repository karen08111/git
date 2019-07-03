<template>
  <div>
    <div class="nothing" :style="{color: color}" v-if="list.length == 0">暂无人员</div>
    <ul v-else>
      <li v-for="item in list"><img :src="item.avatar || ''" onerror="this.src = 'http://resource.aibanzhuan.cn/material/person.jpg'" alt=""><span>{{item.name}}</span></li>
      <li class="empty"></li>
      <li class="empty"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "inList",
    props: {
      list: Array,
      color: {
        type: String,
        default: '#eeeeee'
      }
    }
  }
</script>

<style scoped lang="less">
  ul{
    width: 6.85rem;
    margin: 0 auto 0.45rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 1.5rem;
      margin-bottom: 0.32rem;
      display: flex;
      align-items: center;
      &.empty{
        height: 0 !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      img{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 0.23rem;
      }
      span{
        display: inline-block;
        width: 0.78rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-family: PingFang-SC-Bold;
        font-size: 0.25rem;
        letter-spacing: 0.03rem;
        color: #ffc62f;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
  .nothing{
    width: 6.85rem;
    margin: 0.36rem auto 0.45rem;
    font-family: PingFang-SC-Bold;
    font-size: 0.3rem;
    letter-spacing: 0.03rem;
  }
</style>