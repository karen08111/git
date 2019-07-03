<template>
  <div>
    <Header></Header>
    <div class="personal-content">
      <div class="password">密码管理</div>
      <div class="forms">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="原密码"
                        prop="passwd">
            <el-input v-model="ruleForm.passwd"
                      placeholder="请输入原密码"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="newPasswd">
            <el-input v-model="ruleForm.newPasswd"
                      placeholder="请输入新密码"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="rePasswd">
            <el-input v-model="ruleForm.rePasswd"
                      placeholder="确认密码"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary"
                       @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="personal-content">
      <div class="password">工资代发管理</div>
      <div class="forms">
        <el-form :model="larForm"
                 :rules="larRules"
                 ref="larForm"
                 label-width="150px"
                 class="demo-ruleForm">
          <el-form-item label="工资代发银行卡号"
                        prop="payBankCardNumber">
            <el-input placeholder="请输入工资代发银行卡号"
                      v-model="larForm.payBankCardNumber"></el-input>
          </el-form-item>
          <el-form-item label="工资代发银行"
                        prop="payBankCode">
            <el-select v-model="larForm.payBankCode"
                       placeholder="请选择">
              <el-option :label="item.title"
                         :value="item.id"
                         v-for="item in bankList"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工资代发开户行名称"
                        prop="payBankName">
            <el-input placeholder="请输入工资代发开户行名称"
                      v-model="larForm.payBankName"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary"
                       @click="submitLarForm('larForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { bankData } from '../data'
var newBankData = []
for (let i in bankData) {
  newBankData.push({
    id: i,
    title: bankData[i]
  })
}
export default {
  name: 'index',
  data () {
    return {
      bankList: newBankData,
      ruleForm: {
        passwd: '',
        newPasswd: '',
        rePasswd: ''
      },
      rules: {
        passwd: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        newPasswd: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        rePasswd: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      larRules: {
        payBankCardNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        payBankName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        payBankCode: [
          { required: true, message: '必选', trigger: 'blur' }
        ]
      },
      larForm: {
        payBankCode: '',
        payBankName: '',
        payBankCardNumber: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$http.post('/modifyPass', that.ruleForm).then(res => {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.data,
                type: 'success'
              })
              that.ruleForm = {
                passwd: '',
                newPasswd: '',
                rePasswd: ''
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitLarForm (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$http.post('/SaveCardInfo', that.larForm).then(res => {
            that.$message({
              message: res.data.data,
              type: 'success'
            })
            that.larForm = {
              payBankCode: '',
              payBankName: '',
              payBankCardNumber: ''
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.personal-content {
  width: 800px;
  margin: 50px auto 0;
  border: 1px solid #000000;
  height: 300px;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  .password {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 5px;
    text-align: center;
    width: 40%;
    height: 150px;
    margin-top: 50px;
    line-height: 150px;
    border-right: 2px solid;
  }
  .forms {
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
