<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useSystemStore } from '@/pinia/modules/system';

onLaunch(() => {
  const { setSystemInfo } = useSystemStore();
  uni.getSystemInfo().then(data => {
    setSystemInfo(data);
  });
});

onShow(() => {});

onHide(() => {});
</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
