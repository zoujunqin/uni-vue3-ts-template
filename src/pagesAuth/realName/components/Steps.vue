<template>
  <ProSteps :current="current">
    <ProStepsItem v-for="(item, index) in stepItems" :key="index" :title="item">
      <template #icon>
        <ProIcon
          class="step-active-icon"
          v-if="index < Number(current)"
          name="checkmark-circle-fill"
          color="primary"
          size="40rpx"
        />
        <view
          v-else-if="index === Number(current)"
          class="hx-w-[16px] hx-h-[16px] hx-rounded-[50%] hx-bg-color-primary"
        />
        <image
          v-else
          class="hx-w-[16px] hx-h-[16px]"
          :src="import('@/static@http/real-name/step-inactive-icon.png')"
        />
      </template>
    </ProStepsItem>
  </ProSteps>
</template>

<script setup lang="ts">
defineProps({
  current: {
    type: [Number, String],
    default: 0
  }
});

const stepItems = ['实名认证', '签署合同', '活体认证'];
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
