<template>
  <view
    :style="footerStyle"
    class="pro-footer hx-z-10 hx-p-[6px_16px] hx-bg-white"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  fixed: Boolean,
  offsetBottom: { type: Number, default: 0 },
  safeArea: Boolean
});

const footerStyle = computed(() => {
  const { safeArea, fixed, offsetBottom } = props;
  return {
    position: fixed ? 'sticky' : 'static',
    bottom: offsetBottom,
    'padding-bottom': 0 + 'PX'
  };
});
</script>

<script lang="ts">
export default { options: { name: 'ProFooter', virtualHost: true } };
</script>

<style scoped>
.pro-footer {
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 3%);
}
</style>
