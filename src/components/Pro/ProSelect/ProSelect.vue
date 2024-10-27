<template>
  <div @click="openPicker">
    <ProInput readonly v-bind="$attrs" v-model="pickerName" />
  </div>

  <ProPicker
    ref="proPickerRef"
    :columns="$attrs.options"
    :keyName="props.labelKey"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    :defaultIndex="defaultIndex"
    @confirm="handlePickerConfirm"
  />
</template>

<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue';

import { uvEvents } from '../ProPicker/events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useVModel } from '@/hooks/useVModel';

const { bridgedEvents } = useBridgedEmits(uvEvents);
const attrs = useAttrs();
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
  },

  readonly: Boolean
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const modelValue = useVModel(props, 'modelValue', emit);
const pickerName = useVModel(props, 'pickerName', undefined, { passive: true });

const proPickerRef = ref();
const defaultIndex = ref([0]);
const openPicker = () => {
  if (props.readonly) return;
  proPickerRef.value.open();
};
const handlePickerConfirm = e => {
  const { [props.valueKey]: code } = e.value[0];
  modelValue.value = code;
  emit('confirm', e);
};
watch(modelValue, val => {
  const list = attrs.options[0];
  const index = list.findIndex(item => item.code === val);
  if (index !== -1) {
    defaultIndex.value = [index];
    pickerName.value = list[index].name;
  }
});
</script>

<script lang="ts">
export default {
  options: { name: 'ProSelect', virtualHost: true }
};
</script>
