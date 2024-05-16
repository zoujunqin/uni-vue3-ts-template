<template>
  <view
    :style="style"
    class="pro-navbar hx-flex hx-items-center hx-justify-between hx-absolute hx-z-[200] hx-top-0 hx-left-0 hx-w-full hx-pl-[12px] hx-pr-[12px]"
  >
    <view class="hx-flex-1 hx-flex hx-items-center">
      <slot name="left">
        <image
          v-if="showBackIcon"
          class="hx-w-[18PX] hx-h-[18PX]"
          src="@/static/navbar/back.svg"
          @click="handleBack"
        />

        <image
          v-if="showHomeIcon"
          class="hx-w-[18PX] hx-h-[18PX]"
          src="@/static/navbar/home.svg"
          @click="handleHome"
        />
      </slot>
    </view>

    <text class="hx-flex-1 hx-font-[600] hx-text-center">{{ text }}</text>

    <view class="hx-flex-1">
      <slot name="right">
        <text />
      </slot>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useSystemStore } from '@/pinia/modules/system';
import { getCurrentRoute, getPages, getPortalUrl } from '@/utils/page';

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

const currentRoute = getCurrentRoute();
const homeWhiteList = getPages().map(page => page.path);
const showHomeIcon =
  currentPages.length === 1 && !homeWhiteList.includes(currentRoute.route);

const handleBack = () => {
  emit('navBack');
  uni.navigateBack();
};

const handleHome = () => {
  uni.reLaunch({ url: getPortalUrl() });
};
</script>

<script lang="ts">
export default { options: { name: 'ProNavbar', virtualHost: true } };
</script>
