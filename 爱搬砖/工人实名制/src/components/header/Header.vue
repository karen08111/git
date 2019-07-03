<template>
  <div style="position:relative;background-color:#fff;width:100%;box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04);">
    <div class="Header">
      <div style="display:flex; justify-content: space-between;">
        <img src='../../assets/header.png' />
        <div v-if="!$store.state.token && !!headerData"
             class="header-tag-style">
          <span></span>
          <b @click="goto">{{headerData && headerData.msg}}</b>
        </div>
        <el-button style="margin-left:50px"
                   @click="jump"
                   v-if="$store.state.token && selectPro!==''">返回企业级
        </el-button>
      </div>
      <div v-if="!$store.state.token"
           class="header-route-style"><span>
          <router-link to='/'>登录</router-link>
        </span>
        <b></b>
        <span>
          <router-link to='/register'>注册</router-link>
        </span></div>
      <el-select v-model="selectPro"
                 v-if="$store.state.token && selectPro===''"
                 @change="headerProChange"
                 :loading="loadingPro"
                 placeholder="选择项目"
                 style="width:20%">
        <el-option v-for="item in selectProArr"
                   :key="item.id"
                   :label="item.name +'('+projectStatus.find((val) => item.prjStatus === val.id).title + ')'"
                   :value="item.id">
        </el-option>
      </el-select>
      <div class="headerRight">
        <!-- <span @click="personal" class="names">{{companyName}}</span> -->
        <el-dropdown @command="handleCommand"
                     v-if="companyName">
          <el-button>
            {{companyName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='1'>修改密码</el-dropdown-item>
            <el-dropdown-item command='2'>工资代发银行卡设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class='btnStyle'
              v-if="companyName">
          <el-button type="primary"
                     plain
                     size='mini'
                     @click="unLogin">退出</el-button>
          <!-- <el-button type="success"
                     plain
                     size='mini'>帮助</el-button> -->
        </span>
      </div>
      <el-dialog title="修改密码"
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form :model="pwd"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item label="原密码"
                        prop="passwd">
            <el-input v-model="pwd.passwd"
                      placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="newPasswd">
            <el-input v-model="pwd.newPasswd"
                      placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码"
                        prop="rePasswd">
            <el-input v-model="pwd.rePasswd"
                      placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="OKChange">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { truncate } from 'fs';
import { projectStatus } from '../../views/data'
export default {
  name: 'Header',
  props: {
    headerData: Object
  },
  data () {
    return {
      options: [
      ],
      loadingPro: false,
      selectPro: '',
      selectProArr: [],
      pwd: {
      },
      projectStatus: projectStatus,
      rules: {
        passwd: [
          { required: true, message: '原密码', trigger: 'change' }
        ],
        newPasswd: [
          { required: true, message: '新密码', trigger: 'change' }
        ],
        rePasswd: [
          { required: true, message: '再次输入新密码', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      value: ''
    }
  },
  created () {
    if (Number(localStorage.getItem('proId')) !== 0) {
      this.selectPro = Number(localStorage.getItem('proId'))
    }
  },
  computed: {
    companyName () {
      return this.$store.state.userInfo.corpName || ''
    }
  },
  methods: {
    unLogin () {
      this.$confirm('确定要退出账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('unLogin')
      })
    },
    headerProChange (val) {
      localStorage.setItem('proId', val)
      this.$router.push('/enterProject/projectIndex')
    },
    OKChange () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$http.post('/modifyPass', this.pwd).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'success'
              })
              this.dialogVisible = false
            } else {
              this.$message.error('修改密码失败：' + res.data.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    jump () {
      this.$router.push('/company')
    },
    goto () {
      this.$router.push('/' + this.headerData.path)
    },
    personal () {
      this.$router.push('/personal')
    },
    handleCommand (command) {
      if (command === '2') {
        localStorage.setItem('fromRoute', '')
        this.$router.push('/payrollBank')
      } else if (command === '1') {
        // this.$router.push('/changePassword')
        this.dialogVisible = true
      } else {
      }
    }
  },
  mounted: function () {
    if (this.$store.state.token) {
      this.loadingPro = true
      this.$http.get('/member/project/slectLists').then((res) => {
        this.selectProArr = res.data.data
        this.loadingPro = false
      })
    }
    console.log(this.headerData)
  }
}
</script>

<style scoped lang="less">
.Header {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  position: relative;
  .header-tag-style {
    margin-top: 10px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      height: 24px;
      border-left: 2px solid #000;
      margin-left: 20px;
    }
    b {
      font-size: 22px;
      margin-left: 16px;
      cursor: pointer;
    }
  }
}
.header-route-style {
  position: absolute;
  top: 24px;
  right: 10px;
  a {
    color: #25a69a;
    font-size: 16px;
  }
  b {
    margin: 0 10px;
    font-size: 12px;
    border-right: 2px solid #25a69a;
  }
  span:nth-of-type(1) {
  }
}
.headerRight {
  display: inline-block;
  line-height: 3;
}

.btnStyle {
  margin-left: 10px;
  margin-right: 10px;
}

.names {
  cursor: pointer;
  text-decoration: underline;
}

.names:hover {
  color: #409eff;
}
</style>
