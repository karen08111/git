<template>
  <div class="content My_team">
    <div class="disp">
      <p>简历可见设置<span>隐藏简历后，在前台页面无法展示</span></p>
      <el-switch
          v-model="is_show"
          @change="sh"
          active-color="#3388ff"
          inactive-color="#8d92a1">
      </el-switch>
    </div>
    <div class="basic" v-show="basicShow">
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
        <img v-if="avatar" :src="$store.state.site + avatar" :onerror="$store.state.defaultImg" alt=""
             @click="avaShow = !avaShow">
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
        <el-form-item label="团队人数：">
          <el-input v-model="basicForm.nums" placeholder="请填写您的团队人数"></el-input>
        </el-form-item>
        <el-form-item label="平均年龄：">
          <el-input v-model="basicForm.avg_age" placeholder="请填写您的团队平均年龄"></el-input>
        </el-form-item>
        <el-form-item label="平均工龄：">
          <el-input v-model="basicForm.avg_work_time" placeholder="请填写您的团队平均工龄"></el-input>
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
          <img v-if="avatar" :src="$store.state.site + avatar" :onerror="$store.state.defaultImg" alt=""
               @click="avaShow = !avaShow">
          <img v-else src="../../assets/none.png" alt="" @click="avaShow = !avaShow">
        </div>
      </el-form>
    </div>
    <template v-if="showAll">
      <div class="head">
        <headline h4="工程业绩" span="" style="margin-bottom: 38px;"></headline>
      </div>
      <div class="exper">
        <experience v-show="expers.length > 0" :list.sync="expers" @edit="editPer($event,'patch','jobcase/update')"
                    @del="request()"></experience>
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
        <div class="addEBox" v-show="experShow">
          <el-button class="addExper" @click="editPer('','put')">添加工作经历</el-button>
        </div>
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
      <div class="member">
        <div class="mheader">
          <headline h4="团队成员" span="" style="margin-bottom: 20px;"></headline>
          <router-link :to="`/Add_members/${+$route.params.id}?rank=plus`">
            <div class="btn"><i class="iconfont icon-jia1"></i>添加成员</div>
          </router-link>
        </div>
        <el-table
            :data="memList"
            height="485"
            style="width: 100%;">
          <el-table-column
              prop="user_name"
              label="姓    名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="age"
              label="年    龄"
              width="180">
          </el-table-column>
          <el-table-column
              prop="work_time"
              label="工    龄">
          </el-table-column>
          <el-table-column
              prop="mobile"
              label="手机号码">
          </el-table-column>
          <el-table-column
              prop="isfu"
              label="团队负责人">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <div class="handleBtns">
                <el-button @click="editm(scope.row.id)" type="primary" size="small">编辑</el-button>
                <el-button @click="delm(scope.row.id)" type="primary" plain size="small">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <paging :total="memTotal" :size="memSize" :page.sync="memPage" style="text-align: right"></paging>
      </div>
    </template>
    <Head_upload v-if="avaShow" url="/member/team/avatarM" :rid="+$route.params.id" @changeHeadShow="changeHeadShow"
                 @upSuccess="upSuccess"></Head_upload>
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
import paging from '@/components/need/components/paging'

