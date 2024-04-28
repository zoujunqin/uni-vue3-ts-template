<script setup lang="ts">
import { onHide, onLaunch } from '@dcloudio/uni-app';

import { useUserStore } from './pinia/modules/user';
import { switchFirstTab } from './utils/switchTab';

import { useSystemStore } from '@/pinia/modules/system';

onLaunch(option => {
  uni.getSystemInfo().then(data => {
    useSystemStore().setSystemInfo(data);
  });
  if (!option?.query?.scene) {
    useUserStore().getToken() && switchFirstTab();
  }
});

onHide(() => {});
</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
