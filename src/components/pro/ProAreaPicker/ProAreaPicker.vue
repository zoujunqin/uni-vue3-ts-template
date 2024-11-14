<template>
  <ProPicker
    ref="proPickerRef"
    :columns="addressList"
    active-color="var(--color-primary)"
    key-name="name"
    round="20rpx"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    @change="handleChange"
    @close="handleClose"
    @confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  PropType,
  shallowRef,
  ShallowRef,
  watch
} from 'vue';

import { uvEvents } from '@/components/pro/ProPicker/events';
import { uvMethods } from '@/components/pro/ProPicker/methods';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';
import { useAreaStore } from '@/pinia/modules/area';

interface IRegion {
  id: number;
  name: string;
  children: Array<IRegion>;
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const { instance: proPickerRef } = useFakerRef();

const defaultValue = ['110000', '110100', '110101'];
const pickerValue = shallowRef<Array<number>>([]);
const handleResetPickerValue = () => {
  pickerValue.value =
    props.modelValue?.length !== 0 ? [...props.modelValue] : [...defaultValue];
};
watch(() => props.modelValue, handleResetPickerValue, {
  immediate: true,
  deep: true
});

const handleConfirm = (e: ShallowRef<Array<IRegion>>) => {
  emit(
    'update:modelValue',
    e.value.map(item => item.id)
  );
  emit('confirm', e.value);
};

const provinces = shallowRef<Array<IRegion>>(useAreaStore().areaData);
const citys = shallowRef<Array<IRegion>>([]);
const areas = shallowRef<Array<IRegion>>([]);
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

const handleChange = (e: any) => {
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
const { bridgedMethods } = useBridgedMethods(uvMethods, proPickerRef);
defineExpose({ ...bridgedMethods, open, confirm });
</script>

<script lang="ts">
export default { options: { name: 'ProAreaPicker', virtualHost: true } };
</script>
