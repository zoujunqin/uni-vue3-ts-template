<template>
  <view class="flex flex-col items-center w-[200px]">
    <image
      :src="getAssetsResource('@http/upload/camera-icon.png')"
      class="mb-[6px] w-[44px] h-[44px]"
    />
    <text
      class="text-color-title text-font-size-base font-[400] leading-[18px]"
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
