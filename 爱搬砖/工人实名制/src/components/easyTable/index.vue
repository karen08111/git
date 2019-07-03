<template>
  <div class='tableStyle'>
    <el-table :data="easyTableObj ? easyTableObj.cols : tabListData"
              :type="easyTableObj && easyTableObj.type"
              :stripe="showStripe"
              v-loading="isLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0.7)"
              ref="multipleTable"
              style="width: 100%;min-height:550px"
              @selection-change="handleSelectionChange">
      <el-table-column v-if="!!easyTableObj.type"
                       :type="easyTableObj.type"
                       width="55"></el-table-column>
      <el-table-column v-for="(item,index) in easyTableObj.colsTitle"
                       :key="index"
                       :prop="item.data"
                       :label="item.label"
                       :width="item.width"
                       :class-name="item.className"
                       :show-overflow-tooltip='true'
                       align='center'></el-table-column>
      <slot name="operation"
            ref="slot"></slot>
    </el-table>
    <el-pagination v-if="easyTableObj.footer!==null"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   background
                   :page-sizes="easyTableObj.footer.pageSizes"
                   :page-size="easyTableObj.footer.pageSize"
                   :current-page="easyTableObj.footer.currentPage"
                   :layout="easyTableObj.footer.layout"
                   :total="easyTableObj.footer.total"
                   style="text-align: center;margin-top: 20px"></el-pagination>
  </div>
</template>

<script>
// {
//   colsTitle: [
//     {
//       label: '参建单位',
//       data: 'name'
//     },
//     {
//       label: '所属班组',
//       data: 'name'
//     },
//     {
//       label: '工人姓名',
//       data: 'id'
//     },
//     {
//       label: '工种',
//       data: 'name',
//     },
//     {
//       label: '工资',
//       data: 'name'
//     },
//     {
//       label: '合同类型',
//       data: 'name'
//     },
//     {
//       label: '合同有效期',
//       data: 'name'
//     }
//   ],                      数组,表头属性 label:表头显示的字段,data：绑定的字段名
//   type: 'selection',      参考element中的table组件type属性，可设置为多选
//   cols: [ {
//     'name': '王晓'
//   } ],                    表格数据
//   footer: {
//     pageSizes: [10, 20],  可设置的分页大小
//     pageSize: 10,         当前页面显示的数量
//     total: 100            数据总数量
//   }                       表格分页属性
// }
// showDefalutId 是否显示默认序号 布尔值
// 如需添加操作，可在组件内部插入。示例：/* <easyTable :easyTableObj='tableData'>
//   <el-table-column
//    slot="operation"
//    property="name"
//    label="操作">
//     <template slot-scope="scope">
//       <el-button @click="seeDetail(scope.$index, scope.row)" type="text" size="small">查看</el-button>
//     </template>
//    </el-table-column>
//   </easyTable>
//   tableSelectRowChange    表格多选事件
//   tableCurrentPageChange  表格分页点击的事件
//   handleSizeChange        修改分页显示数量时触发的事件
export default {
  name: 'easyTable',
  props: {
    easyTableObj: Object,
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    },
    showStripe: {
      type: Boolean,
      default: false
    },
    tabListData: {
      type: Array
    }
  },
  data () {
    return {}
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('tableSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('tablePaginationChange', val)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('tableSelectRowChange', val)
    }
  }
}
</script>

<style scoped lang="less">
.tableStyle {
  padding-bottom: 20px;
  background-color: #fff;
}
</style>
