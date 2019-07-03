<template>
  <div class="footer">
    <div class="footer_top">
      <div class="main">
        <div class="fleft">
          <div class="link">
            <router-link v-for="val in links" tag="a" target="_blank" :to="{path: '/help',query:{id: val.id}}"
                         :key="val.id">{{val.value}}
            </router-link>
          </div>
          <div class="icons">
            <el-popover
                placement="top-start"
                width="300"
                trigger="hover">
              <div class="pop">
                <img src="../../assets/footer_wx.png" alt="">
                <p>微信公众号二维码</p>
              </div>
              <span slot="reference"><img src="../../assets/wx.png" alt=""></span>
            </el-popover>
            <el-popover
                placement="top-start"
                width="300"
                trigger="hover">
              <div class="pop">
                <img src="../../assets/footer_qq.png" alt="">
                <p>QQ二维码</p>
              </div>
              <span slot="reference"><img src="../../assets/qq.png" alt=""></span>
            </el-popover>
            <el-popover
                placement="top-start"
                width="300"
                trigger="hover">
              <div class="pop">
                <img src="../../assets/footer_wb.png" alt="">
                <p>微博二维码</p>
              </div>
              <span slot="reference"><img src="../../assets/wb.png" alt=""></span>
            </el-popover>
            <el-popover
                placement="top-start"
                width="300"
                trigger="hover">
              <div class="pop">
                <p>客服电话: 15588283600</p>
              </div>
              <span slot="reference"><img src="../../assets/tel.png" alt=""></span>
            </el-popover>
          </div>
        </div>
        <div class="fright">
          <div class="qr">
            <div class="image"><img src="../../assets/wxqrmy.jpg"></div>
            <p>微信公众号</p>
          </div>
          <div class="qr">
            <div class="image"><img src="../../assets/jrtt.png"></div>
            <p>今日头条</p>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <p>山东摩云网络科技有限公司</p>
      <p>Copyright © 2019 aibanzhuan.cn All Rights Reserved. 鲁ICP备18046906号-1</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: [{
        id: 1,
        value: '注册信息'
      }, {
        id: 2,
        value: '发布信息'
      }, {
        id: 3,
        value: '查看信息'
      }, {
        id: 4,
        value: '入驻基地'
      }, {
        id: 5,
        value: '身份认证'
      }, {
        id: 6,
        value: '联系发布信息者'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .footer_top {
    width: 100%;
    min-width: 1200px;
    height: 211px;
    background-color: #303030;
    padding: 41px 0;
    box-sizing: border-box;
    .main {
      width: 1200px;
      min-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .fleft{
        .link{
          margin-bottom: 38px;
          a{
            color: #a9aaab;
            margin-right: 30px;
          }
        }
        .icons{
          text-align: center;
          span{
            cursor: pointer;
            display: inline-block;
            width: 46px;
            height: 46px;
            line-height: 55px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 50%;
            &:not(:last-child){
              margin-right: 20px;
            }
          }
        }
      }
      .fright{
        display: flex;
        .qr{
          text-align: center;
          margin-right: 17px;
          &:last-child .image{
            padding: 6px;
          }
          .image{
            width: 102px;
            height: 102px;
            background-color: #fff;
            box-sizing: border-box;
            margin-bottom: 13px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          p{
            color: #fff;
          }
        }
      }
    }
  }
  .record {
    width: 100%;
    height: 80px;
    background-color: #202020;
    text-align: center;
    font-size: 12px;
    color: #979797;
    padding-top: 24px;
    box-sizing: border-box;
    p:first-child{
      margin-bottom: 7px;
    }
  }

  .pop{
    img{
      width: 200px;
    }
    p{
      text-align: center;
    }
  }
</style>

<style lang="less">
  .el-popover{
    width: auto !important;
  }
</style>
