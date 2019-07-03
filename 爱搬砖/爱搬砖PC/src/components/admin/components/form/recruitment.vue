<template>
  <el-form-item label="招聘类型：" class="recruitment" prop="nature">
    <el-select v-model="value1" placeholder="请选择" :disabled="isEdit">
      <el-option label="工人" :value="1"></el-option>
      <el-option label="团队" :value="2"></el-option>
    </el-select>
    <template v-if="value1 == 1">
      <el-select v-model="value2" placeholder="请选择" :disabled="isEdit">
        <el-option
            v-for="item in pres"
            :key="item.id"
            :label="item.work_name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="value3" placeholder="请选择" :disabled="isEdit">
        <el-option
            v-for="item in cpres"
            :key="item.id"
            :label="item.work_name"
            :value="item.id">
        </el-option>
      </el-select>
    </template>
    <template v-if="value1 == 2">
      <el-select v-model="value3" placeholder="请选择" :disabled="isEdit">
        <el-option
            v-for="item in teams"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </template>
  </el-form-item>
</template>

<script>
export default {
  name: 'recruitment',
  props: ['one', 'two', 'three', 'isEdit'],
  data () {
    return {
      pres: [],
      teams: []
    }
  },
  computed: {
    cpres () {
      let arr = this.pres
      if (this.value1 == 1) {
        for (let i of arr) {
          if (i.id == this.value2) {
            return i.children
          }
        }
      }
    },
    value1: {
      get () {
        return this.one
      },
      set (val) {
        this.$emit('update:one', val)
        this.value2 = ''
        this.value3 = ''
      }
    },
    value2: {
      get () {
        return this.two
      },
      set (val) {
        this.$emit('update:two', val)
        this.value3 = ''
      }
    },
    value3: {
      get () {
        return this.three
      },
      set (val) {
        this.$emit('update:three', val)
      }
    }
  },
  created () {
    this.$http.get('/common/getworks').then(res => {
      this.pres = res.data.data
    })
    this.$http.get('/common/classify').then(res => {
      this.teams = res.data.data
    })
  }
}
</script>

<style lang="less">
  .recruitment{
    .el-input{
      width: 180px;
    }
  }
</style>
