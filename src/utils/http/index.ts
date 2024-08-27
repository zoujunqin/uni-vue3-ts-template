// @ts-nocheck

import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer
} from 'axios';
import { stringify } from 'qs';

import { addSignature } from '../addSignature';

import {
  PureHttpError,
  PureHttpRequestConfig,
  PureHttpResponse,
  RequestMethods
} from './types.d';

import { loginPagePath } from '@/constant/pagePath';
import { useSystemStore } from '@/pinia/modules/system';
import { useUserStore } from '@/pinia/modules/user';
import { decryptResponseData } from '@/utils/crypto';
import { formatToken } from '@/utils/storage';

const httpNoMessage = ['/fe/wechat/worker_protocol/sign'];

// const baseURL = 'http://218.104.230.173:17054'; // 开发环境
// const baseURL = 'https://localdev-hro-api.fjhxrl.com'; // 测试环境
// const baseURL = 'https://localtest-hro-api.fjhxrl.com'; // 测试环境
// const baseURL = 'https://hro-beta-gateway.fjhxrl.com'; // 预生产环境
// const baseURL = 'http://192.168.3.73:8100'; // 林伦 wifi
const baseURL = 'http://192.168.117.87:8100'; // 林伦 网线
// const baseURL = 'http://192.168.117.86:8100'; // 大立

const { DEV, VITE_BASE_URL } = import.meta.env;
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: DEV ? baseURL : VITE_BASE_URL,
  // 请求超时时间
  timeout: 30 * 1000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'tenant-key': '816495bacec0'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  },
  loading: true,
  adapter: createUniAppAxiosAdapter()
};

class PureHttp {
  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {};
  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
  public baseUrl = defaultConfig.baseURL;

  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** 通用请求工具函数 */
  public request<T = any>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const networkConnected = useSystemStore().networkStatus.isConnected;

    if (!networkConnected) {
      uni.showToast({ title: '当前无网络连接,请刷新重试', icon: 'none' });

      return Promise.reject(
        new AxiosError('network error', AxiosError.ERR_NETWORK, axiosConfig)
      );
    }

    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, config);
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('get', url, params, config);
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        config.loading && uni.showLoading();

        /* 验签 */
        addSignature(config);

        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config);
          return config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
          return config;
        }
        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        const whiteList = ['/login'];
        return whiteList.some(v => config.url.indexOf(v) > -1)
          ? config
          : new Promise(resolve => {
              const authorization = useUserStore().token;
              if (authorization) {
                config.headers['Authorization'] = formatToken(authorization);
              }
              resolve(config);
            });
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      async (response: PureHttpResponse) => {
        const $config = response.config;
        const responseData = await decryptResponseData(response);

        uni.hideLoading();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response);
          return responseData;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return responseData;
        }
        return responseData;
      },
      async (error: PureHttpError) => {
        uni.hideLoading();
        const $error = error;

        const iosTimeout = $error.code === AxiosError.ETIMEDOUT;
        const androidTimeout = $error.message === 'request:fail fail:time out';
        const timeout = iosTimeout || androidTimeout;
        if (timeout) {
          uni.showToast({ title: '请求超时', icon: 'none' });

          $error.isCancelRequest = Axios.isCancel($error);
          return Promise.reject({ ...$error, code: AxiosError.ETIMEDOUT });
        }

        const responseData: any = await decryptResponseData($error.response);
        $error.response.data = responseData;

        const { message, code } = responseData;

        //邀请码已失效70001
        const customDealCodes = ['70001'];
        // 跳转到登录页面 401
        const loginFailureCodeList = ['401', '40102', '40103', '40104'];

        if (loginFailureCodeList.includes(code)) {
          uni.clearStorageSync();
          uni.navigateTo({ url: loginPagePath });
        } else if (!customDealCodes.includes(code)) {
          // FIXME: 接口统一需要返回 code 70001
          if (!httpNoMessage.includes($error.config.url)) {
            uni.showToast({
              title: message || '接口异常',
              icon: 'none'
            });
          }
        }

        $error.isCancelRequest = Axios.isCancel($error);
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }
}

export const http = new PureHttp();
