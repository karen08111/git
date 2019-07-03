<template>
  <div class="content My_resume">
    <div class="basic" v-show="basicShow">
      <div class="PVW"><!--预览简历--></div>
      <h1>
        {{name}}
        <span class="sex"><i class="iconfont" :class="sex"></i></span>
        <span>{{work_type}}</span>
        <span class="part">|</span>
        <span>{{min_pay}}</span>
        <i class="iconfont icon-bianji" @click="basicShow = false"></i>
      </h1>
      <p>
        <span>工龄：{{year}}年</span>
        <span class="part">|</span>
        <!--<span>{{age}}岁</span>-->
        <!--<span class="part">|</span>-->
        <span>{{has_bad_medical_history}}病史</span>
        <span class="part">|</span>
        <span>{{region}}</span>
      </p>
      <p>
        <span><i class="iconfont icon-dianhua"></i>{{mobile}}</span>
        <span v-if="wechat_number"><i class="iconfont icon-weixin"></i>{{wechat_number}}</span>
      </p>
      <div class="avatar">
        <img v-if="avatar" :src="$store.state.site + avatar" :onerror="$store.state.defaultImg" alt="" @click="avaShow = !avaShow">
        <img v-else src="../../assets/none.png" alt="" @click="avaShow = !avaShow">
      </div>
    </div>
    <div class="basicForm" v-show="!basicShow">
      <headline h4="基本信息" span="完善基本信息，展示更好自己" style="margin-bottom: 18px;"></headline>
      <el-form :model="basicForm" label-width="120px">
        <el-form-item label="简历标题：">
          <el-input v-model="basicForm.title" placeholder="请填写您的简历标题"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="basicForm.name" placeholder="请填写您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="basicForm.sex" placeholder="请选择">
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="未知" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日：">
          <el-date-picker
              v-model="basicForm.birth"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <workType :one.sync="basicForm.resume_type" :two.sync="basicForm.work_type"></workType>
        <workStatus :value.sync="basicForm.current_state"></workStatus>
        <el-form-item label="有无重大病史：">
          <el-select v-model="basicForm.has_bad_medical_history" placeholder="请选择">
            <el-option label="无" :value="0"></el-option>
            <el-option label="有" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微 信 号：">
          <el-input v-model="basicForm.wechat_number" placeholder="请填写您的微信号"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="basicForm.mobile" placeholder="请输入您的联系方式"></el-input>
        </el-form-item>
        <el-form-item label="参加工作时间：">
          <el-date-picker
              v-model="basicForm.work_time"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <city :prov.sync="basicForm.province" :city.sync="basicForm.region"></city>
        <salary :value.sync="basicForm.min_pay" :unit.sync="basicForm.quantity_unit"></salary>
        <div class="btns">
          <el-button type="primary" @click="subBasic">保 存</el-button>
          <span @click="basicShow = true">取  消</span>
        </div>
        <div class="avatar">
          <img v-if="avatar" :src="$store.state.site + avatar" :onerror="$store.state.defaultImg" alt="" @click="avaShow = !avaShow">
          <img v-else src="../../assets/none.png" alt="" @click="avaShow = !avaShow">
        </div>
      </el-form>
    </div>
    <template v-if="showAll">
      <div class="head">
        <headline h4="工作经历" span="" style="margin-bottom: 38px;"></headline>
        <el-button class="addExper" @click="editPer('','put')">添加工作经历</el-button>
      </div>
      <div class="exper">
        <experience v-show="expers.length > 0" :list.sync="expers" @edit="editPer($event,'patch','jobcase/update')" @del="request()"></experience>
        <div class="nothing" v-show="expers.length === 0 && experShow">暂无</div>
        <div class="experForm" v-show="!experShow">
          <el-form :model="experForm" label-width="120px">
            <el-form-item label="工作单位名称：">
              <el-input v-model="experForm.ach_name" placeholder="请填写您的工作单位名称"></el-input>
            </el-form-item>
            <workType :one.sync="experForm.resume_type" :two.sync="experForm.job_type"></workType>
            <timeSelect :start.sync="experForm.start_time" :end.sync="experForm.end_time"></timeSelect>
            <city :prov.sync="experForm.province" :city.sync="experForm.region"></city>
            <el-form-item label="经历说明：">
              <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="填写文字在3-200以上文字，填写的详情让企业更了解你、"
                  v-model="experForm.content">
              </el-input>
            </el-form-item>
            <div class="btns">
              <el-button type="primary" @click="subExper">保 存</el-button>
              <span @click="experShow = true; request();">取  消</span>
            </div>
          </el-form>
        </div>
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
      <div class="introduce" v-show="intShow">
        <div class="head">
          <headline h4="个人介绍" span="" style="margin-bottom: 40px;"></headline>
          <i class="iconfont icon-bianji" @click="intShow = false"></i>
        </div>
        <div class="content" v-if="content">{{content}}</div>
        <div class="nothing" v-else>暂无</div>
      </div>
      <div class="editInt" v-show="!intShow">
        <headline h4="个人介绍" span="填写个人介绍，完善全面的自己" style="margin-bottom: 40px;"></headline>
        <el-form label-width="120px">
          <el-form-item label="个人介绍：">
            <el-input
                type="textarea"
                :rows="5"
                placeholder="填写文字在3-200以上文字，填写的详情让企业更了解你、"
                v-model="content">
            </el-input>
          </el-form-item>
          <div class="btns">
            <el-button type="primary" @click="subInt">保 存</el-button>
            <span @click="intShow = true">取  消</span>
          </div>
        </el-form>
      </div>
    </template>
    <Head_upload v-if="avaShow" url="/member/resume/avatarMany" :rid="+$route.params.id" @changeHeadShow="changeHeadShow" @upSuccess="upSuccess"></Head_upload>
  </div>
