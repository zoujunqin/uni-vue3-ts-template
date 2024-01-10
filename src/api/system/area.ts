import { http } from '@/utils/http';

const baseApi = '/system/area';

/* 根据区域ID获取省市区 */
export const getAreaListByDistrictId = (params: unknown) => {
  return http.request('get', `${baseApi}/list_by_district_id`, { params });
};
