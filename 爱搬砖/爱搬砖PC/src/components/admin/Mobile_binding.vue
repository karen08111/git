<template>
  <div class="container">
    <el-form label-width="130px" v-if="step == 1">
      <el-form-item label="当前绑定手机号：">
        <span class="mobile">{{mobile | shield}}</span>
      </el-form-item>
      <note :value.sync="code1"></note>
      <el-form-item>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="130px" v-else>
      <el-form-item label="当前绑定手机号：">
        <el-input v-model="new_mobile" placeholder="请输入新手机号" style="width: 246px;"></el-input>
      </el-form-item>
      <note :value.sync="code2"></note>
      <el-form-item>
        <el-button type="primary" @click="submit">确定更改手机号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import note from './components/form/note'
export default {
  name: 'Mobile_binding',
  components: { note },
  data () {
    return {
      mobile: this.$store.state.usertel,
      new_mobile: '',
      code1: '',
      code2: '',
      step: 1
    }
  },
  filters: {
    shield (val) {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return val.replace(reg, '$1****$2')
    }
  },
  methods: {
    next () {
      this.step = 2
    },
    submit () {

    }
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 963px;
    height: 546px;
    background-color: #ffffff;
    padding: 40px;
    box-sizing: border-box;
  }
</style>
