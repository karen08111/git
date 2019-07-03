<template>
  <ul>
    <li v-for="item in clist" v-if="isEdit">
      <img v-if="item.img_path" :src="$store.state.site + item.img_path" alt="" :onerror="$store.state.defaultImg">
      <p>
        <el-checkbox-group v-model="checked" class="ap_group"><el-checkbox :label="item.id" v-if="isEdit" @change="change($event,item.id)" style="margin-right: 9px;"></el-checkbox></el-checkbox-group>{{item.seniority_name}}<span>{{item.level}}</span>
      </p>
    </li>
    <li v-for="item in showList" v-if="!isEdit">
      <img v-if="item.img_path" :src="$store.state.site + item.img_path" alt="" :onerror="$store.state.defaultImg">
      <p>{{item.seniority_name}}<span>{{item.level}}</span></p>
    </li>
    <li class="empty"></li>
  </ul>
</template>

<script>
export default {
  name: 'Aptitude',
  props: {
    list: Array,
    isEdit: {
      type: Boolean,
      default: false
    },
    checkList: {
      type: Array,
      default: _ => []
    }
  },
  computed: {
    checked: {
      get () {
        return this.checkList
      },
      set (val) {
        this.$emit('update:checkList', val)
      }
    },
    clist () {
      let arr = this.list
      for (let i of arr) {
        if (i.status == 0) i['mask'] = '审核中'
        else if (i.status == 2) i['mask'] = '审核未通过'

        if (i.credential_level_type.id == 1) i['level'] = '特级'
        else if (i.credential_level_type.id == 2) i['level'] = '一级'
        else if (i.credential_level_type.id == 3) i['level'] = '二级'
        else i['level'] = '三级'

        if (i.isuse) i.is_show = true
        else i.is_show = false
      }
      return arr
    },
    showList () {
      return this.clist.filter(value => value.isuse)
    }
  },
  methods: {
    change (val, id) {
      /* let url = ''
        if(val) url = 'setShow'
        else url = 'setHide'
        this.$http.get(`/member/seniority/${id}/${url}`).then(res => {
          if(res.data.code == 200){
            this.$store.commit('success','操作成功')
          }
        }) */
    }
  }
}
</script>

<style scoped lang="less">
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 290px;
      font-size: 0;
      &.empty{
        height: 0 !important;
      }
      img{
        width: 290px;
        height: 170px;
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

<style lang="less">
  .ap_group{
    display: inline;
    .el-checkbox__label{
      display: none;
    }
  }
</style>
