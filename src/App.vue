<script lang="ts" setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';

import { useUserStore } from './pinia/modules/user';

import { useSystemStore } from '@/pinia/modules/system';

onLaunch(() => {
  uni.getSystemInfo().then(data => {
    useSystemStore().setSystemInfo(data);
  });

  if (!useUserStore().getToken()) {
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' });
    }, 2000);
  }
});

onShow(() => {});

onHide(() => {});
</script>

<style lang="scss">
@import '@/style/common.scss';
@import '@/style/variable.scss';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
