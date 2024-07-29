import { setupStore } from "@/store";
import type { App } from "vue";

export default {
  install(app: App<Element>) {
    // 状态管理(store)
    setupStore(app);
  },
};
