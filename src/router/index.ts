import type { App } from "vue";
import { constantRoutes } from "./router";
import { createRouter, createWebHistory } from "vue-router";

// export const Layout = () => import("@/layout/index.vue");

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  strict: true,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
