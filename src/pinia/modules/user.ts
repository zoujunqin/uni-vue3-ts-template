import { defineStore } from 'pinia';
import { ShallowRef, shallowRef } from 'vue';
import SystemInfo = UniNamespace.SystemInfo;

export const useUserStore = defineStore('user', () => {
  const userInfo: ShallowRef<SystemInfo> = shallowRef({} as any);

  const setUserInfo = (info: SystemInfo) => {
    userInfo.value = info;
  };

  return { userInfo, setUserInfo };
});
