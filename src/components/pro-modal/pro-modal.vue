<template>
  <uv-popup ref="uniPopupRef" bg-color="none" :safe-area-inset-bottom="false">
    <view
      class="modal-content hx-flex hx-flex-col hx-justify-between hx-items-center hx-w-[302px] hx-p-[29px_24px] hx-rounded-[8px]"
    >
      <slot name="title">
        <view class="hx-mb-[4px] hx-text-[17px] hx-font-bold hx-leading-[26px]">
          {{ title }}
        </view>
      </slot>

      <slot name="content">
        <view class="hx-mb-[24px] hx-text-[15px] hx-leading-[24px]">
          {{ content }}
        </view>
      </slot>

      <view class="hx-flex">
        <uv-button
          class="hx-w-[122px] hx-mr-[10px]"
          v-if="showCancel"
          type="primary"
          color="rgb(61 134 242 / 10%)"
          :text="cancelButtonText"
          :custom-text-style="{ color: 'var(--hx-color-primary)' }"
          @click="handleCancel"
        />
        <uv-button
          class="hx-w-[122px]"
          v-if="showConfirm"
          type="primary"
          :text="confirmButtonText"
          @click="handleConfirm"
        />
      </view>
    </view>
  </uv-popup>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue';

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

const uniPopupRef = shallowRef();
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

defineExpose({ open });
</script>

<style scoped>
.modal-content {
  background: linear-gradient(180deg, #ebf3ff 0%, #fff 37.77%);
}
</style>
