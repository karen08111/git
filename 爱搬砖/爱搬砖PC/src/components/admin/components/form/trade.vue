<template>
  <el-form-item label="所属行业：">
    <el-select v-model="trade" placeholder="请选择">
      <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.title"
          :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'trade',
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  computed: {
    trade: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  },
  created () {
    this.$http.get('/common/classify').then(res => {
      this.options = res.data.data
    })
  }
}
</script>

<style scoped lang="less">

</style>
