<template>
  <div class="att">
    <taHeader :titles="titles"></taHeader>
    <ul>
      <li v-for="item in info.list">
        <p>{{item.title}}</p>
        <p>{{item.com}}</p>
        <p>{{item.type}}</p>
        <p class="handle">
          <el-button type="primary" size="mini" plain @click="del(item.id)">取消关注</el-button>
        </p>
      </li>
      <li class="nothing" v-if="info.total === 0">暂无记录</li>
    </ul>
    <paging :total="info.total" :page="info.page" :size="info.size"></paging>
  </div>
</template>

<script>
import taHeader from './taHeader'
import paging from '@/components/need/components/paging'
export default {
  name: 'att_pro',
  components: { taHeader, paging },
  props: ['info'],
  data () {
    return {
      titles: ['采购标题', '采购企业', '采购类型', '操 作']
    }
  },
  methods: {
    del (id) {
    }
  }
}
</script>

<style scoped lang="less">
  .att{
    margin-top: 20px;
    ul{
      border: 1px solid #f1f1f1;
      border-top: none;
      li{
        display: flex;
        min-height: 71px;
        align-items: center;
        padding: 8px 0;
        box-sizing: border-box;
        cursor: pointer;
        &:not(:last-of-type){
          border-bottom: 1px dashed #e5e5e5;
        }
        &:hover{
          background-color: #fafafb;
        }
        p{
          flex: 1 1 220px;
          text-align: center;
          font-size: 11px;
          color: #666666;
          padding: 0 16px;
          &:first-of-type{
            text-align: left;
          }
          &.handle{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }
      .nothing{
        justify-content: center;
      }
    }
  }
</style>
