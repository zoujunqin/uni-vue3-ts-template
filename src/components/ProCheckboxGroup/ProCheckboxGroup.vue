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
import { useBridgedEmits } from '../../hooks/useBridgedEmits';
import { useNextedCompatible } from '../../hooks/useNextedCompatible';
import { useVModel } from '../../hooks/useVModel';

import { uvEvents } from './events';

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

const { uvInstance } = useNextedCompatible();
</script>

<script lang="ts">
export default {
  // 这里 name 为 uv-checkbox-group 是为了 uv-checkbox 内部的查找机制
  name: 'uv-checkbox-group',
  options: { name: 'ProCheckboxGroup', virtualHost: true }
};
</script>
