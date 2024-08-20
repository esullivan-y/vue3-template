import { RouteRecordRaw } from "vue-router";
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  //   {
  //     path: "/redirect",
  //     component: Layout,
  //     meta: { hidden: true },
  //     children: [
  //       {
  //         path: "/redirect/:path(.*)",
  //         component: () => import("@/views/redirect/index.vue"),
  //       },
  //     ],
  //   },
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
      icon: "HomeOutlined",
    },
    component: () => import("@/views/dashboard/index.vue"),
  },
  // {
  //   path: "/hot-issues",
  //   name: "hot-issues",
  //   meta: {
  //     title: "热点问题",
  //     icon: "HomeOutlined",
  //   },
  //   component: () => import("@/views/hot-issues/index.vue"),
  // },
  // {
  //   path: "/industry-analysis",
  //   name: "industry-analysis",
  //   meta: {
  //     title: "首页",
  //     icon: "HomeOutlined",
  //   },
  //   component: () => import("@/views/industry-analysis/index.vue"),
  // },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
    // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
    name: "Dashboard",
    meta: {
      title: "dashboard",
      icon: "homepage",
      affix: true,
      keepAlive: true,
    },
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  },

  //   {
  //     path: "/redirect",
  //     component: Layout,
  //     meta: { hidden: true },
  //     children: [
  //       {
  //         path: "/redirect/:path(.*)",
  //         component: () => import("@/views/redirect/index.vue"),
  //       },
  //     ],
  //   },
];
