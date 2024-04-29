<template>
  <ProSteps :current="current">
    <ProStepsItem v-for="(item, index) in stepItems" :key="index" :title="item">
      <template #icon>
        <ProIcon
          v-if="index < Number(current)"
          class="step-active-icon"
          color="primary"
          name="checkmark-circle-fill"
          size="40rpx"
        />
        <view
          v-else-if="index === Number(current)"
          class="hx-w-[16px] hx-h-[16px] hx-rounded-[50%] hx-bg-color-primary"
        />
        <image
          v-else
          :src="import('@http/real-name/step-inactive-icon.png')"
          class="hx-w-[16px] hx-h-[16px]"
        />
      </template>
    </ProStepsItem>
  </ProSteps>
</template>

<script lang="ts" setup>
defineProps({
  current: {
    type: [Number, String],
    default: 0
  }
});

const stepItems = ['实名认证', '签署合同'];
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
