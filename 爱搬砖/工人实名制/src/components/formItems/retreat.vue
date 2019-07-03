<template>
  <div>
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
<!--    <el-time-select-->
<!--      v-model="value1"-->
<!--      placeholder="选择时间">-->
<!--    </el-time-select>-->
    <div class="add">
      <el-button type="success" @click="add">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'retreat',
  data () {
    return {
      value: '',
      value1: ''
    }
  },
  methods: {
    add () {
      // console.log(this.value, this.value1)
      this.$emit('giveDate', this.value)
    },
    cancel () {
      this.$emit('quit')
    }
  }
}
</script>

<style scoped>
.add {
  text-align: center;
  margin-top: 20px;
}
</style>
