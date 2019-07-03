<template>
  <div id="chat">
    <div class="nameStyle">
      {{proName}}(<span :style="Number(prjStatus) > 3?'color:orange;' : 'color:green'">{{proInfo}}</span>)
    </div>
    <div class="charts"
         style="width: 100%;margin: auto">
      <div>
        <div class="chatHeader">
          <el-row style="width: 100%">
            <el-col :span="6">
              <div class="grid-content bg-purple"
                   style="position: relative;">
                <div id="yuan"
                     :style="{width: '120px', height: '120px'}">
                </div>
              </div>
            </el-col>
            <el-col :span="6"
                    class="bb">
              <div class="grid-content bg-purple-light font bg">现场人数</div>
              <div class="grid-content bg-purple-light font  lage">{{stats.onsite}}</div>
            </el-col>
            <el-col :span="6"
                    class="bb">
              <div class="grid-content bg-purple font bg">今日出勤人数</div>
              <div class="grid-content bg-purple-light font  lage">{{stats.atten}}</div>
            </el-col>
            <el-col :span="6"
                    class="bb">
              <div class="grid-content bg-purple-light font bg">今日刷卡率</div>
              <div class="grid-content bg-purple-light font  lage">{{stats.swipe}}</div>
            </el-col>
          </el-row>
        </div>
        <div id="chart1"
             :style="{width: '730px', height: '330px', marginRight: '20px', backgroundColor:'#fff'}"></div>
      </div>
      <div id="myChart"
           :style="{width: '500px', height: '500px', backgroundColor:'#fff'}"></div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie'
import { projectStatus } from '../data'
export default {
  name: 'projectIndex',
  data () {
    return {
      obj: {},
      stats: [],
      proId: '',
      proInfo: '',
      projectStatus: projectStatus,
      proName: '',
      prjStatus: 0
    }
  },
  created () {
    this.proId = localStorage.getItem('proId')
  },
  mounted () {
    this.huayuan()
    this.$http.get('/member/project/details/' + this.proId).then(res => {
      this.proInfo = projectStatus.find((val) => {
        return val.id === res.data.data.prjStatus
      })
      this.prjStatus = res.data.data.prjStatus
      this.proInfo = this.proInfo && this.proInfo.title
      this.proInfo = this.proInfo
      this.proName = res.data.data.name
    })
  },
  methods: {
    huayuan () {
      var that = this
      this.$http.get('/project/monitor/' + this.proId).then(res => {
        if (res.data.code === 200) {
          this.obj = res.data.data
          this.stats = res.data.data.personnel
          var variety = res.data.data.variety
          var workType = res.data.data.work_type
          let myChart = this.$echarts.init(document.getElementById('yuan'))
          myChart.setOption({
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                type: 'pie',
                radius: ['50%', '60%'],
                label: {
                  normal: {
                    show: false,
                    position: 'inner'
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: Number(that.stats.atten) - Number(that.stats.onsite), name: '未在场工人数' },
                  { value: that.stats.onsite, name: '现场工人数', label: { show: false, fontSize: '8', fontWeight: 'bold' } }
                ]
              }
            ]
          })
          //  折线图
          let myChart1 = this.$echarts.init(document.getElementById('chart1'))
          let workers = variety.map(val => val.worker)
          let manage = variety.map(val => val.manage)
          let time = variety.map(val => val.time)
          myChart1.setOption({
            title: {
              text: '现场人数变化趋势图'
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '工人',
                type: 'line',
                stack: '总量',
                data: workers
              },
              {
                name: '管理数量',
                type: 'line',
                stack: '总量',
                data: manage
              }
            ]
          })
          // 工种
          let myChart2 = this.$echarts.init(document.getElementById('myChart'))
          let work = []
          workType.map(data => {
            work.push({ name: data.name, value: data.nums })
          })
          let workName = workType.map(val => val.name)
          myChart2.setOption({
            title: {
              text: '',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: workName
            },
            series: [
              {
                name: '用工分析',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: work,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.charts {
  display: flex;
  justify-content: space-around;
}
#chat {
  padding: 30px 50px 0 50px;
}
.chatHeader {
  display: flex;
  height: 150px;
  margin-right: 20px;
  background-color: #fff;
  padding: 10px 10px 0 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid gainsboro;
}
/*.bb {*/
/*  border-bottom: 1px solid gainsboro;*/
/*}*/
.bg {
  /* background: #c2e7b0; */
  height: 50px;
  line-height: 50px;
  font-weight: normal !important;
}
.wai {
  width: 150px;
  height: 150px;
}
.font {
  font-size: 16px !important;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
#yuan {
  width: 120px;
  height: 120px;
  position: relative;
}
.lage {
  font-weight: bold;
  font-size: 30px !important;
  color: rgb(245, 166, 35);
  line-height: 30px;
}
.yuanTitle {
  display: block;
  position: absolute;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 80px;
  margin: auto;
  font-size: 20px;
  z-index: 999;
}
.yops {
}
#myChart {
  border: 1px solid gainsboro;
  padding: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#chart1 {
  border: 1px solid gainsboro;
  padding: 20px;
  margin-top: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.bg-purple {
}
.nameStyle {
  background-color: #fff;
  font-size: 36px;
  border: 1px solid gainsboro;
  padding: 20px 16px;
  margin-bottom: 20px;
  span {
    font-size: 36px !important;
  }
}
</style>
