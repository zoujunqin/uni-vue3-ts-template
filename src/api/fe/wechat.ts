import { http } from '@/utils/http';

const baseApi = '/fe/wechat';

export interface IWeChatParma {
  code: string;
  invitationCodeId?: number;
}
/* 手机号获取凭证登录 - 微信登录 */
export const loginWithWeChat = (
  data: IWeChatParma
): Promise<{ token: string }> => {
  return http.request('post', `${baseApi}/code_login`, { data });
};

export interface ISmsParam {
  invitationCodeId?: number;
  mobile: string;
  smsCode: string;
}
/* 手机号验证码登录 */
export const loginWithSms = (data: ISmsParam): Promise<{ token: string }> => {
  return http.request('post', `${baseApi}/sms_login`, { data });
};

export interface IGetRecommendTaskParam {
  page?: number;
  pageSize?: number;
  provinceCode?: number;
  taskName?: string;
  taskTypeId?: number;
}
export interface IRecommendTask {
  costTypeName: string;
  description: string;
  id: number;
  salaryMax: number;
  salaryMin: number;
  status: string;
  taskName: string;
  taskTypeName: string;
}
/* 获取推荐任务列表 */
export const getRecommendTaskList = (
  params: IGetRecommendTaskParam
): Promise<IRecommendTask> => {
  return http.request('get', `${baseApi}/public_task`, { params });
};
