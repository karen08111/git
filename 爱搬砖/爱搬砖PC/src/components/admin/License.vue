<template>
  <div class="container">
    <ul>
      <li v-for="item in clist">
        <div class="image"><img :src="$store.state.site + item.img_path" :onerror="$store.state.defaultImg" alt=""><div class="mask" v-if="item.status != 1">{{item.mask}}</div><div class="del" @click="del(item.id)">删除</div></div>
        <div class="txt">{{item.seniority_name}}<span>{{item.level}}</span></div>
      </li>
      <li class="empty"></li>
    </ul>
    <router-link to="/Add_license" class="btn"><el-button><i class="iconfont icon-bianji"></i>添加资质证书</el-button></router-link>
  </div>
</template>

<script>
export default {
  name: 'License',
  data () {
    return {
      list: []
    }
  },
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
      }
      return arr
    }
  },
  methods: {
    del (id) {
      this.$confirm('此操作将永久删除该证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`/member/seniority/${id}/cutOut`).then(res => {
          if (res.data.code == 200) {
            this.$store.commit('success', res.data.data)
            this.request()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    request () {
      this.$http.get('/member/seniority').then(res => {
        if (res.data.code == 200) {
          this.list = res.data.data
        }
      })
    }
  },
  created () {
    this.request()
  }
}
</script>

<style scoped lang="less">
  .container{
    padding: 40px;
    width: 963px !important;
    min-height: 546px;
    background-color: #ffffff;
    box-sizing: border-box;
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        width: 290px;
        font-size: 0;
        cursor: pointer;
        &.empty{
          height: 0 !important;
        }
        .image{
          width: 290px;
          height: 170px;
          position: relative;
          font-size: 16px;
          letter-spacing: 2px;
          color: #333333;
          img{
            width: 290px;
            height: 170px;
            object-fit: cover;
          }
          .mask{
            width: 100%;
            height: 100%;
            line-height: 170px;
            text-align: center;
            background-color: #ffffff;
            opacity: 0.7;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
          }
          .del{
            width: 100%;
            height: 100%;
            line-height: 170px;
            text-align: center;
            background-color: #ffffff;
            opacity: 0.7;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
          }
        }
        &:hover{
          .mask{
            display: none;
          }
          .del{
            display: block;
          }
        }
        .txt{
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
    .btn{
      display: block;
      margin-top: 120px;
      text-align: center;
      i{
        margin-right: 10px;
      }
      button{
        letter-spacing: 1px;
        color: #666666;
      }
    }
  }
</style>
