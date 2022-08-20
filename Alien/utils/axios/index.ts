// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Result<T> = {
  code: number;
  message: string;
  result: T;
};
// 导出Request类，可以用来自定义传递配置来创建实例
export default class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }
  public get<T = any>(requestPara: {
    url: string;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(requestPara.url, requestPara.config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}
