<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="smForm">
    <el-form-item v-for="(item, index) in formArr" :key="index" :label="item.label" :prop="item.prop">
      <el-input v-model="form[item.prop]" :placeholder="item.pl" v-if="item.type === 'input'"></el-input>
      <el-select v-model="form[item.prop]" :placeholder="item.pl" v-if="item.type === 'select'">
        <el-option v-for="opt in item.ops" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'smForm',
  props: {
    formData: Object,
    formArr: Array
  },
  computed: {
    form: {
      get () {
        return this.formData
      },
      set (obj) {
        this.$emit('update:formData', obj)
      }
    },
    rules () {
      let obj = {}
      this.formArr.filter(val => val.isrequired).forEach(val => {
        obj[val.prop] = [
          { required: true, message: val.pl, trigger: 'blur' }
        ]
      })
      return obj
    }
  }
}
</script>

<style scoped lang="less">

</style>
