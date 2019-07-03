<template>
  <div class="smUpload">
    <el-upload :action="baseUrl"
               :headers="headers"
               :multiple="multiple"
               :file-list="fileList"
               :with-credentials="true"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-success="handleSuccess"
               :on-error="handleError"
               :on-remove="handleRemove">
      <i class="el-icon-plus"
         ref="elIco"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="imgUrl"
           alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'smUpload',
  props: {
    url: {
      type: String,
      default: '/uploadImg'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    keyName: {
      type: String
    },
    max: {
      type: Number,
      default: 1
    },
    imgs: {
      type: Array,
      default: _ => []
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      list: this.imgs
    }
  },
  computed: {
    fileList () {
      return this.list.map(val => {
        let url = this.keyName ? val[this.keyName] : val
        return {
          url: /^(https?|\/\/)/i.test(url) ? url : `${process.env.VUE_APP_baseURL}${url}`
        }
      })
    },
    imgUrl () {
      let url = this.dialogImageUrl
      return /^(https?|\/\/)/i.test(url) ? url : `${process.env.VUE_APP_baseURL}${url}`
    },
    baseUrl () {
      return process.env.VUE_APP_baseURL + this.url
    },
    headers () {
      return { 'Auth-Token': this.$store.state.token }
    }
  },
  watch: {
    list (val) {
      this.$emit('update:imgs', val.map(val => this.keyName ? val[this.keyName] : val))
      this.$emit('geveImg', val.map(val => this.keyName ? val[this.keyName] : val))
      this.changeUpBtnShow()
    }
  },
  methods: {
    changeUpBtnShow () {
      const flag = this.list.length < this.max
      if (flag) {
        this.$refs.elIco.parentNode.style.display = 'inline-block'
      } else {
        this.$refs.elIco.parentNode.style.display = 'none'
      }
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.list.push(response.data.path)
      } else {
        fileList.pop()
        this.$message.error(response.msg)
      }
    },
    handleRemove (file, fileList) {
      let index = this.fileList.findIndex(val => val.url === file.url)
      this.list.splice(index, 1)
    },
    handleError (err, file, fileList) {
      this.$message.error(err)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogImageUrl = this.dialogImageUrl.substr(5, this.dialogImageUrl.length)
      this.dialogVisible = true
    }
  },
  mounted () {
    this.changeUpBtnShow()
  }
}
</script>

<style scoped lang="less">
</style>
