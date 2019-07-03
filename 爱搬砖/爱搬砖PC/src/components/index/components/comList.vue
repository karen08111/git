<template>
  <ul class="comList">
    <li v-for="item in list" :title="item.name">
      <router-link :to="`/ComResume/${item.uid}`">
        <div class="top">
          <img :src="$store.state.site+item.avatar" onerror="this.src='http://resource.aibanzhuan.cn/material/company.jpg'" alt="">
          <p>{{item.name}}</p>
        </div>
        <!--<div class="bot" v-if="item.content">{{item.content.length > 120 ? item.content.slice(0,120)+'...' : item.content}}</div>-->
        <div class="bot" v-if="item.content">{{item.content | maxLength}}</div>
        <div class="bot" v-else>暂无介绍</div>
      </router-link>
    </li>
    <li class="empty"></li>
    <li class="empty"></li>
  </ul>
</template>

<script>
export default {
  name: 'comList',
  props: ['list'],
  filters: {
    maxLength (val) {
      var len = val.length
      var reLen = 0
      for (var i = 0; i < len; i++) {
        if (val.charCodeAt(i) < 27 || val.charCodeAt(i) > 126) {
          // 全角
          reLen += 2
        } else {
          reLen++
        }
      }
      return reLen > 140 && val.slice(0, 105) + '...' || val
    }
  }
}
</script>

<style scoped lang="less">
  .comList{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 294px;
      height: 337px;
      background-color: #ffffff;
      margin-bottom: 10px;
      transition: all .4s;
      &.empty{
        height: 0 !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      &:hover{
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .top{
          width: 100%;
          height: 175px;
          border-bottom: 1px dashed #cccccc;
          overflow: hidden;
          img{
            display: block;
            width: 80px;
            height: 80px;
            border-radius: 4px;
            object-fit: cover;
            margin: 30px auto 20px;
          }
          p{
            font-size: 16px;
            letter-spacing: 1px;
            color: #333333;
            text-align: center;
            &:hover{
              color: #3388ff;
            }
          }
        }
        .bot{
          font-size: 12px;
          line-height: 24px;
          color: #333333;
          letter-spacing: 0.7px;
          padding-top: 5px;
        }
      }
    }
  }
</style>
