import { http } from '@/utils/http';

const baseApi = '/system/oss';

/* OSS服务端直传信息 */
export const getOssPolicy = params => {
  return http.request('get', `${baseApi}/policy`, { params });
};

/* 临时凭证 */
export const getOssCredential = () => {
  return http.request('get', `${baseApi}/credential`);
};
