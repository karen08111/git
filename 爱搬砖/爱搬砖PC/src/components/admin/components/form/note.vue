<template>
  <el-form-item label="短信验证码：" class="note">
    <el-input v-model="code" placeholder="请输入验证码"></el-input><span class="gain" :class="{begin: isCount}" @click="send">{{txt | bracket}}</span>
  </el-form-item>
</template>

<script>
export default {
  name: 'note',
  props: ['value'],
  data () {
    return {
      code: this.value,
      txt: '获取验证码',
      isCount: false,
      timer: null
    }
  },
  watch: {
    code (val) {
      this.$emit('update:value', val)
    }
  },
  filters: {
    bracket (val) {
      if (typeof val === 'number') { return `( ${val}s )` } else { return val }
    }
  },
  methods: {
    send () {
      if (!this.isCount) {
        this.txt = 59
        this.isCount = true
        this.timer = setInterval(() => {
          if (this.txt <= 0) {
            this.txt = '重新获取验证码'
            this.isCount = false
            clearInterval(this.timer)
          } else {
            this.txt--
          }
        }, 1000)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
  .note{
    .el-input{
      width: 185px;
    }
    .gain{
      cursor: pointer;
      margin-left: 10px;
      letter-spacing: 1px;
      color: #3388ff;
      &.begin{
        color: #666666;
        cursor: default;
      }
    }
  }
</style>
