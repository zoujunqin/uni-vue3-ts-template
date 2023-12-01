<template>
  <uv-tabs
    v-bind="{ ...$attrs, ...bridgedEvents }"
    class="pro-tabs"
    lineWidth="32rpx"
    lineColor="var(--hx-color-primary)"
    :activeStyle="{
      color: 'var(--hx-text-color-title)',
      fontWeight: 'bold',
      fontSize: '18px'
    }"
    :inactiveStyle="{
      color: 'var(--hx-text-text-color-regular)'
    }"
    itemStyle="padding: 12px 14px; height: 40px; line-height: 21px;"
  />
</template>
<script setup lang="ts">
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<style scoped>
.pro-tabs :deep(.uv-tabs__wrapper__nav__line) {
  width: 50px !important;
  height: 10px !important;
}
</style>
