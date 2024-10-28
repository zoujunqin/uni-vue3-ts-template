import { http } from '@/utils/http';

const baseApi = '/system/sms';

/* 发送短信验证码 */
export const sms = data => {
  return http.request('post', `${baseApi}`, {
    data
  });
};
