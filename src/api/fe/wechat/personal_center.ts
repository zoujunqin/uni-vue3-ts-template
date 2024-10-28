import { http } from '@/utils/http';

const baseApi = '/fe/wechat/personal_center';

/* 获取个人中心数据 */
export const getPersonInfo = () => {
  return http.request('get', `${baseApi}`, { loading: false });
};
