<script setup lang="ts">
import { useSystemStore } from '@/pinia/modules/system';
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useUserStore } from './pinia/modules/user';
import { switchFirstTab } from './utils/switchTab';

onLaunch(() => {
  uni.getSystemInfo().then(data => {
    useSystemStore().setSystemInfo(data);
  });

  useUserStore().getToken() && switchFirstTab();
});

onShow(() => {});

onHide(() => {});
</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
