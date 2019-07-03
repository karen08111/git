<template>
  <div>
    <el-form
      label-width="120px"
    >
      <el-row :gutter="24" class="teamSelect">
        <el-col :span="12">
          <el-form-item label="参建单位">
            <el-select
              v-model="bcorpID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in corpArr"
                :key="item.id"
                :label="item.corpName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班组">
            <el-select
              v-model="teamID"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teamArr"
                :key="item.id"
                :label="item.teamName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/*
三级面包屑，需要传两个路由和label
*/
export default {
  name: 'teamSelect',
  data () {
    return {
      corpArr: [],
      teamArr: [],
      bcorpID: '',
      teamID: ''
    }
  },
  props: {
    value: Object
  },
  watch: {
    bcorpID (val) {
      this.teamID = ''
      let params = {
        'bcorpID': val,
        'prjID': this.proId
      }
      // 获取参建单位列表
      this.$http.get('/member/public/searchClassLists', { params: params }).then(res => {
        this.teamArr = res.data.data
      })
      this.$emit('input', { teamID: '', bcorpID: val })
      //   this.$emit('sendSelect', val)
    },
    teamID (val) {
      this.$emit('input', { teamID: val, bcorpID: this.bcorpID })
    },
    value (val) {
      if (JSON.stringify(this.value) === JSON.stringify({})) {
        this.bcorpID = ''
        this.teamID = ''
      }
    }
  },
  methods: {
    corpSelectChange (value) {
      this.$emit('input', value)
    }
  },
  mounted: function () {
    this.proId = localStorage.getItem('proId')
    let params = {
      'prjID': this.proId
    }
    // 获取参建单位列表
    this.$http.get('/member/public/searchBCorpLists', { params: params }).then(res => {
      this.corpArr = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
/*.teamSelect {
  :global {
    .el-select {
      display: block;
    }
  }
}*/
</style>
