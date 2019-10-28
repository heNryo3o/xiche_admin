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
        title: '美优洁车管理后台',
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
      breadcrumb: false,
      roles: ['user/workers','user/index'],
    },
    children: [{
        path: 'user-list',
        component: () => import('@/views/user/user-list'),
        name: 'UserList',
        meta: {
          roles: ['user/index'],
          title: '用户列表'
        }
      },
      {
        path: 'worker-join',
        component: () => import('@/views/user/worker-join'),
        name: 'UserLog',
        meta: {
          roles: ['user/workers'],
          title: '洗车工审核'
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: {
      title: '订单管理',
      icon: 'order',
      breadcrumb: false,
      roles: ['order/index']
    },
    children: [{
        path: 'order-list',
        component: () => import('@/views/order/order-list'),
        name: 'OrderList',
        meta: {
          roles: ['order/index'],
          title: '订单列表'
        }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    name: 'Account',
    meta: {
      title: '财务管理',
      icon: 'account',
      breadcrumb: false,
      roles: ['account/worker-deposit','account/worker-withdraw','account/user-deposit','account/success-order']
    },
    children: [{
        path: 'coupon',
        component: () => import('@/views/account/coupon'),
        name: 'Coupon',
        meta: {
          roles: ['account/coupon'],
          title: '优惠券'
        }
      },
      {
        path: 'worker-deposit',
        component: () => import('@/views/account/worker-deposit'),
        name: 'WorkerDeposit',
        meta: {
          roles: ['account/worker-deposit'],
          title: '洗车工押金流水'
        }
      },
      {
        path: 'worker-withdraw',
        component: () => import('@/views/account/worker-withdraw'),
        name: 'WorkerWithdraw',
        meta: {
          roles: ['account/worker-withdraw'],
          title: '洗车工提现审核'
        }
      },
      {
        path: 'user-deposit',
        component: () => import('@/views/account/user-deposit'),
        name: 'UserDeposit',
        meta: {
          roles: ['account/user-deposit'],
          title: '用户预存流水'
        }
      },
      {
        path: 'success-order',
        component: () => import('@/views/account/success-order'),
        name: 'SuccessOrder',
        meta: {
          roles: ['account/success-order'],
          title: '成交订单流水'
        }
      }
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
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'setting',
      breadcrumb: false
    },
    children: [{
        path: 'price',
        component: () => import('@/views/system/price'),
        name: 'Price',
        meta: {
          roles: ['price'],
          title: '系统设置'
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
