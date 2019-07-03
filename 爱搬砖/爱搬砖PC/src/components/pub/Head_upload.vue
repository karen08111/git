<template>
  <div class="app">
    <my-upload field="img"
               @crop-success="cropSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="100"
               :height="100"
               :headers="headers"
               :withCredentials="true"
               img-format="png"></my-upload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'

export default {
  name: 'Head_upload',
  props: {
    url: {
      type: String,
      default: '/member/avatar'
    },
    rid: Number
  },
  data () {
    return {
      show: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  watch: {
    show (val) {
      this.$emit('changeHeadShow', 0)
    }
  },
  components: {
    'my-upload': myUpload
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
    cropSuccess (imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl

      let formData = new FormData()
      formData.append('file', imgDataUrl)
      if (this.rid) formData.append('id', this.rid)
      this.$http.post(this.$store.state.site + this.url, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.code == 200) {
          this.$emit('changeHeadShow', 0)
          this.$emit('upSuccess', res.data.data)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */

    /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
    cropUploadFail (status, field) {

    }
  }
}
</script>

<style scoped>
  .app {
    position: fixed;
    z-index: 999;
  }
</style>