export default {
  name: 'My_teamPlus',
  components: { trade, workStatus, city, salary, Head_upload, experience, timeSelect, Aptitude, paging },
  data () {
    return {
      showAll: true,
      basicShow: true,
      experShow: true,
      credShow: true,
      intShow: true,
      avaShow: false,
      is_show: true,
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
        id: this.$route.params.id,
        industry_type: null,
        team_name: null,
        nums: null,
        avg_age: null,
        avg_work_time: null,
        wechat_number: null,
        mobile: null,
        team_create_time: null,
        province: null,
        region: null,
        _method: 'put'
      },
      expers: [],
      experForm: {
        tid: this.$route.params.id,
        nature: 2,
        ach_name: '',
        resume_type: '',
        job_type: '',
        start_time: '',
        end_time: '',
        province: '',
        region: '',
        content: ''
        // _method: 'put',
      },
      experWay: '',
      content: '',
      memList: [],
      memTotal: 0,
      memPage: 1,
      memSize: 15
    }
  },
  watch: {
    memPage () {
      this.getMember()
    }
  },
  methods: {
    subBasic () {
      this.$http.post('/member/team/saveM', this.basicForm).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.data.msg)
          if (res.data.data.id) { this.$router.push({ path: `/My_teamPlus/${res.data.data.id}` }) }
          this.request()
          this.showAll = true
          this.basicShow = true
        }
      })
    },
    subEpxer () {
      if (!this.experForm.end_time) {
        this.experForm.end_time = 0
      }
      this.$http.post('/member/' + this.experWay, this.experForm).then(res => {
        if (res.data.code == 200) {
          if (this.experWay == 'team/saveJobCase') {
            this.$store.commit('success', res.data.data.msg)
            if (res.data.data.id) { this.$router.push({ path: `/My_teamPlus/${res.data.data.id}` }) }
          } else {
            this.$store.commit('success', res.data.msg)
          }

          this.request()
          this.experShow = true
        }
      })
    },
    subInt () {
      this.$http.post('/member/team/content', { id: this.$route.params.id, content: this.content }).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.data.msg)
          if (res.data.data.id) { this.$router.push({ path: `/My_teamPlus/${res.data.data.id}` }) }
          this.request()
          this.intShow = true
        }
      })
    },
    changeHeadShow () {
      this.avaShow = false
    },
    upSuccess (val) {
      console.log(val)
      this.avaShow = !this.avaShow
      if (val.id) {
        this.$router.push({ path: `/My_teamPlus/${val.id}` })
      }
      this.request()
    },
    editPer (val, meth, way = 'team/saveJobCase') {
      if (way != 'team/saveJobCase') {
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
      // this.experForm._method = meth
      setTimeout(() => {
        document.getElementsByClassName('experForm')[0].scrollIntoView()
      }, 0)
    },
    request () {
      /* 基本信息 */
      this.$http.get(`/member/team/editM/${this.$route.params.id}`).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
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
          this.is_show = data.is_show && true || false
          /* 表单 */
          this.basicForm.industry_type = data.industry_type.id
          this.basicForm.team_name = data.team_name
          this.basicForm.nums = data.nums
          this.basicForm.avg_age = data.avg_age
          this.basicForm.avg_work_time = data.avg_work_time
          this.basicForm.wechat_number = data.wechat_number
          this.basicForm.mobile = data.mobile
          if (data.region.length > 0) this.basicForm.province = data.region[0].id
          if (data.region.length > 1) this.basicForm.region = data.region[1].id
          this.basicForm.team_create_time = data.team_create_time[1]
          /* 工程业绩 */
          this.expers = data.job_case
          /* 团队介绍 */
          this.content = data.content
        }
      })
    },
    getMember () {
      /* 团队成员列表 */
      this.$http.post('member/teamMamber/index', { tid: this.$route.params.id, page: this.memPage }).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data

          data.data.forEach(value => value.is_leader ? value['isfu'] = '是' : value['isfu'] = '否')
          this.memList = data.data
          this.memTotal = data.all
          this.memPage = data.current_page
          this.memSize = data.per_page
        }
      })
    },
    editm (id) {
      this.$router.push({ name: 'Add_members', params: { tid: this.$route.params.id, id: id }, query: { rank: 'plus' } })
    },
    delm (id) {
      this.$confirm('是否确认删除成员', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/member/teamMamber/deleteM', { id: id, tid: this.$route.params.id }).then(res => {
          if (res.data.code == 200) {
            this.$store.commit('success', res.data.msg)
            this.getMember()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    sh (val) {
      let str
      if (!val) str = 'setHide'
      else str = 'setShow'
      this.$http.get(`/member/team/${this.$route.params.id}/${str}`).then(res => {
        if (res.data.code == 200) {
          this.$store.commit('success', res.data.msg)
          this.request()
        }
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.request()
      this.getMember()
    } else {
      this.showAll = false
      this.basicShow = false
    }
  }
}
</script>

<style scoped lang="less">
  .My_team {
    width: 980px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    padding: 14px 40px 0;
    box-sizing: border-box;
    overflow: hidden;

    .icon-bianji {
      cursor: pointer;
    }

    span.part {
      margin-left: 20px;
      margin-right: 20px;
    }

    .PVW {
      letter-spacing: 1px;
      color: #cccccc;
      margin-bottom: 18px;
    }

    .disp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 52px;
      border-bottom: 1px dashed #cccccc;
      margin-bottom: 20px;

      p {
        letter-spacing: 1px;
        color: #34495e;

        span {
          font-size: 12px;
          letter-spacing: 1px;
          color: #999999;
          margin-left: 20px;
        }
      }
    }

    .basic {
      padding-bottom: 21px;
      border-bottom: 1px solid #eaeeed;
      margin-bottom: 30px;
      position: relative;

      &:hover {
        background-color: #fafafb;

        h1 i {
          display: inline-block;
        }
      }

      h1 {
        font-size: 24px;
        letter-spacing: 2px;
        color: #333333;
        margin-bottom: 40px;

        span {
          font-size: 20px;
          letter-spacing: 2px;
          color: #666666;

          &.part {
            font-size: 18px;
          }
        }

        i {
          color: #3388ff;
          display: none;
          margin-left: 74px;
        }
      }

      p {
        &:first-of-type {
          margin-bottom: 40px;
        }

        &:last-of-type {
          span {
            margin-right: 40px;
          }

          i {
            font-size: 16px !important;
          }
        }

        span {
          letter-spacing: 1px;
          color: #666666;

          &.part {
            font-size: 12px;
          }
        }
      }

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        top: 20px;
        right: 20px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          cursor: pointer;
          object-fit: cover;
        }
      }
    }

    .basicForm {
      padding-top: 29px;

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        top: 20px;
        right: 20px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          cursor: pointer;
          object-fit: cover;
        }
      }
    }

    .head {
      display: flex;
      justify-content: space-between;

      .addExper {
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

      & > a {
        letter-spacing: 1px;
        color: #999999;
        display: inline !important;

        &:hover {
          color: #3388ff;
        }
      }
    }

    .exper {
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;

      .date {
        width: 120px !important;
        height: 36px !important;

        &:first-of-type {
          margin-right: 10px;
        }
      }

      .addEBox {
        text-align: center;
        padding: 10px 0;
        margin-bottom: 10px;

        &:hover {
          background-color: #fafafb;
        }

        .addExper {
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

    .cred {
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;
    }

    .editCred {
      border-bottom: 1px solid #cccccc;
      margin-bottom: 30px;

      .btns {
        margin-top: 40px;
      }
    }

    .introduce {
      &:hover {
        .content {
          background-color: #fafafb;
        }

        i {
          display: block;
        }
      }

      i {
        color: #3388ff;
        display: none;
      }

      .content {
        line-height: 24px;
        letter-spacing: 1px;
        color: #666666;
        white-space: pre-wrap;
        padding: 0 17px 20px;
      }
    }

    .nothing {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
</style>

<style lang="less">
  .content {
    .el-form {
      padding: 20px;
      background-color: #fafafd;
      margin-bottom: 33px;
      position: relative;

      .el-form-item {
        margin-bottom: 30px;

        .el-form-item__label {
          font-size: 14px;
          letter-spacing: 1px;
          color: #999999;
        }

        .el-input {
          width: 246px;
        }

        textarea {
          width: 420px;
          height: 166px;
        }
      }

      .btns {
        display: flex;
        justify-content: center;
        align-items: center;

        .el-button {
          width: 184px;
          height: 41px;
          background-color: #3388ff;
          border-radius: 21px;
          margin-right: 50px;
        }

        & > span {
          font-size: 16px;
          letter-spacing: 2px;
          color: #999999;
          cursor: pointer;
        }
      }
    }

    .member {
      padding-bottom: 20px;

      .mheader {
        display: flex;
        justify-content: space-between;

        .btn {
          color: #3388ff;

          i {
            color: #3388ff;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }

    .header {
      /*padding: 40px 40px 40px 52px;*/
      width: 100%;
      height: 60px;
      /*padding: 0 40px;*/
      box-sizing: border-box;
      display: flex;
      /*justify-content: flex-end;*/
      align-items: center;
    }

    .cell {
      text-align: center;
    }

    .el-table {
      &::before {
        height: 0;
      }
    }

    .el-table__header-wrapper {
      margin-bottom: 3px;
      /*box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.1);*/
    }

    thead {
      background-color: #fafafd;

      tr {
        background-color: #f3f9ff;

        th {
          background-color: transparent;
          border-bottom: none !important;

          .cell {
            line-height: 1;
          }

          &:not(:last-of-type) .cell {
            border-right: 1px solid #34495e;
          }
        }

        th {
          padding: 22px 0 !important;

          &:last-of-type {
            /*box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.1);*/
            margin-bottom: 3px;
          }
        }
      }
    }

    .el-table__fixed-right::before {
      height: 0;
    }

    td, th.is-leaf {
      border-bottom: 1px dashed #ebeef5;
    }

    .handleBtns {
      display: flex;
      flex-direction: column;
      align-items: center;

      .el-button {
        margin-left: 0;
        width: 47px;
        height: 22px;
        padding: 0;

        &:first-of-type {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
