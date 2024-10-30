<template>
  <view
    :style="props.footerProps.style"
    :class="props.footerProps.class"
    class="pro-page-footer hx-z-10 hx-p-[6px_16px] hx-bg-white"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  footerProps: { type: Object, default: () => ({}) }
});
</script>

<script lang="ts">
export default { options: { name: 'ProPageFooter', virtualHost: true } };
</script>

<style scoped>
.pro-page-footer {
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 3%);
}
</style>
