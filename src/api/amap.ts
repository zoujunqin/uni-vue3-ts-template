import { http } from '@/utils/http/amap';

/* 高德地图 key 来源个人（zoujunqin） */
const key = '45f96a869b35c39fbc535b86a5ba9619';

export const getGeo = (params: Record<string, any>) => {
  return http.request({
    method: 'get',
    url: '/geocode/geo',
    params: { key, ...params }
  });
};
