<template>
  <div>
    <el-dialog title="提示"
               :visible.sync="exitDialogVisible"
               width="30%">
      <span>请确认填写的数据以保存，跳转后页面以填写数据会被清空，是否继续跳转？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="exitDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="exitDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
  三级面包屑，需要传两个路由和label
  */
export default {
  name: 'exitDialog',
  data () {
    return {
    }
  },
  props: {
    exitDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  },
  beforeRouteLeave (to, from, next) {
    console.log(to)
  }
}
</script>

<style scoped lang="less">
/*.teamSelect {
    :global {
      .el-select {
        display: block;
      }
    }
  }*/
</style>
