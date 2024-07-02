<template>
  <ProDropDownPopupWrapper
    ref="proDropDownPopupWrapperRef"
    v-bind="{ ...$attrs, ...bridgedEvents }"
    @cancel="handleCancelSelectIndustry"
    @confirm="handleConfirmSelectIndustry"
  >
    <TaskType :list="taskTypeList" v-model="modelValueList" />
  </ProDropDownPopupWrapper>
</template>

<script setup lang="ts">
import { shallowRef, PropType, watch } from 'vue';

import TaskType from './TaskType.vue';

import { getTreeTaskTypeList, ITreeTaskType } from '@/api/fe/task/task_type';
import { uvEvents } from '@/components/ProDropDownPopup/events';
import { uvMethods } from '@/components/ProDropDownPopup/methods';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm']);
const { bridgedEvents } = useBridgedEmits(uvEvents);

/* 任务类型数据源 */
const taskTypeList = shallowRef<Array<ITreeTaskType>>([]);
getTreeTaskTypeList().then(res => {
  taskTypeList.value = res || [];
});

const modelValueList = shallowRef<Array<number>>([]);
watch(
  () => props.modelValue,
  () => {
    modelValueList.value = [...props.modelValue];
  },
  { immediate: true }
);

const handleCancelSelectIndustry = () => {
  modelValueList.value = [...props.modelValue];
  emit('cancel');
};
const handleConfirmSelectIndustry = () => {
  emit('update:modelValue', [...modelValueList.value]);
  emit('confirm');
};

const proDropDownPopupWrapperRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(
  uvMethods,
  proDropDownPopupWrapperRef
);
defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default {
  options: { name: 'TaskTypeDropDownPopup', virtualHost: true }
};
</script>
