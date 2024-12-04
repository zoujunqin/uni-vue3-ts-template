import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useSystemStore = defineStore('system', () => {
  const networkStatus = shallowRef<
    Partial<UniNamespace.OnNetworkStatusChangeSuccess>
  >({ isConnected: true });
  const setNetworkStatus = status => {
    networkStatus.value = status;
  };

  return { networkStatus, setNetworkStatus };
});
