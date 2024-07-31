import { http } from '@/utils/http';

export const baseApi = '/system/setting';

/**
 * 获取加密配置
 */
export const getEncryptionConfig = () => {
  return http.request('get', baseApi);
};
