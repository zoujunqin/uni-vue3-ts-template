import { http } from '@/utils/http';

const baseApi = '/uom/user';

/** 登录 */
export const getLogin = () => {
  return http.request('post', `${baseApi}/login`, {
    data: { mobile: '13111111111', password: '12345678' }
  });
};
