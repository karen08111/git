<template>
  <el-select v-model="val" placeholder="请选择" :disabled="disabled">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.corpName"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'corpSelect',
  props: ['value', 'disabled'],
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
    this.$http.get(`/member/public/searchBCorpLists`, { params: { prjID: localStorage.getItem('proId') } }).then(res => {
      if (res.data.code === 200) {
        this.options = res.data.data
      }
    })
  }
}
</script>

<style scoped lang="less">

</style>
