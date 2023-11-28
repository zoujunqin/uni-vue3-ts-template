import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userInfo = shallowRef({} as any);

  const setUserInfo = info => {
    userInfo.value = info;
  };

  return { userInfo, setUserInfo };
});
