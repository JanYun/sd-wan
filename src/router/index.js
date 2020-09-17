import Vue from 'vue';
import vuex from '@/store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let otherRouter = [];
const files = require.context('./', true, /\.js$/);
// 路由自动化导入
files.keys().forEach(key => {
  if (key !== './index.js' && files(key).default) {
    otherRouter = [...otherRouter, ...[...files(key).default]];
  }
});

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/administration',
        name: 'Administration',
        meta: {
          title: '组织管理'
        },
        component: () => import('views/administration/Administration'),
        children: [
          {
            path: '/administration/Organize',
            name: 'Organize',
            meta: {
              title: '组织'
            },
            component: () => import('views/administration/organize/Organize')
          },
          {
            path: '/administration/organize-users',
            name: 'OrganizeUsers',
            meta: {
              title: '组织成员'
            },
            component: () =>
              import('views/administration/organizeUsers/OrganizeUsers')
          }
        ]
      },
      {
        path: '/workflows',
        name: 'Workflows',
        meta: {
          title: '设备'
        },
        component: () => import('views/workflows/Workflows'),
        children: [
          {
            path: '/workflows/templates',
            name: 'Templates',
            meta: {
              title: '模板'
            },
            component: () => import('views/workflows/templates/Templates')
          },
          {
            path: '/workflows/spoke-groups',
            name: 'SpokeGroups',
            meta: {
              title: '组织'
            },
            component: () => import('views/workflows/spokeGroups/SpokeGroups')
          },
          {
            path: '/workflows/devices',
            name: 'Devices',
            meta: {
              title: '设备'
            },
            component: () => import('views/workflows/devices/Devices')
          }
        ]
      },
      ...otherRouter
    ],
    component: () => import('views/home/Home')
  }
];

// 本地开发时启用本地登录
if (process.env.VUE_APP_BUILD_MODE !== 'poc') {
  routes.push({
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login')
  });
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = vuex.state.common.token;
  if (!token && to.meta?.auth) {
    vuex.commit('common/to_login', { to, from, next });
  } else {
    next();
  }
});

export default router;
