<template>
  <view class="hx-h-full hx-overflow-auto">
    <ProNetworkTip />

    <slot />

    <ProLoading />
  </view>
</template>

<script lang="ts">
export default { options: { name: 'ProPage', virtualHost: true } };
</script>
