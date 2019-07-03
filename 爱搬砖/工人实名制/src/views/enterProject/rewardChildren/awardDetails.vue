<template>
  <div class="contractors">
    <div style="width:1200px;margin:0 auto;margin-bottom:21px">
      <el-breadcrumb separator=">"
                     class="breadcrumbStyle">
        <el-breadcrumb-item class="breadcrumbItemStyle"
                            v-for="(item, index) in breadcrumbData"
                            :to="{ path: item.path?item.path:'' }"
                            :key="index">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="formStyle detail-page-style">
      <el-form label-width="120px"
               label-position='left'>
        <div class="worker-detail-style">
          <div class="row"
               v-if="role === 'Team'">
            <!-- <p><span class="label">班组名称</span>{{detail.teamName}}</p>
        <p><span class="label">所属参建单位</span>{{detail.corpName}}</p> -->
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="班组名称">
                  {{detail.teamName}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <div class="info">所属参建单位：{{detail.corpName}}</div>
              </el-col>
            </el-row>
          </div>
          <template v-else>
            <el-row :gutter="24">
              <el-col :span="7">
                <el-form-item label="工人姓名">
                  {{detail.workerName}}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="info">身份证号：{{detail.idCardNumber}}</div>
              </el-col>
              <el-col :span="6">
                <div class="info">所属参建单位：{{detail.corpName}}</div>
              </el-col>
              <el-col :span="5">
                <div class="info">所属班组：{{detail.teamName}}</div>
              </el-col>
            </el-row>
          </template>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="奖励时间">
                {{detail.rewardDate}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖励类别">
                {{type}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="奖励级别">
                {{level}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24"
                  style="border-bottom: 1px solid #dddddd;">
            <el-col :span="12">
              <el-form-item label="奖励说明"
                            class="useGetHeightRef">
                {{detail.content}}
              </el-form-item>
            </el-col>
          </el-row>
          <div class="bottomBtn">
            <el-button size="mini"
                       type="primary"
                       @click="handleEdit">编辑</el-button>
            <el-button size="mini"
                       @click="$router.go(-1)">返回</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { RewardCategory, RewardLevel } from '../../data'
export default {
  name: 'awardDetails',
  data () {
    return {
      detail: {},
      breadcrumbData: [{
        path: '/',
        label: '首页'
      }, {
        path: '/enterProject/award',
        label: '奖励记录'
      }, {
        label: '奖励记录详情'
      }]
    }
  },
  computed: {
    role () { // Team -> 班组   Worker -> 工人
      return this.$route.params.role
    },
    id () {
      return this.$route.params.id
    },
    type () {
      let type = RewardCategory.find(v => v.id === +this.detail.rewardType)
      return type ? type.title : ''
    },
    level () {
      let level = RewardLevel.find(v => v.id === +this.detail.rewardLevel)
      return level ? level.title : ''
    }
  },
  methods: {
    getDetails () {
      this.$http.get(`/member/reward/details/${this.id}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.detail = data
        }
      })
    },
    handleEdit () {
      this.$router.push(`/enterProject/awardForm${this.role}/${this.id}`)
    }
  },
  created () {
    this.getDetails()
  },
  updated () {
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.height = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
    document.body.getElementsByClassName('useGetHeightRef')[0].childNodes[0].style.lineHeight = document.body.getElementsByClassName('useGetHeightRef')[0].clientHeight + 'px'
  }
}
</script>

<style scoped lang="less">
.contractors {
  margin: 0 0 24px;
  :global {
    .el-select {
      display: block;
    }
    .el-row {
      border: 1px solid #dddddd;
      border-bottom: 0;
    }
  }
  h4 {
    margin: 12px 0;
    padding: 8px 10px;
    font-weight: 600;
  }
  td {
    padding: 5px 0;
  }
}
.tableClass {
  width: 100%;
  margin-bottom: 6px;
}
.btnGroup {
  text-align: right;
  margin-bottom: 24px;
}
.formStyle {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  color: #333;
  .el-row {
    margin: 0 !important;
  }
}
.formChildTitle {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}
.photoStyle {
  width: 70%;
  div {
    float: left;
  }
}
.worker-detail-style {
  background-color: #ffffff;
  padding: 20px;
  .el-form-item__label {
    background-color: #ececec;
  }
  .worker-detail-child-title {
    font-size: 18px;
    padding-left: 10px;
    color: #333333;
    line-height: 18px;
    margin-bottom: 20px;
    font-family: "PingFang-SC-Bold";
    border-left: 4px solid #008af1;
  }
}
.divMargin {
  margin-top: 20px;
}
.elFormItemStyle {
  margin-bottom: 0;
}
.headerStyle {
  width: 1200px;
  display: flex;
  justify-content: space-between;
}
.infoStyle {
  margin-top: 75px;
  width: 30%;
  margin-left: 22px;
  .el-row {
    border: 0;
  }
}
.info {
  line-height: 54px;
}
</style>
