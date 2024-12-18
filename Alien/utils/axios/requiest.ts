import axios from "axios";
import { getToken, getRefreshToken, setToken } from "../auth";
import { omit } from "lodash";
import { message } from "ant-design-vue";
const RefreshTokenUrl = import.meta.env.VITE_APP_BASEURL + "/auth/refreshToken";
let isRefreshing = false; // 标记是否正在刷新 token
let requests: Array<(T: any) => void> = []; // 存储待重发请求的数组
const instace = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 1000000000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 刷新 access_token 的接口
const refreshToken = () => {
  return instace.post(RefreshTokenUrl, {
    refreshToken: getRefreshToken(),
  });
};

instace.interceptors.request.use(
  (req) => {
    // 配置是否需要token
    if (req.params && req.params.noAuth) {
      return {
        ...req,
        params: omit(req.params, ["noAuth"]),
      };
    } else {
      req.headers ? (req.headers["X-Access-Token"] = `${getToken()} `) : null;
      return req;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

instace.interceptors.response.use(
  (res) => {
    if (res.data.code == 401) {
      message.error("未知错误，请联系管理员。");
      setTimeout(() => {
        location.href = "/login";
      }, 1000);
      return res;
    }
    if (
      res.data.status != 200 &&
      res.data.code != 200 &&
      res.data.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      res.data.type != "application/pdf"
    ) {
      message.error(res.data?.message || "未知错误，请联系管理员。");
    }
    return res;
  },
  (error) => {
    if (error.response.code === 401) {
      location.href = "/login";
      console.log(object);
      return;
    }
    if (!error.response) {
      message.error("未知错误，请联系管理员。");
      return Promise.reject(error);
    }
    if (
      error.response.code === 401 &&
      !error.config.url.includes(RefreshTokenUrl)
    ) {
      location.href = "/login";
      const { config } = error;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then((res) => {
            if (res.data.status != 200) {
              location.href = "/login";
              return;
            }
            const { accessToken } = res.data.data;
            setToken(accessToken);
            config.headers.Authorization = `Bearer ${accessToken} `;
            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => cb(accessToken));
            requests = []; // 重新请求完清空
            return instace(config);
          })
          .catch((err) => {
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token: any) => {
            config.headers.Authorization = `Bearer ${token} `;
            resolve(instace(config));
          });
        });
      }
    } else if (
      error.response.code === 400 ||
      error.response.code === 404 ||
      error.response.code === 500
    ) {
      message.error(
        error.response.data.message
          ? error.response.data.message
          : "未知错误，请联系管理员。"
      );
    } else {
      location.href = "/login";
      message.error(
        error.response.data.message
          ? error.response.data.message
          : "未知错误，请联系管理员。"
      );
    }
    return Promise.reject(error);
  }
);

export default instace;
