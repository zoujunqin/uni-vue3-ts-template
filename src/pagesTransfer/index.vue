<!-- 中转页面, 扫码等进入非入口页需要先跳转此页面 -->
<template><view /></template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';

import { useUserStore } from '@/pinia/modules/user';
import { sceneCodeMap } from '@/sceneCode';

onLoad(option => {
  const hasToken = !!useUserStore().token;
  // 这里的 scene 不是小程序的场景值, 是自定义的
  const { scene } = option;

  if (hasToken && scene) {
    sceneCodeMap[scene]?.(option);
  } else if (hasToken && !scene) {
    uni.redirectTo({
      url: '/pages/portal/index'
    });
  } else {
    uni.redirectTo({
      url: '/pages/login/index'
    });
  }
});
</script>
