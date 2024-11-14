<template>
  <ProPopup ref="uniPopupRef" :safe-area-inset-bottom="false" bg-color="none">
    <view
      class="flex flex-col justify-between w-[302px] rounded-[8px] overflow-hidden"
    >
      <slot name="image" />

      <view class="text-center p-[24px] bg-white">
        <slot name="title">
          <view class="mb-[4px] text-[17px] font-bold leading-[26px]">
            {{ title }}
          </view>
        </slot>

        <slot name="content">
          <view
            class="mb-[24px] text-[15px] leading-[24px] text-text-color-tip"
          >
            {{ content }}
          </view>
        </slot>

        <view class="flex">
          <ProButton
            v-if="showCancel"
            class="w-[122px] mr-[10px]"
            color="rgb(61 134 242 / 10%)"
            type="primary"
            @click="handleCancel"
          >
            <span class="text-text-color-theme">
              {{ cancelButtonText }}
            </span>
          </ProButton>
          <ProButton
            v-if="showConfirm"
            class="w-[122px]"
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
