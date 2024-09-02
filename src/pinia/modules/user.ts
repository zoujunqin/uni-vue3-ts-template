import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

import { getPersonInfo } from '@/api/fe/wechat/personal_center';
import { getEncryptionConfig as getEncryptionConfigApi } from '@/api/system/setting';

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

    const isFirstFetchEncryption = ref(true);
    const encryptionConfig = ref({ enableRequestEncrypt: true });
    const getEncryptionConfig = async () => {
      encryptionConfig.value = await getEncryptionConfigApi();
    };
    const setFirstFetchEncryption = (isFirst: boolean) => {
      isFirstFetchEncryption.value = isFirst;
    };

    return {
      userInfo,
      setUserInfo,

      token,
      setToken,

      sceneOption,
      setSceneOption,

      isFirstFetchEncryption,
      encryptionConfig,
      getEncryptionConfig,
      setFirstFetchEncryption
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
