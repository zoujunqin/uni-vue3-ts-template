import {
  getToken as getPersistenceToken,
  removeToken as removeTokenForever,
  setToken as setTokenPersist
} from '@/utils/auth';
import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userInfo = shallowRef<Record<string, string | number>>({});
  const setUserInfo = (info: Record<string, string | number>) => {
    userInfo.value = info;
  };

  const token = shallowRef('');
  const setToken = (val: string) => {
    token.value = val;
    setTokenPersist(val);
  };
  const getToken = () => {
    return token.value || getPersistenceToken();
  };
  const removeToken = () => {
    token.value = '';
    removeTokenForever();
  };

  return { userInfo, setUserInfo, token, setToken, getToken, removeToken };
});
