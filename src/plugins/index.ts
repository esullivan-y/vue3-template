import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import type { App } from "vue";

export default {
  install(app: App<Element>) {
    // 路由(router)
    setupRouter(app);
    // 状态管理(store)
    setupStore(app);
  },
};
