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
