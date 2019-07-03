<template>
  <div class="app">
    <Header></Header>
    <div class="content">
      <p>山东摩云网络科技有限公司，依托于枣庄华厦建工集团，打通建筑行业产业链条，缔造建筑企业一站式服务中心。作为一家“互联网+建筑”企业，摩云网络重点打造“爱搬砖”“匠心小镇”“匠人街”“匠管家”等四个新型平台，专注于解决工程建设者找活难题、企业招工难题；凭借“开放、专业、高效”的运作模式，扶持初创企业快速发展；为建工企业开设供应链商城，扶持地方品牌发展，助力电商企业腾飞；通过物联网技术与大数据融合，实现项目智能化分析管理。
      </p>
      <p>摩云网络致力于实现工程类项目从专业劳务人员招募、管理，到网络化工程项目管理等全程管控，推动传统建筑企业提高工作效率，降低管理难度及风险，有效实现精细化管理及互联网+转型。</p>
      <p>
        电话：16657159171
        公司名称：山东摩云网络科技有限公司
        企业邮箱：moyunwangluo@163.com
        地址：浙江省杭州市滨江区长河街道秋溢路606号
      </p>
    </div>
    <Footer ></Footer>
  </div>
</template>

<script>
export default {
  name: 'contactUs',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .content{
    width: 910px;
    height: calc(100vh - 361px);
    margin: 0 auto 90px;
    padding: 52px;
    box-sizing: border-box;
    p{
      white-space: pre-line;
      color: #7b7f82;
      font-size: 18px;
      line-height: 40px;
      letter-spacing: 1px;
      text-indent: 2em;
      &:nth-of-type(3){
        margin-top: 30px;
        text-align: left;
      }
    }
  }
</style>
