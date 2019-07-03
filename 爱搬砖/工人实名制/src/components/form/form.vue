<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="form" :inline="inline" :labelWidth="labelWidth">
      <el-form-item :label="item.label" :prop="item.rules? item.rules.name:''" v-for="(item,index) in formData" :key="index">
<!--        输入框-->
        <el-input :disabled="disabled" :placeholder="item.pla"  v-if="item.type =='input'" v-model="form[item.returns]"></el-input>
<!--        选择框-->
        <el-select :disabled="disabled" :placeholder="item.pla" v-if="item.type == 'select'" v-model="form[item.returns]" @focus="tar(item.children)">
          <el-option :label="p[Object.keys(p)[1]]" :value="p[Object.keys(p)[0]]" v-for="(p) in item.children" :key="p[Object.keys(p)[0]]">{{p[Object.keys(p)[1]]}}</el-option>
        </el-select>
<!--        单选框-->
        <el-radio-group :disabled="disabled"  v-if="item.type == 'radio'" v-model="form[item.returns]">
          <el-radio :label="che[Object.keys(che)[0]]" v-for="(che,index) in item.children" :key="index">{{che[Object.keys(che)[1]]}}</el-radio>
        </el-radio-group>
  <!--          <el-checkbox-group v-model="form[item.returns]"  :disabled="disabled" v-if="item.type == 'check'">-->
  <!--            <el-checkbox :label="p[Object.keys(p)[1]]" :checked="item.checked" :name="item.returns" :key="p[Object.keys(p)[0]]" v-for="p in item.children"></el-checkbox>-->
  <!--          </el-checkbox-group>-->
  <!--          文本框-->
        <el-input :disabled="disabled" :placeholder="item.pla" type="textarea"  v-if="item.type =='textarea'" v-model="form[item.returns]"></el-input>
<!--        开关按钮-->
        <el-switch v-if="item.type =='switch'"  :disabled="disabled"  v-model="form[item.returns]"></el-switch>
<!--        日期选择-->
        <el-date-picker :disabled="disabled"  type="date" v-if="item.type == 'date'" :placeholder="item.pla" v-model="form[item.returns]" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">></el-date-picker>
<!--        时间选择-->
        <el-time-picker  :disabled="disabled"  type="fixed-time" value-format="HH:mm:ss" v-if="item.type == 'time'" :placeholder="item.pla" v-model="form[item.returns]"></el-time-picker>
<!--        <slot name="uploadImg"></slot>-->
        <Upload :imgs="imgs" v-if="item.type == 'upImg'" :ref="item.returns" ></Upload>
<!--        地区选择-->
        <citySelect v-if="item.type == 'city'" :ref="item.returns" @giveCity="giveCity" :value="item.value"></citySelect>
<!--        插槽-->
      </el-form-item>
      <slot name='slot'>
      </slot>
      <el-form-item>
<!--        增加保存-->
        <el-button :disabled="disabled" @click="onSubmit('form')" type="primary" v-if="!disabled && !set">{{custom?custom:'保存'}}</el-button>
<!--        修改保存-->
        <el-button :disabled="disabled" @click="setting('form')" type="primary" v-if="!disabled && set">{{custom?custom:'保存'}}</el-button>
        <div v-if="!showReturn"><el-button @click="disabled?ups():resetForm('form')" v-if="!custom">{{disabled?'返回':'重置'}}</el-button></div>
        <el-button @click="returnBtnClick" v-if="showReturn">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--

-->
<script>
import Upload from '@/components/formItems/smUpload'
import citySelect from '@/components/formItems/citySelect'
export default {
  components: { Upload, citySelect },
  name: 'forms',
  data () {
    return {
      form: {},
      children: [{ id: 1, title: '选择1' }, { id: 2, title: '选择2' }],
      imgs: [],
      value: ''
    }
  },
  props: {
    formData: {
      type: Array
    },
    showReturn: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      defalut: false
    },
    inline: {
      type: Boolean
    },
    custom: String,
    labelWidth: {
      type: String,
      default: '100px'
    },
    success: {
      type: Boolean
    },
    set: {
      type: Boolean
    }
  },
  mounted () {
  },
  activated () {
    var arr = {}
    this.formData.map(val => {
      if (val.value) {
        arr[val.returns] = val.value
      }
    })
    this.form = arr
    this.formData.filter(val => !val.disabled)
  },
  computed: {
    rules () {
      var arr = {}
      this.formData.map(val => {
        if (val.rules) {
          arr[val.rules.name] = { required: true, message: val.rules.message || '不能为空', trigger: val.rules.trigger || 'blur' }
        }
      })
      return arr
    },
    dis () {
      if (this.formData.filter(val => !val.disabled).length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    imgs () {
      this.form[Object.keys(this.$refs)[1]] = this.imgs
    },
    value (val) {
      // console.log(val)
      // this.form[Object.keys(this.$refs)[0]] = this.value
      // if (this.success) this.value = ''
    },
    success () {
      this.form = {}
      this.imgs = []
      this.value = ''
    }
  },
  methods: {
    returnBtnClick () {
      this.$emit('returnBtn')
    },
    onSubmit (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理城市id
          // var arr = {}
          // for (let i in that.form) {
          //   if (Array.isArray(that.form[i])) {
          //     arr[i] = that.form[i][1].id
          //     console.log(that.form[i])
          //   } else {
          //     arr[i] = that.form[i]
          //   }
          // }
          that.$emit('giveForm', that.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    giveCity (val) {
      // console.log(val)
      this.value = val
      this.form[Object.keys(this.$refs)[0]] = this.value
      if (this.success) this.value = ''
    },
    setting (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理城市id
          var arr = {}
          for (let i in that.form) {
            if (Array.isArray(that.form[i])) {
              arr[i] = that.form[i][1].id
              console.log(that.form[i])
            } else {
              arr[i] = that.form[i]
            }
          }
          that.$emit('giveSetForm', arr)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancelBtnClick')
      this.form = {}
      var bews = this.formData
      bews.map((val) => {
        val.value = ''
        // if (val.type === 'city') {
        //   val.type = 'none'
        //   this.$nextTick(() => {
        //     val.type = 'city'
        //   })
        // }
      })
      this.formData = bews
      this.value = ''
    },
    ups () {
      this.$router.go(-1)
    },
    tar (arr) {
      // console.log(arr)
    }
  }
}
</script>

<style scoped>

</style>
