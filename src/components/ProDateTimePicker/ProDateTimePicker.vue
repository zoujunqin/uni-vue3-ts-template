<template>
  <uv-datetime-picker
    ref="dataTimePickerRef"
    v-model="modelValue"
    v-bind="{ ...$attrs, ...bridgedEvents, onConfirm: handleConfirm }"
    :mode="props.mode"
    :formatter="formatter"
  />
</template>
<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { computed } from 'vue';

import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { instance: dataTimePickerRef } = useFakerRef();
const { bridgedEvents } = useBridgedEmits(uvEvents);

const props = defineProps({
  modelValue: {
    type: String,
    default: new Date()
  },
  textShow: {
    type: Boolean,
    default: true
  },
  mode: {
    type: String,
    default: 'datetime',
    validator: (v: string) => {
      return ['datetime', 'date', 'time', 'year-month', 'year'].includes(v);
    }
  }
});
const emits = defineEmits(['update:modelValue', 'confirm']);

const formatMap = {
  year: 'YYYY',
  time: 'HH:mm',
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  'year-month': 'YYYY-MM'
};

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(date) {
    emits('update:modelValue', dayjs(date).format(formatMap[props.mode]));
  }
});

const handleConfirm = e => {
  const { value } = e;
  e = { ...e, value, formatValue: dayjs(value).format(formatMap[props.mode]) };
  emits('confirm', e);
};

const textMap = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分'
};
const formatter = (type: string, value: string) => {
  return props.textShow ? `${value}${textMap[type]}` : value;
};

onReady(() => {
  dataTimePickerRef.value.setFormatter(formatter);
});

const { bridgedMethods } = useBridgedMethods(
  ['open', 'close'],
  dataTimePickerRef
);
defineExpose({ ...bridgedMethods });
</script>
<script lang="ts">
export default { options: { name: 'ProDateTimePicker', virtualHost: true } };
</script>
