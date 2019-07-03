<template>
  <div class="container Com_resume">
    <div class="preview"><!--预览主页--></div>
    <div class="basic" v-show="basicShow">
      <h3>{{name}}<i class="iconfont icon-bianji" @click="basicShow = false"></i></h3>
      <p><i class="iconfont icon-dianhua"></i><span>{{mobile}}</span><i class="iconfont icon-guanwang"></i><span>{{website}}</span></p>
      <p><i class="iconfont icon-weibiaoti-"></i><span>{{email}}</span><i class="iconfont icon-fax"></i><span>{{fax}}</span></p>
      <div class="address"><i class="iconfont icon-dibiao"></i>{{address}}</div>
      <Map_temp el="basicMap" :width="880" :height="411" :mapxy="mapxy"></Map_temp>
    </div>
    <div class="basicForm" v-show="!basicShow">
      <headline h4="基本信息" span="完善基本信息，展示更好自己" style="margin-bottom: 18px;"></headline>
      <el-form :model="basicForm" label-width="100px">
        <el-form-item label="办公号码：">
          <el-input v-model="basicForm.office_mobile" placeholder="请输入您的联系方式"></el-input>
        </el-form-item>
        <el-form-item label="传真号码：">
          <el-input v-model="basicForm.fax_number" placeholder="请输入您的传真号码"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱：">
          <el-input v-model="basicForm.enterprise_email" placeholder="请输入您的企业邮箱"></el-input>
        </el-form-item>
        <el-form-item label="企业官网：">
          <el-input v-model="basicForm.official_website" placeholder="请输入您的企业官网"></el-input>
        </el-form-item>
        <el-form-item label="企业地址：">
          <el-input v-model="basicForm.company_address" placeholder="例：浙江省杭州市滨江区西科科技园1-11" style="width: 400px"></el-input>
          <Map_temp v-if="!basicShow" el="basicFormMap" :width="730" :height="411" :mapxy.sync="basicForm.map_pos" :city="cityName" :area.sync="basicForm.company_address" :isLoca="true"></Map_temp>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="subBas">保 存</el-button>
          <span @click="basicShow = true">取  消</span>
        </div>
        <div class="avatar">
          <img v-if="avatar" :src="$store.state.site + avatar" :onerror="$store.state.defaultImg" alt="" @click="avaShow = !avaShow">
          <img v-else src="../../assets/none.png" alt="" @click="avaShow = !avaShow">
        </div>
      </el-form>
    </div>
    <div class="cred" v-show="credShow">
      <div class="head">
        <headline h4="资质证书" span="" style="margin-bottom: 40px;"></headline>
        <i class="iconfont icon-bianji" @click="credShow = false"></i>
      </div>
      <Aptitude :list="cerds" v-if="cerds.filter(value => value.isuse == 1).length > 0"></Aptitude>
      <div class="nothing" v-else>暂无</div>
    </div>
    <div class="editCred" v-show="!credShow">
      <div class="head">
        <headline h4="资质证书" span="展示资质证书，体现自我实力" style="margin-bottom: 40px;"></headline>
        <router-link to="/Add_license">添加新的资质证书</router-link>
      </div>
      <el-form label-width="120px" class="cerForm">
        <Aptitude :list="cerds" :checkList.sync="checkCerds" :isEdit="true"></Aptitude>
        <div class="btns">
          <el-button type="primary" @click="subCred">保 存</el-button>
          <span @click="credShow = true">取  消</span>
        </div>
      </el-form>
    </div>
    <div class="imgs" v-show="imgsShow">
      <div class="head">
        <headline h4="图片介绍" span="" style="margin-bottom: 40px;"></headline>
        <i class="iconfont icon-bianji" @click="imgsShow = false"></i>
      </div>
      <div class="imgList">
        <div v-if="imgs.length > 0"><img v-for="item in imgs" :src="$store.state.site + item.path" :onerror="$store.state.defaultImg" alt=""></div>
        <div class="nothing" v-else>暂无</div>
        <div class="empty"></div>
      </div>
    </div>
    <div class="editImgs" v-show="!imgsShow">
      <div class="head">
        <headline h4="图片介绍" span="添加图片介绍，提升企业形象" style="margin-bottom: 40px;"></headline>
      </div>
      <images :list.sync="imgs" :max="9"></images>
      <div class="btns">
        <el-button type="primary" @click="subImgs">保 存</el-button>
        <span @click="imgsShow = true">取  消</span>
      </div>
    </div>
    <div class="introduce" v-show="intShow">
      <div class="head">
        <headline h4="企业介绍" span="" style="margin-bottom: 40px;"></headline>
        <i class="iconfont icon-bianji" @click="intShow = false"></i>
      </div>
      <div class="content" v-if="content">{{content}}</div>
      <div class="nothing" v-else>暂无</div>
    </div>
    <div class="editInt" v-show="!intShow">
      <headline h4="企业介绍" span="填写企业介绍，完善全面的企业文化" style="margin-bottom: 40px;"></headline>
      <el-form label-width="120px">
        <el-form-item label="企业介绍：">
          <el-input
              type="textarea"
              :rows="5"
              placeholder="本公司拥有优秀的员工、先进的技术、精良的设备，公司在坚持技术创新的基础上，狠抓质量管理，不断提高服务水平，实现了公司业务的良性发展。"
              v-model="content">
          </el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="subInt">保 存</el-button>
          <span @click="intShow = true">取  消</span>
        </div>
      </el-form>
    </div>
    <Head_upload v-if="avaShow" url="/member/companypage/avatar" @changeHeadShow="changeHeadShow" @upSuccess="upSuccess"></Head_upload>
  </div>
