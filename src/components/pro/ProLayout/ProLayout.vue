<template>
  <view class="pro-layout flex flex-col h-full">
    <slot />
  </view>
</template>

<script setup lang="ts">
defineOptions({ options: { virtualHost: true } });
</script>
