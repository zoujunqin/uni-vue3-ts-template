<template>
  <view class="flex flex-col h-full">
    <ProNetworkTip />
    <ProLoading />

    <view class="flex-1 overflow-hidden">
      <slot />
    </view>
    <uv-safe-bottom />
  </view>
</template>

<script setup lang="ts">
defineOptions({ options: { virtualHost: true } });
</script>
