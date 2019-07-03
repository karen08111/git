import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from '@/utils/auth'
import { Toast } from 'vant';
import http from '@/axios.js'
Vue.use(Toast);
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index/index'),
      meta: {title: '爱搬砖',keepAlive:false,active:0}
    },
    {
      path: '/login',
      component: () => import('./views/login/login'),
      meta: {title: '登录',active:2}
    },
    {
      path: '/protocol',
      component: () => import('./views/login/protocol'),
      meta: {title: '爱搬砖协议',active:2}
    },
    {
      path: '/details',
      component: () => import('./views/details/index'),
      meta: {title: '信息详情'}
    },
    {
      path: '/homePage/:type/:uid',
      component: () => import('./views/homePage/index'),
      meta: {title: '会员主页'}
    },
    {
      path: '/news_center',
      component: () => import('./views/news/center'),
      meta: {title: '新闻中心'}
    },
    {
      path: '/news_details/:id',
      component: () => import('./views/news/details'),
      meta: {title: '新闻详情'}
    },
    {
    	path:'/personal',
    	name:'personal',
    	component: () => import('./views/personal/personal'),
    	meta: {title: '个人中心',active:2}
    },
    {
    	path:'/abz',
    	name:'abz',
    	component: () => import('./views/personal/abz'),
    	meta: {title: '爱搬砖微信公众号',active:2}
    },
    {
			path:'/account',
			component: () => import('./views/personal/account'),
			meta: {title: '账户安全',active:2}
		},
		{
			path:'/myRelease',
			component: () => import('./views/personal/myRelease'),
			meta: {title: '我的发布',active:2}
		},
		{
			path:'/myAttention',
			component: () => import('./views/personal/myAttention'),
			meta: {title: '我的关注',active:2},
			beforeEnter:(to,from,next)=>{
				if(getToken()){
					next();
				}else {
					Toast.fail('尚未登录');
					setTimeout(function(){
						 router.push('/login')
					},1500)
				}
				
			}
		},
		{
			path:'/personalHome',
			component: () => import('./views/personal/personalHome'),
			meta: {title: '个人主页',active:2}
		},
		{
			path:'/identitySelect',
			component: () => import('./views/identity/identitySelect'),
			meta: {title: '身份认证类型选择',active:2},
			beforeEnter:(to,from,next)=>{
				if(getToken()){
						next();
				}else {
					Toast.fail('尚未登录');
					setTimeout(function(){
						router.push('/login')
					},1500)
				}
				
			}
		},
		{
			path:'/identifyFlow/:id',
			component: () => import('./views/identity/identifyFlowFlow'),
			meta: {title: '身份认证流程',active:2},
			children: [
				{
					path:'/',
					component: () => import('./views/identity/children/first'),
					meta: {title: '初级认证',active:2}
				},
				{
					path:'/two',
					component: () => import('./views/identity/children/two'),
					meta: {title: '中级认证',active:2}
				},
				{
					path:'/three',
					component:() => import('./views/identity/children/three'),
					meta: {title: '高级认证',active:2}
				}
			]
		},
		{
			path:'/geren/:id',
			component: () => import('./views/details/geren'),
			meta: {title: '个人',active:0}
		},
		{
			path:'/team/:id',
			component: () => import('./views/details/team'),
			meta: {title: '团队',active:0}
		},
		{
			path:'/invite',
			component: () => import('./views/details/invite'),
			meta: {title: '招聘',active:0}
		},
		{
			path:'/screen',
			component: () => import('./views/screen/screen'),
			meta: {title: '筛选',active:0}
		},
		{
			path:'/publicity',
			component: () => import('./views/publicity/publicity'),
			meta: {title: '我要入驻',active:1}
		},
		{
			path:'/screenList',
			component: () => import('./views/screen/screenList'),
			meta: {title: '',active:2}
		},
		{
			path:'/information/:id',
			component: () => import('./views/details/information'),
			meta: {title: '信息详情'}
		},
		{
			path:'/projectDetail/:id',
			component: () => import('./views/details/projectDetail'),
			meta: {title: '项目详情'}
		},
		{
			path:'/compayMain/:id',
			component: () => import('./views/details/compayMain'),
			meta: {title: '企业主页'}
		},
		{
			path:'/gerenIdent',
			component: () => import('./views/identity/gerenIdent'),
			meta: {title: '个人认证',active:2}
		},
		{
			path:'/qiyeIdent',
			component: () => import('./views/identity/qiyeIdent'),
			meta: {title: '企业认证',active:2}
		},
		{
			path:'/souList',
			component: () => import('./views/screen/souList'),
			meta: {title: '搜索列表'}
		},
		{
			path:'/resumPerson',
			component: () => import('./views/resum/resumPerson/index'),
			meta: {title: '主页',active:2},
			beforeEnter:(to,from,next)=>{
				http.get("/member/resume/edit").then(res=>{
					if(res.code == 200) {
						next();
					}
				})
			},
			children: [
				{
					path:'/',
					component: () => import('./views/resum/resumPerson/children/All'),
					meta: {title: '个人简历',active:2}
				},
				{
					path:'/addBasic',
					component: () => import('./views/resum/resumPerson/children/addBasic'),
					meta: {title: '基本信息',active:2}
				},
				{
					path:'/addJob/:id',
					component: () => import('./views/resum/resumPerson/children/addJob'),
					meta: {title: '工作经历',active:2}
				},
				{
					path:'/addContent',
					component: () => import('./views/resum/resumPerson/children/addContent'),
					meta: {title: '个人介绍',active:2}
				},
				{
					path:'/addBook',
					component: () => import('./views/resum/resumPerson/children/addBook'),
					meta: {title: '资质证书',active:2}
				},
			]
		},
		{
			path:'/team',
			component: () => import('./views/resum/team/index'),
			meta: {title: '主页',active:2},
//			beforeEnter:(to,from,next)=>{
////				http.get("/member/resume/edit").then(res=>{
////					if(res.code == 200) {
////						next();
////					}
////				})
//			},
			children: [
				{
					path:'/',
					component: () => import('./views/resum/team/children/All'),
					meta: {title: '团队简历',active:2}
				},
				{
					path:'/TeamaddBasic',
					component: () => import('./views/resum/team/children/addBasic'),
					meta: {title: '基本信息',active:2}
				},
				{
					path:'/TeamaddJob/:id',
					component: () => import('./views/resum/team/children/addJob'),
					meta: {title: '工作经历',active:2}
				},
				{
					path:'/TeamaddContent',
					component: () => import('./views/resum/team/children/addContent'),
					meta: {title: '个人介绍',active:2}
				},
				{
					path:'/TeamaddBook',
					component: () => import('./views/resum/team/children/addBook'),
					meta: {title: '资质证书',active:2}
				},
			]
		},
		{
			path:'/enter',
			component:() => import('./views/resum/enter/index'),
			meta: {title:'企业主页',active:2},
			children: [
				{
					path:'/',
					component: () => import('./views/resum/enter/children/All'),
					meta: {title:'企业主页',active:2}
				},
				{
					path:'/enterContent',
					component: () => import('./views/resum/enter/children/enterContent'),
					meta: {title:'企业介绍',active:2}
				},
				{
					path:'/enterBasic',
					component: () => import('./views/resum/enter/children/enterBasic'),
					meta: {title:'基础信息',active:2}
				},
				{
					path:'/enterBook',
					component: () => import('./views/resum/enter/children/enterBook'),
					meta: {title:'企业证书',active:2}
				},
				{
					path:'/enterPhoto',
					component: () => import('./views/resum/enter/children/enterPhoto'),
					meta: {title:'企业图集',active:2}
				}
			]
		},
		{
			path:'/inviteList/:publisher',
			component: () => import('./views/personal/invite/inviteList'),
			meta: {title: '招聘列表',keepAlive:true,active:2},
			beforeEnter:(to,from,next)=>{
				http.get("/member/recruit").then(res=>{
//					console.log(res)
					if(res.code == 200) {
						next()
					}
				})
			}
		},
		{
			path:'/inviteForm/:id',
			component: () => import('./views/personal/invite/inviteForm'),
			meta: {title: '填写招聘信息',active:2}
		},
		{
			path:'/memberList',
			component: () => import('./views/personal/member/memberList'),
			meta: {title: '成员管理',active:2},
		},
		{
			path:'/memberForm',
			component: () => import('./views/personal/member/memberForm'),
			meta: {title: '填写成员信息',active:2}
		},
		{
			path:'/bindPhone',
			component: () => import('./views/login/bindPhone'),
			meta: {title: '绑定手机号',active:2}
		},
		{
			path:'/kong',
			component: () => import('./views/login/kong'),
			meta: {title: '登录',active:2}
		},
    //   邀请
    {
      path: '/invitation',
      redirect: '/invitation/inviterLogin',
      component: () => import('./views/invite/index'),
      children: [
        {
          path: 'inviterLogin',
          name: 'inviterLogin',
          component: () => import('./views/invite/inviterLogin'),
          meta: {title: '邀请人登录',active:2}
        },
        {
          path: 'inviteeLogin',
          component: () => import('./views/invite/inviteeLogin'),
          meta: {title: '被邀请人注册',active:2}
        },
        {
          path: 'invite',
          name: 'invite',
          component: () => import('./views/invite/invite'),
          meta: {title: '邀请注册',active:2}
        },
        {
          path: 'joinForm',
          name: 'joinForm',
          component: () => import('./views/invite/joinForm'),
          meta: {title: '个人信息',active:2}
        },
        {
          path: 'assistance/:count?',
          name: 'assistance',
          component: () => import('./views/invite/assistance'),
          meta: {title: '助力工友',active:2}
        },
        {
          path: 'teamList/:role',
          component: () => import('./views/invite/teamList'),
          meta: {title: '全部工友团',active:2}
        }
      ]
    },
		{
			path: '/wallet',
			name: 'wallet',
			component: () => import('./views/wallet/index'),
			meta: {title: '我的钱包',active:2, isAdmin: true}
		},
		{
			path: '/wa_getCode',
			name: 'wa_getCode',
			component: () => import('./views/wallet/wa_getCode'),
			meta: {title: '设置支付密码',active:2, isAdmin: true}
		},
		{
			path: '/wa_setPass',
			name: 'wa_setPass',
			component: () => import('./views/wallet/wa_setPass'),
			meta: {title: '设置支付密码',active:2, isAdmin: true}
		},
		{
			path: '/wa_verPass',
			name: 'wa_verPass',
			component: () => import('./views/wallet/wa_verPass'),
			meta: {title: '设置支付密码',active:2, isAdmin: true}
		},
		{
			path: '/bill',
			name: 'bill',
			component: () => import('./views/wallet/bill'),
			meta: {title: '账单',active:2, isAdmin: true}
		},
		{
			path: '/billDetails/:type/:id',
			name: 'billDetails',
			component: () => import('./views/wallet/billDetails'),
			meta: {title: '账单详情',active:2, isAdmin: true}
		},
		{
			path: '/recharge',
			name: 'recharge',
			component: () => import('./views/wallet/recharge'),
			meta: {title: '充值',active:2, isAdmin: true}
		},
		{
			path: '/rechSuccess',
			name: 'rechSuccess',
			component: () => import('./views/wallet/rechSuccess'),
			meta: {title: '充值成功',active:2, isAdmin: true}
		},
		{
			path: '/vip',
			name: 'vip',
			component: () => import('./views/vip/index'),
			meta: {title: '会员开通',active:2, isAdmin: true}
		},
		{
			path: '/vipSuccess/:type',
			name: 'vipSuccess',
			component: () => import('./views/vip/vipSuccess'),
			meta: {title: '会员开通成功',active:2, isAdmin: true}
		}
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(to.meta.isAdmin && !getToken()){
  	next({path: '/login'})
	}
  next()
})

export default router


