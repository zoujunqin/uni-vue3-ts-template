<template>
  <view
    :style="style"
    class="pro-navbar hx-flex hx-items-center hx-justify-between hx-absolute hx-z-[200] hx-top-0 hx-left-0 hx-w-full hx-pl-[12px] hx-pr-[12px]"
  >
    <slot name="left">
      <image
        v-if="showBackIcon"
        class="hx-w-[18PX] hx-h-[18PX]"
        src="@/static/navbar/back-icon.png"
        @click="handleBack"
      />
      <text v-else />
    </slot>

    <text class="hx-font-[600]">{{ text }}</text>

    <slot name="right">
      <text />
    </slot>
  </view>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';

const props = defineProps({
  text: { type: String, default: '导航栏' },
  showBack: { type: Boolean, default: true }
});
const emit = defineEmits(['navBack']);

const { systemInfo } = storeToRefs(useSystemStore());
const style = computed(() => {
  const statusBarHeight = systemInfo.value.statusBarHeight || 0;
  return {
    height: statusBarHeight + 44 + 'PX',
    'padding-top': statusBarHeight + 'PX'
  };
});

const currentPages = getCurrentPages();
const showBackIcon = currentPages.length > 1 && props.showBack;

const handleBack = () => {
  emit('navBack');
  uni.navigateBack();
};
</script>

<script lang="ts">
export default { options: { name: 'ProNavbar', virtualHost: true } };
</script>
