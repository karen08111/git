<template>
    <div class="box">
        <Slide :slides="slides" :height="'324px'"></Slide>
        <div class="case">
            <div class="main">
                <div class="nav">
                    <div class="tips clearfix">
                        <el-row>
                            <el-col :span="2">
                                <div class="label">您的选择：</div>
                            </el-col>
                            <el-col :span="22">
                                <div class="box">
                                    <span class="tip" @click="clearTip(index)" v-for="(i,index) in tips" v-if="i != ''">{{i}}</span>
                                    <div class="empty" @click="clearAll">清除全部</div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="classify">
                        <el-row>
                            <el-col :span="2">
                                <div class="label">选择分类：</div>
                            </el-col>
                            <el-col :span="22">
                                <div class="box" v-if="classIndex == 0">
                                    <label v-for="(i,index) in classifyAll"
                                           @click="addTip('firstTip',$event); showZi2(index,$event); clearAll()"><input
                                            type="radio" name="first" v-model="first"
                                            :value="i.id">{{i.work_name}}</label>
                                </div>
                                <div class="box" v-if="classIndex == 1">
                                    <label v-for="(i,index) in classify2"
                                           @click="addTip('secondTip',$event); showZi3(index,$event); clearSome()"><input
                                            type="radio" name="second" v-model="second"
                                            :value="i.id">{{i.work_name}}</label>
                                </div>
                                <div class="box" v-if="classIndex == 2">
                                    <label v-for="(i,index) in classify3"
                                           :class="{active : third == i.id}"
                                           @click="addTip('thirdTip',$event); classIndex = 2;"><input type="radio"
                                                                                                      name="third"
                                                                                                      v-model="third"
                                                                                                      :value="i.id">{{i.work_name}}</label>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-show="second == 1">
                        <div class="classify">
                            <el-row>
                                <el-col :span="2">
                                    <div class="label">队伍人数：</div>
                                </el-col>
                                <el-col :span="22">
                                    <div class="box">
                                        <label @click="addTip('numTip',$event)" :class="{active : num == ''}"><input
                                                type="radio" name="team_num" v-model="num" value="">全部</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 1}"><input
                                                type="radio" name="team_num" v-model="num" value="1">0-10</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 2}"><input
                                                type="radio" name="team_num" v-model="num" value="2">11-20</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 3}"><input
                                                type="radio" name="team_num" v-model="num" value="3">21-30</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 4}"><input
                                                type="radio" name="team_num" v-model="num" value="4">其他</label>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div v-show="second == 2">
                        <div class="classify">
                            <el-row>
                                <el-col :span="2">
                                    <div class="label">机械数量：</div>
                                </el-col>
                                <el-col :span="22">
                                    <div class="box">
                                        <label @click="addTip('numTip',$event)" :class="{active : num == ''}"><input
                                                type="radio" name="team_num" v-model="num" value="">全部</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 1}"><input
                                                type="radio" name="team_num" v-model="num" value="1">0-10</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 2}"><input
                                                type="radio" name="team_num" v-model="num" value="2">11-20</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 3}"><input
                                                type="radio" name="team_num" v-model="num" value="3">21-30</label>
                                        <label @click="addTip('numTip',$event)" :class="{active : num == 4}"><input
                                                type="radio" name="team_num" v-model="num" value="4">其他</label>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <!--<div class="classify">
                        <el-row>
                            <el-col :span="2">
                                <div class="label">薪酬状况：</div>
                            </el-col>
                            <el-col :span="22">
                                <div class="box">
                                    <label @click="addTip('payTip',$event)" :class="{active : pay == ''}"><input
                                            type="radio" name="pay" v-model="pay" value="">全部</label>
                                    <label @click="addTip('payTip',$event)" :class="{active : pay == 1}"><input
                                            type="radio" name="pay" v-model="pay" value="1">2000以下</label>
                                    <label @click="addTip('payTip',$event)" :class="{active : pay == 2}"><input
                                            type="radio" name="pay" v-model="pay" value="2">2000-5000</label>
                                    <label @click="addTip('payTip',$event)" :class="{active : pay == 3}"><input
                                            type="radio" name="pay" v-model="pay" value="3">可议价</label>
                                </div>
                            </el-col>
                        </el-row>
                    </div>-->
                    <div class="classify">
                        <el-row>
                            <el-col :span="2">
                                <div class="label">省份：</div>
                            </el-col>
                            <el-col :span="22">
                                <div class="box">
                                    <label @click="addTip('areaTip',$event)" :class="{active : area == ''}"><input
                                            type="radio" name="area" v-model="area" value="">全部</label>
                                    <label @click="addTip('areaTip',$event)" :class="{active : area == i.id}"
                                           v-for="i in region"><input type="radio" name="area" v-model="area"
                                                                      :value="i.id">{{i.title}}</label>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <ul class="list_nav">
                    <li @click="changeIcon0(); sort_nav = 0;" :class="{active : sort_nav == 0}">综合排序</li>
                    <li @click="changeIcon1(); sort_nav = 1;" :class="{active : sort_nav == 1}">发布时间<i
                            :class="time_icon"></i></li>
                    <li @click="changeIcon2(); sort_nav = 2;" :class="{active : sort_nav == 2}">薪酬情况<i
                            :class="pay_icon"></i></li>
                </ul>
                <div class="list_box">
                    <Need_list :list="list" :link="link"></Need_list>
                </div>
            </div>
            <div class="side">
                <Advert></Advert>
                <!--<div class="service">
                    <h5>推荐服务</h5>
                    <div class="item" v-for="i in service">
                        <router-link :to="{path: '/Recruit_details',query: {id:i.id}}">
                            <img :src="i.img">
                            <div class="txt">
                                <p class="red">￥:<span class="bs">{{i.pay}}</span></p>
                                <p class="tit">{{i.title}}</p>
                                <div class="com">{{i.name}}</div>
                                <div class="bot">
                                    <span class="bt">{{i.type}}</span>
                                    <span class="place"><i class="el-icon-location-outline"></i>{{i.address}}</span>
                                </div>
                                <div style="clear: both"></div>
                            </div>
                        </router-link>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import Need_list from '@/components/need/Need_list'

