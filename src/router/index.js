import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '大学士管理后台',
        icon: 'dashboard',
        breadcrumb: false
      }
    }]
  }
]

export const asyncRoutes = [{
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '平台用户',
      icon: 'user',
      breadcrumb: false
    },
    children: [{
        path: 'user-list',
        component: () => import('@/views/user/user-list'),
        name: 'UserList',
        meta: {
          title: '用户列表'
        }
      },
      {
          path: 'user-log',
          component: () => import('@/views/user/user-log'),
          name: 'UserLog',
          meta: {
            title: '登录注册日志'
          }
        },
      {
        path: 'validate-person',
        component: () => import('@/views/user/validate-person'),
        name: 'ValidatePerson',
        meta: {
          title: '个人认证'
        }
      },
      {
        path: 'validate-company',
        component: () => import('@/views/user/validate-company'),
        name: 'ValidateCompany',
        meta: {
          title: '企业认证'
        }
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    name: 'Task',
    meta: {
      title: '店铺相关',
      icon: 'store',
      breadcrumb: false
    },
    children: [
      {
        path: 'store-list',
        component: () => import('@/views/store/store-list'),
        name: 'StoreList',
        meta: {
          title: '店铺管理'
        }
      },
      {
        path: 'service-list',
        component: () => import('@/views/store/service-list'),
        name: 'ServiceList',
        meta: {
          title: '服务管理'
        }
      },
      {
        path: 'case',
        component: () => import('@/views/store/case-list'),
        name: 'Case',
        meta: {
          title: '案例管理'
        }
      },
    ]
  },

  {
    path: '/operation',
    component: Layout,
    name: 'Operation',
    meta: {
      title: '运营相关',
      icon: 'operation',
      breadcrumb: false
    },
    children: [{
        path: 'news',
        component: () => import('@/views/operation/news-list'),
        name: 'News',
        meta: {
          title: '新闻管理',
          noCache: false,
        }
      },
      {
        path: 'news-edit/:id(\\d+)',
        component: () => import('@/views/operation/news-edit'),
        name: 'NewsEdit',
        meta: {
          title: '发布新闻',
          noCache: false,
          activeMenu: '/operation/news'
        },
        hidden: true
      },
      {
        path: 'help',
        component: () => import('@/views/operation/help'),
        name: 'Help',
        meta: {
          title: '帮助中心'
        }
      },
      {
        path: 'friendly-links',
        component: () => import('@/views/operation/friendly-links'),
        name: 'FriendlyLinks',
        meta: {
          title: '友情链接'
        }
      }
    ]
  },

  {
    path: '/task',
    component: Layout,
    name: 'Task',
    meta: {
      title: '需求管理',
      icon: 'task',
      breadcrumb: false
    },
    children: [{
      path: 'task-list',
      component: () => import('@/views/task/task-list'),
      name: 'TaskList',
      meta: {
        title: '需求列表'
      }
    },
    {
      path: 'task-join',
      component: () => import('@/views/task/task-join'),
      name: 'TaskJoin',
      meta: {
        title: '参与任务记录'
      }
    }]
  },

  {
    path: '/offline',
    component: Layout,
    name: 'Offline',
    meta: {
      title: '线下对接',
      icon: 'offline',
      breadcrumb: false
    },
    children: [{
        path: 'offline-list',
        component: () => import('@/views/offline/offline-list'),
        name: 'OfflineList',
        meta: {
          title: '项目列表'
        }
      },
      {
        path: 'offline-calculate',
        component: () => import('@/views/offline/offline-calculate'),
        name: 'OfflineCalculate',
        meta: {
          title: '对接统计'
        }
      }
    ]
  },

  {
    path: '/vip',
    component: Layout,
    name: 'System',
    meta: {
      title: '会员相关',
      icon: 'vip',
      breadcrumb: false
    },
    children: [{
        path: 'version',
        component: () => import('@/views/vip/version'),
        name: 'version',
        meta: {
          title: '会员版本'
        }
      },
      {
        path: 'offline-order',
        component: () => import('@/views/vip/offline-order'),
        name: 'OfflineOrder',
        meta: {
          title: '线下订单'
        }
      },
      {
        path: 'unapprove-order',
        component: () => import('@/views/vip/unapprove-order'),
        name: 'UnapproveOrder',
        meta: {
          title: '待审核订单'
        }
      }
    ]
  },

  {
    path: '/tuliao',
    component: Layout,
    name: 'Push',
    meta: {
      title: '涂料频道',
      icon: 'tuliao',
      breadcrumb: false
    },
    children: [{
        path: 'question',
        component: () => import('@/views/tuliao/question'),
        name: 'Question',
        meta: {
          title: '问答版块'
        }
      },
      {
        path: 'solution-person',
        component: () => import('@/views/tuliao/solution-person'),
        name: 'SolutionPerson',
        meta: {
          title: '个人解决方'
        }
      },
      {
        path: 'solution-company',
        component: () => import('@/views/tuliao/solution-company'),
        name: 'SolutionCompany',
        meta: {
          title: '企业解决方'
        }
      },
      {
        path: 'news',
        component: () => import('@/views/tuliao/news'),
        name: 'News',
        meta: {
          title: '行业资讯'
        }
      },
      {
        path: 'digest',
        component: () => import('@/views/tuliao/digest'),
        name: 'Digest',
        meta: {
          title: '技术文摘'
        }
      },
      {
        path: 'hire',
        component: () => import('@/views/tuliao/hire'),
        name: 'Hire',
        meta: {
          title: '招人才'
        }
      },
      {
        path: 'seek-job',
        component: () => import('@/views/tuliao/seek-job'),
        name: 'SeekJob',
        meta: {
          title: '找工作'
        }
      },
    ]
  },

  {
    path: '/admin',
    component: Layout,
    name: 'Admin',
    meta: {
      roles: ['admin', 'role', 'permission'],
      title: '员工管理',
      icon: 'admin',
      breadcrumb: false
    },
    children: [{
        path: 'admin',
        component: () => import('@/views/admin/admin'),
        name: 'AdminList',
        meta: {
          roles: ['admin'],
          title: '管理员'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'Role',
        meta: {
          roles: ['role'],
          title: '角色管理'
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/admin/permission'),
        name: 'Permission',
        meta: {
          roles: ['permission'],
          title: '权限管理'
        }
      }
    ]
  },

  {
    path: '/push',
    component: Layout,
    name: 'Push',
    meta: {
      title: '消息通知',
      icon: 'message',
      breadcrumb: false
    },
    children: [{
        path: 'template-list',
        component: () => import('@/views/push/template-list'),
        name: 'TemplateList',
        meta: {
          title: '消息模版'
        }
      },
      {
        path: 'push-logs',
        component: () => import('@/views/push/push-logs'),
        name: 'PushLogs',
        meta: {
          title: '推送日志'
        }
      },
    ]
  },
  {
    path: '/category',
    component: Layout,
    name: 'Category',
    meta: {
      title: '分类管理',
      icon: 'category',
      breadcrumb: false
    },
    children: [{
      path: 'base',
      component: () => import('@/views/category/category'),
      name: 'Category',
      meta: {
        title: '系统分类'
      }
    },
    {
      path: 'tag',
      component: () => import('@/views/category/tag'),
      name: 'Tag',
      meta: {
        title: '标签管理'
      }
    },
    {
      path: 'question-category',
      component: () => import('@/views/category/question-category'),
      name: 'QuestionCategory',
      meta: {
        title: '问题分类'
      }
    },
    {
      path: 'hire-category',
      component: () => import('@/views/category/hire-category'),
      name: 'HireCategory',
      meta: {
        title: '岗位分类'
      }
    }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'setting',
      breadcrumb: false
    },
    children: [{
        path: 'base',
        component: () => import('@/views/system/base'),
        name: 'Base',
        meta: {
          title: '基本设置'
        }
      },
      {
        path: 'areas',
        component: () => import('@/views/system/areas'),
        name: 'Roles',
        meta: {
          title: '地区管理'
        }
      },
      {
        path: 'file',
        component: () => import('@/views/system/file'),
        name: 'File',
        meta: {
          title: '文件上传记录'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
