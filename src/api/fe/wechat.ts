import { http } from '@/utils/http';

const baseApi = '/fe/wechat';

interface IWeChatParma {
  code: string;
  invitationCodeId?: number;
}
/* 手机号获取凭证登录 - 微信登录 */
export const loginWithWeChat = (
  data: IWeChatParma
): Promise<{ token: string }> => {
  return http.request('post', `${baseApi}/code_login`, { data });
};

interface ISmsParam {
  invitationCodeId?: number;
  mobile: string;
  smsCode: string;
}
/* 手机号验证码登录 */
export const loginWithSms = (data: ISmsParam): Promise<{ token: string }> => {
  return http.request('post', `${baseApi}/sms_login`, { data });
};

/** 获取银行卡 */
export const getPersonalCenterBankCard = () => {
  return http.request('get', `${baseApi}/personal_center/bank_card`);
};
