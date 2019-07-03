<template>
  <div class="container Attestation_per">
    <header>
      <main>
        <router-link class="logo" to="/"><img src="../../assets/att_logo.png" alt=""></router-link>
        <div class="ver"></div>
        <p>{{headerTitle}}</p>
      </main>
    </header>
    <div class="main">
      <el-form :model="form" label-width="112px">
        <el-form-item label="姓      名：">
          <el-input v-model="form.full_name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <papers :type.sync="form.card_type" :num.sync="form.id_card"></papers>
        <el-form-item label="证件正面：" class="item-front">
          <images baseURL="/member/auth/upload" :list.sync="img_head"></images>
          <div class="hint">*请上传证件正面拍摄图片或者扫描文件</div>
        </el-form-item>
        <el-form-item label="证件反面：" class="item-behind">
          <images baseURL="/member/auth/upload" :list.sync="img_tail"></images>
          <div class="hint">*请上传证件反面拍摄图片或者扫描文件</div>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" @click="submit">{{role == 2 ? '下一步' : '提交审核'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import papers from './components/form/papers'
export default {
  name: 'Attestation_per',
  components: { papers },
  data () {
    return {
      role: this.$route.params.role,
      form: {
        full_name: sessionStorage.getItem('full_name') || '',
        card_type: sessionStorage.getItem('card_type') || 1,
        id_card: sessionStorage.getItem('id_card') || '',
        img_head: sessionStorage.getItem('img_head') || '',
        img_tail: sessionStorage.getItem('img_tail') || ''
      },
      img_head: [],
      img_tail: []
    }
  },
  computed: {
    headerTitle () {
      return this.$route.params.role == 2 && '企业认证' || '个人实名认证'
    }
  },
  watch: {
    img_head (val) {
      if (val.length != 0) { this.form.img_head = val[0].path } else { this.form.img_head = '' }
    },
    img_tail (val) {
      if (val.length != 0) { this.form.img_tail = val[0].path } else { this.form.img_tail = '' }
    },
    form: {
      handler (val) {
        for (let i in val) {
          sessionStorage.setItem(i, val[i])
        }
      },
      deep: true
    }
  },
  methods: {
    submit () {
      if (this.role != 2) {
        this.$http.post('/member/auth/person', this.form).then(res => {
          if (res.data.code == 200) {
            this.$store.commit('success', res.data.msg)
            this.$cookies.set('authState', 1, '0')
            this.$store.commit('getCoo')
            this.$store.commit('removeAuth')
            this.$router.push({ path: '/worker' })
          }
        })
      } else {
        this.$store.commit('setAccounForm', this.form)
        this.$router.push({ path: '/Attestation_com/2' })
      }
    }
  },
  created () {
    if (this.form.img_head) {
      this.img_head = [{ path: this.form.img_head }]
    }
    if (this.form.img_tail) {
      this.img_tail = [{ path: this.form.img_tail }]
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path == '/Attestation_com') {
      to.params.role = 2
    }
    next()
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: #f3f7fa;
    box-sizing: border-box;
    padding-bottom: 40px;
    header{
      width: 100%;
      height: 70px;
      background-color: #3388ff;
      box-shadow: 0px 2px 10px 0px rgba(123, 178, 255, 0.2);
      margin-bottom: 20px;
      main{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        .ver{
          width: 2px;
          height: 15px;
          background-color: #ffffff;
          border-radius: 1px;
          margin: 0 10px 0 20px;
        }
        p{
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .main{
      width: 1200px;
      background: #ffffff url("../../assets/rolebg2.png") no-repeat 650px 10px;
      margin: 0 auto;
      padding: 40px;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
  }
</style>

<style lang="less">
  .Attestation_per{
    .el-input{
      width: 380px;
    }
    .el-icon-plus{
      display: none;
    }
    .el-form-item__label{
      white-space: pre-wrap;
    }
    .item-front{
      .el-upload--picture-card{
        background: url("../../assets/frontbg.png") no-repeat center;
      }
    }
    .item-behind{
      .el-upload--picture-card{
        background: url("../../assets/behindbg.png") no-repeat center;
      }
    }
    .hint{
      font-size: 12px;
      letter-spacing: 1px;
      color: #cccccc;
      margin-top: 10px;
    }
    .el-button{
      width: 267px;
      height: 59px;
      line-height: 70px;
      padding: 0;
      font-family: AdobeHeitiStd-Regular,"Microsoft Himalaya";
      font-size: 18px;
      letter-spacing: 2px;
      color: #ffffff;
      margin-left: 56px;
    }
    .images{
      .el-upload-list__item,.el-upload--picture-card{
        width: 380px;
        height: 190px;
        border-radius: 5px;
      }
      .el-upload--picture-card{
        line-height: 190px;
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
