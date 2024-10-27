import { shallowRef } from 'vue';

import ProScrollList from '@/components/ProScrollList/ProScrollList.vue';

export const useHandler = () => {
  const proScrollListRef = shallowRef<InstanceType<typeof ProScrollList>>();
  const reload = () => {
    proScrollListRef.value?.reload();
  };

  return {
    proScrollListRef,
    reload
  };
};
