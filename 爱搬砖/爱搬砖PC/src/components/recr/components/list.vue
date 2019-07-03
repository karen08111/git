<template>
  <ul class="list">
    <li v-for="item in list">
      <div class="lf">
        <h3><router-link :to="`recrDetails/${item.id}`">{{item.title}}</router-link></h3>
        <p><img :src="$store.state.site + item.avatar" alt="" onerror="this.src = 'http://resource.aibanzhuan.cn/material/company.jpg'"><span>{{item.company_name}}</span></p>
      </div>
      <div class="rh">
        <div class="btn" @click="bid(item.uid)">立即投标</div>
        <p><span>浏览人数：{{item.hits}}</span><span>发布时间：{{item.update_time}}</span></p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'list',
  props: ['list'],
  methods: {
    bid (uid) {
      this.$http.get(`/purchase/getMobile/${uid}`).then(res => {
        if (res.data.code === 200) {
          this.$alert(res.data.data, '请联系该号码', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .list{
    width: 100%;
    li{
      width: 880px;
      height: 127px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      transition: all .4s;
      &:hover{
        box-shadow: 0px 4px 5px 1px rgba(187, 187, 187, 0.3);
      }
      &:not(:last-of-type){
        margin-bottom: 10px;
      }
      .lf{
        h3{
          font-size: 16px;
          letter-spacing: 1px;
          color: #34495e;
          margin-bottom: 20px;
        }
        p{
          letter-spacing: 1px;
          color: #999999;
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border: solid 1px #f1f1f1;
            border-radius: 50%;
            object-fit: scale-down;
            box-sizing: border-box;
            margin-right: 8px;
          }
        }
      }
      .rh{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        min-width: 281px;
        .btn{
          width: 122px;
          height: 38px;
          line-height: 38px;
          background-color: #0388ff;
          text-align: center;
          font-size: 18px;
          letter-spacing: 1px;
          color: #ffffff;
          margin-bottom: 37px;
          cursor: pointer;
        }
        p{
          span{
            font-size: 12px;
            letter-spacing: 1px;
            color: #999999;
            margin-left: 30px;
          }
        }
      }
    }
  }
</style>
