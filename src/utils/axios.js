import axios from "axios";
import { message } from "antd";
import { getToken } from "./index";
// import router from "../router";

// 1. 创建axios实例
const instance = axios.create({
  // 接口
  baseURL: "/api",
  // 超时时间
  timeout: 50000,
});
// 2.请求拦截
instance.interceptors.request.use(
  (config) => {
    let token = getToken();
    if (token) {
      config.headers["token"] = token;
      // config.headers["access_token"] = token;
      // config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    //  请求发生错误，抛出异常
    Promise.reject(error);
  }
);

// 3.响应拦截
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error && error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          message.error("请求错误");
          break;
        case 401:
          message.error("未授权，请重新登录");
          // router.push("/login");
          break;
        case 403:
          message.error("拒绝访问");
          break;
        case 404:
          message.error("请求错误，未找到相应的资源");
          // router.push("/login");
          break;
        case 500:
          message.error("服务器内部错误");
          break;
        default:
          message.error("请求失败");
      }
    } else {
      if (JSON.stringify(error).includes("timeout")) {
        message.error("服务器响应超时，请刷新页面");
      }
      // message.error("连接服务器失败");
    }
    return Promise.reject(error);
  }
);
// 4.导出 axios 实例
export default instance;
