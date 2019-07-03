<template>
	<div class="container">
    <img src="../../assets/iden_home.png" alt="" class="home">
    <router-link class="logo" to="/"><img src="../../assets/logo.png" alt=""></router-link>
    <div class="choose">
      <div class="header">
        <h1>角色选择</h1>
        <p>请正确选择您的身份，我们会为您提供更精确的服务</p>
      </div>
      <div class="main">
        <div :class="geren?'item':'item opa'">
          <h3>个人认证</h3>
          <div class="image" :class="{active: roleIdx == 1}" @click="geren?roleIdx = 1:''"></div>
          <p>施工队伍、工程机械、个人劳务求职</p>
        </div>
        <div :class="qiye?'item':'item opa'">
          <h3>企业认证</h3>
          <div class="image" :class="{active: roleIdx == 2}" @click="roleIdx = 2"></div>
          <p>寻找优秀员工，优质完成工程</p>
        </div>
      </div>
      <el-button type="primary" @click="skip">开始认证</el-button>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Account_identity_new',
  data () {
    return {
      roleIdx: 0,
      geren: true,
      qiye: true
    }
  },
  created () {
    	/* if(this.$cookies.get("identType")==10 ){
    		this.geren = false
    	}else if(this.$cookies.get("identType")== 11){
    		this.qiye = false
    		this.geren = false
    	} */
  },
  methods: {
    skip () {
      if (this.roleIdx == 1) {
        this.$router.push('Attestation_per')
      } else if (this.roleIdx == 2) {
        this.$router.push({ path: '/Attestation_per/2' })
		  // this.$router.push({path: '/Attestation_com/3'})
      }
    }
  }
}
</script>

<style scoped lang="less">
	.opa{
		opacity: 0.5;
	}
  .container{
    width: 100vw;
    height: 100vh;
    background: url("../../assets/iden_bg.png") no-repeat center / 100% 100%;
    position: relative;
    .home{
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .logo{
      position: absolute;
      left: 55px;
      top: 44px;
    }
    .choose{
      width: 640px;
      height: 660px;
      background-color: #ffffff;
      box-shadow: 0px 4px 29px 1px
      rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      padding: 80px 50px 20px;
      box-sizing: border-box;
      text-align: center;
      .header{
        padding-bottom: 30px;
        border-bottom: solid 1px #eeeeee;
        h1{
          font-size: 26px;
          font-weight: bold;
          letter-spacing: 3px;
          color: #333333;
          margin-bottom: 20px;
        }
        p{
          font-size: 12px;
          letter-spacing: 1px;
          color: #cccccc;
        }
      }
      .main{
        padding: 30px 0 65px;
        display: flex;
        justify-content: space-between;
        .item{
          width: 275px;
          h3{
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #333333;
            margin-bottom: 60px;
          }
          .image{
            width: 202px;
            height: 202px;
            border-radius: 50%;
            border: solid 1px #999999;
            margin: 0 auto 16px;
            cursor: pointer;
            &.active{
              border-color: #3388ff;
            }
          }
          &:first-child .image{
            background: url("../../assets/per.png") no-repeat center / 205px 205px;
          }
          &:last-child .image{
            background: url("../../assets/com.png") no-repeat center / 205px 205px;
          }
          p{
            font-size: 15px;
            letter-spacing: 1px;
            color: #999999;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .container{
    .choose{
      .el-button{
        width: 220px;
        height: 50px;
        padding: 0;
        span{
          font-size: 16px;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
    }
  }
</style>
