<!-- 中转页面, 扫码等进入非入口页需要先跳转此页面 -->
<template><view /></template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';

import { loginPagePath } from '@/constant/pagePath';
import { useUserStore } from '@/pinia/modules/user';
import { sceneCodeMap } from '@/sceneCode';

onLoad(option => {
  const { setSceneOption } = useUserStore();
  const hasToken = !!useUserStore().token;
  const sceneObj = { t: '', c: '' };
  if (option && option.type && option.type === 'link') {
    sceneObj.t = option.t;
    sceneObj.c = option.c;
  } else {
    // 这里的 scene 不是小程序的场景值, 是自定义的
    const sceneList = decodeURIComponent(option.scene).split('&');
    sceneList.forEach(item => {
      const keyList = item.split('=');
      sceneObj[keyList[0]] = keyList[1];
    });
  }
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
