<template>
  <div class="content My_team">
    <div class="basic" v-show="basicShow">
      <div class="PVW"><!--预览简历--></div>
      <h1>
        {{name}}
        <span>{{type}}</span>
        <i class="iconfont icon-bianji" @click="basicShow = false"></i>
      </h1>
      <p>
        <span>平均工龄：{{year}}年</span>
        <span class="part">|</span>
        <span>{{number}}人</span>
        <span class="part">|</span>
        <span>{{age}}岁</span>
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
        <trade :value.sync="basicForm.industry_type"></trade>
        <el-form-item label="团队名称：">
          <el-input v-model="basicForm.team_name" placeholder="请填写您的团队名称"></el-input>
        </el-form-item>
        <el-form-item label="微 信 号：">
          <el-input v-model="basicForm.wechat_number" placeholder="请填写您的微信号"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="basicForm.mobile" placeholder="请输入您的联系方式"></el-input>
        </el-form-item>
        <city :prov.sync="basicForm.province" :city.sync="basicForm.region"></city>
        <el-form-item label="团队成立时间：">
          <el-date-picker
              v-model="basicForm.team_create_time"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
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
    <div class="head">
      <headline h4="工程业绩" span="" style="margin-bottom: 38px;"></headline>
    </div>
    <div class="exper">
      <experience v-show="expers.length > 0" :list.sync="expers" @edit="editPer($event,'patch','update')" @del="request()"></experience>
      <div class="nothing" v-show="expers.length === 0 && experShow">暂无</div>
      <div class="experForm" v-show="!experShow">
        <el-form :model="experForm" label-width="120px">
          <el-form-item label="工程业绩名称：">
            <el-input v-model="experForm.ach_name" placeholder="请填写您的工程业绩名称"></el-input>
          </el-form-item>
          <trade :value.sync="experForm.job_type"></trade>
          <timeSelect :start.sync="experForm.start_time" :end.sync="experForm.end_time"></timeSelect>
          <city :prov.sync="experForm.province" :city.sync="experForm.region"></city>
          <el-form-item label="工程说明：">
            <el-input
                type="textarea"
                :rows="5"
                placeholder="填写文字在3-200以上文字，填写的详情让企业更了解你、"
                v-model="experForm.content">
            </el-input>
          </el-form-item>
          <div class="btns">
            <el-button type="primary" @click="subEpxer">保 存</el-button>
            <span @click="experShow = true; request();">取  消</span>
          </div>
        </el-form>
      </div>
      <div class="addEBox" v-show="experShow"><el-button class="addExper" @click="editPer('','put')">添加工作经历</el-button></div>
    </div>
    <div class="introduce" v-show="intShow">
      <div class="head">
        <headline h4="团队介绍" span="" style="margin-bottom: 40px;"></headline>
        <i class="iconfont icon-bianji" @click="intShow = false"></i>
      </div>
      <div class="content" v-if="content">{{content}}</div>
      <div class="nothing" v-else>暂无</div>
    </div>
    <div class="editInt" v-show="!intShow">
      <headline h4="团队介绍" span="填写团队介绍，展现团队实力" style="margin-bottom: 40px;"></headline>
      <el-form label-width="120px">
        <el-form-item label="团队介绍：">
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
    <Head_upload v-if="avaShow" url="/member/team/avatar" @changeHeadShow="changeHeadShow" @upSuccess="upSuccess"></Head_upload>
  </div>
</template>

