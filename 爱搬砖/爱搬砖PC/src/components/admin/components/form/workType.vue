<template>
  <el-form-item label="工      种：" class="workType">
    <el-col :span="6">
      <el-select v-model="resume_type" placeholder="请选择">
        <el-option
            v-for="item in work_types"
            :key="item.id"
            :label="item.work_name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="work_type" placeholder="请选择">
        <el-option
            v-for="item in ctypes"
            :key="item.id"
            :label="item.work_name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  name: 'workType',
  props: ['one', 'two'],
  data () {
    return {
      work_types: []
    }
  },
  computed: {
    ctypes () {
      let arr = this.work_types
      for (let i of arr) {
        if (i.id == this.resume_type) {
          return i.children
        }
      }
    },
    resume_type: {
      get () {
        return this.one
      },
      set (val) {
        this.$emit('update:one', val)
        this.work_type = ''
      }
    },
    work_type: {
      get () {
        return this.two
      },
      set (val) {
        this.$emit('update:two', val)
      }
    }
  },
  created () {
    this.$http.get('/common/getworks').then(res => {
      this.work_types = res.data.data
    })
  }
}
</script>

<style lang="less">
.workType{
  .el-col{
    margin-right: 2px;
  }
  .el-input{
    width: 100% !important;
  }
}
</style>
