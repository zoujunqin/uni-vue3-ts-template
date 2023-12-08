<template>
  <view class="hx-flex hx-flex-col hx-items-center hx-w-[100px]">
    <image
      :src="import('@http/upload/camera-icon.png')"
      class="hx-mb-[6px] hx-w-[44px] hx-h-[44px]"
    />
    <text
      class="hx-text-color-title hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
    >
      {{ title }}
    </text>
  </view>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
