<template>
  <div class="att">
    <ul>
      <li v-for="item in info.list">
        <router-link :to="`#/${item.id}`">
          <img :src="$store.state.site + item.avatar" alt="" class="logo" onerror="this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'">
          <div class="name">{{item.company_name}}</div>
          <div class="bot">
            <div class="item">
              <p>招标采购</p>
              <p>{{item.tenderingCount}}条</p>
            </div>
            <div class="item">
              <p>询价采购</p>
              <p>{{item.inquiryCount}}条</p>
            </div>
          </div>
        </router-link>
      </li>
      <li class="empty"></li>
    </ul>
    <div class="noting" v-if="info.total === 0">暂无记录</div>
    <paging :total="info.total" :page="info.page" :size="info.size"></paging>
  </div>
</template>

<script>
import paging from '@/components/need/components/paging'
export default {
  name: 'att_com',
  components: { paging },
  props: ['info'],
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .att{
    margin-top: 32px;
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin-bottom: 20px;
        &.empty{
          height: 0 !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        a{
          display: block;
          width: 280px;
          height: 292px;
          border: solid 1px #f1f1f1;
          text-align: center;
          padding: 0 25px;
          box-sizing: border-box;
          .logo{
            width: 70px;
            height: 70px;
            border: solid 1px #eeeeee;
            border-radius: 50%;
            object-fit: cover;
            margin: 20px 0 35px;
          }
          .name{
            font-size: 22px;
            letter-spacing: 1px;
            color: #34495e;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-bottom: 45px;
          }
          .bot{
            display: flex;
            .item{
              width: 50%;
              height: 69px;
              &:first-of-type{
                border-right: 1px solid #cccccc;
              }
              p{
                font-size: 16px;
                line-height: 36px;
                letter-spacing: 1px;
                color: #34495e;
              }
            }
          }
        }
      }
    }
    .noting{
      text-align: center;
      font-size: 16px;
    }
  }
</style>
