<template>
  <ul>
    <li v-for="item in clist">
      <h3>
        {{item.ach_name}}
        <span v-if="item.end_time === '至今'">{{item.start_time}}-{{item.end_time}}</span>
        <span v-else>{{item.start_time}}—{{item.end_time}}</span>
        <div class="icons">
          <i class="iconfont icon-bianji" @click="edit(item.id)"></i>
          <i class="iconfont icon-shanchu" @click="del(item.id)"></i>
        </div>
      </h3>
      <p>
        <span v-if="item.job_type.Sub">{{item.job_type.Sub.title}}</span>
        <span v-else>{{item.job_type.title}}</span>
        <span class="part">|</span>
        <span>{{item.region.map(value => value.title).join('')}}</span>
      </p>
      <div class="content">{{item.content}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'experience',
  props: ['list'],
  computed: {
    clist: {
      get () {
        return this.list
      },
      set (val) {
        this.$emit('update:list', val)
      }
    }
  },
  methods: {
    edit (id) {
      this.$emit('edit', id)
      this.clist = this.clist.filter(value => value.id != id)
    },
    del (id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`/member/jobcase/${id}/delete`).then(res => {
          if (res.data.code == 200) {
            this.$store.commit('success', res.data.msg)
            this.$emit('del')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  ul{
    li{
      padding: 10px 10px 10px 34px;
      &:not(:last-child){
        border-bottom: 1px dashed #cccccc;
        margin-bottom: 38px;
      }
      &:hover{
        background-color: #fafafb;
        .icons{
          i{
            display: block;
          }
        }
      }
      h3{
        letter-spacing: 1px;
        color: #333333;
        display: flex;
        margin-bottom: 17px;
        span{
          font-size: 12px;
          letter-spacing: 1px;
          color: #999999;
          margin-left: 20px;
          margin-right: auto;
        }
        .icons{
          position: relative;
          i{
            display: none;
            cursor: pointer;
            position: absolute;
            right: 0;
            color: #3388ff;
            & + i{
              top: 22px;
            }
          }
        }

      }
      p{
        margin-bottom: 12px;
        span{
          letter-spacing: 1px;
          color: #666666;
          &.part{
            margin-left: 20px;
            margin-right: 20px;
            font-size: 12px;
          }
        }
      }
      .content{
        white-space: pre-wrap;
        line-height: 24px;
        letter-spacing: 1px;
        color: #666666;
      }
    }
  }
</style>
