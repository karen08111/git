import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    component: () => import('./views/index/index'),
    meta: { title: '首页' },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('smToken')) {
        next('/company')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/register/register'),
    meta: { title: '申请账号' }
  },
  {
    path: '/newsLists',
    name: 'newsLists',
    component: () => import('./views/index/newsLists'),
    meta: { title: '新闻资讯' }
  },
  {
    path: '/newsDetails/:id',
    name: 'newsDetails',
    component: () => import('./views/index/newsDetails'),
    meta: { title: '新闻详情' }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('./views/personal'),
    meta: { title: '个人中心' }
  },
  {
    path: '/payrollBank',
    name: 'payrollBank',
    component: () => import('./views/index/payrollBank'),
    meta: { title: '代发银行设置' }
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('./views/index/changePassword'),
    meta: { title: '修改密码' }
  },
  {
    path: '/enterProject/contract/add',
    name: 'contractorsAdd',
    component: () => import('./views/enterProject/contractors/add'),
    meta: { title: '新建参建单位' }
  },
  {
    path: '/enterProject/contract/edit',
    name: 'edit',
    component: () => import('./views/enterProject/contractors/edit'),
    meta: { title: '修改参建单位信息' }
  },
  {
    path: '/enterProject/contract/detail/:id',
    name: 'detail',
    component: () => import('./views/enterProject/contractors/detail'),
    meta: { title: '修改参建单位信息' }
  },
  {
    path: '/enterProject/class/detail/:id',
    name: 'classDetail',
    component: () => import('./views/enterProject/class/detail'),
    meta: { title: '班组详情' }
  },
  {
    path: '/enterProject/worker/detail/:id',
    name: 'workerDetail',
    component: () => import('./views/enterProject/worker/detail'),
    meta: { title: '工人详情' }
  },
  {
    path: '/enterProject/train/add',
    name: 'trainAdd',
    component: () => import('./views/enterProject/train/add'),
    meta: { title: '添加培训记录' }
  },
  {
    path: '/enterProject/trainDetail/:id',
    name: 'trainDetail',
    component: () => import('./views/enterProject/train/detail'),
    meta: { title: '培训记录详情' }
  },
  {
    path: '/enterProject/trainEdit/:id',
    name: 'trainEdit',
    component: () => import('./views/enterProject/train/edit'),
    meta: { title: '编辑培训记录' }
  },
  {
    path: '/enterProject/financing/salary/add',
    name: 'addSalary',
    component: () => import('./views/enterProject/financing/salary/add'),
    meta: { title: '新增工资单' }
  },
  {
    path: '/enterProject/financing/salary/edit/:id',
    name: 'editSalary',
    component: () => import('./views/enterProject/financing/salary/edit'),
    meta: { title: '编辑工资单' }
  },
  {
    path: '/enterProject/financing/salary/detail/:id',
    name: 'detailSalary',
    component: () => import('./views/enterProject/financing/salary/detail'),
    meta: { title: '工资单详情' }
  },
  {
    path: '/enterProject/workerBadness/add',
    name: 'addWorkerBadness',
    component: () => import('./views/enterProject/badness/worker/add'),
    meta: { title: '新增工人不良记录' }
  },
  {
    path: '/enterProject/workerBadness/edit/:id',
    name: 'editWorkerBadness',
    component: () => import('./views/enterProject/badness/worker/edit'),
    meta: { title: '编辑工人不良记录' }
  },
  {
    path: '/enterProject/workerBadness/detail/:id',
    name: 'detailWorkerBadness',
    component: () => import('./views/enterProject/badness/worker/detail'),
    meta: { title: '工人不良记录详情' }
  },
  {
    path: '/enterProject/contractorsBadness/add',
    name: 'addContractorsBadness',
    component: () => import('./views/enterProject/badness/contractors/add'),
    meta: { title: '新增参建单位不良记录' }
  },
  {
    path: '/enterProject/contractorsBadness/edit/:id',
    name: 'editContractorsBadness',
    component: () => import('./views/enterProject/badness/contractors/edit'),
    meta: { title: '编辑参建单位不良记录' }
  },
  {
    path: '/enterProject/contractorsBadness/detail/:id',
    name: 'detailContractorsBadness',
    component: () => import('./views/enterProject/badness/contractors/detail'),
    meta: { title: '参建单位不良记录详情' }
  },
  {
    path: '/enterProject/contracts/add',
    name: 'addContract',
    component: () => import('./views/enterProject/financing/contract/add'),
    meta: { title: '新增合同' }
  },
  {
    path: '/enterProject/contracts/detail/:id',
    name: 'detailContract',
    component: () => import('./views/enterProject/financing/contract/detail'),
    meta: { title: '合同详情' }
  },
  {
    path: '/enterProject/contracts/edit/:id',
    name: 'editContract',
    component: () => import('./views/enterProject/financing/contract/edit'),
    meta: { title: '编辑合同' }
  },
  {
    path: '/enterProject/workQualification/add',
    name: 'addWorkQualification',
    component: () => import('./views/enterProject/workQualification/add'),
    meta: { title: '新增工人资质' }
  },
  {
    path: '/enterProject/workQualification/detail/:id',
    name: 'detailWorkQualification',
    component: () => import('./views/enterProject/workQualification/detail'),
    meta: { title: '工人资质详情' }
  },
  {
    path: '/enterProject/workQualification/edit/:id',
    name: 'editWorkQualification',
    component: () => import('./views/enterProject/workQualification/edit'),
    meta: { title: '编辑工人资质' }
  },
  {
    path: '/addPro',
    name: 'addPro',
    component: () => import('./views/company/project/add'),
    meta: { title: '添加项目' }
  },
  {
    path: '/proDetail/:id',
    name: 'proDetail',
    component: () => import('./views/company/project/detail'),
    meta: { title: '项目详情' }
  },
  {
    path: '/editPro/:id',
    name: 'editPro',
    component: () => import('./views/company/project/edit'),
    meta: { title: '修改项目' }
  },
  {
    path: '/builCorp/edit/:id',
    name: 'editBuildCorp',
    component: () => import('./views/company/buildCorp/edit'),
    meta: { title: '修改参建单位信息' }
  },
  {
    path: '/builCorp/detail/:id',
    name: 'detailBuildCorp',
    component: () => import('./views/company/buildCorp/detail'),
    meta: { title: '修改参建单位信息' }
  },
  {
    path: '/builCorp/add',
    name: 'addBuildCorp',
    component: () => import('./views/company/buildCorp/add'),
    meta: { title: '新增参建单位' }
  }
]

