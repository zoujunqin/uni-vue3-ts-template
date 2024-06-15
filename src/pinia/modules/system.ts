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

    const networkStatus = shallowRef<
      Partial<UniNamespace.OnNetworkStatusChangeSuccess>
    >({ isConnected: true });
    const setNetworkStatus = status => {
      networkStatus.value = status;
    };

    return { systemInfo, setSystemInfo, networkStatus, setNetworkStatus };
  },
  {
    // 开启持久化缓存
    // @ts-ignore
    unistorage: {
      paths: ['systemInfo']
    }
  }
);
