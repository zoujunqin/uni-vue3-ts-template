<template>
  <uv-tabs
    v-bind="{ ...$attrs, ...bridgedEvents }"
    ref="uvTabsRef"
    class="pro-tabs"
    lineWidth="32rpx"
    lineColor="var(--color-primary)"
    :activeStyle="{
      color: 'var(--text-color-title)',
      fontWeight: 'bold',
      fontSize: '18px'
    }"
    :inactiveStyle="{
      color: 'var(--text-text-color-regular)'
    }"
    itemStyle="padding: 12px 14px; height: 40px; line-height: 21px;"
  />
</template>
<script setup lang="ts">
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useFakerRef } from '@/hooks/useFakerRef';

const { instance: uvTabsRef } = useFakerRef();
const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default { options: { name: 'ProTabs', virtualHost: true } };
</script>

<style scoped>
.pro-tabs :deep(.uv-tabs__wrapper__nav__line) {
  width: 50px !important;
  height: 10px !important;
}
</style>
