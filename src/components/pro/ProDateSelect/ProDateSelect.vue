<template>
  <view @click="openDatePicker">
    <ProInput readonly v-bind="$attrs" v-model="modelValue" />
  </view>

  <ProDateTimePicker
    ref="proDateTimePickerRef"
    :maxDate="2841840000000"
    :minDate="-631180800000"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    v-model="dataTime"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { uvEvents } from '../ProDateTimePicker/events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useVModel } from '@/hooks/useVModel';
import { handleDealTimestampDate } from '@/utils/date';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: new Date().getTime()
  },
  readonly: Boolean
});
const emit = defineEmits(['update:modelValue', 'confirm']);
const modelValue = useVModel(props, 'modelValue', emit);

const dataTime = computed({
  get() {
    return modelValue.value
      ? modelValue.value
      : handleDealTimestampDate(new Date());
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

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
