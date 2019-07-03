<template>
  <div class="infoList">
    <h3>{{title}}</h3>
    <ul>
      <li v-for="item in list" :key="item.id">
        <router-link :to="`/newsDetails/${item.id}`">
          <p class="title">{{item.title}}</p>
          <p class="time">{{item.time}}</p>
        </router-link>
      </li>
    </ul>
    <router-link class="more" :to="{ name: 'newsList', params: { index: index } }"><el-button size="mini">更多</el-button></router-link>
  </div>
</template>

<script>
export default {
  name: 'infoList',
  props: {
    title: String,
    list: {
      type: Array,
      default: _ => []
    },
    index: Number
  }
}
</script>

<style scoped lang="less">
  .infoList{
    width: 48%;
    border: 1px solid #7d7d7f;
    padding: 20px;
    box-sizing: border-box;
    h3{
      font-size: 20px;
      font-weight: bold;
      line-height: 40px;
      border-bottom: 2px solid #7d7d7f;
    }
    ul{
      height: 205px;
      overflow: hidden;
      margin-bottom: 20px;
      li{
        a{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          border-bottom: 1px solid #7d7d7f;
          color: #0f0f0f;
          .title{
            max-width: 70%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .more{
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
