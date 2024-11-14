<template>
  <view class="pro-content flex-1 overflow-y-auto">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  options: { name: 'ProContent', virtualHost: true }
};
</script>
