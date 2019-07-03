<template>
  <div class="app reDetails">
    <div class="main">
      <div class="mlf">
        <div class="header">
          <h3><span>{{title}}</span><el-button type="primary" @click="bid">立即投标</el-button></h3>
          <p>
            <span>发布者名称：{{name}}</span>
            <span>发布时间：{{time}}</span>
            <span>浏览人数：{{hits}}</span>
          </p>
        </div>
        <div class="content" v-html="content"></div>
        <div class="down">
          <p>相关附件</p>
          <a v-for="item in downs" :href="$store.state.site + item.path" :download="item.name">{{item.name}}</a>
        </div>
      </div>
      <div class="mrh">
        <div class="hot">
          <h4>热门招标</h4>
          <ul>
            <li v-for="item in hots">
              <router-link :to="`/recrDetails/${item.id}`">
                <h3>{{item.title}}</h3>
                <p>发布时间：{{item.update_time}}</p>
              </router-link>
            </li>
          </ul>
        </div>
        <adv2></adv2>
      </div>
    </div>
  </div>
</template>

<script>
import adv2 from '../components/adv2'

export default {
  name: 'recrDetails',
  components: { adv2 },
  data () {
    return {
      uid: '',
      title: '',
      name: '',
      time: '',
      hits: 0,
      content: '',
      downs: [],
      hots: []
    }
  },
  watch: {
    '$route' () {
      this.req()
    }
  },
  methods: {
    req () {
      this.$http.get(`/purchase/details/${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data.info
          this.hots = res.data.data.hotPurchase
          this.uid = data.uid
          this.title = data.title
          this.name = data.company_name
          this.time = data.update_time
          this.hits = data.hits
          this.content = data.content
          this.downs = data.enclosure
          document.title = this.title
        }
      })
    },
    bid () {
      this.$http.get(`/purchase/getMobile/${this.uid}`).then(res => {
        if (res.data.code === 200) {
          this.$alert(res.data.data, '请联系该号码', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  },
  created () {
    this.req()
  }
}
</script>

<style scoped lang="less">
  .app{
    background-color: #eef0f1;
    padding: 10px 0 20px;
    .main{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .mlf{
        width: 880px;
        background-color: #ffffff;
        padding: 0 20px 35px;
        box-sizing: border-box;
        .header{
          margin-bottom: 30px;
          h3{
            padding: 40px 0 20px;
            font-size: 30px;
            line-height: 36px;
            letter-spacing: 2px;
            color: #34495e;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          p{
            span{
              font-size: 12px;
              letter-spacing: 1px;
              color: #999999;
              margin-right: 38px;
            }
          }
        }
        .down{
          p,a{
            line-height: 24px;
            letter-spacing: 1px;
            color: #343434;
          }
          a{
            display: block;
          }
          a:hover{
            color: #3388ff;
          }
        }
      }
      .mrh{
        width: 300px;
        .hot{
          background-color: #ffffff;
          padding: 0 20px;
          margin-bottom: 20px;
          h4{
            font-size: 16px;
            letter-spacing: 1px;
            color: #34495e;
            padding: 21px 0 0;
            display: flex;
            align-items: center;
            &:before{
              content: '';
              display: block;
              width: 2px;
              height: 16px;
              background-color: #99c3ff;
              margin-right: 10px;
            }
          }
          ul{
            li{
              &:not(:last-of-type){
                border-bottom: 1px solid #eeeeee;
              }
              a{
                display: block;
                padding: 28px 0 30px;
                h3{
                  font-size: 16px;
                  line-height: 24px;
                  letter-spacing: 1px;
                  color: #34495e;
                }
                p{
                  font-size: 12px;
                  letter-spacing: 1px;
                  color: #999999;
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .reDetails{
    .content{
      margin-bottom: 55px;
      *{
        color: #666666;
      }
      p{
        font-size: 12px;
        line-height: 24px;
        letter-spacing: 1px;
      }
      h1,h2,h3,h4,h5,h6{
        font-size: 1.2em;
      }
    }
  }
</style>
