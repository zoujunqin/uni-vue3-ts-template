import { http } from '@/utils/http';

const baseApi = '/fe/wechat';

/* 手机号获取凭证登录 - 微信登录 */
export const weChatLogin = (data): Promise<{ token: string }> => {
  return http.request('post', `${baseApi}/code_login`, { data });
};

export interface ISmsParam {
  invitationCodeId?: string;
  mobile: string;
  smsCode: string;
}
/* 手机号验证码登录 */
export const smsLogin = (data: ISmsParam): Promise<{ token: string }> => {
  return http.request('post', `${baseApi}/sms_login`, { data });
};

/* 获取推荐任务列表 */
export const getRecommendTaskList = params => {
  return http.request('get', `${baseApi}/public_task`, { params });
};
