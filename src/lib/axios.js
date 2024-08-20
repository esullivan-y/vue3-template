import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: "/qqdn-core",
});
const TOKEN_HEADER = "Authorization";

axiosRequest.interceptors.request.use(
  (config) => {
    // 在发送请求之前消息头加入token token
    const token = "";
    if (token) {
      config.headers[TOKEN_HEADER] = token;
    } else {
      delete config.headers[TOKEN_HEADER];
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    // 根据content-type ，判断是否为 json 数据
    const contentType = response.headers["content-type"]
      ? response.headers["content-type"]
      : response.headers["Content-Type"];
    if (contentType.indexOf("application/json") === -1) {
      return Promise.resolve(response);
    }

    const res = response.data;
    //    console.table(res)
    if (res.code === 200 || res.code === "200") {
      return Promise.resolve(res.data);
    } else {
      console.log({ type: "warning", message: res.msg });
    }

    return Promise.resolve(res.data);
  },
  (error) => {
    // 对响应错误做点什么
    console.error(error);
    return Promise.reject(error);
  }
);

export const getRequestApi = (configApi) => {
  const Http = {}; // 包裹请求方法的容器

  // 请求格式/参数的统一
  for (const key in { ...configApi }) {
    // async 作用：避免进入回调地狱
    Http[key] = async function (
      params, // 请求参数 get：url，put，post，patch（data），delete：url
      isFormData = false, // 标识是否是form-data请求
      config = {} // 配置参数
    ) {
      const api = { ...configApi[key] }; // url method
      //  content-type是否是form-data的判断
      if (params) {
        params = { ...params };
        for (const key in params) {
          if (api.url.includes(`{${key}}`)) {
            api.url = api.url.replace(`{${key}}`, params[key]);
            delete params[key];
          }
        }
        if (isFormData) {
          const newParams = new FormData();
          for (const i in params) {
            newParams.append(i, params[i]);
          }
          params = newParams;
        }
      }

      // 不同请求的判断
      let response = {}; // 请求的返回值
      if (api.method === "put" || api.method === "post" || api.method === "patch") {
        try {
          response = await axiosRequest[api.method](api.url, params, config);
        } catch (err) {
          response = err;
        }
      } else if (api.method === "delete" || api.method === "get") {
        config.params = params;
        try {
          response = await axiosRequest[api.method](api.url, config);
        } catch (err) {
          response = err;
        }
      }

      return response; // 返回响应值
    };
  }
  return Http;
};
