<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="add_members" label-width="120px" class="add_members">
      <el-form-item label="姓     名：" prop="user_name">
        <el-input v-model="form.user_name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <papers :type.sync="form.card_type" :num.sync="form.card_num"></papers>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="年     龄：" prop="age">
        <el-input v-model="form.age" placeholder="请输入实际周岁"></el-input>
      </el-form-item>
      <el-form-item label="工     龄：" prop="work_time">
        <el-input v-model="form.work_time" placeholder="请输入工龄周期"></el-input>
      </el-form-item>
      <el-form-item label="邮     箱：" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱号码"></el-input>
      </el-form-item>
      <el-form-item label="团队负责人：" prop="is_leader">
        <el-select v-model="form.is_leader" placeholder="请选择">
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <div class="btns">
        <el-button type="primary" @click="subInt">保 存</el-button>
        <span @click="$router.go(-1)">取  消</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import papers from './components/form/papers'
export default {
  name: 'Add_members',
  components: { papers },
  data () {
    return {
      form: {
        tid: +this.$route.params.tid,
        user_name: '',
        card_type: 1,
        card_num: '',
        mobile: '',
        age: '',
        work_time: '',
        email: '',
        is_leader: 0
      },
      rules: {
        user_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        card_type: [{ required: true, trigger: 'blur' }],
        card_num: [{ required: true, message: '请输入证件号码', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        age: [{ required: true, message: '请输入实际周岁', trigger: 'blur' }],
        work_time: [{ required: true, message: '请输入工龄周期', trigger: 'blur' }],
        is_leader: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  computed: {
    /* _method (){
        if(this.$route.params.id) this.form._method = 'patch'
        else this.form._method = 'put'
      } */
    url () {
      if (this.$route.query.rank === 'plus') {
        if (this.$route.params.id) return '/member/teamMamber/updateM'
        else return '/member/team/teamMember'
      } else {
        if (this.$route.params.id) return '/member/teamMamber/update'
        else return '/member/teamMamber'
      }
    }
  },
  methods: {
    subInt () {
      this.$refs.add_members.validate((valid) => {
        if (valid) {
          this.$http.post(this.url, this.form).then(res => {
            if (res.data.code == 200) {
              if (this.$route.params.id === undefined) {
                if (this.$route.query.rank === 'plus') {
                  this.$store.commit('success', res.data.data.msg)
                  this.$router.push({ path: `/My_teamPlus/${res.data.data.id}` })
                } else {
                  this.$store.commit('success', res.data.msg)
                  this.$router.go(-1)
                }
              } else {
                this.$store.commit('success', res.data.msg)
                this.$router.go(-1)
              }
            }
          })
        } else {
          return false
        }
      })
    },
    getForm () {
      this.$http.get(`/member/teamMamber/${+this.$route.params.id}/edit`).then(res => {
        if (res.data.code == 200) {
          const data = res.data.data
          this.form['id'] = data.id
          this.form.user_name = data.user_name
          this.form.card_type = data.card_type.id
          this.form.card_num = data.card_num
          this.form.mobile = data.mobile
          this.form.age = data.age
          this.form.work_time = data.work_time
          this.form.email = data.email
          this.form.is_leader = data.is_leader
        }
      })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getForm()
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    width: 963px;
    background-color: #ffffff;
    padding: 40px 20px 20px;
    box-sizing: border-box;
  }
</style>

<style lang="less">
  .add_members{
    .el-form-item__label{
      white-space: pre-wrap;
    }
    .el-input{
      width: 246px;
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
