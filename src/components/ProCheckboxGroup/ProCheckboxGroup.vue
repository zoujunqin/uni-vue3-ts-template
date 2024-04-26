<template>
  <uv-checkbox-group
    ref="parentInstance"
    v-model="modelValue"
    v-bind="{ ...$attrs, ...bridgedEvents, value: props.value }"
  >
    <slot></slot>
  </uv-checkbox-group>
</template>

<script lang="ts" setup>
import { useBridgedEmits } from '../../hooks/useBridgedEmits';
import { uvEvents } from './events';
import { useVModel } from '../../hooks/useVModel';
import { useNextedCompatible } from '../../hooks/useNextedCompatible';

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

const { parentInstance } = useNextedCompatible('uv-checkbox-group');
</script>

<script lang="ts">
export default {
  options: { name: 'ProCheckboxGroup', virtualHost: true }
};
</script>
