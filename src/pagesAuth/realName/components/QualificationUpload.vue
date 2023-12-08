<template>
  <view class="section-title hx-mb-[6px]"> 资质信息 </view>
  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    请上传png，jpg，pdf格式，文件大小不超过5M
  </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProUpload
      class="hx-mb-[16px]"
      background-name="driving-license"
      upload-button-title="点击上传驾驶证"
    />
  </view>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
