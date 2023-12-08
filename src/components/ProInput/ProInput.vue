<template>
  <uv-input
    v-model="inputValue"
    border="none"
    placeholder="请输入关键词"
    class="!hx-p-[6px_16px] hx-rounded-[6px] hx-h-[36px] hx-text-font-size-regular"
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
import { useVModel } from '@/hooks/useVModel';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { inputEvents, uvEvents } from './events';
import { inputProps } from './props';

const emits = defineEmits(inputEvents);
const props = defineProps(inputProps);
const { bridgedEvents } = useBridgedEmits(uvEvents);

const inputValue = useVModel(props, 'modelValue', emits);
</script>

<style scoped>
:deep(.uv-input__content__prefix-icon) > view {
  @apply hx-flex hx-items-center;
}
:deep(.input-placeholder) {
  @apply hx-text-font-size-regular hx-text-text-color-placeholder hx-font-[400] hx-leading-[24px];
}
</style>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
