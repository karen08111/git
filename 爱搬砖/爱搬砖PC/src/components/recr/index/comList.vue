<template>
  <div class="app">
    <div class="main">
      <div class="banner">
        <div class="txt">
          <p><i class="pris"></i><span>资质保证</span></p>
          <p><i class="pris hollow"></i><span>资源保证</span></p>
          <p><i class="pris"></i><span>资金保证</span></p>
        </div>
      </div>
      <div class="itmes">
        <div class="item" v-for="item in list">
          <div class="i-lf">
            <div class="name">{{item.company_name}}</div>
            <div class="bot">
              <div class="num">
                <p>招标采购</p>
                <p>{{item.tenderingCount}}条</p>
              </div>
              <div class="num">
                <p>询价采购</p>
                <p>{{item.inquiryCount}}条</p>
              </div>
            </div>
            <router-link class="comPage" :to="`/comPage/${item.uid}`">采购商主页</router-link>
          </div>
          <div class="i-rh">
            <div class="top">
              <h3>采购项目</h3>
              <h3>采购类型</h3>
            </div>
            <ul>
              <li v-for="li in item.purchaseList">
                <router-link :to="`/recrDetails/${li.id}`">
                  <div class="txt"><i class="dot"></i><span>{{li.title}}</span></div>
                  <div class="txt type">{{li.type === 1 && '询价' || '招标'}}</div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comList',
  data () {
    return {
      list: []
    }
  },
  methods: {
    req () {
      this.$http.get('/purchase/companyList').then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data
        }
      })
    }
  },
  created () {
    this.req()
  }
}
</script>

<style scoped lang="less">
  .app {
    background-color: #eef0f1;
    overflow: hidden;
    .main{
      width: 1200px;
      margin: 0 auto;
      .banner{
        width: 100%;
        height: 400px;
        background: url("../../../assets/recr/com_banner.png");
        padding-top: 270px;
        box-sizing: border-box;
        margin-bottom: 10px;
        .txt{
          display: flex;
          justify-content: center;
          p{
            margin: 0 22px;
            display: flex;
            align-items: center;
            .pris{
              display: inline-block;
              width: 21px;
              height: 21px;
              background-color: #ffffff;
              border: 1px solid #fff;
              box-sizing: border-box;
              transform: rotate(45deg);
            }
            .hollow{
              background-color: transparent;
            }
          }
          span{
            font-size: 30px;
            letter-spacing: 3px;
            color: #ffffff;
            text-indent: 16px;
          }
        }
      }
      .item{
        width: 100%;
        height: 400px;
        display: flex;
        margin-bottom: 20px;
        &:nth-of-type(1){
          .i-lf{
            background-image: linear-gradient(180deg,
            rgba(255, 83, 45, 0.9) 0%,
            rgba(255, 150, 97, 0.9) 100%),
            linear-gradient(
                #ffffff,
                #ffffff);
            .comPage{
              background-color: #ff7948;
            }
          }
          li:hover{
            .txt{
              color: #ff6d49;
              .dot{
                background-color: #ff6d49;
              }
            }
          }
        }
        &:nth-of-type(2){
          .i-lf{
            background-image: linear-gradient(180deg,
            rgba(91, 137, 255, 0.9) 0%,
            rgba(145, 175, 252, 0.9) 100%),
            linear-gradient(
                #ffffff,
                #ffffff);
            .comPage{
              background-color: #6d91fb;
            }
          }
          li:hover{
            .txt{
              color: #729aff;
              .dot{
                background-color: #729aff;
              }
            }
          }
        }
        &:nth-of-type(3){
          .i-lf{
            background-image: linear-gradient(180deg,
            rgba(146, 99, 222, 0.9) 0%,
            rgba(175, 132, 245, 0.9) 100%),
            linear-gradient(
                #ffffff,
                #ffffff);
            .comPage{
              background-color: #8453e9;
            }
          }
          li:hover{
            .txt{
              color: #a077e4;
              .dot{
                background-color: #a077e4;
              }
            }
          }
        }
        &:nth-of-type(4){
          .i-lf{
            background-image: linear-gradient(180deg,
            rgba(34, 202, 71, 0.9) 0%,
            rgba(80, 236, 114, 0.9) 99%),
            linear-gradient(
                #ffffff,
                #ffffff);
            .comPage{
              background-color: #21d23c;
            }
          }
          li:hover{
            .txt{
              color: #3dd45e;
              .dot{
                background-color: #3dd45e;
              }
            }
          }
        }
        .i-lf{
          width: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 60px 0 30px;
          .name{
            padding: 0 35px;
            font-size: 26px;
            line-height: 36px;
            letter-spacing: 1px;
            color: #ffffff;
            text-align: center;
          }
          .bot{
            display: flex;
            width: 248px;
            .num{
              width: 50%;
              height: 69px;
              &:first-of-type{
                border-right: 1px solid #cccccc;
              }
              p{
                font-size: 16px;
                line-height: 36px;
                letter-spacing: 1px;
                color: #ffffff;
                text-align: center;
              }
            }
          }
          .comPage{
            display: block;
            width: 120px;
            height: 36px;
            font-size: 14px;
            line-height: 36px;
            letter-spacing: 1px;
            color: #ffffff;
            text-align: center;
          }
        }
        .i-rh{
          flex: 1;
          padding: 0 45px;
          background-color: #fff;
          .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 65px;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 29px;
            h3{
              font-size: 16px;
              letter-spacing: 1px;
              color: #34495e;
            }
          }
        }
        ul{
          li{
            &:not(:last-of-type){
              margin-bottom: 38px;
            }
            a{
              display: flex;
              justify-content: space-between;
              .txt{
                font-size: 14px;
                letter-spacing: 1px;
                color: #666666;
                .dot{
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background-color: #666666;
                  border-radius: 50%;
                  margin-right: 10px;
                }
              }
              .type{
                padding: 0 15px;
              }
            }
          }
        }
      }
    }
  }
</style>