</template>

<script>
import Aptitude from './components/form/Aptitude'
export default {
  name: 'Com_resume',
  components: { Aptitude },
  data () {
    return {
      avaShow: false,
      basicShow: true,
      credShow: true,
      imgsShow: true,
      intShow: true,
      name: '',
      mobile: '',
      website: '',
      email: '',
      fax: '',
      address: '',
      mapxy: '',
      avatar: '',
      basicForm: {
        office_mobile: '',
        fax_number: '',
        enterprise_email: '',
        official_website: '',
        company_address: '',
        map_pos: '',
        _method: 'put'
      },
      cerds: [],
      checkCerds: [],
      imgs: [],
      content: ''
    }
  },
  computed: {
    cityName () {
      if (this.basicForm.company_address) {
        let reg = /.+?(省|市)/g
        let str = this.basicForm.company_address.match(reg)
        if (str) { return str[str.length - 1] }
      } else {
        return ''
      }
    },
    imgsID () {
      let arr = []
      for (let i of this.imgs) {
        arr.push(i.id)
      }
      return arr.join()
    }
  },
  methods: {
    subBas () {
      this.$http.post('/member/companypage/save', this.basicForm).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
          this.basicShow = true
        }
      })
    },
    subCred () {
      this.$http.post('/member/companypage/seniority', { senioritys: this.checkCerds.join() }).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
          this.credShow = true
        }
      })
    },
    subImgs () {
      this.$http.post('/member/companypage/images', { imgs: this.imgsID, _method: 'put' }).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
          this.imgsShow = true
        }
      })
    },
    subInt () {
      this.$http.post('/member/companypage/describe', { content: this.content, _method: 'patch' }).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
          this.intShow = true
        }
      })
    },
    changeHeadShow () {
      this.avaShow = false
    },
    upSuccess (val) {
      this.avaShow = !this.avaShow
      this.request()
    },
    request () {
      this.$http.get('/member/companypage').then(res => {
        if (res.data.code == 200) {
          const data = res.data.data.company
          const detail = data.detail
          /* 基本信息 */
          this.name = data.company_name
          this.mobile = detail.office_mobile
          this.website = detail.official_website
          this.email = detail.enterprise_email
          this.fax = detail.fax_number
          this.address = detail.company_address
          this.mapxy = detail.map_pos || ''
          this.avatar = detail.avatar
          /* 表单 */
          this.basicForm.office_mobile = detail.office_mobile
          this.basicForm.fax_number = detail.fax_number
          this.basicForm.enterprise_email = detail.enterprise_email
          this.basicForm.official_website = detail.official_website
          this.basicForm.company_address = detail.company_address
          this.basicForm.map_pos = detail.map_pos
          /* 资质证书 */
          this.cerds = data.seniority || []
          /* 图片介绍 */
          this.imgs = detail.imgs || []
          /* 企业介绍 */
          this.content = detail.content
        }
      }).then(_ => {
        this.checkCerds = this.cerds.filter(value => value.isuse).map(value => value.id)
      })
    }
  },
  created () {
    this.request()
  }
}
</script>

