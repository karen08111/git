<template>
  <div>
    <el-date-picker
      class="timeSelect"
      v-model="date"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'timeSelect',
  props: {
    value: { // 父组件直接v-model传参
      type: String,
      default: ''
    }
  },
  computed: {
    date: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