<script>
import Head_upload from '@/components/pub/Head_upload'
import trade from './components/form/trade'
import workStatus from './components/form/workStatus'
import city from './components/form/city'
import salary from './components/form/salary'
import experience from './components/experience'
import timeSelect from './components/form/timeSelect'
import Aptitude from './components/form/Aptitude'
export default {
  name: 'My_team',
  components: { trade, workStatus, city, salary, Head_upload, experience, timeSelect, Aptitude },
  data () {
    return {
      basicShow: true,
      experShow: true,
      credShow: true,
      intShow: true,
      avaShow: false,
      name: '',
      type: '',
      team_create_time: '',
      year: '',
      age: '',
      number: '',
      region: '',
      mobile: '',
      wechat_number: '',
      avatar: null,
      work_types: [],
      basicForm: {
        industry_type: null,
        team_name: null,
        wechat_number: null,
        mobile: null,
        team_create_time: null,
        province: null,
        region: null,
        _method: 'put'
      },
      expers: [],
      experForm: {
        tid: '',
        nature: 2,
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
      content: ''
    }
  },
  methods: {
    subBasic () {
      this.$http.post('/member/team', this.basicForm).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
          this.basicShow = true
        }
      })
    },
    subEpxer () {
      if (!this.experForm.end_time) {
        this.experForm.end_time = 0
      }
      this.$http.post('/member/jobcase/' + this.experWay, this.experForm).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
          this.experShow = true
        }
      })
    },
    subInt () {
      this.$http.post('/member/team/describe', { content: this.content, _method: 'post' }).then(res => {
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
    editPer (val, meth, way = 'save') {
      if (way != 'save') {
        this.$http.get('/member/jobcase/' + val + '/edit').then(res => {
          if (res.data.code == 200) {
            const data = res.data.data
            this.experForm.ach_name = data.ach_name
            this.experForm.job_type = data.job_type.id
            this.experForm.start_time = data.start_time
            this.experForm.end_time = data.end_time = data.end_time === '至今' ? '' : data.end_time
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
      this.experForm.nature = 2
      this.experWay = way
      this.experForm._method = meth
      setTimeout(() => {
        document.getElementsByClassName('experForm')[0].scrollIntoView()
      }, 0)
    },
    request () {
      /* 基本信息 */
      this.$http.get('/member/team/edit').then(res => {
        if (res.data.code == 200) {
          const data = res.data.data.data
          this.experForm.tid = data.id
          this.name = data.team_name
          if (data.region) {
            let arr = []
            for (let i of data.region) {
              arr.push(i.title)
            }
            this.region = arr.join('')
          }
          this.mobile = data.mobile
          this.wechat_number = data.wechat_number
          this.age = data.avg_age
          this.year = data.avg_work_time
          this.number = data.nums
          this.avatar = data.avatar
          /* 表单 */
          this.basicForm.industry_type = data.industry_type.id
          this.basicForm.team_name = data.team_name
          this.basicForm.wechat_number = data.wechat_number
          this.basicForm.mobile = data.mobile
          if (data.region.length > 0) this.basicForm.province = data.region[0].id
          if (data.region.length > 1) this.basicForm.region = data.region[1].id
          this.basicForm.team_create_time = data.team_create_time[1]
          /* 工程业绩 */
          this.experForm.tid = data.id
          this.expers = res.data.data.jobCase
          /* 团队介绍 */
          this.content = data.content
        }
      })
    }
  },
  created () {
    this.request()
  }
}
</script>

<style scoped lang="less">
  .My_team{
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
        h1 i{
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
        i{
          color: #3388ff;
          opacity: 0;
          margin-left: 74px;
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
      .addEBox{
        text-align: center;
        padding: 10px 0;
        margin-bottom: 10px;
        &:hover{
          background-color: #fafafb;
        }
        .addExper{
          width: 110px;
          height: 28px;
          line-height: 28px;
          background-color: #ffffff;
          border-radius: 6px;
          border: solid 1px #34495e;
          padding: 0;
          font-size: 12px;
          letter-spacing: 1px;
          color: #34495e;
        }
      }
    }
    .cred{
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
    }
    .editCred{
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
      .btns{
        margin-top: 40px;
      }
    }
    .introduce{
      &:hover{
        .content{
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
      .content{
        line-height: 24px;
        letter-spacing: 1px;
        color: #666666;
        white-space: pre-wrap;
        padding: 0 17px 20px;
        margin-bottom: 20px;
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
  }
</style>