<style scoped lang="less">
  .container{
    .icon-bianji{
      cursor: pointer;
    }
    width: 980px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px
    rgba(0, 0, 0, 0.1);
    padding: 0 40px;
    box-sizing: border-box;
    .preview{
      letter-spacing: 1px;
      color: #cccccc;
      padding: 14px 0 18px;
    }
    .basic{
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeeed;
      margin-bottom: 30px;
      h3{
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #333333;
        margin-bottom: 30px;
        i{
          margin-left: 74px;
          cursor: pointer;
        }
      }
      p{
        letter-spacing: 1px;
        color: #666666;
        margin-bottom: 30px;
        span{
          display: inline-block;
          width: 246px;
        }
        i{
          font-size: 16px !important;
          margin-right: 10px;
        }
      }
      .address{
        width: 100%;
        height: 56px;
        background-color: #ffffff;
        box-shadow: 0px -2px 4px 0px
        rgba(68, 68, 68, 0.1);
        line-height: 56px;
        letter-spacing: 1px;
        color: #666666;
        i{
          margin-left: 10px;
          margin-right: 10px;
        }
      }
    }
    .basicForm{
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeeed;
      margin-bottom: 30px;
      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        top: 20px;
        right: 20px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          cursor: pointer;
          object-fit: cover;
        }
      }
    }
    .head{
      display: flex;
      justify-content: space-between;
      .addExper{
        width: 110px;
        height: 28px;
        line-height: 28px;
        background-color: #ffffff;
        border-radius: 6px;
        border: solid 1px #cccccc;
        padding: 0;
        font-size: 12px;
        letter-spacing: 1px;
        color: #cccccc;
      }
      & > a{
        letter-spacing: 1px;
        color: #999999;
        display: inline !important;
        &:hover{
          color: #3388ff;
        }
      }
    }
    .cred,.editCred{
      margin-bottom: 50px;
    }
    .imgs,.editImgs{
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: solid 1px #eaeeed;
    }
    .imgList{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      img{
        width: 290px;
        height: 170px;
        object-fit: cover;
        margin-bottom: 10px;
      }
      .empty{
        width: 290px;
        height: 0;
      }
    }
    .introduce{
      padding-bottom: 20px;
      .content{
        line-height: 24px;
        letter-spacing: 1px;
        color: #666666;
        white-space: pre-wrap;
        padding: 0 17px;
      }
    }
  }
</style>

<style lang="less">
  .Com_resume{
    .el-form{
      width: 100%;
      background-color: #fafafd;
      padding: 20px 50px;
      box-sizing: border-box;
      position: relative;
      .el-input{
        width: 246px;
      }
    }
    .btns{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      .el-button{
        width: 184px;
        height: 41px;
        background-color: #3388ff;
        border-radius: 21px;
        margin-right: 50px;
      }
      & > span{
        font-size: 16px;
        letter-spacing: 2px;
        color: #999999;
        cursor: pointer;
      }
    }
    .images{
      .el-upload-list__item,.el-upload--picture-card{
        width: 285px;
        height: 170px;
      }
      .el-upload--picture-card{
        line-height: 170px;
      }
      .el-icon-plus{
        font-size: 28px !important;
      }
      img{
        object-fit: cover;
      }
    }
    .cerForm{
      padding: 0 5px 20px;
    }
  }
</style>
