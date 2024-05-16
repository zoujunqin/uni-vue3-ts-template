<template>
  <div @click="openPicker">
    <ProInput readonly v-bind="$attrs" v-model="pickerName" />
  </div>

  <ProPicker
    ref="proPickerRef"
    :columns="$attrs.options"
    :keyName="props.labelKey"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    @confirm="handlePickerConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { uvEvents } from '../ProPicker/events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useVModel } from '@/hooks/useVModel';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  pickerName: {
    type: String,
    default: ''
  },

  labelKey: {
    type: String,
    default: 'name'
  },
  valueKey: {
    type: String,
    default: 'code'
  }
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const modelValue = useVModel(props, 'modelValue', emit);
const pickerName = useVModel(props, 'pickerName', undefined, { passive: true });

const proPickerRef = ref();
const openPicker = () => {
  proPickerRef.value.open();
};
const handlePickerConfirm = e => {
  const { [props.valueKey]: code, [props.labelKey]: name } = e.value[0];
  modelValue.value = code;
  pickerName.value = name;
  emit('confirm', e);
};
</script>

<script lang="ts">
export default {
  options: { name: 'ProSelect', virtualHost: true }
};
</script>
