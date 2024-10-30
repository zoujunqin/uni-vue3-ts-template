<template>
  <view class="pro-content hx-flex-1 hx-overflow-y-auto">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  options: { name: 'ProContent', virtualHost: true }
};
</script>
