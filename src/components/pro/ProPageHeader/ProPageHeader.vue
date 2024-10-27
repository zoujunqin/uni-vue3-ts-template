<template>
  <view
    class="hx-page-header page-pt-with-navbar hx-z-[1] hx-bg-[length:100%_100%] hx-bg-no-repeat"
  >
    <slot />
  </view>
</template>

<script lang="ts" setup></script>

<style scoped>
.hx-page-header {
  box-shadow: 0 6px 6px 0 rgb(0 33 81 / 3%);
}
</style>

<script lang="ts">
export default { options: { name: 'ProPageHeader', virtualHost: true } };
</script>
