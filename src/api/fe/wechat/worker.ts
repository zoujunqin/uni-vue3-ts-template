import { http } from '@/utils/http';

const baseApi = '/fe/wechat/worker';

export interface IRealNameAuthParam {
  invitationCodeId?: string;
  properties?: Array<{ fieldCode: string; value: Record<string, any> }>;
  orderDetailId?: string;
}
/* 实名认证 */
export const realNameAuth = (data: IRealNameAuthParam): Promise<{}> => {
  return http.request('put', `${baseApi}/realname_authentication`, { data });
};

/* 获取实名信息 */
export const getRealNameInfo = params => {
  return http.request('get', `${baseApi}/realname_info`, { params });
};
/* 实名认证-用户申诉 */
export const postAppealSubmit = data => {
  return http.request('post', `${baseApi}/appeal/submit`, { data });
};
