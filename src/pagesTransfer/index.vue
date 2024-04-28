<template><view /></template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';

import { useUserStore } from '@/pinia/modules/user';
import { handleGetInvitationCodeScan } from '@/utils/switchTab';

onLoad(option => {
  const { setUserCodeID } = useUserStore();
  setUserCodeID(option.scene);
  if (option?.scene && useUserStore().getToken()) {
    const codeId = option.scene;
    setUserCodeID(codeId);
    handleGetInvitationCodeScan(codeId);
  } else {
    uni.redirectTo({
      url: '/pages/login/index'
    });
  }
});
</script>

<style scoped lang="scss"></style>
