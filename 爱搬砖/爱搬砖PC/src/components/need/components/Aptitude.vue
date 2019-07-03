<template>
  <ul>
    <li v-for="item in clist">
      <img v-if="item.img_path" :src="$store.state.site + item.img_path" alt="" :onerror="$store.state.defaultImg">
      <p>{{item.seniority_name}}<span>{{item.level}}</span></p>
    </li>
    <li class="empty"></li>
  </ul>
</template>

<script>
export default {
  name: 'Aptitude',
  props: ['list'],
  computed: {
    clist () {
      let arr = this.list
      for (let i of arr) {
        if (i.status == 0) i['mask'] = '审核中'
        else if (i.status == 2) i['mask'] = '审核未通过'

        if (i.credential_level_type.id == 1) i['level'] = '特级'
        else if (i.credential_level_type.id == 2) i['level'] = '一级'
        else if (i.credential_level_type.id == 3) i['level'] = '二级'
        else i['level'] = '三级'

        if (i.is_show) i.is_show = true
        else i.is_show = false
      }
      return arr
    }
  }
}
</script>

<style scoped lang="less">
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid #eaeeed;
    padding: 0 20px;
    li{
      width: 296px;
      height: 264px;
      &.empty{
        height: 0 !important;
      }
      img{
        width: 296px;
        height: 200px;
        object-fit: cover;
      }
      p{
        text-align: center;
        font-size: 24px;
        line-height: 1.3;
        letter-spacing: 2px;
        color: #333333;
        padding: 14px 0;
        span{
          line-height: 12px;
          padding: 0 10px;
          font-size: 10px;
          letter-spacing: 1px;
          color: #f89999;
          border-radius: 4px;
          border: solid 1px #cccccc;
          margin-left: 10px;
        }
      }
    }
  }
</style>
