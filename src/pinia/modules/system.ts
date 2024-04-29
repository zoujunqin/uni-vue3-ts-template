import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

import GetSystemInfoResult = UniNamespace.GetSystemInfoResult;

export const useSystemStore = defineStore(
  'system',
  () => {
    const systemInfo = shallowRef<GetSystemInfoResult>({} as any);

    const setSystemInfo = (info: GetSystemInfoResult) => {
      systemInfo.value = info;
    };

    return { systemInfo, setSystemInfo };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: true
  }
);
