<template>
  <ProNotify ref="proNotifyRef" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';

const { networkStatus } = storeToRefs(useSystemStore());
const proNotifyRef = ref();

watchEffect(() => {
  const { isConnected } = networkStatus.value;
  if (!isConnected) {
    proNotifyRef.value?.show({
      type: 'error',
      duration: 3 * 1000,
      message: '网络已断开',
      safeAreaInsetTop: true
    });
  } else {
    proNotifyRef.value?.close();
  }
});
</script>

<script lang="ts">
export default { options: { name: 'ProNetworkTip', virtualHost: true } };
</script>
