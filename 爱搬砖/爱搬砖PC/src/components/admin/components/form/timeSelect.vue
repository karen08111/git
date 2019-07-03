<template>
  <el-form-item label="工作时间：" class="timeSelect">
    <el-col :span="5">
      <el-date-picker class="date" type="month" placeholder="选择开始日期" v-model="time_start" value-format="yyyy.MM" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col :span="5">
      <el-date-picker class="date" type="month" placeholder="不选表示至今" v-model="time_end" value-format="yyyy.MM" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  name: 'timeSelect',
  props: ['start', 'end'],
  computed: {
    time_start: {
      get () {
        return this.start
      },
      set (val) {
        this.$emit('update:start', val)
      }
    },
    time_end: {
      get () {
        return this.end
      },
      set (val) {
        this.$emit('update:end', val)
      }
    },
    timeSort () {
      if (this.time_start && this.time_end) { return [this.time_start, this.time_end].sort() } else { return [this.time_start, this.time_end] }
    }
  },
  watch: {
    timeSort (val) {
      this.$emit('update:start', val[0])
      this.$emit('update:end', val[1])
      this.time_start = val[0]
      this.time_end = val[1]
    }
  }
}
</script>

<style scoped lang="less">
  .timeSelect{
    .el-col{
      margin-right: 10px;
    }
  }
</style>
