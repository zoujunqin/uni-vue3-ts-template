<template>
  <view class="section-title hx-mb-[6px]"> 上传身份证 </view>
  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    请确保证件边框完整、字体清晰、亮度均匀
  </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProUpload
      class="hx-mb-[16px]"
      background-name="front-id-card"
      upload-button-title="点击上传人像面"
    />
    <ProUpload
      background-name="back-id-card"
      upload-button-title="点击上传国徽面"
    />
  </view>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
