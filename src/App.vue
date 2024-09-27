<template>
  <ProSkeleton />
  <ProSkeletonCircle />
  <ProSkeletonRect />
</template>

<script lang="ts" setup>
import { onLaunch, onShow } from '@dcloudio/uni-app';

/* 不想被打入异步分包的组件 */
import ProSkeleton from '@/components/ProSkeleton/ProSkeleton.vue';
import ProSkeletonCircle from '@/components/ProSkeletonCircle/ProSkeletonCircle.vue';
import ProSkeletonRect from '@/components/ProSkeletonRect/ProSkeletonRect.vue';
import { useSystemStore } from '@/pinia/modules/system';

onLaunch(() => {
  uni.getSystemInfo().then(data => {
    useSystemStore().setSystemInfo(data);
  });

  wx.onAppRoute(({ openType }) => {
    const pages = getCurrentPages();
    const currentRoute = pages[pages.length - 1];

    /* 通过小程序的中转页跳转三方插件，从三方插件返回 */
    if (openType === 'navigateBack' && currentRoute === 'pagesTransfer/index') {
      if (pages.length === 1) {
        uni.redirectTo({ url: '/pages/portal/index' });
      } else {
        uni.redirectTo({ url: pages[pages.length - 2].$page.fullPath });
      }
    }
  });
});

onShow(() => {
  const { setNetworkStatus } = useSystemStore();

  uni.onNetworkStatusChange(res => {
    setNetworkStatus(res);
  });
});
</script>

<style lang="scss">
@import '@/style/common.scss';
@import '@/style/variable.scss';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
