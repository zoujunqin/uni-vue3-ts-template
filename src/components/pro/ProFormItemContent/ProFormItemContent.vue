<template>
  <ProInput
    v-if="props.type === 'text'"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    v-model="modelValue"
  />

  <ProInput
    v-if="props.type === 'number'"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    v-model="modelValue"
    type="number"
  />

  <ProSelect
    v-if="props.type === 'select'"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    v-model="modelValue"
    v-model:pickerName="pickerName"
  />

  <ProDateSelect
    v-if="props.type === 'date'"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    v-model="modelValue"
  />
</template>

<script setup lang="ts">
import { uvEvents as uvDatePickerEvents } from '@/components/pro/ProDateTimePicker/events';
import { uvEvents as uvInputEvents } from '@/components/pro/ProInput/events';
import { uvEvents as uvPickerEvents } from '@/components/pro/ProPicker/events';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useVModel } from '@/hooks/useVModel';

const { bridgedEvents } = useBridgedEmits(
  Array.from(
    new Set([...uvInputEvents, ...uvPickerEvents, ...uvDatePickerEvents])
  )
);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  pickerName: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: 'text',
    validator: (v: string) => {
      return ['text', 'select', 'number', 'date'].includes(v);
    }
  }
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const modelValue = useVModel(props, 'modelValue', emit);
const pickerName = useVModel(props, 'pickerName', undefined, { passive: true });
</script>
