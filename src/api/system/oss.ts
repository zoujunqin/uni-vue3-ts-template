import { http } from '@/utils/http';

const baseApi = '/system/oss';

/* OSS服务端直传信息 */
export const getOssPolicy = (params: unknown) => {
  return http.request('get', `${baseApi}/policy`, { params });
};

/* 获取 oss http 路径 */
export const getOssHttpPath = data => {
  return http.request('post', `${baseApi}/presigned_url`, { data });
};
