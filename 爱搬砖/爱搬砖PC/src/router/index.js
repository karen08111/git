import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/', name: 'index', component: () => import('@/components/allIndex/Index'), meta: { title: '爱搬砖首页' } },
    { path: '/worker', component: () => import('@/components/index/Index'), meta: { title: '产业工人-爱搬砖', nav: '/worker' } },
    { path: '/base', component: () => import('@/components/base/index'), meta: { title: '入驻基地', nav: '/base' } },
    { path: '/help', component: () => import('@/components/help/index'), meta: { title: '帮助中心', nav: '/help' } },
    { path: '/Login/:res?/:mode?', component: () => import('@/components/login/login'), meta: { title: '登录' } },
    { path: '/protocol', component: () => import('@/components/login/protocol'), meta: { title: '用户协议及隐私政策' } },
    {
      path: '/Need',
      component: () => import('@/components/need/Need'),
      children: [
        { path: '/FindTeam', component: () => import('@/components/need/FindTeam'), meta: { title: '找团队', nav: '/FindTeam' } },
        { path: '/FindWorker', component: () => import('@/components/need/FindWorker'), meta: { title: '找工人', nav: '/FindWorker' } },
        { path: '/TeamFindJob', component: () => import('@/components/need/TeamFindJob'), meta: { title: '团队找活', nav: '/TeamFindJob' } },
        { path: '/WorkFindJob', component: () => import('@/components/need/WorkFindJob'), meta: { title: '工人找活', nav: '/WorkFindJob' } },
        { path: '/ProjectInfo', component: () => import('@/components/need/ProjectInfo'), meta: { title: '项目信息', nav: '/ProjectInfo' } },
        { path: '/TeamResume/:id', component: () => import('@/components/need/TeamResume'), meta: { title: '团队简历', nav: '/FindTeam' } },
        { path: '/WorkerResume/:id', component: () => import('@/components/need/WorkerResume'), meta: { title: '个人简历', nav: '/FindWorker' } },
        { path: '/ComResume/:id', component: () => import('@/components/need/ComResume'), meta: { title: '企业主页', nav: '/ComResume' } },
        { path: '/TFJ_details/:id', component: () => import('@/components/need/TFJ_details'), meta: { title: '团队找活详情', nav: '/TeamFindJob' } },
        { path: '/WFJ_details/:id', component: () => import('@/components/need/WFJ_details'), meta: { title: '工人找活详情', nav: '/WorkFindJob' } },
        { path: '/Project_details/:id', component: () => import('@/components/need/Project_details'), meta: { title: '项目信息详情', nav: '/ProjectInfo' } },
        { path: '/News_center', component: () => import('@/components/need/News_center'), meta: { title: '新闻中心', nav: '/News_center' } },
        { path: '/News_details', component: () => import('@/components/need/News_details'), meta: { title: '新闻详情', nav: '/News_center' } }
      ]
    },
    // 2.1
    { path: '/Fxnxpon20AVospA9', component: () => import('@/components/login/Fxnxpon20AVospA9'), meta: { title: '一键登录' } },
    {
      path: '/Admin',
      component: () => import('@/components/admin/Admin'),
      children: [
        {path: '/Message_official', component: () => import('@/components/admin/Message_official'), meta: {title: '站内信',part: 'admin', nav: '/Message_official'}},
        {path: '/Info_follow', component: () => import('@/components/admin/Info_follow'), meta: {title: '我的关注',part: 'admin', nav: '/Info_follow'}},
        {path: '/My_resume', component: () => import('@/components/admin/My_resume'), meta: {title: '我的简历',part: 'admin', nav: '/My_resume'}},
        //2.1
        {path: '/My_resumeList', component: () => import('@/components/admin/My_resumeList'), meta: {title: '我的简历',part: 'admin', nav: '/My_resumeList'}},
        {path: '/My_resumePlus/:id?', component: () => import('@/components/admin/My_resumePlus'), meta: {title: '编辑简历',part: 'admin', nav: '/My_resumePlus'}},
        {path: '/My_teamList', component: () => import('@/components/admin/My_teamList'), meta: {title: '我的团队',part: 'admin', nav: '/My_teamList'}},
        {path: '/My_teamPlus/:id?', component: () => import('@/components/admin/My_teamPlus'), meta: {title: '编辑简历',part: 'admin', nav: '/My_teamPlus'}},
        {path: '/BringPlus/:id', component: () => import('@/components/admin/BringPlus'), meta: {title: '团队招聘',part: 'admin', nav: '/BringPlus'}},
        {path: '/My_team', component: () => import('@/components/admin/My_team'), meta: {title: '团队简历',part: 'admin', nav: '/My_team'}},
        {path: '/Member', component: () => import('@/components/admin/Member'), meta: {title: '成员管理',part: 'admin', nav: '/Member'}},
        {path: '/Bring', name: 'Bring', component: () => import('@/components/admin/Bring'), meta: {title: '招聘管理',part: 'admin', nav: '/Bring'}},
        {path: '/Com_bring', name: 'Com_bring', component: () => import('@/components/admin/Com_bring'), meta: {title: '招聘管理',part: 'admin', nav: '/Com_bring'}},
        {path: '/Add_members/:tid/:id?', name: 'Add_members', component: () => import('@/components/admin/Add_members'), meta: {title: '添加成员',part: 'admin', nav: '/Add_members'}},
        {path: '/Recruit_form/:publisher/:id?', name: 'Recruit_form', component: () => import('@/components/admin/Recruit_form'), meta: {title: '编辑招聘信息',part: 'admin', nav: '/Recruit_form'}},
        {path: '/Com_resume', component: () => import('@/components/admin/Com_resume'), meta: {title: '企业主页',part: 'admin', nav: '/Com_resume'}},
        {path: '/Account_safe_new', component: () => import('@/components/admin/Account_safe_new'), meta: {title: '账户安全',part: 'admin', nav: '/Account_safe_new'}},//账户安全
        {path: '/License', component: () => import('@/components/admin/License'), meta: {title: '资质证书',part: 'admin', nav: '/License'}},
        {path: '/Add_license', component: () => import('@/components/admin/Add_license'), meta: {title: '添加资质证书',part: 'admin', nav: '/License'}},
        {path: '/Mobile_binding', name: 'Mobile_binding', component: () => import('@/components/admin/Mobile_binding'), meta: {title: '手机绑定',part: 'admin', nav: '/Mobile_binding'}},
        {path: '/Email_binding', component: () => import('@/components/admin/Email_binding'), meta: {title: '邮箱绑定',part: 'admin', nav: '/Email_binding'}},
        {path: '/Bank_binding', component: () => import('@/components/admin/Bank_binding'), meta: {title: '银行卡绑定',part: 'admin', nav: '/Bank_binding'}},
        {path: '/MPM', component: () => import('@/components/admin/MPM'), meta: {title: '项目管理',part: 'admin', nav: '/MPM'}},
        {path: '/ProjectForm/:id?', name: 'ProjectForm', component: () => import('@/components/admin/ProjectForm'), meta: {title: '编辑项目信息',part: 'admin', nav: '/ProjectForm'}},

        // 钱包
        {path: '/wallet_balance', component: () => import('@/components/admin/wallet/wallet_balance'), meta: {title: '我的余额',part: 'admin', nav: '/wallet_balance'}},
        {path: '/setPassword/:fir?', component: () => import('@/components/admin/wallet/setPassword'), meta: {title: '修改支付密码',part: 'admin', nav: '/wallet_balance'}},
        {path: '/recharge', component: () => import('@/components/admin/wallet/recharge'), meta: {title: '充值',part: 'admin', nav: '/wallet_balance'}},
        {path: '/rechargeSuccess', component: () => import('@/components/admin/wallet/rechargeSuccess'), meta: {title: '充值成功',part: 'admin', nav: '/wallet_balance'}},
        {path: '/bill', component: () => import('@/components/admin/wallet/bill'), meta: {title: '账单',part: 'admin', nav: '/wallet_balance'}},
        {path: '/fillDetails/:type/:id', component: () => import('@/components/admin/wallet/fillDetails'), meta: {title: '账单',part: 'admin', nav: '/wallet_balance'}},
      ]
    },
    { path: '/Account_identity_new', component: () => import('@/components/admin/Account_identity_new'), meta: { title: '身份管理', part: 'admin', nav: '/Account_identity_new' } }, // 身份管理
    { path: '/Attestation_per/:role?', name: 'Attestation_per', component: () => import('@/components/admin/Attestation_per'), meta: { title: '身份认证', part: 'admin', nav: '/Attestation_per' } },
    { path: '/Attestation_com/:role', component: () => import('@/components/admin/Attestation_com'), meta: { title: '身份认证', part: 'admin', nav: '/Attestation_com' } },
    //////////
    {path: '/vip', component: () => import('@/components/vip/index'), meta: {title: '会员充值', nav: '/vip'}},
    {path: '/aboutUs', component: () => import('@/components/us/aboutUs'), meta: {title: '关于我们', nav: '/aboutUs'}},
    {path: '/contactUs', component: () => import('@/components/us/contactUs'), meta: {title: '联系我们', nav: '/contactUs'}},
    //招采中心
    {
      path: '/recr',
      component: () => import('@/components/recr/recr'),
      children: [
        { path: '/', component: () => import('@/components/recr/index/index'), meta: { title: '招采中心-爱搬砖', nav: '/recr' } },
        { path: '/zhaoList', component: () => import('@/components/recr/index/zhaoList'), meta: { title: '招标采购', nav: '/zhaoList' } },
        { path: '/xunList', component: () => import('@/components/recr/index/xunList'), meta: { title: '询价采购', nav: '/xunList' } },
        { path: '/comList', component: () => import('@/components/recr/index/comList'), meta: { title: '采购企业', nav: '/comList' } },
        { path: '/comPage/:uid', component: () => import('@/components/recr/index/comPage'), meta: { title: '招采商主页', nav: '/comPage' } },
        { path: '/recrDetails/:id', component: () => import('@/components/recr/index/recrDetails'), meta: { title: '招标详情', nav: '/recrDetails' } },
        {
          path: '/re_admin',
          component: () => import('@/components/recr/admin/re_admin'),
          children: [
            { path: '/', component: () => import('@/components/recr/admin/proList'), meta: { title: '我的项目', nav: '/proList' } },
            { path: '/chooseType', component: () => import('@/components/recr/admin/chooseType'), meta: { title: '我的项目', nav: '/chooseType' } },
            { path: '/zhaoForm/:id?', name: 'zhaoForm', component: () => import('@/components/recr/admin/zhaoForm'), meta: { title: '我的项目', nav: '/zhaoForm' } },
            { path: '/xunForm/:id?', name: 'xunForm', component: () => import('@/components/recr/admin/xunForm'), meta: { title: '我的项目', nav: '/xunForm' } },
            { path: '/attention', component: () => import('@/components/recr/admin/attention'), meta: { title: '我的关注', nav: '/attention' } }
          ]
        }
      ]
    }
  ]
})
