<template>
  <view class="hx-flex hx-flex-col hx-items-center hx-w-[200px]">
    <image
      :src="getAssetsResource('@http/upload/camera-icon.png')"
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
import { getAssetsResource } from '@/utils';

defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<script lang="ts">
export default { options: { name: 'ProUploadButton', virtualHost: true } };
</script>
