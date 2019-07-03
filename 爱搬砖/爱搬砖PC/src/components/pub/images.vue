<template>
  <el-upload
      class="images"
      :action="$store.state.site + baseURL"
      :with-credentials="true"
      :headers="upToken"
      :limit="max"
      :file-list="cList"
      :on-success="success"
      :on-remove="remove"
      list-type="picture-card">
    <i class="el-icon-plus" ref="imagePlus"></i>
  </el-upload>
</template>

<script>
import upToken from '@/utils/upToken'
export default {
  name: 'images',
  props: {
    baseURL: {
      type: String,
      default: '/member/upload/photos'
    },
    max: {
      type: Number,
      default: 1
    },
    list: Array
  },
  data () {
    return {
      upToken: upToken
    }
  },
  computed: {
    cList: {
      get () {
        for (let i of this.list) {
          i['url'] = this.$store.state.site + i.path
        }
        return this.list
      },
      set (val) {
        this.$emit('update:list', val)
      }
    }
  },
  watch: {
    cList (val) {
      if (val.length >= this.max) {
        this.$refs.imagePlus.parentNode.style.display = 'none'
      } else {
        this.$refs.imagePlus.parentNode.style.display = 'inline-block'
      }
    }
  },
  methods: {
    success (response, file, fileList) {
      if (response.code == 200) {
        this.cList.push(response.data)
      } else {
        fileList.pop()
        this.$message.error(response.msg)
      }
    },
    remove (file, fileList) {
      this.cList = fileList
    }
  },
  mounted () {
    if (this.cList.length >= this.max) {
      this.$refs.imagePlus.parentNode.style.display = 'none'
    } else {
      this.$refs.imagePlus.parentNode.style.display = 'inline-block'
    }
  }
}
</script>

<style lang="less">

</style>
