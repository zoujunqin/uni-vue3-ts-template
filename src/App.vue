<script setup lang="ts">
import { useSystemStore } from '@/pinia/modules/system';
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useUserStore } from './pinia/modules/user';
import { switchFirstTab } from './utils/switchTab';

onLaunch(() => {
  const { setSystemInfo } = useSystemStore();
  uni.getSystemInfo().then(data => {
    setSystemInfo(data);
  });

  if (useUserStore().getToken()) {
    switchFirstTab();
  }
});

onShow(() => {});

onHide(() => {});
</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
