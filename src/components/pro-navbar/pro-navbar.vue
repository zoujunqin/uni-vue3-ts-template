<template>
  <view
    class="hx-flex hx-items-center hx-justify-between hx-fixed hx-w-full hx-pl-[12px] hx-pr-[12px]"
    :style="style"
  >
    <image
      v-if="showBackIcon"
      class="hx-w-[18PX] hx-h-[18PX]"
      :src="import('@@static/tab-bar/back-icon.png')"
      @click="handleBack"
    />
    <text v-else />
    <text class="hx-font-[600]">{{ text }}</text>
    <text />
  </view>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSystemStore } from '@/pinia/modules/system';
import { computed } from 'vue';

defineProps({
  text: {
    type: String,
    default: '导航栏'
  }
});

const { systemInfo } = storeToRefs(useSystemStore());
const style = computed(() => ({
  // top: systemInfo.value.statusBarHeight + 'PX'
  height: systemInfo.value.statusBarHeight + 44 + 'PX',
  'padding-top': systemInfo.value.statusBarHeight + 'PX'
}));

const currentPages = getCurrentPages();
const showBackIcon = currentPages.length > 1;

const handleBack = () => {
  uni.navigateBack();
};
</script>
