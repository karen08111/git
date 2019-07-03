<template>
  <div class="container Add_license">
    <el-form :model="form" label-width="120px">
      <el-form-item label="证书名称：">
        <el-input v-model="form.seniority_name" placeholder="请输入证书名"></el-input>
      </el-form-item>
      <licenseLevel :lv.sync="form.credential_level_type"></licenseLevel>
      <el-form-item label="证书图片：" style="margin-bottom: 75px;">
        <images :list.sync="img" baseURL="/member/upload/seniority"></images>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="padding-left: 62px; padding-right: 62px;" @click="submit">提交审核</el-button>
        <el-button style="margin-left: 40px" @click="goBack">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import licenseLevel from './components/form/licenseLevel'
export default {
  name: 'Add_license',
  components: { licenseLevel },
  data () {
    return {
      form: {
        seniority_name: '',
        credential_level_type: '',
        img_path: '',
        nature: 1,
        _method: 'put'
      },
      img: []
    }
  },
  watch: {
    img (val) {
      if (val.length != 0) { this.form.img_path = val[0].path } else { this.form.img_path = '' }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    submit () {
      this.$http.post('/member/seniority', this.form).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', '资质证书添加成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .Add_license{
    width: 963px;
    height: 546px;
    background-color: #ffffff;
    padding: 40px 50px;
    box-sizing: border-box;
    .el-input{
      width: 246px;
    }
    .images{
      .el-upload-list__item,.el-upload--picture-card{
        width: 220px;
        height: 150px;
        border-radius: 5px;
      }
      .el-upload--picture-card{
        line-height: 150px;
      }
      .el-icon-plus{
        font-size: 28px !important;
      }
      img{
        object-fit: cover;
      }
    }
  }
</style>
