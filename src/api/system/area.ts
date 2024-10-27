import { http } from '@/utils/http';

const baseApi = '/system/area';

/* 获取省市区 */
export const getAreaTreeProvinceCityDistrict = () => {
  return http.request('get', `${baseApi}/tree_province_city_district`);
};
