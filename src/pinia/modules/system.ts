import { defineStore } from 'pinia';
import { ShallowRef, shallowRef } from 'vue';
import SystemInfo = UniNamespace.SystemInfo;

export const useSystemStore = defineStore('device', () => {
  const systemInfo: ShallowRef<SystemInfo> = shallowRef({} as any);

  const setSystemInfo = (info: SystemInfo) => {
    systemInfo.value = info;
  };

  return { systemInfo, setSystemInfo };
});
