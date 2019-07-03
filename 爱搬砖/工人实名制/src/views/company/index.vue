<template>
  <!--<FIfram src="http://datav.aliyuncs.com/share/8c5ab09a8b14ed9397d13be6e9a0d341" wapper="home-wapper"></FIfram>-->
  <div>
    <!--<router-link to="/projectDetail">项目明细</router-link>-->
    <div>
      <el-row class="headRow"
              :gutter="24"
              style="line-height: 50px;height: 150px; margin-top: 20px;background: #FFFFFF; padding: 0px; margin:20px 0 0;!important">
        <el-col :span="4">
          <img src="../../assets/nums.jpg"
               alt=""
               class="nums">
        </el-col>
        <el-col :span="12"
                class="border">
          <div class="grid-content bg-purple">
            <el-row :gutter="24"
                    class="col">
              <el-col :span="6">
                <div class="grid-content bg-purple">现场人数</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">今日出勤人数</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple">今日刷卡率</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">最近更新时间</div>
              </el-col>
            </el-row>
            <el-row :gutter="24"
                    style="color: #F5A623;">
              <el-col :span="6">
                <div class="grid-content bg-purple lage">{{stats.nums}}</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple lage">{{stats.atten}}</div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple lage">{{stats.swipe}}</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple lage">{{stats.newest}}</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8"
                style="float: right;"
                class="border">
          <div class="grid-content bg-purple">
            <el-row :gutter="24"
                    class="col">
              <el-col :span="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">在线项目</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">在册工人</div>
              </el-col>
            </el-row>
            <el-row :gutter="24"
                    style="color: #F5A623;">
              <el-col :span="6">
                <div class="grid-content bg-purple"><img src="../../assets/work.jpg"
                       alt=""></div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple lage">{{stats.pros}}</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple lage">{{stats.total}}</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="background: #ffffff; margin-top: 20px;padding: 0px;box-sizing: border-box;">
      <div style="margin-bottom: 20px;"
           class="title">
        <span>项目及人数</span>
        <!--        <router-link to="/projectDetail">项目明细</router-link>-->
      </div>
      <el-table :data="pros"
                style="width: 100%">
        <el-table-column prop="company"
                         label="单位"
                         width="220">
        </el-table-column>
        <el-table-column prop="nums"
                         label="累积项目数"
                         width="180">
        </el-table-column>
        <el-table-column prop="year_nums"
                         label="项目本年累计人次">
        </el-table-column>
        <el-table-column prop="present"
                         label="在场人数">
        </el-table-column>
        <el-table-column prop="onsite"
                         label="现场人数">
        </el-table-column>
        <el-table-column prop="atten"
                         label="今日出勤人数">
        </el-table-column>
        <el-table-column prop="swipe"
                         label="今日刷卡率(%)">
        </el-table-column>
        <el-table-column prop="swipe_seven"
                         label="近七日刷卡率(%)">
        </el-table-column>
      </el-table>
      <!-- <el-tab-pane label="专业承包项目" name="fourth">
          <el-table
            :data="pros"
            style="width: 100%">
            <el-table-column
              prop="company"
              label="单位"
              width="220">
            </el-table-column>
            <el-table-column
              prop="nums"
              label="累积项目数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="year_nums"
              label="项目本年累计人次">
            </el-table-column>
            <el-table-column
              prop="present"
              label="在场人数">
            </el-table-column>
            <el-table-column
              prop="onsite"
              label="现场人数">
            </el-table-column>
            <el-table-column
              prop="atten"
              label="今日出勤人数">
            </el-table-column>
            <el-table-column
              prop="swipe"
              label="今日刷卡率(%)">
            </el-table-column>
            <el-table-column
              prop="swipe_seven"
              label="近七日刷卡率(%)">
            </el-table-column>
          </el-table>
        </el-tab-pane> -->
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      activeName2: 'first',
      stats: {},
      tableData: [{
        date: '枣庄华厦建筑工程有限公司',
        name: 852,
        address: 379,
        address2: 76,
        address3: 76,
        address4: 76,
        address5: '100%',
        address6: '100%'
      }],
      pros: []
    }
  },
  methods: {
    handleClick (tab, event) {
    }
  },
  mounted () {
    this.$http.get('/dashboard').then(res => {
      // console.log(this.$store.state)
      this.stats = res.data.data.stats
      this.pros = res.data.data.pros
      // console.log(this.pros)
    })
  }
}
</script>

<style scoped>
.headRow {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.grid-content {
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.grid-content img {
  height: 96px;
  width: 110px;
}
.nums {
  height: 150px;
  width: 170px;
}
.lage {
  font-weight: bold;
  font-size: 30px;
  line-height: 100px;
}
.title a {
  float: right;
}
.title {
  /*background: linear-gradient(to right,gainsboro,#ffffff);*/
  height: 50px;
  background: gainsboro;
  /*width: 20%;*/
  line-height: 50px;
  /* padding-left: 10px; */
}
.title span {
  font-size: 22px;
  font-weight: 600;
  color: #7b7b7b;
}
.col {
  background: #c2e7b0;
  height: 50px;
  line-height: 50px !important;
  font-size: 20px !important;
}
.border {
  border: 1px solid gainsboro;
  height: 150px;
}
</style>
