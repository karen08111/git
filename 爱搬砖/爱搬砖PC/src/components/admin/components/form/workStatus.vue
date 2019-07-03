<template>
  <el-form-item label="工作状态：">
    <el-select v-model="status" placeholder="请选择">
      <el-option label="空闲中" :value="0"></el-option>
      <el-option label="工作中" :value="1"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'workStatus',
  props: ['value'],
  computed: {
    status: {
      get () {
        return Number(this.value)
      },
      set (val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
