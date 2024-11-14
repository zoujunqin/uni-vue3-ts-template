<template>
  <uv-input
    v-model="inputValue"
    ref="uvInputRef"
    border="none"
    placeholder="请输入关键词"
    class="!p-[6px_16px] rounded-[6px] h-[36px] text-font-size-regular"
    placeholder-class="input-placeholder"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </uv-input>
</template>

<script setup lang="ts">
import { inputEvents, uvEvents } from './events';
import { inputProps } from './props';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useFakerRef } from '@/hooks/useFakerRef';
import { useVModel } from '@/hooks/useVModel';

const emits = defineEmits(inputEvents);
const props = defineProps(inputProps);
const { instance: uvInputRef } = useFakerRef();
const { bridgedEvents } = useBridgedEmits(uvEvents);

const inputValue = useVModel(props, 'modelValue', emits);
</script>

<style scoped lang="scss">
:deep(.uv-input__content__prefix-icon) > view {
  @apply flex items-center;
}

:deep(.input-placeholder) {
  @apply text-font-size-regular text-text-color-placeholder font-[400] leading-[24px];
}
</style>

<script lang="ts">
export default { options: { name: 'ProInput', virtualHost: true } };
</script>
