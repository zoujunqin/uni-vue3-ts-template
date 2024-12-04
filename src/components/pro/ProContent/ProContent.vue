<template>
  <view class="pro-content flex-1 overflow-y-auto">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineOptions({ options: { virtualHost: true } });
</script>
