<template>
  <view
    class="tabbar hx-w-full hx-fixed hx-bottom-0 hx-left-0 hx-flex hx-items-center hx-justify-center hx-pt-[4px] hx-pb-4px] hx-bg-white"
  >
    <view
      v-for="(item, index) in tabbarList"
      :key="index"
      class="hx-flex-1 hx-flex hx-flex-col hx-items-center hx-pl-[19px] hx-pr-[19px]"
      @click="switchTabbar(item.pagePath)"
    >
      <image
        :src="getSelectedConfig(item).icon"
        class="hx-h-[24px] hx-w-[24px]"
      />
      <text
        class="hx-text-[10px] hx-font-[500] hx-leading-[16px]"
        :class="getSelectedConfig(item).textClass"
      >
        {{ item.text }}
      </text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ITabbar, useTabbarStore } from '@/pinia/modules/tabbar';
import { storeToRefs } from 'pinia';

const tabbarStore = useTabbarStore();
const { switchTabbar, initTabbar } = tabbarStore;
const { tabbarList, currentTabbar } = storeToRefs(tabbarStore);

const getSelectedConfig = (data: ITabbar) => {
  const { pagePath, selectedIcon } = currentTabbar.value;

  return {
    icon: data.pagePath === pagePath ? selectedIcon : data.icon,
    textClass:
      data.pagePath === pagePath ? ['hx-text-[#007AFF]'] : ['hx-text-[#7A7E83]']
  };
};

initTabbar();
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>

<style scoped>
/* 安全区适配 */
.tabbar {
  height: calc(var(--hx-tabbar-height) + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
