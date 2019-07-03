<template>
  <div class="Footer">
    <div style="width:1200px;height:204px;margin:0 auto;overflow: hidden;    padding: 15px;">
      <div class="con1">
        <p class="footer-child-title">合作企业</p>
        <div class="con">
          <div>
            <p>枣庄华厦建筑工程有限公司</p>
          </div>
          <div>
            <p>三一山东筑工科技有限公司</p>
          </div>
          <div>
            <p>杭州匠心小镇网络技术有限公司</p>
          </div>
        </div>
      </div>
      <div class="con1">
        <p class="footer-child-title">友情链接</p>
        <div class="con">
          <div>
            <p><a target="view_window"
                 href='http://www.aibanzhuan.cn/#/worker'>爱搬砖——专业的建筑行业招聘平台</a></p>
          </div>
          <div>
            <p><a target="view_window"
                 href='http://town.aibanzhuan.cn/'>匠心小镇——专业的建筑行业设计众包平台</a></p>
          </div>
          <div>
            <p><a target="view_window"
                 href='http://shop.aibanzhuan.cn/'>匠人街——新型建筑行业的电商平台</a></p>
          </div>
        </div>
      </div>
      <div style="float:left;margin-top: -24px;color:#fff">
        <img :src="vxImg"
             height="100px" />
        <p>客服微信二维码</p>
      </div>
    </div>
    <div class="corp">
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
      vxImg: require('../../assets/wx.png')
    }
  }
}
</script>

<style scoped lang="less">
.Footer {
  margin: 30px auto 0;
  width: 100%;
  height: 240px;
  background-color: #888a8a;
  margin: 0 auto;
  .footer-child-title {
    padding-left: 12px;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }
}
.con1 {
  width: 1000px;
  float: left;
  a {
    color: #fff;
  }
  a:hover {
    text-decoration: underline;
  }
}
.con {
  height: 100%;
  text-align: left;
  margin: auto;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // flex: 1 1 auto;
  padding-top: 24px;
  padding-left: 12px;
  box-sizing: border-box;
  color: #ffffff;
  div {
    width: 33%;
    float: left;
  }
}
.footerContent {
  font-size: 14px;
  margin: 16px auto;
  img {
    width: 90px;
  }
}
.footerTitle {
  font-size: 16px;
  margin-bottom: 26px;
}
.corp {
  height: 84px;
  background-color: #4d5756;
  color: #ffffff;
  margin-bottom: 0;
  p {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
}
.corp p:nth-child(1) {
  padding-top: 24px;
  margin-bottom: 12px;
}
</style>
