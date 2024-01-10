import { http } from '@/utils/http';

const baseApi = '/fe/wechat/worker';

export interface IRealNameAuthParam {
  invitationCodeId?: number;
  properties?: Array<{ fieldCode: string; value: Record<string, any> }>;
  taskId?: number;
}
/* 实名认证 */
export const realNameAuth = (data: IRealNameAuthParam): Promise<{}> => {
  return http.request('put', `${baseApi}/realname_authentication`, { data });
};

export interface IGetRealNameInfoParam {
  invitationCodeId?: number;
  taskId?: number;
}
// export interface IRealNameInfo {
//   appealStatus: string;
//   propertyGroups: Array<{
//     properties: Array<{
//       fieldCode: string;
//       izRequired: boolean;
//       labelName: string;
//       sort: number;
//       value: string;
//       valueType: string;
//     }>;
//   }>;
//   rejectCause: string;
// }
/* 获取实名信息 */
// export const getRealNameInfo = (
//   params: IGetRealNameInfoParam
// ): Promise<IRealNameInfo> => {
//   return http.request('get', `${baseApi}/realname_info`, { params });
// };
/* 获取实名信息 */
export const getRealNameInfo = params => {
  return http.request('get', `${baseApi}/realname_info`, { params });
};
/* 实名认证-用户申诉 */
export const postAppealSubmit = data => {
  return http.request('post', `${baseApi}/appeal/submit`, { data });
};
