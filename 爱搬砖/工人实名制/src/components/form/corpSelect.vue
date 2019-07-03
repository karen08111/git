<template>
<div>
  <el-form-item
              :label="labelName || '参建单位'"
              placeholder="点击选择"
            >
              <el-select
                placeholder="请选择参建单位"
                @change="corpSelectChange"
                v-model="value"
              >
                <el-option
                  v-for='item in corpArr'
                  :key='item.id'
                  :label="item.corpName"
                  :value='item.id'
                ></el-option>
              </el-select>
            </el-form-item>
</div>
</template>

<script>
/*
三级面包屑，需要传两个路由和label
*/
export default {
  name: 'corpSelect',
  data () {
    return {
      corpArr: [],
      value: ''
    }
  },
  props: {
    labelName: {
      type: String,
      defalut: '参建单位'
    }
  },
  methods: {
    corpSelectChange (value) {
      this.$emit('sendValue', value)
    }
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    // 获取参建单位列表
    this.$http.get('/member/buildCorp/addContractLists/' + this.proId).then(res => {
      this.corpArr = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
</style>