export const companyRoutes = [
  {
    path: '/company',
    name: 'company',
    redirect: { name: '/company/comindex' },
    component: () => import('./views/company/company'),
    meta: { title: '企业级' },
    beforeEnter: (to, from, next) => {
      if (store.getters.role !== 0) {
        next('/')
      } else {
        next()
      }
    },
    children: [
      {
        path: '/company/comindex',
        name: '/company/comindex',
        component: () => import('./views/company/index'),
        meta: { title: '首页' }
      },
      {
        path: '/company/workers',
        name: '/company/workers',
        component: () => import('./views/company/workers'),
        meta: { title: '工人库' }
      },
      {
        path: '/company/contractors',
        name: '/company/contractors',
        component: () => import('./views/company/contractors'),
        meta: { title: '参建单位库' }
      },
      {
        path: '/company/projects',
        name: '/company/projects',
        component: () => import('./views/company/projects'),
        meta: { title: '项目管理' }
      },
      // { path: 'salarys', name: 'salarys', component: () => import('./views/company/salarys'), meta: { title: '工资管理' } },
      // { path: 'compacts', name: 'compacts', component: () => import('./views/company/compacts'), meta: { title: '合同管理' } },
      // { path: 'badness', name: 'badness', component: () => import('./views/company/badness'), meta: { title: '不良记录' } },
      {
        path: 'badness',
        name: 'badness',
        redirect: '/badness/workerBadness',
        component: () => import('./views/company/badness'),
        meta: { title: '不良记录' },
        children: [
          {
            path: '/badness/workerBadness',
            name: '/badness/workerBadness',
            component: () => import('./views/company/record/worker'),
            meta: { title: '工人不良记录' }
          },
          {
            path: '/badness/contractorsBadness',
            name: '/badness/contractorsBadness',
            component: () => import('./views/company/record/contractors'),
            meta: { title: '参建单位不良记录' }
          }
        ]
      },
      {
        path: '/company/train',
        name: '/company/train',
        component: () => import('./views/company/train'),
        meta: { title: '项目培训' }
      }
      // {
      //   path: '/company/news',
      //   name: '/company/news',
      //   component: () => import('./views/company/news'),
      //   meta: { title: '新闻资讯' }
      // }
    ]
  }
]
export const enterRoutes = [
  {
    path: '/enterProject',
    name: '/enterProject/enterProject',
    redirect: '/enterProject/projectIndex',
    component: () => import('./views/enterProject/enterProject'),
    meta: { title: '项目详情' },
    beforeEnter: (to, from, next) => {
      if (store.getters.role !== 0) {
        next('/')
      } else {
        next()
      }
    },
    children: [
      {
        path: '/enterProject/projectIndex',
        name: '/enterProject/projectIndex',
        component: () => import('./views/enterProject/projectIndex'),
        meta: { title: '项目首页' }
      },
      {
        path: '/enterProject/seeEnter',
        name: '/enterProject/seeEnter',
        component: () => import('./views/enterProject/seeEnter'),
        meta: { title: '参建单位库' }
      },
      {
        path: '/enterProject/class',
        name: '/enterProject/class',
        component: () => import('./views/enterProject/class'),
        meta: { title: '班组' }
      },
      {
        path: '/enterProject/enterWorker',
        name: '/enterProject/enterWorker',
        redirect: '/enterProject/troops',
        component: () => import('./views/enterProject/comIn'),
        meta: { title: '工人管理' },
        children: [
          {
            path: '/enterProject/workbook',
            name: '/enterProject/workbook',
            component: () => import('./views/enterProject/enterWorker'),
            meta: { title: '工人花名册' }
          },
          {
            path: '/enterProject/workbook/detail/:id',
            name: '/enterProject/workbook/detail',
            component: () => import('./views/enterProject/worker/detail'),
            meta: { title: '工人详情', hidden: true }
          },
          {
            path: '/enterProject/workQualification',
            name: '/enterProject/workQualification',
            component: () => import('./views/enterProject/workQualification'),
            meta: { title: '工人资质' }
          }
        ]
      },
      {
        path: '/enterProject/comIn',
        name: '/enterProject/comIn',
        redirect: '/enterProject/troops',
        component: () => import('./views/enterProject/comIn'),
        meta: { title: '出入统计' },
        children: [
          {
            path: '/enterProject/troops',
            name: '/enterProject/troops',
            component: () =>
              import('./views/enterProject/comInChildren/troops'),
            meta: { title: '参建单位出入汇总' }
          },
          {
            path: '/enterProject/workTroops',
            name: '/enterProject/workTroops',
            component: () =>
              import('./views/enterProject/comInChildren/workTroops'),
            meta: { title: '工人出入统计' }
          },
          {
            path: '/enterProject/troopSee',
            name: '/enterProject/troopSee',
            component: () =>
              import('./views/enterProject/comInChildren/troopSee'),
            meta: { title: '出入查询' }
          },
          {
            path: '/enterProject/troopRecordSee',
            name: '/enterProject/troopRecordSee',
            component: () =>
              import('./views/enterProject/comInChildren/troopRecordSee'),
            meta: { title: '出入记录查询' }
          }
        ]
      },
      {
        path: '/enterProject/record',
        name: '/enterProject/record',
        redirect: '/enterProject/workerBadness',
        component: () => import('./views/enterProject/record'),
        meta: { title: '不良记录' },
        children: [
          {
            path: '/enterProject/workerBadness',
            name: '/enterProject/workerBadness',
            component: () => import('./views/enterProject/badness/worker'),
            meta: { title: '工人不良记录' }
          },
          {
            path: '/enterProject/contractorsBadness',
            name: '/enterProject/contractorsBadness',
            component: () => import('./views/enterProject/badness/contractors'),
            meta: { title: '参建单位不良记录' }
          }
        ]
      },
      {
        path: '/enterProject/rewards',
        name: '/enterProject/rewards',
        redirect: '/enterProject/award',
        component: () => import('./views/enterProject/rewards'),
        meta: { title: '奖惩记录' },
        children: [
          {
            path: '/enterProject/award',
            name: '/enterProject/award',
            component: () =>
              import('./views/enterProject/rewardChildren/award'),
            meta: { title: '奖励记录' }
          },
          {
            path: '/enterProject/punishment',
            name: '/enterProject/punishment',
            component: () =>
              import('./views/enterProject/rewardChildren/punishment'),
            meta: { title: '惩罚记录' }
          },
          {
            path: '/enterProject/awardFormTeam/:id?',
            name: '/enterProject/awardFormTeam',
            component: () =>
              import('./views/enterProject/rewardChildren/awardFormTeam'),
            meta: { title: '奖励记录', hidden: true }
          },
          {
            path: '/enterProject/awardFormWorker/:id?',
            name: '/enterProject/awardFormWorker',
            component: () =>
              import('./views/enterProject/rewardChildren/awardFormWorker'),
            meta: { title: '奖励记录', hidden: true }
          },
          {
            path: '/enterProject/awardDetails/:role/:id',
            name: '/enterProject/awardDetails',
            component: () =>
              import('./views/enterProject/rewardChildren/awardDetails'),
            meta: { title: '奖励记录详情', hidden: true }
          },
          {
            path: '/enterProject/punFormTeam/:id?',
            name: '/enterProject/punFormTeam',
            component: () =>
              import('./views/enterProject/rewardChildren/punFormTeam'),
            meta: { title: '惩罚记录', hidden: true }
          },
          {
            path: '/enterProject/punFormWorker/:id?',
            name: '/enterProject/punFormWorker',
            component: () =>
              import('./views/enterProject/rewardChildren/punFormWorker'),
            meta: { title: '惩罚记录', hidden: true }
          },
          {
            path: '/enterProject/punDetails/:role/:id',
            name: '/enterProject/punDetails',
            component: () =>
              import('./views/enterProject/rewardChildren/punDetails'),
            meta: { title: '惩罚记录详情', hidden: true }
          }
        ]
      },
      {
        path: '/enterProject/financing',
        name: '/enterProject/financing',
        redirect: '/enterProject/enterSalary',
        component: () => import('./views/enterProject/financing'),
        meta: { title: '财务管理' },
        children: [
          {
            path: '/enterProject/contract',
            name: '/enterProject/contract',
            component: () => import('./views/enterProject/financing/contract'),
            meta: { title: '合同管理' }
          },
          {
            path: '/enterProject/enterSalary',
            name: '/enterProject/enterSalary',
            component: () => import('./views/enterProject/financing/salary'),
            meta: { title: '工资管理' }
          }
        ]
      },
      {
        path: '/enterProject/enterProjectTarin',
        name: '/enterProject/enterProjectTarin',
        component: () => import('./views/enterProject/proTrain'),
        meta: { title: '项目培训' }
      }
    ]
  }
]

const router = new Router({
  // mode: 'history',
  routes: [
    ...constantRoutes,
    ...companyRoutes,
    ...enterRoutes /* ,
    { path: '*', redirect: '/' } */
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// let needExitDialogRoute = ['/enterProject/train/add']
// router.beforeEach((to, from, next) => {
//   if (needExitDialogRoute.indexOf(from.path) > -1) {
//     next()
//   }
//   next()
// })

router.afterEach((to, from) => {
  const title = to.meta.title
  if (title) document.title = title
  if (to.matched[0].name === 'company') localStorage.setItem('proId', '')
})

export default router
