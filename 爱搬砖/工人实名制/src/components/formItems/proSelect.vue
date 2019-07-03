<template>
  <el-select v-model="val" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'proSelect', // 项目选择器
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {
    this.$http.get(`/member/project/notPageLists`).then(res => {
      if (res.data.code === 200) {
        this.options = res.data.data
      }
    })
  }
}
</script>

<style scoped lang="less">

</style>
