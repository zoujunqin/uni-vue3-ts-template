<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useSystemStore } from '@/pinia/modules/system';
// import { getLogin } from '@/api/login';
// import { setToken } from '@/utils/auth';

onLaunch(() => {
  const { setSystemInfo } = useSystemStore();
  uni.getSystemInfo().then(data => {
    setSystemInfo(data);
  });

  // getLogin().then(data => {
  //   console.log(data.token);
  //   setToken(data.token);
  // });
});

onShow(() => {});

onHide(() => {});
</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
