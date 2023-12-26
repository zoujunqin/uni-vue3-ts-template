<template>
  <uv-datetime-picker
    ref="dataTimePickerRef"
    v-model="Value"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    :formatter="formatter"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useVModel } from '@/hooks/useVModel';

const { bridgedEvents } = useBridgedEmits([
  'confirm',
  'change',
  'cancel',
  'close'
]);

const props = defineProps({
  modelValue: {
    type: Date,
    default: new Date()
  },
  textShow: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(['update:modelValue']);
const Value = useVModel(props, 'modelValue', emits);

const dataTimePickerRef = ref();
const { bridgedMethods } = useBridgedMethods(
  ['open', 'close'],
  dataTimePickerRef
);
const formatter = (type: string, value: string) => {
  if (type === 'year') {
    return props.textShow ? `${value}年` : value;
  }
  if (type === 'month') {
    return props.textShow ? `${value}月` : value;
  }
  if (type === 'day') {
    return props.textShow ? `${value}日` : value;
  }
  return value;
};
defineExpose({ ...bridgedMethods });
</script>
<script lang="ts">
export default { options: { name: 'ProDateTimePicker', virtualHost: true } };
</script>
