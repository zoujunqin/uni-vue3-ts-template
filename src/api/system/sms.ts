import { http } from '@/utils/http';

const baseApi = '/system/sms';

interface ISmsParam {
  captchaId?: string;
  captchaVal?: number;
  mobile: string;
  type: string;
}
/* 发送短信验证码 */
export const sms = (data: ISmsParam) => {
  return http.request('post', `${baseApi}/policy`, { data });
};
