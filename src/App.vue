<script lang="ts" setup>
import { onLaunch, onShow } from '@dcloudio/uni-app';
import { onMounted } from 'vue';

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

onMounted(() => {
  /* 不想被打入异步分包的组件 */
  import('@/components/ProSkeleton/ProSkeleton.vue');
  import('@/components/ProSkeletonRect/ProSkeletonRect.vue');
  import('@/components/ProSkeletonCircle/ProSkeletonCircle.vue');
});
</script>

<style lang="scss">
@import '@/style/common.scss';
@import '@/style/variable.scss';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
