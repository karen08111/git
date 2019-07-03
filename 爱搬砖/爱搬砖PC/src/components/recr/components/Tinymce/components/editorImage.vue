<template>
  <div>
    <el-upload
        class="editor-slide-upload"
        :action="baseURL"
        :with-credentials="true"
        :headers="upToken"
        :file-list="list"
        :on-success="handleSuccess">
      <el-button size="small" type="primary">图片上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { baseURL } from '@/utils/request'
import upToken from '@/utils/uploadToken'
export default {
  name: 'editorImage',
  data () {
    return {
      upToken: upToken,
      list: [],
      dialogVisible: false,
      baseURL: baseURL + '/operate/modifyInfo/images'
    }
  },
  methods: {
    handleSuccess (response, file, fileList) {
      console.log(response)
      let arr = []
      arr.push(baseURL + response.data.path)
      this.$emit('successCBK', arr)
      this.list = []
    }
  }
}
</script>

<style scoped>

</style>
