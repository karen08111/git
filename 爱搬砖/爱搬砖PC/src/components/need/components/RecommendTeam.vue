<template>
  <ul>
    <li v-for="item in list">
      <img :src="$store.state.site + item.avatar" :onerror="defImg || $store.state.defaultImg" alt="">
      <h3>{{item.title || item.name || item.team_name}}</h3>
      <p>
        <span v-if="item.work_type">{{item.work_type}}</span>
        <span v-if="item.project_type">{{item.project_type}}</span>
        <span v-if="item.nums || item.nums == 0">{{item.nums}}人</span>
      </p>
      <div class="content">
        {{item.content?item.content.length < 43 ? item.content : item.content.slice(0,43) + '...':''}}
        <router-link v-if="!item.follow_id" :to="`${path}/${item.id || item.uid}`">了解更多</router-link>
        <router-link v-if="item.follow_id" :to="`${path}/${item.follow_id}`">了解更多</router-link>
      </div>
    </li>
    <li class="empty"></li>
    <li class="empty"></li>
    <li class="empty"></li>
  </ul>
</template>

<script>
export default {
  name: 'Recommend',
  props: ['list', 'path', 'defImg'],
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 172px;
      height: 236px;
      text-align: center;
      padding: 22px 15px;
      &.empty{
        height: 0 !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 15px !important;
      }
      img{
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
      h3{
        line-height: 42px;
        letter-spacing: 1px;
        color: #34495e;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p{
        letter-spacing: 1px;
        color: #cccccc;
        margin-bottom: 26px;
      }
      .content{
        height: 72px;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 1px;
        color: #cccccc;
        text-align: left;
        position: relative;
        a{
          color: #333333;
          position: absolute;
          bottom: 0;
          right: 0;
         /*float:right; */
          &:hover{
            color: #3388ff;
          }
        }
      }
    }
  }
</style>
