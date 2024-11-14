<template>
  <!-- #ifdef MP-WEIXIN -->
  <ProSkeleton />
  <ProSkeletonCircle />
  <ProSkeletonRect />
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { onLaunch, onShow } from '@dcloudio/uni-app';

/* #ifdef MP-WEIXIN */
/* 不想被打入异步分包的组件 */
import ProSkeleton from '@/components/pro/ProSkeleton/ProSkeleton.vue';
import ProSkeletonCircle from '@/components/pro/ProSkeletonCircle/ProSkeletonCircle.vue';
import ProSkeletonRect from '@/components/pro/ProSkeletonRect/ProSkeletonRect.vue';
/* #endif */
import { useSystemStore } from '@/pinia/modules/system';
import { RouteStack, useRouter } from '@/router/router';

onLaunch(() => {
  uni.getSystemInfo().then(data => {
    useSystemStore().setSystemInfo(data);
  });

  /* #ifdef MP-WEIXIN */
  /* 监听路由变化 */
  wx.onAppRoute(() => {});
  /* #endif */
});

onShow(() => {
  const { setNetworkStatus } = useSystemStore();

  uni.onNetworkStatusChange(res => {
    setNetworkStatus(res);
  });
});

/* #ifdef MP-WEIXIN */
const router = useRouter();
const pathname = router.routes[0].path;

const navOptions = {
  path: pathname,
  query: {},
  type: null
};
const routeStack = new RouteStack(navOptions);
router.routeStacks.push(routeStack);
router.currentRoute = routeStack;

const next = option => {
  if (option && routeStack.name !== option?.name) {
    router.routeStacks.pop();
    router.next(option);
  }
};
router.beforeEachCb(routeStack, null, next);
/* #endif */
</script>

<style lang="scss">
@import '@/style/common.scss';
@import '@/style/variable.scss';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