export default {
  name: 'Wanted',
  data () {
    return {
      link: '/Wanted_details',
      slides: [require('../../assets/slide3.png')],
      first: '',
      firstTip: '',
      second: '',
      secondTip: '',
      third: '',
      thirdTip: '',
      publish_date: '',
      publish_dateTip: '',
      num: '',
      numTip: '',
      pay: '',
      payTip: '',
      state: '',
      stateTip: '',
      area: '',
      areaTip: '',
      protype: '',
      protypeTip: '',
      region: ['浙江', '山东', '江苏'],
      sindex: 0,
      classIndex: 0,
      classifyAll: [],
      classify2: [],
      classify3: [],
      sort_nav: 0,
      time_icon: 'el-icon-d-caret',
      time_flag: false,
      pay_icon: 'el-icon-d-caret',
      pay_flag: false,
      list: [],
      service: [],
      sort: 1
    }
  },
  computed: {
    tips () {
      return ['我要找活', this.firstTip, this.secondTip, this.thirdTip, this.publish_dateTip, this.numTip, this.payTip, this.stateTip, this.areaTip, this.protypeTip]
    },
    searchVal () {
      return this.$store.state.searchVal
    },
    isSearch () {
      return this.$store.state.isSearch
    }
  },
  watch: {
    isSearch () {
      this.request()
    }
  },
  methods: {
    screen () {
      setTimeout(() => {
        let formData = new FormData()
        formData.append('mold', 1)
        formData.append('big_type', this.second)
        formData.append('works', this.third)
        formData.append('pay', '')
        formData.append('province', this.area)

        this.$http.post(this.$store.state.site + '/need/list', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => {
          if (res.data.code == 200) {
            this.list = res.data.data
          }
        }).catch(error => {
          console.log(error)
        })
      }, 0)
    },
    addTip (str, e) {
      if (e.target.tagName == 'LABEL') {
        if (str == 'firstTip') {
          setTimeout(() => {
            if (e.target.innerText == '全部') {
              this[str] = ''
            } else {
              this[str] = e.target.innerText
            }
          }, 0)
        } else {
          if (e.target.innerText == '全部') {
            this[str] = ''
          } else {
            this[str] = e.target.innerText
          }
        }
        this.screen()
      }
    },
    clearAll () {
      this.first = ''
      this.firstTip = ''
      this.second = ''
      this.secondTip = ''
      this.third = ''
      this.thirdTip = ''
      this.publish_date = ''
      this.publish_dateTip = ''
      this.num = ''
      this.numTip = ''
      this.pay = ''
      this.payTip = ''
      this.state = ''
      this.stateTip = ''
      this.area = ''
      this.areaTip = ''
      this.protype = ''
      this.protypeTip = ''
      this.classIndex = 0
      this.screen()
    },
    clearSome () {
      this.third = ''
      this.thirdTip = ''
      this.publish_date = ''
      this.publish_dateTip = ''
      this.num = ''
      this.numTip = ''
      this.pay = ''
      this.payTip = ''
      this.state = ''
      this.stateTip = ''
      this.area = ''
      this.areaTip = ''
      this.protype = ''
      this.protypeTip = ''
      this.classIndex = 0
      this.screen()
    },
    showZi2 (index, e) {
      if (e.target.tagName == 'LABEL') {
        this.sindex = index
        this.classify2 = this.classifyAll[index].zi
        setTimeout(() => {
          this.classIndex = 1
        })
      }
    },
    showZi3 (index, e) {
      if (e.target.tagName == 'LABEL') {
        let zi = this.classifyAll[this.sindex].zi[index].zi
        if (zi) {
          this.classify3 = zi
          setTimeout(() => {
            this.classIndex = 2
          })
        }
      }
    },
    clearTip (index) {
      if (index == 1) {
        this.classIndex = 0
        this.first = ''
        this.firstTip = ''
        this.second = ''
        this.secondTip = ''
        this.third = ''
        this.thirdTip = ''
      } else if (index == 2) {
        this.classIndex = 1
        this.second = ''
        this.secondTip = ''
        this.third = ''
        this.thirdTip = ''
      } else if (index == 3) {
        this.classIndex = 2
        this.third = ''
        this.thirdTip = ''
      } else if (index == 4) {
        this.publish_date = ''
        this.publish_dateTip = ''
      } else if (index == 5) {
        this.num = ''
        this.numTip = ''
      } else if (index == 6) {
        this.pay = ''
        this.payTip = ''
      } else if (index == 7) {
        this.state = ''
        this.stateTip = ''
      } else if (index == 8) {
        this.area = ''
        this.areaTip = ''
      } else if (index == 9) {
        this.protype = ''
        this.protypeTip = ''
      }
      this.screen()
    },
    changeIcon0 () {
      this.time_icon = 'el-icon-d-caret'
      this.pay_icon = 'el-icon-d-caret'
      this.time_flag = false
      this.pay_flag = false
      this.sort = 1
      this.request()
    },
    changeIcon1 () {
      this.pay_icon = 'el-icon-d-caret'
      this.pay_flag = false
      this.time_flag = !this.time_flag
      if (this.time_flag) {
        this.time_icon = 'el-icon-caret-bottom'
        this.sort = 2
      } else {
        this.time_icon = 'el-icon-caret-top'
        this.sort = 3
      }
      this.request()
    },
    changeIcon2 () {
      this.time_icon = 'el-icon-d-caret'
      this.time_flag = false
      this.pay_flag = !this.pay_flag
      if (this.pay_flag) {
        this.pay_icon = 'el-icon-caret-bottom'
        this.sort = 4
      } else {
        this.pay_icon = 'el-icon-caret-top'
        this.sort = 5
      }
      this.request()
    },
    request () {
      let formData = new FormData()
      formData.append('mold', 1)
      formData.append('big_type', this.second)
      formData.append('works', this.third)
      formData.append('pay', '')
      formData.append('province', this.area)
      formData.append('keywords', this.searchVal)
      formData.append('sort', this.sort)

      this.$http.post(this.$store.state.site + '/need/list', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.data
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    document.querySelector('title').innerHTML = '我要找人'
    const navs = this.$store.state.navs
    for (let i of navs) {
      i.isactive = false
    }
    navs[1].isactive = true

    this.$http.get(this.$store.state.site + '/need/filter').then(res => {
      if (res.data.code == 200) {
        let data = res.data.data
        this.classifyAll = [
          {
            work_name: '团队找活',
            id: 1,
            zi: [{
              work_name: '技术工种',
              id: 3,
              zi: data.work_data[1]
            },
            {
              work_name: '司机驾驶员',
              id: 4,
              zi: data.work_data[2]
            }]
          },
          {
            work_name: '个人找活',
            id: 2,
            zi: [{
              work_name: '技术工种',
              id: 1,
              zi: data.work_data[1]
            },
            {
              work_name: '司机驾驶员',
              id: 2,
              zi: data.work_data[2]
            }]
          }]
        this.region = data.prodata
      }
    }).catch(error => {
      console.log(error)
    })

    this.request()
  },
  components: { Need_list }
}
</script>

<style scoped lang="less">
    .case {
        width: 1200px;
        margin: 10px auto 40px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .nav {
            width: 906px;
            .label {
                line-height: 22px;
                text-align: right;
            }
            .tips {
                background-color: #f2f2f2;
                padding: 19px 19px 0;
                .tip {
                    padding: 4px 12px;
                    border-radius: 6px;
                    background-color: #fff;
                    cursor: pointer;
                    position: relative;
                    margin-right: 20px;
                    margin-bottom: 17px;
                    white-space: nowrap;
                    float: left;
                    &:not(:first-of-type):after {
                        content: '';
                        display: block;
                        width: 10px;
                        height: 10px;
                        background: url("../../assets/tip_close.png") no-repeat;
                        position: absolute;
                        right: -5px;
                        top: -5px;
                    }
                }
                .empty {
                    float: right;
                    cursor: pointer;
                    color: #3388ff;
                }
            }
            .classify {
                width: 100%;
                background-color: #ffffff;
                border: solid 1px #f2f2f2;
                border-top: none;
                padding: 0 30px;
                box-sizing: border-box;
                * {
                    line-height: 45px;
                }
                label {
                    cursor: pointer;
                    margin-left: 20px;
                    &.active {
                        color: #3388ff;
                    }
                }
                input {
                    display: none;
                }
            }
        }
        .list_nav {
            width: 900px;
            height: 40px;
            background-color: #f2f2f2;
            margin: 20px 0;
            display: flex;
            align-items: center;
            li {
                padding: 6px 10px;
                font-size: 12px;
                color: #999999;
                border: solid 1px #e5e5e5;
                cursor: pointer;
                &:not(:last-child) {
                    border-right: none;
                }
                &.active {
                    background-color: #3388ff;
                    color: #ffffff;
                }
            }
        }
        .side {
            width: 280px;
            .headtitle {
                width: 280px;
                height: 370px;
                border-radius: 4px;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
                padding-top: 30px;
                text-align: center;
                background: url("../../assets/grbg.png") no-repeat center center / 102% 103%;
                h6 {
                    font-size: 14px;
                    font-weight: bold;
                    line-height: 20px;
                    color: rgba(51, 51, 51, 1);
                    padding-left: 30px;
                    text-align: left;
                }
                img {
                    width: 157px;
                    height: 156px;
                    border-radius: 6px;
                    margin-top: 21px;
                }
                p {
                    font-size: 18px;
                    font-weight: bold;
                    color: rgba(51, 136, 255, 1);
                    line-height: 30px;
                    margin-top: 39px;
                }
            }
            .service {
                width: 284px;
                background-color: #f2f2f2;
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 30px;
                h5 {
                    font-size: 16px;
                    line-height: 40px;
                    letter-spacing: 2px;
                    color: #333333;
                }
                .item {
                    width: 100%;
                    height: 363px;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(231, 231, 231, 1);
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    box-sizing: border-box;
                    margin-right: 6px;
                    margin-bottom: 40px;
                    img {
                        width: 100%;
                        height: 178px;
                        margin-bottom: 10px;
                    }
                    .txt {
                        padding: 0 10px;
                        .red {
                            font-size: 13px;
                            color: rgba(245, 70, 70, 1);
                            line-height: 24px;
                            span {
                                font-size: 16px;
                            }
                        }
                        .tit {
                            font-size: 13px;
                            color: rgba(51, 51, 51, 1);
                            line-height: 20px;
                            display: -webkit-box;
                            /*! autoprefixer: off */
                            -webkit-box-orient: vertical;
                            /* autoprefixer: on */
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }
                        .com {
                            font-size: 13px;
                            color: rgba(153, 153, 153, 1);
                            line-height: 28px;
                            padding: 15px 0;
                            border-top: 1px dashed rgba(229, 229, 229, 1);
                            margin-top: 20px;
                        }
                        .bt {
                            height: 20px;
                            line-height: 20px;
                            padding: 0 9px;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(51, 136, 255, 1);
                            border-radius: 4px;
                            font-size: 13px;
                            color: #3388ff;
                        }
                        .place {
                            font-size: 13px;
                            color: rgba(153, 153, 153, 1);
                            line-height: 20px;
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>
