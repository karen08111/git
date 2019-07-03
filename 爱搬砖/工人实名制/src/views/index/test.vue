<template>
  <div class="test">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item v-for="(item, index) in formEntries" :key="index" :label="item.prop">
        <el-input v-model="form[item.prop]"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    form: Object
  },
  data () {
    return {}
  },
  computed: {
    cForm: {
      get () {
        return this.form
      },
      set (val) {
        this.$emit('update:form', val)
      }
    },
    formEntries () {
      return Object.keys(this.form).map((val) => {
        return {
          prop: val
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
