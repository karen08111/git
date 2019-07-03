<template>
  <el-form-item label="职      位：">
    <el-select v-model="job" placeholder="请选择职位">
      <el-option
          v-for="item in jobs"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'job',
  props: ['value'],
  data () {
    return {
      job: this.value,
      jobs: []
    }
  },
  watch: {
    job (val) {
      this.$emit('update:value', val)
    }
  },
  created () {
    this.$http.get('/common/getworks').then(res => {

    })
  }
}
</script>

<style scoped lang="less">

</style>
