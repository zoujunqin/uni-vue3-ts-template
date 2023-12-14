<template>
  <ProPicker
    ref="proPickerRef"
    round="20rpx"
    key-name="name"
    active-color="var(--hx-color-primary)"
    :columns="addressList"
    @confirm="handleConfirm"
    @change="handleChange"
    @close="handleClose"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  />
</template>

<script setup lang="ts">
import region from '@/static/region';

import { shallowRef, computed, PropType, watch, onMounted } from 'vue';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { uvMethods } from '@/components/ProPicker/methods';
import { uvEvents } from '@/components/ProPicker/events';

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue']);

const defaultValue = [110000, 110100, 110105];
const pickerValue = shallowRef<Array<number>>([]);
const handleResetPickerValue = () => {
  pickerValue.value =
    props.modelValue?.length !== 0 ? [...props.modelValue] : [...defaultValue];
};
watch(() => props.modelValue, handleResetPickerValue, {
  immediate: true,
  deep: true
});
const handleConfirm = e => {
  emit(
    'update:modelValue',
    e.value.map(item => item.id)
  );
};

const provinces = shallowRef(region);
const citys = shallowRef([]);
const areas = shallowRef([]);
const addressList = computed(() => [provinces.value, citys.value, areas.value]);

const handlePickValueDefault = () => {
  const provinceIndex = provinces.value.findIndex(
    item => item.id === pickerValue.value[0]
  );
  // 设置市
  citys.value = provinces.value[provinceIndex]?.children || [];
  const cityIndex = citys.value.findIndex(
    item => item.id === pickerValue.value[1]
  );
  // 设置区
  areas.value = citys.value[cityIndex]?.children || [];
  const areaIndex = areas.value.findIndex(
    item => item.id === pickerValue.value[2]
  );
  proPickerRef.value.setIndexs([provinceIndex, cityIndex, areaIndex], true);
};
onMounted(handlePickValueDefault);

const handleChange = e => {
  const { columnIndex, index, indexs } = e;
  // 改变了省
  if (columnIndex === 0) {
    citys.value = provinces.value[index]?.children || [];
    areas.value = citys.value[0]?.children || [];
    proPickerRef.value.setIndexs([index, 0, 0], true);
  } else if (columnIndex === 1) {
    areas.value = citys.value[index]?.children || [];
    proPickerRef.value.setIndexs(indexs, true);
  }
};

const handleClose = () => {
  handleResetPickerValue();
  handlePickValueDefault();
};

/* open 中再做一遍，避免滑动期间关闭导致的数据不准 */
const open = () => {
  handleResetPickerValue();
  handlePickValueDefault();
  proPickerRef.value.open();
};

const { bridgedEvents } = useBridgedEmits(uvEvents);
const proPickerRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, proPickerRef);
defineExpose({ ...bridgedMethods, open });
</script>

<script lang="ts">
export default { options: { name: 'ProAreaPicker', virtualHost: true } };
</script>
