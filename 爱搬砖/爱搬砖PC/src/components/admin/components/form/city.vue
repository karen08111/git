<template>
  <el-form-item :label="label" class="cityitem" prop="region">
    <el-col :span="6">
      <el-select v-model="province" placeholder="请选择省">
        <el-option
            v-for="item in provs"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="town" placeholder="请选择市">
        <el-option
            v-for="item in citys"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  name: 'city',
  props: {
    prov: [String, Number],
    city: [String, Number],
    label: {
      type: String,
      default: '工作地点：'
    }
  },
  data () {
    return {
      provs: [],
      citys: []
    }
  },
  computed: {
    province: {
      get () {
        return this.prov
      },
      set (val) {
        this.$emit('update:prov', val)
        this.$http.get('/common/getarea', { params: { id: val } }).then(res => {
          this.citys = res.data.data
        })
        this.town = ''
      }
    },
    town: {
      get () {
        return this.city
      },
      set (val) {
        this.$emit('update:city', val)
      }
    }
  },
  watch: {
    prov (val) {
      this.$http.get('/common/getarea', { params: { id: val } }).then(res => {
        this.citys = res.data.data
      })
    }
  },
  created () {
    this.$http.get('/common/getarea').then(res => {
      this.provs = res.data.data
    })
  }
}
</script>

<style lang="less">
  .cityitem{
    .el-col{
      margin-right: 2px;
    }
    .el-input{
      width: 100% !important;
    }
  }
</style>
