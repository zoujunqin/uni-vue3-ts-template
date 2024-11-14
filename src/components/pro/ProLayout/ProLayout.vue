<template>
  <view :style="layoutStyle" class="pro-layout h-full flex flex-col h-full">
    <slot />
  </view>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';

const props = defineProps({ safeArea: Boolean });

const { systemInfo } = storeToRefs(useSystemStore());
const layoutStyle = computed(() => {
  const statusBarHeight = systemInfo.value.statusBarHeight || 0;
  return {
    'padding-top':
      (props.safeArea && !props.showNavbar ? statusBarHeight : 0) + 'PX'
  };
});
</script>

<script lang="ts">
export default {
  options: { name: 'ProLayout', virtualHost: true }
};
</script>
