<template>
  <el-pagination
      v-if="total > size"
      background
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'paging',
  props: {
    total: Number,
    page: Number,
    size: {
      type: Number,
      default: 15
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('update:page', val)
    }
  }
}
</script>

<style scoped lang="less">
  .el-pagination{
    text-align: center;
  }
</style>

<style lang="less">
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #fff;
    border: solid 1px #d9d9d9;
    font-size: 14px;
    font-weight: normal;
    color: #cfcfcf;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #3388ff;
  }
</style>
