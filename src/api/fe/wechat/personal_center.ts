import { http } from '@/utils/http';

const baseApi = '/fe/wechat/personal_center';

export interface IPersonInfo {
  workerName: string;
  mobile: string;
  idCardReverse: string;
  idCardNo: string;
  idCardFront: string;
  appealStatus: string;
}
/* 获取个人信息 */
export const getPersonInfo = (): Promise<IPersonInfo> => {
  return http.request('get', `${baseApi}/info`);
};

/** 获取银行卡 */
export const getPersonalCenterBankCard = () => {
  return http.request('get', `${baseApi}/bank_card`);
};

/** 获取个人信息二级页面 */
export const getPersonalCenterInfo = () => {
  return http.request('get', `${baseApi}/info`);
};

/** 获取我的商保 */
export const getPersonalCenterInsurance = () => {
  return http.request('get', `${baseApi}/commercial_insurance`);
};

/** 获取我的合同 */
export const getPersonalCenterContract = (params: unknown) => {
  return http.request('get', `${baseApi}/contract`, { params });
};
