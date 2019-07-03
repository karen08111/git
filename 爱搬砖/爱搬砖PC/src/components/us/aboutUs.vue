<template>
  <div class="app">
    <Header></Header>
    <div class="content">
      <h3>爱搬砖</h3> 劳务信息服务平台，包含工程信息发布，劳务分包，工程机械租售，建材及机械（新品/二手）团购/担保交易，供应链商城，认证培训，金融中心等各项服务，依托大数据构建个人及企业信用体系，可成长性会员制度，推动发展以作业为主的专业企业，帮助传统获取多种，灵活，高效的用工方式。

      <h3>匠心小镇</h3>劳务众包平台，凭借“开放、专业、高效”的运作模式，服务匹配，专家问诊等多种服务，政府政策支持和资源整合优势，不断吸纳建筑相关行业的需求各方，得到众多企业的积极入驻，平台为入驻企业带来更多相互合作机会，带来更多发展机遇。依托于平台订单支持和品牌支撑，扶持入驻企业快速发展，融合，壮大。

      <h3>匠人街</h3>建筑材料采购平台，建工企业供应链商城，涵盖原材料采购，设备购置等多种服务。独立店铺，运营支持，扶持地方品牌发展，助力电商企业腾飞，整合车辆资源，建立自有物流体系，让大宗商品物流更加便捷高效。

      <h3>匠管家</h3>项目管理平台，通过物联网技术与大数据融合，实现项目智能化分析管理。专业服务于建筑企业的OA及项目管理系统，通过大数据及物联网技术，实现劳务人员管理（合同管理，个人资料，工作状况，考勤管理，薪资发放等），财务管理，项目实时监控及项目进度管理等。
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'aboutUs',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .content{
    width: 1200px;
    height: calc(100vh - 361px);
    margin: 0 auto 40px;
    padding: 40px;
    box-sizing: border-box;
    white-space: pre-line;
    color: #7b7f82;
    font-size: 16px;
    line-height: 26px;
    h3{
      font-size: 20px;
      line-height: 2;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      &:before{
        content: '';
        display: block;
        width: 4px;
        height: 18px;
        background-color: #3388ff;
        margin-right: 14px;
      }
    }
  }
</style>
