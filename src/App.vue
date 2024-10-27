<template>
  <ProSkeleton />
  <ProSkeletonCircle />
  <ProSkeletonRect />
</template>

<script lang="ts" setup>
import { onLaunch, onShow } from '@dcloudio/uni-app';

/* 不想被打入异步分包的组件 */
import ProSkeleton from '@/components/Pro/ProSkeleton/ProSkeleton.vue';
import ProSkeletonCircle from '@/components/Pro/ProSkeletonCircle/ProSkeletonCircle.vue';
import ProSkeletonRect from '@/components/Pro/ProSkeletonRect/ProSkeletonRect.vue';
import { useSystemStore } from '@/pinia/modules/system';

onLaunch(() => {
  uni.getSystemInfo().then(data => {
    useSystemStore().setSystemInfo(data);
  });

  /* 监听路由变化 */
  wx.onAppRoute(() => {});
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
