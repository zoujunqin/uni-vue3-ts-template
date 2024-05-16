<template>
  <div @click="openDatePicker">
    <ProInput readonly v-bind="$attrs" v-model="modelValue" />
  </div>

  <ProDateTimePicker
    ref="proDateTimePickerRef"
    :maxDate="2841840000000"
    :minDate="-631180800000"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    v-model="modelValue"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { uvEvents } from '../ProDateTimePicker/events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useVModel } from '@/hooks/useVModel';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const props = defineProps({
  modelValue: {
    type: String,
    default: new Date().getTime()
  },
  readonly: Boolean
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const modelValue = useVModel(props, 'modelValue', emit);

const proDateTimePickerRef = ref();
const openDatePicker = () => {
  if (props.readonly) return;
  proDateTimePickerRef.value.open();
};
</script>

<script lang="ts">
export default {
  options: { name: 'ProDateSelect', virtualHost: true }
};
</script>
