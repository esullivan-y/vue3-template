//  src/utils/request.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const userStore = useUserStoreHook();
    // if (userStore.token) {
    //   config.headers.Authorization = userStore.token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    // 登录成功
    if (code == "200") {
      return Promise.resolve(response.data);
    } else {
      console.log({ type: "warning", message: msg });
    }

    // ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
