<template>
  <div>
    <el-form-item label="证件类型：" prop="card_type">
      <el-select v-model="IDType" placeholder="请选择">
        <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="证件号码：" prop="card_type">
      <el-input v-model="IDNumber" placeholder="请输入证件号码"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'papers',
  props: ['type', 'num'],
  data () {
    return {
      types: []
    }
  },
  computed: {
    IDType: {
      get () {
        return Number(this.type)
      },
      set (val) {
        this.$emit('update:type', val)
        this.IDNumber = ''
      }
    },
    IDNumber: {
      get () {
        return this.num
      },
      set (val) {
        this.$emit('update:num', val)
      }
    }
  },
  created () {
    this.$http.get('/common/cardType').then(res => {
      this.types = res.data.data
    })
  }
}
</script>

<style scoped lang="less">

</style>
