<template>
  <div class="paging" :style="{textAlign: align}">
    <el-pagination
      background
      :current-page.sync="page"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="amount"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'paging',
  props: {
    total: [Number, String], // 总数
    current_page: [Number, String], // 当前页数（支持.sync修饰符）
    per_page: { // 每页显示数量
      type: [Number, String],
      default: 15
    },
    align: { // 分页器位置（可接受参数为text-align属性值）
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
      page: +this.current_page
    }
  },
  computed: {
    amount () {
      return +this.total
    },
    size () {
      return +this.per_page
    }
  },
  watch: {
    page (val) {
      this.$emit('update:current_page', val)
    }
  },
  methods: {
    currentChange (val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style scoped lang="less">
</style>
