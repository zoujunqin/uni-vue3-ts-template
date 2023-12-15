import { defineStore } from 'pinia';
import { ShallowRef, shallowRef } from 'vue';

import GetSystemInfoResult = UniNamespace.GetSystemInfoResult;

export const useSystemStore = defineStore('system', () => {
  const systemInfo: ShallowRef<GetSystemInfoResult> = shallowRef({} as any);

  const setSystemInfo = (info: GetSystemInfoResult) => {
    systemInfo.value = info;
  };

  return { systemInfo, setSystemInfo };
});
