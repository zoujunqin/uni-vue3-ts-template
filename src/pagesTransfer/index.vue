<!-- 中转页面, 扫码等进入非入口页需要先跳转此页面 -->
<template><view /></template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';

import { loginPagePath } from '@/constant/pagePath';
import { useUserStore } from '@/pinia/modules/user';
import { sceneCodeMap } from '@/sceneCode';

onLoad(option => {
  const pages = getCurrentPages();
  wx.onAppRoute(res => {
    const { openType } = res;
    if (openType === 'navigateBack') {
      let url = '/pages/portal/index';
      if (pages.length > 1) {
        url = `/${pages[pages.length - 2].route}`;
      }
      uni.redirectTo({ url });
    }
  });
  const { setSceneOption } = useUserStore();
  const hasToken = !!useUserStore().token;
  // 这里的 scene 不是小程序的场景值, 是自定义的
  const sceneList = decodeURIComponent(option.scene).split('&');
  const sceneObj = { t: '', c: '' };

  sceneList.forEach(item => {
    const keyList = item.split('=');
    sceneObj[keyList[0]] = keyList[1];
  });
  const { t } = sceneObj;
  setSceneOption(sceneObj);

  if (hasToken && t) {
    sceneCodeMap[t]?.(sceneObj);
  } else if (hasToken && !t) {
    uni.redirectTo({
      url: '/pages/portal/index'
    });
  } else {
    uni.redirectTo({
      url: loginPagePath
    });
  }
});
</script>
