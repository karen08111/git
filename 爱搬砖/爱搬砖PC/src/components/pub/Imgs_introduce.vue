<template>
  <el-form-item label="图片介绍:" style="margin-bottom:0;">
    <el-upload
        :action="this.$store.state.site+'/member/upload/photos'"
        :with-credentials="true"
        :headers="upToken"
        list-type="picture-card"
        :file-list="lists"
        :limit="9"
        :on-success="picFnRes"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="tips">最多上传9张照片，格式为PNG，JPG，不超过1M</div>
  </el-form-item>
</template>

<script>
import upToken from '@/utils/upToken'
export default {
  name: 'Imgs_introduce',
  data () {
    return {
      upToken: upToken,
      aimg: this.imgs || [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    aimgs: {
      get () {
        return this.aimg
      },
      set (val) {
        this.aimg = val
      }
    },
    lists: {
      get () {
        if (this.listArr) {
          if (this.listArr.length > 0) {
            let arr = this.listArr

            for (let i of arr) {
              if (i['path']) {
                i['url'] = this.$store.state.site + i['path']
              }
            }
            return arr
          } else {
            return []
          }
        }
      },
      set (val) {
        this.$emit('changeList', val)
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      let arr = []
      for (let i of fileList) {
        arr.push(i.id)
      }
      this.aimgs = arr
      this.lists = fileList
      this.$emit('removeImg', this.aimg)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    picFnRes (response, file, fileList) {
      if (response.code !== 200) {
        this.$message.error(response.msg)
        fileList.pop()
        this.lists = fileList
      } else {
        this.lists.push({
          id: response.data.id,
          name: response.data.orig_name,
          status: file.status,
          uid: file.uid,
          url: this.$store.state.site + response.data.path
        })
        this.aimgs.push(response.data.id)
        this.$emit('pimgs', [this.aimg, this.lists])
        if (fileList.length == 9) {
          document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
        }
      }
    }
  },
  props: ['listArr', 'imgs']
}
</script>

<style scoped lang="less">
  .tips {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #bdbdbd;
    line-height: 40px;
  }
</style>
