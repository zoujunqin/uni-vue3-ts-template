import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useAreaStore = defineStore(
  'area',
  () => {
    const areaData = shallowRef([]);

    const setAreaData = async () => {
      // 对接接口
      areaData.value = [];
    };

    return { areaData, setAreaData };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: true
  }
);
