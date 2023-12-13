import { http } from '@/utils/http';

const baseApi = '/fe/wechat/personal_center';

/** 获取银行卡 */
export const getPersonalCenterBankCard = () => {
  return http.request('get', `${baseApi}/bank_card`);
};
