<template>
  <uv-input
    v-bind="$attrs"
    border="none"
    placeholder="请输入关键词"
    class="!hx-p-[6px_16px] hx-bg-[#f7f8fa] hx-rounded-[6px] hx-h-[36px] hx-text-font-size-regular"
    placeholder-class="input-placeholder"
  />
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
};
</script>

<style scoped>
:deep(.uv-input__content__prefix-icon) > view {
  @apply !hx-flex !hx-items-center;
}
:deep(.input-placeholder) {
  @apply hx-text-font-size-regular hx-text-text-color-placeholder hx-font-[400] hx-leading-[24px];
}
</style>
