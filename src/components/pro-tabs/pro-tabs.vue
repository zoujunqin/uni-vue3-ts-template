<template>
  <uv-tabs
    v-bind="$attrs"
    class="pro-tabs"
    lineWidth="32 rpx"
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
    @change="emitChange"
  />
</template>
<script setup lang="ts">
const emits = defineEmits(['change']);

const emitChange = (...args) => {
  emits('change', ...args);
};
</script>

<style scoped>
.pro-tabs :deep(.uv-tabs__wrapper__nav__line) {
  width: 50px !important;
  height: 10px !important;
}
</style>
