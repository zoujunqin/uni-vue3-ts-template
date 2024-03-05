// @ts-nocheck

import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer
} from 'axios';
import { stringify } from 'qs';

import {
  PureHttpError,
  PureHttpRequestConfig,
  PureHttpResponse,
  RequestMethods
} from './types.d';

import { getUUID } from '@/utils';
import { decryptString, encryptString } from '@/utils/crypto';
import { formatToken, getToken, removeToken } from '@/utils/user';
const httpNoMessage = [
  '/fe/fe_worker_protocol/invitation_protocol_sign_url_for_task',
  '/fe/fe_worker_protocol/invitation_protocol_sign_url_for_code'
];
const baseUrlMap = {
  // development: 'http://218.104.230.173:17054',
  development: 'https://localdev-hro-api.fjhxrl.com',
  // development: 'http://192.168.3.48:8100', // 林伦
  // development: 'http://192.168.117.86:8100', // 大立
  production: 'https://localtest-hro-api.fjhxrl.com/'
};

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: baseUrlMap[import.meta.env.MODE],
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
  adapter: createUniAppAxiosAdapter()
};

const dictionarySort = list => list.sort();

/** 对参数进行字典序并拼接成字符串 */
const getQueryString = (params): string => {
  let queryString = '';
  const sortedParams = dictionarySort(Object.keys(params));
  for (const param of sortedParams) {
    if (params[param] !== undefined) {
      queryString += param + '=' + params[param] + '&';
    }
  }
  queryString = queryString.slice(0, -1);
  return queryString;
};

const isNeedDecrypt = response =>
  response.headers['Enable-Response-Decrypt'] !== 'False';

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {};

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        config.loading && uni.showLoading({ title: '加载中...' });
        // 验签步骤
        const formData = config.params || '';
        const requestBody = config.data || '';
        const queryString = getQueryString(formData);
        const requestBodyString =
          (requestBody && JSON.stringify(requestBody)) || '';
        let finalString = queryString;
        if (requestBodyString) {
          finalString = finalString
            ? `${finalString}&${requestBodyString}`
            : requestBodyString;
        }
        const apiUrl = config.url;
        const authorization = getToken();
        const randomString = getUUID();

        const timestamp = Date.now().toString();
        config.headers['Random-String'] = randomString;
        config.headers['Timestamp'] = timestamp;

        const list = [
          `Authorization=${authorization}`,
          `Random-String=${randomString}`,
          `Timestamp=${timestamp}`,
          apiUrl,
          finalString
        ].filter(Boolean);

        const fullStringList = dictionarySort(list);

        const fullString = fullStringList.join(';');

        const encryptedString = encryptString(fullString);

        config.headers['Signature'] = encryptedString;

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
      (response: PureHttpResponse) => {
        const $config = response.config;
        let responseData = response.data;
        if (isNeedDecrypt(response)) {
          responseData = JSON.parse(decryptString(responseData));
        }
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
      (error: PureHttpError) => {
        const $error = error;
        let responseData: any = $error.response.data;
        if (isNeedDecrypt($error.response)) {
          responseData = JSON.parse(decryptString(responseData));
        }
        const customDealCodes = ['50004'];
        // 跳转到登录页面 401、40102、40103、40104
        const loginFailureCodeList = ['401', '40102', '40103', '40104'];
        if (loginFailureCodeList.includes(responseData.code)) {
          uni.showToast({ title: '授权过期，请重新登录', icon: 'none' });
          removeToken();
          /* TODO: 暂时注释 */
          // uni.reLaunch({ url: '/pages/login/index' });
        } else if (!customDealCodes.includes(responseData.code)) {
          if (!httpNoMessage.includes($error.config.url)) {
            uni.showToast({
              title: responseData.message || '接口异常',
              icon: 'none'
            });
          }
        }

        $error.isCancelRequest = Axios.isCancel($error);
        uni.hideLoading();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T = any>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
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

  public baseUrl = defaultConfig.baseURL;
}

export const http = new PureHttp();
