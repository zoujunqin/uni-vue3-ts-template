<template>
  <uv-checkbox-group
    ref="uvInstance"
    v-model="modelValue"
    v-bind="{ ...$attrs, ...bridgedEvents, value: props.value }"
  >
    <slot />
  </uv-checkbox-group>
</template>

<script lang="ts" setup>
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useFakerRef } from '@/hooks/useFakerRef';
import { useNextedCompatible } from '@/hooks/useNextedCompatible';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  value: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue']);

const modelValue = useVModel(props, 'modelValue', emit);

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvInstance } = useFakerRef();
/* #ifdef MP-WEIXIN */
useNextedCompatible(uvInstance);
/* #endif */
</script>

<script lang="ts">
export default {
  /* #ifdef MP-WEIXIN */
  // 这里 name 为 uv-checkbox-group 是为了 uv-checkbox 内部的查找机制
  name: 'uv-checkbox-group',
  /* #endif */
  options: { name: 'ProCheckboxGroup', virtualHost: true }
};
</script>
