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
