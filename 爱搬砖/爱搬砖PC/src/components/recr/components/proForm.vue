<template>
  <div class="app">
    <div class="item i1">
      <div class="tit">* 标     题：</div>
      <div class="inp"><el-input v-model="form.title" placeholder="请输入标题"></el-input></div>
    </div>
    <div class="item i2">
      <div class="tit">* 公告信息：</div>
      <div class="tiny">
        <Tinymce v-model="form.content"></Tinymce>
      </div>
    </div>
    <div class="item">
      <div class="tit"></div>
      <div class="upl">
        <div class="tit">*相关附件</div>
        <el-upload
            class="upload-demo"
            :action="$store.state.site + '/member/purchase/upload'"
            :on-success="success"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :with-credentials="true"
            :headers="upToken"
            accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :file-list="form.enclosure">
          <p class="upload" v-show="dis">上传公告文</p>
          <div slot="tip" class="el-upload__tip">上传Word、
            Excel文件</div>
        </el-upload>
      </div>
    </div>
    <div class="item">
      <div class="tit"></div>
      <div class="btns">
        <el-button type="primary" @click="sub">确定发布</el-button>
        <el-button type="primary" plain @click="$router.go(-1)">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '../components/Tinymce/index'
import upToken from '@/utils/upToken'
export default {
  name: 'proForm',
  props: ['form', 'url'],
  components: { Tinymce },
  computed: {
    cForm: {
      get () {
        return this.form
      },
      set (val) {
        this.$emit('update:form', val)
      }
    },
    dis () {
      /* if(this.form.enclosure.length === 1) return false
        else return true */
      return true
    },
    upToken () {
      return upToken
    },
    cForm () {
      let obj = Object.assign({}, this.form)
      obj.enclosure = obj.enclosure.map(val => val.id).join(',')
      return obj
    }
  },
  methods: {
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove (file, fileList) {
      let arr = this.form.enclosure
      let idx = arr.findIndex(val => val.id = file.id)
      arr = arr.splice(idx, 1)
    },
    success (response, file, fileList) {
      if (response.code === 200) {
        this.form.enclosure.push({ id: response.data.id, name: response.data.file_name })
      } else {
        this.$message.error(response.msg)
      }
    },
    sub () {
      this.$http.post(this.url, this.cForm).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.push({ path: '/re_admin' })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .app{
    .item{
      display: flex;
      &.i1{
        margin-bottom: 40px;
      }
      &.i2{
        margin-bottom: 48px;
      }
      .tit{
        width: 110px;
        letter-spacing: 1px;
        color: #666666;
        white-space: pre;
        line-height: 40px;
      }
      .inp{
        width: 246px;
      }
      .tiny{
        width: 800px;
      }
      .upload{
        text-decoration: underline;
        font-size: 14px;
        letter-spacing: 1px;
        color: #3388ff;
      }
      .el-upload__tip{
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 1px;
        color: #cccccc;
        white-space: pre-line;
      }
      .upl{
        margin-bottom: 49px;
        .tit{
          line-height: 1;
          margin-bottom: 21px;
        }
      }
    }
  }
</style>

<style lang="less">
  .item{
    .btns{
      font-size: 0;
      .el-button{
        &:first-of-type{
          padding: 14px 62px;
        }
        &:last-of-type{
          padding: 14px 28px;
          background-color: #fff;
        }
      }
      .el-button+.el-button{
        margin-left: 40px;
      }
    }
  }

  .el-icon-close-tip{
    display: none !important;
  }
</style>
