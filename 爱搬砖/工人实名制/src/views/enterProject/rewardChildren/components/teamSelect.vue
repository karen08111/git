<template>
  <el-select v-model="val" placeholder="请选择" :disabled="disabled">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.teamName"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'teamSelect',
  props: ['value', 'bcorpID', 'disabled'],
  data () {
    return {
      options: []
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    bcorpID () {
      this.getTeams()
    }
  },
  methods: {
    getTeams () {
      this.$http.get(`/member/public/searchClassLists`, { params: { bcorpID: this.bcorpID, prjID: localStorage.getItem('proId') } }).then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data
        }
      })
    }
  },
  created () {
    if (this.bcorpID) {
      this.getTeams()
    }
  }
}
</script>

<style scoped lang="less">

</style>
