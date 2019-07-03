<template>
  <div v-if=" dialogData || false ">
    <el-dialog
      :title="dialogData.dialogTitle || '详情'"
      :visible.sync="dialogData.dialogVisible"
      width="70%"
      :before-close="handleClose"
      :center="dialogData.center || false"
    >
      <slot name='HeaderSlot' >
      </slot>
      <el-form
        ref="form"
        :label-width="dialogData.width || '120px'"
      >
        <el-row
          :gutter='24'
          v-for="(item,index) in dialogData.data"
          :key='index'
        >
          <el-col :span="24/item.length" v-for="(itemChild, index) in item" :key='index+"d" '>
           <el-form-item :label=" Object.entries(itemChild)[0][0]">
            {{Object.entries(itemChild)[0][1]}}
           </el-form-item>
          </el-col>
        </el-row>
        <slot name='slot' >
        </slot>
      </el-form>
      <span
        v-if="!!dialogData.footer"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogCancelBtnClick">{{cancelBtnText}}</el-button>
        <el-button
          type="primary"
          @click="dialogOkBtnClick"
        >{{okBtnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* 数据格式
{
  data:[[{
    '参建单位名称':'枣庄市住房与城乡建设局'，
    '统一社会信用码':'123456',
  },{
    '参建单位名称':'枣庄市住房与城乡建设局'，
    '统一社会信用码':'123456',
  }],[{
    '参建单位名称':'枣庄市住房与城乡建设局'，
    '统一社会信用码':'123456',
  }]],                       要显示的数据,数组里面嵌套数组,数组里面的每个数组为一行，每个对象平分位置
  dialogVisible:true       是否显示dialog
  footer: {
          okBtnText:'确定',        确定按钮文字
          cancelBtnText:'取消',    取消按钮文字
        }                   设为null时不显示底部按钮
  dialogTitle:'弹窗标题'    弹窗标题
  width:120px,             label字符宽度,默认宽度120
  onOkClick                点击Ok按钮时触发的事件
  onCancelClick            点击取消时的事件
  handleDialogClose        点击右上角的x号关闭弹窗时的事件
}
*/
export default {
  name: 'detailDialog',
  props: {
    dialogData: Object
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    dialogCancelBtnClick () {
      this.$emit('onCancelClick', false)
    },
    dialogOkBtnClick () {
      this.$emit('onOkClick', true)
    },
    handleClose () {
      this.$emit('handleDialogClose')
    }
  },
  computed: {
    dataFiled () {
      return Object.keys(this.dialogData.data)
    },
    okBtnText () {
      return this.dialogData.footer.okBtnText || '确定'
    },
    cancelBtnText () {
      return this.dialogData.footer.cancelBtnText || '取消'
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="less">
</style>
