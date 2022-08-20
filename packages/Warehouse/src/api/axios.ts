import Axios from "@alien/utils/axios";
import type { AxiosRequestConfig } from "axios";
import { useLocation } from "@alien/hooks";
const Auth = "Auth";
// 获取token
export const [auth] = useLocation(Auth, "123");

const request = new Axios({
  baseURL: "http://v.juhe.cn",
});

request.instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 一般会请求拦截里面加token，用于后端的验证
    const token = auth.value as string;
    if (token) {
      console.log("@@token", token);
      //  config.headers!.Authorization = token;
    }
    return config;
  },
  (err: any) => {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(err);
  }
);

export default request;
