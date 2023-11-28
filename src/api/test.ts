import { http } from '@/utils/http';

const baseApi = '/si/social_security_add';

interface IMemberListParams {
  addMonth: string;
  cityId: number;
  createEndTime: string;
  createStartTime: string;
  customer: string;
  idNo: string;
  name: string;
  serviceContract: string;
  page: number;
  pageSize: number;
}
/** 获取增员列表 */
export const getAddedMemberList = (params: IMemberListParams) => {
  return http.request('get', `${baseApi}/page_list`, {
    params
  });
};
