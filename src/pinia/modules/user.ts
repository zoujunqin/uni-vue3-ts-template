import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

import { IPersonInfo, getPersonInfo } from '@/api/fe/wechat/personal_center';
import {
  getToken as getPersistenceToken,
  getUserInfo as getPersistenceUserInfo,
  removeToken as removeTokenForever,
  removeUserInfo as removeUserInfoForever,
  setToken as setTokenPersist,
  setUserInfo as setUserInfoPersist
} from '@/utils/user';

export const useUserStore = defineStore('user', () => {
  /* --------------------- 用户信息 ↓ ---------------------- */
  const userInfo = shallowRef<IPersonInfo | null>();
  const setUserInfo = (info: IPersonInfo) => {
    userInfo.value = info;
    setUserInfoPersist(info);
  };
  const getUserInfo = () => {
    return userInfo.value || getPersistenceUserInfo();
  };
  const removeUserInfo = () => {
    userInfo.value = null;
    removeUserInfoForever();
  };
  const fetchUserInfo = () => {
    getPersonInfo().then(setUserInfo);
  };

  /* --------------------- token ↓ ---------------------- */
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

  /* 退出登录 */
  const logout = () => {
    removeToken();
    removeUserInfo();
    uni.reLaunch({ url: '/pages/login/index' });
  };

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    removeUserInfo,
    fetchUserInfo,

    token,
    setToken,
    getToken,
    removeToken,

    logout
  };
});
