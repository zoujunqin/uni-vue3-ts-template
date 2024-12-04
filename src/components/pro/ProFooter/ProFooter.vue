<template>
  <view class="pro-footer z-10 p-[6px_16px] bg-white">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineOptions({ options: { virtualHost: true } });
</script>

<style scoped>
.pro-footer {
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 3%);
}
</style>
