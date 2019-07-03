<template>
  <div class="container">
    <header>{{$route.params.id ? '编辑' : '发布'}}招聘信息</header>
    <el-form :model="form" :rules="rules" ref="recruit_form" label-width="100px" class="recruit_form">
      <el-form-item label="招聘标题：" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <recruitment :isEdit="isEdit" :one.sync="form.nature" :two.sync="form.recruit_type" :three.sync="form.work_type"></recruitment>
      <el-form-item label="所需人数：" prop="num">
        <el-input v-model="form.nums" placeholder="请输入所需人数(不填表示不限人数)"></el-input>
      </el-form-item>
      <el-form-item label="工龄要求：" prop="num">
        <el-input v-model="form.work_time" placeholder="请输入工龄要求(不填表示不限工龄)"></el-input>
      </el-form-item>
      <salary v-show="form.nature === 1" :value.sync="form.min_pay" :unit.sync="form.quantity_unit"></salary>
      <city :prov.sync="form.province" :city.sync="form.region"></city>
      <el-form-item label="开工时间：" prop="start_time">
        <el-date-picker
            v-model="form.start_time"
            type="month"
            value-format="yyyy-MM"
            placeholder="请选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工     期：" prop="construction_period">
        <el-input v-model="form.construction_period" placeholder="单位/天"></el-input>
      </el-form-item>
      <el-form-item label="信息描述：" prop="content">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="填写文字在3-200以上文字，介绍您的项目信息。"
            v-model="form.content">
        </el-input>
      </el-form-item>
      <div class="btns">
        <el-button type="primary" @click="subInt">保 存</el-button>
        <span @click="$router.go(-1)">取  消</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import recruitment from './components/form/recruitment'
import salary from './components/form/salary'
import city from './components/form/city'
export default {
  name: 'Recruit_form',
  components: { recruitment, salary, city },
  data () {
    return {
      isEdit: !!this.$route.params.id,
      form: {
        tid: this.$route.query.tid,
        publisher: this.$route.params.publisher,
        title: '',
        mobile: '',
        nature: 1,
        recruit_type: '',
        work_type: '',
        nums: '',
        work_time: '',
        min_pay: '',
        quantity_unit: 3,
        province: '',
        region: '',
        start_time: '',
        construction_period: '',
        content: ''
        // _method: this._method,
      },
      rules: {
        title: [{ required: true, message: '请填写标题', trigger: 'change' }],
        nature: [{ required: true, message: '请选择招聘类型', trigger: 'change' }],
        region: [{ required: true, message: '请选择工作地点', trigger: 'change' }],
        start_time: [{ required: true, message: '请选择开工时间', trigger: 'change' }],
        construction_period: [{ required: true, message: '请填写工期', trigger: 'change' }],
        content: [{ required: true, message: '请填写信息描述', trigger: 'change' }]
      }
    }
  },
  computed: {
    /* _method (){
        if(this.isEdit){
          this.form._method = 'patch'
        } else{
          this.form._method = 'put'
        }
      }, */
    isupdate () {
      if (this.isEdit) return '/update'
      else return ''
    },
    nums () {
      return this.form.nums
    }
  },
  methods: {
    subInt () {
      this.$refs.recruit_form.validate((valid) => {
        if (valid) {
          this.$http.post('/member/recruit' + this.isupdate, this.form).then(res => {
            if (res.data.code == 200) {
              this.$store.commit('success', res.data.msg)
              this.$router.go(-1)
            }
          })
        } else {
          return false
        }
      })
    },
    request () {
      this.$http.get(`/member/recruit/${this.$route.params.id}/edit`).then(res => {
        if (res.data.code == 200) {
          const detail = res.data.data.detail
          this.form['id'] = detail.id
          this.form.publisher = detail.publisher
          this.form.title = detail.title
          this.form.mobile = detail.mobile
          this.form.nature = detail.nature
          this.form.recruit_type = detail.recruit_type
          this.form.work_type = detail.work_type.id
          this.form.nums = detail.nums
          this.form.work_time = detail.work_time
          this.form.min_pay = detail.min_pay
          this.form.quantity_unit = detail.quantity_unit
          if (detail.region.length > 0) { this.form.province = detail.region[0].id }
          if (detail.region.length > 1) { this.form.region = detail.region[1].id }
          this.form.start_time = detail.start_time
          this.form.construction_period = detail.construction_period
          this.form.content = detail.content
        }
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.request()
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    background-color: #ffffff;
    header{
      width: 960px;
      height: 50px;
      box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.1);
      padding-left: 40px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      letter-spacing: 2px;
      color: #000003;
      margin-bottom: 5px;
    }
    .recruit_form{
      width: 963px;
      background-color: #ffffff;
      padding: 40px 20px 20px;
      box-sizing: border-box;
    }
  }
</style>

<style lang="less">
  .recruit_form{
    .el-form-item__label{
      white-space: pre-wrap;
    }
    .el-input{
      width: 300px;
    }
    textarea{
      width: 300px;
      height: 132px;
    }
    .btns{
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button{
        width: 184px;
        height: 41px;
        background-color: #3388ff;
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
</style>