</template>

<script>
import Head_upload from '@/components/pub/Head_upload'
import workType from './components/form/workType'
import workStatus from './components/form/workStatus'
import city from './components/form/city'
import salary from './components/form/salary'
import experience from './components/experience'
import timeSelect from './components/form/timeSelect'
import Aptitude from './components/form/Aptitude'
export default {
  name: 'My_resumePlus',
  components: { workType, workStatus, city, salary, Head_upload, experience, timeSelect, Aptitude },
  data () {
    return {
      showAll: true,
      basicShow: true,
      experShow: true,
      credShow: true,
      intShow: true,
      avaShow: false,
      name: '',
      sex: '',
      work_type: '',
      min_pay: '',
      year: '',
      age: '',
      has_bad_medical_history: '',
      region: '',
      mobile: '',
      wechat_number: '',
      avatar: null,
      work_types: [],
      basicForm: {
        id: +this.$route.params.id || '',
        title: null,
        name: null,
        sex: 1,
        birth: null,
        work_type: null,
        resume_type: null,
        current_state: 0,
        has_bad_medical_history: 0,
        wechat_number: null,
        mobile: null,
        work_time: null,
        province: null,
        region: null,
        min_pay: null,
        quantity_unit: null,
        _method: 'put'
      },
      expers: [],
      experForm: {
        tid: +this.$route.params.id || '',
        nature: 1,
        ach_name: '',
        resume_type: '',
        job_type: '',
        start_time: '',
        end_time: '',
        province: '',
        region: '',
        content: '',
        _method: 'put'
      },
      experWay: '',
      cerds: [],
      checkCerds: [],
      content: ''
    }
  },
  watch: {
    '$route' () {
      this.basicForm.id = +this.$route.params.id
      this.experForm.tid = +this.$route.params.id
    }
  },
  methods: {
    subBasic () {
      this.$http.post('/member/resume/insertM', this.basicForm).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.data.msg)
          if (res.data.data.id) { this.$router.push({ path: `/My_resumePlus/${res.data.data.id}` }) }
          this.request()
          this.showAll = true
          this.basicShow = true
        }
      })
    },
    subExper () {
      if (!this.experForm.end_time) {
        this.experForm.end_time = 0
      }
      this.$http.post('/member/' + this.experWay, this.experForm).then(res => {
        if (res.data.code == 200) {
          if (this.experWay == 'resume/saveJobCase') {
            this.$store.commit('success', res.data.data.msg)
            if (res.data.data.id) { this.$router.push({ path: `/My_resumePlus/${res.data.data.id}` }) }
          } else {
            this.$store.commit('success', res.data.msg)
          }
          this.request()
          this.experShow = true
        }
      })
    },
    subCred () {
      const req = {
        id: this.$route.params.id,
        senioritys: this.checkCerds.join(),
        _method: 'patch'
      }
      this.$http.post('/member/resume/senioritys', req).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.data.msg)
          if (res.data.data.id) { this.$router.push({ path: `/My_resumePlus/${res.data.data.id}` }) }
          this.request()
          this.credShow = true
        }
      })
    },
    subInt () {
      this.$http.post('/member/resume/content', { id: this.$route.params.id, content: this.content, _method: 'patch' }).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.data.msg)
          if (res.data.data.id) { this.$router.push({ path: `/My_resumePlus/${res.data.data.id}` }) }
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
      if (val.id) { this.$router.push({ path: `/My_resumePlus/${val.id}` }) }
      this.request()
    },
    editPer (val, meth, way = 'resume/saveJobCase') {
      if (way != 'resume/saveJobCase') {
        this.$http.get('/member/jobcase/' + val + '/edit').then(res => {
          if (res.data.code == 200) {
            const data = res.data.data
            this.experForm.ach_name = data.ach_name
            this.experForm.resume_type = data.job_type.parent.id
            this.experForm.job_type = data.job_type.Sub.id
            this.experForm.start_time = data.start_time
            this.experForm.end_time = data.end_time === '至今' ? '' : data.end_time
            if (data.region.length > 0) {
              this.experForm.province = data.region[0].id
            }
            if (data.region.length > 1) {
              this.experForm.region = data.region[1].id
            }
            this.experForm.content = data.content
            this.experForm['id'] = data.id
          }
        })
      }
      this.experShow = false
      for (let i in this.experForm) {
        if (i != 'tid') { this.experForm[i] = '' }
      }
      this.experForm.nature = 1
      this.experWay = way
      this.experForm._method = meth
      setTimeout(() => {
        document.getElementsByClassName('experForm')[0].scrollIntoView()
      }, 0)
    },
    request () {
      /* 基本信息 */
      this.$http.get(`/member/resume/editMany/${this.$route.params.id}`).then(res => {
        if (res.data.code == 200) {
          const detail = res.data.data.detail
          if (detail.work_type) { this.work_type = detail.work_type.title }
          this.min_pay = detail.min_pay == 0 && '面议' || `${detail.min_pay}/${detail.quantity_unit.unit}`
          if (detail.work_time) { this.year = detail.work_time[0] }
          this.has_bad_medical_history = detail.has_bad_medical_history == 0 ? '无' : '有'
          this.region = detail.region.map(value => value.title).join('')
          this.mobile = detail.mobile
          this.wechat_number = detail.wechat_number
          this.avatar = detail.avatar
          this.name = detail.name
          /* 表单 */
          this.basicForm.resume_type = detail.resume_type
          this.basicForm.title = detail.title
          this.basicForm.name = detail.name
          this.basicForm.sex = detail.sex
          this.basicForm.birth = detail.birth
          if (detail.work_type) { this.basicForm.work_type = detail.work_type.id }
          if (detail.current_state) { this.basicForm.current_state = detail.current_state }
          this.basicForm.wechat_number = detail.wechat_number
          this.basicForm.mobile = detail.mobile
          if (detail.work_time) { this.basicForm.work_time = detail.work_time[1] }
          if (detail.region.length > 0) {
            this.basicForm.province = detail.region[0].id
          }
          if (detail.region.length > 1) {
            this.basicForm.region = detail.region[1].id
          }
          this.basicForm.min_pay = detail.min_pay
          this.basicForm.quantity_unit = detail.quantity_unit.id
          /* 工作经历 */
          this.expers = res.data.data.job_case
          /* 资质证书 */
          this.cerds = res.data.data.seniority
          /* 个人介绍 */
          this.content = detail.content
        }
      }).then(_ => {
        this.checkCerds = this.cerds.filter(value => value.isuse).map(value => value.id)
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.request()
    } else {
      this.showAll = false
      this.basicShow = false
    }
  }
}
</script>

