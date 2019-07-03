<template>
  <el-form-item label="证书等级：">
    <el-select v-model="level" placeholder="请选择">
      <el-option
          v-for="item in list"
          :key="item.id"
          :label="item.title"
          :value="item.id">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'licenseLevel',
  props: ['lv'],
  data () {
    return {
      list: []
    }
  },
  computed: {
    level: {
      get () {
        return this.lv
      },
      set (val) {
        this.$emit('update:lv', val)
      }
    }
  },
  created () {
    this.$http.get('/common/hierarchy').then(res => {
      this.list = res.data.data
    })
  }
}
</script>

<style scoped lang="less">

</style>
