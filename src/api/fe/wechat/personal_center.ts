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
export interface IPersonCenterInfo {
  izBindBankCard: string;
  izRealNameAuthenticationName: string;
  mobile: string;
  totalAmount: number;
  workerName: string;
}

/* 获取个人中心数据 */
export const getPersonInfo = (): Promise<IPersonCenterInfo> => {
  return http.request('get', `${baseApi}`, { loading: false });
};

/** 获取银行卡 */
export const getPersonalCenterBankCard = () => {
  return http.request('get', `${baseApi}/bank_card`);
};

/** 获取个人信息二级页面 */
export const getPersonalCenterInfo = () => {
  return http.request('get', `${baseApi}/info`, {}, { loading: false });
};

/** 获取我的商保 */
export const getPersonalCenterInsurance = () => {
  return http.request('get', `${baseApi}/commercial_insurance`);
};

/** 获取我的合同 */
export const getPersonalCenterContract = () => {
  return http.request('get', `${baseApi}/contract`);
};

/** 获取收入明细列表 */
export const getPersonalCenterIncomeList = (params: unknown) => {
  return http.request('get', `${baseApi}/income_list`, { params });
};

/** 获取收入客户列表 */
export const getPersonalCenterIncomeCustomer = () => {
  return http.request('get', `${baseApi}/income/customer`);
};

/** 获取收入明细详情 */
export const getPersonalCenterByIdIncome = (id: number) => {
  return http.request('get', `${baseApi}/${id}/income`);
};
