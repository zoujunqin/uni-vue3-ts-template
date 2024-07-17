<template>
  <ProPopup ref="uniPopupRef" :safe-area-inset-bottom="false" bg-color="none">
    <view
      class="hx-flex hx-flex-col hx-justify-between hx-w-[302px] hx-rounded-[8px] hx-overflow-hidden"
    >
      <slot name="image" />

      <view class="hx-text-center hx-p-[24px] hx-bg-white">
        <slot name="title">
          <view
            class="hx-mb-[4px] hx-text-[17px] hx-font-bold hx-leading-[26px]"
          >
            {{ title }}
          </view>
        </slot>

        <slot name="content">
          <view
            class="hx-mb-[24px] hx-text-[15px] hx-leading-[24px] hx-text-text-color-tip"
          >
            {{ content }}
          </view>
        </slot>

        <view class="hx-flex">
          <ProButton
            v-if="showCancel"
            class="hx-w-[122px] hx-mr-[10px]"
            color="rgb(61 134 242 / 10%)"
            type="primary"
            @click="handleCancel"
          >
            <span class="hx-text-text-color-theme">
              {{ cancelButtonText }}
            </span>
          </ProButton>
          <ProButton
            v-if="showConfirm"
            class="hx-w-[122px]"
            type="primary"
            @click="handleConfirm"
          >
            <span>{{ confirmButtonText }}</span>
          </ProButton>
        </view>
      </view>
    </view>
  </ProPopup>
</template>
<script lang="ts" setup>
import { useFakerRef } from '@/hooks/useFakerRef';

defineProps({
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  title: {
    type: String,
    default: '标题'
  },
  content: {
    type: String,
    default: '内容'
  }
});
const emits = defineEmits(['cancel', 'confirm']);

const { instance: uniPopupRef } = useFakerRef();

const open = () => {
  uniPopupRef.value.open();
};
const close = () => {
  uniPopupRef.value.close();
};

const handleCancel = () => {
  close();
  emits('cancel');
};

const handleConfirm = () => {
  emits('confirm');
};

defineExpose({ open, close });
</script>

<script lang="ts">
export default { options: { name: 'ProModal', virtualHost: true } };
</script>
