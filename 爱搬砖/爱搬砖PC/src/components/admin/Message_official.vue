<template>
  <div class="message">
    <div class="container">
      <div class="item" v-for="i in msgs">
        <h3>{{i.title}}<span>{{i.create_time}}</span></h3>
        <div class="content">{{i.content}}</div>
        <i class="iconfont icon-shanchu" @click="delMsg(i.id)"></i>
        <div class="status" v-if="i.is_read == 0">未读</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message_official',
  data () {
    return {
      msgs: []
    }
  },
  methods: {
    request () {
      this.$http.get(this.$store.state.site + '/member/notice').then(res => {
        if (res.data.code == 200) {
          this.msgs = res.data.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    delMsg (id) {
      this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$store.state.site + '/member/rmnotice/' + id).then(res => {
          if (res.data.code == 200) {
            this.$store.commit('success', res.data.msg)
            this.request()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.request()
  }
}
</script>

<style scoped lang="less">
  .message{
    h1{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgba(255,255,255,0.5);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #000003;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .container{
      min-height: 546px;
      overflow-y: auto;
      background-color: #fff;
      .item{
        padding: 24px 16px;
        background-color: rgba(255,255,255,0.5);
        margin-bottom: 10px;
        border-radius: 4px;
        line-height: 24px;
        box-shadow: 0 2px 4px 0 rgba(121,146,185,.54);
        position: relative;
        h3{
          color: #333;
          font-weight: 700;
          span{
            color: #999;
            font-size: 12px;
            line-height: 22px;
            margin: 0 10px;
            font-weight: 400;
          }
        }
        .content{
          line-height: 24px;
          white-space: pre-wrap;
        }
        i{
          position: absolute;
          top: 10px;
          right: 10px;
          color: red;
          font-size: 16px !important;
          cursor: pointer;
        }
        .status{
          position: absolute;
          top: 15px;
          right: 40px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
</style>
