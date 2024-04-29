import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

import { getAreaTreeProvinceCityDistrict } from '@/api/system/area';

export const useAreaStore = defineStore(
  'area',
  () => {
    const areaData = shallowRef([]);

    const setAreaData = async () => {
      areaData.value = await getAreaTreeProvinceCityDistrict();
    };

    return { areaData, setAreaData };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: true
  }
);
