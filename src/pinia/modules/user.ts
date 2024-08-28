import { defineStore } from 'pinia';
import { shallowRef, ref } from 'vue';

import { getPersonInfo } from '@/api/fe/wechat/personal_center';

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<{
      workerName?: string;
      mobile?: string;
      izRealNameAuthenticationName?: string;
      izBindBankCard?: string;
      totalAmount?: number;
    }>({});
    const setUserInfo = async () => {
      userInfo.value = (await getPersonInfo()) || {};
    };

    // t 是场景， c 是参数
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
    unistorage: {
      paths: ['userInfo', 'token']
    }
  }
);
