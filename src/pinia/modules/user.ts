import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

import { getPersonInfo } from '@/api/fe/wechat/personal_center';

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = shallowRef<{
      workerName?: string;
      mobile?: string;
      izRealNameAuthenticationName?: string;
      izBindBankCard?: string;
      totalAmount?: number;
    }>();
    const setUserInfo = async () => {
      userInfo.value = (await getPersonInfo()) || {};
    };

    // 扫码登录用户二维码 id
    const sceneOption = shallowRef<{ t?: string; c?: string }>({});
    const setSceneOption = (option: { t: string; c?: string }) => {
      sceneOption.value = option;
    };
    const token = shallowRef('');
    const setToken = (val: string) => {
      token.value = val;
    };

    return {
      userInfo,
      setUserInfo,

      token,
      setToken,

      sceneOption,
      setSceneOption
    };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: true
  }
);
