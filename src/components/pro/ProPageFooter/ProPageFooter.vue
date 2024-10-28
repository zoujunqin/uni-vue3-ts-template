<template>
  <view
    class="pro-page-footer hx-z-10 hx-fixed hx-left-0 hx-bottom-0 hx-w-full hx-p-[6px_16px] hx-bg-white"
  >
    <slot />
  </view>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default { options: { name: 'ProPageFooter', virtualHost: true } };
</script>

<style scoped>
.pro-page-footer {
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 3%);
}
</style>
