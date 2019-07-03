<template>
  <div class="citySelect">
    <el-select v-model="prov" placeholder="请选择省" style="margin-right: 10px;">
      <el-option
        v-for="item in provinces"
        :key="item.id"
        :label="item.title"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="city" v-if="!one" placeholder="请选择市">
      <el-option
        v-for="item in citys"
        :key="item.id"
        :label="item.title"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'citySelect',
  props: {
    value: [String, Number, Array], // 直接v-model传参
    one: Boolean
  },
  data () {
    return {
      provinces: [],
      citys: [],
      prov: '',
      city: ''
    }
  },
  watch: {
    prov (val, old) {
      this.req(val).then(r => {
        this.citys = r
      })
      if (old !== '') this.city = ''
      this.$emit('provId', val)
    },
    city (val) {
      this.$emit('input', val)
      this.$emit('giveCity', val)
    },
    value (val) {
      if (!val) {
        this.prov = ''
        this.city = ''
      }
      if (Array.isArray(val)) {
        let [p, c] = val.map(v => v.id)
        this.prov = p
        this.city = c
      }
    }
  },
  methods: {
    async req (id) {
      const arr = await this.$http.get('/publicFunction/getarea', { params: { id: id } }).then(res => {
        if (res.data.code === 200) {
          return res.data.data
        } else {
          return []
        }
      })
      return arr
    }
  },
  created () {
    this.req().then(r => {
      this.provinces = r
    })

    if (Array.isArray(this.value)) {
      let [p, c] = this.value.map(v => v.id)
      this.prov = p
      this.city = c
    }
  }
}
</script>

<style scoped lang="less">
  .citySelect {
    display: flex;
  }
</style>
