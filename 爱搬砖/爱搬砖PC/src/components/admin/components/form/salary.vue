<template>
  <el-form-item label="薪      资：" class="cityitem" prop="min_pay">
    <el-col :span="4">
      <el-input v-model="pay" type="number" placeholder="不填表示面议"></el-input>
    </el-col>
    <el-col :span="1" style="text-align: center;line-height: 40px;">/</el-col>
    <el-col :span="3">
      <el-select v-model="quantity_unit">
        <el-option
            v-for="item in units"
            :key="item.id"
            :label="item.unit"
            :value="item.id">
        </el-option>
      </el-select>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  name: 'salary',
  props: ['value', 'unit'],
  data () {
    return {
      units: [],
      sum: []
    }
  },
  computed: {
    pay: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('update:value', val)
      }
    },
    quantity_unit: {
      get () {
        return this.unit
      },
      set (val) {
        this.$emit('update:unit', val)
      }
    }
  },
  created () {
    this.$http.get('/common/quantityUnit').then(res => {
      this.units = res.data.data
    })
  }
}
</script>

<style lang="less">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }

  .cityitem{
    .el-input{
      width: 100% !important;
    }
  }
</style>
