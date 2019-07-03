<template>
  <div>
    <el-form
      label-width="140px"
      ref="aptitudeComponent"
      :model="addForm"
      :rules="rules"
    >
      <el-row :gutter="24" class="teamSelect">
        <el-col :span="8">
          <el-form-item label="证书种类" prop="certificationCategoriesType">
            <el-select
              v-model="certificationCategoriesType"
              placeholder="请选择"
              @change="certificationCategoriesTypeChange"
            >
              <el-option
                v-for="item in certificationCategoriesTypeArr"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书类型" prop="certificationType">
            <el-select
              v-model="certificationType"
              placeholder="请选择"
              @change="certificationTypeChange"
            >
              <el-option
                v-for="item in certificationTypeArr"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择专业" prop="certificationProfessional">
            <el-select
              v-model="certificationProfessional"
              placeholder="请选择"
            >
              <el-option
                v-for="item in certificationProfessionalArr"
                :key="item.id"
                :label="item.title"
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
  name: 'aptitude',
  data () {
    return {
      certificationCategoriesTypeArr: [],
      certificationTypeArr: [],
      certificationProfessionalArr: [],
      certificationCategoriesType: '',
      certificationType: '',
      certificationProfessional: '',
      addForm: {
        certificationCategoriesType: '',
        certificationType: '',
        certificationProfessional: ''
      },
      rules: {
        certificationCategoriesType: [
          { required: true, message: '请选择证书种类', trigger: 'change' }
        ],
        certificationType: [
          { required: true, message: '请输入证书类型', trigger: 'change' }
        ],
        certificationProfessional: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    value: Object,
    isRequire: Boolean,
    startCheck: Boolean
  },
  watch: {
    certificationCategoriesType (val) {
      this.$http.get('/publicFunction/getCredential/' + val).then(res => {
        this.certificationTypeArr = res.data.data
      })
      this.addForm.certificationCategoriesType = val
      this.$emit('input', { certificationCategoriesType: val, certificationType: '', certificationProfessional: '' })
      //   this.$emit('sendSelect', val)
    },
    certificationType (val) {
      if (val === '') {
        return false
      }
      this.$http.get('/publicFunction/getCredential/' + val).then(res => {
        this.certificationProfessionalArr = res.data.data
      })
      this.addForm.certificationType = val
      this.$emit('input', {
        certificationCategoriesType: this.certificationCategoriesType,
        certificationType: val,
        certificationProfessional: ''
      })
    },
    certificationProfessional (val) {
      if (val === '') {
        return false
      }
      this.addForm.certificationProfessional = val
      this.$emit('input', {
        certificationCategoriesType: this.certificationCategoriesType,
        certificationType: this.certificationType,
        certificationProfessional: val
      })
    },
    value (val) {
      let { certificationCategoriesType: s, certificationType: t, certificationProfessional: n } = val
      if (t.id) this.certificationType = t.id
      if (s.id) this.certificationCategoriesType = s.id
      if (n.id) this.certificationProfessional = n.id
    },
    isRequire (val) {
      if (!val) {
        this.rules = []
      }
    },
    startCheck (val) {
      if (val) {
        this.$refs['aptitudeComponent'].validate((valid) => {
          if (valid) {
            return true
          } else {
            return false
          }
        })
      }
    }
  },
  methods: {
    corpSelectChange (value) {
      this.$emit('input', value)
    },
    certificationCategoriesTypeChange (value) {
      this.certificationType = ''
      this.certificationProfessional = ''
    },
    certificationTypeChange (value) {
      this.certificationProfessional = ''
    }
  },
  mounted: function () {
    // 获取证书种类列表
    this.$http.get('/publicFunction/getCredential/0').then(res => {
      this.certificationCategoriesTypeArr = res.data.data
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
