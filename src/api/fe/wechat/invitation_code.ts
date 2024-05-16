import { http } from '@/utils/http';

const baseApi = '/fe/wechat/invitation_code';

/** 【实名认证】绑定邀请码 */
export const getInvitationCodeScan = (id: string) => {
  return http.request('get', `${baseApi}/${id}/scan`);
};