<style scoped lang="less">
  .My_resume{
    width: 980px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px
    rgba(0, 0, 0, 0.1);
    padding: 14px 40px 0;
    box-sizing: border-box;
    overflow: hidden;
    .icon-bianji{
      cursor: pointer;
    }
    span.part{
      margin-left: 20px;
      margin-right: 20px;
    }
    .PVW{
      letter-spacing: 1px;
      color: #cccccc;
      margin-bottom: 18px;
    }
    .basic{
      padding-bottom: 21px;
      border-bottom: 1px solid #eaeeed;
      margin-bottom: 30px;
      position: relative;
      &:hover{
        background-color: #fafafb;
        h1 > i{
          opacity: 1;
        }
      }
      h1{
        font-size: 24px;
        letter-spacing: 2px;
        color: #333333;
        margin-bottom: 40px;
        span{
          font-size: 20px;
          letter-spacing: 2px;
          color: #666666;
          &.part{
            font-size: 18px;
          }
        }
        & > i{
          color: #3388ff;
          margin-left: 74px;
          opacity: 0;
        }
      }
      p{
        &:first-of-type{
          margin-bottom: 40px;
        }
        &:last-of-type{
          span{
            margin-right: 40px;
          }
          i{
            font-size: 16px !important;
          }
        }
        span{
          letter-spacing: 1px;
          color: #666666;
          &.part{
            font-size: 12px;
          }
        }
      }
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
      .icon-nan{
        color: #75b9eb !important;
        margin-right: 5px;
      }
      .icon-nv{
        color: #ff74ab !important;
        margin-right: 5px;
      }
    }
    .basicForm{
      padding-top: 29px;
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
    .exper{
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
      .date{
        width: 120px !important;
        height: 36px !important;
        &:first-of-type{
          margin-right: 10px;
        }
      }
    }
    .cred{
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
      &:hover{
        ul{
          background-color: #fafafb;
        }
        i{
          display: block;
        }
      }
      i{
        color: #3388ff;
        display: none;
      }
    }
    .editCred{
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
      .btns{
        margin-top: 40px;
      }
    }
    .introduce{
      padding-bottom: 30px;
      &:hover{
        .content{
          background-color: #fafafb;
        }
        i{
          display: block;
        }
      }
      .content{
        line-height: 24px;
        letter-spacing: 1px;
        color: #666666;
        white-space: pre-wrap;
        padding: 0 17px 20px;
      }
      i{
        display: none;
        color: #3388ff !important;
      }
    }
    .nothing{
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
</style>

<style lang="less">
  .content{
    .el-form{
      padding: 20px;
      background-color: #fafafd;
      margin-bottom: 33px;
      position: relative;
      .el-form-item{
        margin-bottom: 30px;
        .el-form-item__label{
          font-size: 14px;
          letter-spacing: 1px;
          color: #999999;
        }
        .el-input{
          width: 246px;
        }
        textarea{
          width: 420px;
          height: 166px;
        }
      }
      .btns{
        display: flex;
        justify-content: center;
        align-items: center;
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
    }
    .cerForm{
      padding: 0 5px 20px;
    }
  }
</style>
