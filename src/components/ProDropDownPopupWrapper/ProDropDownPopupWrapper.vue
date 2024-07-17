<template>
  <ProDropDownPopup
    ref="proDropDownPopupRef"
    :click-overlay-on-close="false"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  >
    <view class="hx-flex hx-flex-col">
      <view
        class="hx-flex-1 hx-overflow-auto hx-p-[24px_16px_0_16px] hx-max-h-[331px]"
      >
        <slot />
      </view>
      <view
        class="button-container hx-flex hx-items-center hx-w-full hx-h-56px hx-p-[8px_16px]"
      >
        <ProButton
          class="hx-mr-[10px] hx-w-[110px]"
          color="rgb(61 134 242 / 10%)"
          :custom-text-style="{ color: 'var(--hx-color-primary)' }"
          @tap.stop="handleCancel"
        >
          <text class="hx-text-color-primary"> 取消 </text>
        </ProButton>
        <ProButton class="!hx-flex-1" type="primary" @tap.stop="handleConfirm">
          确定
        </ProButton>
      </view>
    </view>
  </ProDropDownPopup>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from '../ProDropDownPopup/events';
import { uvMethods } from '../ProDropDownPopup/methods';

import { dropDownPopupWrapperEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const emit = defineEmits(dropDownPopupWrapperEvents);

const { bridgedEvents } = useBridgedEmits(uvEvents);

const proDropDownPopupRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, proDropDownPopupRef);

const handleCancel = () => {
  proDropDownPopupRef.value.close();
  emit('cancel');
};

const handleConfirm = () => {
  proDropDownPopupRef.value.close();
  emit('confirm');
};

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default {
  options: { name: 'ProDropDownPopupWrapper', virtualHost: true }
};
</script>

<style scoped>
.button-container {
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 6%);
}

:deep(.uv-dp__container) {
  background-color: unset;
}
</style>
