import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import axios, { AxiosRequestConfig } from 'axios';

const defaultConfig: AxiosRequestConfig = {
  baseURL: 'https://restapi.amap.com/v3',
  // 请求超时时间
  timeout: 30 * 1000,
  adapter: createUniAppAxiosAdapter()
};

export const http = axios.create(defaultConfig);
